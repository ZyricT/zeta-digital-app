import { NextRequest, NextResponse } from 'next/server'
import { LOCALES } from '@/lib/locale'

// Routes that are NOT locale-prefixed (kept at their own URLs).
const EXCLUDE = ['/api', '/studio', '/blog', '/thank-you', '/privacy', '/terms', '/_next']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Static files (have a dot): robots.txt, llms.txt, sitemap.xml, icons, etc.
  if (pathname.includes('.')) return
  // Excluded route trees stay as-is.
  if (EXCLUDE.some((p) => pathname === p || pathname.startsWith(p + '/'))) return
  // Already locale-prefixed → continue.
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return

  // Everything else (incl. "/") → redirect to the English locale equivalent.
  const url = req.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url, 308) // permanent — old URLs moved for good
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
