import { cn } from '@/lib/utils'
import type { Level } from '@/types'

const LEVEL_CONFIG: Record<Level, { label: string; className: string }> = {
  accessible: { label: 'Accessible', className: 'bg-gray-100 text-gray-700' },
  intermediate: { label: 'Intermediate', className: 'bg-sky-100 text-sky-700' },
  technical: { label: 'Technical', className: 'bg-rose-100 text-rose-700' },
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
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        colorClass,
        className
      )}
    >
      {label}
    </span>
  )
}
