# AUREL FRAME

Premium editorial wedding, event and lifestyle photography studio **demo**, created by MSPixelPulse. The studio, photographer, collections, prices and feedback are fictional. All photographs are licensed stock curated as thematic mood boards, not real studio work.

- Live website: https://photographer.mspixelpulse.com
- Agency portfolio: https://mspixelpulse.com/projects
- Repository: https://github.com/MSPixelPulseAgency/mspixelpulse-demo-photographer

## Stack

Next.js 16 App Router, TypeScript, React, Tailwind CSS 4 with shared CSS design tokens, Lucide React. Pre-rendered pages, locally hosted responsive WebP assets, next/font Cormorant Garamond and Manrope. No database, paid integration, analytics or inquiry backend.

## Development

```sh
npm install
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

Node 22–24. Data in `src/data`, reusable UI and client interactions in `src/components`, routes in `src/app`. Inquiry validation is a pure tested function. A successful sample form resets the fields and sends/stores nothing.

## Pages & interactions

Eight main pages; six themed portfolio detail pages; six original journal articles; privacy and photography credits; custom 404. Gallery category filters, native fullscreen dialog, arrow-key navigation, touch swipes, CAD/USD sample price selector, FAQ accordions, mobile dialog navigation and pausable animated photography sequence. Reduced-motion support, visible focus, semantic landmarks and responsive crops.

## Assets

See `ASSET-LICENSES.md` and `src/data/assets.json` for all 64 image sources and licensing. `node scripts/prepare-assets.mjs` regenerates local WebP files from the recorded Pexels sources. `node scripts/brand-assets.mjs` creates social/favicon raster derivatives from the original brand and licensed photography. No stock photographs are available as client downloads.

## Deployment

One existing-team Vercel project: `mspixelpulse-demo-photographer`, connected to this repository, production branch `main`, framework Next.js, root `./`, install `npm install`, build `npm run build`, output auto-detected. Never apply Vite/dist settings to this Next.js app. No secrets needed. Read `.vercel/project.json` and `vercel project inspect` before deployment. Verify actual production routes and canonical alias after release. Keep Namecheap as DNS provider; update only the `photographer` CNAME using the value supplied for this exact Vercel project. Preserve unrelated DNS records and apps.

## Maintenance

AI maintenance instructions are in `.ai-agents/`. Preserve demo disclosures, local-only form behavior, per-route SEO, gallery accessibility and the shared styling system. Do not edit other agency demo repositories.
