import React from 'react'
import type { SolutionArchitectureBlock as SolutionArchitectureBlockProps } from '@/payload-types'
import Link from 'next/link'
import * as PhosphorIcons from '@phosphor-icons/react/dist/ssr'

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

export const SolutionArchitectureBlock: React.FC<SolutionArchitectureBlockProps> = ({
  sectionTitle,
  intro,
  modules,
}) => {
  return (
    <section className="bg-smatch-charcoal py-20 lg:py-32">
      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="mb-4 font-heading text-4xl font-bold uppercase tracking-tight text-smatch-text-primary md:text-5xl">
          {sectionTitle}
        </h2>
        <p className="mb-12 max-w-4xl text-lg leading-relaxed text-smatch-text-secondary">
          {intro}
        </p>

        {modules && modules.length > 0 && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 lg:gap-6">
            {modules.map((mod, i) => (
              <Link 
                key={i} 
                href={mod.anchorLink ? (mod.anchorLink.startsWith('#') ? mod.anchorLink : `#${mod.anchorLink}`) : '#'} 
                className="group flex flex-col items-center justify-center rounded-xl border-2 border-white/10 bg-smatch-surface p-6 transition-all duration-300 hover:-translate-y-2 hover:border-smatch-gold hover:shadow-xl hover:shadow-smatch-gold/10"
              >
                <div className="mb-4 flex size-16 items-center justify-center rounded-lg bg-smatch-black text-smatch-gold transition-transform duration-300 group-hover:scale-110">
                  <DynamicIcon name={mod.icon} />
                </div>
                <h3 className="text-center font-heading text-sm font-bold uppercase tracking-wider text-smatch-text-primary">
                  {mod.title}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
