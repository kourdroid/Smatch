'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import * as PhosphorIcons from '@phosphor-icons/react'
import type { Media } from '@/payload-types'

// --- Types ---
export interface TimelineItem {
    id: number
    title: string
    slug: string
    type: 'project' | 'event'
    status: 'upcoming' | 'completed' | 'archived'
    date: string
    location?: string | null
    code?: string | null
    description?: string | null
    image?: Media | number | null
    metadata?: {
        icon?: string | null
        label: string
        value: string
        id?: string | null
    }[] | null
    linkLabel?: string | null
    externalLink?: boolean | null
    linkUrl?: string | null
}

interface ActivityTimelineClientProps {
    title?: string
    items: TimelineItem[]
    showFilters?: boolean | null
}

// --- Icon Mapping for Metadata ---
const getMetadataIcon = (iconName: string | null | undefined) => {
    if (!iconName) return <PhosphorIcons.Tag size={14} weight="bold" />

    // Dynamically lookup icon from the imported namespace
    const IconComponent = (PhosphorIcons as any)[iconName]

    if (IconComponent) {
        return <IconComponent size={14} weight="bold" />
    }

    return <PhosphorIcons.Tag size={14} weight="bold" />
}

// --- Status Badge ---
const StatusBadge = ({ status }: { status: TimelineItem['status'] }) => {
    if (status === 'upcoming') {
        return (
            <div className="inline-flex items-center gap-2 rounded border border-[#FFAA00]/50 bg-[#FFAA00]/10 px-3 py-1">
                <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FFAA00] opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#FFAA00]" />
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#FFAA00]">
                    BIENTÔT
                </span>
            </div>
        )
    }
    if (status === 'completed') {
        return (
            <div className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-1">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    STATUT: TERMINÉ
                </span>
            </div>
        )
    }
    return null
}

