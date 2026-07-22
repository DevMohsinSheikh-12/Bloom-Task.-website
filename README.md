# Bloom Task — marketing site

Next.js marketing/landing site for Bloom Task, a mood-aware companion app that turns saved
links/notes into tasks. Dark, green/blue-accented theme with scroll-driven motion (Framer
Motion), a 3D hero (react-three-fiber), and a few MagicUI components (scroll-based velocity,
animated list, animated beam, globe).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding real app screenshots

The phone mockups throughout the site (hero, AI Companion, Saves, App Showcase) currently use
placeholder images. See `public/images/screenshots/README.md` for the exact filenames each
phone expects and where each one is used.

## Stack

- Next.js (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config — see `app/globals.css`, no `tailwind.config.*`)
- Framer Motion for scroll/entrance animation
- react-three-fiber + drei for the hero's 3D phone model
- Lenis for smooth scrolling
- Supabase for the live app-version lookup shown in the Download section
- MagicUI components (installed via the shadcn CLI registry, not npm — see
  `components/ui/*` for the raw sources and `components.json` for the CLI config)

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
