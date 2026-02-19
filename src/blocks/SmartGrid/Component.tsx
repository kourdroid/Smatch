'use client'
import React from 'react'
import * as motion from 'framer-motion/client'
import { SolutionCard } from '@/components/blocks/SolutionCard'
import { SmartGridBlock } from '@/payload-types'
import * as PhosphorIcons from '@phosphor-icons/react/dist/ssr'

type SmartGridProps = SmartGridBlock & {
    className?: string
}

export const SmartGrid: React.FC<SmartGridProps> = ({ cards, columns = '3', className = '', sectionHeader }) => {
    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4'
    }

    const headerAlign = sectionHeader?.align || 'center'
    const alignClass = headerAlign === 'left' ? 'text-left' : headerAlign === 'right' ? 'text-right' : 'text-center'

    return (
        <div className={`container mx-auto my-16 px-4 ${className}`}>
            {/* Optional Section Header */}
            {sectionHeader && (sectionHeader.title || sectionHeader.description) && (
                <div className={`mb-12 ${alignClass} md:mb-[80px]`}>
                    {sectionHeader.title && (
                        <h2 className="mb-0 font-heading text-2xl font-bold uppercase tracking-tight text-white md:text-[32px]">
                            {sectionHeader.title}
                        </h2>
                    )}
                    {sectionHeader.description && (
                        <p className={`mt-6 max-w-[999px] font-sans text-sm font-light leading-relaxed text-[#ffffff82] md:mt-[30px] md:text-base  ${headerAlign === 'center' ? 'mx-auto' : ''}`}>
                            {sectionHeader.description}
                        </p>
                    )}
                </div>
            )}

            <div className={`grid grid-cols-1 ${gridCols[Number(columns) as 2 | 3 | 4]} gap-6`}>
                {cards?.map((item, index) => {
                    let iconToRender: any = item.icon

                    if (item.iconType === 'name' && item.iconName) {
                        const IconComponent = (PhosphorIcons as any)[item.iconName]
                        if (IconComponent) {
                            iconToRender = <IconComponent />
                        }
                    }

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <SolutionCard
                                {...item}
                                id={item.id || undefined}
                                subtitle={item.subtitle || undefined}
                                href={item.href || undefined}
                                badge={item.badge || undefined}
                                ctaText={item.ctaText || undefined}
                                icon={iconToRender as any} // Cast because Payload type might collide with React Node
                                stats={item.stats?.map(s => ({ value: s.value, label: s.label }))}
                            />
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
