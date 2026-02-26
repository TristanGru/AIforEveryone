import type { Bucket, Level } from './weekly'

export type { Bucket, Level }

export interface Source {
  name: string
  url: string
  note?: string
}

export interface HubArticle {
  slug: string
  bucket: Bucket
  title: string
  level: Level
  readingTimeMin: number
  excerpt: string
  keyTakeaways: [string, string, string]
  publishedAt: string
  lastReviewed: string
  sources: Source[]
  relatedSlugs?: string[]
  tags?: string[]
  body: string
}
