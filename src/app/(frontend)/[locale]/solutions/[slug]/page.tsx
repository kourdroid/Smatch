import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getPayload } from '@/getPayload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'

import { SolutionsHero } from '@/components/solutions/SolutionsHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { i18nConfig } from '@/utilities/i18n'
import { getServerSideURL } from '@/utilities/getURL'
import { getBreadcrumbJsonLd, getServiceJsonLd, getSoftwareApplicationJsonLd } from '@/utilities/jsonLd'

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const solutions = await payload.find({
      collection: 'solutions',
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
      },
    })

    // Generate { locale, slug } pairs for every locale × slug combination
    const params: { locale: string; slug: string }[] = []
    for (const locale of i18nConfig.locales) {
      for (const doc of solutions.docs) {
        if (doc.slug) {
          params.push({ locale, slug: doc.slug })
        }
      }
    }
    return params
  } catch (_error) {
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
    locale: string
  }>
}

export default async function SolutionPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug, locale } = await paramsPromise

  if (!slug) return notFound()

  const decodedSlug = decodeURIComponent(slug)
  const url = '/solutions/' + decodedSlug

  const solution = await querySolutionBySlug({ slug: decodedSlug, locale })

  if (!solution) {
    return <PayloadRedirects url={url} />
  }

  // Extract data with type safety
  const {
    title,
    heroSubtitle,
    heroImage,
    description,
    layout,
  } = solution

  const serverUrl = getServerSideURL()
  const pageUrl = `${serverUrl}/${locale}/solutions/${decodedSlug}`

  // JSON-LD structured data for this solution
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === 'fr' ? 'Accueil' : 'Home', url: `${serverUrl}/${locale}` },
    { name: 'Solutions', url: `${serverUrl}/${locale}/solutions` },
    { name: title, url: pageUrl },
  ])
  const serviceJsonLd = getServiceJsonLd({
    name: title,
    description: description || heroSubtitle || title,
    url: pageUrl,
    image: heroImage && typeof heroImage === 'object' && 'url' in heroImage
      ? (heroImage.url?.startsWith('http') ? heroImage.url : `${serverUrl}${heroImage.url}`)
      : null,
  })

  const softwareAppJsonLd = getSoftwareApplicationJsonLd({
    name: title,
    description: description || heroSubtitle || title,
    url: pageUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
  })

  return (
    <main className="min-h-screen bg-smatch-black">
      {/* SEO: Using <main> for the document body and nesting <article> for the self-contained content ensures valid semantic HTML5 */}
      <article>
        <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />

      <SolutionsHero
        title={title}
        subtitle={heroSubtitle || undefined}
        mediaResource={heroImage}
        locale={locale}
      />

        {layout && <RenderBlocks blocks={layout} locale={locale} />}
      </article>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, locale } = await paramsPromise
  if (!slug) return {}

  const decodedSlug = decodeURIComponent(slug)
  const solution = await querySolutionBySlug({ slug: decodedSlug, locale })

  return generateMeta({ doc: solution, locale })
}

const querySolutionBySlug = cache(async ({ slug, locale }: { slug: string; locale?: string }) => {
  const payload = await getPayload()

  try {
    const result = await payload.find({
      collection: 'solutions',
      limit: 1,
      depth: 2,
      pagination: false,
      locale: locale as any,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] || null
  } catch (_error) {
    return null
  }
})
