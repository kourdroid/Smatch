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
    <div className="relative min-h-screen bg-smatch-black text-smatch-text-primary selection:bg-smatch-gold selection:text-smatch-black overflow-hidden pt-32 pb-24">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-smatch-surface opacity-30 blur-[150px] rounded-[100%] pointer-events-none -z-10" />

      <div className="container relative z-10 mb-24">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto mb-20">
          <p className="text-smatch-gold font-mono uppercase tracking-[0.2em] text-sm">Insights & Intelligence</p>
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-heading tracking-tight leading-[0.9] text-white">
            Actualités
          </h1>
          <p className="text-smatch-text-secondary text-lg md:text-xl max-w-2xl font-sans mt-6">
            Analyses générées par IA et insights exclusifs pour propulser votre supply chain et embrasser l'industrie 4.0 avec une précision chirurgicale.
          </p>
        </div>
        
        {/* Featured Article - Industrial Luxury Overlap Layout */}
        {featured && (
          <div className="group relative w-full rounded-2xl overflow-hidden border border-smatch-charcoal bg-[#0a0a0a] transition-all duration-700 hover:border-smatch-gold/30">
            <div className="flex flex-col lg:flex-row min-h-[500px] lg:min-h-[600px]">
              
              {/* Image Side */}
              <div className="relative w-full lg:w-[60%] h-[300px] lg:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-smatch-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                {featured.heroImage && typeof featured.heroImage !== 'string' ? (
                  <Media 
                    resource={featured.heroImage} 
                    fill 
                    imgClassName="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out" 
                  />
                ) : (
                  <div className="w-full h-full bg-smatch-surface" />
                )}
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 md:p-12 lg:p-16 relative z-20">
                <div className="flex items-center gap-4 mb-6 text-xs font-mono uppercase tracking-widest text-smatch-text-secondary">
                  {featured.categories && featured.categories.length > 0 && typeof featured.categories[0] === 'object' && (
                    <span className="text-smatch-gold flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-smatch-gold" />
                       {featured.categories[0].title}
                    </span>
                  )}
                  {featured.estimatedReadTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.estimatedReadTime} min
                    </span>
                  )}
                </div>
                
                <h2 className="text-3xl md:text-5xl font-heading text-white leading-tight mb-6">
                  {featured.title}
                </h2>
                
                <p className="text-smatch-text-secondary font-sans leading-relaxed mb-10 line-clamp-3">
                  {featured.excerpt}
                </p>
                
                <Link 
                  href={`/actualites/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-smatch-gold hover:text-white font-mono uppercase tracking-widest text-sm transition-colors duration-300 mt-auto"
                >
                  Lire l'article
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container flex justify-between items-end border-b border-smatch-charcoal pb-4 mb-12">
        <h3 className="text-2xl font-heading text-white">Dernières Publications</h3>
        <PageRange collection="actualites" currentPage={actualites.page} limit={13} totalDocs={actualites.totalDocs} />
      </div>

      {/* Grid of Standard Articles */}
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {rest.map((doc, idx) => {
          const cat = doc.categories?.[0]
          const catTitle = typeof cat === 'object' ? cat?.title : 'News'
          
          return (
            <Link 
              key={idx} 
              href={`/actualites/${doc.slug}`}
              className="group flex flex-col h-full bg-[#0a0a0a] border border-smatch-charcoal rounded-xl overflow-hidden hover:border-smatch-gold/40 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="absolute inset-0 bg-smatch-black/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
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
                  <div className="w-full h-full bg-smatch-surface flex items-center justify-center text-smatch-charcoal">
                    <span className="font-mono text-xs">NO IMAGE</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 z-20 bg-smatch-black/80 backdrop-blur-md border border-smatch-charcoal px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-smatch-text-primary">
                  {catTitle}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-heading text-white leading-snug mb-3 group-hover:text-smatch-gold transition-colors duration-300 line-clamp-2">
                  {doc.title}
                </h3>
                <p className="text-smatch-text-secondary text-sm line-clamp-2 mb-6 flex-grow">
                  {doc.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-smatch-text-secondary uppercase mt-auto">
                   <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {doc.estimatedReadTime || 5} min</span>
                   <span className="text-smatch-gold group-hover:translate-x-1 transition-transform duration-300">
                     <ArrowUpRight className="w-4 h-4" />
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
  const defaultDesc = 'Insights et analyses générés par notre intelligence artificielle sur la Supply Chain et la transformation digitale.';
  
  return {
    title: 'Actualités | Smatch',
    description: defaultDesc,
    openGraph: {
      title: 'Actualités | Smatch',
      description: defaultDesc,
      url: '/fr/actualites', 
    },
    alternates: {
      canonical: '/fr/actualites',
      languages: {
        en: '/en/actualites',
        fr: '/fr/actualites',
        'x-default': '/fr/actualites',
      },
    },
  }
}
