import React from 'react'
import type { FunctionalityBenefitsBlock as FunctionalityBenefitsBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import * as PhosphorIcons from '@phosphor-icons/react/dist/ssr'

// Dynamic icon renderer
const DynamicIcon = ({ name, className }: { name: string | null | undefined; className?: string }) => {
  if (!name) return null
  
  // Safe cast to access icon by string key
  const IconComponent = (PhosphorIcons as unknown as Record<string, React.ElementType>)[name]

  if (!IconComponent) {
    // Fallback or null if not found
    return null
  }

  // Phosphor icons accept size and weight props
  return <IconComponent className={className} size={32} weight="duotone" />
}

export const FunctionalityBenefitsBlock: React.FC<FunctionalityBenefitsBlockProps> = ({
  sectionHeader,
  benefits,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0F0F0F] py-24 lg:py-32">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-[0.03]" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center md:mb-28">
          <h2 className="mb-8 font-heading text-3xl font-black uppercase tracking-tighter text-white md:text-4xl lg:text-5xl">
            {sectionHeader?.title}
          </h2>
          {sectionHeader?.description && (
            <p className="font-sans text-lg font-light leading-relaxed text-gray-400 md:text-xl">
              {sectionHeader.description}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits?.map((benefit, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-md border border-white/5 bg-white/[0.02] p-10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#FFAA00]/30 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-[#FFAA00]/5"
            >
              {/* Icon */}
              <div className="mb-8 inline-flex size-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#FFAA00] shadow-lg shadow-black/50 transition-all duration-500 group-hover:scale-110 group-hover:border-[#FFAA00]/50 group-hover:bg-[#FFAA00] group-hover:text-black">
                {benefit.icon && (
                  <DynamicIcon name={benefit.icon} className="size-10 transition-transform duration-500 group-hover:scale-110" />
                )}
              </div>

              <h3 className="mb-4 font-heading text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#FFAA00]">
                {benefit.title}
              </h3>
              <p className="font-sans text-base leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-white">
                {benefit.description}
              </p>

              {/* Decorative corner glow */}
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-[#FFAA00]/10 blur-[60px] transition-all duration-500 group-hover:bg-[#FFAA00]/20" />
              
              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#FFAA00] to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
