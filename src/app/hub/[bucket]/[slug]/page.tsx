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
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aidecodedbrief.com'

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

      <div className="container mx-auto max-w-article px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/hub" className="hover:text-foreground transition-colors">Hub</Link>
          <span aria-hidden="true" className="text-border">·</span>
          <Link href={`/hub/${article.bucket}`} className="hover:text-foreground capitalize transition-colors">
            {article.bucket}
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8 pb-8 border-b border-border">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <BucketBadge bucket={article.bucket} />
            <ReadingTime minutes={article.readingTimeMin} />
            <time dateTime={article.publishedAt} className="text-2xs text-muted-foreground">
              {formatDate(article.publishedAt)}
            </time>
          </div>
          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
        </header>

        <KeyTakeaways takeaways={article.keyTakeaways} />


        {/* MDX Body */}
        <article className="prose prose-slate max-w-none">
          <MDXRemote
            source={article.body}
            components={mdxComponents}
          />
        </article>

        <SourceList sources={article.sources} />

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-10 border-t border-border pt-8" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Related Articles
            </h2>
            <div>
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
