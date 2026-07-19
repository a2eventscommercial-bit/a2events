'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import PageHeader from '@/components/PageHeader'
import { useTranslations } from '@/lib/useTranslations'
import Link from 'next/link'

import Icon, { serviceIconNames } from '@/components/Icons'

export default function ServicesPage() {
  const { t, rtl } = useTranslations()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className={`min-h-screen bg-[#0A0A0A] ${rtl ? 'font-arabic' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      <PageHeader eyebrow="Notre expertise" title={t.services.title} subtitle={t.services.subtitle} rtl={rtl} />

      {/* Services Grid — panneau clair arrondi qui chevauche le header */}
      <section className="relative z-10 -mt-12 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] bg-[#F2F2F2] pt-24 pb-24 shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.services.items.map((service, i) => {
              const open = expanded === service.id
              return (
                <SectionReveal key={service.id} delay={(i % 2) * 0.08}>
                  <div
                    className={`bg-white rounded-2xl border-t-[3px] border-t-[#CC0000] p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${open ? 'shadow-xl' : 'shadow-sm'} ${rtl ? 'text-right' : 'text-left'}`}
                    onClick={() => setExpanded(open ? null : service.id)}
                  >
                    <div className={`flex items-start gap-5 ${rtl ? 'flex-row-reverse' : ''}`}>
                      <Icon name={serviceIconNames[i]} className="w-9 h-9 flex-shrink-0 text-[#CC0000]" />
                      <div className="flex-1 min-w-0">
                        <div className={`flex items-center justify-between gap-4 ${rtl ? 'flex-row-reverse' : ''}`}>
                          <h2 className="text-[#0A0A0A] font-bold text-xl">{service.title}</h2>
                          <span className={`text-[#CC0000] text-2xl flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
                            +
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">{service.short}</p>

                        <AnimatePresence>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-gray-600 text-sm leading-relaxed">{service.long}</p>
                                <Link
                                  href="/contact"
                                  className="inline-block mt-4 text-[#CC0000] text-sm font-semibold uppercase tracking-widest hover:text-red-700 transition-colors"
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
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA — panneau rouge arrondi */}
      <section className="relative z-20 -mt-12 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] py-28 overflow-hidden bg-[#CC0000]">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob-slow" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <TextRevealCTA rtl={rtl} />
          <SectionReveal delay={0.15}>
            <p className="text-white/80 text-lg mb-8 mt-4">
              Parlons-en et construisons ensemble quelque chose d&apos;exceptionnel.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#CC0000] px-10 py-4 text-sm font-bold uppercase tracking-[0.25em] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 hover:scale-105"
            >
              {t.cta.button}
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}

function TextRevealCTA({ rtl }: { rtl: boolean }) {
  return (
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-white ${rtl ? 'font-arabic' : ''}`}>
      Un projet en tête ?
    </h2>
  )
}
