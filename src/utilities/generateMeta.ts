import type { Metadata } from 'next'

import type { Media, Page, Post, Project, Solution, Config } from '../payload-types'
import { i18nConfig, Locale } from './i18n'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

// Default SEO description fallback when CMS field is empty
const DEFAULT_DESCRIPTION_EN = 'Logistics, traceability, Concept 4.0, Data processing… the engine of your digital transformation starts here.'
const DEFAULT_DESCRIPTION_FR = 'Logistique, traçabilité, Concept 4.0, Traitement des données… le moteur de votre transformation digital commence ici.'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

type Doc = Partial<Page> | Partial<Post> | Partial<Project> | Partial<Solution>

export const generateMeta = async (args: {
  doc: Doc | null
  locale?: Locale
  collection?: 'pages' | 'posts' | 'projects' | 'solutions'
}): Promise<Metadata> => {
  const { doc, locale = i18nConfig.defaultLocale, collection = 'pages' } = args

  // Resolve Title
  const docTitle = (doc as any)?.meta?.title || doc?.title
  const title = docTitle
    ? docTitle + ' | Smatch Digital'
    : 'Smatch Digital | Solutions WMS & Supply Chain'

  // Resolve Description
  const defaultDescription = locale === 'fr' ? DEFAULT_DESCRIPTION_FR : DEFAULT_DESCRIPTION_EN
  let description = (doc as any)?.meta?.description
  if (!description && 'description' in (doc || {}) && typeof (doc as any).description === 'string') {
    description = (doc as any).description
  }
  if (!description) {
    description = defaultDescription
  }

  // Resolve Image
  let image = (doc as any)?.meta?.image
  if (!image && 'image' in (doc || {})) image = (doc as any).image
  if (!image && 'heroImage' in (doc || {})) image = (doc as any).heroImage

  const ogImage = getImageURL(image)

  // Construct URL path based on collection and slug
  const getPath = (slug: string | undefined, loc: string) => {
    const localePrefix = `/${loc}`
    if (!slug || (collection === 'pages' && slug === 'home')) {
      return localePrefix
    }

    switch (collection) {
      case 'pages':
        return `${localePrefix}/${slug}`
      case 'posts':
        return `${localePrefix}/posts/${slug}`
      case 'projects':
        return `${localePrefix}/projects/${slug}`
      case 'solutions':
        return `${localePrefix}/solutions/${slug}`
      default:
        return `${localePrefix}/${slug}`
    }
  }

  const currentPath = getPath(doc?.slug, locale)
  const canonicalUrl = `${getServerSideURL()}${currentPath}`

  // Generate language alternates
  const languages: Record<string, string> = {}
  i18nConfig.locales.forEach((loc) => {
    languages[loc] = `${getServerSideURL()}${getPath(doc?.slug, loc)}`
  })

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
          {
            url: ogImage,
          },
        ]
        : undefined,
      title,
      url: currentPath,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    }),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    title,
  }
}
