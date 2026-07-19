'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '@/components/PageHeader'
import { useTranslations } from '@/lib/useTranslations'

const projects = [
  {
    id: 1,
    title: 'Conférence Nationale Tech 2024',
    category: 'conference',
    desc: "Organisation complète d'une conférence de 500 participants à Alger.",
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
    desc: "Conception et réalisation d'un stand de 200m² pour une marque de construction.",
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&q=80',
      'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=1200&q=80',
    ],
  },
  {
    id: 3,
    title: "Gala de Fin d'Année Horizon",
    category: 'gala',
    desc: "Organisation d'un gala de prestige pour 300 invités au Sheraton d'Alger.",
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
    desc: "Refonte complète de l'identité visuelle d'une startup technologique.",
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
    <div className={`min-h-screen bg-[#F2F2F2] ${rtl ? 'font-arabic' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      <PageHeader eyebrow="Portfolio" title={t.realisations.title} subtitle={t.realisations.subtitle} rtl={rtl} />

      {/* Lèvre arrondie qui chevauche l'en-tête sombre (comme les autres pages) */}
      <div className="relative z-10 -mt-12 h-12 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] bg-[#F2F2F2] shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.5)]" />

      {/* Filter Bar */}
      <div className="sticky top-24 z-30 bg-[#F2F2F2]/90 backdrop-blur-md border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center gap-2 overflow-x-auto pb-1 ${rtl ? 'flex-row-reverse' : ''}`}>
            {filterKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`flex-shrink-0 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                  activeFilter === key
                    ? 'bg-[#CC0000] text-white'
                    : 'text-gray-500 hover:text-[#0A0A0A]'
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
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  onClick={() => { setSelectedProject(project); setActiveImage(0) }}
                >
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[#CC0000] opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
                  </div>
                  <div className={`p-5 ${rtl ? 'text-right' : ''}`}>
                    <span className="text-[#CC0000] text-[11px] font-semibold uppercase tracking-[0.2em]">
                      {t.realisations.filters[project.category as FilterKey]}
                    </span>
                    <h3 className="text-[#0A0A0A] text-lg font-bold mt-1 group-hover:text-[#CC0000] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">{project.desc}</p>
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
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-950 border border-neutral-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                      activeImage === i ? 'border-[#CC0000]' : 'border-neutral-800'
                    }`}
                  >
                    <Image src={img} alt={`${selectedProject.title} — photo ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className={`p-6 pt-2 ${rtl ? 'text-right' : 'text-left'}`}>
                <span className="text-[#CC0000] text-xs font-semibold uppercase tracking-[0.25em]">
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
