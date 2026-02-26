import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import type { CareerMeta } from '@/types'

const THREAT_LABEL: Record<string, string> = {
  low: 'Low impact',
  moderate: 'Moderate impact',
  significant: 'Significant impact',
  transformative: 'Transformative impact',
}

interface CareerSpotlightProps {
  career: CareerMeta
}

export function CareerSpotlight({ career }: CareerSpotlightProps) {
  return (
    <section aria-labelledby="spotlight-heading" className="py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Career Spotlight This Week
          </p>
        </div>
        <div className="mt-3 rounded-xl border bg-card p-6 shadow-sm">
          <h2 id="spotlight-heading" className="text-xl font-bold">
            {career.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {THREAT_LABEL[career.threatLevel] ?? career.threatLevel}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{career.summary}</p>
          <Link
            href={`/careers/${career.slug}`}
            className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
          >
            Read the full analysis →
          </Link>
        </div>
      </div>
    </section>
  )
}
