import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

// Default SEO description fallback when CMS field is empty
const DEFAULT_DESCRIPTION =
  'SMATCH conçoit et déploie des solutions innovantes pour numériser et automatiser les processus métier des acteurs industriels, des prestataires logistiques et des institutions.'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  // Default fallback OG image
  let url = `${serverUrl}/smatch-og.webp`

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    const rawUrl = ogUrl || image.url

    if (rawUrl) {
      // If the URL is already absolute (e.g., S3/Supabase), use it as-is
      url = rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
        ? rawUrl
        : `${serverUrl}${rawUrl}`
    }
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | any | null
  locale?: string
}): Promise<Metadata> => {
  const { doc, locale } = args
  const serverUrl = getServerSideURL()

  const ogImage = getImageURL(doc?.meta?.image)

  let titleString = 'Smatch Digital | Solutions WMS & Supply Chain'
  const rawTitle = doc?.meta?.title

  if (rawTitle) {
    if (typeof rawTitle === 'object') {
      // JSON recursion guard: extract the correct locale string
      titleString = rawTitle[locale as keyof typeof rawTitle] ?? rawTitle['fr'] ?? rawTitle['en'] ?? titleString
      // Unwrap nested JSON strings if any
      let safetyCounter = 0;
      while (typeof titleString === 'string' && titleString.startsWith('{') && safetyCounter < 5) {
        try { 
          titleString = JSON.parse(titleString)[locale as string] ?? titleString; 
        } catch { break; }
        safetyCounter++;
      }
    } else {
      titleString = rawTitle
    }
  }

  // Prevent double "Smatch" in title
  const title = typeof titleString === 'string' && titleString.toLowerCase().includes('smatch') 
    ? titleString 
    : `${titleString} | Smatch Digital`

  // Use CMS description if available, otherwise fall back to default
  const description = doc?.meta?.description || DEFAULT_DESCRIPTION

  // Calculate the raw slug path (e.g. 'solutions/ims-maroc')
  let rawSlug = ''
  if (doc?.slug && doc.slug !== 'home') {
    rawSlug = Array.isArray(doc.slug) ? doc.slug.join('/') : doc.slug
  }

  // Build paths
  const pathWithSlash = rawSlug ? `/${rawSlug}` : ''

  // Absolute canonical URL for unambiguous canonicalization
  const resolvedLocale = locale || 'fr'
  const canonicalUrl = `${serverUrl}/${resolvedLocale}${pathWithSlash}`

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ]
        : undefined,
      title,
      url: canonicalUrl,
      locale: resolvedLocale === 'fr' ? 'fr_MA' : 'en_US',
      alternateLocale: resolvedLocale === 'fr' ? ['en_US'] : ['fr_MA'],
    }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${serverUrl}/en${pathWithSlash}`,
        fr: `${serverUrl}/fr${pathWithSlash}`,
        'x-default': `${serverUrl}/fr${pathWithSlash}`,
      },
    },
    title,
  }
}
