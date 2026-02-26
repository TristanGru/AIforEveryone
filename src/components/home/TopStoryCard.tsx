import Link from 'next/link'
import { BucketBadge } from '@/components/shared/BucketBadge'
import { LevelBadge } from '@/components/shared/LevelBadge'
import { ReadingTime } from '@/components/shared/ReadingTime'
import type { WeeklyItem } from '@/types'
import { formatDate } from '@/lib/utils'

interface TopStoryCardProps {
  item: WeeklyItem
  week: string
}

export function TopStoryCard({ item, week }: TopStoryCardProps) {
  return (
    <section aria-labelledby="top-story-heading" className="py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Top Story — Week of {formatDate(week)}
        </p>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <BucketBadge bucket={item.bucket} />
            <LevelBadge level={item.level} />
            <ReadingTime minutes={item.readingTimeMin} />
          </div>
          <h2 id="top-story-heading" className="mt-3 text-xl font-semibold leading-snug sm:text-2xl">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline"
            >
              {item.title}
            </a>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{item.source}</p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">{item.summary}</p>
          <div className="mt-4">
            <Link href="/weekly" className="text-sm font-medium text-primary hover:underline">
              See full weekly list →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
