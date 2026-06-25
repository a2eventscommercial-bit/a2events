'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

interface Props {
  eyebrow: string
  title: string
  subtitle?: string
  rtl?: boolean
}

/**
 * En-tête de page sombre cohérent avec la hero : halos rouges, sur-titre,
 * titre révélé, sous-titre. Padding haut adapté au menu flottant.
 */
export default function PageHeader({ eyebrow, title, subtitle, rtl = false }: Props) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute -top-20 -left-32 w-[26rem] h-[26rem] bg-[#CC0000]/20 rounded-full blur-3xl animate-blob-slow" />
      <div className="absolute -bottom-32 -right-32 w-[26rem] h-[26rem] bg-[#CC0000]/12 rounded-full blur-3xl animate-blob-slow" style={{ animationDelay: '6s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(204,0,0,0.10)_0%,transparent_60%)]" />

      <div className={`relative z-10 max-w-7xl mx-auto px-6 ${rtl ? 'text-right' : ''}`}>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#CC0000] text-sm font-bold uppercase tracking-[0.4em] mb-5"
        >
          {eyebrow}
        </motion.p>
        <TextReveal text={title} className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05]" />
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-400 text-lg max-w-2xl mt-6"
            style={{ marginInline: rtl ? '0 0' : undefined, marginLeft: rtl ? 'auto' : undefined }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
