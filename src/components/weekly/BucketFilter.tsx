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
