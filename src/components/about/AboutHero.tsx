import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Spotlight } from '../ui/spotlight'

export interface AboutHeroProps {
  headline: string
  subheadline: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
}

export function AboutHero({
  headline,
  subheadline,
  primaryCtaLabel = 'CONTACTEZ-NOUS',
  secondaryCtaLabel = 'DÉCOUVRIR LES OFFRES',
}: AboutHeroProps) {
  return (
    <section className="relative mx-auto flex h-screen min-h-[90vh] items-center justify-center overflow-hidden bg-smatch-black pt-20">
      {/* Background Effects */}
      <div className="absolute inset-x-0 bottom-0 z-10 size-full bg-gradient-to-t from-smatch-black to-transparent"></div>
      <div className="absolute inset-0 z-0 ">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 " fill="#FFAA00" />
        <Spotlight
          className="-top-40 left-0 opacity-50 mix-blend-overlay md:-top-40 md:left-10"
          fill="#FFE6A1"
        />
        <Spotlight className="-top-40 left-0 md:-top-40 md:left-[30rem]" fill="#FFAA00" />
        {/* SEO: Add descriptive alt text for the background hero image to improve image search indexation and accessibility */}
        <Image className="object-cover " src={'/assets/hero/AboutHero.webp'} alt="Équipe SMATCH Digital en pleine collaboration" fill priority />
        <div className="absolute left-1/2 top-1/2 size-[80vw] max-h-[800px] max-w-[800px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-smatch-gold/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
        <h1 className="mb-6 max-w-5xl font-heading text-5xl font-bold uppercase leading-none tracking-tight text-white drop-shadow-md md:text-7xl lg:text-8xl">
          {headline}
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-smatch-text-secondary md:text-xl">
          {subheadline}
        </p>
      </div>
    </section>
  )
}
