'use client'

import React, { useRef, useState } from 'react'
import { Plant, Bed, UsersThree, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// --- DATA ---
const BLADES_DATA = [
    {
        id: 'agri',
        title: 'AGRICULTURE',
        subtitle: 'Digitale & Durable',
        icon: Plant,
        // Using gradient placeholder logic as before
        color: '#10B981',
        description: "Optimisation des rendements via IoT et Intelligence Artificielle. Suivi du bétail, gestion hydrique et traçabilité de la fourche à la fourchette.",
        stats: [
            { label: 'Rendement', value: '+30%' },
            { label: 'Eau', value: '-40%' },
        ],
    },
    {
        id: 'hospitality',
        title: 'HOSPITALITÉ',
        subtitle: 'Expérience Client 4.0',
        icon: Bed,
        color: '#FFAA00',
        description: "Une gestion hôtelière réinventée. Check-in sans contact, confort thermique automatisé et personnalisation de l'expérience client par la donnée.",
        stats: [
            { label: 'Satisfaction', value: '9.8/10' },
            { label: 'Ops Cost', value: '-15%' },
        ],
    },
    {
        id: 'citizenship',
        title: 'CITOYENNETÉ',
        subtitle: 'Services Publics Connectés',
        icon: UsersThree,
        color: '#3B82F6',
        description: "Rapprocher l'administration du citoyen. Plateformes unifiées, identité numérique biousable et transparence administrative.",
        stats: [
            { label: 'Accès', value: '24/7' },
            { label: 'Délai', value: '-50%' },
        ],
    },
]

export function KineticBlades() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeBlade, setActiveBlade] = useState<string | null>(null)

    // GSAP Logic for Width Expansion
    useGSAP(() => {
        // If no blade active, all are equal (flex-1 approx 33%)
        if (!activeBlade) {
            gsap.to('.blade', {
                flex: 1,
                duration: 0.6,
                ease: 'power3.inOut',
                overwrite: true
            })

            // Reset Content Opacity/Translation
            gsap.to('.blade-content-active', {
                autoAlpha: 0,
                y: 20,
                duration: 0.4,
                overwrite: true
            })

            // Show Idle Titles
            gsap.to('.blade-title-idle', {
                autoAlpha: 1,
                scale: 1,
                duration: 0.5,
                delay: 0.2
            })

        } else {
            // One is active
            BLADES_DATA.forEach((blade) => {
                const isTarget = blade.id === activeBlade
                const selector = `#blade-${blade.id}`

                if (isTarget) {
                    // Expand Active
                    gsap.to(selector, {
                        flex: 3, // ~60%
                        duration: 0.8,
                        ease: 'expo.out',
                        overwrite: true
                    })

                    // Reveal Content Staggered
                    const tl = gsap.timeline()
                    tl.to(`${selector} .blade-content-active`, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                        delay: 0.2
                    })

                    // Hide Idle Title
                    gsap.to(`${selector} .blade-title-idle`, {
                        autoAlpha: 0,
                        scale: 0.8,
                        duration: 0.3,
                        overwrite: true
                    })

                } else {
                    // Shrink Others
                    gsap.to(selector, {
                        flex: 1, // ~20%
                        duration: 0.6,
                        ease: 'power3.inOut',
                        overwrite: true
                    })

                    // Ensure Content Hidden
                    gsap.to(`${selector} .blade-content-active`, {
                        autoAlpha: 0,
                        y: 20,
                        duration: 0.3,
                        overwrite: true
                    })

                    // Show Idle Title (if space permits - simpler to just show vertical)
                    gsap.to(`${selector} .blade-title-idle`, {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.4,
                        delay: 0.2
                    })
                }
            })
        }
    }, { dependencies: [activeBlade], scope: containerRef })


    return (
        <div ref={containerRef} className="flex h-auto min-h-[600px] w-full flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-2 md:h-[700px] md:min-h-0 md:flex-row md:gap-0 md:p-0">
            {BLADES_DATA.map((blade) => {
                const isActive = activeBlade === blade.id

                return (
                    <div
                        key={blade.id}
                        id={`blade-${blade.id}`}
                        className="blade relative flex h-[200px] w-full shrink-0 flex-col items-center justify-end overflow-hidden border-white/5 bg-[#0F0F0F] transition-colors md:h-full md:flex-1 md:border-r last:md:border-r-0" // Added md:flex-1 as initial state for GSAP to grab
                        onMouseEnter={() => setActiveBlade(blade.id)}
                        onMouseLeave={() => setActiveBlade(null)}
                    >
                        {/* --- BACKGROUND EFFECTS --- */}
                        {/* 1. Dark Overlay (Base) */}
                        <div className="absolute inset-0 bg-[#0A0A0A]" />

                        {/* 2. Procedural Gradient (simulating wireframe bg) */}
                        <div
                            className={clsx(
                                "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] transition-opacity duration-700",
                                isActive ? "opacity-40" : "opacity-10"
                            )}
                            style={{
                                backgroundImage: `radial-gradient(circle at center, ${blade.color}20 0%, transparent 70%)`
                            }}
                        />

                        {/* 3. Grid Pattern Overlay */}
                        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                        {/* 4. Active Glow (Gold/Color) */}
                        <div
                            className={clsx(
                                "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500",
                                isActive ? "opacity-100" : "opacity-0"
                            )}
                        />


                        {/* --- CONTENT LAYER --- */}
                        <div className="relative z-10 flex size-full flex-col justify-end p-8 md:p-12">

                            {/* IDLE STATE: Vertical Title + Large Icon */}
                            <div className="blade-title-idle absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center justify-center gap-4 md:opacity-100">
                                {/* Large Background Icon (Faded) */}
                                <blade.icon
                                    weight="thin"
                                    className={clsx(
                                        "text-white/10 transition-all duration-700",
                                        isActive ? "scale-150 blur-xl" : "scale-100" // GSAP handles opacity, class handles blur scale
                                    )}
                                    size={120}
                                />

                                {/* Vertical Title (Desktop Only) */}
                                <div className="absolute top-1/2 hidden -translate-y-1/2 -rotate-90 flex-col items-center md:flex">
                                    <span className="whitespace-nowrap font-heading text-2xl font-bold uppercase tracking-widest text-[#ffffff40]">
                                        {blade.title}
                                    </span>
                                </div>
                                {/* Mobile Title (Horizontal) */}
                                <div className="md:hidden">
                                    <span className="font-heading text-xl font-bold uppercase text-white">{blade.title}</span>
                                </div>
                            </div>


                            {/* ACTIVE STATE CONTENT (Hidden by default, revealed by GSAP) */}
                            <div className="blade-content-active flex flex-col gap-6 opacity-0">
                                {/* Header */}
                                <div>
                                    <div className="mb-2 flex items-center gap-3">
                                        <div className="rounded-full bg-[#FFAA00]/10 p-2 text-[#FFAA00]">
                                            <blade.icon size={24} weight="duotone" />
                                        </div>
                                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFAA00]">
                                            {blade.subtitle}
                                        </span>
                                    </div>
                                    <h2 className="font-heading text-4xl font-bold uppercase leading-none text-white md:text-5xl">
                                        {blade.title}
                                    </h2>
                                </div>

                                {/* Description & Stats */}
                                <div>
                                    <p className="max-w-lg font-sans text-sm leading-relaxed text-gray-400 md:text-base">
                                        {blade.description}
                                    </p>

                                    {/* Stats Grid */}
                                    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                                        {blade.stats.map((stat, i) => (
                                            <div key={i}>
                                                <span className="block font-sans text-2xl font-bold text-white">
                                                    {stat.value}
                                                </span>
                                                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                                                    {stat.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    {/* SEO: Using Next.js <Link> with href instead of an inert <button> makes the CTA crawlable by search engines and improves semantic HTML */}
                                    <Link href="/solutions" className="group mt-8 flex w-fit items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:text-[#FFAA00]">
                                        Découvrir la solution
                                        <ArrowRight className="transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}
