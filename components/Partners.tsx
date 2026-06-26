'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

interface Props {
  rtl?: boolean
  title: string
  subtitle: string
}

// Logos horizontaux (largeur > hauteur)
const horizontal = [
  { src: '/clients/client-onda.svg', alt: 'ONDA' },
  { src: '/clients/client-guerbet.svg', alt: 'Guerbet' },
  { src: '/clients/client-saidal.svg', alt: 'Saidal' },
  { src: '/clients/client-klosterfreau.svg', alt: 'Klosterfrau' },
  { src: '/clients/client-srh.svg', alt: 'SRH' },
  { src: '/clients/client-dermagor.svg', alt: 'Dermagor' },
  { src: '/clients/client-item.svg', alt: 'Item' },
  { src: '/clients/client-biogalinic.svg', alt: 'Biogalinic' },
]

// Logos verticaux / carrés (hauteur ≈ ou > largeur)
const vertical = [
  { src: '/clients/client-bigdis.svg', alt: 'BIGDIS' },
  { src: '/clients/client-1.webp', alt: 'Éditions Talantikit' },
  { src: '/clients/client-3.svg', alt: 'Client A² Events' },
  { src: '/clients/client-2.webp', alt: 'Client A² Events' },
]

const logoClass =
  'w-auto max-w-full object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500'

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

        {/* Logos horizontaux */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14 items-center justify-items-center">
          {horizontal.map((logo, i) => (
            <motion.div
              key={logo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="flex items-center justify-center w-full"
            >
              <Image src={logo.src} alt={logo.alt} width={240} height={96} className={`h-12 sm:h-14 ${logoClass}`} />
            </motion.div>
          ))}
        </div>

        {/* Logos verticaux / carrés */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-14 items-center justify-items-center mt-16">
          {vertical.map((logo, i) => (
            <motion.div
              key={logo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="flex items-center justify-center w-full"
            >
              <Image src={logo.src} alt={logo.alt} width={160} height={160} className={`h-24 sm:h-28 ${logoClass}`} />
            </motion.div>
          ))}
        </div>

        <p className={`text-center text-gray-400 text-sm mt-16 ${rtl ? 'font-arabic' : ''}`}>
          {subtitle}
        </p>
      </div>
    </section>
  )
}
