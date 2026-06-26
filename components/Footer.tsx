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

  const linkedinUrl = 'https://www.linkedin.com/company/a%C2%B2-events'

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

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-[#CC0000] hover:border-[#CC0000] transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
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
