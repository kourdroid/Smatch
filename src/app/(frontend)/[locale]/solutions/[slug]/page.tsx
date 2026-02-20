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
import { i18nConfig, type Locale } from '@/utilities/i18n'

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
    layout,
  } = solution

  // Helper to get image URL
  const getImageUrl = (media: unknown) => {
    if (!media) return null
    if (typeof media === 'string') return media
    if (typeof media === 'object' && media !== null && 'url' in media)
      return (media as { url: string }).url
    return null
  }

  const heroImgUrl = getImageUrl(heroImage)

  return (
    <article className="min-h-screen bg-smatch-black">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <SolutionsHero
        title={title}
        subtitle={heroSubtitle || undefined}
        image={heroImgUrl}
        locale={locale}
      />

      {layout && <RenderBlocks blocks={layout} locale={locale} />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, locale } = await paramsPromise
  if (!slug) return {}

  const decodedSlug = decodeURIComponent(slug)
  const solution = await querySolutionBySlug({ slug: decodedSlug, locale })

  return generateMeta({ doc: solution, locale: locale as Locale, collection: 'solutions' })
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
