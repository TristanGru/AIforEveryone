import Link from 'next/link'
import type { CareerMeta } from '@/types'

const THREAT_COLOR: Record<string, string> = {
  low: 'text-emerald-700 dark:text-emerald-400',
  moderate: 'text-yellow-700 dark:text-yellow-400',
  significant: 'text-orange-700 dark:text-orange-400',
  transformative: 'text-red-700 dark:text-red-400',
}

const THREAT_LABEL: Record<string, string> = {
  low: 'Low Impact',
  moderate: 'Moderate Impact',
  significant: 'Significant Impact',
  transformative: 'Transformative Impact',
}

interface CareerSpotlightProps {
  career: CareerMeta
}

export function CareerSpotlight({ career }: CareerSpotlightProps) {
  return (
    <section aria-labelledby="spotlight-heading" className="border-b border-border py-10">
      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <div className="mb-5 flex items-baseline gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Career Spotlight
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h2 id="spotlight-heading" className="text-xl font-bold tracking-tight">
              {career.title}
            </h2>
            <span
              className={`flex-shrink-0 text-xs font-semibold uppercase tracking-widest ${THREAT_COLOR[career.threatLevel] ?? 'text-muted-foreground'}`}
            >
              {THREAT_LABEL[career.threatLevel] ?? career.threatLevel}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-foreground/80">{career.summary}</p>

          <Link
            href={`/careers/${career.slug}`}
            className="mt-4 inline-flex text-sm font-semibold text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
          >
            Full analysis →
          </Link>
        </div>
      </div>
    </section>
  )
}
