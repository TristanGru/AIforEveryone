import { cn } from '@/lib/utils'
import type { Level } from '@/types'

const LEVEL_CONFIG: Record<Level, { label: string; className: string }> = {
  accessible: { label: 'Accessible', className: 'text-muted-foreground' },
  intermediate: { label: 'Intermediate', className: 'text-muted-foreground' },
  technical: { label: 'Technical', className: 'text-muted-foreground' },
}

interface LevelBadgeProps {
  level: Level
  className?: string
}

export function LevelBadge({ level, className }: LevelBadgeProps) {
  const { label, className: colorClass } = LEVEL_CONFIG[level]
  return (
    <span
      className={cn(
        'text-2xs font-medium uppercase tracking-widest',
        colorClass,
        className
      )}
    >
      {label}
    </span>
  )
}
