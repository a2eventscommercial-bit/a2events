'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from '@/lib/useTranslations'

const projects = [
  {
    id: 1,
    title: 'Conférence Nationale Tech 2024',
    category: 'conference',
    cover: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    desc: 'Organisation complète d\'une conférence de 500 participants à Alger.',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80',
    ],
  },
  {
    id: 2,
    title: 'Stand Expo Construire 2024',
    category: 'stand',
    cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    desc: 'Conception et réalisation d\'un stand de 200m² pour une marque de construction.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&q=80',
      'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=1200&q=80',
    ],
  },
  {
    id: 3,
    title: 'Gala de Fin d\'Année Horizon',
    category: 'gala',
    cover: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    desc: 'Organisation d\'un gala de prestige pour 300 invités au Sheraton d\'Alger.',
    images: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&q=80',
    ],
  },
  {
    id: 4,
    title: 'Séminaire Leadership Corporate',
    category: 'corporate',
    cover: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    desc: 'Séminaire de formation et de team building pour une équipe de 150 cadres.',
    images: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80',
    ],
  },
  {
    id: 5,
    title: 'Rebranding TechStart Algeria',
    category: 'branding',
    cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    desc: 'Refonte complète de l\'identité visuelle d\'une startup technologique.',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80',
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&q=80',
    ],
  },
  {
    id: 6,
    title: 'Forum Investissement Algérie',
    category: 'conference',
    cover: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    desc: 'Forum international avec 800 participants et 30 exposants.',
    images: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
      'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1200&q=80',
    ],
  },
]

type FilterKey = 'all' | 'conference' | 'stand' | 'gala' | 'corporate' | 'branding'

export default function RealisationsPage() {
  const { t, rtl } = useTranslations()
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [activeImage, setActiveImage] = useState(0)

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const filterKeys: FilterKey[] = ['all', 'conference', 'stand', 'gala', 'corporate', 'branding']

  return (
    <div className={`min-h-screen bg-[#0A0A0A] ${rtl ? 'font-arabic' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(204,0,0,0.12)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Portfolio</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6">{t.realisations.title}</h1>
            <div className="w-20 h-0.5 bg-[#CC0000] mx-auto mb-6" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.realisations.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center gap-2 overflow-x-auto pb-1 ${rtl ? 'flex-row-reverse' : ''}`}>
            {filterKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`flex-shrink-0 px-5 py-2 text-sm font-semibold uppercase tracking-widest transition-all duration-200 ${
                  activeFilter === key
                    ? 'bg-[#CC0000] text-white'
                    : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white'
                }`}
              >
                {t.realisations.filters[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => { setSelectedProject(project); setActiveImage(0) }}
                >
                  <div className="relative overflow-hidden h-60 sm:h-72">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-[#CC0000] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="text-[#CC0000] text-xs font-semibold uppercase tracking-widest">
                        {t.realisations.filters[project.category as FilterKey]}
                      </span>
                      <h3 className="text-white font-bold text-lg mt-1">{project.title}</h3>
                      <p className="text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.desc}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-[#CC0000] text-white text-xs px-3 py-1 font-semibold uppercase tracking-widest">
                        {t.realisations.viewProject}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main image */}
              <div className="relative h-72 sm:h-96">
                <Image
                  src={selectedProject.images[activeImage]}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#CC0000] flex items-center justify-center text-white text-xl hover:bg-red-700 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 p-4 overflow-x-auto">
                {selectedProject.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-14 flex-shrink-0 cursor-pointer overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-[#CC0000]' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className={`p-6 pt-0 ${rtl ? 'text-right' : 'text-left'}`}>
                <span className="text-[#CC0000] text-xs font-semibold uppercase tracking-widest">
                  {t.realisations.filters[selectedProject.category as FilterKey]}
                </span>
                <h2 className="text-white font-black text-2xl mt-1 mb-3">{selectedProject.title}</h2>
                <p className="text-gray-400 leading-relaxed">{selectedProject.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
