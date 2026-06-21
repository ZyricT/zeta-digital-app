'use client'

import Link from 'next/link'
import { useLang } from './LanguageProvider'
import { urlFor } from '@/sanity/client'

function fmtDate(d?: string) {
  if (!d) return ''
  try { return new Date(d).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return '' }
}

export default function BlogList({ posts }: { posts: any[] }) {
  const { t, lang } = useLang()
  const html = (k: string) => ({ __html: t(k) })
  const shown = (Array.isArray(posts) ? posts : []).filter((p) => (p.language || 'en') === lang)
  const has = shown.length > 0

  return (
    <section className="sec page-hero">
      <div className="glow g-pink gtr" />
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: 720 }}>
          <div className="eyebrow">{t('pg.blog.eyebrow')}</div>
          <h1 style={{ fontSize: 'clamp(40px,8vw,84px)', margin: '18px 0 18px' }} dangerouslySetInnerHTML={html('pg.blog.h1')} />
          <p className="lead">{t('pg.blog.sub')}</p>
        </div>

        {has ? (
          <div className="blog-grid reveal-stagger">
            {shown.map((p) => (
              <Link className="post" href={`/blog/${p.slug}`} key={p._id}>
                <div className="thumb" style={p.mainImage ? { backgroundImage: `url(${urlFor(p.mainImage).width(600).height(340).url()})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined} />
                <div className="pb">
                  {p.categories?.[0] && <span className="cat">{p.categories[0]}</span>}
                  <h3>{p.title}</h3>
                  {p.excerpt && <p>{p.excerpt}</p>}
                  <div className="date">{fmtDate(p.publishedAt)}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="reveal" style={{ color: 'rgba(255,255,255,.45)', fontSize: 15, fontFamily: "'Noto Sans SC'" }}>{t('pg.blog.soon')}</p>
        )}
      </div>
    </section>
  )
}
