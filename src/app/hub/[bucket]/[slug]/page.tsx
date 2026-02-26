import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticle, getArticlesByBucket, getRelatedArticles } from '@/lib/content/hub'
import { getArticleMetadata } from '@/lib/seo/metadata'
import { TechnicalToggle } from '@/components/hub/TechnicalToggle'
import { KeyTakeaways } from '@/components/hub/KeyTakeaways'
import { SourceList } from '@/components/hub/SourceList'
import { ArticleCard } from '@/components/hub/ArticleCard'
import { BucketBadge } from '@/components/shared/BucketBadge'
import { LevelBadge } from '@/components/shared/LevelBadge'
import { ReadingTime } from '@/components/shared/ReadingTime'
import { AdSlot } from '@/components/layout/AdSlot'
import { JsonLd } from '@/components/shared/JsonLd'
import { TechnicalModeProvider } from '@/context/TechnicalModeContext'
import { Accessible, Technical } from '@/components/hub/ModeContent'
import { formatDate } from '@/lib/utils'
import type { Bucket } from '@/types'

const VALID_BUCKETS: Bucket[] = ['models', 'business', 'regulation', 'tools']

interface Props {
  params: { bucket: string; slug: string }
}

export async function generateStaticParams() {
  const params: Array<{ bucket: string; slug: string }> = []
  for (const bucket of VALID_BUCKETS) {
    const articles = getArticlesByBucket(bucket)
    for (const article of articles) {
      params.push({ bucket, slug: article.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props) {
  if (!VALID_BUCKETS.includes(params.bucket as Bucket)) return {}
  const article = getArticle(params.bucket as Bucket, params.slug)
  if (!article) return {}
  return getArticleMetadata(article)
}

const mdxComponents = {
  Accessible,
  Technical,
}

export default async function ArticlePage({ params }: Props) {
  if (!VALID_BUCKETS.includes(params.bucket as Bucket)) notFound()

  const bucket = params.bucket as Bucket
  const article = getArticle(bucket, params.slug)
  if (!article) notFound()

  const related = getRelatedArticles(article)
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aidecoded.com'

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.lastReviewed,
    url: `${SITE_URL}/hub/${article.bucket}/${article.slug}`,
    publisher: { '@type': 'Organization', name: 'AI Decoded', url: SITE_URL },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Hub', item: `${SITE_URL}/hub` },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.bucket,
        item: `${SITE_URL}/hub/${article.bucket}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: `${SITE_URL}/hub/${article.bucket}/${article.slug}`,
      },
    ],
  }

  return (
    <TechnicalModeProvider>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <TechnicalToggle />

      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/hub" className="hover:text-foreground">Hub</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/hub/${article.bucket}`} className="hover:text-foreground capitalize">
            {article.bucket}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{article.title}</span>
        </nav>

        {/* Header */}
        <header>
          <div className="flex flex-wrap items-center gap-2">
            <BucketBadge bucket={article.bucket} />
            <LevelBadge level={article.level} />
            <ReadingTime minutes={article.readingTimeMin} />
            <time dateTime={article.publishedAt} className="text-xs text-muted-foreground">
              {formatDate(article.publishedAt)}
            </time>
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight">{article.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{article.excerpt}</p>
        </header>

        <KeyTakeaways takeaways={article.keyTakeaways} />

        <AdSlot slot="article" className="my-6 min-h-[90px]" />

        {/* MDX Body */}
        <article className="prose prose-slate max-w-none">
          <MDXRemote source={article.body} components={mdxComponents} />
        </article>

        <SourceList sources={article.sources} />

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-10 border-t pt-8" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-lg font-semibold">Related Articles</h2>
            <div className="mt-4 space-y-3">
              {related.map((r) => (
                <ArticleCard key={r.slug} article={r} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </TechnicalModeProvider>
  )
}
