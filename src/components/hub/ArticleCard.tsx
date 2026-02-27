import Link from 'next/link'
import { BucketBadge } from '@/components/shared/BucketBadge'
import { ReadingTime } from '@/components/shared/ReadingTime'
import { formatDate, isNewContent } from '@/lib/utils'
import type { HubArticle } from '@/types'

interface ArticleCardProps {
  article: HubArticle
  compact?: boolean
}

export function ArticleCard({ article, compact = false }: ArticleCardProps) {
  const href = `/hub/${article.bucket}/${article.slug}`
  const isNew = isNewContent(article.publishedAt)

  if (compact) {
    return (
      <div className="group border-b border-border py-4 last:border-b-0">
        <div className="flex items-center gap-3 mb-1.5">
          <BucketBadge bucket={article.bucket} />
          <ReadingTime minutes={article.readingTimeMin} />
          {isNew && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-2xs font-semibold text-primary">
              New
            </span>
          )}
        </div>
        <Link
          href={href}
          className="text-sm font-medium leading-snug text-foreground hover:text-primary transition-colors"
        >
          {article.title}
        </Link>
      </div>
    )
  }

  return (
    <article className="border-b border-border py-6 last:border-b-0">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <BucketBadge bucket={article.bucket} />
        <ReadingTime minutes={article.readingTimeMin} />
        <time dateTime={article.publishedAt} className="text-2xs text-muted-foreground">
          {formatDate(article.publishedAt)}
        </time>
        {isNew && (
          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-2xs font-semibold text-primary">
            New
          </span>
        )}
      </div>

      <h2 className="text-lg font-semibold leading-snug tracking-tight">
        <Link href={href} className="hover:text-primary transition-colors">
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
      <Link
        href={href}
        className="mt-3 inline-flex text-sm font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
      >
        Read article →
      </Link>
    </article>
  )
}
