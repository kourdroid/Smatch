'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Barcode, Truck, Warehouse, ArrowRight, Cpu, Globe } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import type { Media, Solution } from '@/payload-types'

// --- Icon Mapping ---
const getIconComponent = (iconName: string | null | undefined): React.ReactElement => {
    const icons: Record<string, React.ReactElement> = {
        'Barcode': <Barcode size={40} weight="duotone" />,
        'Truck': <Truck size={40} weight="duotone" />,
        'Warehouse': <Warehouse size={40} weight="duotone" />,
        'Circuitry': <Cpu size={40} weight="duotone" />,
        'Globe': <Globe size={40} weight="duotone" />,
        'default': <Barcode size={40} weight="duotone" />
    }
    return icons[iconName || 'default'] || icons['default']
}

// --- Individual Card Component ---
const InteractiveCard = ({ data, locale = 'en' }: { data: Solution; locale?: string }) => {
    const href = `/${locale}/solutions/${data.slug}`

    const heroImage = data.heroImage as Media | null | undefined
    const imageUrl = heroImage?.url || '/assets/placeholders/default-grid.jpg'
    const icon = getIconComponent(data.icon)

    return (
        <Link href={href} className="block size-full">
            <motion.div
                className="group relative h-[450px] w-full cursor-pointer overflow-hidden rounded-[12px] border border-white/10 bg-[#050505] md:h-[600px]"
                whileHover="hover"
                initial="initial"
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageUrl}
                        alt={data.title}
                        fill
                        className="object-cover opacity-40 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                </div>

                {/* Border Glow */}
                <div className="pointer-events-none absolute inset-0 z-20 rounded-[12px] border-2 border-transparent transition-colors duration-300 group-hover:border-[#FFAA00]" />

                {/* Content */}
                <div className="absolute inset-0 z-10 flex flex-col p-8">
                    <div className="flex flex-1 items-center justify-center">
                        <div className="flex size-20 items-center justify-center rounded-[16px] border border-[#FFAA00]/30 bg-[#1A1A1A]/80 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 group-hover:border-[#FFAA00] group-hover:bg-[#FFAA00]/10">
                            <div className="text-[#FFAA00]">
                                {icon}
                            </div>
                        </div>
                    </div>

                    <motion.div
                        className="flex flex-col justify-end"
                        variants={{
                            initial: { y: 0 },
                            hover: { y: -20 },
                        }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <span className="mb-2 font-mono text-sm font-bold uppercase tracking-widest text-[#FFAA00]">
                            {data.heroSubtitle || 'Solution'}
                        </span>

                        <h3 className="mb-4 text-3xl font-bold uppercase leading-tight text-white">
                            {data.title}
                        </h3>

                        {data.description && (
                            <p className="mb-4 line-clamp-3 max-w-xs text-sm leading-relaxed text-gray-400">
                                {data.description}
                            </p>
                        )}

                        <motion.div
                            className="h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100"
                            variants={{
                                initial: { height: 0, opacity: 0 },
                                hover: { height: 'auto', opacity: 1 },
                            }}
                        >
                            {/* SEO: Using span instead of button to avoid invalid nested <button> inside <Link> which breaks crawlability */}
                            <span className="mt-4 flex w-full items-center justify-between rounded-[4px] bg-[#FFAA00] px-6 py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#D99200]">
                                {locale === 'fr' ? 'Explorer la Solution' : 'Explore Solution'}
                                <ArrowRight size={16} weight="bold" />
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    )
}

// --- Props Interface ---
interface SolutionsGridClientProps {
    id?: string
    sectionTitle?: string | null
    sectionDescription?: string | null
    solutions: Solution[]
    columnClass: string
    locale?: string
}

// --- Main Grid Component ---
export const SolutionsGridClient: React.FC<SolutionsGridClientProps> = ({
    id,
    sectionTitle,
    sectionDescription,
    solutions,
    columnClass,
    locale = 'en',
}) => {
    return (
        <section id={`block-${id}`} className="relative overflow-hidden bg-[#050505] py-20">
            {/* Background Atmosphere */}
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#FFAA00]/20 to-transparent" />
            <div className="pointer-events-none absolute -left-[20%] top-[20%] size-2/5 rounded-full bg-[#FFAA00]/5 blur-[120px]" />

            <div className="container relative z-10 mx-auto px-4">
                <div className="mb-12 text-center">
                    {/* SEO: Using <h2> instead of <span> to establish proper heading hierarchy before the <h3> tags in the cards */}
                    <h2 className="mb-2 block text-lg font-bold text-white">
                        {sectionTitle || 'Nos Solutions'}
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm text-gray-500">
                        {sectionDescription || 'Trois piliers technologiques pour transformer vos opérations industrielles.'}
                    </p>
                </div>

                {/* Dynamic Grid */}
                <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${columnClass}`}>
                    {solutions.length > 0 ? (
                        solutions.map((solution) => (
                            <InteractiveCard key={solution.id} data={solution} locale={locale} />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-gray-500">
                            <p>No solutions found. Please add them in the CMS.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
