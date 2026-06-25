import type { Metadata } from 'next'
import PackagesView from '@/components/views/PackagesView'
import { pageMetadata } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata('packages', params.lang)
}

export default function Page() {
  return <PackagesView />
}
