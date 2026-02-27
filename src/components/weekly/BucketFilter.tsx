'use client'

import { cn } from '@/lib/utils'
import type { Bucket } from '@/types'

const BUCKETS: Array<{ value: Bucket | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'models', label: 'Models' },
  { value: 'business', label: 'Business' },
  { value: 'regulation', label: 'Regulation' },
  { value: 'tools', label: 'Tools' },
]

interface BucketFilterProps {
  active: Bucket | 'all'
  onChange: (value: Bucket | 'all') => void
}

export function BucketFilter({ active, onChange }: BucketFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
      {BUCKETS.map(({ value, label }) => (
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
