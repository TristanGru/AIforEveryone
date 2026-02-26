import { notFound } from 'next/navigation'
import { getArticlesByBucket } from '@/lib/content/hub'
import { getBucketMetadata } from '@/lib/seo/metadata'
import { ArticleCard } from '@/components/hub/ArticleCard'
import { BucketNav } from '@/components/hub/BucketNav'
import type { Bucket } from '@/types'

const VALID_BUCKETS: Bucket[] = ['models', 'business', 'regulation', 'tools']

interface Props {
  params: { bucket: string }
}

export async function generateStaticParams() {
  return VALID_BUCKETS.map((bucket) => ({ bucket }))
}

export async function generateMetadata({ params }: Props) {
  if (!VALID_BUCKETS.includes(params.bucket as Bucket)) return {}
  return getBucketMetadata(params.bucket)
}

export default async function BucketPage({ params }: Props) {
  if (!VALID_BUCKETS.includes(params.bucket as Bucket)) notFound()

  const bucket = params.bucket as Bucket
  const articles = getArticlesByBucket(bucket)

  const BUCKET_LABELS: Record<Bucket, string> = {
    models: 'AI Models',
    business: 'AI in Business',
    regulation: 'AI Regulation',
    tools: 'AI Tools',
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <BucketNav activeBucket={bucket} />

      <header className="mb-8 mt-6">
        <h1 className="text-3xl font-bold">{BUCKET_LABELS[bucket]}</h1>
        <p className="mt-1 text-muted-foreground">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'}, sorted by newest
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
          No articles in this bucket yet. Check back soon.
        </p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
