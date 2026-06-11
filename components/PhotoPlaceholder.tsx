'use client'

interface Props {
  label?: string
  className?: string
}

/**
 * Bloc temporaire en attendant les vraies photos.
 * Pour remplacer : substituer ce composant par <Image src="/photos/xxx.jpg" fill className="object-cover" />
 */
export default function PhotoPlaceholder({ label = 'Photo à venir', className = '' }: Props) {
  return (
    <div
      className={`relative w-full h-full bg-neutral-900 flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Motif diagonal subtil */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #CC0000 0, #CC0000 1px, transparent 1px, transparent 24px)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-3 text-neutral-600">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <circle cx="9" cy="10" r="1.5" />
          <path d="M3 16l5-4 4 3 4-4 5 5" />
        </svg>
        <span className="text-xs uppercase tracking-[0.25em]">{label}</span>
      </div>
    </div>
  )
}
