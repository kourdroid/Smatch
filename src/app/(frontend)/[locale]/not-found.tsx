import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="container flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
      {/* SEO: Use semantic <main> tag to indicate the primary content of the document, improving crawlability and accessibility. */}
      <div className="relative">
        <h1 className="select-none font-heading text-[12rem] font-bold leading-none text-smatch-gold/10">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-pulse font-mono text-3xl text-smatch-gold">
            ERROR: COORDINATES_LOST
          </span>
        </div>
      </div>
      <p className="mt-6 max-w-md text-smatch-text-secondary">
        The requested sector could not be located in the system database. It may have been
        decommissioned or moved to a classified directory.
      </p>
      <div className="mt-8">
        <Button asChild size="lg" variant="gold">
          <Link href="/">INITIATE_HOME_PROTOCOL</Link>
        </Button>
      </div>
    </main>
  )
}
