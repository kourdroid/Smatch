import React from 'react'
import type { SolutionModuleDetailsBlock as SolutionModuleDetailsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import * as PhosphorIcons from '@phosphor-icons/react'

const DynamicIcon = ({ name, className }: { name: string | null | undefined; className?: string }) => {
  if (!name) return <PhosphorIcons.Question className={className} size={24} />
  
  // Safe cast to access icon by string key
  // Phosphor icons are usually PascalCase (e.g. "House", "User")
  const IconComponent = (PhosphorIcons as unknown as Record<string, React.ElementType>)[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @phosphor-icons/react`)
    // Fallback icon
    return <PhosphorIcons.Question className={className} size={24} />
  }

  return <IconComponent className={className} size={32} weight="fill" />
}

export const SolutionModuleDetailsBlock: React.FC<SolutionModuleDetailsBlockProps> = ({
  moduleId,
  title,
  icon,
  description,
  bulletPoints,
  aiBlock,
  subModules,
}) => {
  return (
    <section id={moduleId || undefined} className="scroll-mt-24 bg-smatch-black py-20 even:bg-smatch-charcoal lg:py-32">
      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-xl border border-smatch-gold/20 bg-smatch-surface text-smatch-gold">
            <DynamicIcon name={icon} />
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-smatch-text-primary md:text-4xl">
            {title}
          </h2>
        </div>
        
        <p className="mb-10 max-w-4xl text-lg leading-relaxed text-smatch-text-secondary">
          {description}
        </p>

        {bulletPoints && bulletPoints.length > 0 && (
          <ul className="mb-12 space-y-3">
            {bulletPoints.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-smatch-text-primary">
                <span className="font-bold text-smatch-gold">•</span>
                <span>{b.point}</span>
              </li>
            ))}
          </ul>
        )}

        {aiBlock && aiBlock.title && (
          <div className="relative mb-12 overflow-hidden rounded-xl border border-smatch-gold/30 bg-gradient-to-br from-smatch-surface to-smatch-black p-8 shadow-2xl">
            <div className="pointer-events-none absolute right-0 top-0 p-8 text-smatch-gold opacity-5">
              <span className="font-heading text-9xl font-black">AI</span>
            </div>
            <h4 className="relative z-10 mb-6 font-heading text-xl font-bold text-smatch-gold">
              {aiBlock.title}
            </h4>
            {aiBlock.points && aiBlock.points.length > 0 && (
              <ul className="relative z-10 space-y-3">
                {aiBlock.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-smatch-text-primary">
                    <span className="text-smatch-gold opacity-50">⚡</span>
                    <span>{p.point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {subModules && subModules.length > 0 && (
          <div>
            <h3 className="mb-6 font-heading text-2xl font-bold text-smatch-text-primary">Sous-modules</h3>
            <div className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-smatch-surface">
              {subModules.map((sub, i) => (
                <details key={i} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-heading font-bold text-smatch-text-primary transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none">
                    {sub.title}
                    <span className="text-smatch-gold transition-transform duration-300 group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <div className="prose prose-invert max-w-none px-6 pb-6 text-sm text-smatch-text-secondary">
                    <RichText data={sub.content} enableGutter={false} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
