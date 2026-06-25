'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  title: string
  lines: string[]
  image: string
  rtl?: boolean
}

/**
 * Section épinglée : pendant qu'on scrolle, l'image se dévoile (clip + scale)
 * et les lignes de texte s'allument une à une selon la progression.
 */
export default function PinnedReveal({ title, lines, image, rtl = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1])
  const clip = useTransform(scrollYProgress, [0, 0.6], [70, 0])
  const clipPath = useTransform(clip, (v) => `inset(${v}% 0% 0% 0%)`)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 0.35])

  return (
    <section ref={ref} className="relative h-[260vh] bg-[#0A0A0A]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Image révélée */}
        <motion.div style={{ scale: imgScale, clipPath }} className="absolute inset-0">
          <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
        </motion.div>
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-[#0A0A0A]" />

        {/* Texte */}
        <div className={`relative z-10 max-w-5xl mx-auto px-6 ${rtl ? 'text-right' : 'text-center'}`}>
          <p className="text-[#CC0000] text-sm font-bold uppercase tracking-[0.4em] mb-8">{title}</p>
          <div className="space-y-2">
            {lines.map((line, i) => {
              const start = 0.15 + (i / lines.length) * 0.6
              return <Line key={i} text={line} progress={scrollYProgress} start={start} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Line({
  text,
  progress,
  start,
}: {
  text: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
}) {
  const opacity = useTransform(progress, [start, start + 0.12], [0.15, 1])
  const y = useTransform(progress, [start, start + 0.12], [30, 0])
  return (
    <motion.p
      style={{ opacity, y }}
      className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
    >
      {text}
    </motion.p>
  )
}
