import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

/** Référence d'image Sanity (objet asset ou URL) */
type SanityImageSource = { asset?: { _ref?: string } } | Record<string, unknown> | string

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7u84bu03'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

/** Sanity est-il configuré ? (sinon on retombe sur le contenu en dur) */
export const sanityEnabled = Boolean(projectId)

export const sanityClient: SanityClient | null = sanityEnabled
  ? createClient({ projectId: projectId!, dataset, apiVersion, useCdn: true })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

/** Construit une URL d'image Sanity (largeur optionnelle) */
export function urlFor(source: SanityImageSource, width?: number): string {
  if (!builder) return ''
  let img = builder.image(source).auto('format').fit('max')
  if (width) img = img.width(width)
  return img.url()
}

// ---- Types ----
export interface SanityRealisation {
  _id: string
  title: string
  category: string
  desc?: string
  images: SanityImageSource[]
}

export interface SanityClientLogo {
  _id: string
  name?: string
  orientation?: 'horizontal' | 'vertical'
  logo: SanityImageSource
}

// ---- Requêtes ----
const realisationsQuery = `*[_type == "realisation"] | order(coalesce(order, 999) asc, _createdAt desc){
  _id, title, category, desc, images
}`

const clientsQuery = `*[_type == "clientLogo"] | order(coalesce(order, 999) asc, _createdAt desc){
  _id, name, orientation, logo
}`

export async function getRealisations(): Promise<SanityRealisation[]> {
  if (!sanityClient) return []
  try {
    return await sanityClient.fetch(realisationsQuery, {}, { next: { revalidate: 60 } })
  } catch {
    return []
  }
}

export async function getClientLogos(): Promise<SanityClientLogo[]> {
  if (!sanityClient) return []
  try {
    return await sanityClient.fetch(clientsQuery, {}, { next: { revalidate: 60 } })
  } catch {
    return []
  }
}
