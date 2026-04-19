/**
 * Internationalization (i18n) Configuration
 * 
 * This module provides centralized locale configuration for both
 * server and client components following Payload CMS best practices.
 */

export const i18nConfig = {
    locales: ['en', 'fr'] as const,
    defaultLocale: 'fr' as const,
    fallback: true,
} as const

export type Locale = (typeof i18nConfig.locales)[number]

/**
 * Validate that a string is a supported locale
 */
export function isValidLocale(locale: string): locale is Locale {
    return (i18nConfig.locales as readonly string[]).includes(locale)
}

/**
 * Get locale from path segments
 * @example getLocaleFromPath('/fr/about') => 'fr'
 */
export function getLocaleFromPath(pathname: string): Locale {
    const segments = pathname.split('/').filter(Boolean)
    const firstSegment = segments[0]

    if (firstSegment && isValidLocale(firstSegment)) {
        return firstSegment
    }

    return i18nConfig.defaultLocale
}

/**
 * Remove locale prefix from path
 * @example removeLocaleFromPath('/fr/about') => '/about'
 */
export function removeLocaleFromPath(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean)
    const firstSegment = segments[0]

    if (firstSegment && isValidLocale(firstSegment)) {
        return '/' + segments.slice(1).join('/')
    }

    return pathname
}

/**
 * Add locale prefix to path
 * @example addLocaleToPath('/about', 'fr') => '/fr/about'
 */
export function addLocaleToPath(pathname: string, locale: Locale): string {
    const cleanPath = removeLocaleFromPath(pathname)
    return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
}

/**
 * Locale display names for UI
 */
export const localeNames: Record<Locale, string> = {
    en: 'English',
    fr: 'Français',
}

/**
 * Locale direction (for RTL support in future)
 */
export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
    en: 'ltr',
    fr: 'ltr',
}
