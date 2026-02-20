import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { getPayload } from '@/getPayload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { i18nConfig } from '@/utilities/i18n'
import { getServerSideURL } from '@/utilities/getURL'

type Args = {
  searchParams: Promise<{
    q: string
  }>
  params: Promise<{
    locale: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise, params: paramsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const { locale } = await paramsPromise
  const payload = await getPayload()

  const posts = await payload.find({
    locale: locale as any,
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
        where: {
          or: [
            {
              title: {
                like: query,
              },
            },
            {
              'meta.description': {
                like: query,
              },
            },
            {
              'meta.title': {
                like: query,
              },
            },
            {
              slug: {
                like: query,
              },
            },
          ],
        },
      }
      : {}),
  })

  return (
    <div className="py-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none text-center dark:prose-invert">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="mx-auto max-w-[50rem]">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  const languages: Record<string, string> = {}
  i18nConfig.locales.forEach((loc) => {
    languages[loc] = `${getServerSideURL()}/${loc}/search`
  })

  return {
    title: locale === 'fr' ? 'Recherche | Smatch Digital' : 'Search | Smatch Digital',
    description: locale === 'fr' ? 'Recherchez sur notre site.' : 'Search our site.',
    alternates: {
      canonical: `${getServerSideURL()}/${locale}/search`,
      languages
    }
  }
}
