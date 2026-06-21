import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { Resend } from 'resend'
import { QUEUE, type QPost } from '@/lib/contentQueue'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// ── Sanity write client (token lives only in Vercel env, never in source) ──
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '94t96kxv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// markdown-ish text -> Portable Text blocks ("## " = h2, "### " = h3)
function toBlocks(text: string) {
  const out: any[] = []
  for (const para of text.trim().split(/\n\n+/)) {
    const line = para.trim()
    if (!line) continue
    let style = 'normal'
    let content = line
    if (line.startsWith('## ')) { style = 'h2'; content = line.slice(3) }
    else if (line.startsWith('### ')) { style = 'h3'; content = line.slice(4) }
    out.push({
      _type: 'block', _key: Math.random().toString(36).slice(2), style, markDefs: [],
      children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: content, marks: [] }],
    })
  }
  return out
}

// Fetch a relevant photo from Unsplash and upload it to Sanity as an asset.
// Returns the asset _id, or null if unavailable (engine still publishes without image).
async function fetchAndUploadImage(query: string): Promise<string | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) return null
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
      { headers: { Authorization: `Client-ID ${key}` } }
    )
    if (!res.ok) return null
    const j: any = await res.json()
    const url: string | undefined = j?.urls?.regular || j?.urls?.full
    if (!url) return null
    const imgRes = await fetch(url)
    if (!imgRes.ok) return null
    const buf = Buffer.from(await imgRes.arrayBuffer())
    const asset = await sanity.assets.upload('image', buf, { filename: `${query.replace(/\s+/g, '-')}.jpg` })
    return asset._id
  } catch {
    return null
  }
}

async function notify(subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) return
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL || 'Zeta Auto <onboarding@resend.dev>',
      to: process.env.LEAD_TO_EMAIL || 'zyric@agoh.my',
      subject,
      html,
    })
  } catch { /* notification failure must not break publishing */ }
}

export async function GET(request: NextRequest) {
  // Auth: Vercel Cron sends "Authorization: Bearer <CRON_SECRET>".
  // Manual test also allowed via ?key=<CRON_SECRET>.
  const secret = process.env.CRON_SECRET
  const auth = request.headers.get('authorization')
  const keyParam = request.nextUrl.searchParams.get('key')
  if (!secret || (auth !== `Bearer ${secret}` && keyParam !== secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.SANITY_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Missing SANITY_WRITE_TOKEN' }, { status: 500 })
  }

  try {
    // Which slugs already exist in Sanity?
    const existing: { s: string }[] = await sanity.fetch(`*[_type == "post"]{ "s": slug.current }`)
    const have = new Set(existing.map((x) => x.s).filter(Boolean))

    // Find the first queue set that isn't fully published yet.
    const next = QUEUE.find((set) => {
      const slugs = [set.posts.en.slug, set.posts.zh.slug, set.posts.ms.slug]
      return !slugs.every((s) => have.has(s))
    })

    if (!next) {
      await notify(
        'Zeta auto-publish: queue empty',
        `<p>The content queue has no unpublished articles left. Add more sets to <code>src/lib/contentQueue.ts</code> to keep weekly publishing going.</p>`
      )
      return NextResponse.json({ done: true, message: 'Queue empty — all sets published.' })
    }

    // One relevant photo, shared across the 3 language versions.
    const assetId = await fetchAndUploadImage(next.unsplashQuery)
    const now = new Date().toISOString()

    // Category
    await sanity.createOrReplace({
      _id: `category-${next.category.slug}`,
      _type: 'category',
      title: next.category.title,
      slug: { _type: 'slug', current: next.category.slug },
    })

    const langs: ('en' | 'zh' | 'ms')[] = ['en', 'zh', 'ms']
    const published: string[] = []

    for (const lang of langs) {
      const p: QPost = next.posts[lang]
      const doc: any = {
        _id: `post-${next.group}-${lang}`,
        _type: 'post',
        title: p.title,
        language: lang,
        translationGroup: next.group,
        slug: { _type: 'slug', current: p.slug },
        excerpt: p.excerpt,
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        author: 'Zeta Digital',
        publishedAt: now,
        categories: [{ _type: 'reference', _ref: `category-${next.category.slug}`, _key: 'cat1' }],
        body: toBlocks(p.body),
        faqs: p.faqs.map((f, i) => ({ _type: 'object', _key: 'faq' + i, question: f.question, answer: f.answer })),
      }
      if (assetId) {
        doc.mainImage = { _type: 'image', alt: p.alt, asset: { _type: 'reference', _ref: assetId } }
      }
      await sanity.createOrReplace(doc)
      published.push(`${lang}: ${p.slug}`)
    }

    await notify(
      `✅ Zeta auto-published: ${next.posts.en.title}`,
      `<div style="font-family:sans-serif">
        <h2 style="color:#00033D">New trilingual article published automatically</h2>
        <p><strong>Topic:</strong> ${next.category.title}</p>
        <p><strong>Image:</strong> ${assetId ? 'attached from Unsplash' : 'none (Unsplash key not set)'}</p>
        <ul>
          <li>EN: https://nothingimpossible.com.my/blog/${next.posts.en.slug}</li>
          <li>ZH: https://nothingimpossible.com.my/blog/${next.posts.zh.slug}</li>
          <li>MS: https://nothingimpossible.com.my/blog/${next.posts.ms.slug}</li>
        </ul>
        <p>Live on the site within ~1 minute (ISR).</p>
      </div>`
    )

    return NextResponse.json({ published: true, group: next.group, image: !!assetId, posts: published })
  } catch (error: any) {
    console.error('Auto-publish error:', error)
    await notify('⚠️ Zeta auto-publish failed', `<p>${String(error?.message || error)}</p>`)
    return NextResponse.json({ error: 'Publish failed', detail: String(error?.message || error) }, { status: 500 })
  }
}
