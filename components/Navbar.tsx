'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from '@/lib/useTranslations'
import type { Locale } from '@/lib/i18n'

export default function Navbar() {
  const { t, locale, setLocale, rtl } = useTranslations()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between h-20 ${rtl ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <span className="text-white font-black text-xl tracking-tight">
              A<sup className="text-[#CC0000]">²</sup> Events
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex items-center gap-10 ${rtl ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white text-[13px] font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: langues + bouton chat */}
          <div className={`flex items-center gap-5 ${rtl ? 'flex-row-reverse' : ''}`}>
            <div className="hidden sm:flex items-center gap-1">
              {langs.map((lang, i) => (
                <span key={lang.code} className="flex items-center">
                  <button
                    onClick={() => setLocale(lang.code)}
                    className={`text-[11px] font-semibold tracking-widest px-1 transition-colors duration-200 ${
                      locale === lang.code ? 'text-[#CC0000]' : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                  {i < langs.length - 1 && <span className="text-gray-700 text-[11px]">|</span>}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className="hidden lg:inline-block border border-neutral-700 text-white text-[12px] px-5 py-2.5 hover:bg-[#CC0000] hover:border-[#CC0000] transition-all duration-300"
            >
              {t.home.chat}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-[#0A0A0A] border-t border-neutral-900 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className={`px-6 py-6 flex flex-col gap-5 ${rtl ? 'items-end' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-[#CC0000] text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2">
            {langs.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`text-xs font-semibold tracking-widest px-2 py-1 border transition-colors ${
                  locale === lang.code
                    ? 'text-[#CC0000] border-[#CC0000]'
                    : 'text-gray-500 border-neutral-800'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
