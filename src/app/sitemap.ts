import type { MetadataRoute } from 'next'

const BASE = 'https://nothingimpossible.com.my'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/packages', '/services', '/case', '/about', '/blog', '/contact']
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: r === '' ? 'weekly' : 'monthly',
    priority: r === '' ? 1 : 0.7,
  }))
}
