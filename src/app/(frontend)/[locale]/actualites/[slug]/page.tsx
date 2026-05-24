import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getPayload } from '@/getPayload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, ArrowUpRight, HelpCircle, ChevronRight } from 'lucide-react'

import { generateMeta } from '@/utilities/generateMeta'
import { getBlogPostingJsonLd, getFAQPageJsonLd, getProjectJsonLd, getBreadcrumbJsonLd } from '@/utilities/jsonLd'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateStaticParams() {
  const payload = await getPayload()
  let params: { slug: string }[] = []

  try {
    const actualites = await payload.find({
      collection: 'actualites',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })
    params = actualites.docs
      .filter((doc) => doc.slug && typeof doc.slug === 'string')
      .map(({ slug }) => ({ slug: slug as string }))
  } catch (error) {
    console.warn('Failed to generate static params for actualites:', error)
  }

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: string
  }>
}

export default async function Actualite({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', locale } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/actualites/' + decodedSlug
  
  const post = await queryActualiteBySlug({ slug: decodedSlug, locale })

  if (!post) return <PayloadRedirects url={url} />

  // Fetch Sidebars Data
  const latestPosts = await queryLatestActualites({ excludeId: String(post.id), locale })
  const allCategories = await queryCategories({ locale })

  // Schema
  const hasFaqs = post.faqEntries && Array.isArray(post.faqEntries) && post.faqEntries.length > 0
  const faqSchema = hasFaqs ? getFAQPageJsonLd(post.faqEntries as { question: string; answer: string; }[]) : null

  const blogSchema = getBlogPostingJsonLd({
    headline: post.title,
    description: post.excerpt || '',
    url: `${getServerSideURL()}/${locale || 'fr'}/actualites/${post.slug}`,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || undefined,
    image: post.heroImage && typeof post.heroImage === 'object' ? post.heroImage.url : null,
    authorName: post.source === 'ai-generated' ? 'Smatch.AI' : 'Smatch Editorial'
  })

  // Metadata
  const cat = post.categories?.[0]
  const catTitle = typeof cat === 'object' ? cat?.title : 'Actualité'
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  }) : 'Récemment'

  const serverUrl = getServerSideURL()
  const articleUrl = `${serverUrl}/${locale || 'fr'}${url}`

  // Extract absolute image URL for JSON-LD
  let imageUrl: string | undefined
  if (post.heroImage && typeof post.heroImage === 'object' && post.heroImage.url) {
    imageUrl = post.heroImage.url.startsWith('http')
      ? post.heroImage.url
      : `${serverUrl}${post.heroImage.url}`
  } else if (post.meta?.image && typeof post.meta.image === 'object' && post.meta.image.url) {
    imageUrl = post.meta.image.url.startsWith('http')
      ? post.meta.image.url
      : `${serverUrl}${post.meta.image.url}`
  }

  // Article structured data for SEO indexing

  const articleJsonLd = getProjectJsonLd({
    name: post.title,
    description: post.excerpt || post.meta?.description || '',
    url: articleUrl,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    image: imageUrl,
  })

  // SEO: Generate BreadcrumbList structured data to help search engines understand the site's hierarchy and improve SERP display
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${serverUrl}/${locale || 'fr'}` },
    { name: locale === 'fr' ? 'Actualités' : 'News', url: `${serverUrl}/${locale || 'fr'}/actualites` },
    { name: post.title, url: articleUrl },
  ])


  return (
    <div className="bg-smatch-black min-h-screen text-smatch-text-primary selection:bg-smatch-gold selection:text-smatch-black pb-32 pt-32">
      {/* SEO: Replaced outer <main> with <div> to prevent invalid nested <main> tags, keeping the inner <main> for the primary article content. */}
      {/* Search Engine Optimization Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <PayloadRedirects disableNotFound url={url} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      {/* 3-Column Dashboard Layout */}
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Navigation & Categories */}
        <aside className="hidden lg:block lg:col-span-2">
          <div className="sticky top-32 space-y-12">
            <Link 
              href="/actualites"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-smatch-charcoal bg-[#0a0a0a] text-smatch-text-secondary hover:text-white hover:border-smatch-gold transition-colors duration-300 font-mono text-xs uppercase tracking-widest"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour
            </Link>

            <div>
              <h3 className="font-heading text-lg text-white mb-6 border-b border-smatch-charcoal pb-4">Rechercher par Catégorie</h3>
              <ul className="space-y-3">
                {allCategories.map((c, i) => (
                  <li key={i}>
                    <Link href={`/actualites`} className="flex items-center justify-between group">
                      <span className="font-sans text-sm text-smatch-text-secondary group-hover:text-smatch-gold transition-colors">{c.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-smatch-charcoal group-hover:text-smatch-gold group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Main Article (Left aligned flow) */}
        <main className="col-span-1 lg:col-span-7">
          <article className="w-full">
            
            {/* Hero Image */}
            {post.heroImage && typeof post.heroImage !== 'string' && (
              <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-smatch-charcoal bg-[#0a0a0a] relative mb-10">
                <Media resource={post.heroImage} fill imgClassName="object-cover w-full h-full" />
              </div>
            )}

            {/* Header Content */}
            <header className="mb-10 border-b border-smatch-charcoal pb-10">
              <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-smatch-text-secondary mb-6">
                <span className="text-smatch-gold flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-smatch-gold" />
                   {catTitle}
                </span>
                <span className="w-1 h-3 border-l border-smatch-charcoal" />
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {publishedDate}</span>
                <span className="w-1 h-3 border-l border-smatch-charcoal" />
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.estimatedReadTime || 5} min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white leading-[1.1] mb-8 text-left">
                {post.title}
              </h1>

              {/* Source/Origin Callout inline */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-smatch-gold bg-smatch-gold/10 flex items-center justify-center text-smatch-gold">
                  {post.source === 'ai-generated' ? 'IA' : 'ED'}
                </div>
                <div>
                  <p className="text-white font-sans text-sm">
                    {post.source === 'ai-generated' ? 'Smatch.AI Intelligence' : 'Éditorial Smatch'}
                  </p>
                  <p className="text-smatch-text-secondary text-xs font-mono uppercase tracking-widest">
                    {post.source === 'ai-generated' ? 'Généré Automatiquement' : 'Rédigé'}
                  </p>
                </div>
              </div>
            </header>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl font-sans text-white/90 leading-relaxed mb-10 font-light text-left pl-6 border-l-2 border-smatch-gold bg-gradient-to-r from-smatch-surface/50 to-transparent py-4 rounded-r-lg">
                {post.excerpt}
              </p>
            )}

            {/* Formatted Lexical Output Wrapper (Left aligned) */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-left
                            prose-headings:font-heading prose-headings:text-white prose-headings:font-normal prose-h2:text-3xl prose-h3:text-2xl prose-headings:mt-12
                            prose-p:font-sans prose-p:text-smatch-text-secondary prose-p:leading-relaxed prose-p:font-light
                            prose-a:text-smatch-gold prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-white prose-strong:font-normal
                            prose-li:text-smatch-text-secondary prose-ul:list-disc prose-ul:pl-6
                            prose-blockquote:border-l-smatch-charcoal prose-blockquote:bg-transparent prose-blockquote:py-2 prose-blockquote:px-0 prose-blockquote:font-sans prose-blockquote:italic prose-blockquote:text-white/80
                            [&>img]:rounded-xl [&>img]:border [&>img]:border-smatch-charcoal [&>img]:w-full">
              <RichText data={post.body} enableGutter={false} />
            </div>

            <div className="w-full h-px bg-smatch-charcoal mt-20 mb-12" />

            {/* FAQ Section */}
            {post.faqEntries && post.faqEntries.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-heading text-white mb-6 flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-smatch-gold" />
                  Questions Fréquentes
                </h2>
                <div className="space-y-3">
                  {post.faqEntries.map((faq: any, i: number) => (
                    <details key={i} className="group bg-[#0a0a0a] border border-smatch-charcoal rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all duration-300 hover:border-smatch-gold/30">
                      <summary className="cursor-pointer p-5 text-lg font-heading text-white flex justify-between items-center transition-colors">
                        <span className="pr-4">{faq.question}</span>
                        <ChevronRight className="shrink-0 w-5 h-5 text-smatch-text-secondary group-open:rotate-90 group-open:text-smatch-gold transition-transform duration-300" />
                      </summary>
                      <div className="px-5 pb-5 text-smatch-text-secondary font-sans leading-relaxed text-left text-sm">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Tags */}
            <div className="flex flex-wrap items-center justify-start gap-2 mt-12 pt-8 border-t border-smatch-charcoal">
               <span className="text-xs font-mono uppercase tracking-widest text-smatch-text-secondary mr-2">Mots-clés :</span>
               {post.tags?.map((item: any, i: number) => (
                  <span key={i} className="px-3 py-1 bg-smatch-surface border border-smatch-charcoal text-smatch-text-secondary text-xs font-mono uppercase tracking-widest rounded-full hover:border-smatch-gold hover:text-white transition-colors cursor-default">
                    #{item.tag}
                  </span>
               ))}
            </div>
            
          </article>
        </main>

        {/* RIGHT COLUMN: Related / Latest News */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-32">
            <h3 className="font-heading text-lg text-white mb-6 border-b border-smatch-charcoal pb-4">Dernières Actualités</h3>
            <div className="flex flex-col gap-6">
              {latestPosts.map((doc, idx) => {
                const docCat = doc.categories?.[0]
                const docCatTitle = typeof docCat === 'object' ? docCat?.title : 'Actualité'
                return (
                  <Link 
                    key={idx} 
                    href={`/actualites/${doc.slug}`}
                    className="group flex flex-col gap-3"
                  >
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-smatch-charcoal bg-[#0a0a0a] relative">
                      {doc.heroImage && typeof doc.heroImage !== 'string' ? (
                        <Media resource={doc.heroImage} fill imgClassName="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                      ) : (
                        <div className="w-full h-full bg-smatch-black/50" />
                      )}
                      <div className="absolute top-2 left-2 z-10 bg-smatch-black/80 backdrop-blur-md border border-smatch-charcoal px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest text-smatch-text-primary">
                        {doc.estimatedReadTime || 5} min
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-smatch-gold uppercase tracking-widest mb-1.5">{docCatTitle}</p>
                      <h4 className="text-white font-heading text-base leading-snug group-hover:text-smatch-gold transition-colors line-clamp-2">
                        {doc.title}
                      </h4>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryActualiteBySlug({ slug: decodedSlug, locale })

  return generateMeta({ doc: post, locale })
}

// Queries
const queryActualiteBySlug = cache(async ({ slug, locale }: { slug: string; locale?: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'actualites',
    draft,
    limit: 1,
    depth: 2,
    locale: locale === 'fr' ? 'fr' : 'en',
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryLatestActualites = cache(async ({ excludeId, locale }: { excludeId: string, locale?: string }) => {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'actualites',
    depth: 1,
    limit: 3,
    locale: locale === 'fr' ? 'fr' : 'en',
    sort: '-publishedAt',
    where: {
      id: {
        not_equals: excludeId,
      },
    },
  })
  return result.docs || []
})

const queryCategories = cache(async ({ locale }: { locale?: string }) => {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 10,
    locale: locale === 'fr' ? 'fr' : 'en',
    sort: 'title',
  })
  return result.docs || []
})

