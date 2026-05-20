'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import type { TeamBlock, Media } from '@/payload-types'

// --- Helper: Type Guard for Payload Media ---
const isMedia = (media: unknown): media is Media => {
  return media !== null && typeof media === 'object' && 'url' in media
}

// --- Components ---

interface MemberData {
  name: string
  role: string
  tag?: string | null
  description?: string | null
  footerId?: string | null
  image?: number | Media | null
  linkedin?: string | null
  email?: string | null
  id?: string | null
}

const LeaderCard = ({ member }: { member: MemberData }) => {
  const imageUrl = isMedia(member.image) ? member.image.url : null
  const imageAlt = isMedia(member.image) ? member.image.alt : member.name

  return (
    <div className="relative flex h-auto w-full flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-[#FFAA00]/30 md:p-6">
      {/* Decorative Noise/Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
        {/* Image & ID Block */}
        <div className="mx-auto w-full max-w-[140px] shrink-0 md:mx-0 md:max-w-[190px]">
          {/* Image Container */}
          <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 md:aspect-[2/3]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt || ''}
                fill
                className="object-cover opacity-90 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                sizes="(max-width: 768px) 128px, 192px"
                priority
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-[#111] font-mono text-white/20">
                NO_IMG
              </div>
            )}

            <div className="absolute top-0 z-20 h-[2px] w-full bg-[#FFAA00]/50 opacity-0 shadow-[0_0_20px_#FFAA00] group-hover:animate-pulse group-hover:opacity-100" />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1">
          {/* Tag */}
          {member.tag && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-[#FFAA00]/20 bg-[#FFAA00]/10 px-3 py-1">
              <span className="font-mono text-[clamp(0.6875rem,0.75vw,0.625rem)] font-bold tracking-[0.2em] text-[#FFAA00]">
                {member.tag}
              </span>
            </div>
          )}

          {/* Name (Font Heading / Antonio) */}
          <h3 className="mb-2 font-heading text-3xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-5xl">
            {member.name.split(' ')[0]} <br />
            <span className="text-white/80">
              {member.name.split(' ').slice(1).join(' ')}
            </span>
          </h3>

          {/* Role (Font Mono / JetBrains) */}
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#FFAA00]/80">
            {member.role}
          </p>

          {/* Description Block */}
          {member.description && (
            <div className="relative mb-6 border-l-2 border-[#FFAA00] pl-4">
              <p className="font-sans text-sm font-light leading-relaxed text-gray-300 md:text-base">
                &ldquo;{member.description}&rdquo;
              </p>
            </div>
          )}

          {/* Socials (Phosphor Icons) */}
          <div className="flex gap-3">
            {member.linkedin && (
              <>
                {/* SEO: Add aria-label to icon-only link for crawlability and accessibility */}
                <Link
                  href={member.linkedin}
                  aria-label={`LinkedIn profile for ${member.name}`}
                  className="group flex size-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white transition-all hover:border-[#FFAA00] hover:bg-[#FFAA00] hover:text-black"
                >
                  <LinkedinLogo size={20} weight="duotone" />
                </Link>
              </>
            )}
            {member.email && (
              <>
                {/* SEO: Add aria-label to icon-only link for crawlability and accessibility */}
                <Link
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="group flex size-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white transition-all hover:border-[#FFAA00] hover:bg-[#FFAA00] hover:text-black"
                >
                  <EnvelopeSimple size={20} weight="duotone" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Footer ID Tag */}
      {member.footerId && (
        <div className="mt-6 flex items-center justify-between border-t border-white/10 py-3 font-mono text-[clamp(0.6875rem,0.75vw,0.625rem)] tracking-widest text-gray-500">
          <span>{member.footerId}</span>
          <span className="text-[#FFAA00]">ONLINE</span>
        </div>
      )}
    </div>
  )
}

