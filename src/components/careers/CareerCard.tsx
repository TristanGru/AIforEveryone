import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import type { CareerMeta, ThreatLevel } from '@/types'

const THREAT_COLORS: Record<ThreatLevel, string> = {
  low: 'text-green-700 bg-green-50',
  moderate: 'text-amber-700 bg-amber-50',
  significant: 'text-orange-700 bg-orange-50',
  transformative: 'text-red-700 bg-red-50',
}

const THREAT_LABELS: Record<ThreatLevel, string> = {
  low: 'Low',
  moderate: 'Moderate',
  significant: 'Significant',
  transformative: 'Transformative',
}

interface CareerCardProps {
  career: CareerMeta
}

export function CareerCard({ career }: CareerCardProps) {
  return (
    <Link
      href={`/careers/${career.slug}`}
      className="group block rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold leading-snug group-hover:text-primary">{career.title}</h2>
        <span
          className={cn(
            'flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
            THREAT_COLORS[career.threatLevel]
          )}
        >
          {THREAT_LABELS[career.threatLevel]}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{career.summary}</p>
      <p className="mt-3 text-xs text-muted-foreground">Updated {formatDate(career.lastUpdated)}</p>
    </Link>
  )
}
