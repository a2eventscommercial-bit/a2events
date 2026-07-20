'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

interface Step {
  title: string
  desc: string
}

interface Props {
  eyebrow: string
  heading: string
  steps: Step[]
  rtl?: boolean
}

// Un visuel par étape (remplace par tes vraies photos quand tu les as)
const stepImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80', // écoute & stratégie
  '/hero/stands.webp', // conception & production (photo réelle A²)
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80', // exécution & suivi
]

export default function Approach({ eyebrow, heading, steps, rtl = false }: Props) {
  const [active, setActive] = useState(0)

  return (
    <section className="relative bg-[#0A0A0A] py-28 sm:py-36 overflow-hidden">
      {/* halo rouge discret */}
      <div className={`absolute top-1/4 w-[30rem] h-[30rem] bg-[#CC0000]/12 rounded-full blur-3xl ${rtl ? '-right-40' : '-left-40'}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0A0A0A_90%)]" />

      <div className={`relative z-10 max-w-7xl mx-auto px-6 ${rtl ? 'text-right' : ''}`}>
        {/* En-tête */}
        <div className="mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-[#CC0000] text-sm font-bold uppercase tracking-[0.4em] mb-6"
          >
            {eyebrow}
          </motion.p>
          <TextReveal
            text={heading}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] max-w-3xl"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Colonne étapes */}
          <div>
            {steps.map((step, i) => {
              const isActive = active === i
              return (
                <motion.div
                  key={i}
                  onViewportEnter={() => setActive(i)}
                  viewport={{ margin: '-45% 0px -45% 0px' }}
                  className={`flex gap-6 pb-14 last:pb-0 ${rtl ? 'flex-row-reverse' : ''}`}
                >
                  {/* Ligne de progression */}
                  <div className="relative w-[2px] flex-shrink-0">
                    <span className="absolute inset-0 bg-white/10" />
                    <motion.span
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: '-30% 0px -30% 0px' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="absolute inset-0 bg-[#CC0000] origin-top"
                    />
                    {/* Point de tête */}
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-30% 0px -30% 0px' }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#CC0000]"
                    />
                  </div>

                  {/* Contenu */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="pt-0.5"
                  >
                    <span
                      className={`block font-mono text-sm mb-3 transition-colors duration-500 ${
                        isActive ? 'text-[#CC0000]' : 'text-neutral-600'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className={`text-2xl sm:text-3xl font-bold mb-3 transition-colors duration-500 ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed max-w-md">{step.desc}</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Visuel synchronisé (desktop) */}
          <div className="hidden lg:block sticky top-32">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
              {stepImages.map((src, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.05 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 1024px) 0px, 45vw" />
                </motion.div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />

              {/* Indicateur d'étape */}
              <div className={`absolute bottom-6 flex items-center gap-2 ${rtl ? 'right-6 flex-row-reverse' : 'left-6'}`}>
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      active === i ? 'w-8 bg-[#CC0000]' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
