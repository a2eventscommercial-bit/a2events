'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

interface Props {
  rtl?: boolean
  title: string
  subtitle: string
}

// Logos clients placeholder (texte stylisé) — remplace par tes vrais logos quand prêts.
const partners = [
  'HORIZON', 'TECHCORP', 'SAFEX', 'INNOVA', 'SONATRACH', 'DJEZZY',
  'CEVITAL', 'CONDOR', 'OOREDOO', 'BIOPHARM', 'AADL', 'MOBILIS',
]

export default function Partners({ rtl = false, title, subtitle }: Props) {
  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <TextReveal
            text={title}
            className={`text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A0A0A] max-w-3xl mx-auto leading-tight ${rtl ? 'font-arabic' : ''}`}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-200">
          {partners.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 + Math.floor(i / 4) * 0.05 }}
              className="group relative flex items-center justify-center h-28 sm:h-32 bg-white cursor-default overflow-hidden"
            >
              <span className="absolute inset-0 bg-[#CC0000] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
              <span className="relative z-10 text-lg sm:text-xl font-black tracking-tight text-gray-300 group-hover:text-white transition-colors duration-400">
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        <p className={`text-center text-gray-400 text-sm mt-10 ${rtl ? 'font-arabic' : ''}`}>
          {subtitle}
        </p>
      </div>
    </section>
  )
}
