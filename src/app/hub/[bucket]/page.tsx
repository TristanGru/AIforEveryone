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
    <div className="container mx-auto max-w-article px-4 py-10 sm:px-6">
      <BucketNav activeBucket={bucket} />

      <header className="mb-8 mt-6">
        <h1 className="text-2xl font-bold tracking-tight">{BUCKET_LABELS[bucket]}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'}, newest first
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No articles in this bucket yet. Check back soon.
        </p>
      ) : (
        <div>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
