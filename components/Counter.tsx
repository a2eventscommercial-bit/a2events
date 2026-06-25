'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: string
  className?: string
}

/**
 * Compteur qui s'incrémente de 0 jusqu'à la valeur cible quand il entre à l'écran.
 * Gère les valeurs type "50+", "100%", "5+".
 */
export default function Counter({ value, className = '' }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const match = value.match(/(\d+)/)
    if (!match) {
      setDisplay(value)
      return
    }
    const target = parseInt(match[1], 10)
    const suffix = value.slice(match.index! + match[0].length)
    const prefix = value.slice(0, match.index!)
    const duration = 1400
    const start = performance.now()

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
