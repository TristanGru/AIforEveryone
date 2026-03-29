import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  let body: { email?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  try {
    await resend.contacts.create({ email, audienceId, unsubscribed: false })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message.includes('already exists')) {
      return NextResponse.json({ success: true, alreadySubscribed: true })
    }
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
