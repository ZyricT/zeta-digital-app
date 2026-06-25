'use client'

import Link from 'next/link'
import { useLang } from '@/components/LanguageProvider'
import Marquee from '@/components/Marquee'
import PackageCards from '@/components/PackageCards'

const STATS = [
  { num: '10', suffix: 'M+', prefix: 'RM ', key: 'stat1' },
  { num: '3', suffix: 'M+', prefix: '', key: 'stat2' },
  { num: '50', suffix: '+', prefix: '', key: 'stat3' },
  { num: '100', suffix: '%', prefix: '', key: 'stat4' },
]
const IND = [
  ['🍽', 'ind.1t', 'ind.1d'], ['✦', 'ind.2t', 'ind.2d'], ['♥', 'ind.3t', 'ind.3d'],
  ['⌂', 'ind.4t', 'ind.4d'], ['🛡', 'ind.5t', 'ind.5d'],
]

export default function Home() {
  const { t, lang } = useLang()
  const html = (k: string) => ({ __html: t(k) })

  return (
    <>
      <section id="home-hero">
        <div className="hero-grid-line" />
        <div className="phx phx-grid" data-depth="8" />
        <div className="phx phx-blob" data-depth="34" style={{ width: 340, height: 340, background: 'var(--blue)', opacity: .32, top: '6%', right: '6%' }} />
        <div className="phx phx-blob" data-depth="52" style={{ width: 300, height: 300, background: 'var(--violet)', opacity: .28, bottom: '0%', left: '4%' }} />
        <div className="phx phx-blob" data-depth="20" style={{ width: 260, height: 260, background: 'var(--lime)', opacity: .14, top: '32%', left: '42%' }} />
        <div className="wrap">
          <div className="eyebrow">{t('hero.eyebrow')}</div>
          <h1 style={{ marginTop: 24 }}>
            <span className="kline"><span>{t('hero.h1a')}</span></span>
            <span className="kline"><span className="grad-text">{t('hero.h1b')}</span></span>
          </h1>
          <p className="lead" style={{ margin: '26px 0 34px' }}>{t('hero.sub')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href={`/${lang}/packages`} className="btn btn-primary">{t('hero.cta1')} <span className="arr">→</span></Link>
            <Link href={`/${lang}/contact`} className="btn btn-ghost">{t('hero.cta2')}</Link>
          </div>
          <div className="trust" dangerouslySetInnerHTML={html('hero.trust')} />
        </div>
      </section>

      <Marquee />

      <section className="statsband">
        <div className="wrap">
          <div className="stats-grid reveal-stagger">
            {STATS.map((s) => (
              <div className="stat" key={s.key}>
                <div className="num" data-count={s.num} data-suffix={s.suffix} data-prefix={s.prefix}>{s.prefix}0{s.suffix}</div>
                <div className="lab">{t(s.key)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="industries">
        <div className="glow g-lime gtr" />
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">{t('ind.eyebrow')}</div>
            <h2 dangerouslySetInnerHTML={html('ind.h2')} />
            <p className="lead">{t('ind.sub')}</p>
          </div>
          <div className="cards ind-grid reveal-stagger">
            {IND.map(([ic, tk, dk]) => (
              <div className="card" data-tilt key={tk}>
                <div className="ic">{ic}</div>
                <h3>{t(tk)}</h3>
                <p>{t(dk)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="services">
        <div className="glow g-blue gbl" />
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">{t('srv.eyebrow')}</div>
            <h2 dangerouslySetInnerHTML={html('srv.h2')} />
            <p className="lead">{t('srv.sub')}</p>
          </div>
          <div className="reveal-stagger">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className="srow" key={n}>
                <div className="n">0{n}</div>
                <div className="body"><h3>{t(`srv.${n}t`)}</h3><p>{t(`srv.${n}d`)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="glow g-orange gtl" />
        <div className="wrap">
          <div className="sec-head reveal" style={{ maxWidth: 560 }}>
            <div className="eyebrow">{t('how.eyebrow')}</div>
            <h2>{t('how.h2')}</h2>
            <p className="lead">{t('how.sub')}</p>
          </div>
          <div className="steps reveal-stagger">
            <div className="step"><span className="watermark">01</span><div className="ic" style={{ background: 'rgba(240,102,13,.14)', color: 'var(--orange)' }}>◎</div><span className="tag">{t('how.1tag')}</span><h3>{t('how.1t')}</h3><p>{t('how.1d')}</p></div>
            <div className="step"><span className="watermark">02</span><div className="ic" style={{ background: 'rgba(77,124,255,.14)', color: 'var(--blue)' }}>⚡</div><span className="tag">{t('how.2tag')}</span><h3>{t('how.2t')}</h3><p>{t('how.2d')}</p></div>
            <div className="step"><span className="watermark">03</span><div className="ic" style={{ background: 'rgba(208,255,0,.14)', color: 'var(--lime)' }}>↗</div><span className="tag">{t('how.3tag')}</span><h3>{t('how.3t')}</h3><p>{t('how.3d')}</p></div>
          </div>
        </div>
      </section>

      <section className="sec" id="packages">
        <div className="glow g-violet gtl" />
        <div className="wrap">
          <div className="sec-head c reveal" style={{ maxWidth: 600 }}>
            <div className="eyebrow c">{t('pkg.eyebrow')}</div>
            <h2 dangerouslySetInnerHTML={html('pkg.h2')} />
            <p className="lead" style={{ margin: '0 auto' }}>{t('pkg.sub')}</p>
          </div>
          <PackageCards />
          <div className="pkg-note">{t('pkg.note')}</div>
        </div>
      </section>

      <section className="sec">
        <div className="glow g-pink gtr" />
        <div className="wrap ai-wrap">
          <div className="ai-body reveal">
            <div className="eyebrow">{t('ai.eyebrow')}</div>
            <h2 style={{ margin: '18px 0 24px' }} dangerouslySetInnerHTML={html('ai.h2')} />
            <p>{t('ai.p1')}</p>
            <p>{t('ai.p2')}</p>
            <div className="ai-stats">
              <div><div className="num">24/7</div><div className="lab">{t('ai.s1')}</div></div>
              <div><div className="num">&lt;60s</div><div className="lab">{t('ai.s2')}</div></div>
              <div><div className="num">3x</div><div className="lab">{t('ai.s3')}</div></div>
            </div>
          </div>
          <div className="ai-orb reveal"><canvas id="ai-canvas" /></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap reveal">
          <div className="free-band">
            <div className="eyebrow">{t('free.eyebrow')}</div>
            <h2 style={{ margin: '18px 0 20px' }} dangerouslySetInnerHTML={html('free.h2')} />
            <p className="lead">{t('free.sub')}</p>
            <div className="free-check">
              <div>{t('free.c1')}</div><div>{t('free.c2')}</div><div>{t('free.c3')}</div><div>{t('free.c4')}</div>
            </div>
            <div className="bonus"><div className="bl">{t('free.bl')}</div><div className="bt">{t('free.bt')}</div></div>
            <div><Link href={`/${lang}/contact?pkg=audit`} className="btn">{t('free.cta')}</Link></div>
          </div>
        </div>
      </section>
    </>
  )
}
