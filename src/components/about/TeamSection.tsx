'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

// --- Utility for Tailwind Classes ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

// --- Data Structure ---

const DIRECTORS_WORD = {
  id: 'quote-lead',
  text: "Consultant manager polyvalent alliant expertise technique et vision entrepreneuriale. Mon code source : transformer la complexité en opportunité.",
  author: "TARIK ZAGHLOUL",
  role: "CEO & FOUNDER",
  tag: "VISION"
}

const TEAM_MEMBERS = [
  {
    id: 'tarik',
    tag: '[ ARCHITECT_01 ]',
    name: 'TARIK ZAGHLOUL',
    role: 'CEO & FOUNDER | EPFL ALUMNI',
    // Description text for the card
    description: 'Consultant manager polyvalent alliant expertise technique et vision entrepreneuriale. Mon code source : transformer la complexité en opportunité.',
    footerId: 'ID: TZ_001 // LEAD',
    image: '/assets/team/tarik.jpg',
    linkedin: '#',
    email: 'mailto:tarik@smatch.ma',
    isLeader: true,
  },
  {
    id: 'mostafa',
    tag: 'SYS ADMIN',
    name: 'MOSTAFA T.',
    role: 'PROJECT MANAGER',
    description: "Ingénieur d’État en mécanique et titulaire d’un Executive MBA en Supply Chain. 25 ans d’expérience.",
    footerId: 'ID: MT_002 // LEAD',
    image: '/assets/team/mostafa.jpg',
    linkedin: '#',
    email: 'mailto:mostafa@smatch.ma',
  },
  {
    id: 'mohammed',
    tag: 'TEAM_LEADER',
    name: 'MOHAMMED B.',
    role: 'HEAD OF ENGINEERING',
    description: "Pilotage de l'architecture technique et supervision des équipes de développement Full Stack.",
    footerId: 'ID: MB_003 // ENG',
    image: '/assets/team/mohammed.jpg',
    linkedin: '#',
    email: 'mailto:mohammed@smatch.ma',
  },
  {
    id: 'fatima',
    tag: 'DATA_SCI',
    name: 'FATIMA B.',
    role: 'TEAM LEAD',
    description: "Expertise en modélisation prédictive et algorithmes d'IA appliqués à la logistique.",
    footerId: 'ID: FB_004 // DATA',
    image: '/assets/team/fatima.jpg',
    linkedin: '#',
    email: 'mailto:fatima@smatch.ma',
  },
  {
    id: 'adil',
    tag: 'LOGISTICS',
    name: 'ADIL F.',
    role: 'EXPERT EN LOGISTIQUE',
    description: "Optimisation des flux WMS et intégration des processus terrain.",
    footerId: 'ID: AF_005 // LOG',
    image: '/assets/team/adil.jpg',
    linkedin: '#',
    email: 'mailto:adil@smatch.ma',
  },
]

// --- Components ---

const LeaderCard = ({ member }: { member: typeof TEAM_MEMBERS[0] }) => {
  return (
    <div className="relative size-full overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-[#FFAA00]/30 md:p-8">
      {/* Decorative Noise/Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      <div className="relative z-10 flex flex-col-reverse gap-10 lg:flex-row lg:items-start lg:gap-16">

        {/* Image & ID Block */}
        <div className="flex flex-col gap-4 lg:w-[320px]">
          {/* Image Container */}
          <div className="group relative aspect-[5/8] w-full overflow-hidden rounded-xl border border-white/10 bg-black/50">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover opacity-90 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                sizes="(max-width: 1024px) 100vw, 320px"
                priority
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-[#111] font-mono text-white/20">
                NO_IMG
              </div>
            )}

            <div className="group-hover:animate-scan absolute top-0 z-20 h-[2px] w-full bg-[#FFAA00]/50 opacity-0 shadow-[0_0_20px_#FFAA00] group-hover:opacity-100" />
          </div>

          {/* ID Tag (Font Mono) */}
        </div>
        {/* Text Content */}
        <div className="flex-1">
          {/* Tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-[#FFAA00]/20 bg-[#FFAA00]/10 px-4 py-1.5">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#FFAA00]">
              {member.tag}
            </span>
          </div>

          {/* Name (Font Heading / Antonio) */}
          <h3 className="mb-4 font-heading text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-[5rem]">
            {member.name.split(' ')[0]} <br />
            <span className="smatch-gradient-text bg-gradient-to-b from-white to-white/40 bg-clip-text">
              {member.name.split(' ').slice(1).join(' ')}
            </span>
          </h3>

          {/* Role (Font Mono / JetBrains) */}
          <p className="mb-8 font-mono text-sm uppercase tracking-widest text-[#FFAA00]/80">
            {member.role}
          </p>

          {/* Description Block (Moved back inside card as per request) */}
          <div className="relative mb-10 border-l-2 border-[#FFAA00] pl-6">
            {/* Gradient Quote (Font Sans / Inter) */}
            <p className="smatch-gradient-text bg-gradient-to-r from-white via-white/90 to-gray-400 bg-clip-text font-sans text-lg font-light leading-relaxed md:text-xl">
              "{member.description}"
            </p>
          </div>

          {/* Socials (Phosphor Icons) */}
          <div className="flex gap-4">
            {/* SEO: Add aria-label to icon-only link for accessibility and crawlability */}
            <Link href={member.linkedin} aria-label={`Profil LinkedIn de ${member.name}`} className="group flex size-12 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white transition-all hover:border-[#FFAA00] hover:bg-[#FFAA00] hover:text-black">
              <LinkedinLogo size={32} weight="duotone" />
            </Link>
            {/* SEO: Add aria-label to icon-only link for accessibility and crawlability */}
            <Link href={member.email} aria-label={`Envoyer un email à ${member.name}`} className="group flex size-12 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white transition-all hover:border-[#FFAA00] hover:bg-[#FFAA00] hover:text-black">
              <EnvelopeSimple size={32} weight="duotone" />
            </Link>
          </div>
        </div>

      </div>
      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs tracking-widest text-gray-500">
        <span>{member.footerId}</span>
        <span className="text-[#FFAA00]">ONLINE</span>
      </div>
    </div>
  )
}

