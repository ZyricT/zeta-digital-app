export const LOCALES = ['en', 'zh', 'ms'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(x: string | undefined): x is Locale {
  return !!x && (LOCALES as readonly string[]).includes(x)
}

// First path segment if it is a locale, else null.
export function localePrefix(pathname: string): Locale | null {
  const seg = pathname.split('/')[1]
  return isLocale(seg) ? seg : null
}

export const HTML_LANG: Record<Locale, string> = { en: 'en', zh: 'zh-CN', ms: 'ms' }
export const OG_LOCALE: Record<Locale, string> = { en: 'en_MY', zh: 'zh_CN', ms: 'ms_MY' }
// BCP-47 codes for hreflang — kept identical across marketing pages and blog.
export const BCP47: Record<Locale, string> = { en: 'en-MY', zh: 'zh-Hans', ms: 'ms-MY' }
