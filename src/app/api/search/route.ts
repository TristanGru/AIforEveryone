import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/content/hub'
import { getAllCareerMeta } from '@/lib/content/careers'
import { buildSearchIndex } from '@/lib/search'

export const dynamic = 'force-dynamic'

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const q = searchParams.get('q')

  if (!q) {
    return NextResponse.json(
      { error: 'Query too short. Minimum 2 characters.' },
      { status: 400, headers: { 'Cache-Control': 'public, s-maxage=3600' } }
    )
  }

  const clean = stripHtml(q)

  if (clean.length < 2) {
    return NextResponse.json(
      { error: 'Query too short. Minimum 2 characters.' },
      { status: 400, headers: { 'Cache-Control': 'public, s-maxage=3600' } }
    )
  }

  if (clean.length > 100) {
    return NextResponse.json(
      { error: 'Query too long. Maximum 100 characters.' },
      { status: 400, headers: { 'Cache-Control': 'public, s-maxage=3600' } }
    )
  }

  try {
    const articles = getAllArticles()
    const careers = getAllCareerMeta()
    const search = buildSearchIndex(articles, careers)
    const results = search(clean)

    return NextResponse.json(
      { query: clean, results },
      { headers: { 'Cache-Control': 'public, s-maxage=3600' } }
    )
  } catch (err) {
    console.error('[GET /api/search]', err)
    return NextResponse.json({ error: 'Search failed.' }, { status: 500 })
  }
}
