'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from '@/lib/useTranslations'

const heroLogos = ['HORIZON', 'TECHCORP', 'SAFEX', 'CEVITAL', 'CONDOR', 'SONATRACH']

// Photo de fond par service (même ordre que t.services.items).
// Remplace ces URLs par tes vraies photos quand tu les envoies.
const serviceImages = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80', // conférences
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80', // stands d'expositions
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1920&q=80', // impression & communication
  'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1920&q=80', // supports & signalétique
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80', // branding
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1920&q=80', // marketing digital
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80', // logistique
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80', // couverture médiatique
]

export default function Hero() {
  const { t, rtl } = useTranslations()
  const services = t.services.items
  const n = services.length
  const [active, setActive] = useState(0)

  // liste qui défile automatiquement (focus tournant)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % n), 2600)
    return () => clearInterval(id)
  }, [n])

  const circ = (raw: number) => {
    let d = ((raw % n) + n) % n
    if (d > n / 2) d -= n
    return d
  }

  const itemH = 56

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0A0A] pt-28 pb-10">
      {/* photo de fond qui change à chaque service (crossfade) */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={serviceImages[active] ?? serviceImages[0]}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* filtre noir + touche rouge par-dessus la photo */}
      <div className="absolute inset-0 bg-[#0A0A0A]/82" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/70" />

      {/* halos rouges animés */}
      <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] bg-[#CC0000]/25 rounded-full blur-3xl animate-blob-slow" />
      <div className="absolute bottom-10 -right-32 w-[28rem] h-[28rem] bg-[#CC0000]/15 rounded-full blur-3xl animate-blob-slow" style={{ animationDelay: '6s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_85%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex items-center">
        <div className={`grid lg:grid-cols-12 gap-12 items-center w-full ${rtl ? 'text-right' : ''}`}>
          {/* GAUCHE — texte */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <p className="text-[#CC0000] text-xs sm:text-sm font-bold uppercase tracking-[0.4em] mb-6">
              A² Events
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              {t.hero.headline}
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-xl mb-8">
              {t.hero.slogan}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 ${rtl ? 'sm:flex-row-reverse sm:justify-end' : ''}`}>
              <Link
                href="/contact"
                className="bg-[#CC0000] text-white px-9 py-4 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#aa0000] hover:scale-105 transition-all duration-300 text-center"
              >
                {t.hero.cta2}
              </Link>
              <Link
                href="/services"
                className="border border-white/30 text-white px-9 py-4 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-center"
              >
                {t.hero.cta}
              </Link>
            </div>
          </motion.div>

          {/* DROITE — liste de services défilante avec flèche (desktop uniquement) */}
          <motion.div
            initial={{ opacity: 0, x: rtl ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="relative overflow-hidden" style={{ height: itemH * 5 }}>
              {/* ligne de focus centrale */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-14 border-y border-white/10 pointer-events-none" />

              {services.map((service, i) => {
                const delta = circ(i - active)
                const abs = Math.abs(delta)
                const isActive = delta === 0
                return (
                  <motion.div
                    key={service.id}
                    className="absolute inset-x-0 top-1/2 flex items-center"
                    style={{ height: itemH }}
                    animate={{
                      y: delta * itemH - itemH / 2,
                      opacity: abs > 2 ? 0 : isActive ? 1 : abs === 1 ? 0.45 : 0.18,
                    }}
                    transition={{ type: 'spring', stiffness: 240, damping: 30 }}
                  >
                    <Link
                      href="/services"
                      className={`flex items-center gap-3 w-full group ${rtl ? 'flex-row-reverse' : ''}`}
                    >
                      <span className="w-6 flex-shrink-0 flex items-center justify-center">
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[#CC0000] text-sm leading-none"
                          >
                            {rtl ? '◀' : '▶'}
                          </motion.span>
                        )}
                      </span>
                      <span
                        className={`font-bold transition-all duration-300 ${
                          isActive ? 'text-white text-xl sm:text-2xl' : 'text-gray-400 text-lg'
                        }`}
                      >
                        {service.title}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* BAS — logos clients gris clair */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full hidden lg:block"
      >
        <p className="text-center text-gray-600 text-[11px] uppercase tracking-[0.3em] mb-6">
          {t.home.trust.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {heroLogos.map((logo) => (
            <span
              key={logo}
              className="text-gray-500 hover:text-gray-300 text-lg sm:text-xl font-black tracking-tight transition-colors duration-300"
            >
              {logo}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
