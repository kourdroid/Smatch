import type { Metadata } from 'next'
import { getPayload } from '@/getPayload'
import { ActivityTimelineClient, TimelineItem } from '@/blocks/ActivityTimeline/Component.client'
import { SolutionsHero } from '@/components/solutions/SolutionsHero'
import { i18nConfig, isValidLocale, type Locale } from '@/utilities/i18n'
import { notFound } from 'next/navigation'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

// Enable ISR (Incremental Static Regeneration) - Cache for 10 minutes
export const revalidate = 600

type Args = {
  params: Promise<{
    locale: string
  }>
}

/**
 * Generate static params for all locales
 */
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

/**
 * Dynamic metadata — locale-aware with full OG, canonical, hreflang
 */
export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const serverUrl = getServerSideURL()

  const meta: Record<string, { title: string; description: string }> = {
    fr: {
      title: 'Journal des Opérations',
      description: 'Découvrez nos derniers projets, événements et le fil de notre transformation numérique.',
    },
    en: {
      title: 'Operations Journal',
      description: 'Discover our latest projects, events, and the thread of our digital transformation.',
    },
  }

  const m = meta[locale] || meta.en
  const canonicalUrl = `${serverUrl}/${locale}/projects`

  return {
    title: m.title,
    description: m.description,
    openGraph: mergeOpenGraph({
      title: `${m.title} | Smatch Digital`,
      description: m.description,
      url: canonicalUrl,
      locale: locale === 'fr' ? 'fr_MA' : 'en_US',
      alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_MA'],
    }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${serverUrl}/en/projects`,
        fr: `${serverUrl}/fr/projects`,
        'x-default': `${serverUrl}/fr/projects`,
      },
    },
  }
}

export default async function ProjectsPage({ params }: Args) {
  const { locale } = await params

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound()
  }

  const payload = await getPayload()

  // Fetch all published projects/events WITH locale
  const { docs } = await payload.find({
    collection: 'projects',
    limit: 50,
    sort: '-date',
    locale: locale as Locale,
    fallbackLocale: 'en',
  })

  // Locale-aware static text
  const heroTitle = locale === 'fr' ? 'JOURNAL DES OPÉRATIONS' : 'OPERATIONS JOURNAL'
  const heroSubtitle = locale === 'fr'
    ? 'Projets. Événements. Le fil de notre transformation numérique.'
    : 'Projects. Events. The thread of our digital transformation.'
  const timelineTitle = locale === 'fr' ? 'ACTIVITÉS RÉCENTES' : 'RECENT ACTIVITIES'

  // Transform to TimelineItem format
  const items: TimelineItem[] = docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    slug: doc.slug || '',
    type: (doc.type as 'project' | 'event') || 'project',
    status: (doc.status as 'upcoming' | 'completed' | 'archived') || 'completed',
    date: doc.date || '',
    location: doc.location,
    code: doc.code,
    description: doc.description,
    image: doc.image,
    metadata: doc.metadata,
    linkLabel: doc.linkLabel,
    externalLink: doc.externalLink,
    linkUrl: doc.linkUrl,
  }))

  return (
    <main className="flex w-full flex-col bg-smatch-black">
      <SolutionsHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image="/assets/hero/ProjectsHero.webp"
      />
      <ActivityTimelineClient title={timelineTitle} items={items} showFilters={true} />
    </main>
  )
}
