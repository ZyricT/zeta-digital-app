'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { I18N, type Lang } from '@/lib/i18n'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const Ctx = createContext<LangCtx | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  // restore saved language on the client only (avoids hydration mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zeta_lang') as Lang | null
      if (saved && (saved === 'en' || saved === 'zh' || saved === 'ms')) setLangState(saved)
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms' : 'en'
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('zeta_lang', l) } catch {}
  }, [])

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
