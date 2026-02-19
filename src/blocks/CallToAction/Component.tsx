import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ headline, subheadline, link }) => {
  return (
    <section className="relative my-8 overflow-hidden bg-smatch-black py-16 md:py-20">
      {/* Background Gold Glow */}
      {/* <div className="absolute left-1/2 top-1/2 z-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-smatch-gold/5 blur-[100px]" /> */}

      {/* Subtle Ring Effects */}
      {/* <div className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-smatch-gold/10" /> */}
      {/* <div className="absolute left-1/2 top-1/2 size-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-smatch-gold/5" /> */}

      <div className="container relative z-10 px-4 text-center">
        {headline && (
          <h2 className="mb-6 font-heading text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl">
            {headline}
          </h2>
        )}

        {subheadline && (
          <p className="mx-auto mb-10 max-w-2xl font-sans text-lg text-smatch-text-secondary">
            {subheadline}
          </p>
        )}

        {link && (
          <CMSLink
            {...link}
            size="lg"
            className="min-w-[200px] font-bold uppercase tracking-wider"
          />
        )}
      </div>
    </section>
  )
}
