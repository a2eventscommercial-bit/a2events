'use client'

interface Props {
  items: string[]
  reverse?: boolean
  light?: boolean
}

/**
 * Bande de texte défilante en boucle infinie (effet "marquee" tendance).
 */
export default function Marquee({ items, reverse = false, light = false }: Props) {
  const sequence = [...items, ...items, ...items, ...items]

  return (
    <div
      className={`relative overflow-hidden py-6 ${light ? 'bg-[#F2F2F2]' : 'bg-[#CC0000]'} select-none`}
    >
      <div
        className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`mx-8 text-2xl sm:text-4xl font-black uppercase tracking-tight ${
                light ? 'text-[#0A0A0A]' : 'text-white'
              }`}
            >
              {item}
            </span>
            <span className={`text-xl ${light ? 'text-[#CC0000]' : 'text-white/60'}`}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
