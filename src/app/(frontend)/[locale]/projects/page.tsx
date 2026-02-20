import type { Metadata } from 'next'
import { getPayload } from '@/getPayload'
import { ActivityTimelineClient, TimelineItem } from '@/blocks/ActivityTimeline/Component.client'
import { SolutionsHero } from '@/components/solutions/SolutionsHero'
import { i18nConfig, isValidLocale, type Locale } from '@/utilities/i18n'
import { notFound } from 'next/navigation'
import { getServerSideURL } from '@/utilities/getURL'

// Enable ISR (Incremental Static Regeneration) - Cache for 10 minutes
export const revalidate = 600

type Args = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  const m = {
      fr: { title: 'Journal des Opérations | Smatch Digital', description: 'Découvrez nos derniers projets et événements.' },
      en: { title: 'Operations Journal | Smatch Digital', description: 'Discover our latest projects and events.' }
  }[locale] || { title: 'Journal des Opérations | Smatch Digital', description: 'Découvrez nos derniers projets et événements.' }

  const languages: Record<string, string> = {}
  i18nConfig.locales.forEach((loc) => {
    languages[loc] = `${getServerSideURL()}/${loc}/projects`
  })

  return {
    title: m.title,
    description: m.description,
    alternates: {
        canonical: `${getServerSideURL()}/${locale}/projects`,
        languages
    }
  }
}

/**
 * Generate static params for all locales
 */
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
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
    locale: locale as Locale, // CRITICAL: Pass locale to get string values
  })

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
        title="JOURNAL DES OPÉRATIONS"
        subtitle="Projets. Événements. Le fil de notre transformation numérique."
        image="/assets/hero/ProjectsHero.webp"
      />
      <ActivityTimelineClient title="ACTIVITÉS RÉCENTES" items={items} showFilters={true} />
    </main>
  )
}

