'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import { useTranslations } from '@/lib/useTranslations'

const workProjects = [
  { id: 'projet-1', name: 'Conférence Nationale Tech', type: 'Conférence', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80' },
  { id: 'projet-2', name: 'Stand Expo Construire', type: 'Stand', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80' },
  { id: 'projet-3', name: 'Gala Horizon', type: 'Gala', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80' },
  { id: 'projet-4', name: 'Séminaire Leadership', type: 'Corporate', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80' },
  { id: 'projet-5', name: 'Rebranding TechStart', type: 'Branding', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80' },
  { id: 'projet-6', name: 'Forum Investissement', type: 'Conférence', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80' },
]

const serviceIcons = ['🎤', '🎪', '🎨', '📱']

export default function HomePage() {
  const { t, rtl } = useTranslations()

  return (
    <div className={rtl ? 'font-arabic' : ''} dir={rtl ? 'rtl' : 'ltr'}>
      {/* ============ HERO — phrase centrée sur photo ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
            alt="Événement A² Events"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[#0A0A0A]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
          >
            {t.hero.slogan}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="inline-block bg-[#CC0000] text-white px-10 py-4 text-sm uppercase tracking-[0.25em] font-semibold hover:bg-[#aa0000] transition-all duration-300"
            >
              {t.hero.cta2}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-gray-400 text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-10 bg-gradient-to-b from-[#CC0000] to-transparent"
          />
        </motion.div>
      </section>

      {/* ============ INTRO — fond clair ============ */}
      <section className="bg-white py-28">
        <div className="max-w-4xl mx-auto px-6">
          <SectionReveal>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#0A0A0A] leading-relaxed text-center">
              {t.home.intro}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ============ WORK — fond gris clair, photos paysage uniformes ============ */}
      <section className="bg-[#F2F2F2] py-28">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className={`flex items-baseline justify-between mb-14 ${rtl ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A]">
                {t.realisations.title}
              </h2>
              <Link
                href="/realisations"
                className="text-gray-500 hover:text-[#CC0000] text-sm font-medium transition-colors"
              >
                {t.realisations.viewProject} →
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {workProjects.map((project, i) => (
              <SectionReveal key={project.id} delay={(i % 3) * 0.1}>
                <Link href="/realisations" className="block group">
                  <div className="relative overflow-hidden aspect-video bg-white shadow-md">
                    <Image
                      src={project.img}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[#CC0000] opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
                  </div>
                  <div className={`mt-4 flex items-baseline justify-between ${rtl ? 'flex-row-reverse' : ''}`}>
                    <h3 className="text-[#0A0A0A] text-base font-bold group-hover:text-[#CC0000] transition-colors duration-300">
                      {project.name}
                    </h3>
                    <span className="text-gray-400 text-[11px] uppercase tracking-[0.2em]">
                      {project.type}
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES — cartes blanches sur fond clair ============ */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-3">
                {t.home.servicesTitle}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A]">
                {t.services.title}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.home.groups.map((group, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="bg-[#F8F8F8] border-t-[3px] border-t-[#CC0000] p-8 h-full group transition-all duration-300 hover:bg-[#0A0A0A] hover:-translate-y-2 hover:shadow-2xl cursor-default">
                  <div className="text-3xl mb-5">{serviceIcons[i]}</div>
                  <h3 className="text-[#0A0A0A] group-hover:text-white font-bold text-lg mb-3 transition-colors duration-300">
                    {group.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-400 text-sm leading-relaxed mb-5 transition-colors duration-300">
                    {group.desc}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((item, j) => (
                      <li
                        key={j}
                        className={`text-gray-400 group-hover:text-gray-300 text-[13px] flex items-center gap-2.5 transition-colors duration-300 ${rtl ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="w-1.5 h-1.5 bg-[#CC0000] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div className="text-center mt-14">
              <Link
                href="/services"
                className="inline-block border border-[#0A0A0A] text-[#0A0A0A] px-10 py-4 text-sm uppercase tracking-[0.25em] font-semibold hover:bg-[#0A0A0A] hover:text-white transition-all duration-300"
              >
                {t.hero.cta}
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ============ CTA FINAL — bannière rouge ============ */}
      <section className="relative py-28 overflow-hidden bg-[#CC0000]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-white/80 text-xl mb-10">{t.cta.subtitle}</p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#CC0000] px-10 py-4 text-sm font-bold uppercase tracking-[0.25em] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300"
            >
              {t.cta.button}
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}
