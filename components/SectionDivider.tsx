'use client'

import { motion } from 'framer-motion'

interface Props {
  /** couleur du haut (section précédente) */
  topColor?: string
  /** couleur du bas (section suivante) — c'est la vague */
  bottomColor?: string
  variant?: 'wave' | 'diagonal' | 'curve'
}

/**
 * Séparateur fluide entre deux sections (SVG), avec un léger dessin animé.
 */
export default function SectionDivider({
  topColor = '#0A0A0A',
  bottomColor = '#F2F2F2',
  variant = 'wave',
}: Props) {
  const paths: Record<string, string> = {
    wave: 'M0,64 C320,120 480,0 720,40 C960,80 1120,16 1440,56 L1440,120 L0,120 Z',
    curve: 'M0,120 C480,0 960,0 1440,120 L1440,120 L0,120 Z',
    diagonal: 'M0,120 L1440,0 L1440,120 L0,120 Z',
  }

  return (
    <div className="relative leading-[0]" style={{ background: topColor }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-24 block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={paths[variant]} fill={bottomColor} />
        <motion.path
          d={paths[variant]}
          fill="none"
          stroke="#CC0000"
          strokeWidth={3}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}
