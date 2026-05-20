'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DOMAINS_DATA = {
  title: 'Architecture de Solutions',
  subtitle:
    "Une suite intégrée d'outils puissants conçus pour l'évolutivité, la sécurité et la performance opérationnelle.",
  tabs: [
    {
      id: 'supply-chain',
      number: '01.',
      label: 'Supply Chain & Logistique',
      content: {
        moduleTag: 'MODULE: LOG_2.0 // FLOW OPTIMIZATION',
        subTitle: '1. AgriTech & Smart Assets',
        mainTitle: 'Gestion de Flux & Traçabilité',
        description:
          'Déploiement de capteurs intelligents et systèmes de tri automatisés. Nos solutions connectent vos actifs physiques à vos données décisionnelles pour une maintenance prédictive.',
        hardware: 'Capteurs RFID / Beacons GPS / Handhelds',
        image: '/assets/domains/supply-chain-iso.png',
      },
    },
    {
      id: 'industry',
      number: '02.',
      label: 'Industrie X.0 & IOT',
      content: {
        moduleTag: 'MODULE: IND_X.0 // AUTOMATION LAYER',
        subTitle: '2. Smart Factory & Robotique',
        mainTitle: 'Usine Connectée & Robotique',
        description:
          'Déploiement de capteurs intelligents et systèmes de tri automatisés. Nos solutions connectent vos actifs physiques (convoyeurs, machines) à vos données décisionnelles pour une maintenance prédictive.',
        hardware: 'Capteurs IoT / RFID Industriel',
        image: '/assets/domains/industry-iso.png',
      },
    },
    {
      id: 'solutions',
      number: '03.',
      label: 'Solutions Metier',
      content: {
        moduleTag: 'MODULE: CUSTOM_DEV // BUSINESS LOGIC',
        subTitle: '3. Solutions Spécifiques',
        mainTitle: 'Applications Verticales',
        description:
          "Développement de solutions verticales adaptées aux contraintes spécifiques de votre secteur d'activité, intégrant les processus métiers complexes.",
        hardware: 'Tablettes Durcies / Bornes Interactives',
        image: '/assets/domains/solutions-iso.png',
      },
    },
  ],
}

export function Domains() {
  const [activeTab, setActiveTab] = useState(DOMAINS_DATA.tabs[1].id)

  return (
    <section className="overflow-hidden bg-[#050505] py-32 text-white">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-24 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight md:text-4xl">
            {DOMAINS_DATA.title}
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-base text-gray-500">
            {DOMAINS_DATA.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* LEFT: Navigation Tabs */}
          <div className="flex flex-col pt-4 lg:col-span-3">
            {DOMAINS_DATA.tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative flex flex-col items-start p-6 text-left transition-all duration-300
                  ${activeTab === tab.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                `}
              >
                {/* Active Indicator Line */}
                <div
                  className={`absolute inset-y-6 left-0 w-[2px] transition-colors duration-300 ${activeTab === tab.id ? 'bg-[#FFAA00]' : 'bg-gray-800'}`}
                />

                <span className="mb-2 font-mono text-sm font-bold text-[#FFAA00]">
                  {tab.number}
                </span>
                <span className="max-w-[150px] font-heading text-xl font-bold leading-tight">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* RIGHT: Content Card */}
          <div className="lg:col-span-9">
            {/* Removed overflow-hidden here to allow image to break out */}
            <div className="relative flex min-h-[500px] flex-col justify-between rounded-2xl border border-white/5 bg-[#0F0F0F] p-8 md:p-12">
              <AnimatePresence mode="wait">
                {DOMAINS_DATA.tabs.map(
                  (tab) =>
                    tab.id === activeTab && (
                      <motion.div
                        key={tab.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid h-full grid-cols-1 gap-12 md:grid-cols-2"
                      >
                        {/* Text Content */}
                        <div className="relative z-10 flex h-full flex-col">
                          <div className="mb-6">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600">
                              {tab.content.moduleTag}
                            </span>
                          </div>

                          {/* SEO: Changed from h4 to p to fix heading hierarchy (H2 -> H3 instead of H2 -> H4 -> H3) */}
                          <p className="mb-2 text-sm font-bold text-[#FFAA00]">
                            {tab.content.subTitle}
                          </p>

                          <h3 className="mb-6 font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl">
                            {tab.content.mainTitle}
                          </h3>

                          <p className="mb-12 max-w-sm font-sans text-sm leading-relaxed text-gray-500">
                            {tab.content.description}
                          </p>

                          <div className="mt-auto border-t border-white/5 pt-6">
                            <span className="mb-1 block font-mono text-[10px] uppercase text-gray-600">
                              Hardware
                            </span>
                            <span className="font-mono text-xs text-gray-400">
                              {tab.content.hardware}
                            </span>
                          </div>
                        </div>

                        {/* Visual / Image Area */}
                        {/* Added negative margins to pull the container right, out of the card */}
                        <div className="relative flex min-h-[300px] items-center justify-center md:min-h-0">
                          {/* The "Holo-Platform" Base Effects */}
                          <div className="pointer-events-none absolute bottom-10 left-1/2 size-48 -translate-x-1/2 rounded-full bg-[#FFAA00]/5 blur-2xl" />
                          {/* Removed the glowing yellow line here */}

                          {/* Tech Decorative Lines Container */}
                          <div className="pointer-events-none absolute inset-0 rounded-lg border border-white/5 opacity-50">
                            <div className="absolute left-0 top-0 size-2 border-l border-t border-[#FFAA00]" />
                            <div className="absolute right-0 top-0 size-2 border-r border-t border-[#FFAA00]" />
                            <div className="absolute bottom-0 left-0 size-2 border-b border-l border-[#FFAA00]" />
                            <div className="absolute bottom-0 right-0 size-2 border-b border-r border-[#FFAA00]" />
                          </div>

                          {/* ACTUAL IMAGE RENDER */}
                          {/* Removed p-6 padding to allow image to fill space */}
                          <div className="relative z-10 flex size-full items-center justify-center">
                            <motion.img
                              src={tab.content.image}
                              alt={tab.content.mainTitle}
                              // Increased width to 130%, removed max-h, and added transform to push it out of the frame
                              className="h-auto w-[110%] translate-x-6 translate-y-6 object-contain drop-shadow-2xl md:w-[130%] md:translate-x-12 md:translate-y-12"
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                            />

                            {/* Subtle floating animation overlay for extra "3D" feel */}
                            <motion.div
                              className="pointer-events-none absolute inset-0 z-20"
                              animate={{ y: [0, -10, 0] }}
                              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
