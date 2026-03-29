import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Resend } from 'resend'
import { format, parseISO } from 'date-fns'

const WEEKLY_DIR = path.join(process.cwd(), 'content', 'weekly')
const SITE_URL = 'https://aidecodedbrief.com'

interface WeeklyItem {
  slot: number
  title: string
  source: string
  url: string
  summary: string
  readingTimeMin: number
}

interface BonusItem {
  title: string
  source: string
  url: string
  why?: string
}

function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'MMMM d, yyyy')
}

function buildEmail(weekDate: string, items: WeeklyItem[], bonusItems: BonusItem[]): string {
  const weekUrl = `${SITE_URL}/weekly`
  const formattedDate = formatDate(weekDate)

  const itemsHtml = items
    .sort((a, b) => a.slot - b.slot)
    .map(
      (item) => `
      <tr>
        <td style="padding:20px 0;border-bottom:1px solid #e5e7eb;">
          <p style="margin:0 0 4px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">${item.source} &middot; ${item.readingTimeMin} min read</p>
          <h2 style="margin:0 0 8px;font-size:17px;font-weight:600;color:#111827;">
            <a href="${item.url}" style="color:#111827;text-decoration:none;">${item.title}</a>
          </h2>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#374151;">${item.summary.trim()}</p>
        </td>
      </tr>
    `
    )
    .join('')

  const bonusHtml =
    bonusItems.length > 0
      ? `
    <tr>
      <td style="padding:24px 0 8px;">
        <h3 style="margin:0 0 16px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;">Also worth reading</h3>
        ${bonusItems
          .map(
            (b) => `
          <p style="margin:0 0 10px;font-size:14px;color:#374151;">
            <a href="${b.url}" style="color:#111827;font-weight:500;text-decoration:underline;">${b.title}</a>
            <span style="color:#6b7280;"> — ${b.source}</span>
          </p>
        `
          )
          .join('')}
      </td>
    </tr>
  `
      : ''

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
          <tr>
            <td style="padding:28px 32px 24px;border-bottom:2px solid #111827;">
              <p style="margin:0 0 4px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">AI Decoded</p>
              <h1 style="margin:0 0 4px;font-size:22px;font-weight:700;color:#111827;">This Week in AI</h1>
              <p style="margin:0;font-size:13px;color:#6b7280;">5 reads for the week of ${formattedDate}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${itemsHtml}
                ${bonusHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;border-top:1px solid #e5e7eb;background:#f9fafb;">
              <p style="margin:0 0 8px;font-size:13px;color:#374151;">
                <a href="${weekUrl}" style="color:#111827;font-weight:500;">Read this issue on the site &rarr;</a>
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                You're receiving this because you subscribed at aidecodedbrief.com.<br>
                <a href="{{{ unsubscribe_url }}}" style="color:#9ca3af;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

async function main() {
  const weekDate = process.argv[2]
  if (!weekDate || !/^\d{4}-\d{2}-\d{2}$/.test(weekDate)) {
    console.error('Usage: npx tsx scripts/send-newsletter.ts <YYYY-MM-DD>')
    process.exit(1)
  }

  const filePath = path.join(WEEKLY_DIR, `${weekDate}.mdx`)
  if (!fs.existsSync(filePath)) {
    console.error(`Weekly file not found: ${filePath}`)
    process.exit(1)
  }

  const { data } = matter(fs.readFileSync(filePath, 'utf-8'))
  const items = (data.items ?? []) as WeeklyItem[]
  const bonusItems = (data.bonusItems ?? []) as BonusItem[]

  if (items.length === 0) {
    console.error('Weekly file has no items — aborting send.')
    process.exit(1)
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const fromEmail = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !audienceId || !fromEmail) {
    console.error('Missing required env vars: RESEND_API_KEY, RESEND_AUDIENCE_ID, RESEND_FROM_EMAIL')
    process.exit(1)
  }

  const resend = new Resend(apiKey)
  const subject = `This Week in AI — ${formatDate(weekDate)}`
  const html = buildEmail(weekDate, items, bonusItems)

  const { data: broadcast, error: createError } = await resend.broadcasts.create({
    audienceId,
    from: fromEmail,
    subject,
    html,
    name: `Weekly ${weekDate}`,
  })

  if (createError || !broadcast) {
    console.error('Failed to create broadcast:', createError)
    process.exit(1)
  }

  const { error: sendError } = await resend.broadcasts.send(broadcast.id)
  if (sendError) {
    console.error('Failed to send broadcast:', sendError)
    process.exit(1)
  }

  console.log(`Newsletter sent for week of ${weekDate} (broadcast id: ${broadcast.id})`)
}

main()
