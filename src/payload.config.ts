import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Solutions } from './collections/Solutions'
import { Projects } from './collections/Projects'
import { Team } from './collections/Team'
import { Actualites } from './collections/Actualites'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Announcement } from './globals/Announcement'
import { SolutionsOrder } from './globals/SolutionsOrder'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    theme: 'dark', // Force the admin panel to use dark mode
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
      afterNavLinks: ['@/components/Admin/IconLibraryLink'],
      views: {
        IconLibrary: {
          Component: '@/components/Admin/IconGalleryView',
          path: '/icons',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // Localization Configuration - Payload-Native i18n
  // English as default, French as secondary locale
  // Fallback enabled for content reliability (DDIA principle)
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Français',
        code: 'fr',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // src/payload.config.ts
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      // Vercel Serverless: each function gets its own pool.
      // Supabase Free Tier allows max 60 direct connections.
      // By setting max to 1, we guarantee 1 conn per serverless function, 
      // safely supporting up to 60 concurrent users even without the pooler.
      max: process.env.NODE_ENV === 'production' ? 1 : 10,
      min: 0,
      idleTimeoutMillis: 5000, // Release idle connections after 5s (serverless functions are short-lived)
      connectionTimeoutMillis: 10000, // Fail fast if pool is exhausted
      allowExitOnIdle: true,
    },
    // Only push in local dev, NEVER in production/CI builds
    push: process.env.PAYLOAD_PUSH === 'true',
  }),
  collections: [Pages, Posts, Media, Categories, Users, Solutions, Projects, Team, Actualites],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, SolutionsOrder, Announcement],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  // Resend Email Adapter Configuration
  email: resendAdapter({
    defaultFromAddress: process.env.FROM_EMAIL || 'contact@smatch.ma',
    defaultFromName: 'Smatch',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
