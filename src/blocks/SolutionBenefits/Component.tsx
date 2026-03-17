import React from 'react'
import type { SolutionBenefitsBlock as SolutionBenefitsBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const SolutionBenefitsBlock: React.FC<SolutionBenefitsBlockProps> = ({
  title,
  benefits,
}) => {
  return (
    <section className="bg-smatch-black py-20 even:bg-smatch-charcoal lg:py-32">
      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="mb-12 font-heading text-4xl font-bold uppercase tracking-tight text-smatch-text-primary md:text-5xl">
          {title}
        </h2>

        {benefits && benefits.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <div 
                key={i} 
                className="rounded-xl border border-white/5 bg-smatch-surface p-8 transition-all duration-300 hover:-translate-y-2 hover:border-smatch-gold/40 hover:shadow-xl hover:shadow-smatch-gold/10"
              >
                <div className="mb-4 h-1 w-12 rounded-full bg-smatch-gold" />
                <h3 className="mb-4 font-heading text-xl font-bold text-smatch-text-primary">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-smatch-text-secondary">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
