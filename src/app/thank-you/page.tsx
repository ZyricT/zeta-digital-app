'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/components/LanguageProvider'

export default function ThankYouPage() {
  const { t, lang } = useLang()

  // Fire a conversion event for GTM / Google Ads (lead form completed).
  useEffect(() => {
    const w = window as any
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ event: 'lead_submitted' })
  }, [])

  return (
    <section className="sec page-hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="glow g-lime gtr" />
      <div className="wrap" style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto' }}>
        <div className="reveal in" style={{ fontSize: 56, lineHeight: 1, marginBottom: 18 }}>
          <span className="grad-text" style={{ fontFamily: "'Space Grotesk'", fontWeight: 700 }}>✓</span>
        </div>
        <h1 style={{ fontSize: 'clamp(40px,7vw,72px)' }}>{t('ty.h1')}</h1>
        <p className="lead" style={{ margin: '18px auto 0' }}>{t('ty.sub')}</p>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center', margin: '34px 0', color: 'rgba(255,255,255,.4)', fontSize: 13, fontFamily: "'Space Mono'" }}>
          <span>01 — {t('ty.s1')}</span><span>02 — {t('ty.s2')}</span><span>03 — {t('ty.s3')}</span>
        </div>
        <Link href={`/${lang}`} className="btn btn-ghost">← {t('ty.back')}</Link>
      </div>
    </section>
  )
}
