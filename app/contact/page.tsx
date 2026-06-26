'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import PageHeader from '@/components/PageHeader'
import { useTranslations } from '@/lib/useTranslations'

export default function ContactPage() {
  const { t, rtl } = useTranslations()
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = `w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CC0000] transition-colors duration-200 placeholder:text-gray-500 ${rtl ? 'text-right' : 'text-left'}`

  const infoItems = [
    { icon: '📞', label: 'Téléphone', value: t.contact.info.phone },
    { icon: '✉️', label: 'Email', value: t.contact.info.email },
    { icon: '📍', label: 'Adresse', value: t.contact.info.address },
    { icon: '🕐', label: 'Horaires', value: t.contact.info.hours },
  ]

  return (
    <div className={`min-h-screen bg-[#0A0A0A] ${rtl ? 'font-arabic' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      <PageHeader eyebrow="Parlons-nous" title={t.contact.title} subtitle={t.contact.subtitle} rtl={rtl} />

      {/* Content — panneau sombre arrondi qui chevauche */}
      <section className="relative z-10 -mt-12 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] bg-neutral-950 pt-24 pb-20 shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 ${rtl ? 'lg:grid-flow-dense' : ''}`}>
            {/* Form — 3 cols */}
            <div className="lg:col-span-3">
              <SectionReveal direction={rtl ? 'right' : 'left'}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-gray-400 text-xs uppercase tracking-widest mb-2 ${rtl ? 'text-right' : 'text-left'}`}>
                        {t.contact.form.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t.contact.form.name}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={`block text-gray-400 text-xs uppercase tracking-widest mb-2 ${rtl ? 'text-right' : 'text-left'}`}>
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={t.contact.form.email}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-gray-400 text-xs uppercase tracking-widest mb-2 ${rtl ? 'text-right' : 'text-left'}`}>
                        {t.contact.form.phone}
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+213 XX XX XX XX"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={`block text-gray-400 text-xs uppercase tracking-widest mb-2 ${rtl ? 'text-right' : 'text-left'}`}>
                        {t.contact.form.service}
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="">{t.contact.form.selectService}</option>
                        {t.services.items.map((s) => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-gray-400 text-xs uppercase tracking-widest mb-2 ${rtl ? 'text-right' : 'text-left'}`}>
                      {t.contact.form.message} *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t.contact.form.message}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full text-sm uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed text-center"
                  >
                    {status === 'sending' ? t.contact.form.sending : t.contact.form.submit}
                  </button>

                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm text-center py-3 bg-green-400/10 border border-green-400/20"
                    >
                      {t.contact.form.success}
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm text-center py-3 bg-red-400/10 border border-red-400/20"
                    >
                      {t.contact.form.error}
                    </motion.p>
                  )}
                </form>
              </SectionReveal>
            </div>

            {/* Info — 2 cols */}
            <div className="lg:col-span-2">
              <SectionReveal direction={rtl ? 'left' : 'right'}>
                <div className="space-y-6">
                  {infoItems.map((item) => (
                    <div key={item.label} className={`flex items-start gap-4 ${rtl ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="w-12 h-12 bg-neutral-900 border-t-[2px] border-t-[#CC0000] flex items-center justify-center text-xl flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}

                  {/* Social links */}
                  <div className={`pt-6 border-t border-neutral-800 ${rtl ? 'text-right' : 'text-left'}`}>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">{t.footer.follow}</p>
                    <div className={`flex gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
                      <a
                        href="https://www.linkedin.com/company/a%C2%B2-events"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-[#CC0000] text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
