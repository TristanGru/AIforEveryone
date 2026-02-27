import Link from 'next/link'
import type { Bucket } from '@/types'

const BUCKETS: Array<{ bucket: Bucket; label: string; description: string }> = [
  {
    bucket: 'models',
    label: 'Models',
    description: 'Understand AI models — LLMs, image generators, and what the benchmarks mean.',
  },
  {
    bucket: 'business',
    label: 'Business',
    description: 'How companies adopt AI, measure ROI, and transform their workflows.',
  },
  {
    bucket: 'regulation',
    label: 'Regulation',
    description: 'AI policy, the EU AI Act, and what regulation means for your industry.',
  },
  {
    bucket: 'tools',
    label: 'Tools',
    description: 'Practical guides to AI tools that actually save time.',
  },
]

export function BucketGrid() {
  return (
    <section aria-labelledby="hub-heading" className="border-b border-border py-10">
      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 id="hub-heading" className="text-xl font-bold tracking-tight">
            Knowledge Hub
          </h2>
          <Link
            href="/hub"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse all →
          </Link>
        </div>

        <p className="mb-8 max-w-xl text-sm text-muted-foreground">
          Explore AI through four lenses. Every article is available in Accessible and Technical modes.
        </p>

        <div className="grid gap-0 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 sm:gap-x-12 sm:gap-y-8">
          {BUCKETS.map(({ bucket, label, description }) => (
            <Link
              key={bucket}
              href={`/hub/${bucket}`}
              className="group flex items-start gap-4 py-5 sm:py-0"
            >
              <div className="mt-0.5 w-20 flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-primary">
                {label}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
