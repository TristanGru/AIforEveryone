import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseArgs(): { title: string; bucket: string; level: string } {
  const args = process.argv.slice(2)
  let title = ''
  let bucket = 'business'
  let level = 'accessible'
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--title' && args[i + 1]) title = args[++i]
    if (args[i] === '--bucket' && args[i + 1]) bucket = args[++i]
    if (args[i] === '--level' && args[i + 1]) level = args[++i]
  }
  if (!title) {
    console.error(
      'Usage: npm run new-article -- --title "My Article" --bucket business --level accessible'
    )
    process.exit(1)
  }
  return { title, bucket, level }
}

const { title, bucket, level } = parseArgs()
const slug = slugify(title)
const dateStr = format(new Date(), 'yyyy-MM-dd')
const filename = `${slug}.mdx`
const filePath = path.join(process.cwd(), 'content', 'hub', bucket, filename)

if (fs.existsSync(filePath)) {
  console.info(`File already exists: content/hub/${bucket}/${filename}`)
  process.exit(0)
}

const template = `---
slug: '${slug}'
bucket: '${bucket}'
title: '${title}'
level: '${level}'
readingTimeMin: 8
excerpt: >
  <!-- TODO: 1-2 sentence excerpt for article cards. Min 50 chars, max 300 chars. -->
keyTakeaways:
  - '<!-- TODO: First key takeaway. Max 200 chars. -->'
  - '<!-- TODO: Second key takeaway. Max 200 chars. -->'
  - '<!-- TODO: Third key takeaway. Max 200 chars. -->'
publishedAt: '${dateStr}'
lastReviewed: '${dateStr}'
sources:
  - name: '<!-- TODO: Source name -->'
    url: 'https://example.com/source'
    note: ''
relatedSlugs: []
tags: []
---

<!-- TODO: Write the article body here. Use <Accessible> and <Technical> tags. -->

<Accessible>
<!-- TODO: Accessible explanation. -->
</Accessible>

<Technical>
<!-- TODO: Technical deep-dive. -->
</Technical>
`

fs.mkdirSync(path.dirname(filePath), { recursive: true })
fs.writeFileSync(filePath, template, 'utf-8')
console.info(`✓ Created: content/hub/${bucket}/${filename}`)
console.info('Fill in all TODO fields, then push to main.')
