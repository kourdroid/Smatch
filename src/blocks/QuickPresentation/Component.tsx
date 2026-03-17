import React from 'react'
import type { QuickPresentationBlock as QuickPresentationBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const QuickPresentationBlock: React.FC<QuickPresentationBlockProps> = ({
  headline,
  subheadline,
  description,
  media,
  layout,
  link,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 lg:py-32">
      {/* Dynamic Background Gradients */}
      <div className="duration-[8000ms] pointer-events-none absolute -left-20 top-0 size-[600px] animate-pulse rounded-full bg-[#FFAA00]/5 blur-[120px]" />
      <div className="duration-[10000ms] pointer-events-none absolute bottom-0 right-0 size-[600px] animate-pulse rounded-full bg-blue-600/5 blur-[120px] delay-1000" />

      <div className="container relative z-10">
        <div
          className={cn(
            'flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24',
            layout === 'mediaLeft' && 'lg:flex-row-reverse',
          )}
        >
          {/* Content Side */}
          <div className="flex-1">
            {subheadline && (
              <div className="mb-6 inline-block rounded-full border border-[#FFAA00]/20 bg-[#FFAA00]/5 px-4 py-1.5 backdrop-blur-sm">
                <span className="bg-gradient-to-r from-[#FFAA00] to-yellow-200 bg-clip-text text-sm font-bold uppercase tracking-widest text-transparent">
                  {subheadline}
                </span>
              </div>
            )}
            <h2 className="mb-8 font-heading text-4xl font-black uppercase leading-tight tracking-tighter text-white md:text-5xl lg:text-6xl lg:leading-[1.1]">
              {headline}
            </h2>
            <div className="prose prose-invert mb-10 max-w-none text-lg font-light leading-relaxed text-white lg:text-xl">
              <RichText className='text-gray-200' data={description} enableGutter={false} />
            </div>
            {link && (
              <div className="flex flex-wrap gap-4">
                <CMSLink {...link} appearance="default" className="rounded-full bg-[#FFAA00] px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-white" />
              </div>
            )}
          </div>

          {/* Media Side */}
          <div className="flex-1">
            <div className="group relative aspect-video overflow-hidden rounded-md border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 hover:border-[#FFAA00]/30 hover:shadow-[#FFAA00]/10">
              {media && typeof media !== 'string' && (
                <Media resource={media} fill className="transform-gpu object-cover transition-transform duration-700 group-hover:scale-105" />
              )}
              {/* Overlay sheen */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-white/5 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
