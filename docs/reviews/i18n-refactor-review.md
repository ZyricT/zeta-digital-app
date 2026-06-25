# i18n Refactor Review — `i18n-routes` branch

**Reviewer:** Senior Web Dev (production, 10M+ pageviews)
**Scope:** Full code + architecture review of the locale-prefixed routing refactor.
**Verdict (short):** Do **not** merge as-is. Build passes, but there are real SEO-breaking and UX-breaking defects. Fix the CRITICAL + HIGH items first.

---

## PASS 1 — Full read-through

### CRITICAL

**C1. `<html lang>` is hardcoded `"en"` for every page — wrong for /zh and /ms on server render.**
`src/app/layout.tsx:83` → `<html lang="en">`. The root layout wraps `[lang]` so it renders for all locales. On first server render (the version Googlebot, Bingbot, ChatGPT/Perplexity crawlers, and screen readers actually consume), a `/zh/services` page declares `lang="en"`. `LanguageProvider.tsx:33-35` patches `document.documentElement.lang` in a `useEffect` — but that runs **client-side only, after hydration**. Crawlers and the initial DOM are wrong.
- **SEO/AEO impact:** Google uses `html lang` as a hint for language targeting; AI answer engines and accessibility tools read it from raw HTML. You are telling the world your Chinese and Malay pages are English. This undercuts the entire point of the refactor.
- **Fix:** App Router cannot set `<html lang>` from a `[lang]` segment if `<html>` lives in the shared root layout. Two correct options:
  1. Move `<html>`/`<body>` into `src/app/[lang]/layout.tsx` and make the root layout a pass-through (or restructure so each locale layout owns the document). Set `<html lang={HTML_LANG[lang]}>`.
  2. Keep root layout minimal and render `<html lang>` in the `[lang]` layout; non-prefixed routes (`/blog`, `/thank-you`) get their own layout with the stored/default lang.
  Note the blog/thank-you routes are NOT under `[lang]`, so whatever solution you pick must still give those a sane `lang` on the server.

**C2. Blog hreflang uses raw `en`/`zh`/`ms` as language codes — invalid hreflang.**
`src/app/blog/[slug]/page.tsx:27-28` builds `languages[tr.language] = ...` where `tr.language` comes from Sanity as `'en' | 'zh' | 'ms'` (`schemaTypes.ts:35`). Next emits `<link rel="alternate" hreflang="zh" href=...>`. `hreflang="zh"` is technically tolerated but `hreflang="ms"` and bare `zh` are inconsistent with the marketing pages, which correctly use `en-MY` / `zh-Hans` / `ms-MY` (`seo.ts:101-105`). Worse: **there is no `x-default`** and **no self-referencing alternate guarantee** for the current post unless its own language happens to be in the translation group (it should be, but if a post has no `translationGroup`, it gets zero alternates and no canonical-language signal).
- **Impact:** Inconsistent/invalid hreflang across the site confuses Google's cluster detection. Marketing says `zh-Hans`; blog says `zh`. They won't be treated as the same language target.
- **Fix:** Map Sanity language → BCP-47 the same way `seo.ts` does (`en→en-MY`, `zh→zh-Hans`, `ms→ms-MY`), add `x-default` pointing at the English post, and ensure the current post is always present in its own alternates.

### HIGH

**H1. Middleware redirects are 307 (temporary), not 308 — bad for migrating indexed URLs.**
`src/middleware.ts:20` → `NextResponse.redirect(url)` defaults to **307**. The old unprefixed URLs (`/services`, `/packages`, `/about`, `/case`, `/contact`, `/`) are presumably already indexed by Google and linked from llms.txt and possibly backlinks. A 307 tells search engines "this move is temporary; keep the old URL indexed." For a permanent restructure you want **308** (permanent, method-preserving) so link equity transfers and the old URLs drop out.
- **Fix:** `NextResponse.redirect(url, 308)`.

