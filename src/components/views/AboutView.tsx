'use client'

import { useLang } from '@/components/LanguageProvider'

export default function AboutPage() {
  const { t } = useLang()
  const html = (k: string) => ({ __html: t(k) })
  return (
    <>
      <section className="sec page-hero">
        <div className="glow g-blue gtr" />
        <div className="wrap">
          <div className="sec-head reveal" style={{ maxWidth: 720 }}>
            <div className="eyebrow">{t('pg.about.eyebrow')}</div>
            <h1 style={{ fontSize: 'clamp(40px,8vw,84px)', margin: '18px 0 18px' }} dangerouslySetInnerHTML={html('pg.about.h1')} />
            <p className="lead">{t('pg.about.sub')}</p>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="glow g-lime gbl" />
        <div className="wrap about-cols">
          <div className="reveal">
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', marginBottom: 22 }}>{t('pg.about.s1h')}</h2>
            <p>{t('pg.about.p1')}</p>
            <p>{t('pg.about.p2')}</p>
          </div>
          <div className="founder-card reveal">
            <div className="role">{t('pg.about.frole')}</div>
            <h3>{t('pg.about.fname')}</h3>
            <ul>
              <li><i>✓</i><span>{t('pg.about.f1')}</span></li>
              <li><i>✓</i><span>{t('pg.about.f2')}</span></li>
              <li><i>✓</i><span>{t('pg.about.f3')}</span></li>
              <li><i>✓</i><span>{t('pg.about.f4')}</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head reveal"><h2>{t('pg.about.vh')}</h2></div>
          <div className="cards reveal-stagger" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            <div className="card" data-tilt><div className="ic">🛠</div><h3>{t('pg.about.v1t')}</h3><p>{t('pg.about.v1d')}</p></div>
            <div className="card" data-tilt><div className="ic">🤖</div><h3>{t('pg.about.v2t')}</h3><p>{t('pg.about.v2d')}</p></div>
            <div className="card" data-tilt><div className="ic">⚡</div><h3>{t('pg.about.v3t')}</h3><p>{t('pg.about.v3d')}</p></div>
          </div>
        </div>
      </section>
    </>
  )
}
