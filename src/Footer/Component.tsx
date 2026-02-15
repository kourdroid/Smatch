import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import type { Footer } from '@/payload-types'
import type { Locale } from '@/utilities/i18n'
import { LinkedinLogo, YoutubeLogo, XLogo, Envelope, Phone, Buildings } from '@phosphor-icons/react/dist/ssr'

interface FooterProps {
  locale: Locale
}

export async function Footer({ locale }: FooterProps) {
  await getCachedGlobal('footer', 1, locale)()

  return (
    <footer className="relative mt-4 w-full overflow-hidden bg-smatch-black text-white md:mt-6">
      {/* Background Watermark - "SMATCH" stroked text at bottom */}
      <div className="pointer-events-none absolute bottom-[-4vw] left-0 z-0 flex w-full select-none justify-center overflow-hidden mix-blend-overlay">
        <Image className='object-contain' src={'/assets/footer/bg.png'} alt='bg' width={1600} height={500} />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-12">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 gap-16 py-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* COLUMN 1: Brand Identity */}
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div>
              <Image
                src="/logo.svg"
                alt="SMATCH DIGITAL"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-white">
                Éditeur. Intégrateur. Partenaire.
              </h3>
              <p className="max-w-xs font-sans text-sm font-medium leading-relaxed text-gray-500">
                Nous accélérons la transformation numérique des entreprises par des solutions technologiques centrées sur l&apos;humain, l&apos;IoT et la data intelligence.
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-5">
              <Link href="#" className="text-white/60 transition-all hover:scale-110 hover:text-smatch-gold" aria-label="Suivez-nous sur X (Twitter)">
                <XLogo size={22} weight="fill" />
              </Link>
              <Link href="#" className="text-white/60 transition-all hover:scale-110 hover:text-smatch-gold" aria-label="Suivez-nous sur LinkedIn">
                <LinkedinLogo size={22} weight="fill" />
              </Link>
              <Link href="#" className="text-white/60 transition-all hover:scale-110 hover:text-smatch-gold" aria-label="Suivez-nous sur YouTube">
                <YoutubeLogo size={22} weight="fill" />
              </Link>
            </div>
          </div>

          {/* COLUMN 2: Écosystème */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Écosystème</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Supply Chain & Logistique (WMS/TMS)
                </Link>
              </li>
              <li>
                <Link href="#" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Industrie X.0 & IoT
                </Link>
              </li>
              <li>
                <Link href="#" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  AgriTech & Smart Assets (Ksibti)
                </Link>
              </li>
              <li>
                <Link href="#" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Big Data & AI Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: SM@TCH */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-white">SM@TCH</h4>
            <ul className="space-y-4">
              <li>
                <Link href={`/${locale}/about`} className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/projects`} className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Nos Projets & Réalisations
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/journal`} className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Journal des Opérations
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/careers`} className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Carrières
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Contact & Bureaux */}
          <div className="flex flex-col gap-8">
            {/* Contact Info */}
            <div className="space-y-5">
              {/* Email */}
              <a href="mailto:contact@smatch.ma" className="group flex items-center gap-3 transition-colors">
                <Envelope size={18} className="text-smatch-gold" />
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-gray-600">Discutez avec nous</span>
                  <span className="font-sans text-sm font-medium text-white group-hover:text-smatch-gold">Contact@smatch.ma</span>
                </div>
              </a>

              {/* Phone */}
              <a href="tel:+212520001878" className="group flex items-center gap-3 transition-colors">
                <Phone size={18} className="text-smatch-gold" />
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-gray-600">Appelez-nous</span>
                  <span className="font-sans text-sm font-medium text-white group-hover:text-smatch-gold">+212 520001878</span>
                </div>
              </a>
            </div>

            {/* Offices */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Buildings size={18} className="text-smatch-gold" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-smatch-gold">Nos Locaux</span>
              </div>

              <div className="space-y-3 pl-1">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-gray-600">Locaux Équipe Technique</span>
                  <span className="font-sans text-sm font-medium text-white">TECHNOPARK, Casablanca</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-gray-600">Entrepôt Tests Concepts (POC, MVP)</span>
                  <span className="font-sans text-sm font-medium text-white">SOFTPARK, Ainsebaa, Casablanca</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-gray-600">Locaux Administratifs</span>
                  <span className="font-sans text-sm font-medium text-white">Q.Palmier, Casablanca</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 md:mt-20 md:flex-row md:pt-8">
          <p className="font-mono text-xs text-gray-600">
            © {new Date().getFullYear()} SMATCH DIGITAL. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="font-mono text-xs text-gray-600 transition-colors hover:text-white">
              Politique de confidentialité
            </Link>
            <Link href={`/${locale}/terms`} className="font-mono text-xs text-gray-600 transition-colors hover:text-white">
              Conditions d&apos;utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

