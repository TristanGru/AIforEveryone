import fs from 'fs'
import path from 'path'
import { startOfWeek, format } from 'date-fns'

const monday = startOfWeek(new Date(), { weekStartsOn: 1 })
const dateStr = format(monday, 'yyyy-MM-dd')
const filename = `${dateStr}.mdx`
const filePath = path.join(process.cwd(), 'content', 'weekly', filename)

if (fs.existsSync(filePath)) {
  console.info(`File already exists: content/weekly/${filename}`)
  process.exit(0)
}

const template = `---
week: '${dateStr}'
featuredSlot: 1
items:
  - id: '${dateStr}-item-1'
    slot: 1
    title: '<!-- TODO: Article title -->'
    source: '<!-- TODO: Publisher name -->'
    url: 'https://example.com/article-1'
    bucket: 'business'
    level: 'accessible'
    readingTimeMin: 8
    dayHint: 'sunday'
    summary: >
      <!-- TODO: 2-3 sentence original summary. Min 50 chars, max 600 chars.
      Describe what the article covers and why it matters. -->
    tags: []

  - id: '${dateStr}-item-2'
    slot: 2
    title: '<!-- TODO: Article title -->'
    source: '<!-- TODO: Publisher name -->'
    url: 'https://example.com/article-2'
    bucket: 'models'
    level: 'accessible'
    readingTimeMin: 6
    dayHint: 'wednesday'
    summary: >
      <!-- TODO: 2-3 sentence original summary. -->
    tags: []

  - id: '${dateStr}-item-3'
    slot: 3
    title: '<!-- TODO: Article title -->'
    source: '<!-- TODO: Publisher name -->'
    url: 'https://example.com/article-3'
    bucket: 'tools'
    level: 'accessible'
    readingTimeMin: 5
    dayHint: 'wednesday'
    summary: >
      <!-- TODO: 2-3 sentence original summary. -->
    tags: []

  - id: '${dateStr}-item-4'
    slot: 4
    title: '<!-- TODO: Article title -->'
    source: '<!-- TODO: Publisher name -->'
    url: 'https://example.com/article-4'
    bucket: 'regulation'
    level: 'accessible'
    readingTimeMin: 7
    dayHint: 'friday'
    summary: >
      <!-- TODO: 2-3 sentence original summary. -->
    tags: []

  - id: '${dateStr}-item-5'
    slot: 5
    title: '<!-- TODO: Article title -->'
    source: '<!-- TODO: Publisher name -->'
    url: 'https://example.com/article-5'
    bucket: 'models'
    level: 'technical'
    readingTimeMin: 12
    dayHint: 'friday'
    summary: >
      <!-- TODO: 2-3 sentence original summary. -->
    tags: []
---
`

fs.mkdirSync(path.dirname(filePath), { recursive: true })
fs.writeFileSync(filePath, template, 'utf-8')
console.info(`✓ Created: content/weekly/${filename}`)
console.info('Fill in all 5 items, then push to main.')