// --- Single Timeline Card ---
const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
    const imageUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : null
    const formattedDate = item.date ? new Date(item.date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/\//g, '.') : ''

    const href = item.externalLink && item.linkUrl ? item.linkUrl : `/projects/${item.slug}`

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col gap-6 md:flex-row md:gap-8" // UPDATED: Stack on mobile
        >
            {/* Timeline Line & Dot */}
            <div className="relative flex flex-col items-center">
                <div className={`z-10 flex size-4 items-center justify-center rounded-full border-2 ${item.status === 'upcoming' ? 'border-[#FFAA00] bg-[#FFAA00]' : 'border-white/30 bg-transparent'
                    }`}>
                    {item.status === 'upcoming' && <span className="size-2 rounded-full bg-black" />}
                </div>
                {/* Mobile Date when stacked */}
                <div className="flex flex-col md:hidden">
                    <span className="font-mono text-xs font-bold text-white">{formattedDate}</span>
                </div>
                <div className="absolute left-[7px] top-4 hidden h-full w-px bg-white/10 md:block" />
            </div>

            {/* Date & Location Column (Desktop) */}
            <div className="hidden w-32 shrink-0 flex-col pt-0.5 md:flex">
                <span className="font-mono text-sm font-bold text-white">{formattedDate}</span>
                {item.location && (
                    <span className="mt-1 font-mono text-xs uppercase tracking-wider text-gray-500">
                        {item.location}
                    </span>
                )}
                {item.code && (
                    <span className="mt-2 font-mono text-[11px] uppercase tracking-widest text-gray-600">
                        CODE: {item.code}
                    </span>
                )}
            </div>

            {/* Main Card */}
            <Link href={href} className="mb-8 flex w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0A] transition-all duration-300 hover:border-[#FFAA00]/50 hover:bg-[#111] md:flex-row">
                {/* Image */}
                {imageUrl ? (
                    <div className="relative hidden w-1/3 min-w-[200px] md:block">
                        <Image
                            src={imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                        />
                    </div>
                ) : (
                    <div className="relative hidden h-48 w-full items-center justify-center bg-[#111] md:flex md:h-auto md:w-1/3 md:min-w-[200px]">
                        {item.type === 'event' ? (
                            <PhosphorIcons.Users size={48} weight="thin" className="text-gray-700" />
                        ) : (
                            <PhosphorIcons.Rocket size={48} weight="thin" className="text-gray-700" />
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="flex w-full flex-1 flex-col justify-between p-6">
                    <div>
                        <StatusBadge status={item.status} />

                        <h3 className="mb-3 mt-4 font-heading text-xl font-bold uppercase leading-tight text-white transition-colors group-hover:text-[#FFAA00] md:text-2xl">
                            {item.title}
                        </h3>

                        {item.description && (
                            <p className="mb-4 line-clamp-3 max-w-xl text-sm leading-relaxed text-gray-400">
                                {item.description}
                            </p>
                        )}
                    </div>

                    {/* Bottom Row: Metadata + CTA */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Metadata Pills */}
                        {item.metadata && item.metadata.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {item.metadata.map((meta, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-gray-500">
                                        {getMetadataIcon(meta.icon)}
                                        <span className="font-mono text-[11px] uppercase tracking-wider">
                                            {meta.label}: <span className="text-gray-300">{meta.value}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* CTA Button */}
                        <button className="mt-2 flex items-center gap-2 rounded border border-[#FFAA00] bg-transparent px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#FFAA00] transition-all hover:bg-[#FFAA00] hover:text-black md:ml-auto md:mt-auto">
                            {item.linkLabel || 'Voir les détails'}
                            <PhosphorIcons.ArrowRight size={12} weight="bold" />
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

// --- Main Component ---
export const ActivityTimelineClient: React.FC<ActivityTimelineClientProps> = ({
    title,
    items,
    showFilters = true,
}) => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'event' | 'project'>('all')

    const filteredItems = useMemo(() => {
        if (activeFilter === 'all') return items
        return items.filter((item) => item.type === activeFilter)
    }, [items, activeFilter])

    // Sort by date descending (newest first)
    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }, [filteredItems])

    return (
        <section className="relative w-full overflow-hidden bg-[#050505] py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header with Filters */}
                <div className="mb-8 flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-6 md:mb-12 md:flex-row md:items-center">
                    <div className="flex w-full items-center gap-4">
                        {title && (
                            <h2 className="font-heading text-lg font-bold uppercase tracking-widest text-white md:text-xl">
                                {title}
                            </h2>
                        )}
                        <div className="flex items-center gap-2">
                            <div className="hidden h-px w-8 bg-gray-700 md:block" />
                            <div className="relative flex size-2.5">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FFAA00] opacity-75" />
                                <span className="relative inline-flex size-2.5 rounded-full bg-[#FFAA00]" />
                            </div>
                            <span className="font-mono text-xs font-bold tracking-wider text-[#FFAA00]">
                                LIVE FEED
                            </span>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    {showFilters && (
                        <div className="flex w-full justify-end gap-6 overflow-x-auto font-mono text-xs uppercase tracking-widest md:w-auto md:text-sm">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`border-b-2 pb-1 transition-colors ${activeFilter === 'all'
                                    ? 'border-[#FFAA00] text-[#FFAA00]'
                                    : 'border-transparent text-gray-500 hover:text-white'
                                    }`}
                            >
                                Tous
                            </button>
                            <button
                                onClick={() => setActiveFilter('event')}
                                className={`border-b-2 pb-1 transition-colors ${activeFilter === 'event'
                                    ? 'border-[#FFAA00] text-[#FFAA00]'
                                    : 'border-transparent text-gray-500 hover:text-white'
                                    }`}
                            >
                                Événements
                            </button>
                            <button
                                onClick={() => setActiveFilter('project')}
                                className={`border-b-2 pb-1 transition-colors ${activeFilter === 'project'
                                    ? 'border-[#FFAA00] text-[#FFAA00]'
                                    : 'border-transparent text-gray-500 hover:text-white'
                                    }`}
                            >
                                Projets
                            </button>
                        </div>
                    )}
                </div>

                {/* Timeline */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative pl-0 md:pl-0"
                    >
                        {sortedItems.length > 0 ? (
                            sortedItems.map((item, index) => (
                                <TimelineCard key={item.id} item={item} index={index} />
                            ))
                        ) : (
                            <div className="py-12 text-center text-gray-500">
                                <p>Aucun élément trouvé.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}
