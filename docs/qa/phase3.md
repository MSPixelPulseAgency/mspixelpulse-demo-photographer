# Phase 3 verification

- Existing Next.js repository/project/domain retained. No DNS, billing, paid service, agency application or private-console code changes.
- Shared PageHero covers, 68px desktop / 64px compact navigation, 16.5px desktop links and black/white favicon suite.
- Actual content index: six collections, 64 stock frames, five licensed films, six services, eight sample packages, six articles and eight primary pages.
- Ten discovery tests plus the five existing inquiry tests pass. Lint, TypeScript and production build pass. Production dependency audit: zero vulnerabilities.
- All eight main pages checked at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px. Actual viewport widths asserted; no horizontal overflow, clipped H1s, header/H1 overlap or broken images.
- All 12 collection/article details checked at 390 and 1440px. Correct featured covers and per-route metadata.
- Search/filter panels checked at all nine widths. Mobile search suggestions, keyboard selection, Escape, focus restoration and filter drawer pass.
- Combined wedding search / Wedding Films / newest sort returns two film studies; Cinematic + Videography narrows to one. URL refresh and back/forward preserve state. Portrait title ordering, service/journal ordering and CAD/USD price/coverage ordering pass with real content.
- Filtered lightbox next/Escape/focus restoration pass. Shutter/reduced-motion and swipe code retained. Chrome first-click playback and Safari complete 12-second playback pass. Safari full-query search produces six wedding-video suggestions.
- Empty inquiry focuses the first invalid field; valid sample shows no-send/no-store/no-booking confirmation and clears values.
- Route checker passes 22 content routes, unique titles, 42 internal destinations, 192 image variants, 15 film/poster files and 404.
- All 22 page-specific OG/Twitter images return 200 at 1200×630; absolute metadata and clean canonicals checked. All requested favicon formats return 200. External social clients control preview caching/display; no test messages were sent.
- Local mobile Lighthouse Home/Portfolio: performance 90, accessibility 100, best practices 100, SEO 100; production measurements and exact release identity are recorded separately after publication.

Stock assets have no verified country, season or event year, so those controls are omitted. Styles are curatorial visual descriptors. Chronological sorts use actual catalog inclusion commits, not event dates. Responsive checks are browser emulation, not physical mobile-device proof; automated scores do not establish full WCAG compliance or field Core Web Vitals.

Same-route Next Link navigation is synchronized through a small Suspense-wrapped URL observer. Search results replace existing filters correctly; category/media/type values also accept lowercase and hyphenated shareable forms.
