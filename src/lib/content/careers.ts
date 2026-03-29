import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { CareerPage, CareerMeta, CareerCategory, RiskLevel, TransformationLevel } from '@/types'

const CAREERS_DIR = path.join(process.cwd(), 'content', 'careers')

// gray-matter/js-yaml may parse ISO date strings as Date objects even when quoted
function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value ?? '')
}

function parseCareerFile(filename: string): CareerPage | null {
  const filePath = path.join(CAREERS_DIR, filename)
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const slug = filename.replace('.mdx', '')

    if (data.slug && data.slug !== slug) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `[careers] Slug mismatch in ${filename}: frontmatter="${data.slug}" file="${slug}"`
        )
      }
    }

    return {
      slug,
      title: data.title as string,
      category: data.category as CareerCategory,
      riskLevel: data.riskLevel as RiskLevel,
      transformationLevel: data.transformationLevel as TransformationLevel,
      impactSummary: data.impactSummary as string,
      summary: data.summary as string,
      whatIsChanging: data.whatIsChanging as string[],
      companyAdoptions: data.companyAdoptions ?? [],
      skillImplications: data.skillImplications ?? {
        declining: [],
        growing: [],
        emerging: [],
      },
      weeklySignalId: data.weeklySignalId,
      recommendedReading: data.recommendedReading ?? [],
      toolsWorthKnowing: data.toolsWorthKnowing ?? [],
      version: data.version as string,
      lastUpdated: toDateString(data.lastUpdated),
      publishedAt: toDateString(data.publishedAt),
      body: content,
    }
  } catch {
    return null
  }
}

function getAllFilenames(): string[] {
  if (!fs.existsSync(CAREERS_DIR)) return []
  return fs.readdirSync(CAREERS_DIR).filter((f) => f.endsWith('.mdx'))
}

export function getAllCareers(): CareerPage[] {
  return getAllFilenames()
    .map((f) => parseCareerFile(f))
    .filter((c): c is CareerPage => c !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getAllCareerMeta(): CareerMeta[] {
  return getAllCareers().map(
    ({ slug, title, category, riskLevel, transformationLevel, summary, lastUpdated, publishedAt, version }) => ({
      slug,
      title,
      category,
      riskLevel,
      transformationLevel,
      summary,
      lastUpdated,
      publishedAt,
      version,
    })
  )
}

export function getCareer(slug: string): CareerPage | null {
  return parseCareerFile(`${slug}.mdx`)
}

export function getCareersByCategory(category: CareerCategory): CareerPage[] {
  return getAllCareers().filter((c) => c.category === category)
}
