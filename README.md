# Aesken Webdienste — Marketing Site

Next.js marketing site for Aesken: service landing, service detail pages, and contact flows.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description        |
| -------------- | ------------------ |
| `npm run dev`  | Development server |
| `npm run build`| Production build   |
| `npm run start`| Run production     |
| `npm run lint` | ESLint             |

## Main routes

- `/` — Home
- `/service` — Services overview
- `/service/wix-webdesign` — Wix Webdesign & UI/UX
- `/service/domain-email` — Domain & E-Mail
- `/service/technische-integrationen` — Integrations
- `/service/rechtliche-einrichtung` — Recht & Datenschutz (minimal hero)

Design notes live under `design-system/aesken/`.

## Deploy

Optimized for [Vercel](https://vercel.com); any Node host that supports Next.js 16 works after `npm run build`.