'use client'

import React, { useEffect } from 'react'
import * as PhosphorIcons from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { Media } from '@/payload-types'

// Types for the block
interface ExpertiseCard {
    title?: string | null
    subtitle?: string | null
    description?: string | null
    image?: Media | string | null
    iconName?: string | null
    iconColor?: string | null
    features?: { text?: string | null; id?: string | null }[] | null
    id?: string | null
}

interface ExpertiseSection {
    sectionId?: string | null
    title?: string | null
    subtitle?: string | null
    description?: string | null
    cards?: ExpertiseCard[] | null
    id?: string | null
}

interface Props {
    sections?: ExpertiseSection[] | null
    className?: string
    blockType?: string
    blockName?: string | null
}

// Dynamic icon resolver - loads any Phosphor icon by name
const getIcon = (iconName: string | null | undefined, colorClass: string) => {
    if (!iconName) return null

    // Access the icon from the Phosphor library
    const IconComponent = (PhosphorIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName]

    if (!IconComponent) {
        console.warn(`[ExpertiseDomains] Icon "${iconName}" not found in Phosphor library`)
        return null
    }

    return <IconComponent className={cn('h-8 w-8', colorClass)} />
}

// Get image URL from Media object or string
const getImageUrl = (image: Media | string | null | undefined): string | null => {
    if (!image) return null
    if (typeof image === 'string') return image
    return image.url || null
}

export const ExpertiseDomainsBlock: React.FC<Props> = ({ sections, className }) => {
    // Enable scroll snapping on document root
    useEffect(() => {
        const originalScrollSnapType = document.documentElement.style.scrollSnapType
        document.documentElement.style.scrollSnapType = 'y proximity'

        return () => {
            document.documentElement.style.scrollSnapType = originalScrollSnapType
        }
    }, [])

    if (!sections || sections.length === 0) {
        return null
    }

    return (
        <div className={cn('relative z-10 bg-black', className)}>
            <div className="container mx-auto px-4 py-8 md:py-20">
                {/* Loop through Main Sections */}
                {sections.map((section, index) => (
                    <div
                        key={section.sectionId || index}
                        className="relative grid gap-8 border-t border-white/10 py-8 first:border-0 md:grid-cols-12 md:gap-16 md:py-20 lg:gap-24"
                    >
                        {/* LEFT COLUMN: Sticky Header */}
                        <div className="md:col-span-4 lg:col-span-3">
                            <div className="relative md:sticky md:top-40">
                                <span className="mb-4 block font-mono text-sm tracking-widest text-yellow-500">
                                    0{index + 1} / {section.subtitle}
                                </span>
                                <h2 className="mb-6 font-heading text-3xl font-black uppercase leading-none text-white md:text-5xl">
                                    {section.title}
                                </h2>
                                <p className="max-w-xs text-lg text-zinc-500">{section.description}</p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Stacked Cards */}
                        <div className="space-y-12 md:col-span-8 md:space-y-48 lg:col-span-9">
                            {section.cards?.map((card, cardIndex) => {
                                const imageUrl = getImageUrl(card.image)
                                const iconColor = card.iconColor || 'text-yellow-500'

                                return (
                                    <div key={cardIndex} className="group relative snap-center">
                                        {/* Background Glow */}
                                        <div className="absolute -inset-4 rounded-md bg-gradient-to-r from-yellow-500/10 to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

                                        <div className="relative overflow-hidden rounded-md border border-white/10 bg-zinc-900/40 backdrop-blur-sm transition-colors duration-500 hover:border-yellow-500/30">
                                            <div className="grid gap-0 lg:grid-cols-2">
                                                {/* Text Content */}
                                                <div className="flex flex-col justify-center p-6 md:p-16 lg:p-20">
                                                    <div className="mb-8 flex items-center gap-4">
                                                        <div className="rounded-full border border-white/10 bg-white/5 p-3 text-white">
                                                            {getIcon(card.iconName, iconColor)}
                                                        </div>
                                                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-yellow-500">
                                                            {card.subtitle}
                                                        </span>
                                                    </div>

                                                    <h3 className="mb-4 text-2xl font-bold uppercase text-white md:text-3xl">
                                                        {card.title}
                                                    </h3>
                                                    <p className="mb-12 leading-relaxed text-zinc-400">{card.description}</p>

                                                    <ul className="space-y-6">
                                                        {card.features?.map((feature, fIndex) => (
                                                            <li
                                                                key={fIndex}
                                                                className="flex items-start gap-3 text-sm text-zinc-300"
                                                            >
                                                                <PhosphorIcons.CheckCircle className="size-5 shrink-0 text-yellow-500" />
                                                                {feature.text}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Image Content */}
                                                <div className="relative min-h-[300px] border-t border-white/10 bg-black/50 lg:min-h-full lg:border-l lg:border-t-0">
                                                    <div className="absolute inset-0 flex items-center justify-center p-8">
                                                        {/* Glow behind image */}
                                                        <div className="absolute size-[200px] rounded-full bg-yellow-500/20 blur-[80px]" />
                                                        {imageUrl && (
                                                            <Image
                                                                src={imageUrl}
                                                                alt={card.title || 'Expertise'}
                                                                fill
                                                                className="relative z-10 object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
