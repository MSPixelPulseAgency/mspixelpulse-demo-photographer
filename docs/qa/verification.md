# AUREL FRAME redesign verification — 2026-10-13

The eight main pages, six portfolio collections and six journal articles retain functional routes and SEO. Bodoni Moda / DM Sans are self-hosted. Navigation is 18px at desktop widths; the compact drawer uses 20px labels. Body is 18px desktop and at least 16px mobile.

Lint, TypeScript, five inquiry validator tests and the production build pass. Dependency audit reports no vulnerabilities. Route checker passes 22 content routes, 22 unique titles, 33 internal destinations, 192 stock image variants, 15 film/poster files, brand assets and custom 404.

All eight main pages were checked at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px with the actual viewport width asserted. No horizontal overflow or clipped headings. All 12 detail pages were checked at 390 and 1440px. Chrome native playback and rendering also verified. Emulation is not physical mobile hardware proof.

Gallery filters, keyboard arrows and Escape, native menu dismissal, CAD/USD toggles, FAQ states and demo inquiry errors/success work. A valid sample clears entered values, sends/stores nothing and confirms no booking. Shutter feedback uses a short dark closing mask without bright flashes or navigation delay. Reduced-motion CSS disables decorative movement; films never autoplay. Offscreen playback pauses and starting another film pauses the previous one.

Final local mobile Lighthouse: performance 90, accessibility 100, best practices 100, SEO 100. LCP 3.7s, total blocking time 10ms, CLS 0. Contact accessibility/best practices/SEO are 100. Automated scores do not establish full WCAG conformance or field Core Web Vitals. Final production proof is saved outside the repository with exact deployment identity.

Stock film source permissions are recorded in src/data/films.json and public credits. Five silent H.264 clips, maximum 12 seconds, total approximately 5.7MB; responsive posters are lazy-loaded and clip URLs are assigned only after Play. Native video controls, pause buttons, poster fallback and camera loading feedback are present.
