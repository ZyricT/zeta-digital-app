'use client'

import Link from 'next/link'
import { useLang } from '@/components/LanguageProvider'
import PackageCards from '@/components/PackageCards'

export default function PackagesPage() {
  const { t, lang } = useLang()
  const html = (k: string) => ({ __html: t(k) })
  return (
    <>
      <section className="sec page-hero">
        <div className="glow g-violet gtr" />
        <div className="wrap">
          <div className="sec-head c reveal" style={{ maxWidth: 640 }}>
            <div className="eyebrow c">{t('pkg.eyebrow')}</div>
            <h2 dangerouslySetInnerHTML={html('pkg.h2')} />
            <p className="lead" style={{ margin: '0 auto' }}>{t('pkg.sub')}</p>
          </div>
          <PackageCards />
          <div className="pkg-note">{t('pkg.note')}</div>
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
