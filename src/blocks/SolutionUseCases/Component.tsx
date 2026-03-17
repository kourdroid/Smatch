import React from 'react'
import type { SolutionUseCasesBlock as SolutionUseCasesBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

export const SolutionUseCasesBlock: React.FC<SolutionUseCasesBlockProps> = ({
  title,
  cases,
}) => {
  return (
    <section className="bg-gradient-to-b from-smatch-charcoal to-smatch-black py-20 lg:py-32">
      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center font-heading text-4xl font-bold uppercase tracking-tight text-smatch-text-primary md:text-5xl">
          {title}
        </h2>

        {cases && cases.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {cases.map((useCase, i) => (
              <div 
                key={i} 
                className="rounded-r-xl border-l-4 border-smatch-gold bg-smatch-surface p-8 shadow-lg shadow-black/20"
              >
                <h3 className="mb-4 font-heading text-2xl font-bold text-smatch-gold">
                  {useCase.title}
                </h3>
                <div className="prose prose-invert max-w-none text-base leading-relaxed text-smatch-text-secondary">
                  <RichText data={useCase.description} enableGutter={false} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
