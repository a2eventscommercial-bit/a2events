import fr from '@/locales/fr.json'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'

export type Locale = 'fr' | 'en' | 'ar'

const translations = { fr, en, ar }

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.fr
}

export const locales: Locale[] = ['fr', 'en', 'ar']
export const defaultLocale: Locale = 'fr'

export function isRTL(locale: Locale) {
  return locale === 'ar'
}
