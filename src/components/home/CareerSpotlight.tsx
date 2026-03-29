import Link from 'next/link'
import type { CareerMeta, RiskLevel, TransformationLevel } from '@/types'

const RISK_COLOR: Record<RiskLevel, string> = {
  low: 'text-emerald-700 dark:text-emerald-400',
  medium: 'text-yellow-700 dark:text-yellow-400',
  high: 'text-red-700 dark:text-red-400',
}

const TRANSFORMATION_COLOR: Record<TransformationLevel, string> = {
  low: 'text-sky-600 dark:text-sky-400',
  medium: 'text-blue-700 dark:text-blue-400',
  high: 'text-violet-800 dark:text-violet-400',
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
            Professional Impact Spotlight
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h2 id="spotlight-heading" className="text-xl font-bold tracking-tight">
              {career.title}
            </h2>
            <div className="flex-shrink-0 flex gap-2">
              <span className={`text-xs font-semibold uppercase tracking-widest ${RISK_COLOR[career.riskLevel]}`}>
                Risk: {career.riskLevel}
              </span>
              <span className="text-xs text-border">·</span>
              <span className={`text-xs font-semibold uppercase tracking-widest ${TRANSFORMATION_COLOR[career.transformationLevel]}`}>
                Change: {career.transformationLevel}
              </span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-foreground/80">{career.summary}</p>

          <Link
            href={`/professional-impacts/${career.slug}`}
            className="mt-4 inline-flex text-sm font-semibold text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
          >
            Full analysis →
          </Link>
        </div>
      </div>
    </section>
  )
}
