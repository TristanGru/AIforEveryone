import Fuse from 'fuse.js'
import type { HubArticle, CareerMeta } from '@/types'

export interface SearchResult {
  type: 'article' | 'career'
  title: string
  url: string
  excerpt: string
  score: number
}

interface SearchItem {
  type: 'article' | 'career'
  title: string
  url: string
  excerpt: string
}

export function buildSearchIndex(articles: HubArticle[], careers: CareerMeta[]) {
  const items: SearchItem[] = [
    ...articles.map((a) => ({
      type: 'article' as const,
      title: a.title,
      url: `/hub/${a.bucket}/${a.slug}`,
      excerpt: a.excerpt,
    })),
    ...careers.map((c) => ({
      type: 'career' as const,
      title: c.title,
      url: `/professional-impacts/${c.slug}`,
      excerpt: c.summary,
    })),
  ]

  const fuse = new Fuse(items, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'excerpt', weight: 0.3 },
    ],
    threshold: 0.4,
    includeScore: true,
  })

  return function search(query: string): SearchResult[] {
    const results = fuse.search(query, { limit: 10 })
    return results.map((r) => ({
      ...r.item,
      score: r.score ? 1 - r.score : 1,
    }))
  }
}

export function buildCareerSearchIndex(careers: CareerMeta[]) {
  const fuse = new Fuse(careers, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'summary', weight: 0.3 },
    ],
    threshold: 0.4,
    includeScore: true,
  })

  return function search(query: string): CareerMeta[] {
    if (!query.trim()) return careers
    return fuse.search(query, { limit: 50 }).map((r) => r.item)
  }
}
