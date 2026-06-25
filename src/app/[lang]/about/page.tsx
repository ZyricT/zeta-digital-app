import type { Metadata } from 'next'
import AboutView from '@/components/views/AboutView'
import { pageMetadata } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata('about', params.lang)
}

export default function Page() {
  return <AboutView />
}