**H2. Language switch on prefixed pages drops the query string.**
`LanguageProvider.tsx:41-44`: on switch it does `pathname.split('/')`, swaps `parts[1]`, and `router.push(parts.join('/'))`. `usePathname()` returns the path **without** the query string. So a user on `/en/contact?pkg=Scale` who switches to 中 lands on `/zh/contact` — the `pkg=Scale` pre-fill is lost (`LeadForm.tsx:14-17` reads `?pkg`). Same for any future tracked params (utm, gclid).
- **Impact:** Lost lead context on language switch; degraded attribution. This is a direct conversion bug given packages deep-link with `?pkg=`.
- **Fix:** Preserve search: read `useSearchParams()` (or `window.location.search`) and append it to the pushed URL. Also preserve hash if used.

**H3. Invalid locale (e.g. `/xx/services`) 404s instead of redirecting — and produces a hard 404 for crawlers hitting typo/legacy locale prefixes.**
`middleware.ts:15` only short-circuits when the first segment is a *valid* locale. `/xx/services` is not excluded, not a valid locale, and does not start with `/en|/zh|/ms`, so the middleware rewrites it to `/en/xx/services` (line 19 prepends `/en` to the whole path). That route doesn't exist → 404. Meanwhile `/en/xx` (valid locale, bad sub-path) hits `[lang]/layout.tsx:15` which passes `isLocale` then 404s on the missing page. Behavior is inconsistent and `/xx/...` becomes `/en/xx/...` 404 rather than a clean redirect to `/en/...`.
- **Impact:** Minor SEO noise (soft-404-ish chains), and the redirect target `/en/xx/services` is a nonsense URL that could get crawled.
- **Fix:** In middleware, if segment 1 looks like a locale attempt but is invalid, strip it and redirect to `/en/<rest>`; otherwise treat unprefixed as today. At minimum don't manufacture `/en/xx/...` paths.

**H4. `og:locale` for Chinese is `zh_CN` while hreflang is `zh-Hans` and the audience is Malaysia.**
`locale.ts:16` `OG_LOCALE.zh = 'zh_CN'`; `seo.ts:117` uses it. The brand serves **Malaysian** Chinese readers. `zh_CN` signals Mainland China to Facebook/OG consumers, and it's inconsistent with `zh-Hans` hreflang and the `inLanguage: ['en-MY','zh','ms']` in the JSON-LD (`layout.tsx:75`). Pick one representation and be consistent. There is no `zh-MY` standard OG locale, but `zh_Hans_MY` is not valid OG either — OG wants `language_TERRITORY`. Reasonable choice: keep `zh_CN` only if you accept the China signal, else drop territory. Flag for a decision; current state is internally inconsistent.
- **Fix:** Decide on a canonical zh representation. Recommend `zh-Hans` for hreflang (good) and document the OG tradeoff; align the JSON-LD `inLanguage` to `['en-MY','zh-Hans','ms-MY']`.

**H5. `llms.txt` still advertises the OLD unprefixed URLs.**
`public/llms.txt` lists `https://nothingimpossible.com.my/services`, `/packages`, `/case`, `/contact`. These now 307-redirect to `/en/...`. AI crawlers reading llms.txt get redirect chains and a homepage that's actually `/en`. The whole point of llms.txt is to hand AI engines clean canonical URLs.
- **Fix:** Update llms.txt to the canonical `/en/...` URLs (or list all three locales). Update after deciding redirect strategy.

### MEDIUM

**M1. Blog uses localStorage lang; marketing uses URL lang — split-brain language state.**
`LanguageProvider.tsx:19-31`: on `/blog`, `urlLang` is null, so lang comes from `localStorage`. A first-time visitor (no storage) lands on `/blog` in English even if they came from `/zh/...`. Crawlers (no localStorage) always see English blog chrome. The blog content itself is per-document language, but nav/footer/CTA labels (`SiteShell` via `t()`) render in whatever the stored lang is — non-deterministic for users, always-English for bots.
- **Impact:** Inconsistent UX; SSR always-English chrome on blog regardless of post language. Mismatched experience between marketing and blog.
- **Fix (architectural):** Either move blog under `[lang]` too, or set the blog's `t()` language from the post's `language` field server-side and pass it down, rather than relying on client localStorage.

**M2. Active-nav comparison is brittle.**
`SiteShell.tsx:171` `pathname === href`. `href` is `/en/services`; `pathname` from `usePathname()` is `/en/services` — fine for exact, but the home logo/`/en` and any trailing-slash or nested route (e.g. a future `/en/services/seo`) won't highlight. Also the Blog link (`/blog`) won't be active on `/blog/[slug]`. Minor, but the active state is half-working.
- **Fix:** Use `pathname.startsWith(href)` with care for the home route, or compare normalized segments.

