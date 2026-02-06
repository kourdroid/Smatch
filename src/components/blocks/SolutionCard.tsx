'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'

import {
  Factory,
  RocketLaunch,
  ShieldCheck,
  UsersThree,
  Plug,
  ChartLineUp,
  Barcode,
  Truck,
  Warehouse,
  Cpu,
  Globe,
} from '@phosphor-icons/react/dist/ssr'

// Define the exact props we need for strict typing
export interface SolutionStat {
  value: string
  label: string
}

export interface SolutionCardProps {
  id?: string
  title: string
  subtitle?: string
  description: string
  icon: Media | string | React.ReactNode
  stats?: SolutionStat[]
  href?: string
  badge?: string
  ctaText?: string
}

// --- Icon Mapping Strategy ---
const getIconComponent = (iconName: string): React.ReactNode => {
  const icons: Record<string, React.ReactElement> = {
    'Factory': <Factory size={24} weight="fill" />,
    'RocketLaunch': <RocketLaunch size={24} weight="fill" />,
    'ShieldCheck': <ShieldCheck size={24} weight="fill" />,
    'UsersThree': <UsersThree size={24} weight="fill" />,
    'Plug': <Plug size={24} weight="fill" />,
    'ChartLineUp': <ChartLineUp size={24} weight="fill" />,
    'Barcode': <Barcode size={24} weight="fill" />,
    'Truck': <Truck size={24} weight="fill" />,
    'Warehouse': <Warehouse size={24} weight="fill" />,
    'Circuitry': <Cpu size={24} weight="fill" />,
    'Globe': <Globe size={24} weight="fill" />,
  }
  return icons[iconName] || null
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  stats,
  href = '#',
  badge = 'MOD_02', // Default to match reference
  ctaText,
}) => {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/5 bg-[#0F0F0F]/90 p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#FFAA00]/50 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
      >
        {/* 1. Top Section: Icon & Badge */}
        <div className="mb-8 flex items-start justify-between">

          {/* Icon Box - Gold border, dark fill */}
          <div className="flex size-[48px] items-center justify-center rounded-[12px] border border-[#FFAA00]/30 bg-[#FFAA00]/5 text-[#FFAA00] transition-all duration-300 group-hover:bg-[#FFAA00] group-hover:text-black">
            {/* Clone element to force size if it's a Phosphor icon */}
            {React.isValidElement(icon) ? (
              React.cloneElement(icon as React.ReactElement<{ size?: number | string; weight?: string }>, {
                size: 24,
                weight: 'fill',
              })
            ) : typeof icon === 'object' && icon !== null && 'url' in icon ? (
              <MediaComponent resource={icon as any} className="size-6 text-[#FFAA00]" size="24px" />
            ) : typeof icon === 'string' ? (
              getIconComponent(icon) || (icon as any)
            ) : (
              icon as any
            )}
          </div>

          {/* Badge - Terminal Style */}
          <div className="flex items-center rounded-lg border border-white/5 bg-[#151515] px-3 py-1.5 shadow-inner">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#FFAA00]">
              {badge}
            </span>
          </div>
        </div>

        {/* 2. Content */}
        <div className="flex grow flex-col justify-end">
          {subtitle && (
            <span className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FFAA00]">
              {subtitle}
            </span>
          )}
          <h3 className="mb-2 font-sans text-[22px] font-bold leading-tight tracking-wide text-white transition-colors group-hover:text-[#FFAA00]">
            {title}
          </h3>
          <p className="font-sans text-[15px] font-medium leading-relaxed text-[#888888]">
            {description}
          </p>
        </div>

        {/* 3. Stats Footer (Optional) */}
        {stats && stats.length > 0 && (
          <div className="mt-8 flex items-center gap-8 border-t border-white/5 pt-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-mono text-lg font-bold text-[#FFAA00]">{stat.value}</span>
                <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-600">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 4. CTA Button (Optional) */}
        {ctaText && (
          <div className="mt-8">
            <div className="inline-flex items-center justify-center rounded-lg bg-[#FFAA00] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-transform group-hover:scale-105">
              {ctaText}
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        )}

        {/* 4. Hover Glow Effect */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-[#FFAA00] opacity-0 blur-[100px] transition-opacity duration-500 group-hover:opacity-20" />
      </motion.div>
    </Link>
  )
}
