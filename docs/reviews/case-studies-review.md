# Case Studies → Sanity Migration — Review Record

**Date:** 2026-06-30
**Change:** Migrate `/case` page from hardcoded i18n strings to Sanity-driven, trilingual (en/zh/ms). Seed 2 real client case studies (Agoh/Swapper, AFFT Club).

## Files changed
- `src/sanity/schemaTypes.ts` — new `caseStudy` document type (language radio, translationGroup, order, client, industry, packageName, headline, summary, metrics[], challenge, approach, testimonial{Quote,Author,Role}). Registered in `schemaTypes` array.
- `src/sanity/client.ts` — new `getCaseStudies(lang)` (locale-whitelisted, ordered).
- `src/components/views/CaseView.tsx` — now `'use client'` receiving `cases` prop; head text still from i18n; renders metrics + optional testimonial; safe empty state.
- `src/app/[lang]/case/page.tsx` — async server component, `revalidate = 3600`, guarded Sanity fetch.
- `src/lib/i18n.ts` — `pg.case.sub` + `pg.case.disclaimer` updated (3 langs) to reflect REAL clients (removed "prototype/illustrative" claim).
- `scripts/seed-case-studies.mjs` — seeds 6 docs (2 cases × 3 langs), fixed IDs, `createOrReplace`.

## Pass 1 + Pass 2 — self review
- tsc `--noEmit` clean (twice).
- Client/server boundary OK (plain serializable data, no image asset refs in query).
- Empty state renders safely before seed runs.
- AFFT has NO testimonial (omitted in seed + gated in view) — nothing fabricated.
- Studio default `structureTool()` auto-lists `caseStudy`. All fields editable, nothing hardcoded.
- No blog/post regression (append-only schema, new query only).

## Independent senior reviewer (10M-pageview standard, "no flattery") — findings & resolution

| # | Sev | Finding | Resolution |
|---|-----|---------|------------|
| 1 | CRITICAL | `getCaseStudies` unguarded in page → a Sanity outage at build time crashes the WHOLE production build (every other Sanity fetch in repo is try/catch). | **FIXED** — wrapped in `try/catch`, falls back to `[]`, mirrors blog page. |
| 2 | HIGH | Disclaimer + sub still said "illustrative case studies for this prototype" — now false over real, named clients with an attributed testimonial. | **FIXED** — rewrote `pg.case.sub` + `pg.case.disclaimer` in en/zh/ms to honest "real client engagements, results vary, not a guarantee" wording. |
| 3 | MEDIUM | `order(order asc)` non-deterministic if a Studio-created case leaves `order` null. | **FIXED** — `order(coalesce(order, 999) asc, client asc)`. |
| 4 | MEDIUM | Shared client `useCdn: true` + `revalidate 3600` → Studio edits can lag up to ~1h+CDN. | **ACCEPTED** — low-churn case page; changing the shared client would affect blog. Documented; edits appear within the ISR window. |
| 5 | LOW | `dangerouslySetInnerHTML` on `pg.case.h1`. | **NO ACTION** — source is static developer-controlled i18n, not CMS/user input. CMS fields render as escaped text. Invariant: never route Sanity content through `dangerouslySetInnerHTML`. |
| 6 | LOW | Seed publishes directly (no draft step). | **ACCEPTED** — intended ("make it live"), idempotent. |

**Verdict after fixes:** all CRITICAL/HIGH/MEDIUM resolved or consciously accepted. tsc clean. Ready to ship pending the user running `npm run build` locally + seed script.

## Data-integrity note
- Agoh testimonial = faithful paraphrase of what the client (Goh Pei Kiat, Agoh Founder & CEO) reported; **editable in Studio** — adjust exact wording anytime.
- AFFT testimonial intentionally blank pending a real Afft contact quote.
- All numbers are the real figures the founder provided. No fabricated metrics.
