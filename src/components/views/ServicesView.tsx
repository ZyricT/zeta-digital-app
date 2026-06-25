'use client'

import Link from 'next/link'
import { useLang } from '@/components/LanguageProvider'

export default function ServicesPage() {
  const { t, lang } = useLang()
  const html = (k: string) => ({ __html: t(k) })
  return (
    <section className="sec page-hero">
      <div className="glow g-blue gtr" />
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: 720 }}>
          <div className="eyebrow">{t('pg.svc.eyebrow')}</div>
          <h1 style={{ fontSize: 'clamp(40px,8vw,84px)', margin: '18px 0 18px' }} dangerouslySetInnerHTML={html('pg.svc.h1')} />
          <p className="lead">{t('pg.svc.sub')}</p>
        </div>
        <div className="reveal-stagger">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Link className="srow" href={`/${lang}/contact`} key={n} style={{ textDecoration: 'none' }}>
              <div className="n">0{n}</div>
              <div className="body"><h3>{t(`srv.${n}t`)}</h3><p>{t(`srv.${n}d`)}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
