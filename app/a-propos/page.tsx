'use client'

import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import PhotoPlaceholder from '@/components/PhotoPlaceholder'
import { useTranslations } from '@/lib/useTranslations'
import Link from 'next/link'

const valueIcons = ['⭐', '💡', '🤝', '🔥']

export default function AboutPage() {
  const { t, rtl } = useTranslations()

  return (
    <div className={`min-h-screen bg-[#0A0A0A] ${rtl ? 'font-arabic' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(204,0,0,0.12)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Notre histoire</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6">{t.about.title}</h1>
            <div className="w-20 h-0.5 bg-[#CC0000] mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 section-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${rtl ? 'lg:grid-flow-dense' : ''}`}>
            <SectionReveal direction={rtl ? 'right' : 'left'}>
              <div className={rtl ? 'text-right' : 'text-left'}>
                <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-4">2019 — Présent</p>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] mb-6">{t.about.story.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{t.about.story.text1}</p>
                <p className="text-gray-600 leading-relaxed">{t.about.story.text2}</p>
              </div>
            </SectionReveal>

            <SectionReveal direction={rtl ? 'left' : 'right'}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0A0A0A] p-6 border-t-[3px] border-t-[#CC0000]">
                  <h3 className="text-[#CC0000] font-bold uppercase tracking-widest text-xs mb-3">
                    {t.about.mission.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{t.about.mission.text}</p>
                </div>
                <div className="bg-[#CC0000] p-6">
                  <h3 className="text-white/80 font-bold uppercase tracking-widest text-xs mb-3">
                    {t.about.vision.title}
                  </h3>
                  <p className="text-white text-sm leading-relaxed">{t.about.vision.text}</p>
                </div>
                <div className="bg-[#F2F2F2] p-6 col-span-2">
                  <div className={`flex items-center gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-[#CC0000] flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                      A²
                    </div>
                    <div>
                      <p className="text-[#0A0A0A] font-bold text-sm">A² Events</p>
                      <p className="text-gray-500 text-xs">Fondée en 2019 à Alger, Algérie</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-16">
              {t.about.numbers.title}
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.about.numbers.items.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#CC0000] mb-2">
                    {item.value}
                  </div>
                  <p className="text-gray-400 text-sm uppercase tracking-widest">{item.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-3">Ce qui nous guide</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A]">{t.about.values.title}</h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.about.values.items.map((value, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className={`${rtl ? 'text-right' : 'text-center'} group`}>
                  <div className="w-16 h-16 bg-[#0A0A0A] flex items-center justify-center text-2xl mx-auto mb-5 group-hover:bg-[#CC0000] transition-colors duration-300">
                    {valueIcons[i]}
                  </div>
                  <h3 className="text-[#0A0A0A] font-bold text-lg mb-3">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-3">Les visages de A²</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">{t.about.team.title}</h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.about.team.members.map((member, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className={`group ${rtl ? 'text-right' : 'text-center'}`}>
                  <div className="relative h-64 mb-4 overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                      <PhotoPlaceholder label={`Photo — ${member.name}`} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CC0000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-1">{member.name}</h3>
                  <p className="text-[#CC0000] text-xs font-semibold uppercase tracking-widest">{member.role}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 section-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] mb-4">
              Rejoignez l&apos;aventure A² Events
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Contactez-nous pour discuter de votre prochain événement.
            </p>
            <Link href="/contact" className="btn-primary text-sm uppercase tracking-widest">
              Nous contacter
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}