**M3. Thank-you "Back to Homepage" link goes to `/` → forces an extra redirect hop.**
`thank-you/page.tsx:20` `href="/"`. Clicking it hits middleware → 307 → `/en`. Works, but adds a redirect and loses the user's actual language (they may have submitted from `/ms/contact`). The thank-you page has no locale context.
- **Fix:** Carry locale into thank-you (query param or move it under `[lang]`), link back to `/${lang}`.

**M4. `inLanguage` JSON-LD mismatch.**
`layout.tsx:75` `inLanguage: ['en-MY', 'zh', 'ms']` — mixes a BCP-47 region tag with bare codes, and doesn't match hreflang (`en-MY`/`zh-Hans`/`ms-MY`). Tidy for consistency.

**M5. Sitemap omits hreflang alternates.**
`sitemap.ts` emits 3 locales × 6 routes as flat URLs with no `alternates.languages`. Next's `MetadataRoute.Sitemap` supports `alternates` for hreflang in sitemaps. Without it, Google must rely solely on on-page hreflang. Marketing pages emit on-page hreflang (good), so this is not fatal, but adding sitemap alternates strengthens cluster detection. Blog posts get **no** hreflang in the sitemap at all.

### LOW

**L1. `metadataBase` only in root layout — confirm canonical resolution.** `seo.ts` uses absolute `SITE` URLs for canonical/alternates (good, avoids `metadataBase` dependency). Blog `generateMetadata` uses a **relative** `canonical: /blog/${post.slug}` (`blog/[slug]/page.tsx:32`) which relies on `metadataBase` — fine, but inconsistent with marketing's absolute style. Keep one convention.

**L2. `getTranslations` has no `x-default` and silently degrades.** If a post lacks `translationGroup`, `trans=[]`, alternates `undefined`. Acceptable fallback but means single-language posts emit zero hreflang and no x-default. Covered under C2.

**L3. Custom-cursor/scroll `useEffect` in SiteShell binds once (`[]`) but reads `isStudio` from closure (`SiteShell.tsx:42-63`).** Not i18n-related; pre-existing. Skipping.

**L4. `EXCLUDE` in middleware lists `/blog` but the matcher already runs on everything except `_next/static|_next/image|favicon.ico`.** Works, but `apple-touch-icon.png`, `icon-512.png`, `favicon.svg`, `robots.txt`, `llms.txt`, `sitemap.xml` are saved only by the `pathname.includes('.')` check (`middleware.ts:11`). That's correct for dotted files but fragile — e.g. App Router `icon`/`apple-icon` routes without extensions would be caught. Currently you use static files with extensions, so OK. Flagging the fragility.

---

## PASS 2 — Re-review, corrections, and new findings

### Corrections to Pass 1
- **H3 re-check:** Confirmed. `middleware.ts:19` is `url.pathname = '/en' + pathname`. For `/xx/services` the output is `/en/xx/services`. There is no route for that, so it's a 404 after a redirect — a redirect-to-404, which is worse than a direct 404 (wastes crawl budget, can look like a soft 404). Severity stands at HIGH.
- **C1 re-check:** Confirmed the `useEffect` lang patch is purely cosmetic for client navigation and does nothing for SSR/crawlers. Severity stands at CRITICAL.
- **H4 nuance:** `zh-Hans` is a script subtag (valid hreflang per Google, which accepts ISO-639 + optional script/region). So `zh-Hans` is acceptable for hreflang; the real inconsistency is OG `zh_CN` vs JSON-LD `zh` vs hreflang `zh-Hans`. Keeping HIGH because of cross-signal inconsistency, but the marketing hreflang itself is valid.

### New findings (missed in Pass 1)

