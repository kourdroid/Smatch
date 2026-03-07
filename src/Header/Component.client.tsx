'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { Header } from '@/payload-types'
import type { Locale } from '@/utilities/i18n'
// Import icons for the dock
import {
  SquaresFour, // The "Menu" icon
  House, // Home
  PhoneCall, // Contact
  X,
  ChatCircle, // Chatbot
} from '@phosphor-icons/react'
import {
  NavbarLayout,
  NavBrand,
  NavCenterPill,
  NavLinks,
  NavCTAContainer,
  CTAButton,
  MobileTopBar,
  MobileBottomDock,
  MobileMenuOverlay,
} from '@/components/ui/resizable-navbar'
import { NavLanguageSelector } from '@/components/ui/NavLanguageSelector'
import { useChatbot } from '@/components/Chatbot/ChatbotContext'

interface HeaderClientProps {
  data: Header | null
  locale: Locale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { isOpen: isChatOpen, toggleChat } = useChatbot()

  const navItems = data?.navItems || []

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true)
      else setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Data Transformation - properly resolve links and prefix with locale
  const items =
    navItems.length > 0
      ? navItems.map((item) => {
        let rawLink = '#'

        if (item.link.type === 'reference' && item.link.reference) {
          // Reference links: extract slug from the related document
          const ref = item.link.reference
          const doc = typeof ref.value === 'object' ? ref.value : null

          if (doc && 'slug' in doc && typeof doc.slug === 'string') {
            // Build URL based on collection type
            if (ref.relationTo === 'posts') {
              rawLink = `/posts/${doc.slug}`
            } else {
              // Pages and other collections
              rawLink = doc.slug === 'home' ? '/' : `/${doc.slug}`
            }
          }
        } else if (item.link.type === 'custom' && item.link.url) {
          // Custom URL: use as-is
          rawLink = item.link.url
        }

        // Prefix internal links with locale
        const link = typeof rawLink === 'string' && rawLink.startsWith('/')
          ? `/${locale}${rawLink}`
          : rawLink

        return {
          name: item.link.label || 'Link',
          link,
        }
      })
      : [
        { name: 'HOME', link: `/${locale}` },
        { name: 'A PROPOS', link: `/${locale}/about` },
        { name: 'SOLUTIONS', link: `/${locale}/solutions` },
        { name: 'PROJECTS', link: `/${locale}/projects` },
        { name: 'EXPERTISES', link: `/${locale}/expertises` },
      ]

  // SVG Logo - Homepage link prefixed with locale
  const LogoSVG = () => (
    <Link href={`/${locale}`} className="group flex items-center gap-3">
      <Image src='/logo.svg' alt='Smatch Logo' width={130} height={50} />
      {/* <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="#FFAA00" />
          <path
            d="M20 28C15.5817 28 12 24.4183 12 20C12 15.5817 15.5817 12 20 12C23.0984 12 25.7873 13.7618 27.1213 16.3333"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M20 24C17.7909 24 16 22.2091 16 20C16 17.7909 17.7909 16 20 16C22.2091 16 24 17.7909 24 20V20.5C24 21.8807 25.1193 23 26.5 23C27.8807 23 29 21.8807 29 20.5V16"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-heading font-extrabold text-[clamp(0.875rem,2vw,1rem)] leading-[0.9] text-white tracking-tight">
          SMATCH
        </span>
        <span className="font-sans font-medium text-[clamp(0.5rem,1vw,0.6rem)] leading-none text-white/60 tracking-[0.25em] mt-1">
          DIGITAL
        </span>
      </div> */}
    </Link>
  )

  return (
    <>
      <NavbarLayout className=''>
        {/* --- DESKTOP --- */}
        <NavBrand isScrolled={isScrolled}>
          <LogoSVG />
        </NavBrand>

        <NavCenterPill className="hidden md:flex">
          <NavLinks items={items} activePath={pathname} />
          {/* Divider */}
          <div className="mx-2 h-5 w-px bg-white/10" />
          <NavLanguageSelector />
        </NavCenterPill>

        <NavCTAContainer isScrolled={isScrolled}>
          <CTAButton href={`/${locale}/contact`}>{locale === 'fr' ? 'Nous Contacter' : 'Contact Us'}</CTAButton>
        </NavCTAContainer>

        {/* --- MOBILE --- */}

        {/* 1. Top Bar: Just the Logo (Static branding) */}
        <MobileTopBar>
          <LogoSVG />
        </MobileTopBar>

        {/* 2. Bottom Dock: The "Tactical" Navigation */}
        <MobileBottomDock>
          {/* Home Button */}
          <Link
            href={`/${locale}`}
            className={`rounded-full p-2 transition-colors ${pathname === `/${locale}` ? 'text-[#FFAA00]' : 'text-white/60'}`}
            aria-label={locale === 'fr' ? 'Accueil' : 'Home'}
          >
            <House size={24} weight={pathname === `/${locale}` ? 'fill' : 'regular'} />
          </Link>

          <div className="mx-2 h-6 w-px bg-white/10" />

          {/* Menu Trigger (Central Action) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-full bg-[#FFAA00] p-3 text-black shadow-[0_0_15px_rgba(255,170,0,0.3)] transition-transform active:scale-95"
            aria-label={locale === 'fr' ? 'Ouvrir le menu principal' : 'Open main menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-overlay"
          >
            <SquaresFour size={24} weight="bold" />
          </button>

          <div className="mx-2 h-6 w-px bg-white/10" />

          {/* Chatbot Trigger */}
          <button
            onClick={toggleChat}
            className={`relative rounded-full p-2 transition-colors ${isChatOpen ? 'text-[#FFAA00]' : 'text-white/60 hover:text-[#FFAA00]'}`}
            aria-label="Ouvrir le chat"
          >
            <ChatCircle size={24} weight={isChatOpen ? 'fill' : 'regular'} />
            {/* Pulse indicator when chat is closed */}
            {!isChatOpen && (
              <span className="absolute right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-[#FFAA00]" />
            )}
          </button>
        </MobileBottomDock>

        {/* 3. The Menu Sheet (Slides up from bottom) */}
        <MobileMenuOverlay isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} id="mobile-menu-overlay">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">
              {locale === 'fr' ? 'Navigation' : 'Navigation'}
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full bg-white/5 p-2 text-white"
              aria-label={locale === 'fr' ? 'Fermer le menu' : 'Close menu'}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="group flex items-center justify-between font-heading text-2xl font-bold uppercase tracking-wider text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
                <span className="size-2 rounded-full bg-[#FFAA00] opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}

            <div className="my-4 h-px w-full bg-white/10" />

            {/* Extra Info in Menu */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href={`/${locale}/contact`}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#FFAA00] py-4 text-center text-sm font-bold uppercase tracking-widest text-black"
              >
                {locale === 'fr' ? 'Démarrer un Projet' : 'Start Project'}
              </Link>
              <Link
                href={`/${locale}/journal`}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-4 text-center text-sm font-bold uppercase tracking-widest text-white"
              >
                Journal
              </Link>
            </div>

            {/* Language Selector */}
            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                {locale === 'fr' ? 'Langue' : 'Language'}
              </span>
              <NavLanguageSelector openUp />
            </div>
          </div>
        </MobileMenuOverlay>
      </NavbarLayout>
    </>
  )
}
