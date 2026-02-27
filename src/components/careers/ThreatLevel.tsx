import { cn } from '@/lib/utils'
import type { ThreatLevel as ThreatLevelType } from '@/types'

const THREAT_CONFIG: Record<
  ThreatLevelType,
  { label: string; description: string; barColor: string; textColor: string; bars: number }
> = {
  low: {
    label: 'Low Impact',
    description: 'AI is unlikely to significantly change core workflows in the near term.',
    barColor: 'bg-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    bars: 1,
  },
  moderate: {
    label: 'Moderate Impact',
    description: 'Some tasks will be automated or augmented; core value remains with humans.',
    barColor: 'bg-yellow-500',
    textColor: 'text-yellow-700 dark:text-yellow-400',
    bars: 2,
  },
  significant: {
    label: 'Significant Impact',
    description: 'Major workflow changes likely within 2–3 years. Upskilling is important now.',
    barColor: 'bg-orange-500',
    textColor: 'text-orange-700 dark:text-orange-400',
    bars: 3,
  },
  transformative: {
    label: 'Transformative Impact',
    description: 'The role is being fundamentally redefined. Early adaptation is critical.',
    barColor: 'bg-red-500',
    textColor: 'text-red-700 dark:text-red-400',
    bars: 4,
  },
}

interface ThreatLevelProps {
  level: ThreatLevelType
  explainer?: string
}

export function ThreatLevel({ level, explainer }: ThreatLevelProps) {
  const config = THREAT_CONFIG[level]

  return (
    <div className="border-l-4 border-border pl-5 py-2 my-6" style={{ borderLeftColor: 'currentColor' }}>
      <div className="flex items-center gap-4 mb-2">
        {/* Severity bars */}
        <div className="flex gap-1" aria-hidden="true">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={cn(
                'h-4 w-1.5 rounded-full',
                n <= config.bars ? config.barColor : 'bg-border'
              )}
            />
          ))}
        </div>
        <p
          className={cn('text-sm font-semibold', config.textColor)}
          aria-label={`Impact level: ${config.label}`}
        >
          {config.label}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {explainer ?? config.description}
      </p>
    </div>
  )
}
