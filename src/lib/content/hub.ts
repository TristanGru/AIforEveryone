import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { HubArticle, Bucket } from '@/types'

const HUB_DIR = path.join(process.cwd(), 'content', 'hub')

const VALID_BUCKETS: Bucket[] = ['models', 'business', 'regulation', 'tools']

function calculateReadingTime(content: string): number {
  // Base reading time on the Accessible section only (the default view)
  const introText = content.match(/^([\s\S]*?)<Accessible>/)?.[1] ?? ''
  const accessibleText = content.match(/<Accessible>([\s\S]*?)<\/Accessible>/)?.[1] ?? content

  const plainText = (introText + accessibleText)
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~|]/g, '')
    .trim()
  const wordCount = plainText.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(wordCount / 230))
}

function getAllBuckets(): Bucket[] {
  if (!fs.existsSync(HUB_DIR)) return []
  return fs
    .readdirSync(HUB_DIR)
    .filter((d) => VALID_BUCKETS.includes(d as Bucket)) as Bucket[]
}

function parseArticleFile(bucket: Bucket, filename: string): HubArticle | null {
  const filePath = path.join(HUB_DIR, bucket, filename)
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const slug = filename.replace('.mdx', '')

    if (data.slug && data.slug !== slug) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[hub] Slug mismatch in ${filename}: frontmatter="${data.slug}" file="${slug}"`)
      }
    }

    const relatedSlugs = (data.relatedSlugs ?? []) as string[]
    let validRelated: string[] = []
    if (relatedSlugs.length > 0) {
      const bucketDir = path.join(HUB_DIR, bucket)
      const allSlugsInBucket = fs.existsSync(bucketDir)
        ? fs.readdirSync(bucketDir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace('.mdx', ''))
        : []
      validRelated = relatedSlugs.filter((s) => {
        if (!allSlugsInBucket.includes(s)) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`[hub] Missing related slug "${s}" in ${filename}`)
          }
          return false
        }
        return true
      })
    }

    return {
      slug,
      bucket,
      title: data.title as string,
      level: data.level,
      readingTimeMin: calculateReadingTime(content),
      excerpt: data.excerpt as string,
      keyTakeaways: data.keyTakeaways as [string, string, string],
      publishedAt: data.publishedAt as string,
      lastReviewed: data.lastReviewed as string,
      sources: data.sources ?? [],
      relatedSlugs: validRelated,
      tags: data.tags,
      body: content,
    }
  } catch {
    return null
  }
}

export function getArticlesByBucket(bucket: Bucket): HubArticle[] {
  const bucketDir = path.join(HUB_DIR, bucket)
  if (!fs.existsSync(bucketDir)) return []

  return fs
    .readdirSync(bucketDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => parseArticleFile(bucket, filename))
    .filter((a): a is HubArticle => a !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getArticle(bucket: Bucket, slug: string): HubArticle | null {
  return parseArticleFile(bucket, `${slug}.mdx`)
}

export function getAllArticles(): HubArticle[] {
  return getAllBuckets()
    .flatMap((bucket) => getArticlesByBucket(bucket))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getRelatedArticles(article: HubArticle): HubArticle[] {
  if (!article.relatedSlugs?.length) return []
  return article.relatedSlugs
    .map((slug) => getArticle(article.bucket, slug))
    .filter((a): a is HubArticle => a !== null)
    .slice(0, 3)
}
