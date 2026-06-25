'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Fine barre rouge en haut qui se remplit selon la progression du scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#CC0000] origin-left z-[60]"
    />
  )
}
