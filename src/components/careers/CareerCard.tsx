import Link from 'next/link'
import { cn, formatDate, isNewContent } from '@/lib/utils'
import type { CareerMeta, RiskLevel, TransformationLevel } from '@/types'

const RISK_COLORS: Record<RiskLevel, string> = {
  low: 'text-emerald-700 dark:text-emerald-400',
  medium: 'text-yellow-700 dark:text-yellow-400',
  high: 'text-red-700 dark:text-red-400',
}

const TRANSFORMATION_COLORS: Record<TransformationLevel, string> = {
  low: 'text-sky-600 dark:text-sky-400',
  medium: 'text-blue-700 dark:text-blue-400',
  high: 'text-violet-800 dark:text-violet-400',
}

interface CareerCardProps {
  career: CareerMeta
}

export function CareerCard({ career }: CareerCardProps) {
  const isNew = isNewContent(career.publishedAt)

  return (
    <Link
      href={`/professional-impacts/${career.slug}`}
      className="group block border-b border-border py-5 last:border-b-0 hover:no-underline"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-base font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">
            {career.title}
          </h2>
          {isNew && (
            <span className="flex-shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-2xs font-semibold text-primary">
              New
            </span>
          )}
        </div>
        <div className="flex-shrink-0 flex gap-2 mt-0.5">
          <span className={cn('text-2xs font-semibold uppercase tracking-widest', RISK_COLORS[career.riskLevel])}>
            Risk: {career.riskLevel}
          </span>
          <span className="text-2xs text-border">·</span>
          <span className={cn('text-2xs font-semibold uppercase tracking-widest', TRANSFORMATION_COLORS[career.transformationLevel])}>
            Change: {career.transformationLevel}
          </span>
        </div>
      </div>

      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{career.summary}</p>
      <p className="mt-2 text-xs text-muted-foreground">Updated {formatDate(career.lastUpdated)}</p>
    </Link>
  )
}
