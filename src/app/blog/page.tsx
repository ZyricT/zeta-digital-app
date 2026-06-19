'use client'

import { useLang } from '@/components/LanguageProvider'

export default function BlogPage() {
  const { t } = useLang()
  const html = (k: string) => ({ __html: t(k) })
  return (
    <section className="sec page-hero">
      <div className="glow g-pink gtr" />
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: 720 }}>
          <div className="eyebrow">{t('pg.blog.eyebrow')}</div>
          <h1 style={{ fontSize: 'clamp(40px,8vw,84px)', margin: '18px 0 18px' }} dangerouslySetInnerHTML={html('pg.blog.h1')} />
          <p className="lead">{t('pg.blog.sub')}</p>
        </div>
        <div className="blog-grid reveal-stagger">
          {[1, 2, 3].map((n) => (
            <div className="post" key={n}>
              <div className="thumb" />
              <div className="pb">
                <span className="cat">{t(`pg.blog.${n}cat`)}</span>
                <h3>{t(`pg.blog.${n}t`)}</h3>
                <p>{t(`pg.blog.${n}e`)}</p>
                <div className="date">{t(`pg.blog.${n}date`)}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="reveal" style={{ marginTop: 24, color: 'rgba(255,255,255,.3)', fontSize: 12, fontFamily: "'Space Mono'" }}>{t('pg.blog.soon')}</p>
      </div>
    </section>
  )
}
