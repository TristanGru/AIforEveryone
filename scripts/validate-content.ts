import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { z } from 'zod'

// ── Zod Schemas ──────────────────────────────────────────────────────────────

const BucketSchema = z.enum(['models', 'business', 'regulation', 'tools'])
const LevelSchema = z.enum(['accessible', 'intermediate', 'technical'])
const DayHintSchema = z.enum(['sunday', 'wednesday', 'friday'])
const ThreatLevelSchema = z.enum(['low', 'moderate', 'significant', 'transformative'])
const CareerCategorySchema = z.enum(['knowledge-workers', 'skilled-trades', 'service-workers', 'administrative', 'industrial-workers'])
const TagSchema = z.string().max(30).regex(/^[a-z0-9-]+$/, 'Tags must be lowercase, no spaces')
const DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD')
const HttpsUrlSchema = z.string().url()

const WeeklyItemSchema = z.object({
  id: z.string().regex(/^\d{4}-\d{2}-\d{2}-item-\d+$/, 'id must match YYYY-MM-DD-item-N'),
  week: DateSchema,
  slot: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  title: z.string().min(1).max(200),
  source: z.string().min(1).max(100),
  url: HttpsUrlSchema,
  bucket: BucketSchema,
  level: LevelSchema,
  readingTimeMin: z.number().int().min(1).max(120),
  summary: z.string().min(50).max(600),
  dayHint: DayHintSchema,
  tags: z.array(TagSchema).optional(),
})

const WeeklyListSchema = z.object({
  week: DateSchema,
  featuredSlot: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
  items: z.array(WeeklyItemSchema).length(5, 'Weekly list must have exactly 5 items'),
  careerSpotlightSlug: z.string().regex(/^[a-z0-9-]+$/).optional(),
})

const SourceSchema = z.object({
  name: z.string().min(1),
  url: HttpsUrlSchema,
  note: z.string().optional(),
})

const HubArticleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  bucket: BucketSchema,
  title: z.string().min(1).max(150),
  level: LevelSchema,
  readingTimeMin: z.number().int().min(1).max(120),
  excerpt: z.string().min(50).max(300),
  keyTakeaways: z.tuple([
    z.string().max(200),
    z.string().max(200),
    z.string().max(200),
  ]),
  publishedAt: DateSchema,
  lastReviewed: DateSchema,
  sources: z.array(SourceSchema).min(1),
  relatedSlugs: z.array(z.string()).max(3).optional(),
  tags: z.array(TagSchema).optional(),
})

const CompanyAdoptionSchema = z.object({
  company: z.string().min(1),
  sector: z.string().min(1),
  aiUse: z.string().max(300),
  sourceUrl: z.string().url().optional(),
  year: z.number().int().min(2000).max(2100),
})

const SkillImplicationsSchema = z.object({
  declining: z.array(z.string()).min(2),
  growing: z.array(z.string()).min(2),
  emerging: z.array(z.string()).min(1),
})

const ReadingItemSchema = z.object({
  title: z.string().min(1),
  url: HttpsUrlSchema,
  source: z.string().min(1),
  level: LevelSchema,
})

const ToolSchema = z.object({
  name: z.string().min(1),
  url: HttpsUrlSchema,
  oneLiner: z.string().max(120),
})

const CareerPageSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  title: z.string().min(1).max(100),
  category: CareerCategorySchema,
  threatLevel: ThreatLevelSchema,
  threatExplainer: z.string().min(1).max(400),
  summary: z.string().min(1).max(200),
  whatIsChanging: z.array(z.string().min(100)).min(3).max(5),
  companyAdoptions: z.array(CompanyAdoptionSchema).min(2),
  skillImplications: SkillImplicationsSchema,
  weeklySignalId: z.string().optional(),
  recommendedReading: z.array(ReadingItemSchema).min(2).max(8),
  toolsWorthKnowing: z.array(ToolSchema).min(2).max(10),
  version: z.string().regex(/^\d+\.\d+$/, 'version must be X.Y'),
  lastUpdated: DateSchema,
  publishedAt: DateSchema,
})

// ── Validation Runner ─────────────────────────────────────────────────────────

interface ValidationError {
  file: string
  errors: string[]
}

function validateFile(filePath: string, schema: z.ZodSchema): string[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)

    const result = schema.safeParse(data)
    if (!result.success) {
      return result.error.errors.map((e) => `  [${e.path.join('.')}] ${e.message}`)
    }

    // Warn on http:// URLs (non-fatal)
    const rawStr = raw
    if (rawStr.includes('http://')) {
      console.warn(`  WARN: ${path.basename(filePath)} contains http:// URL(s) — use https://`)
    }

    return []
  } catch (err) {
    return [`  Failed to read/parse file: ${err}`]
  }
}

function collectErrors(): ValidationError[] {
  const errors: ValidationError[] = []
  const contentDir = path.join(process.cwd(), 'content')
  const weeklyDir = path.join(contentDir, 'weekly')
  const hubDir = path.join(contentDir, 'hub')
  const careersDir = path.join(contentDir, 'careers')
  const buckets = ['models', 'business', 'regulation', 'tools']

  // Validate weekly files
  if (fs.existsSync(weeklyDir)) {
    const files = fs.readdirSync(weeklyDir).filter((f) => f.endsWith('.mdx'))
    for (const file of files) {
      const errs = validateFile(path.join(weeklyDir, file), WeeklyListSchema)
      if (errs.length) errors.push({ file: `content/weekly/${file}`, errors: errs })
    }
  }

  // Validate hub articles
  for (const bucket of buckets) {
    const bucketDir = path.join(hubDir, bucket)
    if (!fs.existsSync(bucketDir)) continue
    const files = fs.readdirSync(bucketDir).filter((f) => f.endsWith('.mdx'))
    for (const file of files) {
      const errs = validateFile(path.join(bucketDir, file), HubArticleSchema)
      if (errs.length)
        errors.push({ file: `content/hub/${bucket}/${file}`, errors: errs })
    }
  }

  // Validate career pages — also check for duplicate slugs
  const careerSlugs: string[] = []
  if (fs.existsSync(careersDir)) {
    const files = fs.readdirSync(careersDir).filter((f) => f.endsWith('.mdx'))
    for (const file of files) {
      const slug = file.replace('.mdx', '')
      if (careerSlugs.includes(slug)) {
        errors.push({ file: `content/careers/${file}`, errors: [`  Duplicate slug: "${slug}"`] })
      }
      careerSlugs.push(slug)

      const errs = validateFile(path.join(careersDir, file), CareerPageSchema)
      // Also check frontmatter slug matches filename
      try {
        const raw = fs.readFileSync(path.join(careersDir, file), 'utf-8')
        const { data } = matter(raw)
        if (data.slug && data.slug !== slug) {
          errs.push(`  Slug mismatch: frontmatter "${data.slug}" !== filename "${slug}"`)
        }
      } catch {}

      if (errs.length) errors.push({ file: `content/careers/${file}`, errors: errs })
    }
  }

  return errors
}

// ── Main ──────────────────────────────────────────────────────────────────────

const allErrors = collectErrors()

if (allErrors.length === 0) {
  console.info('✓ All content files are valid.')
  process.exit(0)
} else {
  console.error(`\n✗ Content validation failed with ${allErrors.length} file(s) having errors:\n`)
  for (const { file, errors } of allErrors) {
    console.error(`${file}:`)
    for (const err of errors) {
      console.error(err)
    }
    console.error('')
  }
  process.exit(1)
}
