import type { Metadata } from 'next'
import { getPayload } from '@/getPayload'
import { SolutionsHero } from '@/components/solutions/SolutionsHero'
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { i18nConfig, isValidLocale, type Locale } from '@/utilities/i18n'
import { notFound } from 'next/navigation'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getBreadcrumbJsonLd } from '@/utilities/jsonLd'

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
 * Dynamic metadata — locale-aware title, description, OG, canonical, hreflang
 */
export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const serverUrl = getServerSideURL()

  const meta: Record<string, { title: string; description: string }> = {
    fr: {
      title: 'Solutions WMS & Supply Chain',
      description:
        'Logistique, traçabilité, Concept 4.0, Traitement des données… le moteur de votre transformation digital commence ici.',
    },
    en: {
      title: 'WMS & Supply Chain Solutions',
      description:
        'Logistics, traceability, Concept 4.0, Data processing… the engine of your digital transformation starts here.',
    },
  }

  const m = meta[locale] || meta.en
  const canonicalUrl = `${serverUrl}/${locale}/solutions`

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
        en: `${serverUrl}/en/solutions`,
        fr: `${serverUrl}/fr/solutions`,
        'x-default': `${serverUrl}/fr/solutions`,
      },
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

  const serverUrl = getServerSideURL()
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === 'fr' ? 'Accueil' : 'Home', url: `${serverUrl}/${locale}` },
    { name: 'Solutions', url: `${serverUrl}/${locale}/solutions` },
  ])

  return (
    <main className="flex w-full flex-col">
      {/* SEO: Inject JSON-LD Breadcrumb Schema for search engine crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
