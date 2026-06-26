'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from '@/lib/useTranslations'

export default function Footer() {
  const { t, rtl } = useTranslations()

  const navLinks = [
    { href: '/services', label: t.nav.services },
    { href: '/realisations', label: t.nav.realisations },
    { href: '/a-propos', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ]

  const socials = [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'YouTube', href: '#' },
  ]

  return (
    <footer className="bg-[#0A0A0A] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 ${rtl ? 'lg:flex-row-reverse text-right' : ''}`}>
          {/* Brand */}
          <div>
            <Link href="/" className={`flex items-center gap-2.5 ${rtl ? 'flex-row-reverse justify-end' : ''}`}>
              <Image src="/logos/logo-white-transparent.svg" alt="A² Events" width={40} height={40} className="h-10 w-10" />
              <span className="text-white font-black text-xl tracking-tight">A² Events</span>
            </Link>
            <p className="text-gray-600 text-sm mt-3">{t.footer.tagline}</p>
          </div>

          {/* Nav */}
          <nav className={`flex flex-wrap items-center gap-8 ${rtl ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className={`flex items-center gap-6 ${rtl ? 'flex-row-reverse' : ''}`}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-gray-600 hover:text-[#CC0000] text-sm transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className={`mt-14 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 ${rtl ? 'sm:flex-row-reverse' : ''}`}>
          <p className="text-gray-700 text-xs">
            © {new Date().getFullYear()} A² Events — {t.footer.rights}
          </p>
          <p className="text-gray-700 text-xs">
            {t.contact.info.email} · {t.contact.info.phone}
          </p>
        </div>
      </div>
    </footer>
  )
}
