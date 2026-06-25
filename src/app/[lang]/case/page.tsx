import type { Metadata } from 'next'
import CaseView from '@/components/views/CaseView'
import { pageMetadata } from '@/lib/seo'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata('case', params.lang)
}

export default function Page() {
  return <CaseView />
}
