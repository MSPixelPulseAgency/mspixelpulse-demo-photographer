# AUREL FRAME release QA

October 13, 2026. QA used the local Next.js production build and Chromium browser emulation, with the final shared design/assets. Screenshots are real rendered pages.

- Typecheck, ESLint, production build and five inquiry validator tests pass.
- npm audit reports zero vulnerabilities across all dependencies.
- All 22 content routes return 200, have one H1 and unique titles/descriptions/canonicals. 32 unique internal destinations pass; missing route returns custom 404.
- 192 stock image variants pass HTTP/content-type checks. Original generated Ari portrait and brand assets render in browser.
- Home and seven main pages: no horizontal overflow at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 pixels. Six collection and six journal details pass at 390 and 1440.
- Mobile menu opens, exposes all eight destinations, confines focus via native modal dialog, and closes with Escape. Lightbox category filtering, image counter, next/previous arrow keys and Escape tested. Touch swipe handlers are implemented; hardware touch testing was not performed.
- CAD/USD sample-price selector and FAQ expanded states tested in browser.
- Empty inquiry gives accessible errors; valid sample details produce truthful no-send/no-storage/no-booking confirmation and clear entered fields. No submission API or storage code exists.
- Reduced-motion CSS/sequence behavior implemented. No autoplay audio/video or third-party trackers.
- Lighthouse mobile simulation: performance 88, accessibility 100, best practices 100, SEO 100; LCP 3.8s, TBT 90ms, CLS 0. Scores are laboratory measurements, not field Core Web Vitals.

See JSON responsive evidence and screenshots alongside this report. Actual production verification is performed after publishing and recorded in the delivery report. Safari is checked separately when available; browser emulation is not physical-device proof.
