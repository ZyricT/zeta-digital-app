import type { Metadata } from 'next'
import ServicesView from '@/components/views/ServicesView'
import { pageMetadata } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata('services', params.lang)
}

export default function Page() {
  return <ServicesView />
}
