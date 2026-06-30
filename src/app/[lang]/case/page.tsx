import type { Metadata } from 'next'
import CaseView from '@/components/views/CaseView'
import { pageMetadata } from '@/lib/seo'
import { getCaseStudies } from '@/sanity/client'
import type { CaseStudy } from '@/components/views/CaseView'

export const revalidate = 3600

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata('case', params.lang)
}

export default async function Page({ params }: { params: { lang: string } }) {
  let cases: CaseStudy[] = []
  try {
    cases = await getCaseStudies(params.lang)
  } catch {
    cases = []
  }
  return <CaseView cases={cases} />
}