**C3 (CRITICAL). Duplicate-content risk: `/` and `/en` both resolve, and old URLs both 307 — but is `/en` canonical-consistent?**
The homepage canonical is `${SITE}/en` (`seo.ts:110`, route `''`). Good — self-referencing per locale. BUT the **root** `layout.tsx:7-25` ALSO exports a full `metadata` block with its own `title`/`description`/`openGraph` and **no canonical**, **no alternates**. Because `[lang]/page.tsx` exports `generateMetadata`, Next merges: the page-level `title`/`canonical` win, but the root `openGraph.url: 'https://nothingimpossible.com.my'` (`layout.tsx:19`) and root `og:locale: en_MY` can leak/merge into pages unless fully overridden. The marketing `pageMetadata` does set `openGraph.url` and `locale`, so it overrides per-page — acceptable — but the root `metadata` is dead weight that can surface on any route that DOESN'T override (currently none under `[lang]`, but `/blog` index has NO `generateMetadata` at all → it inherits the root's English homepage OG `url: nothingimpossible.com.my` and homepage title). So **the blog index page advertises the homepage's title/description/OG**. That's a real SEO defect for `/blog`.
- **Fix:** Give `/blog` (`app/blog/page.tsx`) its own `metadata`/`generateMetadata` with a blog-appropriate title, canonical `/blog`, and OG. Trim the root `metadata` to neutral defaults (site name, metadataBase) so inheritance doesn't mislabel pages.

**H6 (HIGH). `generateStaticParams` in `[lang]/layout.tsx` returns only the 3 locales, but pages don't `generateStaticParams` per route — combined with `notFound()` in the layout, invalid locales are handled, but there's no `dynamicParams` guard.** With `[lang]` statically generated for en/zh/ms and `isLocale` notFound on others, a request to `/de/services` will: match middleware (de is not a locale) → rewrite to `/en/de/services` → 404. Confirms H3. Additionally, because the layout calls `notFound()` for non-locales but the only params generated are valid locales, any non-prefixed crawl that slips past middleware (e.g. middleware matcher exclusions) could hit `[lang]` with a non-locale first segment. Low practical risk but worth a `dynamicParams = false` on the layout to be explicit.

**H7 (HIGH). No `trailingSlash` config; middleware doesn't normalize trailing slashes.** `next.config` has no `trailingSlash`. A hit to `/services/` (trailing slash, common from old links/sitemaps) → middleware: not excluded, not a locale, `pathname='/services/'` → redirect to `/en/services/`. Next default (`trailingSlash:false`) then redirects `/en/services/` → `/en/services` (another hop). So `/services/` = **two** redirects (307 → 308/internal). Chained redirects dilute crawl efficiency.
- **Fix:** Normalize: strip trailing slash in middleware before building the target, or set a consistent `trailingSlash` and account for it. Aim for single-hop redirects.

**M6 (MEDIUM). `setLang` writes localStorage even on prefixed pages, but URL is the source of truth there — harmless, except it means localStorage can disagree with the URL** (`LanguageProvider.tsx:39`). A user browsing `/en/...` who once set `zh` on `/blog` will have `zeta_lang='en'` overwritten correctly on each marketing switch, but a user landing directly on `/zh/services` and navigating to `/blog` will see blog in `zh` only if they previously *switched* (which writes storage). First-touch deep link to `/zh/services` does NOT write storage (no switch event), so the subsequent `/blog` renders English chrome. Reinforces M1. The storage write should happen on every prefixed render (sync URL→storage), not only on manual switch.

**M7 (MEDIUM). `OG_LOCALE` has no `og:locale:alternate` tags.** Each marketing page emits a single `og:locale` but no `og:locale:alternate` for the other two languages. Facebook/social sharers won't know alternates exist. Minor but easy: add `openGraph.alternateLocale`.

**L5 (LOW). `Disallow: /thank-you` in robots.txt but thank-you is also the Google Ads conversion page.** Disallowing crawl is fine for indexing, but ensure GTM/Ads conversion is client-side (it is, GTM in layout). No change needed; noting that robots Disallow doesn't block the conversion tag. OK.

**L6 (LOW). Sitemap `lastModified: new Date()` on every build** makes all marketing URLs look freshly modified each deploy — mild signal noise, can cause Google to recrawl unchanged pages. Prefer a stable date or content-derived timestamp.

---

## Severity summary

| Severity | Count | IDs |
|---|---|---|
| CRITICAL | 3 | C1, C2, C3 |
| HIGH | 7 | H1, H2, H3, H4, H5, H6, H7 |
| MEDIUM | 7 | M1, M2, M3, M4, M5, M6, M7 |
| LOW | 6 | L1, L2, L3, L4, L5, L6 |