const TeamMemberCard = ({ member }: { member: typeof TEAM_MEMBERS[0] }) => {
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#FFAA00]/50 hover:shadow-[0_10px_40px_-10px_rgba(255,170,0,0.1)]">

      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header: Image & Tag */}
      <div className="relative z-10 mb-6 flex items-start justify-between">
        <div className="relative size-24 overflow-hidden rounded-lg border border-white/10 bg-[#151515]">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="size-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-[10px] text-white/20">IMG</div>
          )}
        </div>

        <div className="rounded border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-md">
          <span className="font-mono text-[10px] font-bold tracking-wider text-[#FFAA00]">
            {member.tag === '[ ARCHITECT_01 ]' ? 'LEAD' : member.tag}
          </span>

        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Name (Font Heading) */}
        <h3 className="mb-1 font-heading text-2xl font-bold uppercase text-white transition-colors group-hover:text-[#FFAA00]">
          {member.name}
        </h3>

        {/* Role (Font Mono) */}
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-gray-500">
          {member.role}
        </p>

        {/* Description (Font Sans) */}
        <p className="mb-6 whitespace-pre-line font-sans text-sm font-light leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300">
          {member.description}
        </p>
      </div>
      {/* <div className="flex gap-4">
        <Link href={member.linkedin} aria-label={`Profil LinkedIn de ${member.name}`} className="group flex h-8 w-8 items-center justify-center rounded-sm  transition-all  text-white">
          <LinkedinLogo size={32} weight="duotone" className='hover' />
        </Link>
        <Link href={member.email} aria-label={`Envoyer un email à ${member.name}`} className="group flex h-8 w-8 items-center justify-center rounded-sm  transition-all  text-white">
          <EnvelopeSimple size={32} weight="duotone" className='hover' />
        </Link>
      </div> */}

      {/* Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-mono text-[10px] text-gray-600 transition-colors group-hover:text-[#FFAA00]">
          {member.footerId}
        </span>
        <div className="rounded-full bg-white/5 p-1.5 text-white/30 transition-colors group-hover:bg-[#FFAA00] group-hover:text-black">
          <ArrowUpRight size={14} weight="bold" />
        </div>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const tarik = TEAM_MEMBERS[0]
  const team = TEAM_MEMBERS.slice(1)

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-24 text-white">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute left-0 top-0 size-[500px] rounded-full bg-[#FFAA00]/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">

        {/* Section Header */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block font-mono text-xs tracking-[0.3em] text-[#FFAA00]">
                        // THE MINDS BEHIND
          </span>
          <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
            Notre <span className="smatch-gradient-text bg-gradient-to-r from-white to-gray-600 bg-clip-text">Équipe.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8">

          {/* 1. Header Grid: Leader + Quote Side Panel */}
          <div className="grid gap-6 lg:grid-cols-12">

            {/* Leader Card (Col Span 8) */}
            <div className="lg:col-span-8">
              <LeaderCard member={tarik} />
            </div>

            {/* Quote Side Panel (Col Span 4) */}
            <div className="relative flex flex-col justify-between overflow-hidden  p-8 lg:col-span-4 lg:p-12">
              {/* Giant Watermark Quote */}
              <div className="pointer-events-none absolute left-4 top-0 select-none font-sans text-[200px] font-black leading-none text-white/5 mix-blend-overlay">
                <Image className='pointer-events-none select-none opacity-10 mix-blend-overlay  ' src="/assets/comma-first.svg" alt="" width={200} height={150} />
              </div>
              <p className='smatch-gradient-text my-auto bg-gradient-to-r from-white via-white/90 to-gray-400 bg-clip-text pt-20 text-justify font-sans text-lg font-light leading-relaxed md:text-xl'>
                Dans un contexte économique exigeant, Smatch Digital s'impose comme le partenaire opérationnel des PME marocaines.
                <br />
                Notre mission : élever les standards de la Supply Chain par des solutions concrètes et immédiates. <br /> Nous privilégions le pragmatisme et la proximité pour bâtir notre notoriété sur une seule exigence : l'excellence au service de votre performance.
              </p>
              <div className="relative z-10 my-auto flex h-full flex-col justify-end">
                <div className="mb-4 h-px w-12 bg-[#FFAA00]" />
                <p className="font-mono text-xl tracking-widest text-[#FFAA00]">
                  - {tarik.name}
                </p>
              </div>
              <div className="pointer-events-none absolute bottom-0 right-4 select-none font-sans text-[200px] font-black leading-none text-white/5 mix-blend-overlay">
                <Image className='pointer-events-none select-none opacity-10 mix-blend-overlay' src="/assets/comma-final.svg" alt="" width={200} height={150} />
              </div>
            </div>


          </div>

          {/* 2. Team Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

        </div>
      </div>

      {/* Custom Keyframe Styles for animations */}
      <style jsx global>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}</style>
    </section>
  )
}

export { TeamSection };