const TeamMemberCard = ({ member }: { member: MemberData }) => {
  const imageUrl = isMedia(member.image) ? member.image.url : null
  const imageAlt = isMedia(member.image) ? member.image.alt : member.name

  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#FFAA00]/50 hover:shadow-[0_10px_40px_-10px_rgba(255,170,0,0.1)]">
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header: Image & Tag */}
      <div className="relative z-10 mb-6 flex items-start justify-between">
        <div className="relative size-24 overflow-hidden rounded-lg border border-white/10 bg-[#151515]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt || ''}
              fill
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              sizes="96px"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-[10px] text-white/20">
              IMG
            </div>
          )}
        </div>

        {member.tag && (
          <div className="rounded border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-md">
            <span className="font-mono text-[clamp(0.6875rem,0.75vw,0.625rem)] font-bold tracking-wider text-[#FFAA00]">
              {member.tag}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Name (Font Heading) */}
        <h3 className="mb-1 font-heading text-2xl font-bold uppercase text-white transition-colors group-hover:text-[#FFAA00]">
          {member.name}
        </h3>

        {/* Role (Font Mono) */}
        <p className="mb-4 font-mono text-[clamp(0.6875rem,0.8vw,0.7rem)] uppercase tracking-wider text-gray-500">
          {member.role}
        </p>

        {/* Description (Font Sans) */}
        {member.description && (
          <p className="mb-6 font-sans text-sm font-light leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300">
            {member.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-mono text-[clamp(0.5rem,0.75vw,0.625rem)] text-gray-600 transition-colors group-hover:text-[#FFAA00]">
          {member.footerId}
        </span>
        <div className="rounded-full bg-white/5 p-1.5 text-white/30 transition-colors group-hover:bg-[#FFAA00] group-hover:text-black">
          <ArrowUpRight size={14} weight="bold" />
        </div>
      </div>
    </div>
  )
}

export const TeamBlockComponent: React.FC<TeamBlock> = (props) => {
  const { header, leaders, members, directorsQuote } = props

  const title = header?.title || 'Notre Équipe.'
  const tag = header?.tag || '// THE MINDS BEHIND'
  const description = header?.description

  const safeLeaders = leaders || []
  const safeMembers = members || []

  const primaryLeader = safeLeaders[0]
  // Combine secondary leaders with members for the grid
  const teamGrid = [...safeLeaders.slice(1), ...safeMembers]

  // Get quote text and author from CMS or use defaults
  const quoteText =
    directorsQuote?.text ||
    "Dans un contexte économique exigeant, Smatch Digital s'impose comme le partenaire opérationnel des PME marocaines. Notre mission : élever les standards de la Supply Chain par des solutions concrètes et immédiates. Nous privilégions le pragmatisme et la proximité pour bâtir notre notoriété sur une seule exigence : l'excellence au service de votre performance."
  const quoteAuthor = directorsQuote?.author || primaryLeader?.name || 'SMATCH'

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-16 text-white">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute left-0 top-0 size-[500px] rounded-full bg-[#FFAA00]/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block font-mono text-xs tracking-[0.3em] text-[#FFAA00]">
            {tag}
          </span>
          <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
            {title.split(' ')[0]}{' '}
            <span className="text-gray-300">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          {description && (
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base text-gray-400">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8">
          {/* 1. Leader Section: Leader Card + Quote Side Panel */}
          {primaryLeader && (
            <div className="flex flex-1 flex-col gap-6 lg:flex-row">
              {/* Leader Card (Col Span 8) */}
              <div className="flex flex-1 md:col-span-1 lg:col-span-8">
                <LeaderCard member={primaryLeader} />
              </div>

              {/* Quote Side Panel (Col Span 4) */}
              <div className="relative flex flex-1 flex-col justify-between overflow-hidden p-8 md:col-span-1 lg:col-span-4 lg:p-12">
                {/* Giant Watermark Quote */}
                <div className="pointer-events-none absolute left-4 top-0 select-none font-sans text-[200px] font-black leading-none text-white/5 mix-blend-overlay">
                  <Image
                    className="pointer-events-none select-none opacity-10 mix-blend-overlay"
                    src="/assets/comma-first.svg"
                    alt=""
                    width={200}
                    height={150}
                  />
                </div>
                <p className="my-auto pt-20 text-justify font-sans text-lg font-light leading-relaxed text-gray-300 md:text-xl">
                  {quoteText}
                </p>
                <div className="relative z-10 my-auto flex h-full flex-col justify-end">
                  <div className="mb-4 h-px w-12 bg-[#FFAA00]" />
                  <p className="font-mono text-xl tracking-widest text-[#FFAA00]">
                    - {quoteAuthor}
                  </p>
                </div>
                <div className="pointer-events-none absolute bottom-0 right-4 select-none font-sans text-[200px] font-black leading-none text-white/5 mix-blend-overlay">
                  <Image
                    className="pointer-events-none select-none opacity-10 mix-blend-overlay"
                    src="/assets/comma-final.svg"
                    alt=""
                    width={200}
                    height={150}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. Team Grid */}
          {teamGrid.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {teamGrid.map((member, index) => (
                <TeamMemberCard key={member.id || index} member={member} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
