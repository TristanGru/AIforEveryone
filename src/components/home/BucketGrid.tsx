import Link from 'next/link'
import { Brain, Briefcase, Scale, Wrench } from 'lucide-react'
import type { Bucket } from '@/types'

const BUCKETS: Array<{ bucket: Bucket; label: string; description: string; icon: React.ElementType }> = [
  {
    bucket: 'models',
    label: 'Models',
    description: 'Understand AI models — LLMs, image generators, and what the benchmarks mean.',
    icon: Brain,
  },
  {
    bucket: 'business',
    label: 'Business',
    description: 'How companies adopt AI, measure ROI, and transform their workflows.',
    icon: Briefcase,
  },
  {
    bucket: 'regulation',
    label: 'Regulation',
    description: 'AI policy, the EU AI Act, and what regulation means for your industry.',
    icon: Scale,
  },
  {
    bucket: 'tools',
    label: 'Tools',
    description: 'Practical guides to AI tools that actually save time.',
    icon: Wrench,
  },
]

export function BucketGrid() {
  return (
    <section aria-labelledby="hub-heading" className="py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 id="hub-heading" className="text-2xl font-bold">
          Knowledge Hub
        </h2>
        <p className="mt-1 text-muted-foreground">
          Explore AI through four lenses. Every article is available in Accessible and Technical modes.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BUCKETS.map(({ bucket, label, description, icon: Icon }) => (
            <Link
              key={bucket}
              href={`/hub/${bucket}`}
              className="group flex flex-col rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold group-hover:text-primary">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
