'use client'

import { useRouter } from 'next/navigation'
import { useLang } from './LanguageProvider'
import { PACKAGES } from '@/lib/i18n'

export default function PackageCards() {
  const { lang, t } = useLang()
  const router = useRouter()

  return (
    <div className="pkgs reveal-stagger">
      {PACKAGES.map((p) => {
        const f = p.features[lang] || p.features.en
        const ctaKey = p.featured ? 'pkg.ctaFeatured' : p.pkgval === 'exclusive' ? 'pkg.ctaExc' : 'pkg.cta'
        return (
          <div className={`pkg${p.featured ? ' featured' : ''}`} key={p.pkgval}>
            {p.badge && <div className={`badge${p.badgeKey === 'alt' ? ' alt' : ''}`}>{p.badge[lang] || p.badge.en}</div>}
            <div className="plabel">{p.name[lang] || p.name.en}</div>
            <div className="price">{p.price}<span className="per">{p.per[lang] || p.per.en}</span></div>
            <div className="psub">{p.tagline[lang] || p.tagline.en}</div>
            {p.slots && <div className="slots">{p.slots[lang] || p.slots.en}</div>}
            <div className="divr" />
            <ul>{f.map((x, i) => <li key={i}><i>✓</i><span>{x}</span></li>)}</ul>
            <button
              className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => router.push(`/${lang}/contact?pkg=${p.pkgval}`)}
            >
              {t(ctaKey)} →
            </button>
          </div>
        )
      })}
    </div>
  )
}
