'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Spotlight } from '@/components/ui/spotlight'
import { cn } from '@/utilities/ui'

interface ExpertiseHeroProps {
  title?: string
  subtitle?: string
  image?: string
  className?: string
}

export function ExpertiseHero({
  title = 'PÔLES DE COMPÉTENCE.',
  subtitle = "Ingénierie & Transformation. Nous combinons expertise technique et connaissance métier pour déployer des solutions critiques à l'échelle industrielle.",
  image = '/assets/hero/ExpertiseHero.webp', // Default placeholder
  className,
}: ExpertiseHeroProps) {
  return (
    <section
      className={cn(
        'relative mx-auto flex h-screen min-h-[90vh] items-center justify-center overflow-hidden bg-smatch-black',
        className,
      )}
    >
      {/* Background Effects */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 " fill="#FFAA00" />
      <Spotlight
        className="-top-40 left-0 opacity-50 mix-blend-overlay md:-top-40 md:left-10"
        fill="#FFE6A1"
      />
      <Spotlight className="-top-40 left-0 md:-top-40 md:left-[30rem]" fill="#FFAA00" />

      {/* Full-bleed Background Image */}
      <div className="absolute inset-0 z-0 size-full">
        {image && <Image src={image} alt={title} fill className="object-cover" priority />}
      </div>

      <div className="container relative z-10 flex flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          className="flex flex-col items-center"
        >
          {/* Typography */}
          <h1 className="mb-6 max-w-5xl font-heading text-4xl font-bold uppercase leading-none tracking-tight text-white drop-shadow-md sm:text-5xl md:text-7xl lg:text-8xl">
            {title}
          </h1>

          <p className="mb-6 max-w-2xl text-sm font-light text-white md:mb-10 md:text-xl">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
