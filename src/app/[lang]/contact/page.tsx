import type { Metadata } from 'next'
import ContactView from '@/components/views/ContactView'
import { pageMetadata } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata('contact', params.lang)
}

export default function Page() {
  return <ContactView />
}
