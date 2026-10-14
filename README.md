# AUREL FRAME

Premium editorial wedding, event and lifestyle photography studio **demo**, created by MSPixelPulse. The studio, photographer, collections, prices and feedback are fictional. The 64 licensed stock photographs are curated as thematic mood boards; Ari’s original generated portrait is disclosed. No scene is represented as real studio work.

- Live website: https://photographer.mspixelpulse.com
- Agency portfolio: https://mspixelpulse.com/projects
- Repository: https://github.com/MSPixelPulseAgency/mspixelpulse-demo-photographer

## Stack

Next.js 16 App Router, TypeScript, React, Tailwind CSS 4 with shared CSS design tokens, Lucide React. Pre-rendered pages, locally hosted responsive WebP assets, next/font Bodoni Moda and DM Sans. No database, paid integration, analytics or inquiry backend.

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

Eight main pages; six themed portfolio detail pages; six original journal articles; privacy and photography credits; custom 404. Global instant search, combined category/style/media/content filters, shareable discovery URLs, stable sorting across Portfolio/Journal/Services/Investment, native fullscreen dialog, arrow-key navigation, touch swipes, CAD/USD sample price selector, FAQ accordions, mobile dialog navigation and five user-initiated cinematic stock films with offscreen pause. Reduced-motion support, visible focus, semantic landmarks and responsive crops.

## Assets

See `ASSET-LICENSES.md` and `src/data/assets.json` for all 64 image sources and licensing. `node scripts/prepare-assets.mjs` regenerates local WebP files from the recorded Pexels sources. `node scripts/brand-assets.mjs` creates social/favicon raster derivatives from the original brand and licensed photography. `node scripts/prepare-films.mjs` regenerates the licensed MP4 clips and responsive posters (requires ffmpeg). No stock photographs or films are offered as client downloads.

## Deployment

One existing-team Vercel project: `mspixelpulse-demo-photographer`, connected to this repository, production branch `main`, framework Next.js, root `./`, install `npm install`, build `npm run build`, output auto-detected. Never apply Vite/dist settings to this Next.js app. No secrets needed. Read `.vercel/project.json` and `vercel project inspect` before deployment. Verify actual production routes and canonical alias after release. Keep Namecheap as DNS provider; update only the `photographer` CNAME using the value supplied for this exact Vercel project. Preserve unrelated DNS records and apps.

## Maintenance

AI maintenance instructions are in `.ai-agents/`. Preserve demo disclosures, local-only form behavior, per-route SEO, gallery accessibility and the shared styling system. Do not edit other agency demo repositories.

## Phase 3 discovery and sharing

The compact glass header is 68px desktop / 64px compact, with 16.5px desktop navigation. Search is a lazy-loaded, keyboard-accessible native dialog over the actual site catalog; no provider or search history storage. Portfolio combines 6 collections, 64 frames and 5 licensed films. Only supported categories and visual styles appear; stock events have no verified country or season, so those controls are omitted. Newest/oldest refer to first catalog inclusion commits (`da5dfa8` / `1d2f48b`), never event dates. Price/coverage use configured sample values; custom destination coverage sorts last.

PageHero/cover sources and 22 branded 1200×630 previews are maintained in `src/data/covers.json`. Run `node scripts/social-assets.mjs` and `node scripts/favicon-assets.mjs` to regenerate. Verify with `CHECK_URL=https://photographer.mspixelpulse.com node scripts/check-social.mjs`. Canonicals omit discovery query parameters. Standard Open Graph/Twitter metadata supports WhatsApp, iMessage, LinkedIn, Facebook and X; external apps control caching/display.
