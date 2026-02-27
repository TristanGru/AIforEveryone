import Link from 'next/link'
import { cn, formatDate, isNewContent } from '@/lib/utils'
import type { CareerMeta, ThreatLevel } from '@/types'

const THREAT_COLORS: Record<ThreatLevel, string> = {
  low: 'text-emerald-700 dark:text-emerald-400',
  moderate: 'text-yellow-700 dark:text-yellow-400',
  significant: 'text-orange-700 dark:text-orange-400',
  transformative: 'text-red-700 dark:text-red-400',
}

const THREAT_LABELS: Record<ThreatLevel, string> = {
  low: 'Low Impact',
  moderate: 'Moderate Impact',
  significant: 'Significant Impact',
  transformative: 'Transformative Impact',
}

interface CareerCardProps {
  career: CareerMeta
}

export function CareerCard({ career }: CareerCardProps) {
  const isNew = isNewContent(career.publishedAt)

  return (
    <Link
      href={`/careers/${career.slug}`}
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
        <span
          className={cn(
            'flex-shrink-0 text-2xs font-semibold uppercase tracking-widest mt-0.5',
            THREAT_COLORS[career.threatLevel]
          )}
        >
          {THREAT_LABELS[career.threatLevel]}
        </span>
      </div>

      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{career.summary}</p>
      <p className="mt-2 text-xs text-muted-foreground">Updated {formatDate(career.lastUpdated)}</p>
    </Link>
  )
}
