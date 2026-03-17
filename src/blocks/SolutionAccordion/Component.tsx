import React from 'react'
import type { SolutionAccordionBlock as SolutionAccordionBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

export const SolutionAccordionBlock: React.FC<SolutionAccordionBlockProps> = ({
  items,
}) => {
  return (
    <section className="bg-smatch-black py-20 lg:py-32">
      <div className="container mx-auto max-w-4xl px-6">
        {items && items.length > 0 && (
          <div className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-smatch-surface shadow-2xl">
            {items.map((item, i) => (
              <details key={i} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-heading text-lg font-bold text-smatch-text-primary transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none">
                  {item.header}
                  <span className="text-smatch-gold transition-transform duration-300 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="prose prose-invert max-w-none px-6 pb-6 text-base leading-relaxed text-smatch-text-secondary">
                  <RichText data={item.body} enableGutter={false} />
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
