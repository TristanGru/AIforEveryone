import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createHash, timingSafeEqual } from 'crypto'

const VALID_PATHS = ['/weekly']

function timingSafeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(createHash('sha256').update(a).digest('hex'))
    const bufB = Buffer.from(createHash('sha256').update(b).digest('hex'))
    return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')
  const envSecret = process.env.REVALIDATE_SECRET

  if (!envSecret || !secret || !timingSafeCompare(secret, envSecret)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let body: { path?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { path } = body

  if (!path || !VALID_PATHS.includes(path)) {
    return NextResponse.json(
      { error: 'Invalid path. Allowed: /weekly' },
      { status: 400 }
    )
  }

  try {
    revalidatePath(path)
    console.info('[revalidate]', { path, timestamp: new Date().toISOString() })
    return NextResponse.json({ revalidated: true, path })
  } catch (err) {
    console.error('[POST /api/revalidate]', err)
    return NextResponse.json({ error: 'Revalidation failed.' }, { status: 500 })
  }
}
