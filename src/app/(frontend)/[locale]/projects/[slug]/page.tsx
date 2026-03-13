import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from '@/getPayload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarBlank, MapPin, Tag } from '@phosphor-icons/react/dist/ssr'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RichText from '@/components/RichText'
import { getServerSideURL } from '@/utilities/getURL'
import { getBreadcrumbJsonLd, getProjectJsonLd } from '@/utilities/jsonLd'

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const projects = await payload.find({
      collection: 'projects',
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
      },
    })

    return projects.docs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
    locale: string
  }>
}

export default async function ProjectDetailPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug, locale } = await paramsPromise

  if (!slug) return notFound()

  const decodedSlug = decodeURIComponent(slug)
  const url = '/projects/' + decodedSlug

  const project = await queryProjectBySlug({ slug: decodedSlug, locale })

  if (!project) {
    return <PayloadRedirects url={url} />
  }

  const imageUrl =
    typeof project.image === 'object' && project.image?.url ? project.image.url : null
  const formattedDate = project.date
    ? new Date(project.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    : ''

  // Structured Data (JSON-LD)
  const serverUrl = getServerSideURL()
  const projectUrl = `${serverUrl}/${locale}${url}`

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${serverUrl}/${locale}` },
    { name: locale === 'fr' ? 'Projets' : 'Projects', url: `${serverUrl}/${locale}/projects` },
    { name: project.title, url: projectUrl },
  ])

  const projectJsonLd = getProjectJsonLd({
    name: project.title,
    description: project.description || '',
    url: projectUrl,
    datePublished: project.date ? new Date(project.date).toISOString() : undefined,
    image: imageUrl,
  })

  return (
    <article className="min-h-screen bg-smatch-black selection:bg-smatch-gold selection:text-black">
      {/* Search Engine Optimization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Enhanced Hero Section */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        {imageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-[2s] hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-smatch-black via-smatch-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-smatch-black/80 via-transparent to-smatch-black/40" />
          </div>
        )}

        <div className="container mx-auto relative z-10 pb-16 pt-32">
          {/* Top Navigation Row */}
          <div className="mb-12 flex items-start justify-between">
            {/* Back Link */}
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#FFAA00]"
            >
              <div className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:border-[#FFAA00]/50 group-hover:bg-[#FFAA00]/10">
                <ArrowLeft size={14} />
              </div>
              {locale === 'fr' ? 'Retour au Journal' : 'Back to Journal'}
            </Link>

            {/* Status Badge (Top Right) */}
            {project.status === 'upcoming' && (
              <div className="inline-flex items-center gap-3 rounded-full border border-[#FFAA00]/50 bg-[#FFAA00]/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FFAA00] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#FFAA00]" />
                </span>
                <span className="font-mono text-[clamp(0.6rem,0.5vw,0.75rem)] font-bold uppercase tracking-widest text-[#FFAA00]">
                  {project.type === 'event'
                    ? (locale === 'fr' ? 'ÉVÉNEMENT EN COURS' : 'LIVE EVENT')
                    : (locale === 'fr' ? 'PROJET EN COURS' : 'LIVE PROJECT')}
                </span>
              </div>
            )}
          </div>

          {/* Massive Title */}
          <h1 className="max-w-5xl font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tight text-white drop-shadow-xl md:text-6xl">
            {project.title}
          </h1>

          {/* Quick Summary Line */}
          {project.location && (
            <div className="mt-8 flex items-center gap-4 text-white/50">
              <div className="h-px w-12 bg-[#FFAA00]" />
              <span className="font-mono text-sm uppercase tracking-widest">{project.location}</span>
            </div>
          )}
        </div>
      </section>

      {/* Main Content: Split Grid Layout */}
      <section className="border-t border-white/5 bg-[#0A0A0A] py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">

            {/* LEFT COLUMN: Sticky Specifications (Col-Span-4) */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                <div>
                  <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[#FFAA00]">
                    {locale === 'fr' ? 'Spécifications' : 'Specifications'}
                  </h3>
                  <dl className="space-y-6 divide-y divide-white/10 border-t border-white/10 pt-6">
                    {formattedDate && (
                      <div className="flex justify-between py-2">
                        <dt className="font-heading text-sm uppercase text-gray-500">Date</dt>
                        <dd className="font-mono text-sm font-medium text-white">{formattedDate}</dd>
                      </div>
                    )}
                    {project.location && (
                      <div className="flex justify-between py-2">
                        <dt className="font-heading text-sm uppercase text-gray-500">{locale === 'fr' ? 'Lieu' : 'Location'}</dt>
                        <dd className="font-mono text-sm font-medium text-white">{project.location}</dd>
                      </div>
                    )}
                    {project.code && (
                      <div className="flex justify-between py-2">
                        <dt className="font-heading text-sm uppercase text-gray-500">{locale === 'fr' ? 'Code Projet' : 'Project Code'}</dt>
                        <dd className="font-mono text-sm font-medium text-white">{project.code}</dd>
                      </div>
                    )}

                    {/* Dynamic Metadata Fields */}
                    {project.metadata && project.metadata.map((meta, i) => (
                      <div key={i} className="flex justify-between py-2">
                        <dt className="font-heading text-sm uppercase text-gray-500">{meta.label}</dt>
                        <dd className="font-mono text-sm font-medium text-white text-right max-w-[60%]">{meta.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Abstract / Decoration */}
                <div className="relative aspect-square w-full overflow-hidden opacity-30 invert filter">
                  {/* Abstract background graphic or map could go here */}
                  <div className="absolute inset-0 border border-dashed border-white/20" />
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-[clamp(0.5rem,0.6vw,0.75rem)] text-white/20">
                    SMATCH DIGITAL ARCHIVE
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: The Story (Col-Span-8) */}
            <div className="lg:col-span-8">
              {/* Lead Paragraph */}
              {project.description && (
                <p className="mb-16 font-sans text-2xl font-light leading-relaxed text-white antialiased md:text-3xl">
                  {project.description}
                </p>
              )}

              {/* Rich Text Content */}
              {project.fullDescription && (
                <div className="prose prose-lg prose-invert max-w-none 
                  prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white 
                  prose-p:font-sans prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-[#FFAA00] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-bold
                  prose-blockquote:border-l-[#FFAA00] prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:pl-6 prose-blockquote:italic
                ">
                  <RichText data={project.fullDescription} />
                </div>
              )}

              {/* Gallery Section */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-24 space-y-8">
                  <div className="flex items-end justify-between border-b border-white/10 pb-4">
                    <h2 className="font-heading text-2xl uppercase tracking-wide text-white">{locale === 'fr' ? 'Galerie Visuelle' : 'Visual Gallery'}</h2>
                    <span className="font-mono text-xs text-gray-500">IMAGE_COUNT: {project.gallery.length}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {project.gallery.map((item, i) => {
                      const galleryImageUrl =
                        typeof item.image === 'object' && item.image?.url ? item.image.url : null
                      if (!galleryImageUrl) return null

                      // Alternate span logic for visual interest (basic styling for now)
                      const isWide = i % 3 === 0

                      return (
                        <div
                          key={i}
                          className={`group relative overflow-hidden rounded-md bg-white/5 ${isWide ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'}`}
                        >
                          <Image
                            src={galleryImageUrl}
                            alt={item.caption || `Image ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />

                          {item.caption && (
                            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/80 px-4 py-3 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                              <p className="font-mono text-xs text-white">{item.caption}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Next/Prev Navigation (Optional/Placeholder) */}
      <div className="border-t border-white/10 bg-[#050505] py-12">
        <div className="container mx-auto text-center">
          <Link href="/projects" className="inline-block font-mono text-xs uppercase tracking-widest text-gray-500 hover:text-white">{locale === 'fr' ? 'Retour à l\'Index' : 'Back to Index'}</Link>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, locale } = await paramsPromise
  if (!slug) return {}

  const decodedSlug = decodeURIComponent(slug)
  const project = await queryProjectBySlug({ slug: decodedSlug, locale })

  return generateMeta({ doc: project, locale })
}

const queryProjectBySlug = cache(async ({ slug, locale }: { slug: string; locale?: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload()

  try {
    const result = await payload.find({
      collection: 'projects',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      locale: locale as any,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] || null
  } catch {
    return null
  }
})
