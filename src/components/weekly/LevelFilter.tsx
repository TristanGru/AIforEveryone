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
            'rounded-full border px-3 py-1 text-sm font-medium transition-colors',
            active === value
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
