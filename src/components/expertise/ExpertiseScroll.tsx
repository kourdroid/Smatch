'use client'

import React, { useEffect } from 'react'
import {
  Factory,
  Globe,
  Truck,
  Leaf,
  Cpu,
  Database,
  Cube,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/utilities/ui'
import Image from 'next/image'

// --- DATA ---
const EXPERTISE_DATA = [
  {
    id: 'industrie',
    title: 'INDUSTRIE X.0',
    subtitle: 'AUTOMATISATION',
    description: 'Transformation numérique des lignes de production.',
    cards: [
      {
        title: 'AUTOMATISATION INTELLIGENTE',
        subtitle: 'INDUSTRIE 4.0',
        description:
          "Accélérez votre transformation vers l'Industrie 4.0. De la logistique à la ligne de production, nous déployons l'intelligence au cœur de la machine.",
        image: '/assets/expertise/turbine.png',
        features: [
          'Pilotage & Robotique (Bras, AGV)',
          'Systèmes Embarqués sur mesure',
          'Maintenance Prédictive IoT',
        ],
        icon: <Factory className="size-8 text-yellow-500" />,
      },
    ],
  },
  {
    id: 'solutions',
    title: 'SOLUTIONS MÉTIER',
    subtitle: 'SECTEURS CLÉS',
    description: 'Expertise verticale pour des défis spécifiques.',
    cards: [
      {
        title: 'SUPPLY CHAIN 360',
        subtitle: 'LOGISTIQUE',
        description:
          'Une visibilité totale sur vos opérations grâce à la traçabilité RFID, la gestion WMS avancée et l’orchestration des transports.',
        image: '/assets/domains/supply-chain-iso.png',
        features: ['WMS & TMS Intégrés', 'Traçabilité RFID Temps Réel', 'Optimisation de Tournées'],
        icon: <Truck className="size-8 text-orange-500" />,
      },
      {
        title: 'AGRI & HOSPITALITÉ',
        subtitle: 'SMART SERVICES',
        description:
          "Digitalisation des actifs ruraux (AgriTech) et réinvention de l'expérience client (Hospitalité) via l'IoT.",
        image: '/assets/expertise/bull-wireframe.png',
        features: ['Suivi Bétail & Rendement', 'Check-in Sans Contact', 'Computer Vision'],
        icon: <Leaf className="size-8 text-green-500" />,
      },
      {
        title: 'CITOYENNETÉ',
        subtitle: 'SMART CITY',
        description:
          'Plateformes unifiées, identité numérique et transparence administrative pour les villes de demain.',
        image: '/assets/domains/core-inteligence.png',
        features: ['Portails Citoyens Unifiés', 'Identité Numérique', 'Gestion des Déchets'],
        icon: <Globe className="size-8 text-blue-500" />,
      },
    ],
  },
  {
    id: 'data-ai',
    title: 'DATA & INTELLIGENCE',
    subtitle: 'COGNITIVE',
    description: 'Le pouvoir de la donnée massive.',
    cards: [
      {
        title: 'INTELLIGENCE ARTIFICIELLE',
        subtitle: 'AI AGENTS',
        description:
          "Algorithmes génératifs et vision par ordinateur pour l'automatisation des tâches complexes.",
        image: '/assets/domains/core-inteligence.svg',
        features: ['LLMs & Agents Autonomes', 'OCR & Traitement Doc', 'Computer Vision'],
        icon: <Cpu className="size-8 text-purple-500" />,
      },
      {
        title: 'BIG DATA ANALYTICS',
        subtitle: 'DATA ENGINEERING',
        description:
          'Traitement massif de données non structurées. De la collecte à la visualisation décisionnelle.',
        image: '/assets/expertise/data-cube.png',
        features: ['Data Lakes & Warehouses', 'Pipelines ETL Temps Réel', 'Dashboards BI'],
        icon: <Database className="size-8 text-cyan-500" />,
      },
      {
        title: 'SIMULATION 3D',
        subtitle: 'DIGITAL TWINS',
        description:
          'Jumeaux numériques pour entrepôts et usines. Simulation immersive des opérations sous Unreal Engine 5.',
        image: '/assets/domains/industry-iso.png',
        features: ['Jumeaux Numériques', 'Simulation de Flux', 'Rendu Temps Réel'],
        icon: <Cube className="size-8 text-red-500" />,
      },
    ],
  },
]

export default function ExpertiseScroll() {
  // Enable scroll snapping on the document root
  useEffect(() => {
    // Save original style to restore on unmount
    const originalScrollSnapType = document.documentElement.style.scrollSnapType

    // Use 'proximity' instead of 'mandatory' so the browser doesn't force scrolling
    // away from sections that don't have snap points (like Hero/Footer).
    document.documentElement.style.scrollSnapType = 'y proximity'

    return () => {
      document.documentElement.style.scrollSnapType = originalScrollSnapType
    }
  }, [])

  return (
    <div className="relative z-10 bg-black">
      <div className="container mx-auto px-4 py-12 md:py-32">
        {/* Loop through Main Sections */}
        {EXPERTISE_DATA.map((section, index) => (
          <div
            key={section.id}
            className="relative grid gap-8 border-t border-white/10 py-12 first:border-0 md:grid-cols-12 md:gap-16 md:py-32 lg:gap-24"
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
              {section.cards.map((card, i) => (
                <div key={i} className="group relative snap-center">
                  {/* Background Glow */}
                  <div className="absolute -inset-4 rounded-md bg-gradient-to-r from-yellow-500/10 to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="relative overflow-hidden rounded-md border border-white/10 bg-zinc-900/40 backdrop-blur-sm transition-colors duration-500 hover:border-yellow-500/30">
                    <div className="grid gap-0 lg:grid-cols-2">
                      {/* Text Content */}
                      <div className="flex flex-col justify-center p-6 md:p-16 lg:p-20">
                        <div className="mb-8 flex items-center gap-4">
                          <div className="rounded-full border border-white/10 bg-white/5 p-3 text-white">
                            {card.icon}
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
                          {card.features.map((feature, fIndex) => (
                            <li
                              key={fIndex}
                              className="flex items-start gap-3 text-sm text-zinc-300"
                            >
                              <CheckCircle className="size-5 shrink-0 text-yellow-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Image Content */}
                      <div className="relative min-h-[300px] border-t border-white/10 bg-black/50 lg:min-h-full lg:border-l lg:border-t-0">
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                          {/* Glow behind image */}
                          <div className="absolute size-[200px] rounded-full bg-yellow-500/20 blur-[80px]" />
                          <div className="relative z-10 size-full transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl">
                            <Image
                              src={card.image}
                              alt={card.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
