import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { getPayload } from '@/getPayload'
import React from 'react'
import PageClient from './page.client'
import { i18nConfig } from '@/utilities/i18n'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    locale: string
  }>
}

export default async function Page({ params }: Args) {
  const { locale } = await params
  const payload = await getPayload()

  const posts = await payload.find({
    locale: locale as any,
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
    <div className="py-24">
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
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  const languages: Record<string, string> = {}
  i18nConfig.locales.forEach((loc) => {
    languages[loc] = `${getServerSideURL()}/${loc}/posts`
  })

  return {
    title: locale === 'fr' ? 'Articles | Smatch Digital' : 'Posts | Smatch Digital',
    description: locale === 'fr' ? 'Découvrez nos derniers articles.' : 'Discover our latest posts.',
    alternates: {
      canonical: `${getServerSideURL()}/${locale}/posts`,
      languages
    }
  }
}
