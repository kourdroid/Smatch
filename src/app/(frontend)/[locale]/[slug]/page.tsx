import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getPayload } from '@/getPayload'
import type { RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { i18nConfig, type Locale, isValidLocale } from '@/utilities/i18n'

export async function generateStaticParams() {
    try {
        const payload = await getPayload()

        // Fetch pages with locale support
        const params: { locale: string; slug: string }[] = []

        for (const locale of i18nConfig.locales) {
            const pages = await payload.find({
                collection: 'pages',
                draft: false,
                limit: 1000,
                locale: locale,
                overrideAccess: false,
                pagination: false,
                select: {
                    slug: true,
                },
            })

            for (const doc of pages.docs || []) {
                if (doc.slug && doc.slug !== 'home') {
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

export default async function Page({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode()
    const { slug = 'home', locale } = await paramsPromise

    // Validate locale
    if (!isValidLocale(locale)) {
        notFound()
    }

    // Decode to support slugs with special characters
    const decodedSlug = decodeURIComponent(slug)
    const url = '/' + decodedSlug
    let page: RequiredDataFromCollectionSlug<'pages'> | null

    page = await queryPageBySlug({
        slug: decodedSlug,
        locale,
    })

    // Remove this code once your website is seeded
    if (!page && slug === 'home') {
        page = homeStatic
    }

    if (!page) {
        return <PayloadRedirects url={url} />
    }

    const { hero, layout } = page

    return (
        <article className="pb-24">
            <PageClient />
            {/* Allows redirects for valid pages too */}
            <PayloadRedirects disableNotFound url={url} />

            {draft && <LivePreviewListener />}

            <RenderHero {...hero} />
            <RenderBlocks blocks={layout} locale={locale} />
        </article>
    )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { slug = 'home', locale } = await paramsPromise

    // Validate locale
    if (!isValidLocale(locale)) {
        return {}
    }

    // Decode to support slugs with special characters
    const decodedSlug = decodeURIComponent(slug)
    const page = await queryPageBySlug({
        slug: decodedSlug,
        locale,
    })

    return generateMeta({ doc: page, locale: locale as Locale })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload()

    try {
        const result = await payload.find({
            collection: 'pages',
            draft,
            limit: 1,
            pagination: false,
            overrideAccess: draft,
            locale: locale,
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
