import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getWeekByDate, getAllWeeks } from '@/lib/content/weekly'
import { WeeklyList } from '@/components/weekly/WeeklyList'
import { WeeklyCareerSpotlight } from '@/components/weekly/WeeklyCareerSpotlight'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  return getAllWeeks().map(({ week }) => ({ date: week }))
}

export default async function WeekArchivePage({ params }: { params: { date: string } }) {
  const list = getWeekByDate(params.date)
  if (!list) notFound()

  return (
    <div className="container mx-auto max-w-article px-4 py-10 sm:px-6">
      <header className="mb-8 pb-8 border-b border-border">
        <Link
          href="/weekly"
          className="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to this week
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">This Week in AI</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          5 curated reads for the week of {formatDate(list.week)}
        </p>
      </header>

      {list.items.length > 0 ? (
        <>
          <WeeklyList items={list.items} week={list.week} bonusItems={list.bonusItems} />
          {list.careerSpotlightSlug && <WeeklyCareerSpotlight slug={list.careerSpotlightSlug} />}
        </>
      ) : (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No articles for this week.
        </p>
      )}
    </div>
  )
}
