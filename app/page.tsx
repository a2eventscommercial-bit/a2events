'use client'

import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import TextReveal from '@/components/TextReveal'
import Marquee from '@/components/Marquee'
import Hero from '@/components/Hero'
import WorkCarousel from '@/components/WorkCarousel'
import Partners from '@/components/Partners'
import Approach from '@/components/Approach'
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

  return (
    <div className={rtl ? 'font-arabic' : ''} dir={rtl ? 'rtl' : 'ltr'}>
      {/* ============ HERO — style Magnific (texte + liste services + logos) ============ */}
      <Hero />

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

      {/* ============ NOTRE APPROCHE — étapes numérotées + visuel synchronisé ============ */}
      <Approach
        eyebrow={t.home.approach.eyebrow}
        heading={t.home.approach.heading}
        steps={t.home.approach.steps}
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
              <p className="hidden sm:block text-gray-400 text-sm max-w-xs">
                {t.realisations.subtitle}
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <WorkCarousel projects={workProjects} rtl={rtl} viewLabel={t.realisations.viewProject} />
          </SectionReveal>
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
