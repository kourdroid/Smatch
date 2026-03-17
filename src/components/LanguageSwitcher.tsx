'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import {
    i18nConfig,
    getLocaleFromPath,
    removeLocaleFromPath,
    localeNames,
    type Locale
} from '@/utilities/i18n'

interface LanguageSwitcherProps {
    className?: string
}

/**
 * LanguageSwitcher Component
 * 
 * Displays the current locale with a dropdown/toggle to switch languages.
 * Preserves the current path when switching languages.
 * 
 * @example
 * <LanguageSwitcher className="ml-4" />
 */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
    const pathname = usePathname()
    const currentLocale = getLocaleFromPath(pathname)
    const pathWithoutLocale = removeLocaleFromPath(pathname)

    // Get alternate locales (all except current)
    const alternateLocales = i18nConfig.locales.filter(
        (locale) => locale !== currentLocale
    )

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Current locale indicator */}
            <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                {currentLocale.toUpperCase()}
            </span>

            {/* Separator */}
            <span className="text-white/20">/</span>

            {/* Alternate locale links */}
            {alternateLocales.map((locale) => (
                <Link
                    key={locale}
                    href={`/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
                    className="font-mono text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-smatch-gold"
                    title={localeNames[locale]}
                >
                    {locale.toUpperCase()}
                </Link>
            ))}
        </div>
    )
}

/**
 * LanguageSwitcherDropdown Component
 * 
 * Alternative dropdown-style language switcher.
 * Better for sites with many languages.
 */
export const LanguageSwitcherDropdown: React.FC<LanguageSwitcherProps> = ({
    className = ''
}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const currentLocale = getLocaleFromPath(pathname)
    const pathWithoutLocale = removeLocaleFromPath(pathname)

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:border-smatch-gold hover:text-smatch-gold"
            >
                {localeNames[currentLocale]}
                <svg
                    className={`size-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 min-w-[120px] overflow-hidden rounded-md border border-white/10 bg-smatch-black shadow-lg">
                    {i18nConfig.locales.map((locale) => (
                        <Link
                            key={locale}
                            href={`/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
                            className={`block px-3 py-2 font-sans text-sm transition-colors hover:bg-white/5 ${locale === currentLocale
                                    ? 'bg-smatch-gold/10 text-smatch-gold'
                                    : 'text-white/80 hover:text-white'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {localeNames[locale]}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageSwitcher
