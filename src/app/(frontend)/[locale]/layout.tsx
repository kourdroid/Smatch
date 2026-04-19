import type { Metadata, Viewport } from 'next'
import { cn } from '@/utilities/ui'
import React from 'react'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { ChatbotWidget, ChatbotProvider } from '@/components/Chatbot'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Antonio, Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getOrganizationJsonLd, getWebSiteJsonLd, getLocalBusinessJsonLd } from '@/utilities/jsonLd'
import { IntroLoader } from '@/components/Loader/IntroLoader'
import { i18nConfig, type Locale, isValidLocale } from '@/utilities/i18n'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { AnnouncementPopup } from '@/components/AnnouncementPopup'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from "@vercel/speed-insights/next"

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-antonio',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

/**
 * Generate static params for all supported locales
 * This enables static generation for all locale paths
 */
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { isEnabled } = await draftMode()
  const { locale } = await params

  // Validate locale - return 404 for invalid locales
  if (!isValidLocale(locale)) {
    notFound()
  }

  // Fetch Announcement Data
  const announcement = await getCachedGlobal('announcement', 1, locale as Locale)()

  return (
    <html
      className={cn(antonio.variable, inter.variable, jetbrains.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <SpeedInsights />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessJsonLd()),
          }}
        />
      </head>
      <body className="bg-smatch-black">
        <Analytics />
        <IntroLoader />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <ChatbotProvider>
            <Header locale={locale} />
            {children}
            <Footer locale={locale} />
            <AnnouncementPopup announcement={announcement} />
            <ChatbotWidget locale={locale} />
          </ChatbotProvider>
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string} />
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Smatch Digital | Solutions WMS & Supply Chain',
    template: '%s | Smatch Digital',
  },
  description:
    'SMATCH conçoit et déploie des solutions innovantes pour numériser et automatiser les processus métier des acteurs industriels, des prestataires logistiques et des institutions.',
  keywords: [
    'WMS',
    'Supply Chain',
    'IoT',
    'Maroc',
    'Industrie 4.0',
    'Digitalisation',
    'Logistique',
    'Smatch Digital',
  ],
  authors: [{ name: 'Smatch Digital', url: 'https://smatch.ma' }],
  creator: 'Smatch Digital',
  publisher: 'Smatch Digital',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    ...mergeOpenGraph(),
    title: 'Smatch Digital | Solutions WMS & Supply Chain',
    description:
      'SMATCH conçoit et déploie des solutions innovantes pour numériser et automatiser les processus métier des acteurs industriels, des prestataires logistiques et des institutions.',
    siteName: 'Smatch Digital',
    locale: 'fr_MA',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@smatchdigital',
    title: 'Smatch Digital',
    description:
      'SMATCH conçoit et déploie des solutions innovantes pour numériser et automatiser les processus métier des acteurs industriels, des prestataires logistiques et des institutions.',
  },
  alternates: {
    languages: {
      en: '/en',
      fr: '/fr',
      'x-default': '/fr',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050505',
}
