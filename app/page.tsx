'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionReveal from '@/components/SectionReveal'
import TextReveal from '@/components/TextReveal'
import Marquee from '@/components/Marquee'
import TiltCard from '@/components/TiltCard'
import Partners from '@/components/Partners'
import PinnedReveal from '@/components/PinnedReveal'
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
const marqueeItems = ['Événementiel', 'Stands', 'Branding', 'Conférences', 'Galas', 'Impression', 'Digital', 'Médias']

export default function HomePage() {
  const { t, rtl } = useTranslations()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '120%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className={rtl ? 'font-arabic' : ''} dir={rtl ? 'rtl' : 'ltr'}>
      {/* ============ HERO — parallax + blobs + texte révélé ============ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        {/* Image avec parallax */}
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 -top-[10%] h-[120%]">
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
            alt="Événement A² Events"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#0A0A0A]/65" />

        {/* Blobs rouges animés */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#CC0000]/30 rounded-full blur-3xl animate-blob-slow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#CC0000]/20 rounded-full blur-3xl animate-blob-slow" style={{ animationDelay: '6s' }} />

        {/* Contenu */}
        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#CC0000] text-xs sm:text-sm font-bold uppercase tracking-[0.4em] mb-6"
          >
            Agence Événementielle
          </motion.p>

          <TextReveal
            as="h1"
            text={t.hero.slogan}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-[#CC0000] text-white px-10 py-4 text-sm uppercase tracking-[0.25em] font-semibold"
            >
              <span className="relative z-10">{t.hero.cta2}</span>
              <span className="absolute inset-0 bg-[#0A0A0A] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-white">
                {t.hero.cta2}
              </span>
            </Link>
            <Link
              href="/services"
              className="border border-white/40 text-white px-10 py-4 text-sm uppercase tracking-[0.25em] font-semibold hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              {t.hero.cta}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
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

      {/* ============ MARQUEE défilant ============ */}
      <Marquee items={marqueeItems} />

      {/* ============ INTRO — fond blanc, texte révélé ============ */}
      <section className="bg-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <TextReveal
            as="p"
            text={t.home.intro}
            className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#0A0A0A] leading-relaxed text-center"
          />
        </div>
      </section>

      {/* ============ PARTENAIRES — grille de logos (style Terminal) ============ */}
      <Partners rtl={rtl} title={t.home.trust.title} subtitle={t.home.trust.subtitle} />

      {/* ============ MANIFESTE — section épinglée au scroll (style composites) ============ */}
      <PinnedReveal
        title={t.home.manifesto.title}
        lines={t.home.manifesto.lines}
        image="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1920&q=80"
        rtl={rtl}
      />

      {/* ============ WORK — fond gris, cartes tilt 3D (panneau arrondi qui chevauche) ============ */}
      <section className="relative z-10 -mt-12 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] bg-[#F2F2F2] pt-28 pb-28 shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className={`flex items-end justify-between mb-14 ${rtl ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-3">Portfolio</p>
                <TextReveal text={t.realisations.title} className="text-3xl sm:text-5xl font-black text-[#0A0A0A]" />
              </div>
              <Link href="/realisations" className="hidden sm:inline text-gray-500 hover:text-[#CC0000] text-sm font-medium transition-colors whitespace-nowrap">
                {t.realisations.viewProject} →
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
            {workProjects.map((project, i) => (
              <SectionReveal key={project.id} delay={(i % 3) * 0.12}>
                <TiltCard>
                  <Link href="/realisations" className="block group">
                    <div className="relative overflow-hidden aspect-video bg-white shadow-md" style={{ transform: 'translateZ(40px)' }}>
                      <Image
                        src={project.img}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className={`absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400 ${rtl ? 'text-right' : ''}`}>
                        <span className="text-[#CC0000] bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                          {project.type}
                        </span>
                        <h3 className="text-white text-lg font-bold mt-2">{project.name}</h3>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES — panneau blanc arrondi qui chevauche le gris ============ */}
      <section className="relative z-20 -mt-12 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] bg-white pt-28 pb-28 shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-3">{t.home.servicesTitle}</p>
              <TextReveal text={t.services.title} className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A]" />
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.home.groups.map((group, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="relative bg-[#F8F8F8] p-8 h-full group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-default">
                  {/* Remplissage rouge qui monte au survol */}
                  <span className="absolute inset-0 bg-[#CC0000] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="absolute top-0 left-0 w-full h-[3px] bg-[#CC0000] group-hover:bg-white transition-colors duration-500" />
                  <div className="relative z-10">
                    <div className="text-3xl mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">{serviceIcons[i]}</div>
                    <h3 className="text-[#0A0A0A] group-hover:text-white font-bold text-lg mb-3 transition-colors duration-500">{group.title}</h3>
                    <p className="text-gray-500 group-hover:text-white/90 text-sm leading-relaxed mb-5 transition-colors duration-500">{group.desc}</p>
                    <ul className="space-y-2">
                      {group.items.map((item, j) => (
                        <li key={j} className={`text-gray-400 group-hover:text-white text-[13px] flex items-center gap-2.5 transition-colors duration-500 ${rtl ? 'flex-row-reverse' : ''}`}>
                          <span className="w-1.5 h-1.5 bg-[#CC0000] group-hover:bg-white flex-shrink-0 transition-colors duration-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div className="text-center mt-14">
              <Link href="/services" className="inline-block border border-[#0A0A0A] text-[#0A0A0A] px-10 py-4 text-sm uppercase tracking-[0.25em] font-semibold hover:bg-[#0A0A0A] hover:text-white transition-all duration-300">
                {t.hero.cta}
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ============ CTA FINAL — panneau rouge arrondi qui chevauche ============ */}
      <section className="relative z-30 -mt-12 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] py-32 overflow-hidden bg-[#CC0000]">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob-slow" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-black/10 rounded-full blur-3xl animate-blob-slow" style={{ animationDelay: '5s' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <TextReveal text={t.cta.title} className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-4" />
          <SectionReveal delay={0.2}>
            <p className="text-white/80 text-xl mb-10">{t.cta.subtitle}</p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#CC0000] px-12 py-5 text-sm font-bold uppercase tracking-[0.25em] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 hover:scale-105"
            >
              {t.cta.button}
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}
