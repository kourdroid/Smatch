'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="z-50 flex items-center">
      {/* Glassmorphism Pill Container */}
      <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1.5 shadow-lg backdrop-blur-xl">

        {/* Home Button (Active State Simulation) */}
        <div className="rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-md">
           <span className="font-sans text-sm font-bold uppercase tracking-widest text-white">HOME</span>
        </div>

        {/* Other Links */}
        <div className="flex items-center gap-6 px-6">
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className="font-sans text-sm font-medium uppercase tracking-widest text-white/80 transition-colors hover:text-smatch-gold"
              />
            )
          })}
          {/* Fallback Static Links if CMS is empty during dev */}
          {/* SEO: Use valid relative paths instead of '#' for fallback links to ensure crawlability */}
          {navItems.length === 0 && (
            <>
              <a href="/" className="font-sans text-sm font-medium uppercase tracking-widest text-white/80 transition-colors hover:text-smatch-gold">A PROPOS</a>
              <a href="/solutions" className="font-sans text-sm font-medium uppercase tracking-widest text-white/80 transition-colors hover:text-smatch-gold">SOLUTIONS</a>
              <a href="/projects" className="font-sans text-sm font-medium uppercase tracking-widest text-white/80 transition-colors hover:text-smatch-gold">PROJECTS</a>
              <a href="/" className="font-sans text-sm font-medium uppercase tracking-widest text-white/80 transition-colors hover:text-smatch-gold">EXPERTISES</a>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}