---

## MUST-FIX BEFORE MERGE (production blockers)

1. **C1** — `<html lang>` per locale on the server. Restructure layouts so `/zh` and `/ms` don't render `lang="en"`. *(SEO + a11y correctness; the refactor's core promise.)*
2. **C3** — `/blog` index inherits the homepage's title/description/OG. Give it real metadata + canonical. *(Indexable page mislabeled.)*
3. **C2** — Blog hreflang codes (`zh`/`ms`) must match marketing (`zh-Hans`/`ms-MY`) + add `x-default` + self-alternate. *(Broken international clustering.)*
4. **H1** — Switch redirects to **308** for the permanent move. *(Link-equity transfer for already-indexed URLs.)*
5. **H2** — Preserve query string on language switch. *(Conversion bug: `?pkg=` lost.)*
6. **H5** — Update `llms.txt` to canonical (prefixed) URLs.

## Fix-soon (right after merge / same sprint)
- **H3 + H7** — Clean redirect behavior for invalid-locale and trailing-slash to avoid redirect-to-404 and double hops.
- **H4 + M4 + M7** — Make zh signals consistent across hreflang / OG / JSON-LD; add `og:locale:alternate`.
- **M1 + M6** — Fix blog language determinism (sync URL→storage on every prefixed render, or drive blog chrome from post.language server-side).
- **M3** — Localize thank-you back-link / give it locale context.
- **M5 + L6** — Add sitemap hreflang alternates; stabilize `lastModified`.

## Later / nice-to-have
- **H6** (`dynamicParams=false`), **M2** (active-nav), **L1, L2, L4, L5** — hygiene.

---

## Overall verdict

**NEEDS FIXES — do not merge as-is.** The routing skeleton is sound and the marketing-page metadata (`seo.ts`) is genuinely well done (self-referencing canonicals, per-locale copy that targets real keywords rather than literal translation, x-default present on marketing). But the refactor ships with **the single most important i18n signal broken** (`<html lang>` always English on the server — C1), an indexable page wearing the wrong metadata (C2/C3 on blog), and a conversion-path regression (H2). These are not theoretical; they directly harm the SEO/AEO goals the refactor exists to serve and lose lead context.

Fix the six MUST-FIX items, then merge. The HIGH cluster around redirect hygiene (H3/H7) and zh-signal consistency (H4) should follow immediately after, before you submit the new URL structure to Google Search Console.

---

## Resolution Log (applied before merge)

Date: pre-merge, branch `i18n-routes`. Build passes (27/27 static), all marketing pages remain SSG.

- **C2 — FIXED**: Blog hreflang now uses shared BCP-47 codes (`en-MY` / `zh-Hans` / `ms-MY`) via `src/lib/locale.ts` `BCP47`, includes a self-alternate and an `x-default` (English version). (`src/app/blog/[slug]/page.tsx`)
- **C3 — FIXED**: Blog index now exports its own `metadata` (title/description/canonical/OG) instead of inheriting the homepage. (`src/app/blog/page.tsx`)
- **H1 — FIXED**: Middleware redirect changed to **308** permanent. (`src/middleware.ts`)
- **H2 — FIXED**: Language switch preserves the query string (`?pkg=` survives) by appending `window.location.search`. (`src/components/LanguageProvider.tsx`)
- **H5 — FIXED**: `public/llms.txt` updated to locale-prefixed `/en/...` URLs + note about `/zh` and `/ms`.
- **C1 — ACCEPTED RESIDUAL (deferred)**: `<html lang>` is server-rendered as `en` for all routes; `LanguageProvider` corrects it client-side, and hreflang (the authoritative language signal) is correct on all marketing pages. The "perfect" fix (per-locale server-rendered `<html lang>`) requires a multi-root-layout restructure that risks static generation; deferred as low-impact. Owner informed.

Remaining HIGH/MEDIUM (post-merge hygiene): H3 invalid-locale → redirect-to-404; H4 zh signal consistency (OG `zh_CN` vs hreflang `zh-Hans`); H7 trailing-slash double hop. To address before Search Console submission.
