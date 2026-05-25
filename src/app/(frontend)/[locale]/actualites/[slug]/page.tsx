import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getPayload } from '@/getPayload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, ArrowUpRight, HelpCircle, ChevronRight } from 'lucide-react'

import { generateMeta } from '@/utilities/generateMeta'
import { getBlogPostingJsonLd, getFAQPageJsonLd, getProjectJsonLd, getBreadcrumbJsonLd } from '@/utilities/jsonLd'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateStaticParams() {
  const payload = await getPayload()
  let params: { slug: string }[] = []

  try {
    const actualites = await payload.find({
      collection: 'actualites',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })
    params = actualites.docs
      .filter((doc) => doc.slug && typeof doc.slug === 'string')
      .map(({ slug }) => ({ slug: slug as string }))
  } catch (error) {
    console.warn('Failed to generate static params for actualites:', error)
  }

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: string
  }>
}

export default async function Actualite({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', locale } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/actualites/' + decodedSlug
  
  const post = await queryActualiteBySlug({ slug: decodedSlug, locale })

  if (!post) return <PayloadRedirects url={url} />

  // Fetch Sidebars Data
  const latestPosts = await queryLatestActualites({ excludeId: String(post.id), locale })
  const allCategories = await queryCategories({ locale })

  // Schema
  const hasFaqs = post.faqEntries && Array.isArray(post.faqEntries) && post.faqEntries.length > 0
  const faqSchema = hasFaqs ? getFAQPageJsonLd(post.faqEntries as { question: string; answer: string; }[]) : null

  const blogSchema = getBlogPostingJsonLd({
    headline: post.title,
    description: post.excerpt || '',
    url: `${getServerSideURL()}/${locale || 'fr'}/actualites/${post.slug}`,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || undefined,
    image: post.heroImage && typeof post.heroImage === 'object' ? post.heroImage.url : null,
    authorName: post.source === 'ai-generated' ? 'Smatch.AI' : 'Smatch Editorial'
  })

  // Metadata
  const cat = post.categories?.[0]
  const catTitle = typeof cat === 'object' ? cat?.title : 'Actualité'
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  }) : 'Récemment'

  const serverUrl = getServerSideURL()
  const articleUrl = `${serverUrl}/${locale || 'fr'}${url}`

  // Extract absolute image URL for JSON-LD
  let imageUrl: string | undefined
  if (post.heroImage && typeof post.heroImage === 'object' && post.heroImage.url) {
    imageUrl = post.heroImage.url.startsWith('http')
      ? post.heroImage.url
      : `${serverUrl}${post.heroImage.url}`
  } else if (post.meta?.image && typeof post.meta.image === 'object' && post.meta.image.url) {
    imageUrl = post.meta.image.url.startsWith('http')
      ? post.meta.image.url
      : `${serverUrl}${post.meta.image.url}`
  }

  // Article structured data for SEO indexing

  const articleJsonLd = getProjectJsonLd({
    name: post.title,
    description: post.excerpt || post.meta?.description || '',
    url: articleUrl,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    image: imageUrl,
  })

  // SEO: Generate BreadcrumbList structured data to help search engines understand the site's hierarchy and improve SERP display
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${serverUrl}/${locale || 'fr'}` },
    { name: locale === 'fr' ? 'Actualités' : 'News', url: `${serverUrl}/${locale || 'fr'}/actualites` },
    { name: post.title, url: articleUrl },
  ])


  return (
    <main className="min-h-screen bg-smatch-black py-32 text-smatch-text-primary selection:bg-smatch-gold selection:text-smatch-black">
      {/* SEO: Use semantic <main> tag to indicate the primary content of the document, improving crawlability and accessibility. */}
      {/* Search Engine Optimization Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <PayloadRedirects disableNotFound url={url} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      {/* 3-Column Dashboard Layout */}
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Navigation & Categories */}
        <aside className="hidden lg:col-span-2 lg:block">
          <div className="sticky top-32 space-y-12">
            <Link 
              href="/actualites"
              className="inline-flex items-center gap-2 rounded-xl border border-smatch-charcoal bg-[#0a0a0a] px-4 py-2 font-mono text-xs uppercase tracking-widest text-smatch-text-secondary transition-colors duration-300 hover:border-smatch-gold hover:text-white"
            >
              <ArrowLeft className="size-3.5" />
              Retour
            </Link>

            <div>
              <h3 className="mb-6 border-b border-smatch-charcoal pb-4 font-heading text-lg text-white">Rechercher par Catégorie</h3>
              <ul className="space-y-3">
                {allCategories.map((c, i) => (
                  <li key={i}>
                    <Link href={`/actualites`} className="group flex items-center justify-between">
                      <span className="font-sans text-sm text-smatch-text-secondary transition-colors group-hover:text-smatch-gold">{c.title}</span>
                      <ChevronRight className="size-3.5 text-smatch-charcoal transition-all group-hover:translate-x-1 group-hover:text-smatch-gold" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Main Article (Left aligned flow) */}
        <main className="col-span-1 lg:col-span-7">
          <article className="w-full">
            
            {/* Hero Image */}
            {post.heroImage && typeof post.heroImage !== 'string' && (
              <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-smatch-charcoal bg-[#0a0a0a]">
                <Media resource={post.heroImage} fill imgClassName="object-cover w-full h-full" />
              </div>
            )}

            {/* Header Content */}
            <header className="mb-10 border-b border-smatch-charcoal pb-10">
              <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-smatch-text-secondary">
                <span className="flex items-center gap-2 text-smatch-gold">
                   <span className="size-1.5 rounded-full bg-smatch-gold" />
                   {catTitle}
                </span>
                <span className="h-3 w-1 border-l border-smatch-charcoal" />
                <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {publishedDate}</span>
                <span className="h-3 w-1 border-l border-smatch-charcoal" />
                <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {post.estimatedReadTime || 5} min read</span>
              </div>

              <h1 className="mb-8 text-left font-heading text-4xl leading-[1.1] text-white md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {/* Source/Origin Callout inline */}
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full border border-smatch-gold bg-smatch-gold/10 text-smatch-gold">
                  {post.source === 'ai-generated' ? 'IA' : 'ED'}
                </div>
                <div>
                  <p className="font-sans text-sm text-white">
                    {post.source === 'ai-generated' ? 'Smatch.AI Intelligence' : 'Éditorial Smatch'}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-widest text-smatch-text-secondary">
                    {post.source === 'ai-generated' ? 'Généré Automatiquement' : 'Rédigé'}
                  </p>
                </div>
              </div>
            </header>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mb-10 rounded-r-lg border-l-2 border-smatch-gold bg-gradient-to-r from-smatch-surface/50 to-transparent py-4 pl-6 text-left font-sans text-xl font-light leading-relaxed text-white/90">
                {post.excerpt}
              </p>
            )}

            {/* Formatted Lexical Output Wrapper (Left aligned) */}
            <div className="prose prose-lg max-w-none text-left dark:prose-invert
                            prose-headings:mt-12 prose-headings:font-heading prose-headings:font-normal prose-headings:text-white prose-h2:text-3xl prose-h3:text-2xl
                            prose-p:font-sans prose-p:font-light prose-p:leading-relaxed prose-p:text-smatch-text-secondary
                            prose-a:text-smatch-gold prose-a:no-underline hover:prose-a:underline
                            prose-blockquote:border-l-smatch-charcoal prose-blockquote:bg-transparent
                            prose-blockquote:px-0 prose-blockquote:py-2 prose-blockquote:font-sans
                            prose-blockquote:italic prose-blockquote:text-white/80 prose-strong:font-normal prose-strong:text-white prose-ul:list-disc prose-ul:pl-6 prose-li:text-smatch-text-secondary
                            [&>img]:w-full [&>img]:rounded-xl [&>img]:border [&>img]:border-smatch-charcoal">
              <RichText data={post.body} enableGutter={false} />
            </div>

            <div className="mb-12 mt-20 h-px w-full bg-smatch-charcoal" />

            {/* FAQ Section */}
            {post.faqEntries && post.faqEntries.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl text-white">
                  <HelpCircle className="size-5 text-smatch-gold" />
                  Questions Fréquentes
                </h2>
                <div className="space-y-3">
                  {post.faqEntries.map((faq: any, i: number) => (
                    <details key={i} className="group overflow-hidden rounded-xl border border-smatch-charcoal bg-[#0a0a0a] transition-all duration-300 hover:border-smatch-gold/30 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between p-5 font-heading text-lg text-white transition-colors">
                        <span className="pr-4">{faq.question}</span>
                        <ChevronRight className="size-5 shrink-0 text-smatch-text-secondary transition-transform duration-300 group-open:rotate-90 group-open:text-smatch-gold" />
                      </summary>
                      <div className="px-5 pb-5 text-left font-sans text-sm leading-relaxed text-smatch-text-secondary">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Tags */}
            <div className="mt-12 flex flex-wrap items-center justify-start gap-2 border-t border-smatch-charcoal pt-8">
               <span className="mr-2 font-mono text-xs uppercase tracking-widest text-smatch-text-secondary">Mots-clés :</span>
               {post.tags?.map((item: any, i: number) => (
                  <span key={i} className="cursor-default rounded-full border border-smatch-charcoal bg-smatch-surface px-3 py-1 font-mono text-xs uppercase tracking-widest text-smatch-text-secondary transition-colors hover:border-smatch-gold hover:text-white">
                    #{item.tag}
                  </span>
               ))}
            </div>
            
          </article>
        </main>

        {/* RIGHT COLUMN: Related / Latest News */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-32">
            <h3 className="mb-6 border-b border-smatch-charcoal pb-4 font-heading text-lg text-white">Dernières Actualités</h3>
            <div className="flex flex-col gap-6">
              {latestPosts.map((doc, idx) => {
                const docCat = doc.categories?.[0]
                const docCatTitle = typeof docCat === 'object' ? docCat?.title : 'Actualité'
                return (
                  <Link 
                    key={idx} 
                    href={`/actualites/${doc.slug}`}
                    className="group flex flex-col gap-3"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-smatch-charcoal bg-[#0a0a0a]">
                      {doc.heroImage && typeof doc.heroImage !== 'string' ? (
                        <Media resource={doc.heroImage} fill imgClassName="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                      ) : (
                        <div className="size-full bg-smatch-black/50" />
                      )}
                      <div className="absolute left-2 top-2 z-10 rounded border border-smatch-charcoal bg-smatch-black/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-smatch-text-primary backdrop-blur-md">
                        {doc.estimatedReadTime || 5} min
                      </div>
                    </div>
                    <div>
                      <p className="mb-1.5 font-mono text-xs uppercase tracking-widest text-smatch-gold">{docCatTitle}</p>
                      <h4 className="line-clamp-2 font-heading text-base leading-snug text-white transition-colors group-hover:text-smatch-gold">
                        {doc.title}
                      </h4>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

      </div>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryActualiteBySlug({ slug: decodedSlug, locale })

  return generateMeta({ doc: post, locale })
}

// Queries
const queryActualiteBySlug = cache(async ({ slug, locale }: { slug: string; locale?: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'actualites',
    draft,
    limit: 1,
    depth: 2,
    locale: locale === 'fr' ? 'fr' : 'en',
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryLatestActualites = cache(async ({ excludeId, locale }: { excludeId: string, locale?: string }) => {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'actualites',
    depth: 1,
    limit: 3,
    locale: locale === 'fr' ? 'fr' : 'en',
    sort: '-publishedAt',
    where: {
      id: {
        not_equals: excludeId,
      },
    },
  })
  return result.docs || []
})

const queryCategories = cache(async ({ locale }: { locale?: string }) => {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 10,
    locale: locale === 'fr' ? 'fr' : 'en',
    sort: 'title',
  })
  return result.docs || []
})

