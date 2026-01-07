'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import * as motion from 'framer-motion/client'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

// Add badge to the props interface (mocking it for now as it's not in Page['hero'] type yet)
type HighImpactHeroProps = Page['hero'] & {
  badge?: string
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({ links, media, richText, badge = "ARCHITECTS OF AUTOMATION" }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-smatch-black text-white"
      data-theme="dark"
    >
      {/* Background Layer with Gold Radial Gradient and Grid Texture */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle Gold Radial Gradient */}
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-smatch-gold/10 opacity-60 blur-[120px]" />

        {/* Industrial Grid Texture Overlay */}
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Media Background */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          {media && typeof media === 'object' && (
            <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
          )}
        </div>
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center justify-center rounded-full border border-smatch-gold/30 bg-smatch-gold/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-smatch-gold">
            {badge}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-[50rem]"
        >
          {/* Main Title - Overriding RichText styles for High Impact */}
          <div className="[&>h1]:mb-6 [&>h1]:font-heading [&>h1]:text-5xl [&>h1]:font-bold [&>h1]:uppercase [&>h1]:leading-[0.9] [&>h1]:tracking-tight [&>h1]:md:text-7xl [&>h1]:lg:text-8xl">
            {richText && <RichText data={richText} enableGutter={false} />}
          </div>

          {Array.isArray(links) && links.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col justify-center gap-4 md:flex-row"
            >
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </motion.ul>
          )}
        </motion.div>
      </div>
    </div>
  )
}
