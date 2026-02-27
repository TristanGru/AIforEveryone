'use client'

import { Flame } from 'lucide-react'
import { useReadingStreak } from '@/lib/hooks/useReadingStreak'

export function ReadingStreak() {
  const streak = useReadingStreak()

  if (streak === 0) return null

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Flame className="h-3.5 w-3.5 text-orange-500" aria-hidden="true" />
      <span>
        <span className="font-medium text-foreground">{streak}</span>
        {streak === 1 ? '-week streak' : '-week streak'}
      </span>
    </div>
  )
}
