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

function parseArgs(): { title: string; category: string } {
  const args = process.argv.slice(2)
  let title = ''
  let category = 'white-collar'
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--title' && args[i + 1]) title = args[++i]
    if (args[i] === '--category' && args[i + 1]) category = args[++i]
  }
  if (!title) {
    console.error('Usage: npm run new-career -- --title "Job Title" --category white-collar')
    process.exit(1)
  }
  return { title, category }
}

const { title, category } = parseArgs()
const slug = slugify(title)
const dateStr = format(new Date(), 'yyyy-MM-dd')
const filename = `${slug}.mdx`
const filePath = path.join(process.cwd(), 'content', 'careers', filename)

if (fs.existsSync(filePath)) {
  console.info(`File already exists: content/careers/${filename}`)
  process.exit(0)
}

const template = `---
slug: '${slug}'
title: '${title}'
category: '${category}'
threatLevel: 'moderate'
threatExplainer: >
  <!-- TODO: 1-3 sentences explaining the threat level. Max 400 chars. -->
summary: >
  <!-- TODO: 1 sentence summary. Max 200 chars. Used in cards and meta description. -->
version: '1.0'
publishedAt: '${dateStr}'
lastUpdated: '${dateStr}'
whatIsChanging:
  - >
    <!-- TODO: First major change. Min 100 chars. Describe a concrete workflow shift. -->
  - >
    <!-- TODO: Second major change. Min 100 chars. -->
  - >
    <!-- TODO: Third major change. Min 100 chars. -->
companyAdoptions:
  - company: '<!-- TODO: Company name -->'
    sector: '<!-- TODO: Industry sector -->'
    aiUse: '<!-- TODO: How they use AI. Max 300 chars. -->'
    sourceUrl: 'https://example.com/source'
    year: ${new Date().getFullYear()}
  - company: '<!-- TODO: Company name -->'
    sector: '<!-- TODO: Industry sector -->'
    aiUse: '<!-- TODO: How they use AI. Max 300 chars. -->'
    year: ${new Date().getFullYear()}
skillImplications:
  declining:
    - '<!-- TODO: Skill being automated or reduced -->'
    - '<!-- TODO: Another declining skill -->'
  growing:
    - '<!-- TODO: Skill gaining importance -->'
    - '<!-- TODO: Another growing skill -->'
  emerging:
    - '<!-- TODO: Brand new skill or role -->'
weeklySignalId: ''
recommendedReading:
  - title: '<!-- TODO: Reading title -->'
    url: 'https://example.com/reading-1'
    source: '<!-- TODO: Publisher -->'
    level: 'accessible'
  - title: '<!-- TODO: Reading title -->'
    url: 'https://example.com/reading-2'
    source: '<!-- TODO: Publisher -->'
    level: 'accessible'
toolsWorthKnowing:
  - name: '<!-- TODO: Tool name -->'
    url: 'https://example.com/tool-1'
    oneLiner: '<!-- TODO: One sentence description. Max 120 chars. -->'
  - name: '<!-- TODO: Tool name -->'
    url: 'https://example.com/tool-2'
    oneLiner: '<!-- TODO: One sentence description. Max 120 chars. -->'
---

<!-- TODO: Write the article body here. Use <Accessible> and <Technical> tags for reading mode support. -->

<Accessible>
<!-- TODO: Plain-language explanation for non-technical readers. -->
</Accessible>

<Technical>
<!-- TODO: Technical deep-dive for practitioners. -->
</Technical>
`

fs.mkdirSync(path.dirname(filePath), { recursive: true })
fs.writeFileSync(filePath, template, 'utf-8')
console.info(`✓ Created: content/careers/${filename}`)
console.info('Fill in all TODO fields, then push to main.')
