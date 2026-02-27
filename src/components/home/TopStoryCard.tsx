import Link from 'next/link'
import { BucketBadge } from '@/components/shared/BucketBadge'
import { ReadingTime } from '@/components/shared/ReadingTime'
import type { WeeklyItem } from '@/types'
import { formatDate } from '@/lib/utils'

interface TopStoryCardProps {
  item: WeeklyItem
  week: string
}

export function TopStoryCard({ item, week }: TopStoryCardProps) {
  return (
    <section aria-labelledby="top-story-heading" className="border-b border-border py-10">
      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <div className="flex items-baseline gap-3 mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Top Story
          </p>
          <span className="text-xs text-muted-foreground">— Week of {formatDate(week)}</span>
        </div>

        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <BucketBadge bucket={item.bucket} />
            <ReadingTime minutes={item.readingTimeMin} />
          </div>

          <h2 id="top-story-heading" className="font-serif text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {item.title}
            </a>
          </h2>

          <p className="mt-1.5 text-sm text-muted-foreground">{item.source}</p>
          <p className="mt-3 text-base leading-relaxed text-foreground/80">{item.summary}</p>

          <div className="mt-5 flex items-center gap-6">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
            >
              Read article →
            </a>
            <Link
              href="/weekly"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Full week&apos;s list
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
