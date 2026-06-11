'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import { useTranslations } from '@/lib/useTranslations'
import Link from 'next/link'

const serviceIcons = ['🎤', '🎪', '🖨️', '🪧', '🎨', '📱', '🚚', '🎬']

export default function ServicesPage() {
  const { t, rtl } = useTranslations()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className={`min-h-screen bg-[#0A0A0A] ${rtl ? 'font-arabic' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(204,0,0,0.12)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-4">
              Notre expertise
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6">
              {t.services.title}
            </h1>
            <div className="w-20 h-0.5 bg-[#CC0000] mx-auto mb-6" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.services.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.services.items.map((service, i) => (
              <SectionReveal key={service.id} delay={i * 0.08}>
                <div
                  className={`bg-neutral-900 border-t-[3px] border-t-[#CC0000] p-8 cursor-pointer transition-all duration-300 hover:bg-neutral-800 ${rtl ? 'text-right' : 'text-left'}`}
                  onClick={() => setExpanded(expanded === service.id ? null : service.id)}
                >
                  <div className={`flex items-start gap-5 ${rtl ? 'flex-row-reverse' : ''}`}>
                    <div className="text-4xl flex-shrink-0">{serviceIcons[i]}</div>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center justify-between gap-4 ${rtl ? 'flex-row-reverse' : ''}`}>
                        <h2 className="text-white font-bold text-xl">{service.title}</h2>
                        <span className={`text-[#CC0000] text-xl flex-shrink-0 transition-transform duration-300 ${expanded === service.id ? 'rotate-45' : ''}`}>
                          +
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">{service.short}</p>

                      <AnimatePresence>
                        {expanded === service.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-neutral-700">
                              <p className="text-gray-300 text-sm leading-relaxed">{service.long}</p>
                              <Link
                                href="/contact"
                                className="inline-block mt-4 text-[#CC0000] text-sm font-semibold uppercase tracking-widest hover:text-red-400 transition-colors"
                              >
                                Demander un devis →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
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
              Un projet en tête ?
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Parlons-en et construisons ensemble quelque chose d&apos;exceptionnel.
            </p>
            <Link href="/contact" className="btn-primary text-sm uppercase tracking-widest">
              Prendre contact
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}
