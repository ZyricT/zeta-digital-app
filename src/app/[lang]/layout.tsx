import { notFound } from 'next/navigation'
import { LOCALES, isLocale } from '@/lib/locale'

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isLocale(params.lang)) notFound()
  return <>{children}</>
}
