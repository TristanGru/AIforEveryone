import { getAllWeeklyItems } from '@/lib/content/weekly'
import { BucketBadge } from '@/components/shared/BucketBadge'
import { ReadingTime } from '@/components/shared/ReadingTime'

interface WeeklySignalProps {
  weeklySignalId?: string
  careerTitle: string
}

export function WeeklySignal({ weeklySignalId, careerTitle }: WeeklySignalProps) {
  if (!weeklySignalId) {
    return (
      <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
        Check back Monday for this week&apos;s most relevant AI development for {careerTitle}.
      </div>
    )
  }

  const allItems = getAllWeeklyItems()
  const matched = allItems.find((item) => item.id === weeklySignalId)

  if (!matched) {
    return (
      <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
        Check back Monday for this week&apos;s most relevant AI development for {careerTitle}.
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <BucketBadge bucket={matched.bucket} />
        <ReadingTime minutes={matched.readingTimeMin} />
      </div>
      <p className="mt-2 font-medium leading-snug">
        <a
          href={matched.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary hover:underline"
        >
          {matched.title}
        </a>
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">{matched.source}</p>
      <p className="mt-2 text-sm text-foreground/80">{matched.summary}</p>
    </div>
  )
}
