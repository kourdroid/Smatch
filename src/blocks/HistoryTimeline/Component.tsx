'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import type { HistoryTimelineBlock } from '@/payload-types'

export const HistoryTimelineBlockComponent: React.FC<HistoryTimelineBlock> = ({
  title = "Historique de l'entreprise",
  events
}) => {
  const safeEvents = events || []

  // Find the index where Smatch era starts
  const smatchEraStartIndex = safeEvents.findIndex(e => e.isSmatchEraStart)

  // Helper to determine if an event is in the Smatch era (gold) or pre-Smatch (grey)
  // Position-relative: events AT or BEFORE marker (visually above) = gold
  // Events AFTER marker (visually below) = grey
  const isPostSmatch = (index: number): boolean => {
    // If no marker is set, default to all gold (modern look)
    if (smatchEraStartIndex === -1) return true
    // Events at or before the marker in array order are Smatch era (gold)
    return index <= smatchEraStartIndex
  }

  return (
    <section className="relative overflow-hidden bg-[#050505] py-20">
      {/* Background Radial Glow (Left Side) */}
      <div className="pointer-events-none absolute left-0 top-1/2 size-[600px] -translate-y-1/2 bg-gradient-to-r from-[#FFAA00]/10 to-transparent opacity-40 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center font-heading text-3xl font-bold uppercase tracking-wide text-white md:text-4xl"
        >
          {title}
        </motion.h2>

        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Line - Split gradient based on era marker position */}
          {(() => {
            // Calculate the percentage where gold section ends
            // Gold runs from top to the marker node, grey runs from marker to bottom
            const totalEvents = safeEvents.length
            const goldPercentage = smatchEraStartIndex === -1
              ? 100
              : Math.round(((smatchEraStartIndex + 1) / totalEvents) * 100)

            return (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-y-0 left-[20px] w-px origin-top -translate-x-1/2 md:inset-x-0 md:mx-auto md:translate-x-0"
                style={{
                  background: smatchEraStartIndex === -1
                    ? 'linear-gradient(to bottom, rgba(255,255,255,0.05), #FFAA00, rgba(255,255,255,0.05))'
                    : `linear-gradient(to bottom, #FFAA00 0%, #FFAA00 ${goldPercentage}%, #374151 ${goldPercentage}%, #374151 100%)`
                }}
              />
            )
          })()}

          <div className="flex flex-col gap-24">
            {safeEvents.map((event, index) => {
              const isEven = index % 2 === 0
              const isGold = isPostSmatch(index)
              const isEraStart = index === smatchEraStartIndex

              // Define variants inside to use isEven logic easily
              const rowVariants: Variants = {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.15
                  }
                }
              }

              const contentVariants: Variants = {
                hidden: { opacity: 0, x: isEven ? -50 : 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }

              const nodeVariants: Variants = {
                hidden: { scale: 0, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 200, damping: 20 }
                }
              }

              const versionVariants: Variants = {
                hidden: { opacity: 0, x: isEven ? 50 : -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }

              return (
                <motion.div
                  key={event.id || index}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center md:justify-between ${isEven ? 'flex-row' : 'flex-row md:flex-row-reverse'} ${!isGold ? 'opacity-60' : 'opacity-100'}`}
                >
                  {/* Era Divider - Same line as the marker node */}
                  {isEraStart && (
                    <div className="pointer-events-none absolute inset-x-0 top-full mt-12 flex -translate-y-1/2 items-center justify-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-smatch-gold/30 to-transparent" />
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-smatch-gold/30 to-transparent" />
                    </div>
                  )}

                  {/* Content Side (Title & Desc) */}
                  <motion.div
                    variants={contentVariants}
                    className={`w-full pl-16 md:w-[45%] md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <div className="group">
                      {/* Date */}
                      {event.year && (
                        <span className={`mb-2 block font-mono text-xs font-semibold uppercase tracking-widest ${isGold
                          ? event.isCurrent ? 'text-smatch-gold' : 'text-gray-400'
                          : 'text-gray-600'
                          }`}>
                          {event.year}
                        </span>
                      )}
                      <h3 className={`mb-2 font-heading text-3xl font-bold uppercase tracking-tight transition-colors duration-300 md:text-4xl ${isGold
                        ? event.isCurrent ? 'text-smatch-gold' : 'text-white group-hover:text-smatch-gold'
                        : 'text-gray-400 group-hover:text-gray-300'
                        }`}>
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className={`font-mono text-sm uppercase leading-relaxed tracking-wide md:text-base ${isGold ? 'text-gray-500' : 'text-gray-600/60'
                          }`}>
                          {event.description}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* Node on Line */}
                  <motion.div
                    variants={nodeVariants}
                    className="absolute left-[20px] z-10 flex size-12 -translate-x-1/2 items-center justify-center md:inset-x-0 md:mx-auto md:translate-x-0"
                  >
                    {/* Glow Effect for Current Node */}
                    {event.isCurrent && isGold && (
                      <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-smatch-gold/30 blur-md" />
                    )}

                    <div className={`relative z-10 size-3 rounded-full backdrop-blur-md transition-colors duration-300 ${isGold
                      ? event.isCurrent
                        ? 'bg-smatch-gold shadow-[0_0_15px_#FFAA00]'
                        : 'border border-smatch-gold/40 bg-smatch-gold/20'
                      : 'border border-gray-600 bg-gray-700'
                      }`} />
                  </motion.div>

                  {/* Version Tag Side */}
                  <motion.div
                    variants={versionVariants}
                    className={`hidden w-[45%] items-center md:flex ${isEven ? 'justify-start' : 'justify-end'}`}
                  >
                    {event.isCurrent && isGold ? (
                      <div className="rounded-[2px] border border-smatch-gold bg-smatch-gold/5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-smatch-gold">
                        {event.version || 'CURRENT'}
                      </div>
                    ) : (
                      <span className={`font-mono text-[11px] uppercase tracking-widest ${isGold ? 'text-gray-600' : 'text-gray-700'
                        }`}>
                        {event.version}
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

