'use client'

import { cn } from '@/utilities/ui'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'

// --- Types & Layout ---

interface NavItem {
  name: string
  link: string
}

export const NavbarLayout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <>
      {/* Desktop Layout - Top Fixed */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-[10000] w-full px-6 py-6 pointer-events-none hidden md:block',
          className,
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          {children}
        </div>
      </div>

      {/* Mobile Layout Container - Handles z-index for children */}
      <div className="pointer-events-none fixed inset-0 z-[10000] md:hidden">{children}</div>
    </>
  )
}

// --- DESKTOP COMPONENTS (Unchanged from previous best version) ---

export const NavBrand = ({
  children,
  isScrolled,
}: {
  children: React.ReactNode
  isScrolled: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: isScrolled ? 0 : 1,
        y: isScrolled ? -20 : 0,
        pointerEvents: isScrolled ? 'none' : 'auto',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden min-w-[200px] items-center md:flex"
    >
      {children}
    </motion.div>
  )
}

export const NavCenterPill = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 flex justify-center">
      <div
        className={cn(
          'pointer-events-auto relative flex flex-row items-center gap-1',
          'bg-[#0a0a0a]/50 smatch-backdrop-blur-xl smatch-glass-fallback border border-white/10',
          'shadow-[0_4px_30px_rgba(0,0,0,0.1)]',
          'rounded-full px-2 py-2',
          className,
        )}
      >
        <div className="absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {children}
      </div>
    </div>
  )
}

export const NavLinks = ({ items, activePath }: { items: NavItem[]; activePath?: string }) => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <nav className="flex items-center">
      {items.map((item, idx) => {
        const isActive = activePath === item.link || (activePath === '/' && item.link === '/')
        return (
          <Link
            key={idx}
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              'relative px-5 py-2.5 rounded-full transition-colors duration-300',
              'group flex items-center justify-center',
            )}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill-active"
                className="absolute inset-0 rounded-full border border-white/5 bg-white/10 shadow-inner"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {!isActive && hovered === idx && (
              <motion.div
                layoutId="nav-pill-hover"
                className="absolute inset-0 rounded-full border border-white/10 bg-white/5 shadow-inner"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span
              className={cn(
                'relative z-10 font-sans text-[11px] font-bold tracking-[0.15em] uppercase transition-colors',
                isActive ? 'text-white' : 'text-white/60 group-hover:text-white',
              )}
            >
              {item.name}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export const NavCTAContainer = ({
  children,
  isScrolled,
}: {
  children: React.ReactNode
  isScrolled: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: isScrolled ? 0 : 1,
        y: isScrolled ? -20 : 0,
        pointerEvents: isScrolled ? 'none' : 'auto',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden min-w-[200px] items-center justify-end md:flex"
    >
      {children}
    </motion.div>
  )
}

export const CTAButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <Link href={href}>
      <div className="rounded-md bg-[#FFAA00] px-6 py-2 text-black shadow-[0_0_20px_rgba(255,170,0,0.2)] transition-colors duration-300 hover:bg-[#D99200]">
        <span className="font-sans text-[12px] font-bold uppercase tracking-widest">
          {children}
        </span>
      </div>
    </Link>
  )
}

// --- NEW MOBILE "TACTICAL DOCK" COMPONENTS ---

// 1. Top Bar (Logo Only)
export const MobileTopBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-10 flex w-full justify-center p-4 md:hidden">
      <div className="pointer-events-auto rounded-md border border-white/10 bg-[#0F0F0F]/80 p-2 smatch-backdrop-blur-2xl smatch-glass-fallback">
        {children}
      </div>
    </div>
  )
}

// 2. Bottom Dock (The Navigation)
export const MobileBottomDock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pointer-events-none absolute bottom-4 left-0 z-50 flex w-full justify-center md:hidden">
      <div className="pointer-events-auto flex items-center gap-6 rounded-md border border-white/10 bg-[#0F0F0F]/80 px-8 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] smatch-backdrop-blur-2xl smatch-glass-fallback">
        {children}
      </div>
    </div>
  )
}

// 3. Bottom Sheet Overlay
export const MobileMenuOverlay = ({
  children,
  isOpen,
  onClose,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  'aria-label'?: string
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="pointer-events-auto fixed inset-0 z-[90] bg-black/60 smatch-backdrop-blur-sm md:hidden"
          />

          {/* Sheet - Slides up from bottom */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ y: '100%', opacity: 1 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 1 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="pointer-events-auto fixed inset-x-0 bottom-0 z-[100] min-h-[60vh] rounded-t-[2rem] border-t border-white/10 bg-[#111] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:hidden"
          >
            {/* Drag Handle */}
            <div className="mx-auto mb-8 h-1 w-12 rounded-full bg-white/10" />

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
