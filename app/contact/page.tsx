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
                      {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((s) => (
                        <a
                          key={s}
                          href="#"
                          className="bg-neutral-800 hover:bg-[#CC0000] text-gray-400 hover:text-white transition-all duration-300 px-3 py-2 text-xs font-semibold uppercase tracking-widest"
                        >
                          {s}
                        </a>
                      ))}
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
