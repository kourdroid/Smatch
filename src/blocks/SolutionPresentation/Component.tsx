import React from 'react'
import type { SolutionPresentationBlock as SolutionPresentationBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const SolutionPresentationBlock: React.FC<SolutionPresentationBlockProps> = ({
  sectionTitle,
  intro,
  productVisionTitle,
  productVision,
  mainBenefitsTitle,
  mainBenefits,
}) => {
  return (
    <section className="bg-smatch-black py-20 lg:py-32">
      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="mb-4 font-heading text-4xl font-bold uppercase tracking-tight text-smatch-text-primary md:text-5xl">
          {sectionTitle}
        </h2>
        <p className="mb-12 max-w-4xl text-lg leading-relaxed text-smatch-text-secondary">
          {intro}
        </p>

        {productVision && productVision.length > 0 && (
          <div className="mb-16">
            <h3 className="mb-6 font-heading text-2xl font-bold text-smatch-text-primary">
              {productVisionTitle || 'Vision produit'}
            </h3>
            <ul className="space-y-4">
              {productVision.map((v, i) => (
                <li key={i} className="flex items-start gap-3 text-smatch-text-primary">
                  <span className="font-bold text-smatch-gold">✓</span>
                  <span>{v.point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {mainBenefits && mainBenefits.length > 0 && (
          <div>
            <h3 className="mb-8 font-heading text-2xl font-bold text-smatch-text-primary">
              {mainBenefitsTitle || 'Avantages principaux'}
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mainBenefits.map((benefit, i) => (
                <div 
                  key={i} 
                  className="rounded-xl border border-white/5 bg-smatch-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-smatch-gold/30 hover:shadow-lg hover:shadow-smatch-gold/5"
                >
                  <h4 className="mb-3 font-heading text-xl font-bold text-smatch-gold">
                    {benefit.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-smatch-text-secondary">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
