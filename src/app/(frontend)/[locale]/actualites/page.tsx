import type { Metadata } from 'next/types'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { getPayload } from '@/getPayload'
import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { ArrowUpRight, Clock } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ActualitesPage(props: {
  params: Promise<{ locale?: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await props.params
  const payload = await getPayload()

  const actualites = await payload.find({
    collection: 'actualites',
    depth: 2,
    limit: 13,
    overrideAccess: false,
    locale: locale === 'fr' ? 'fr' : 'en',
    sort: '-publishedAt',
  })

  const featured = actualites.docs[0]
  const rest = actualites.docs.slice(1)

  return (
    <div className="relative min-h-screen overflow-hidden bg-smatch-black pb-24 pt-32 text-smatch-text-primary selection:bg-smatch-gold selection:text-smatch-black">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-[1200px] -translate-x-1/2 rounded-[100%] bg-smatch-surface opacity-30 blur-[150px]" />

      <div className="container relative z-10 mb-24">
        <div className="mx-auto mb-20 flex max-w-4xl flex-col items-center space-y-6 text-center">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-smatch-gold">Insights & Intelligence</p>
          <h1 className="font-heading text-5xl leading-[0.9] tracking-tight text-white md:text-7xl lg:text-[7rem]">
            Actualités
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-lg text-smatch-text-secondary md:text-xl">
            Analyses générées par IA et insights exclusifs pour propulser votre supply chain et embrasser l'industrie 4.0 avec une précision chirurgicale.
          </p>
        </div>
        
        {/* Featured Article - Industrial Luxury Overlap Layout */}
        {featured && (
          <div className="group relative w-full overflow-hidden rounded-2xl border border-smatch-charcoal bg-[#0a0a0a] transition-all duration-700 hover:border-smatch-gold/30">
            <div className="flex min-h-[500px] flex-col lg:min-h-[600px] lg:flex-row">
              
              {/* Image Side */}
              <div className="relative h-[300px] w-full overflow-hidden lg:h-auto lg:w-3/5">
                <div className="absolute inset-0 z-10 bg-smatch-black/20 transition-colors duration-500 group-hover:bg-transparent" />
                {featured.heroImage && typeof featured.heroImage !== 'string' ? (
                  <Media 
                    resource={featured.heroImage} 
                    fill 
                    imgClassName="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out" 
                  />
                ) : (
                  <div className="size-full bg-smatch-surface" />
                )}
              </div>

              {/* Content Side */}
              <div className="relative z-20 flex w-full flex-col justify-center p-8 md:p-12 lg:w-2/5 lg:p-16">
                <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-smatch-text-secondary">
                  {featured.categories && featured.categories.length > 0 && typeof featured.categories[0] === 'object' && (
                    <span className="flex items-center gap-2 text-smatch-gold">
                       <span className="size-1.5 rounded-full bg-smatch-gold" />
                       {featured.categories[0].title}
                    </span>
                  )}
                  {featured.estimatedReadTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {featured.estimatedReadTime} min
                    </span>
                  )}
                </div>
                
                <h2 className="mb-6 font-heading text-3xl leading-tight text-white md:text-5xl">
                  {featured.title}
                </h2>
                
                <p className="mb-10 line-clamp-3 font-sans leading-relaxed text-smatch-text-secondary">
                  {featured.excerpt}
                </p>
                
                <Link 
                  href={`/actualites/${featured.slug}`}
                  className="mt-auto inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-smatch-gold transition-colors duration-300 hover:text-white"
                >
                  Lire l'article
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container mb-12 flex items-end justify-between border-b border-smatch-charcoal pb-4">
        <h3 className="font-heading text-2xl text-white">Dernières Publications</h3>
        <PageRange collection="actualites" currentPage={actualites.page} limit={13} totalDocs={actualites.totalDocs} />
      </div>

      {/* Grid of Standard Articles */}
      <div className="container mb-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((doc, idx) => {
          const cat = doc.categories?.[0]
          const catTitle = typeof cat === 'object' ? cat?.title : 'News'
          
          return (
            <Link 
              key={idx} 
              href={`/actualites/${doc.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-smatch-charcoal bg-[#0a0a0a] transition-all duration-500 hover:border-smatch-gold/40"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="absolute inset-0 z-10 bg-smatch-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                {doc.heroImage && typeof doc.heroImage !== 'string' ? (
                  <Media 
                    resource={doc.heroImage} 
                    fill 
                    imgClassName="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                ) : doc.meta?.image && typeof doc.meta.image !== 'string' ? (
                  <Media 
                    resource={doc.meta.image} 
                    fill 
                    imgClassName="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-smatch-surface text-smatch-charcoal">
                    <span className="font-mono text-xs">NO IMAGE</span>
                  </div>
                )}
                <div className="absolute left-4 top-4 z-20 rounded-full border border-smatch-charcoal bg-smatch-black/80 px-3 py-1 font-mono text-xs uppercase tracking-widest text-smatch-text-primary backdrop-blur-md">
                  {catTitle}
                </div>
              </div>
              
              <div className="flex grow flex-col p-6">
                <h3 className="mb-3 line-clamp-2 font-heading text-xl leading-snug text-white transition-colors duration-300 group-hover:text-smatch-gold">
                  {doc.title}
                </h3>
                <p className="mb-6 line-clamp-2 grow text-sm text-smatch-text-secondary">
                  {doc.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between font-mono text-xs uppercase text-smatch-text-secondary">
                   <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {doc.estimatedReadTime || 5} min</span>
                   <span className="text-smatch-gold transition-transform duration-300 group-hover:translate-x-1">
                     <ArrowUpRight className="size-4" />
                   </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="container">
        {actualites.totalPages > 1 && actualites.page && (
          <Pagination page={actualites.page} totalPages={actualites.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Actualités | Smatch',
    description: 'Insights et analyses générés par notre intelligence artificielle sur la Supply Chain et la transformation digitale.',
  }
}
