import React from 'react'
import type { SolutionCustomSectionBlock as SolutionCustomSectionBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

export const SolutionCustomSectionBlock: React.FC<SolutionCustomSectionBlockProps> = ({
  content,
}) => {
  return (
    <section className="bg-smatch-black py-20 even:bg-smatch-charcoal lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="prose prose-invert mx-auto max-w-4xl text-lg leading-relaxed text-smatch-text-secondary marker:text-smatch-gold prose-h2:font-heading prose-h2:text-3xl prose-h2:font-bold prose-h2:uppercase prose-h2:text-smatch-text-primary prose-h3:font-heading prose-h3:text-xl prose-h3:text-smatch-gold prose-a:text-smatch-gold">
          <RichText data={content} enableGutter={false} />
        </div>
      </div>
    </section>
  )
}
