import type { MetadataRoute } from 'next'
import { getPayload } from '@/getPayload'
import { i18nConfig } from '@/utilities/i18n'

/**
 * Dynamic sitemap generation for Smatch Digital
 * Automatically includes all published pages from the CMS.
 * Generates entries for all supported locales.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://smatch.ma'
    const sitemapEntries: MetadataRoute.Sitemap = []

    try {
        const payload = await getPayload()

        // Fetch all dynamic content
        const [pages, projects, posts, solutions] = await Promise.all([
            payload.find({
                collection: 'pages',
                draft: false,
                depth: 0,
                limit: 1000,
                pagination: false,
                select: { slug: true, updatedAt: true },
            }),
            payload.find({
                collection: 'projects',
                draft: false,
                depth: 0,
                limit: 1000,
                pagination: false,
                select: { slug: true, updatedAt: true },
            }),
            payload.find({
                collection: 'posts',
                draft: false,
                depth: 0,
                limit: 1000,
                pagination: false,
                select: { slug: true, updatedAt: true },
            }),
            payload.find({
                collection: 'solutions',
                draft: false,
                depth: 0,
                limit: 1000,
                pagination: false,
                select: { slug: true, updatedAt: true },
            }),
        ])

        // Iterate over each locale to generate localized URLs
        for (const locale of i18nConfig.locales) {
            const localePrefix = `/${locale}`

            // Static Pages (Localized)
            sitemapEntries.push(
                {
                    url: `${baseUrl}${localePrefix}`,
                    lastModified: new Date(),
                    changeFrequency: 'daily',
                    priority: 1.0,
                },
                {
                    url: `${baseUrl}${localePrefix}/solutions`,
                    lastModified: new Date(),
                    changeFrequency: 'daily',
                    priority: 0.8,
                },
                {
                    url: `${baseUrl}${localePrefix}/projects`,
                    lastModified: new Date(),
                    changeFrequency: 'daily',
                    priority: 0.8,
                },
                {
                    url: `${baseUrl}${localePrefix}/contact`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.7,
                },
                {
                    url: `${baseUrl}${localePrefix}/posts`,
                    lastModified: new Date(),
                    changeFrequency: 'daily',
                    priority: 0.8,
                },
                {
                    url: `${baseUrl}${localePrefix}/search`,
                    lastModified: new Date(),
                    changeFrequency: 'monthly',
                    priority: 0.5,
                }
            )

            // Dynamic Pages
            pages.docs.forEach((page) => {
                if (page.slug && page.slug !== 'home') {
                    sitemapEntries.push({
                        url: `${baseUrl}${localePrefix}/${page.slug}`,
                        lastModified: new Date(page.updatedAt),
                        changeFrequency: 'weekly',
                        priority: 0.7,
                    })
                }
            })

            // Projects
            projects.docs.forEach((project) => {
                if (project.slug) {
                    sitemapEntries.push({
                        url: `${baseUrl}${localePrefix}/projects/${project.slug}`,
                        lastModified: new Date(project.updatedAt),
                        changeFrequency: 'weekly',
                        priority: 0.6,
                    })
                }
            })

            // Posts
            posts.docs.forEach((post) => {
                if (post.slug) {
                    sitemapEntries.push({
                        url: `${baseUrl}${localePrefix}/posts/${post.slug}`,
                        lastModified: new Date(post.updatedAt),
                        changeFrequency: 'weekly',
                        priority: 0.6,
                    })
                }
            })

            // Solutions
            solutions.docs.forEach((solution) => {
                if (solution.slug) {
                    sitemapEntries.push({
                        url: `${baseUrl}${localePrefix}/solutions/${solution.slug}`,
                        lastModified: new Date(solution.updatedAt),
                        changeFrequency: 'weekly',
                        priority: 0.8, // Higher priority for solutions
                    })
                }
            })
        }

        return sitemapEntries
    } catch (error) {
        console.error('Sitemap generation error:', error)
        // Fallback to static pages for default locale if CMS fails
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
            },
        ]
    }
}
