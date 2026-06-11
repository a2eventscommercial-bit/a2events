'use client'

import Link from 'next/link'
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import SectionReveal from '@/components/SectionReveal'
import { useTranslations } from '@/lib/useTranslations'

const serviceIcons = ['🎤', '🎪', '🖨️', '🪧', '🎨', '📱', '🚚', '🎬']

const projectImages = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
]

const projectCategories = ['Conférence', 'Stand', 'Gala']

export default function HomePage() {
  const { t, rtl } = useTranslations()

  return (
    <div className={rtl ? 'font-arabic' : ''} dir={rtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <HeroSection />

      {/* Services Preview */}
      <section className="section-light py-24" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className={`${rtl ? 'text-right' : 'text-left'} mb-16`}>
              <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-3">
                Ce que nous faisons
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
                {t.services.title}
              </h2>
              <p className="text-gray-500 text-lg max-w-xl">{t.services.subtitle}</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.items.slice(0, 4).map((service, i) => (
              <SectionReveal key={service.id} delay={i * 0.1}>
                <div className="bg-white border-t-[3px] border-t-[#CC0000] shadow-sm hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer hover:-translate-y-1 h-full">
                  <div className="text-3xl mb-4">{serviceIcons[i]}</div>
                  <h3 className="text-[#0A0A0A] font-bold text-base mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.short}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.4}>
            <div className={`mt-12 ${rtl ? 'text-right' : 'text-left'}`}>
              <Link href="/services" className="btn-outline-dark text-sm uppercase tracking-widest">
                Voir tous nos services →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Réalisations Teaser */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className={`${rtl ? 'text-right' : 'text-left'} mb-16`}>
              <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-3">
                Notre portfolio
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                {t.realisations.title}
              </h2>
              <p className="text-gray-400 text-lg max-w-xl">{t.realisations.subtitle}</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectImages.map((img, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <Link href="/realisations" className="block group relative overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={img}
                      alt={`Projet ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-70" />
                    <div className="absolute inset-0 bg-[#CC0000] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-[#CC0000] text-xs font-semibold uppercase tracking-widest">
                        {projectCategories[i]}
                      </span>
                      <h3 className="text-white font-bold text-lg mt-1">Projet {i + 1}</h3>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.4}>
            <div className={`mt-12 ${rtl ? 'text-right' : 'text-left'}`}>
              <Link href="/realisations" className="btn-outline text-sm uppercase tracking-widest">
                Voir toutes nos réalisations →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-3">
                Notre différence
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
                {t.why.title}
              </h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">{t.why.subtitle}</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(['🏆', '💡', '🤝', '⭐'] as const).map((icon, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-[#0A0A0A] flex items-center justify-center text-2xl mx-auto mb-5 group-hover:bg-[#CC0000] transition-colors duration-300">
                    {icon}
                  </div>
                  <h3 className="text-[#0A0A0A] font-bold text-lg mb-3">
                    {t.why.items[i].title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t.why.items[i].desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-3">
                Témoignages
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                {t.testimonials.title}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <div className={`bg-neutral-900 border-t-[3px] border-t-[#CC0000] p-8 h-full ${rtl ? 'text-right' : 'text-left'}`}>
                  <div className="text-[#CC0000] text-3xl mb-4">&ldquo;</div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                    {testimonial.text}
                  </p>
                  <div className={`flex items-center gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-[#CC0000] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#CC0000]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <SectionReveal>
            <p className="text-white/70 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
              Prêt à commencer ?
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-white/80 text-xl mb-10">{t.cta.subtitle}</p>
            <Link
              href="/contact"
              className="bg-white text-[#CC0000] px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 inline-block"
            >
              {t.cta.button}
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}
