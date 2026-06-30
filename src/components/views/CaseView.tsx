'use client'

import { useLang } from '@/components/LanguageProvider'

type Metric = { value?: string; label?: string }
export type CaseStudy = {
  _id: string
  client: string
  industry: string
  packageName?: string
  headline: string
  summary?: string
  metrics?: Metric[]
  testimonialQuote?: string
  testimonialAuthor?: string
  testimonialRole?: string
}

export default function CaseView({ cases = [] }: { cases?: CaseStudy[] }) {
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
          {cases.map((c) => (
            <div className="case" key={c._id}>
              <div className="ind">{c.industry}</div>
              <h3>{c.headline}</h3>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 12, fontFamily: "'Space Mono'", margin: '4px 0 4px' }}>
                {c.client}{c.packageName ? ` · ${c.packageName}` : ''}
              </div>
              {c.metrics && c.metrics.length > 0 && (
                <div className="metrics">
                  {c.metrics.map((m, i) => (
                    <div className="m" key={i}><div className="v">{m.value}</div><div className="l">{m.label}</div></div>
                  ))}
                </div>
              )}
              {c.summary && <p>{c.summary}</p>}
              {c.testimonialQuote && (
                <blockquote style={{ borderLeft: '3px solid #D0FF00', paddingLeft: 16, margin: '16px 0 0', color: 'rgba(255,255,255,.62)', fontStyle: 'italic', fontSize: 14, lineHeight: 1.7 }}>
                  “{c.testimonialQuote}”
                  {(c.testimonialAuthor || c.testimonialRole) && (
                    <footer style={{ marginTop: 8, fontStyle: 'normal', color: 'rgba(255,255,255,.4)', fontSize: 12, fontFamily: "'Space Mono'" }}>
                      — {c.testimonialAuthor}{c.testimonialRole ? `, ${c.testimonialRole}` : ''}
                    </footer>
                  )}
                </blockquote>
              )}
            </div>
          ))}
        </div>
        <p className="reveal" style={{ marginTop: 24, color: 'rgba(255,255,255,.3)', fontSize: 12, fontFamily: "'Space Mono'" }}>{t('pg.case.disclaimer')}</p>
      </div>
    </section>
  )
}
