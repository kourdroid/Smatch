import { getServerSideURL } from './getURL'

/**
 * JSON-LD Structured Data Generators
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

/** Organization schema — injected once in root layout */
export function getOrganizationJsonLd() {
    const serverUrl = getServerSideURL()

    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Smatch Digital',
        alternateName: 'SMATCH',
        url: serverUrl,
        logo: `${serverUrl}/Logo.svg`,
        description:
            'SMATCH conçoit et déploie des solutions innovantes pour numériser et automatiser les processus métier des acteurs industriels, des prestataires logistiques et des institutions.',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Casablanca',
            addressCountry: 'MA',
        },
        sameAs: [
            'https://www.linkedin.com/company/smatch-digital',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            availableLanguage: ['French', 'English'],
        },
    }
}

/** Article/Project schema — use on project detail pages */
export function getProjectJsonLd(args: {
    name: string
    description: string
    url: string
    datePublished?: string
    image?: string | null
    type?: 'Article' | 'BlogPosting'
}) {
    const serverUrl = getServerSideURL()
    return {
        '@context': 'https://schema.org',
        '@type': args.type || 'Article',
        headline: args.name,
        description: args.description,
        ...(args.image ? { image: [args.image] } : {}),
        ...(args.datePublished ? { datePublished: args.datePublished } : {}),
        author: {
            '@type': 'Organization',
            name: 'Smatch Digital',
            url: serverUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Smatch Digital',
            logo: {
                '@type': 'ImageObject',
                url: `${serverUrl}/Logo.svg`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': args.url,
        },
    }
}

/** WebSite schema with sitelinks searchbox — injected once in root layout */
export function getWebSiteJsonLd() {
    const serverUrl = getServerSideURL()

    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Smatch Digital',
        url: serverUrl,
        inLanguage: ['fr', 'en'],
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${serverUrl}/fr/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }
}

/** BreadcrumbList schema — use on detail pages */
export function getBreadcrumbJsonLd(
    items: { name: string; url: string }[],
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

/** Service schema — use on solution detail pages */
export function getServiceJsonLd(args: {
    name: string
    description: string
    url: string
    image?: string | null
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Software Solutions',
        provider: {
            '@type': 'Organization',
            name: 'Smatch Digital',
        },
        name: args.name,
        description: args.description,
        url: args.url,
        ...(args.image ? { image: args.image } : {}),
        areaServed: {
            '@type': 'Country',
            name: 'Morocco',
        },
    }
}
