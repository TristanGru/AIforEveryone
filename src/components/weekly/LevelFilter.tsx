'use client'

import { cn } from '@/lib/utils'
import type { Level } from '@/types'

const LEVELS: Array<{ value: Level | 'all'; label: string }> = [
  { value: 'all', label: 'All Levels' },
  { value: 'accessible', label: 'Accessible' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'technical', label: 'Technical' },
]

interface LevelFilterProps {
  active: Level | 'all'
  onChange: (value: Level | 'all') => void
}

export function LevelFilter({ active, onChange }: LevelFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by reading level">
      {LEVELS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          aria-pressed={active === value}
          className={cn(
            'border-b-2 px-2 pb-1.5 text-xs font-medium transition-colors',
            active === value
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
