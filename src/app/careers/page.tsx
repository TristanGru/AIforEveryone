import { getAllCareerMeta } from '@/lib/content/careers'
import { getCareersMetadata } from '@/lib/seo/metadata'
import { CareerSearch } from '@/components/careers/CareerSearch'
import { JsonLd } from '@/components/shared/JsonLd'

export const metadata = getCareersMetadata()

export default async function CareersPage() {
  const careers = getAllCareerMeta()
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aidecodedbrief.com'

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Career Impact Pages',
    numberOfItems: careers.length,
    itemListElement: careers.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.title,
      url: `${SITE_URL}/careers/${c.slug}`,
    })),
  }

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <div className="container mx-auto max-w-content px-4 py-10 sm:px-6">
        <header className="mb-8 pb-8 border-b border-border">
          <h1 className="text-2xl font-bold tracking-tight">How AI Affects Your Career</h1>
        </header>

        <CareerSearch careers={careers} />
      </div>
    </>
  )
}
