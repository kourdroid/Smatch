import type { Metadata } from 'next'
import { getPayload } from '@/getPayload'
import { SolutionsHero } from '@/components/solutions/SolutionsHero'
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { i18nConfig, isValidLocale, type Locale } from '@/utilities/i18n'
import { notFound } from 'next/navigation'
import { getServerSideURL } from '@/utilities/getURL'

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
 * Dynamic metadata — locale-aware title and description
 */
export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  const meta: Record<string, { title: string; description: string }> = {
    fr: {
      title: 'Solutions | Smatch Digital',
      description:
        'Logistique, traçabilité, Concept 4.0, Traitement des données… le moteur de votre transformation digital commence ici.',
    },
    en: {
      title: 'Solutions | Smatch Digital',
      description:
        'Logistics, traceability, Concept 4.0, Data processing… the engine of your digital transformation starts here.',
    },
  }

  const m = meta[locale] || meta.en

  const languages: Record<string, string> = {}
  i18nConfig.locales.forEach((loc) => {
    languages[loc] = `${getServerSideURL()}/${loc}/solutions`
  })

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${getServerSideURL()}/${locale}/solutions`,
      languages,
    },
  }
}

export default async function SolutionsPage({ params }: Args) {
  const { locale } = await params

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound()
  }

  // 1. Initialize Payload
  const payload = await getPayload()

  // 2. Fetch all published solutions WITH locale
  const { docs: solutions } = await payload.find({
    collection: 'solutions',
    locale: locale as Locale,
    sort: 'order',
    select: {
      title: true,
      slug: true,
      heroSubtitle: true,
      description: true,
      icon: true,
      heroImage: true,
    },
  })

  return (
    <main className="flex w-full flex-col">
      <SolutionsHero image={'/assets/hero/SolutionHero.webp'} locale={locale} />
      {/* 3. Pass the fetched data + locale to the Grid */}
      <SolutionsGrid solutions={solutions} locale={locale} />
      <CallToActionBlock
        headline={locale === 'fr' ? 'Une architecture sur mesure ?' : 'Need a custom architecture?'}
        subheadline={locale === 'fr' ? 'Découvrez nos solutions ou contactez notre équipe pour échanger sur vos besoins.' : 'Explore our solutions or contact our team to discuss your needs.'}
        link={{ type: 'custom', url: `/${locale}/contact`, label: locale === 'fr' ? 'CONTACTEZ-NOUS' : 'CONTACT US' }}
        blockType="cta"
      />
    </main>
  )
}
