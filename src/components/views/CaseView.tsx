'use client'

import { useLang } from '@/components/LanguageProvider'

export default function CasePage() {
  const { t } = useLang()
  const html = (k: string) => ({ __html: t(k) })
  return (
    <section className="sec page-hero">
      <div className="glow g-lime gtr" />
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: 720 }}>
          <div className="eyebrow">{t('pg.case.eyebrow')}</div>
          <h1 style={{ fontSize: 'clamp(40px,8vw,84px)', margin: '18px 0 18px' }} dangerouslySetInnerHTML={html('pg.case.h1')} />
          <p className="lead">{t('pg.case.sub')}</p>
        </div>
        <div className="case-grid reveal-stagger">
          {[1, 2, 3].map((n) => (
            <div className="case" key={n}>
              <div className="ind">{t(`pg.case.${n}ind`)}</div>
              <h3>{t(`pg.case.${n}t`)}</h3>
              <div className="metrics">
                <div className="m"><div className="v">{t(`pg.case.${n}m1`)}</div><div className="l">{t(`pg.case.${n}m1l`)}</div></div>
                <div className="m"><div className="v">{t(`pg.case.${n}m2`)}</div><div className="l">{t(`pg.case.${n}m2l`)}</div></div>
              </div>
              <p>{t(`pg.case.${n}d`)}</p>
            </div>
          ))}
        </div>
        <p className="reveal" style={{ marginTop: 24, color: 'rgba(255,255,255,.3)', fontSize: 12, fontFamily: "'Space Mono'" }}>{t('pg.case.disclaimer')}</p>
      </div>
    </section>
  )
}
