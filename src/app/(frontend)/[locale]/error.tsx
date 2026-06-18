'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <>
        {/* SEO/A11y: Use semantic <main> tag to identify primary page content, improving screen reader navigation and structural crawlability */}
        <main className="container flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
            <div className="relative mb-8">
                <div className="flex size-24 animate-pulse items-center justify-center rounded-full border-2 border-error">
                    <span className="text-4xl">⚠️</span>
                </div>
            </div>

            <h2 className="mb-4 font-heading text-4xl text-error">CRITICAL SYSTEM MALFUNCTION</h2>

            <p className="mb-8 max-w-md text-smatch-text-secondary">
                An unexpected anomaly has been detected in the core logic. Our engineers have been notified
                of this incident.
            </p>

            <div className="flex gap-4">
                <Button onClick={() => reset()} variant="outline-gold">
                    RETRY SEQUENCE
                </Button>
                <Button
                    onClick={() => (window.location.href = '/')}
                    className="bg-error text-white hover:bg-red-700"
                >
                    EMERGENCY EXIT
                </Button>
            </div>
            <div className="mt-12 w-full max-w-lg overflow-auto rounded border border-smatch-border bg-smatch-charcoal/50 p-4 text-left font-mono text-xs text-smatch-text-muted">
                <p>ERROR_DIGEST: {error.digest || 'UNKNOWN'}</p>
                <p>ERROR_MSG: {error.message}</p>
            </div>
        </main>
        </>
    )
}
