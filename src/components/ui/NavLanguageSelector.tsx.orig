'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlobeSimple, CaretDown } from '@phosphor-icons/react'

import {
    i18nConfig,
    getLocaleFromPath,
    removeLocaleFromPath,
    localeNames,
    type Locale,
} from '@/utilities/i18n'
import { cn } from '@/utilities/ui'

interface NavLanguageSelectorProps {
    className?: string
    openUp?: boolean // Opens dropdown upward instead of downward
}

/**
 * NavLanguageSelector Component
 *
 * A glassmorphism-styled language selector designed for the navbar.
 * Matches the nav pill aesthetic with backdrop blur and subtle borders.
 */
export const NavLanguageSelector: React.FC<NavLanguageSelectorProps> = ({ className, openUp = false }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [hovered, setHovered] = useState<Locale | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const currentLocale = getLocaleFromPath(pathname)
    const pathWithoutLocale = removeLocaleFromPath(pathname)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    // Close dropdown on route change
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <div ref={dropdownRef} className={cn('relative pointer-events-auto', className)}>
            {/* Trigger Button - Matches nav link styling since inside pill */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'relative flex items-center gap-2',
                    'px-4 py-2.5 rounded-full',
                    'transition-all duration-300',
                    'hover:bg-white/5',
                    'group',
                )}
            >
                <GlobeSimple
                    size={16}
                    weight="regular"
                    className="text-white/60 group-hover:text-white/80 transition-colors"
                />
                <span className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-white/60 group-hover:text-white">
                    {currentLocale}
                </span>
                <CaretDown
                    size={12}
                    weight="bold"
                    className={cn(
                        'text-white/40 transition-transform duration-200',
                        isOpen && 'rotate-180',
                    )}
                />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: openUp ? 8 : -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: openUp ? 8 : -8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className={cn(
                            'absolute right-0 z-50',
                            openUp ? 'bottom-full mb-4' : 'top-full mt-4',
                            'min-w-[140px] overflow-hidden rounded-xl',
                            'bg-[#111111]/90 border border-white/15',
                            'shadow-[0_10px_40px_rgba(0,0,0,0.6)]',
                        )}
                    >
                        {/* Top highlight */}
                        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <div className="py-1.5">
                            {i18nConfig.locales.map((locale) => {
                                const isActive = locale === currentLocale
                                const href = `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

                                return (
                                    <Link
                                        key={locale}
                                        href={href}
                                        onMouseEnter={() => setHovered(locale)}
                                        onMouseLeave={() => setHovered(null)}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            'relative flex items-center gap-3 px-4 py-2.5',
                                            'transition-colors duration-200',
                                        )}
                                    >
                                        {/* Hover/Active background */}
                                        {(isActive || hovered === locale) && (
                                            <motion.div
                                                layoutId="lang-selector-bg"
                                                className={cn(
                                                    'absolute inset-x-1.5 inset-y-0.5 rounded-lg',
                                                    isActive
                                                        ? 'bg-white/10 border border-white/5'
                                                        : 'bg-white/5 border border-white/5',
                                                )}
                                                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                                            />
                                        )}

                                        {/* Active indicator dot */}
                                        <span
                                            className={cn(
                                                'relative z-10 size-1.5 rounded-full transition-colors',
                                                isActive ? 'bg-[#FFAA00]' : 'bg-white/20',
                                            )}
                                        />

                                        {/* Language name */}
                                        <span
                                            className={cn(
                                                'relative z-10 font-sans text-[11px] font-bold tracking-[0.12em] uppercase transition-colors',
                                                isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80',
                                            )}
                                        >
                                            {localeNames[locale]}
                                        </span>

                                        {/* Locale code */}
                                        <span
                                            className={cn(
                                                'relative z-10 ml-auto font-mono text-[10px] tracking-wider uppercase transition-colors',
                                                isActive ? 'text-[#FFAA00]' : 'text-white/30',
                                            )}
                                        >
                                            {locale}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default NavLanguageSelector
