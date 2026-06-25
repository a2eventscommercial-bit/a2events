'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
 * Carrousel horizontal scrollable (souris, trackpad, swipe tactile + flèches).
 */
export default function WorkCarousel({ projects, rtl = false, viewLabel }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-card]')
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8
    track.scrollBy({ left: dir * amount * (rtl ? -1 : 1), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Piste scrollable */}
      <div
        ref={trackRef}
        dir={rtl ? 'rtl' : 'ltr'}
        className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar scroll-smooth"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            data-card
            className="group snap-start flex-shrink-0 w-[82vw] sm:w-[60vw] lg:w-[420px]"
          >
            <Link href="/realisations" className="block">
              <div className="relative overflow-hidden aspect-[4/3] bg-white shadow-md">
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 60vw, 420px"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                <div className={`absolute bottom-0 left-0 right-0 p-6 ${rtl ? 'text-right' : ''}`}>
                  <span className="text-[#CC0000] bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                    {project.type}
                  </span>
                  <h3 className="text-white text-xl font-bold mt-2.5">{project.name}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Flèches */}
      <div className={`flex items-center gap-3 mt-8 ${rtl ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Précédent"
          className="w-12 h-12 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center text-[#0A0A0A] hover:bg-[#CC0000] hover:border-[#CC0000] hover:text-white transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d={rtl ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Suivant"
          className="w-12 h-12 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center text-[#0A0A0A] hover:bg-[#CC0000] hover:border-[#CC0000] hover:text-white transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d={rtl ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <Link
          href="/realisations"
          className={`text-gray-500 hover:text-[#CC0000] text-sm font-medium transition-colors whitespace-nowrap ${rtl ? 'mr-auto' : 'ml-auto'}`}
        >
          {viewLabel} →
        </Link>
      </div>
    </div>
  )
}
