import Link from 'next/link'
import { getHubMetadata } from '@/lib/seo/metadata'
import { getAllArticles } from '@/lib/content/hub'
import type { Bucket } from '@/types'

export const metadata = getHubMetadata()

const BUCKETS: Array<{ bucket: Bucket; label: string; description: string }> = [
  {
    bucket: 'models',
    label: 'Models',
    description: 'Understand AI models — LLMs, image generators, and what the benchmarks actually mean.',
  },
  {
    bucket: 'business',
    label: 'Business',
    description: 'How companies adopt AI, measure ROI, and transform workflows at scale.',
  },
  {
    bucket: 'regulation',
    label: 'Regulation',
    description: 'AI policy, the EU AI Act, and what compliance means for your organization.',
  },
  {
    bucket: 'tools',
    label: 'Tools',
    description: 'Practical guides to AI tools that save time and improve the quality of your work.',
  },
]

export default async function HubPage() {
  const allArticles = getAllArticles()

  return (
    <div className="container mx-auto max-w-article px-4 py-10 sm:px-6">
      <header className="mb-10 pb-8 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight">Knowledge Hub</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {allArticles.length} articles across four buckets. Every article has Accessible and
          Technical reading modes.
        </p>
      </header>

      <div className="divide-y divide-border">
        {BUCKETS.map(({ bucket, label, description }) => {
          const count = allArticles.filter((a) => a.bucket === bucket).length
          return (
            <Link
              key={bucket}
              href={`/hub/${bucket}`}
              className="group flex items-start gap-6 py-6 hover:no-underline"
            >
              <div className="w-24 flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {label}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                  {description}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {count} {count === 1 ? 'article' : 'articles'}
                </p>
              </div>
              <span className="mt-0.5 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                →
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
