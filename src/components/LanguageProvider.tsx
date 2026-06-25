'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { I18N, type Lang } from '@/lib/i18n'
import { LOCALES, localePrefix, DEFAULT_LOCALE } from '@/lib/locale'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const Ctx = createContext<LangCtx | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const urlLang = localePrefix(pathname) // Locale on /[lang]/... pages, else null
  const [stored, setStored] = useState<Lang>(DEFAULT_LOCALE)

  // On non-prefixed pages (blog, thank-you), restore saved language from storage.
  useEffect(() => {
    if (urlLang) return
    try {
      const s = localStorage.getItem('zeta_lang') as Lang | null
      if (s && (LOCALES as readonly string[]).includes(s)) setStored(s)
    } catch {}
  }, [urlLang])

  const lang: Lang = (urlLang ?? stored) as Lang

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms' : 'en'
  }, [lang])

  const setLang = useCallback(
    (l: Lang) => {
      try { localStorage.setItem('zeta_lang', l) } catch {}
      if (urlLang) {
        // Swap the locale segment and navigate, preserving the query string
        // (e.g. /en/contact?pkg=Scale must keep ?pkg= when switching language).
        const parts = pathname.split('/')
        parts[1] = l
        const search = typeof window !== 'undefined' ? window.location.search : ''
        router.push((parts.join('/') || '/') + search)
      } else {
        setStored(l)
      }
    },
    [urlLang, pathname, router]
  )

  const t = useCallback(
    (key: string) => (I18N[lang] && I18N[lang][key]) ?? I18N.en[key] ?? key,
    [lang]
  )

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
