# InfoBit Systems — Website

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-modules-CC6699?logo=sass&logoColor=white)
![License](https://img.shields.io/badge/license-Proprietary-red)

Marketing website for **InfoBit Systems**, a platform engineering consultancy focused on high-traffic backend systems, cloud-native infrastructure and architecture.

Built with **Next.js 16** (App Router, React Server Components), **React 19**, **TypeScript** and **SCSS modules**.

> 🔒 **Published as a portfolio reference.** The source is public for review, but it is not licensed for reuse — see [LICENSE](./LICENSE).

🌐 Live: **[infobit.systems](https://infobit.systems)**

## Tech stack

- **Framework:** Next.js 16 (App Router, React Server Components)
- **Language:** TypeScript
- **Styling:** SCSS modules + design tokens (`src/styles/_tokens.scss`)
- **Fonts:** `next/font` (Cormorant Garamond, DM Sans, Syne) — self-hosted
- **Email:** Nodemailer (Gmail SMTP) for the contact form
- **Analytics:** Google Tag Manager + GA4
- **Build:** Next.js standalone output

## Highlights

- **Content-as-config** — all site content (services, FAQ, metrics, navigation) lives in a single source of truth: `src/lib/config.ts`.
- **Hardened contact API** — per-IP rate limiting, input validation, HTML escaping and email-header-injection protection (`src/app/api/contact/route.ts`).
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (`next.config.ts`).
- **SEO & a11y** — JSON-LD structured data, OpenGraph/Twitter metadata, semantic markup, skip-link and optimized font loading.
- **Canvas graphics** — lightweight animated graphics rendered on `<canvas>` (`src/components/graphics/`).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example` for the full list.

| Variable | Purpose |
|----------|---------|
| `SMTP_USER` | Gmail address used to send contact-form mail |
| `SMTP_PASSWORD` | Gmail [App Password](https://myaccount.google.com/apppasswords) |
| `CONTACT_RECEIVER` | Where contact submissions are delivered (defaults to `SMTP_USER`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (used for SEO / metadata) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (optional) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID — only used if GTM is not set (optional) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/              # App Router pages, layouts, API routes, metadata
│   ├── api/contact/  # Contact form endpoint (Nodemailer)
│   ├── services/     # Services list + dynamic [slug] detail pages
│   ├── about/        # About page
│   └── contact/      # Contact page
├── components/
│   ├── layout/       # Navbar, Footer, MobileMenu
│   ├── sections/     # Homepage sections (Hero, Problems, FAQ, …)
│   ├── graphics/     # Canvas-based animated graphics
│   └── ui/           # Reusable UI (Button, Icon, ContactForm, …)
├── hooks/            # Custom React hooks
├── lib/config.ts     # Single source of truth for all site content
├── styles/           # Global styles + design tokens
└── types/            # Shared TypeScript types
```

**All site content lives in `src/lib/config.ts`** — edit content there rather than in components.

## License

© 2026 InfoBit Systems. All rights reserved. This source is published publicly as a portfolio and reference work only — not licensed for reuse. See [LICENSE](./LICENSE).
