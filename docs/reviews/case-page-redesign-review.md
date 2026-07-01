# Case Study Page Redesign — Review Record

**Date:** 2026-07-01
**Pipeline:** Website/settings change → engineering-first (Ms Y↔Mr T ×2 → Mr Z → Ms K)
**Goal alignment:** Elevate case proof to drive Exclusive-package client acquisition (5 in 3 months).

## Change
Redesign `/case` (kept Sanity-driven, trilingual). New interactive UI reusing existing design tokens only (no site-wide design change — user is satisfied with current design and it is LOCKED until they ask):
- Tab switcher between case studies (Agoh ⇄ AFFT)
- Animated count-up metric grid (aligned, responsive) — fixes the "numbers untidy" complaint
- Challenge / What Zeta Did narrative blocks (new Sanity fields)
- Lime-accent testimonial (AFFT now has Mr Jack quote)
- CTA band → free audit (funnel to Exclusive)
- H1 trailing period removed in all 3 languages

## Files
- `src/components/views/CaseView.tsx` — rewritten (tabs, MetricValue count-up, narrative, testimonial, CTA)
- `src/app/globals.css` — new `cs-*` classes (namespaced, no collision)
- `src/lib/i18n.ts` — pg.case.h1 period removed (en/ms; zh already none) + 4 new keys ×3 (challenge, approach, ctaTitle, ctaBtn)
- `scripts/seed-case-studies.mjs` — added challenge/approach ×3 both cases + AFFT testimonial (Mr Jack)
- `src/sanity/client.ts` — getCaseStudies already projects challenge/approach (no change needed)

## Ms Y ↔ Mr T — 2 rounds, concur
**Round 1**
- Count-up: `MetricValue` uses rAF with `cancelAnimationFrame` cleanup — no leak. Initial state = raw string → SSR/client first render match, no hydration mismatch.
- Tab switch re-animates via `key={c._id}` remount; `cfade` keyframe on mount.
- Empty state: `cases.length > 0` gate; head + disclaimer still render if none. Guarded fetch in page.tsx unchanged.
- Regex `^([^\d]*)(\d[\d,]*)(.*)$` handles "100K+", "+220%", "30万+", "90%", "2-mo", and non-numeric "GBP" (renders as-is).
**Round 2 (edge cases)**
- Live Sanity docs lack challenge/approach/AFFT-testimonial until re-seed → narrative falls back to `summary`, approach/testimonial hidden. **Degrades gracefully**, no break. Full content appears after `seed-case-studies.mjs` re-run.
- `idx` clamped; single-case hides switcher; metric value undefined → safe.
- `Link href={/${lang}/contact}` — lang always set on /case; contact route exists.
- tsc `--noEmit` clean.
**Concurrence:** both agree SHIP. No CRITICAL/HIGH open.

## Mr Z (marketing) — PASS
Animated results draw the eye to proof; tab + trilingual keep engagement; testimonial builds trust; CTA "Ready to be our next case study?" funnels to free audit. Strengthens client-acquisition narrative.

## Ms K (business) — PASS
CTA → contact/lead form → sales → Exclusive. Page now foregrounds full-stack outcomes (Agoh) + advisory value (AFFT), positioning the Exclusive tier. Aligned to 5-Exclusive-in-3-months goal.

## Residual (accepted, LOW)
- Very small screens keep 2-col metric grid (no 1-col rule). Acceptable — clamp scales font.

## Post-deploy action required
- User must re-run `SANITY_WRITE_TOKEN=… node scripts/seed-case-studies.mjs` to populate challenge/approach + AFFT testimonial. Until then the page shows the new UI with summary-only narrative and no AFFT quote.

**Verdict:** SHIP (design tokens unchanged; site design remains locked).
