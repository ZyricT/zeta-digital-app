import type { Metadata } from 'next'
import BlogList from '@/components/BlogList'
import { getAllPosts } from '@/sanity/client'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog — Digital Marketing Insights Malaysia | Zeta Digital',
  description: 'Strategy, AI and growth playbooks for ambitious Malaysian brands — SEO, Google Ads, Meta Ads, WhatsApp marketing, email and Agentic AI.',
  alternates: { canonical: 'https://nothingimpossible.com.my/blog' },
  openGraph: {
    title: 'Zeta Digital Blog — Digital Marketing Insights Malaysia',
    description: 'Strategy, AI and growth playbooks for ambitious Malaysian brands.',
    url: 'https://nothingimpossible.com.my/blog',
    siteName: 'Zeta Digital',
    type: 'website',
  },
}

export default async function BlogPage() {
  let posts: any[] = []
  try { posts = await getAllPosts() } catch { posts = [] }
  return <BlogList posts={posts || []} />
}
