'use client'

import React, { useState, useMemo, useDeferredValue } from 'react'
import * as PhosphorIcons from '@phosphor-icons/react'
import Fuse from 'fuse.js'

// Filter out non-icon exports more aggressively
const iconList = Object.keys(PhosphorIcons).filter((key) => {
    // Phosphor icons always start with a capital letter
    if (key[0] !== key[0].toUpperCase()) return false
    // Exclude known non-icon exports
    if (['IconContext', 'Icon', 'SSR', 'IconBase'].includes(key)) return false
    // Ensure it's something that looks like a component
    const exportItem = (PhosphorIcons as Record<string, unknown>)[key]
    return exportItem && (typeof exportItem === 'function' || typeof exportItem === 'object')
})

export const IconGallery: React.FC = () => {
    const [search, setSearch] = useState('')
    const deferredSearch = useDeferredValue(search)
    const [copied, setCopied] = useState<string | null>(null)

    // Memoize the fuzzy searcher
    const fuse = useMemo(
        () =>
            new Fuse(iconList, {
                threshold: 0.3,
                distance: 100,
                keys: [],
            }),
        [],
    )

    // Smart filtering
    const filteredIcons = useMemo(() => {
        if (!deferredSearch) return iconList
        return fuse.search(deferredSearch).map((result) => result.item)
    }, [deferredSearch, fuse])

    const handleCopy = (name: string) => {
        navigator.clipboard.writeText(name)
        setCopied(name)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <PhosphorIcons.IconContext.Provider
            value={{
                color: 'currentColor',
                size: 28,
                weight: 'regular',
                mirrored: false,
            }}
        >
            <div
                style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(180deg, #0a0a0a 0%, #141414 100%)',
                    padding: '40px 24px',
                }}
            >
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ marginBottom: '48px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <div
                                style={{
                                    width: '4px',
                                    height: '32px',
                                    background: 'linear-gradient(180deg, #FFAA00 0%, #FFE680 100%)',
                                    borderRadius: '2px',
                                }}
                            />
                            <h1
                                style={{
                                    fontSize: '28px',
                                    fontWeight: '700',
                                    color: '#FFFFFF',
                                    margin: 0,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Icon Library
                            </h1>
                            <span
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: '#FFAA00',
                                    background: 'rgba(255, 170, 0, 0.1)',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255, 200, 0, 0.2)',
                                }}
                            >
                                PHOSPHOR
                            </span>
                        </div>
                        <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', marginLeft: '16px' }}>
                            Click any icon to copy its name. Paste it into the &quot;Icon Name&quot; field in blocks.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div style={{ marginBottom: '32px' }}>
                        <div style={{ position: 'relative', maxWidth: '500px' }}>
                            <PhosphorIcons.MagnifyingGlass
                                size={20}
                                style={{
                                    position: 'absolute',
                                    left: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'rgba(255, 255, 255, 0.4)',
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Search icons..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px 14px 48px',
                                    fontSize: '15px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                    color: '#FFFFFF',
                                    fontFamily: 'inherit',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 200, 0, 0.4)'
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'
                                }}
                            />
                            {search !== deferredSearch && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        right: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                    }}
                                >
                                    <PhosphorIcons.CircleNotch
                                        size={18}
                                        style={{ color: '#FFAA00', animation: 'spin 1s linear infinite' }}
                                    />
                                </div>
                            )}
                        </div>
                        <div
                            style={{
                                marginTop: '12px',
                                fontSize: '13px',
                                color: 'rgba(255, 255, 255, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <span
                                style={{
                                    background: 'rgba(255, 200, 0, 0.15)',
                                    color: '#FFAA00',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontWeight: '600',
                                    fontSize: '12px',
                                }}
                            >
                                {filteredIcons.length.toLocaleString()}
                            </span>
                            <span>icons available</span>
                        </div>
                    </div>

                    {/* Icon Grid */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: '12px',
                        }}
                    >
                        {filteredIcons.map((name) => {
                            const Icon = (PhosphorIcons as unknown as Record<string, React.ComponentType>)[name]
                            const isCopied = copied === name

                            if (!Icon) return null

                            return (
                                <button
                                    type="button"
                                    key={name}
                                    onClick={() => handleCopy(name)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '16px 8px',
                                        border: isCopied
                                            ? '1px solid rgba(255, 200, 0, 0.5)'
                                            : '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '12px',
                                        backgroundColor: isCopied
                                            ? 'rgba(255, 200, 0, 0.08)'
                                            : 'rgba(255, 255, 255, 0.02)',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        gap: '10px',
                                        minHeight: '90px',
                                        color: isCopied ? '#FFAA00' : 'rgba(255, 255, 255, 0.7)',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isCopied) {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                                            e.currentTarget.style.color = '#FFFFFF'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isCopied) {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
                                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                                        }
                                    }}
                                    title={`Click to copy: ${name}`}
                                    type="button"
                                >
                                    <Icon />
                                    <span
                                        style={{
                                            fontSize: '10px',
                                            textAlign: 'center',
                                            wordBreak: 'break-word',
                                            fontFamily: 'monospace',
                                            lineHeight: '1.3',
                                            fontWeight: isCopied ? '600' : '400',
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {isCopied ? '✓ Copied!' : name}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Empty State */}
                    {filteredIcons.length === 0 && (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '80px 40px',
                                color: 'rgba(255, 255, 255, 0.4)',
                            }}
                        >
                            <PhosphorIcons.MagnifyingGlass size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                            <p style={{ fontSize: '16px', marginBottom: '8px' }}>No icons found</p>
                            <p style={{ fontSize: '14px', opacity: 0.6 }}>
                                Try searching for &quot;{search}&quot; with different keywords
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Spinner animation */}
            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </PhosphorIcons.IconContext.Provider>
    )
}

