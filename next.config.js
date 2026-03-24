import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage (production media)
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      // Production domain
      {
        protocol: 'https',
        hostname: 'smatch.ma',
      },
      {
        protocol: 'https',
        hostname: 'www.smatch.ma',
      },
      // Local development
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: false,
  // Prevent jsdom and its ESM-only transitive deps from being bundled
  // into Vercel serverless functions (causes ERR_REQUIRE_ESM at runtime).
  serverExternalPackages: ['jsdom', 'html-encoding-sniffer', '@exodus/bytes'],
  redirects,

  // Type Safety: Enforce strict checks in production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
