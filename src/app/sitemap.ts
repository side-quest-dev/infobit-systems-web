import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'

// Fixed date — update manually when content changes significantly
// Using new Date() would signal every page changed on every deploy
const LAST_MODIFIED = new Date('2026-06-03')

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = siteConfig.services.map(s => ({
    url: `${base}/services/${s.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
