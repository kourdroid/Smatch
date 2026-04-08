import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { getPayload } from '@/getPayload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <main className="py-24">
      {/* SEO: Using <main> semantic tag instead of <div> for the primary content of the page improves screen reader navigation and helps search engines identify core content. */}
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none dark:prose-invert">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog | Smatch Digital',
    description: 'Articles, actualités et insights sur la transformation digitale, la supply chain et l\'industrie 4.0.',
  }
}
