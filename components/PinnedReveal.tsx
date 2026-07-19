'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Props {
  title: string
  lines: string[]
  image: string
  rtl?: boolean
}

/**
 * Section "Notre approche" : hauteur normale (pas de scroll épinglé).
 * Les lignes se révèlent en cascade derrière un masque, avec un trait rouge
 * qui se dessine à gauche. Photo de fond fortement assombrie.
 */
export default function PinnedReveal({ title, lines, image, rtl = false }: Props) {
  return (
    <section className="relative bg-[#0A0A0A] py-32 sm:py-40 overflow-hidden">
      {/* Photo de fond */}
      <div className="absolute inset-0">
        <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-[#0A0A0A]/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      <div className="absolute -left-32 top-1/3 w-[26rem] h-[26rem] bg-[#CC0000]/20 rounded-full blur-3xl animate-blob-slow" />

      <div className={`relative z-10 max-w-5xl mx-auto px-6 ${rtl ? 'text-right' : ''}`}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-[#CC0000] text-sm font-bold uppercase tracking-[0.4em] mb-10"
        >
          {title}
        </motion.p>

        <div className={`relative ${rtl ? 'pe-6 sm:pe-10' : 'ps-6 sm:ps-10'}`}>
          {/* Trait rouge qui se dessine */}
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className={`absolute top-1 bottom-1 w-[3px] bg-[#CC0000] origin-top ${rtl ? 'right-0' : 'left-0'}`}
          />

          <div className="space-y-3 sm:space-y-4">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: [0.33, 1, 0.68, 1] }}
                  className="block text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15]"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
