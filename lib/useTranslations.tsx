'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Locale, defaultLocale, getTranslations, isRTL } from './i18n'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: ReturnType<typeof getTranslations>
  rtl: boolean
}

const I18nContext = createContext<I18nContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: getTranslations(defaultLocale),
  rtl: false,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    document.documentElement.lang = newLocale
    document.documentElement.dir = isRTL(newLocale) ? 'rtl' : 'ltr'
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: getTranslations(locale), rtl: isRTL(locale) }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslations() {
  return useContext(I18nContext)
}
