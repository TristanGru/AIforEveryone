import Link from 'next/link'
import { getAllWeeks } from '@/lib/content/weekly'
import { getWeeklyArchiveMetadata } from '@/lib/seo/metadata'
import { formatDate } from '@/lib/utils'

export const metadata = getWeeklyArchiveMetadata()

export default async function WeeklyArchivePage() {
  const weeks = getAllWeeks()

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Weekly Archive</h1>
        <p className="mt-1 text-muted-foreground">All past reading lists, newest first.</p>
      </header>

      {weeks.length === 0 ? (
        <p className="text-muted-foreground">No past weeks yet.</p>
      ) : (
        <ul className="divide-y rounded-xl border bg-card">
          {weeks.map(({ week }) => (
            <li key={week}>
              <Link
                href={`/weekly?week=${week}`}
                className="flex items-center justify-between px-5 py-4 text-sm hover:bg-accent"
              >
                <span className="font-medium">Week of {formatDate(week)}</span>
                <span className="text-xs text-muted-foreground">5 articles →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
