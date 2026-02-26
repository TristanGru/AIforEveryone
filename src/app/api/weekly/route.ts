import { NextRequest, NextResponse } from 'next/server'
import { getCurrentWeek, getWeekByDate } from '@/lib/content/weekly'
import { startOfWeek } from 'date-fns'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const weekParam = searchParams.get('week')

  try {
    if (weekParam) {
      // Validate format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(weekParam)) {
        return NextResponse.json(
          { error: 'Invalid week format. Expected YYYY-MM-DD.' },
          { status: 400, headers: { 'Cache-Control': 'public, s-maxage=3600' } }
        )
      }

      // Validate it's a real date
      const parsed = new Date(weekParam + 'T00:00:00')
      if (isNaN(parsed.getTime())) {
        return NextResponse.json(
          { error: 'Invalid week format. Expected YYYY-MM-DD.' },
          { status: 400, headers: { 'Cache-Control': 'public, s-maxage=3600' } }
        )
      }

      const list = getWeekByDate(weekParam)
      if (!list) {
        return NextResponse.json(
          { error: 'Week not found.', week: weekParam },
          { status: 404, headers: { 'Cache-Control': 'public, s-maxage=3600' } }
        )
      }

      return NextResponse.json(list, {
        headers: { 'Cache-Control': 'public, s-maxage=3600' },
      })
    }

    const { list } = getCurrentWeek()
    return NextResponse.json(list, {
      headers: { 'Cache-Control': 'public, s-maxage=3600' },
    })
  } catch (err) {
    console.error('[GET /api/weekly]', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
