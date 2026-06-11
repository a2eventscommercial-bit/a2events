# A² Events — Site Web Agence Événementielle

Site web complet pour l'agence événementielle **A² Events**, construit avec Next.js 14, Tailwind CSS et Framer Motion.

## Stack technique

- **Next.js 14** (App Router)
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **Resend** — envoi d'emails via le formulaire de contact
- **next/image** — optimisation des images
- i18n maison : FR / AR / EN (JSON-based, sans dépendance externe)

## Structure du projet

```
/app          → pages (Home, Services, Réalisations, À Propos, Contact)
/app/api      → route handler pour le formulaire de contact (Resend)
/components   → Navbar, Footer, HeroSection, SectionReveal, WhatsAppButton
/lib          → i18n.ts, useTranslations.tsx
/locales      → fr.json, ar.json, en.json
/public       → logo et assets statiques
```

## Installation locale

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.example .env.local
# → renseigner RESEND_API_KEY avec votre clé Resend

# 3. Lancer le serveur de développement
npm run dev
```

Le site est disponible sur http://localhost:3000.

## Variables d'environnement

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'emails (resend.com) |

## Déploiement sur Vercel

### Option 1 — Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2 — GitHub → Vercel

1. Pousser le code sur GitHub
2. Importer le repo sur vercel.com/new
3. Ajouter la variable d'environnement `RESEND_API_KEY` dans les settings Vercel
4. Déployer — Vercel détecte Next.js automatiquement

## Configuration Resend

1. Créer un compte sur resend.com
2. Ajouter et vérifier votre domaine (`a2events.dz`)
3. Générer une API Key
4. Renseigner `RESEND_API_KEY` dans `.env.local` (dev) et dans les vars Vercel (prod)
5. Mettre à jour l'adresse `from:` dans `/app/api/contact/route.ts` avec votre domaine vérifié

## Personnalisation

- **Logo** : placer le fichier dans `/public/logo.png` et remplacer le bloc `A²` dans Navbar/Footer
- **Couleurs** : modifier les variables dans `globals.css` et `tailwind.config.ts`
- **Contenu** : éditer les fichiers JSON dans `/locales/`
- **Images** : remplacer les URLs Unsplash par vos propres photos dans les pages
- **WhatsApp** : mettre à jour le numéro dans `/components/WhatsAppButton.tsx`
- **Email de destination** : mettre à jour `to:` dans `/app/api/contact/route.ts`

## Pages

| Route | Description |
|---|---|
| `/` | Page d'accueil avec hero animé, services, portfolio, témoignages |
| `/services` | Les 8 services avec descriptions extensibles |
| `/realisations` | Portfolio filtrable avec galerie modale |
| `/a-propos` | Histoire, valeurs, équipe, chiffres clés |
| `/contact` | Formulaire de contact + infos |
| `/api/contact` | API Route pour l'envoi d'email via Resend |
| `/sitemap.xml` | Sitemap généré automatiquement |
