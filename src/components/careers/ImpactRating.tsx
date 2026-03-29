import type { RiskLevel, TransformationLevel } from '@/types'

const RISK_CONFIG: Record<RiskLevel, { label: string; description: string; color: string; textColor: string; bars: number }> = {
  low: {
    label: 'Low',
    description: 'Headcount expected to remain stable or grow.',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    bars: 1,
  },
  medium: {
    label: 'Medium',
    description: 'Some roles may be consolidated; overall demand shifts.',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700 dark:text-yellow-400',
    bars: 2,
  },
  high: {
    label: 'High',
    description: 'Significantly fewer positions expected as AI adoption accelerates.',
    color: 'bg-red-500',
    textColor: 'text-red-700 dark:text-red-400',
    bars: 3,
  },
}

const TRANSFORMATION_CONFIG: Record<TransformationLevel, { label: string; description: string; color: string; textColor: string; bars: number }> = {
  low: {
    label: 'Low',
    description: 'Day-to-day work and required skills are largely unchanged.',
    color: 'bg-sky-400',
    textColor: 'text-sky-600 dark:text-sky-400',
    bars: 1,
  },
  medium: {
    label: 'Medium',
    description: 'Some tasks are augmented or automated; upskilling is worthwhile.',
    color: 'bg-blue-500',
    textColor: 'text-blue-700 dark:text-blue-400',
    bars: 2,
  },
  high: {
    label: 'High',
    description: 'Core workflows and required skills are fundamentally changing.',
    color: 'bg-violet-600',
    textColor: 'text-violet-800 dark:text-violet-400',
    bars: 3,
  },
}

function Bars({ count, total, color }: { count: number; total: number; color: string }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-3.5 w-1.5 rounded-full ${i < count ? color : 'bg-border'}`}
        />
      ))}
    </div>
  )
}

interface ImpactRatingProps {
  riskLevel: RiskLevel
  transformationLevel: TransformationLevel
  impactSummary?: string
}

export function ImpactRating({ riskLevel, transformationLevel, impactSummary }: ImpactRatingProps) {
  const risk = RISK_CONFIG[riskLevel]
  const transformation = TRANSFORMATION_CONFIG[transformationLevel]

  return (
    <div className="my-6 grid grid-cols-2 gap-4">
      {/* Position Risk */}
      <div className="rounded-lg border border-border p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Position Risk
        </p>
        <div className="flex items-center gap-3 mb-2">
          <Bars count={risk.bars} total={3} color={risk.color} />
          <span className={`text-sm font-semibold ${risk.textColor}`}>{risk.label}</span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">{risk.description}</p>
      </div>

      {/* Role Transformation */}
      <div className="rounded-lg border border-border p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Role Transformation
        </p>
        <div className="flex items-center gap-3 mb-2">
          <Bars count={transformation.bars} total={3} color={transformation.color} />
          <span className={`text-sm font-semibold ${transformation.textColor}`}>{transformation.label}</span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">{transformation.description}</p>
      </div>

      {/* Combined explainer */}
      {impactSummary && (
        <p className="col-span-2 text-sm leading-relaxed text-muted-foreground border-t border-border pt-3 mt-1">
          {impactSummary}
        </p>
      )}
    </div>
  )
}
