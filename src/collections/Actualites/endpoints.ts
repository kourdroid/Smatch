import type { Endpoint } from 'payload'
import { z } from 'zod'
import { defaultLexical } from '@/fields/defaultLexical'

// Minimal tracking of API key usage for 10req/min rate limiting
const rateLimitMap = new Map<string, { count: number; windowStart: number }>()

const cleanRateLimits = () => {
  const now = Date.now()
  rateLimitMap.forEach((data, key) => {
    if (now - data.windowStart > 60000) {
      rateLimitMap.delete(key)
    }
  })
}

const checkRateLimit = (apiKey: string): boolean => {
  cleanRateLimits()
  const now = Date.now()
  const record = rateLimitMap.get(apiKey)
  if (!record) {
    rateLimitMap.set(apiKey, { count: 1, windowStart: now })
    return true
  }
  if (now - record.windowStart <= 60000) {
    if (record.count >= 10) return false
    record.count += 1
    return true
  }
  rateLimitMap.set(apiKey, { count: 1, windowStart: now })
  return true
}

// Zod schema matching contracts/n8n-ingest-api.md
const payloadSchema = z.object({
  title: z.string().min(1),
  bodyHtml: z.string().min(1),
  excerpt: z.string().min(1).max(300),
  locale: z.enum(['en', 'fr']),
  heroImageUrl: z.string().url().optional(),
  additionalImageUrls: z.array(z.string().url()).optional(),
  slug: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  estimatedReadTime: z.number().positive(),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1).max(300),
  focusKeywords: z.string().optional(),
  seoPotentialScore: z.number().min(0).max(100),
  faqEntries: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .optional(),
})

export const n8nIngestEndpoint: Endpoint = {
  path: '/n8n-ingest',
  method: 'post',
  handler: async (req) => {
    try {
      // 1. Authentication
      const apiKey = req.headers.get('x-api-key')
      const validKey = process.env.API_INGEST_KEY || 'dev-fallback-key' // in prod, define API_INGEST_KEY
      
      if (!apiKey || apiKey !== validKey) {
        return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
      }

      // 2. Rate Limiting
      if (!checkRateLimit(apiKey)) {
        return Response.json(
          { success: false, error: 'Rate limit exceeded. Maximum 10 requests per minute.' },
          { status: 429 },
        )
      }

      // 3. Validation
      const data = req.json ? await req.json() : await req.text().then(t => JSON.parse(t))
      const parsed = payloadSchema.safeParse(data)
      if (!parsed.success) {
        return Response.json(
          { success: false, error: 'Validation Error', details: parsed.error.issues },
          { status: 400 },
        )
      }
      const validData = parsed.data

      // Generate slug if not provided
      const slug =
        validData.slug ||
        validData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')

      // 4. Duplicate Check
      const existing = await req.payload.find({
        collection: 'actualites',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        return Response.json(
          { success: false, error: `An article with slug '${slug}' already exists.` },
          { status: 409 },
        )
      }

      // 5. HTML to Lexical Conversion
      // Dynamically import jsdom + convertHTMLToLexical to avoid ESM/CJS crash on Vercel
      // jsdom's dependency chain (html-encoding-sniffer → @exodus/bytes) is ESM-only
      // and cannot be statically bundled into Vercel's CJS serverless functions.
      const { JSDOM } = await import('jsdom')
      const { convertHTMLToLexical } = await import('@payloadcms/richtext-lexical')

      // Basic strip of scripts/iframes for security
      let safeHtml = validData.bodyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      safeHtml = safeHtml.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')

      const lexicalBody = convertHTMLToLexical({
        editorConfig: defaultLexical,
        html: safeHtml,
        JSDOM: JSDOM as any,
      })

      // 6. Handle Images (Hero + Additional)
      let heroImageId: number | string | null = null
      
      // Helper function to fetch and create media
      const fetchAndCreateMedia = async (url: string) => {
        try {
          const res = await fetch(url)
          if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`)
          const buffer = await res.arrayBuffer()
          const filename = url.split('/').pop()?.split('?')[0] || `img-${Date.now()}.jpg`
          
          const mediaDoc = await req.payload.create({
            collection: 'media',
            data: {
              alt: `Image ingested from ${filename}`
            },
            file: {
              data: Buffer.from(buffer),
              mimetype: res.headers.get('content-type') || 'image/jpeg',
              name: filename,
              size: buffer.byteLength,
            }
          })
          return mediaDoc.id
        } catch (error) {
          req.payload.logger.error(error instanceof Error ? error.message : String(error))
          return null
        }
      }

      if (validData.heroImageUrl) {
        heroImageId = await fetchAndCreateMedia(validData.heroImageUrl)
      }

      const additionalImages = []
      if (validData.additionalImageUrls && validData.additionalImageUrls.length > 0) {
        for (const url of validData.additionalImageUrls) {
          const id = await fetchAndCreateMedia(url)
          if (id) {
            additionalImages.push({ image: id })
          }
        }
      }

      // 7. Handle Category
      let categoryIds: (string | number)[] = []
      if (validData.category) {
        const catRes = await req.payload.find({
          collection: 'categories',
          where: { title: { equals: validData.category } },
          limit: 1,
        })
        if (catRes.docs.length > 0) {
          categoryIds.push(catRes.docs[0].id)
        } else {
          // optionally create category or omit
          const newCat = await req.payload.create({
            collection: 'categories',
            data: { title: validData.category },
          } as any)
          categoryIds.push(newCat.id)
        }
      }

      // 8. Create Article
      const newArticle = await req.payload.create({
        collection: 'actualites',
        data: {
          title: validData.title,
          slug,
          excerpt: validData.excerpt,
          body: lexicalBody as any, // Cast required due to Payload complex typing
          source: 'ai-generated',
          estimatedReadTime: validData.estimatedReadTime,
          heroImage: heroImageId as any,
          additionalImages: additionalImages.length > 0 ? additionalImages : undefined,
          categories: categoryIds as any,
          tags: validData.tags ? validData.tags.map((t) => ({ tag: t })) : undefined,
          faqEntries: validData.faqEntries,
          meta: {
            title: validData.metaTitle,
            description: validData.metaDescription,
          },
          focusKeywords: validData.focusKeywords,
          seoPotentialScore: validData.seoPotentialScore,
        },
        locale: validData.locale,
      } as any)

      return Response.json(
        {
          success: true,
          message: 'Article ingested successfully',
          articleId: newArticle.id,
          slug: (newArticle as any).slug,
        },
        { status: 201 },
      )
    } catch (error: any) {
      req.payload.logger.error('N8n Ingestion Error:', error)
      return Response.json(
        { success: false, error: 'Internal Server Error', details: error.message },
        { status: 500 },
      )
    }
  },
}
