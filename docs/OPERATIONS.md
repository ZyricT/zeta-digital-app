# Zeta Digital — Operations & Maintenance Manual
**Site:** nothingimpossible.com.my · **App:** zeta-app (Next.js 14)
**Rule:** Update this file on EVERY change. It is the single source of truth for how the site runs.

_Last updated: 2026-06-26_

---

## 1. Live URLs
- Production: https://nothingimpossible.com.my  (apex 308→ www → /en)
- Languages: `/en`, `/zh`, `/ms` (marketing pages). Blog: `/blog`, `/blog/[slug]`.
- Admin (content editor): https://nothingimpossible.com.my/studio  (Sanity login)
- Vercel alias: https://zeta-app-six.vercel.app

## 2. Accounts & Services
| Service | Account | Purpose |
|---|---|---|
| GitHub | ZyricT/zeta-digital-app (private) | Source code. Push to `main` = auto-deploy. |
| Vercel | zyrict-projects / project `zeta-app` | Hosting + build + cron. Deploys from GitHub main. |
| Sanity | org o0aP7hTXH, project `94t96kxv`, dataset `production` | Headless CMS for blog/site content. Studio at /studio. |
| Resend | account zaeiouc@gmail (signed up via GitHub) | Transactional email (lead + auto-publish notifications). |
| Cloudflare | **teammate's account** | DNS for nothingimpossible.com.my. (Need teammate to change.) |
| Shinjiru | Zyric's account | Domain registrar (nothingimpossible.com.my, aizeta.my). aizeta.my DNS controlled here. |
| Google Search Console | zaeiouc@gmail | SEO — verified via HTML meta tag. Sitemap submitted. |
| GTM / GA4 / Google Ads | (pending) | Analytics + ad conversion tracking. |

## 3. Environment Variables (set in Vercel → Settings → Environment Variables)
Values are NOT stored here. Names + purpose only.
- `SANITY_WRITE_TOKEN` — Sanity Editor token, used by the auto-publish engine.
- `CRON_SECRET` — protects /api/cron/publish. (Rotated 2026-06; do not paste in chat.)
- `UNSPLASH_ACCESS_KEY` — free, fetches article cover photos.
- `RESEND_API_KEY` — sends notification emails.
- `LEAD_TO_EMAIL` — where lead/notify emails go (currently a gmail; target zyric@agoh.my).
- `LEAD_FROM_EMAIL` — sender (target: leads@aizeta.my once aizeta.my verified in Resend).
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` — Sanity public config.
- `NEXT_PUBLIC_GTM_ID` — (pending) GTM container ID; when set, GTM loads site-wide.
- (Optional) `WABLAS_TOKEN`, `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_SHEET_ID` — WhatsApp + Sheets lead backup.

## 4. How to Deploy a Change
1. Edit code locally.
2. `cd "/Users/zyric/Downloads/Zeta Digital/zeta-app" && npm run build`  (must pass).
3. GitHub Desktop → Commit → Push to `main`.
4. Vercel auto-builds + deploys. A failed build does NOT replace the live site.
Rollback: Vercel → Deployments → pick last good → ⋯ → Promote/Rollback (seconds).

## 5. Auto-Publish SEO Engine
- Code: `src/app/api/cron/publish/route.ts`. Content queue: `src/lib/contentQueue.ts`.
- Schedule: `vercel.json` cron `0 1 * * 1,4` = **Mon + Thu 09:00 MYT** (2×/week).
- Each run: takes the next unpublished QSet → fetches an Unsplash photo → publishes EN/ZH/MS to Sanity → emails a notification.
- **Add more articles:** append new `QSet` objects to `contentQueue.ts` (copy the existing shape: group, category, unsplashQuery, posts.{en,zh,ms}). Build + push.
- **Change frequency:** edit the cron in `vercel.json` (e.g. `0 1 * * 1,3,5` = Mon/Wed/Fri).
- **Manual test:** `https://nothingimpossible.com.my/api/cron/publish?key=<CRON_SECRET>` → expect `{"published":true,...}`.
- Monthly scheduled reminder (`zeta-weekly-trilingual-seo`) pings to refill the queue.

## 6. Editing Content (non-code)
- Go to /studio → log in (Sanity) → edit posts, add mainImage + alt, set language + translationGroup.
- Blog posts are per-language documents linked by `translationGroup` (powers hreflang).

## 7. i18n / Multilingual
- Marketing pages live under `src/app/[lang]/` (en/zh/ms) — server-rendered per-locale metadata + hreflang via `src/lib/seo.ts`.
- `src/middleware.ts` redirects `/` and old URLs → `/en/...` (308).
- `src/components/LanguageProvider.tsx` reads locale from URL (falls back to localStorage on /blog, /thank-you).
- Dictionary: `src/lib/i18n.ts`. Case studies content is currently in i18n (code), not Sanity.

## 8. Domain / SSL
- nothingimpossible.com.my added to Vercel project `zeta-app` (apex + www). 525 was caused by the domain being on the wrong Vercel project — fixed by moving it.
- Cloudflare proxy (orange cloud) ON + SSL mode Full = working. Changes need teammate.

## 9. Email (Resend)
- Used by: `/api/lead` (lead notification) and the cron engine (publish notification). Both email LEAD_TO_EMAIL.
- Verify a sending domain in Resend → add its DKIM TXT + `send` MX + `send` SPF TXT to that domain's DNS.
- aizeta.my (DNS at Shinjiru, Zyric-controlled) is being verified as the sender → then set LEAD_FROM_EMAIL=leads@aizeta.my.

## 10. SEO / GSC
- robots.txt allows AI crawlers (GPTBot/ClaudeBot/PerplexityBot/Google-Extended). llms.txt present.
- Sitemap: /sitemap.xml (3 locales × marketing + blog). Submitted to GSC.
- GSC verified via meta tag in `src/app/layout.tsx` (`verification.google`). DO NOT remove it.

## 11. Reviews
- Senior-dev code reviews are saved in `docs/reviews/`. (i18n refactor: `docs/reviews/i18n-refactor-review.md`.)

## 12. Open / Pending
- [ ] aizeta.my Resend verification → set LEAD_FROM_EMAIL.
- [ ] GTM container + GA4 + Google Ads conversion (on `lead_submitted` event from /thank-you).
- [ ] Resend verify nothingimpossible.com.my (teammate/Cloudflare) for customer-facing email.
- [ ] Privacy/Terms pages (PDPA). Vercel Pro (commercial use).
- [ ] Review hygiene items H3/H4/H7 + C1 (html lang). See review doc.
- [ ] Case studies → Sanity (currently in code).

## 13. Changelog
- 2026-06-26: i18n SSR (/en /zh /ms) + hreflang; senior review + fixes; GSC meta tag; thank-you `lead_submitted` event; 2×/week publishing; +3 article sets; AEO/GEO schema/llms.txt/security headers/honeypot/mobile WebGL; mobile hamburger menu; auto-publish engine; domain SSL fix.
