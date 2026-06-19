'use client'

import { useLang } from '@/components/LanguageProvider'
import LeadForm from '@/components/LeadForm'

export default function ContactPage() {
  const { t } = useLang()
  const html = (k: string) => ({ __html: t(k) })
  const sub = { fontFamily: "'Space Mono'", fontSize: 10, letterSpacing: '.16em', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase' as const }
  return (
    <section className="sec page-hero">
      <div className="glow g-violet gtl" />
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: 720 }}>
          <div className="eyebrow">{t('pg.contact.eyebrow')}</div>
          <h1 style={{ fontSize: 'clamp(40px,8vw,84px)', margin: '18px 0 18px' }} dangerouslySetInnerHTML={html('pg.contact.h1')} />
          <p className="lead">{t('pg.contact.sub')}</p>
        </div>
        <div className="contact-grid">
          <div className="cinfo reveal">
            <h3>{t('pg.contact.reach')}</h3>
            <div style={{ marginTop: 8 }}><div style={sub}>{t('pg.contact.hphone')}</div><p>+60 17-792 2510</p></div>
            <div style={{ marginTop: 18 }}><div style={sub}>{t('pg.contact.hemail')}</div><p>zyric@agoh.my</p></div>
            <div style={{ marginTop: 18 }}><div style={sub}>{t('pg.contact.hloc')}</div><p>{t('pg.contact.loc')}</p></div>
          </div>
          <div><LeadForm /></div>
        </div>
      </div>
    </section>
  )
}
