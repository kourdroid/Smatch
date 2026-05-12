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
        '@id': `${serverUrl}/#organization`,
        name: 'Smatch Digital',
        alternateName: ['SMATCH', 'SM@TCH'],
        url: serverUrl,
        logo: {
            '@type': 'ImageObject',
            url: `${serverUrl}/Logo.svg`,
            width: 512,
            height: 512
        },
        foundingDate: '2015',
        description:
            'SMATCH conçoit et déploie des solutions innovantes pour numériser et automatiser les processus métier des acteurs industriels, des prestataires logistiques et des institutions.',
        telephone: '+212 520001878',
        email: 'contact@smatch.ma',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Technopark Casablanca',
            addressLocality: 'Casablanca',
            addressRegion: 'Casablanca-Settat',
            postalCode: '20000',
            addressCountry: 'MA',
        },
        areaServed: { '@type': 'Country', name: 'Morocco' },
        sameAs: [
            'https://www.linkedin.com/company/smatch-digital',
            'https://twitter.com/smatchdigital',
            'https://www.youtube.com/@smatchdigital',
            'https://www.facebook.com/smatchdigital'
        ],
        knowsAbout: ['WMS', 'TMS', 'IoT', 'Supply Chain Management', 'Warehouse Management'],
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
}) {
    const serverUrl = getServerSideURL()
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
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
export function getWebSiteJsonLd(locale: string = 'fr') {
    const serverUrl = getServerSideURL()

    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Smatch Digital',
        url: serverUrl,
        inLanguage: ['fr', 'en'],
        // SEO: Dynamically use the current locale for the search action to ensure search engine sitelinks direct users to the correct localized search page.
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${serverUrl}/${locale}/search?q={search_term_string}`,
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

/** LocalBusiness schema — injected once in root layout */
export function getLocalBusinessJsonLd() {
    const serverUrl = getServerSideURL()

    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${serverUrl}/#localbusiness`,
        name: 'Smatch Digital',
        image: `${serverUrl}/Logo.svg`,
        url: serverUrl,
        telephone: '+212 520001878',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Technopark Casablanca',
            addressLocality: 'Casablanca',
            addressRegion: 'Casablanca-Settat',
            postalCode: '20000',
            addressCountry: 'MA',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '33.589886',
            longitude: '-7.603869'
        },
        priceRange: '$$$',
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00'
            }
        ]
    }
}

/** SoftwareApplication schema — use on solution detail pages */
export function getSoftwareApplicationJsonLd(args: {
    name: string
    description: string
    url: string
    applicationCategory?: string
    operatingSystem?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: args.name,
        description: args.description,
        url: args.url,
        applicationCategory: args.applicationCategory || 'BusinessApplication',
        operatingSystem: args.operatingSystem || 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'MAD'
        }
    }
}

/** FAQPage schema — use on pages with FAQ sections */
export function getFAQPageJsonLd(faqs: { question: string; answer: string }[]) {
    if (!faqs || faqs.length === 0) return null;
    
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}

/** BlogPosting schema — use on actualites detail pages */
export function getBlogPostingJsonLd(args: {
    headline: string
    description: string
    url: string
    datePublished?: string
    dateModified?: string
    image?: string | null
    authorName?: string
}) {
    const serverUrl = getServerSideURL()
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': args.url,
        },
        headline: args.headline,
        description: args.description,
        ...(args.image ? { image: [args.image] } : {}),
        ...(args.datePublished ? { datePublished: args.datePublished } : {}),
        ...(args.dateModified ? { dateModified: args.dateModified } : {}),
        author: {
            '@type': 'Person',
            name: args.authorName || 'Smatch Digital Team',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Smatch Digital',
            logo: {
                '@type': 'ImageObject',
                url: `${serverUrl}/Logo.svg`,
            },
        },
    }
}
