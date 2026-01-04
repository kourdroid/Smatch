import React from 'react'
import {
  ChatCircleText,
  Check,
  Database,
  Globe,
  HardDrives,
  Cloud,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export function Ecosystem() {
  return (
    <section className="relative overflow-hidden bg-smatch-black py-16 text-white md:py-32">
      {/* 1. BACKGROUND CONNECTING LINES (The "Nervous System") */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden opacity-20 md:block">
        <svg className="size-full" viewBox="0 0 1515 1200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB800" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFB800" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 750 600 L 400 300" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
          <path d="M 765 600 L 1100 300" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
          <path d="M 750 650 L 400 900" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
          <path d="M 765 650 L 1100 900" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-full px-4 md:max-w-[1515px]">
        {/* Header */}
        <div className="mb-12 text-center md:mb-[146px]">
          <h2 className="mb-0 font-heading text-[28px] font-bold tracking-tight text-white md:text-[32px]">
            Notre Écosystème
          </h2>
          <p className="mx-auto mt-6 max-w-[999px] font-sans text-base font-medium leading-relaxed text-[#ffffff82] md:mt-[41px] md:text-[24px] md:leading-[36px]">
            Un écosystème complet de solutions et de technologies pour accompagner nos clients dans
            toutes les étapes de leur digitalisation
          </p>
        </div>

        {/* BENTO LAYOUT */}
        <div className="flex flex-col items-center gap-6 md:gap-[20px]">
          {/* ROW 1: Connectivity, Middle (Support+Core), API */}
          <div className="flex w-full flex-col justify-center gap-6 md:flex-row md:gap-[20px]">

            {/* 1. Connectivité Universelle */}
            <div className="group relative w-full overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] transition-colors duration-500 hover:border-smatch-gold/20 md:h-[545px] md:w-[400px]">
              <div className="flex h-full flex-col items-center px-6 py-12 md:px-[55px] md:pb-[61px] md:pt-[109px]">
                <div className="relative size-[180px] shrink-0 md:size-[222px]">
                  <div className="absolute inset-0 rounded-full border border-white/5 shadow-[0px_0px_20px_rgba(0,0,0,0.5)]" />
                  <div className="absolute inset-[30px] rounded-full border border-white/10 md:inset-[40px]" />
                  <div className="absolute inset-[60px] z-10 flex items-center justify-center rounded-full border border-white/10 bg-[#0A0A0A] shadow-[0_0_15px_rgba(255,255,255,0.05)] md:inset-[72px]">
                    <span className="font-sans text-[24px] font-semibold text-white md:text-[32px]">@</span>
                  </div>
                  {/* Orbiting Icons */}
                  <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                    <div className="absolute right-[30px] top-0 animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-1.5 shadow-lg md:right-[40px] md:p-2">
                      <Database size={12} weight="fill" className="text-smatch-gold md:size-[14px]" />
                    </div>
                    <div className="absolute right-[-5px] top-[70px] animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-1.5 shadow-lg md:right-[-10px] md:top-[90px] md:p-2">
                      <Globe size={12} weight="fill" className="text-blue-500 md:size-[14px]" />
                    </div>
                    <div className="absolute bottom-0 right-[30px] animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-1.5 shadow-lg md:right-[40px] md:p-2">
                      <Cloud size={12} weight="fill" className="text-gray-400 md:size-[14px]" />
                    </div>
                    <div className="absolute left-[-5px] top-[70px] animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-1.5 shadow-lg md:left-[-10px] md:top-[90px] md:p-2">
                      <HardDrives size={12} weight="fill" className="text-gray-400 md:size-[14px]" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center md:mt-[58px] md:w-[276px]">
                  <h3 className="mb-3 font-sans text-lg font-bold leading-[1.2] text-white md:mb-[28px] md:text-[24px]">
                    Connectivité Universelle
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-[#ffffff7a] md:text-[16px] md:leading-[24px]">
                    Intégration native avec +100 ERPs. SAP, Oracle, Sage et solutions propriétaires.
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div className="flex w-full flex-col gap-6 md:w-[675px] md:gap-[20px]">
              {/* 2. Support Ingénieur */}
              <div className="group relative w-full overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] p-6 transition-colors duration-500 hover:border-smatch-gold/20 md:h-[271px] md:p-[43px_38px_47px_42px]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-sans text-lg font-bold leading-[1.2] text-white md:text-[24px]">
                      Support Ingénieur
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-[1.2] text-[#ffffff7a] md:mt-[18px] md:text-[16px]">
                      Assistance technique dediée 24/7.
                    </p>
                  </div>
                  <div className="flex size-[32px] items-center justify-center rounded-full bg-white/5 md:size-[42px]">
                    <ChatCircleText size={20} className="text-white md:size-[24px]" />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 md:mt-[34px] md:gap-4">
                  <div className="flex items-center">
                    <div className="size-[28px] shrink-0 rounded-full bg-white/10 md:size-[34px]" />
                    <div className="ml-[12px] rounded-r-[20px] rounded-bl-[4px] rounded-tl-[20px] border border-white/5 bg-[#ffffff0a] px-[16px] py-[10px] md:ml-[17px] md:px-[20px] md:py-[12px]">
                      <p className="text-xs leading-snug text-[#ffffff80] md:text-[14px]">
                        Alerte: Mise à jour serveur requise.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="mr-[12px] rounded-l-[20px] rounded-br-[4px] rounded-tr-[20px] bg-smatch-gold px-[16px] py-[10px] shadow-lg md:mr-[17px] md:px-[20px] md:py-[12px]">
                      <p className="text-xs font-bold leading-snug text-black md:text-[14px]">
                        Reçu. Patch v2.4.1 en cours...
                      </p>
                    </div>
                    <div className="size-[28px] shrink-0 rounded-full bg-smatch-gold md:size-[34px]" />
                  </div>
                </div>
              </div>

              {/* 4. Core Intelligence */}
              <div className="group relative w-full overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] py-10 transition-colors duration-500 hover:border-smatch-gold/50 md:h-[254px] md:py-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.15),transparent_70%)] opacity-80" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 bg-smatch-gold opacity-10 blur-[120px]" />

                <Image
                  className="relative z-[1] mx-auto h-auto w-4/5 md:h-full md:w-1/2"
                  src={'/assets/domains/core-inteligence.svg'}
                  alt="Core Intelligence"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>

            {/* 3. API First */}
            <div className="group relative flex w-full flex-col overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] transition-colors duration-500 hover:border-smatch-gold/20 md:h-[545px] md:w-[400px]">
              <div className="p-6 md:p-[24px]">
                <div className="mb-6 flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-[#FF5F57] md:size-3" />
                  <div className="size-2.5 rounded-full bg-[#FEBC2E] md:size-3" />
                  <div className="size-2.5 rounded-full bg-[#28C840] md:size-3" />
                  <span className="ml-auto font-mono text-[10px] text-white/30 md:text-[12px]">api.config.ts</span>
                </div>
                <div className="mb-6 h-px w-full bg-white/5" />
                <div className="font-mono text-xs leading-relaxed md:text-[14px]">
                  {/* Code snippet preserved but scaled down via text-xs */}
                  <div><span className="text-[#C792EA]">import</span>{' '}<span className="text-white">{'{ WMS }'}</span>{' '}<span className="text-[#C792EA]">from</span>{' '}<span className="text-[#98C379]">&apos;@smatch/core&apos;</span>;</div>
                  <div className="mt-4"><span className="text-[#C792EA]">const</span>{' '}<span className="text-[#61AFEF]">client</span>{' '}<span className="text-white">=</span>{' '}<span className="text-[#E5C07B]">new</span>{' '}<span className="text-[#E5C07B]">WMS</span><span className="text-white">({'{'}</span></div>
                  <div className="pl-4 text-white/80">apiKey: <span className="text-[#98C379]">&apos;...&apos;</span>,</div>
                  <div className="text-white">{'}'});</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent p-6 pt-16 md:p-[30px] md:pt-20">
                <h3 className="mb-2 font-sans text-lg font-bold text-white md:text-[24px]">API First</h3>
                <p className="text-sm font-medium leading-snug text-[#ffffff7a] md:text-[16px]">
                  Documentation complete et SDKs modernes.
                </p>
              </div>
            </div>
          </div>

          {/* ROW 2: Optimization, Control */}
          <div className="flex w-full flex-col justify-center gap-6 md:flex-row md:gap-[20px]">

            {/* 5. Optimization par l'IA - FIX OVERLAP */}
            <div className="group relative w-full overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] p-6 pb-[100px] transition-colors duration-500 hover:border-smatch-gold/20 md:h-[232px] md:w-[749px] md:p-[32px]">
              <div className="relative z-20 md:ml-[10px] md:mt-[20px]">
                <h3 className="mb-2 font-sans text-lg font-bold text-white md:mb-[15px] md:text-[24px]">
                  Optimisation par l&apos;IA
                </h3>
                {/* Max width restricted on mobile to prevent overlap */}
                <p className="w-full text-sm font-medium leading-[20px] text-[#ffffff7a] md:max-w-[340px] md:text-[16px] md:leading-[24px]">
                  Anticipez vos besoins et optimisez vos flux grâce à l&apos;analyse prédictive.
                </p>
              </div>

              {/* Chart - Pushed down/right on mobile */}
              <div className="pointer-events-none absolute bottom-[-10px] right-[-10px] h-[100px] w-3/4 md:bottom-0 md:right-0 md:h-[160px] md:w-3/5">
                <svg className="size-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFB800" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 100 L0 90 C 50 90, 100 80, 150 60 C 200 40, 250 20, 300 15 L 300 100 Z" fill="url(#chartGradient)" />
                  <path d="M0 90 C 50 90, 100 80, 150 60 C 200 40, 250 20, 300 15" fill="none" stroke="#FFB800" strokeWidth="2" />
                  <circle cx="250" cy="20" r="4" fill="#FFB800" className="animate-pulse" />
                </svg>

                {/* Floating Tooltip - Scaled down */}
                <div className="absolute right-1/4 top-0 rounded-lg border border-smatch-gold/30 bg-[#1A1A1A] px-2 py-1 text-center shadow-xl md:top-[10px] md:px-3 md:py-2">
                  <span className="block text-sm font-bold leading-none text-smatch-gold md:text-[18px]">+35%</span>
                  <span className="mt-0.5 block text-[8px] uppercase tracking-wider text-white/60 md:mt-1 md:text-[10px]">Efficacité</span>
                </div>
              </div>
            </div>

            {/* 6. Controle Total */}
            <div className="group relative w-full overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] transition-colors duration-500 hover:border-smatch-gold/20 md:h-[232px] md:w-[747px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)]" />
              <div className="absolute inset-0 flex items-end justify-between p-6 md:p-[40px]">
                <div className="z-10 mb-2 flex flex-col items-start">
                  <h3 className="mb-1 font-sans text-lg font-bold text-white md:mb-[12px] md:text-[24px]">
                    Contrôle Total
                  </h3>
                  <p className="max-w-[220px] text-sm font-medium leading-[20px] text-[#ffffff7a] md:max-w-[320px] md:text-[16px] md:leading-[24px]">
                    Paramétrez vos flux logistiques via une interface intuitive sans code.
                  </p>
                </div>
                <div className="mb-2 mr-2 md:mb-[10px] md:mr-[10px]">
                  <div className="flex size-8 items-center justify-center rounded-full bg-smatch-gold shadow-[0_0_20px_rgba(255,184,0,0.4)] md:size-[32px]">
                    <Check size={16} className="text-black md:size-[18px]" weight="bold" />
                  </div>
                </div>
              </div>

              {/* UI Floating Elements */}
              <div className="absolute right-[10px] top-[20px] flex flex-col gap-2 md:right-[30px] md:top-[30px] md:gap-3">
                <div className="flex w-[180px] -rotate-2 items-center justify-between rounded-xl border border-smatch-gold bg-[#111] p-2 shadow-lg md:w-[280px] md:p-3">
                  <div>
                    <span className="mb-0.5 block font-mono text-[8px] uppercase tracking-wider text-smatch-gold md:text-[10px]">Active Env</span>
                    <span className="text-[10px] font-bold text-white md:text-[13px]">v4.0 Cloud</span>
                  </div>
                  <div className="rounded-full bg-smatch-gold p-0.5 md:p-1">
                    <Check size={10} className="text-black md:size-[12px]" weight="bold" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
