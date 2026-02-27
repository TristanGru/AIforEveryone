import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface WeeklyArchiveProps {
  weeks: Array<{ week: string }>
  currentWeek: string
}

export function WeeklyArchive({ weeks, currentWeek }: WeeklyArchiveProps) {
  const pastWeeks = weeks.filter((w) => w.week !== currentWeek)

  if (pastWeeks.length === 0) return null

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="text-sm font-semibold text-foreground mb-4">Past Issues</h2>
      <ul className="space-y-2">
        {pastWeeks.map(({ week }) => (
          <li key={week}>
            <Link
              href={`/weekly/${week}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Week of {formatDate(week)} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
