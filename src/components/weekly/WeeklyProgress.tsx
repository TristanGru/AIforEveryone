'use client'

import { cn } from '@/lib/utils'

interface WeeklyProgressProps {
  readCount: number
  total: number
}

export function WeeklyProgress({ readCount, total }: WeeklyProgressProps) {
  const allDone = readCount >= total
  const pct = total > 0 ? Math.round((readCount / total) * 100) : 0

  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-sm font-medium">
        {allDone ? (
          <span className="text-green-700">✓ All caught up this week!</span>
        ) : (
          <>
            You&apos;ve read{' '}
            <span className="font-semibold text-primary">{readCount}</span> of {total} this week
          </>
        )}
      </p>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={readCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Read ${readCount} of ${total} articles`}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            allDone ? 'bg-green-500' : 'bg-primary'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
