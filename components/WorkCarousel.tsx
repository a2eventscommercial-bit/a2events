'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Project {
  id: string
  name: string
  type: string
  img: string
}

interface Props {
  projects: Project[]
  rtl?: boolean
  viewLabel: string
}

/**
 * Carrousel "coverflow" : carte active centrée et large, voisines réduites
 * en retrait. Navigation : flèches, clic sur une carte latérale, swipe tactile.
 * Format paysage (16:9).
 */
export default function WorkCarousel({ projects, rtl = false, viewLabel }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerW, setContainerW] = useState(900)
  const [active, setActive] = useState(0)
  const dir = rtl ? -1 : 1

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setContainerW(el.clientWidth))
    ro.observe(el)
    setContainerW(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  const cardW = Math.min(containerW * 0.74, 620)
  const cardH = (cardW * 9) / 16

  const go = (d: 1 | -1) => setActive((a) => Math.max(0, Math.min(projects.length - 1, a + d)))

  // Swipe tactile / souris
  const startX = useRef<number | null>(null)
  const onDown = (e: React.PointerEvent) => { startX.current = e.clientX }
  const onUp = (e: React.PointerEvent) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 50) go((dx < 0 ? 1 : -1) * dir as 1 | -1)
    startX.current = null
  }

  return (
    <div>
      <div
        ref={containerRef}
        onPointerDown={onDown}
        onPointerUp={onUp}
        className="relative w-full select-none touch-pan-y cursor-grab active:cursor-grabbing"
        style={{ height: cardH + 40 }}
      >
        {projects.map((project, i) => {
          const delta = (i - active) * dir
          const abs = Math.abs(delta)
          const isActive = delta === 0
          return (
            <motion.div
              key={project.id}
              className="absolute top-0 left-1/2"
              style={{ width: cardW }}
              animate={{
                x: delta * cardW * 0.5 - cardW / 2,
                scale: isActive ? 1 : 0.82,
                opacity: abs > 2 ? 0 : isActive ? 1 : 0.5,
                zIndex: 20 - abs,
                filter: isActive ? 'blur(0px)' : 'blur(1px)',
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 32 }}
              onClick={() => !isActive && setActive(i)}
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-white shadow-2xl ${isActive ? '' : 'cursor-pointer'}`}
                style={{ height: cardH }}
              >
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80vw, 620px"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
                {!isActive && <div className="absolute inset-0 bg-[#0A0A0A]/30" />}
                {isActive && (
                  <Link
                    href="/realisations"
                    className={`absolute bottom-0 left-0 right-0 p-6 ${rtl ? 'text-right' : ''}`}
                  >
                    <span className="text-[#CC0000] bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] rounded">
                      {project.type}
                    </span>
                    <h3 className="text-white text-xl sm:text-2xl font-bold mt-2.5">{project.name}</h3>
                  </Link>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Détails actifs + contrôles */}
      <div className={`flex items-center justify-between mt-8 gap-4 ${rtl ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="Précédent"
            className="w-12 h-12 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center text-[#0A0A0A] enabled:hover:bg-[#CC0000] enabled:hover:border-[#CC0000] enabled:hover:text-white transition-all duration-300 disabled:opacity-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d={rtl ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            disabled={active === projects.length - 1}
            aria-label="Suivant"
            className="w-12 h-12 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center text-[#0A0A0A] enabled:hover:bg-[#CC0000] enabled:hover:border-[#CC0000] enabled:hover:text-white transition-all duration-300 disabled:opacity-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d={rtl ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Pagination dots */}
          <div className={`flex items-center gap-1.5 ${rtl ? 'mr-2' : 'ml-2'}`}>
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Aller au projet ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-[#CC0000]' : 'w-1.5 bg-[#0A0A0A]/20 hover:bg-[#0A0A0A]/40'
                }`}
              />
            ))}
          </div>
        </div>

        <Link
          href="/realisations"
          className="text-gray-500 hover:text-[#CC0000] text-sm font-medium transition-colors whitespace-nowrap"
        >
          {viewLabel} →
        </Link>
      </div>
    </div>
  )
}
