import { getCurrentWeek } from '@/lib/content/weekly'
import { getWeeklyMetadata } from '@/lib/seo/metadata'
import { WeeklyList } from '@/components/weekly/WeeklyList'
import { AdSlot } from '@/components/layout/AdSlot'
import { JsonLd } from '@/components/shared/JsonLd'
import { formatDate } from '@/lib/utils'

export const revalidate = 3600

export async function generateMetadata() {
  const { list } = getCurrentWeek()
  return getWeeklyMetadata(list)
}

export default async function WeeklyPage() {
  const { list, isFallback, fallbackFrom } = getCurrentWeek()

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
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">This Week in AI</h1>
          <p className="mt-1 text-muted-foreground">
            5 curated reads for the week of {formatDate(list.week)}
          </p>

          {isFallback && fallbackFrom && (
            <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Showing list from {formatDate(list.week)} — new list coming Monday.
            </div>
          )}
        </header>

        <AdSlot slot="hero" className="mb-8 min-h-[90px]" />

        {list.items.length > 0 ? (
          <WeeklyList items={list.items} week={list.week} />
        ) : (
          <p className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
            No articles published yet. Check back Monday.
          </p>
        )}
      </div>
    </>
  )
}
