import { NextRequest, NextResponse } from 'next/server'
import { getAllCareerMeta, getCareersByCategory } from '@/lib/content/careers'
import type { CareerCategory } from '@/types'

export const dynamic = 'force-dynamic'

const VALID_CATEGORIES: CareerCategory[] = ['white-collar', 'creative', 'healthcare']

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const categoryParam = searchParams.get('category')

  try {
    if (categoryParam) {
      if (!VALID_CATEGORIES.includes(categoryParam as CareerCategory)) {
        return NextResponse.json(
          { error: 'Invalid category value.' },
          { status: 400, headers: { 'Cache-Control': 'public, s-maxage=3600' } }
        )
      }

      const careers = getCareersByCategory(categoryParam as CareerCategory)
      const meta = careers.map(({ slug, title, category, threatLevel, summary, lastUpdated, publishedAt }) => ({
        slug, title, category, threatLevel, summary, lastUpdated, publishedAt,
      }))

      return NextResponse.json(meta, {
        headers: { 'Cache-Control': 'public, s-maxage=3600' },
      })
    }

    const careers = getAllCareerMeta()
    return NextResponse.json(careers, {
      headers: { 'Cache-Control': 'public, s-maxage=3600' },
    })
  } catch (err) {
    console.error('[GET /api/careers]', err)
    return NextResponse.json(
      { error: 'Failed to load career data.' },
      { status: 500 }
    )
  }
}
