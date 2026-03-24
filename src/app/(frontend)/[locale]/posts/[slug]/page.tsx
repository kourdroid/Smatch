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
  const { slug = '', locale = 'fr' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  // Structured Data (JSON-LD)
  const serverUrl = getServerSideURL()
  const postUrl = `${serverUrl}/${locale}${url}`

  const rawImageUrl =
    // @ts-ignore - 'image' field might be dynamically added or inferred incorrectly by TS in meta
    post.meta?.image && typeof post.meta.image === 'object' && post.meta.image.url
      // @ts-ignore
      ? post.meta.image.url
      : null

  const imageUrl = rawImageUrl
    ? rawImageUrl.startsWith('http')
      ? rawImageUrl
      : `${serverUrl}${rawImageUrl}`
    : null

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${serverUrl}/${locale}` },
    { name: locale === 'fr' ? 'Articles' : 'Posts', url: `${serverUrl}/${locale}/posts` },
    { name: post.title, url: postUrl },
  ])

  const postJsonLd = getProjectJsonLd({
    name: post.title,
    description: post.meta?.description || '',
    url: postUrl,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    image: imageUrl,
    type: 'BlogPosting',
  })

  // Escape `<` and `>` to prevent XSS issues inside <script> tags
  const safeBreadcrumbJsonLd = JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003C').replace(/>/g, '\\u003E')
  const safePostJsonLd = JSON.stringify(postJsonLd).replace(/</g, '\\u003C').replace(/>/g, '\\u003E')

  return (
    <article className="py-16">
      {/* Search Engine Optimization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeBreadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safePostJsonLd }}
      />
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

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
    </article>
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
