import type { Metadata } from 'next'
import HomeView from '@/components/views/HomeView'
import { pageMetadata } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata('', params.lang)
}

export default function Page() {
  return <HomeView />
}
