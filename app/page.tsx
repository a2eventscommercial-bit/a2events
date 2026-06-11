'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import PhotoPlaceholder from '@/components/PhotoPlaceholder'
import { useTranslations } from '@/lib/useTranslations'

const workProjects = [
  { id: 'projet-1', name: 'Conférence Nationale Tech', type: 'Conférence' },
  { id: 'projet-2', name: 'Stand Expo Construire', type: 'Stand' },
  { id: 'projet-3', name: 'Gala Horizon', type: 'Gala' },
  { id: 'projet-4', name: 'Séminaire Leadership', type: 'Corporate' },
  { id: 'projet-5', name: 'Rebranding TechStart', type: 'Branding' },
  { id: 'projet-6', name: 'Forum Investissement', type: 'Conférence' },
]

export default function HomePage() {
  const { t, rtl } = useTranslations()

  return (
    <div className={`bg-[#0A0A0A] ${rtl ? 'font-arabic' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      {/* ============ HERO — une seule grande phrase centrée ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Visuel de fond — placeholder en attendant le render/photo */}
        <div className="absolute inset-0">
          <PhotoPlaceholder label="Visuel hero à venir" />
        </div>
        <div className="absolute inset-0 bg-[#0A0A0A]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,0,0,0.10)_0%,transparent_65%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
          >
            {t.hero.slogan}
          </motion.h1>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-gray-500 text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-10 bg-gradient-to-b from-[#CC0000] to-transparent"
          />
        </motion.div>
      </section>

      {/* ============ INTRO — phrase d'équipe ============ */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <SectionReveal>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-300 leading-relaxed text-center">
              {t.home.intro}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ============ WORK — 6 grands projets empilés ============ */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className={`flex items-baseline justify-between mb-16 ${rtl ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-[#CC0000]">
                {t.home.workTitle}
              </h2>
              <Link
                href="/realisations"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t.realisations.viewProject} →
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
            {workProjects.map((project, i) => (
              <SectionReveal key={project.id} delay={(i % 2) * 0.15}>
                <Link href="/realisations" className="block group">
                  <div className={`relative overflow-hidden ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
                      <PhotoPlaceholder label={`Photo — ${project.name}`} />
                    </div>
                    <div className="absolute inset-0 bg-[#CC0000] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  </div>
                  <div className={`mt-5 flex items-baseline justify-between ${rtl ? 'flex-row-reverse' : ''}`}>
                    <h3 className="text-white text-xl font-bold group-hover:text-[#CC0000] transition-colors duration-300">
                      {project.name}
                    </h3>
                    <span className="text-gray-500 text-xs uppercase tracking-[0.25em]">
                      {project.type}
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES — 4 catégories avec listes ============ */}
      <section className="py-32 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-[#CC0000] mb-20">
              {t.home.servicesTitle}
            </h2>
          </SectionReveal>

          <div className="space-y-0">
            {t.home.groups.map((group, i) => (
              <SectionReveal key={i}>
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 py-14 border-t border-neutral-900 ${rtl ? 'text-right' : ''}`}>
                  <div className="lg:col-span-1">
                    <span className="text-neutral-700 text-sm font-mono">0{i + 1}</span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="text-white text-2xl sm:text-3xl font-bold">{group.title}</h3>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="text-gray-400 leading-relaxed">{group.desc}</p>
                  </div>
                  <div className="lg:col-span-3">
                    <ul className="space-y-2">
                      {group.items.map((item, j) => (
                        <li key={j} className="text-gray-500 text-sm flex items-center gap-3">
                          <span className="w-1 h-1 bg-[#CC0000] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="pt-14 border-t border-neutral-900">
              <Link
                href="/services"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t.hero.cta} →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-40 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <SectionReveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-12">
              {t.cta.title}
            </h2>
            <Link
              href="/contact"
              className="inline-block border border-white text-white px-12 py-5 text-sm uppercase tracking-[0.3em] hover:bg-[#CC0000] hover:border-[#CC0000] transition-all duration-300"
            >
              {t.cta.button}
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}
