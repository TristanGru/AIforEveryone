import { cn } from '@/lib/utils'
import type { ThreatLevel as ThreatLevelType } from '@/types'

const THREAT_CONFIG: Record<
  ThreatLevelType,
  { label: string; color: string; dotColors: [string, string, string, string] }
> = {
  low: {
    label: 'Low Impact',
    color: 'text-green-700',
    dotColors: ['bg-green-500', 'bg-muted', 'bg-muted', 'bg-muted'],
  },
  moderate: {
    label: 'Moderate Impact',
    color: 'text-amber-700',
    dotColors: ['bg-amber-500', 'bg-amber-500', 'bg-muted', 'bg-muted'],
  },
  significant: {
    label: 'Significant Impact',
    color: 'text-orange-700',
    dotColors: ['bg-orange-500', 'bg-orange-500', 'bg-orange-500', 'bg-muted'],
  },
  transformative: {
    label: 'Transformative Impact',
    color: 'text-red-700',
    dotColors: ['bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500'],
  },
}

interface ThreatLevelProps {
  level: ThreatLevelType
  explainer?: string
}

export function ThreatLevel({ level, explainer }: ThreatLevelProps) {
  const config = THREAT_CONFIG[level]

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5" aria-hidden="true">
          {config.dotColors.map((color, i) => (
            <div key={i} className={cn('h-3 w-3 rounded-full', color)} />
          ))}
        </div>
        <p className={cn('font-semibold', config.color)} aria-label={`Threat level: ${config.label}`}>
          {config.label}
        </p>
      </div>
      {explainer && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{explainer}</p>}
    </div>
  )
}
