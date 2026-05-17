'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import Link from 'next/link'

const INTRO_DATA = {
  headingPart1: 'QUI SOMMES',
  headingPart2: 'NOUS?',
  tag: '/// ORIGIN_STORY',
  description:
    "SMATCH Digital accélère la transformation numérique de ses partenaires à travers des solutions technologiques centrées sur l'humain, combinant expertise métier et innovations. En tant qu'intégrateur et éditeur, nous intervenons dans les secteurs industriel, logistique, agricole et touristique en apportant des solutions prêtes à la mise en œuvre. La traçabilité, l'IoT, l'automatisation, l'IA et la Data Intelligence sont autant de briques qui composent l'apanage de nos solutions. Notre approche favorise l'interopérabilité, la valorisation des données, et l'adoption des technologies intelligentes au service de la performance terrain.",
  cta: 'CASABLANCA, MA',
}

export interface QuiSommesNousProps {
  title?: string
  description?: string
  locationLabel?: string
  ctaLink?: string
}

export function QuiSommesNous({ title, description, locationLabel, ctaLink }: QuiSommesNousProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Parallax effect for the background text (moves slower than scroll)
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.1, 0.05])

  // Mouse Interaction Logic for the "Spotlight" effect on headings
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-[#050505] py-32"
    >
      {/* 1. Top Yellow Glow (Ambient Light) */}
      <div className="pointer-events-none absolute left-1/2 top-[-100px] z-0 h-[200px] w-[60vw] -translate-x-1/2 bg-[#FFAA00] opacity-70 blur-[150px]" />

      {/* 2. Parallax Background Text */}
      <div className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center mix-blend-overlay">
        <motion.span
          style={{
            y: bgTextY,
            opacity: bgTextOpacity,
            WebkitTextStroke: '1.5px rgba(255,255,255,1)',
          }}
          className="whitespace-nowrap font-heading text-[50vw] font-black leading-none text-transparent mix-blend-overlay"
        >
          SMATCH
        </motion.span>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Headings */}
          <div className="group/text relative flex select-none flex-col lg:col-span-7">
            {/* Animated Entry Wrapper */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col gap-8"
            >
              {/* Solid White Text */}
              <h2 className="relative z-10 font-heading text-7xl font-black uppercase leading-[0.85] tracking-tighter text-white md:text-8xl lg:text-[11rem]">
                {INTRO_DATA.headingPart1}
              </h2>

              {/* Outlined Gold Text with Hover Fill Effect */}
              <div className="relative">
                {/* The Stroke Version */}
                <h2
                  className="relative left-1 z-10 font-heading text-7xl font-black uppercase leading-[0.85] tracking-tighter text-transparent transition-colors duration-500 md:left-4 md:text-8xl lg:text-[11rem]"
                  style={{ WebkitTextStroke: '3px #FFAA00' }}
                >
                  {title ? title.split(' ').slice(1).join(' ') : INTRO_DATA.headingPart2}
                </h2>

                {/* The "Filling" Version (clip-path animation could go here, but let's do a glow) */}
                <motion.div className="pointer-events-none absolute inset-0 bg-[#FFAA00] opacity-0 blur-[80px] transition-opacity duration-700 group-hover/text:opacity-20" />
              </div>

              {/* Decorative Parallelogram (The little yellow shape in image) */}
              {/* <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute top-[45%] left-[20%] w-12 h-12 border-2 border-[#FFAA00] -skew-x-12 opacity-50 hidden lg:block"
              /> */}
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center pl-2 pt-8 lg:col-span-5 lg:pl-12 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              {/* Tag */}
              <div className="mb-8 flex items-center gap-3">
                <span className="h-4 w-1 bg-[#FFAA00]" /> {/* Small accent bar */}
                <span className="font-mono text-sm uppercase tracking-[0.2em] text-gray-500">
                  {INTRO_DATA.tag}
                </span>
              </div>

              {/* Description */}
              <p className="mb-12 max-w-lg border-l border-white/10 pl-6 text-justify font-sans text-sm leading-relaxed text-[#A0A0A0] md:text-[15px]">
                {description || INTRO_DATA.description}
              </p>

              {/* CTA Button */}
              <div>
                {/* SEO: Using Next.js <Link> with href instead of meaningless <button> improves crawlability for search engines */}
                <Link
                  href={ctaLink || '#'}
                  className="group relative inline-block overflow-hidden rounded-[6px] border border-gray-800 bg-transparent px-8 py-3 transition-colors duration-300"
                >
                  {/* Hover Background Fill */}
                  <span className="absolute inset-0 translate-y-full bg-[#FFAA00] transition-transform duration-300 ease-out group-hover:translate-y-0" />

                  {/* Text Content */}
                  <span className="relative flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors duration-300 group-hover:text-black">
                    {locationLabel || INTRO_DATA.cta}
                    {/* Tiny animated arrow */}
                    <span className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      &rarr;
                    </span>
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
