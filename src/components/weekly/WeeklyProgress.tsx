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
    <div className="flex items-center gap-4 pb-4 border-b border-border">
      <p className="text-sm text-muted-foreground">
        {allDone ? (
          <span className="text-emerald-700 dark:text-emerald-400 font-medium">All caught up this week</span>
        ) : (
          <>
            <span className="font-semibold text-foreground">{readCount}</span> of {total} read this week
          </>
        )}
      </p>
      <div
        className="h-1 w-24 flex-shrink-0 overflow-hidden bg-border"
        role="progressbar"
        aria-valuenow={readCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Read ${readCount} of ${total} articles`}
      >
        <div
          className={cn(
            'h-full transition-all duration-300',
            allDone ? 'bg-emerald-500' : 'bg-primary'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
