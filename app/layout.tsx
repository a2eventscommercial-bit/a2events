import type { Metadata } from 'next'
import { Montserrat, Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/useTranslations'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', weight: ['300', '400', '500', '600', '700', '800', '900'] })
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic', weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'A² Events — Agence Événementielle',
  description: 'Ensemble, faisons de chaque événement un moment marquant et mémorable. Organisation de conférences, stands, branding, logistique événementielle.',
  keywords: 'agence événementielle, organisation événements, conférences, stands, branding, Algérie',
  openGraph: {
    title: 'A² Events — Agence Événementielle',
    description: 'Ensemble, faisons de chaque événement un moment marquant et mémorable.',
    type: 'website',
    locale: 'fr_DZ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <head />
      <body className={`${montserrat.variable} ${notoArabic.variable} font-sans antialiased bg-neutral-950 text-white`}>
        <I18nProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </I18nProvider>
      </body>
    </html>
  )
}
