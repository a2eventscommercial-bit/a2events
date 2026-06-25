'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from '@/lib/useTranslations'
import type { Locale } from '@/lib/i18n'

export default function Navbar() {
  const { t, locale, setLocale, rtl } = useTranslations()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/services', label: t.nav.services },
    { href: '/realisations', label: t.nav.realisations },
    { href: '/a-propos', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ]

  const langs: { code: Locale; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
    { code: 'en', label: 'EN' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`flex items-center justify-between gap-4 w-full max-w-5xl rounded-full transition-all duration-500 border ${
          scrolled
            ? 'bg-black/40 backdrop-blur-xl border-white/15 shadow-lg shadow-black/30 py-2.5 px-4'
            : 'bg-white/5 backdrop-blur-md border-white/10 py-3 px-5'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 ps-1">
          <Image src="/logo.svg" alt="A² Events" width={36} height={36} className="h-9 w-9" priority />
          <span className="text-white font-black text-lg tracking-tight hidden sm:inline">A² Events</span>
        </Link>

        {/* Desktop Nav — glass pill with fluid sliding indicator */}
        <nav
          className={`hidden lg:flex items-center gap-1 ${rtl ? 'flex-row-reverse' : ''}`}
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((link) => {
            const active = pathname === link.href
            const isHi = hovered === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className="relative px-4 py-2 text-[13px] font-medium transition-colors duration-200"
              >
                {isHi && (
                  <motion.span
                    layoutId="nav-glass"
                    className="absolute inset-0 rounded-full bg-white/15 border border-white/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${active ? 'text-[#CC0000]' : 'text-gray-200 hover:text-white'}`}>
                  {link.label}
                </span>
                {active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#CC0000]" />}
              </Link>
            )
          })}
        </nav>

        {/* Right */}
        <div className={`flex items-center gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
          <div className="hidden sm:flex items-center gap-0.5">
            {langs.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`text-[11px] font-semibold tracking-widest px-1.5 py-1 rounded-full transition-all duration-200 ${
                  locale === lang.code ? 'text-[#CC0000]' : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <Link
            href="/contact"
            className="hidden lg:inline-block bg-white/10 border border-white/20 text-white text-[12px] px-5 py-2 rounded-full hover:bg-[#CC0000] hover:border-[#CC0000] transition-all duration-300"
          >
            {t.home.chat}
          </Link>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2" aria-label="Menu">
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu — glass panel */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: -10, pointerEvents: 'none' }}
        transition={{ duration: 0.25 }}
        className="lg:hidden absolute top-20 left-4 right-4 bg-black/70 backdrop-blur-xl border border-white/15 rounded-3xl p-6"
      >
        <nav className={`flex flex-col gap-4 ${rtl ? 'items-end' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${pathname === link.href ? 'text-[#CC0000]' : 'text-gray-200 hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-3 mt-1 border-t border-white/10 w-full">
            {langs.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`text-xs font-semibold tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
                  locale === lang.code ? 'text-[#CC0000] border-[#CC0000]' : 'text-gray-400 border-white/15'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </nav>
      </motion.div>
    </header>
  )
}
