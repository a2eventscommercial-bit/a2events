'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PhotoPlaceholder from '@/components/PhotoPlaceholder'
import { useTranslations } from '@/lib/useTranslations'

const projects = [
  {
    id: 1,
    title: 'Conférence Nationale Tech 2024',
    category: 'conference',
    desc: "Organisation complète d'une conférence de 500 participants à Alger.",
    photoCount: 4,
  },
  {
    id: 2,
    title: 'Stand Expo Construire 2024',
    category: 'stand',
    desc: "Conception et réalisation d'un stand de 200m² pour une marque de construction.",
    photoCount: 3,
  },
  {
    id: 3,
    title: "Gala de Fin d'Année Horizon",
    category: 'gala',
    desc: "Organisation d'un gala de prestige pour 300 invités au Sheraton d'Alger.",
    photoCount: 3,
  },
  {
    id: 4,
    title: 'Séminaire Leadership Corporate',
    category: 'corporate',
    desc: 'Séminaire de formation et de team building pour une équipe de 150 cadres.',
    photoCount: 3,
  },
  {
    id: 5,
    title: 'Rebranding TechStart Algeria',
    category: 'branding',
    desc: "Refonte complète de l'identité visuelle d'une startup technologique.",
    photoCount: 3,
  },
  {
    id: 6,
    title: 'Forum Investissement Algérie',
    category: 'conference',
    desc: 'Forum international avec 800 participants et 30 exposants.',
    photoCount: 3,
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
      <section className="relative pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#CC0000] text-sm font-semibold uppercase tracking-[0.4em] mb-4">Portfolio</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6">{t.realisations.title}</h1>
            <p className="text-gray-400 text-lg max-w-2xl">{t.realisations.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-30 bg-[#0A0A0A]/90 backdrop-blur-md border-y border-neutral-900 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center gap-2 overflow-x-auto pb-1 ${rtl ? 'flex-row-reverse' : ''}`}>
            {filterKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`flex-shrink-0 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                  activeFilter === key
                    ? 'bg-[#CC0000] text-white'
                    : 'text-gray-500 hover:text-white'
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
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => { setSelectedProject(project); setActiveImage(0) }}
                >
                  <div className={`relative overflow-hidden ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
                      <PhotoPlaceholder label={`Photo — ${project.title}`} />
                    </div>
                    <div className="absolute inset-0 bg-[#CC0000] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  </div>
                  <div className={`mt-5 flex items-baseline justify-between ${rtl ? 'flex-row-reverse' : ''}`}>
                    <h3 className="text-white text-xl font-bold group-hover:text-[#CC0000] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-gray-500 text-xs uppercase tracking-[0.25em]">
                      {t.realisations.filters[project.category as FilterKey]}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">{project.desc}</p>
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
                <PhotoPlaceholder label={`Photo ${activeImage + 1} — ${selectedProject.title}`} />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#CC0000] flex items-center justify-center text-white text-xl hover:bg-red-700 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 p-4 overflow-x-auto">
                {Array.from({ length: selectedProject.photoCount }).map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-14 flex-shrink-0 cursor-pointer overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-[#CC0000]' : 'border-neutral-800'
                    }`}
                  >
                    <PhotoPlaceholder label={`${i + 1}`} />
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
