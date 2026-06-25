import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/sanity/client'
import { LOCALES } from '@/lib/locale'

const BASE = 'https://nothingimpossible.com.my'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Locale-prefixed marketing routes (/en, /zh, /ms × each page)
  const marketing = ['', '/services', '/packages', '/case', '/about', '/contact']
  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((lang) =>
    marketing.map((r) => ({
      url: `${BASE}/${lang}${r}`,
      lastModified: new Date(),
      changeFrequency: r === '' ? ('weekly' as const) : ('monthly' as const),
      priority: r === '' ? 1 : 0.7,
    }))
  )

  // Blog index (not locale-prefixed)
  staticRoutes.push({
    url: `${BASE}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  })

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
