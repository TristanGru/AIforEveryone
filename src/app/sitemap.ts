import type { MetadataRoute } from 'next'
import { getAllWeeks } from '@/lib/content/weekly'
import { getAllArticles } from '@/lib/content/hub'
import { getAllCareers } from '@/lib/content/careers'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aidecodedbrief.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const weeks = getAllWeeks()
  const articles = getAllArticles()
  const careers = getAllCareers()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/weekly`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/weekly/archive`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${SITE_URL}/hub`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/hub/models`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/hub/business`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/hub/regulation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/hub/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/careers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ]

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/hub/${a.bucket}/${a.slug}`,
    lastModified: new Date(a.lastReviewed),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const careerPages: MetadataRoute.Sitemap = careers.map((c) => ({
    url: `${SITE_URL}/careers/${c.slug}`,
    lastModified: new Date(c.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...articlePages, ...careerPages]
}
