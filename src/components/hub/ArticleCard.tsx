import Link from 'next/link'
import { BucketBadge } from '@/components/shared/BucketBadge'
import { LevelBadge } from '@/components/shared/LevelBadge'
import { ReadingTime } from '@/components/shared/ReadingTime'
import { formatDate } from '@/lib/utils'
import type { HubArticle } from '@/types'

interface ArticleCardProps {
  article: HubArticle
  compact?: boolean
}

export function ArticleCard({ article, compact = false }: ArticleCardProps) {
  const href = `/hub/${article.bucket}/${article.slug}`

  if (compact) {
    return (
      <Link
        href={href}
        className="block rounded-lg border bg-card p-4 text-sm hover:bg-accent transition-colors"
      >
        <p className="font-medium leading-snug hover:text-primary">{article.title}</p>
        <div className="mt-1 flex items-center gap-2">
          <BucketBadge bucket={article.bucket} />
          <ReadingTime minutes={article.readingTimeMin} />
        </div>
      </Link>
    )
  }

  return (
    <article className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <BucketBadge bucket={article.bucket} />
        <LevelBadge level={article.level} />
        <ReadingTime minutes={article.readingTimeMin} />
        <time dateTime={article.publishedAt} className="text-xs text-muted-foreground">
          {formatDate(article.publishedAt)}
        </time>
      </div>
      <h2 className="mt-3 text-lg font-semibold leading-snug">
        <Link href={href} className="hover:text-primary hover:underline">
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
      <Link href={href} className="mt-3 inline-flex text-sm font-medium text-primary hover:underline">
        Read article →
      </Link>
    </article>
  )
}
