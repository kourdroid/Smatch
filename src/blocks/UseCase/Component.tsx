import React from 'react'
import type { UseCaseBlock as UseCaseBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const UseCaseBlock: React.FC<UseCaseBlockProps> = ({ sectionHeader, cases }) => {
  return (
    <section className="relative border-t border-white/5 bg-[#0A0A0A] py-24 lg:py-32">
      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center md:mb-28">
          <h2 className="mb-8 font-heading text-3xl font-black uppercase tracking-tighter text-white md:text-4xl lg:text-5xl">
            {sectionHeader?.title}
          </h2>
          {sectionHeader?.description && (
            <p className="font-sans text-lg font-light leading-relaxed text-gray-400 md:text-xl">
              {sectionHeader.description}
            </p>
          )}
        </div>

        {/* Use Cases List */}
        <div className="flex flex-col gap-20 lg:gap-32">
          {cases?.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-24 ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="group relative aspect-[16/9] overflow-hidden rounded-md border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 hover:border-[#FFAA00]/30 hover:shadow-[#FFAA00]/10">
                  {item.image && typeof item.image !== 'string' && (
                    <Media
                      resource={item.image}
                      fill
                      className="transform-gpu object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {/* Glassmorphism Overlay Card */}
                  <div className="absolute inset-x-6 bottom-6 z-10 overflow-hidden rounded-md border border-white/10 bg-black/60 p-6 backdrop-blur-md transition-all duration-500 group-hover:bg-black/80 lg:inset-x-8 lg:bottom-8">
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FFAA00] text-lg font-black text-black">
                        {i + 1}
                      </div>
                      <div className="font-heading text-lg font-bold uppercase tracking-wide text-white">
                        {item.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-[#FFAA00]" />
                    <span className="font-mono text-sm font-bold uppercase tracking-widest text-[#FFAA00]">
                      Scenario {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-3xl font-black uppercase leading-tight tracking-tighter text-white md:text-4xl lg:text-5xl">
                    {item.title}
                  </h3>
                  
                  <div className="relative border-l-2 border-white/10 pl-6">
                    <p className="font-sans text-lg font-light leading-relaxed text-gray-200 lg:text-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
