'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowRight } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import type { Announcement } from '@/payload-types'

interface AnnouncementPopupProps {
  announcement: Announcement | null
}

export const AnnouncementPopup: React.FC<AnnouncementPopupProps> = ({ announcement }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [resolvedAnnouncement, setResolvedAnnouncement] = useState<Announcement | null>(
    announcement,
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setResolvedAnnouncement(announcement)
  }, [announcement])

  useEffect(() => {
    if (!isMounted) return
    if (!announcement) {
      const localeFromLang = document.documentElement.lang || 'en'
      fetch(
        `/api/globals/announcement?depth=1&locale=${encodeURIComponent(localeFromLang)}&fallback-locale=en`,
      )
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setResolvedAnnouncement(data as Announcement)
        })
        .catch(() => null)
    }
  }, [announcement, isMounted])

  useEffect(() => {
    if (!isMounted) return
    if (
      !resolvedAnnouncement?.isActive ||
      !resolvedAnnouncement.layout ||
      !resolvedAnnouncement.layout[0]
    )
      return

    const path = window.location.pathname
    const isHome =
      path === '/' ||
      /^\/(en|fr)\/?$/.test(path)

    if (!isHome) return

    const open = () => setIsOpen(true)

    window.addEventListener('smatch:intro-finished', open)
    const fallbackTimer = window.setTimeout(open, 3500)

    return () => {
      window.removeEventListener('smatch:intro-finished', open)
      window.clearTimeout(fallbackTimer)
    }
  }, [isMounted, resolvedAnnouncement])

  const handleClose = () => {
    setIsOpen(false)
  }

  // Prevent hydration mismatch by not rendering anything on the server
  if (!isMounted) return null

  if (
    !resolvedAnnouncement?.isActive ||
    !resolvedAnnouncement.layout ||
    !resolvedAnnouncement.layout[0]
  )
    return null

  const block = resolvedAnnouncement.layout[0]

  // Render specific layout based on block type
  if (block.blockType === 'seafoodEvent') {
    const { image, title, description, highlightText, detailsBox, tags, buttons } = block

    const imageUrl = typeof image === 'object' && image?.url ? image.url : null
    const imageAlt = typeof image === 'object' && image?.alt ? image.alt : 'Announcement Image'
    const imageAspectRatio =
      typeof image === 'object' && image?.width && image?.height
        ? `${image.width} / ${image.height}`
        : '2 / 3'

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="smatch-backdrop-blur-sm absolute inset-0 bg-black/60"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
              className="relative flex max-h-[85vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] shadow-2xl"
            >
              {/* Noise Overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Close Button */}
              {/* SEO: Add aria-label to icon-only button for better accessibility and semantics */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/20 p-2 text-white/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#FFAA00] hover:bg-[#FFAA00] hover:text-black md:right-6 md:top-6"
                aria-label="Fermer l'annonce"
              >
                <X size={20} weight="bold" />
              </button>

              <div className="relative z-10 flex min-h-0 flex-1 flex-col lg:flex-row">
                {/* Left Side: Image */}
                <div className="relative flex min-h-[180px] w-full shrink-0 items-center justify-center bg-white/[0.02] p-5 sm:min-h-[200px] sm:p-6 lg:h-auto lg:min-h-0 lg:w-1/2 lg:p-8">
                  {/* Inner Border/Container for Image */}
                  <div
                    className="relative flex w-full max-w-[500px] items-center justify-center rounded-xl border border-white/10 bg-[#0F0F0F] p-4 shadow-inner sm:p-6"
                    style={{ aspectRatio: imageAspectRatio }}
                  >
                    {imageUrl && (
                      <div className="relative size-full">
                        <Image src={imageUrl} alt={imageAlt} fill className="object-contain" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="flex w-full flex-col justify-between overflow-hidden p-5 sm:p-6 lg:w-1/2 lg:p-8">
                  {/* Title */}
                  <h2 className="mb-2 font-heading text-2xl font-black uppercase tracking-tighter text-white sm:text-3xl lg:text-4xl">
                    {title}
                  </h2>

                  {/* Highlight Text (Date) */}
                  {highlightText && (
                    <div className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FFAA00]">
                      {highlightText}
                    </div>
                  )}

                  <div className="mb-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-2">
                    <div className="font-sans text-base font-light leading-relaxed text-gray-400 lg:text-lg">
                      <div
                        dangerouslySetInnerHTML={{ __html: description }}
                        className="[&>p:last-child]:mb-0 [&>p]:mb-4"
                      />
                    </div>

                    {detailsBox && (
                      <div className="rounded-sm border-l-2 border-[#FFAA00] bg-white/5 p-4 backdrop-blur-md">
                        <div className="font-sans text-base font-light italic leading-relaxed text-white lg:text-lg">
                          <div dangerouslySetInnerHTML={{ __html: detailsBox }} />
                        </div>
                      </div>
                    )}

                    {tags && tags.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {tags.map((tag, idx) => (
                          <div
                            key={idx}
                            className="flex items-center overflow-hidden rounded-sm border border-white/10 bg-white/[0.02]"
                          >
                            <div className="bg-white/5 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-300">
                              {tag.label}
                            </div>
                            <div className="px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFAA00]">
                              {tag.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  {buttons && buttons.length > 0 && (
                    <div className="mt-auto flex flex-col gap-4 sm:flex-row">
                      {buttons.map((btn, idx) => {
                        const href =
                          btn.link.type === 'reference' &&
                            typeof btn.link.reference?.value === 'object'
                            ? `/${btn.link.reference.value.slug === 'home' ? '' : btn.link.reference.value.slug}`
                            : btn.link.url || '#'

                        const isSolid = btn.style === 'solid'

                        return (
                          <Link
                            key={idx}
                            href={href}
                            onClick={handleClose}
                            target={btn.link.newTab ? '_blank' : undefined}
                            className={`flex  items-center justify-center rounded-sm px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${isSolid
                              ? 'bg-[#FFAA00] text-black shadow-[0_0_20px_rgba(255,170,0,0.3)] hover:bg-white hover:shadow-[0_0_30px_rgba(255,170,0,0.6)]'
                              : 'border border-white/20 text-white hover:border-[#FFAA00] hover:bg-white/5'
                              }`}
                          >
                            {/* Force text color and ensure valid React node */}
                            <span className={`${isSolid ? 'text-black' : 'text-white'} w-full`} >
                              {btn.link.label || 'Voir Plus'}
                            </span>
                            {isSolid && <ArrowRight weight="bold" className="ml-2 text-black" />}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }

  return null
}
