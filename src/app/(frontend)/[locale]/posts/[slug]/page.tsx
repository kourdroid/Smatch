import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getPayload } from '@/getPayload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getBreadcrumbJsonLd, getProjectJsonLd } from '@/utilities/jsonLd'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateStaticParams() {
  const payload = await getPayload()
  let params: { slug: string }[] = []

  try {
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })
    params = posts.docs.map(({ slug }) => ({ slug }))
  } catch (error) {
    console.warn('Failed to generate static params for posts:', error)
  }

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', locale = 'en' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  // Structured Data (JSON-LD)
  const serverUrl = getServerSideURL()
  const postUrl = `${serverUrl}/${locale}${url}`

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${serverUrl}/${locale}` },
    { name: locale === 'fr' ? 'Articles' : 'Posts', url: `${serverUrl}/${locale}/posts` },
    { name: post.title, url: postUrl },
  ])

  // Extract plain text description from meta or fallback
  const description = post.meta?.description || ''

  // Extract image URL from heroImage
  const imageUrl =
    typeof post.heroImage === 'object' &&
    post.heroImage !== null &&
    'url' in post.heroImage &&
    post.heroImage.url
      ? post.heroImage.url
      : null

  const articleJsonLd = getProjectJsonLd({
    name: post.title,
    description: description,
    url: postUrl,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    image: imageUrl,
  })

  return (
    <main className="py-16">
      {/* SEO: Using <main> as the primary page wrapper instead of <article> ensures proper HTML5 semantics, telling crawlers this is the primary content of the document. */}
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Search Engine Optimization Structured Data - Adds Article and Breadcrumb schemas to improve indexation and search result display */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="mx-auto max-w-3xl" data={post.content} enableGutter={false} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="col-span-3 col-start-1 mt-12 max-w-[52rem] grid-rows-[2fr] lg:grid lg:grid-cols-subgrid"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale } = (await paramsPromise) as { slug?: string; locale?: string }
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post, locale })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload()

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
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
