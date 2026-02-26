import { getISOWeek } from 'date-fns'
import { getCurrentWeek, getFeaturedItem } from '@/lib/content/weekly'
import { getAllCareerMeta } from '@/lib/content/careers'
import { getHomeMetadata } from '@/lib/seo/metadata'
import { HeroSection } from '@/components/home/HeroSection'
import { TopStoryCard } from '@/components/home/TopStoryCard'
import { BucketGrid } from '@/components/home/BucketGrid'
import { CareerSpotlight } from '@/components/home/CareerSpotlight'
import { AdSlot } from '@/components/layout/AdSlot'
import { JsonLd } from '@/components/shared/JsonLd'

export const metadata = getHomeMetadata()

export default async function HomePage() {
  const { list } = getCurrentWeek()
  const featuredItem = list.items.length > 0 ? getFeaturedItem(list) : null
  const allCareers = getAllCareerMeta()

  // Deterministic career spotlight selection (BL-005)
  const spotlightCareer =
    allCareers.length > 0 ? allCareers[getISOWeek(new Date()) % allCareers.length] : null

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Decoded',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aidecoded.com',
    description: metadata.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aidecoded.com'}/careers?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <HeroSection />
      {featuredItem && <TopStoryCard item={featuredItem} week={list.week} />}
      <BucketGrid />
      {spotlightCareer && <CareerSpotlight career={spotlightCareer} />}
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <AdSlot slot="hero" className="min-h-[90px]" />
      </div>
    </>
  )
}
