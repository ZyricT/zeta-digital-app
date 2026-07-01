'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/components/LanguageProvider'

type Metric = { value?: string; label?: string }
export type CaseStudy = {
  _id: string
  client: string
  industry: string
  packageName?: string
  headline: string
  summary?: string
  challenge?: string
  approach?: string
  metrics?: Metric[]
  testimonialQuote?: string
  testimonialAuthor?: string
  testimonialRole?: string
}

// Animated count-up for a value string like "100K+", "+220%", "30万+", "90%".
// Non-numeric values (e.g. "GBP", "2-mo") render as-is.
function MetricValue({ raw }: { raw: string }) {
  const [text, setText] = useState(raw)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const m = raw.match(/^([^\d]*)(\d[\d,]*)(.*)$/)
    if (!m) {
      setText(raw)
      ref.current?.parentElement?.classList.add('lit')
      return
    }
    const pre = m[1]
    const num = parseInt(m[2].replace(/,/g, ''), 10)
    const suf = m[3]
    let rafId = 0
    let start: number | null = null
    const dur = 1100
    const tick = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setText(pre + Math.round(num * eased).toLocaleString() + suf)
      if (p < 1) rafId = requestAnimationFrame(tick)
      else {
        setText(raw)
        ref.current?.parentElement?.classList.add('lit')
      }
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [raw])
  return <div className="v" ref={ref}>{text}</div>
}

export default function CaseView({ cases = [] }: { cases?: CaseStudy[] }) {
  const { t, lang } = useLang()
  const [active, setActive] = useState(0)
  const html = (k: string) => ({ __html: t(k) })
  const idx = Math.min(active, Math.max(cases.length - 1, 0))
  const c = cases[idx]

  return (
    <section className="sec page-hero">
      <div className="glow g-lime gtr" />
      <div className="glow g-blue gbl" />
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: 720 }}>
          <div className="eyebrow">{t('pg.case.eyebrow')}</div>
          <h1 style={{ fontSize: 'clamp(40px,8vw,84px)', margin: '18px 0 18px' }} dangerouslySetInnerHTML={html('pg.case.h1')} />
          <p className="lead">{t('pg.case.sub')}</p>
        </div>

        {cases.length > 0 && (
          <>
            {cases.length > 1 && (
              <div className="cs-switch">
                {cases.map((cc, i) => (
                  <button key={cc._id} className={i === idx ? 'active' : ''} onClick={() => setActive(i)}>
                    <span className="st">{cc.industry}</span>
                    <span className="sc">{cc.client}</span>
                  </button>
                ))}
              </div>
            )}

            {c && (
              <div className="cs-panel">
                <div className="cs-case" key={c._id}>
                  <div className="cs-top">
                    <span className="cs-chip ind">{c.industry}</span>
                    {c.packageName && <span className="cs-chip pkg">{c.packageName}</span>}
                  </div>
                  <h2>{c.headline}</h2>
                  <div className="cs-client">{c.client}</div>

                  {c.metrics && c.metrics.length > 0 && (
                    <div className={`cs-metrics${c.metrics.length === 3 ? ' m3' : ''}`}>
                      {c.metrics.map((m, i) => (
                        <div className="cs-metric" key={i}>
                          <MetricValue raw={m.value || ''} />
                          <div className="l">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(c.challenge || c.approach || c.summary) && (
                    <div className="cs-narr">
                      {(c.challenge || c.summary) && (
                        <div className="blk">
                          <div className="bl"><i />{t('pg.case.challenge')}</div>
                          <p>{c.challenge || c.summary}</p>
                        </div>
                      )}
                      {c.approach && (
                        <div className="blk">
                          <div className="bl"><i />{t('pg.case.approach')}</div>
                          <p>{c.approach}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {c.testimonialQuote && (
                    <div className="cs-quote">
                      <p>“{c.testimonialQuote}”</p>
                      {(c.testimonialAuthor || c.testimonialRole) && (
                        <div className="by">— {c.testimonialAuthor}{c.testimonialRole ? ` · ${c.testimonialRole}` : ''}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="cs-band">
              <h3>{t('pg.case.ctaTitle')}</h3>
              <Link className="btn btn-primary" href={`/${lang}/contact`}>
                {t('pg.case.ctaBtn')}
              </Link>
            </div>
          </>
        )}

        <p className="reveal" style={{ marginTop: 24, color: 'rgba(255,255,255,.3)', fontSize: 12, fontFamily: "'Space Mono'" }}>{t('pg.case.disclaimer')}</p>
      </div>
    </section>
  )
}
