import Link from 'next/link'
import { Brain, Briefcase, Scale, Wrench } from 'lucide-react'
import { getHubMetadata } from '@/lib/seo/metadata'
import { getAllArticles } from '@/lib/content/hub'
import type { Bucket } from '@/types'

export const metadata = getHubMetadata()

const BUCKETS: Array<{ bucket: Bucket; label: string; description: string; icon: React.ElementType }> = [
  {
    bucket: 'models',
    label: 'Models',
    description: 'Understand AI models — LLMs, image generators, and what the benchmarks actually mean.',
    icon: Brain,
  },
  {
    bucket: 'business',
    label: 'Business',
    description: 'How companies adopt AI, measure ROI, and transform workflows at scale.',
    icon: Briefcase,
  },
  {
    bucket: 'regulation',
    label: 'Regulation',
    description: 'AI policy, the EU AI Act, and what compliance means for your organization.',
    icon: Scale,
  },
  {
    bucket: 'tools',
    label: 'Tools',
    description: 'Practical guides to AI tools that save time and improve the quality of your work.',
    icon: Wrench,
  },
]

export default async function HubPage() {
  const allArticles = getAllArticles()

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Knowledge Hub</h1>
        <p className="mt-2 text-muted-foreground">
          {allArticles.length} articles across four buckets. Every article has Accessible and
          Technical reading modes.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {BUCKETS.map(({ bucket, label, description, icon: Icon }) => {
          const count = allArticles.filter((a) => a.bucket === bucket).length
          return (
            <Link
              key={bucket}
              href={`/hub/${bucket}`}
              className="group flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-semibold group-hover:text-primary">{label}</h2>
              </div>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{description}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {count} {count === 1 ? 'article' : 'articles'} →
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
