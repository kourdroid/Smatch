import type { MetadataRoute } from 'next'

/**
 * Dynamic robots.txt generation for Smatch Digital
 * This ensures the robots.txt is always served correctly
 * and isn't intercepted by the catch-all [slug] route.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://smatch.ma'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // Block private Payload API endpoints, but NOT /api/media/file/* (publicly served uploads)
                disallow: [
                    '/admin/',
                    '/_next/',
                    '/api/users',
                    '/api/payload-preferences',
                    '/api/payload-locked-documents',
                    '/api/payload-jobs',
                    '/api/graphql',
                    '/api/graphql-playground',
                ],
            },
            {
                userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'OAI-SearchBot'],
                allow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
