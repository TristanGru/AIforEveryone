import { getCurrentWeek, getAllWeeks } from '@/lib/content/weekly'
import { getWeeklyMetadata } from '@/lib/seo/metadata'
import { WeeklyList } from '@/components/weekly/WeeklyList'
import { WeeklyCareerSpotlight } from '@/components/weekly/WeeklyCareerSpotlight'
import { WeeklyArchive } from '@/components/weekly/WeeklyArchive'
import { JsonLd } from '@/components/shared/JsonLd'
import { formatDate } from '@/lib/utils'

export async function generateMetadata() {
  const { list } = getCurrentWeek()
  return getWeeklyMetadata(list)
}

export default async function WeeklyPage() {
  const { list, isFallback, fallbackFrom } = getCurrentWeek()
  const allWeeks = getAllWeeks()

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `AI Decoded Weekly Reading List — ${list.week}`,
    numberOfItems: list.items.length,
    itemListElement: list.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.title,
      url: item.url,
    })),
  }

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <div className="container mx-auto max-w-article px-4 py-10 sm:px-6">
        <header className="mb-8 pb-8 border-b border-border">
          <h1 className="text-2xl font-bold tracking-tight">This Week in AI</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            5 curated reads for the week of {formatDate(list.week)}
          </p>

          {isFallback && fallbackFrom && (
            <p className="mt-3 text-sm text-muted-foreground italic">
              Showing list from {formatDate(list.week)} — new list coming Monday.
            </p>
          )}
        </header>

{list.items.length > 0 ? (
          <>
            <WeeklyList items={list.items} week={list.week} bonusItems={list.bonusItems} />
            {list.careerSpotlightSlug && <WeeklyCareerSpotlight slug={list.careerSpotlightSlug} />}
          </>
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No articles published yet. Check back Monday.
          </p>
        )}

        <WeeklyArchive weeks={allWeeks} currentWeek={list.week} />
      </div>
    </>
  )
}
