import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/sanity/client'

const BASE = 'https://nothingimpossible.com.my'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['', '/packages', '/services', '/case', '/about', '/blog', '/contact']
  const staticRoutes: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: r === '' ? 'weekly' : 'monthly',
    priority: r === '' ? 1 : 0.7,
  }))

  let posts: any[] = []
  try { posts = await getAllPosts() } catch { posts = [] }
  const postRoutes: MetadataRoute.Sitemap = (posts || []).map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
