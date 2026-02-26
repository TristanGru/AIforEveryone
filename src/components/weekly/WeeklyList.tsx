'use client'

import { useState } from 'react'
import { WeeklyListItem } from './WeeklyListItem'
import { WeeklyProgress } from './WeeklyProgress'
import { BucketFilter } from './BucketFilter'
import { LevelFilter } from './LevelFilter'
import { useReadState } from '@/lib/hooks/useReadState'
import type { WeeklyItem, Bucket, Level } from '@/types'

interface WeeklyListProps {
  items: WeeklyItem[]
  week: string
}

export function WeeklyList({ items, week }: WeeklyListProps) {
  const { readCount, isRead, toggleRead } = useReadState(week)
  const [bucketFilter, setBucketFilter] = useState<Bucket | 'all'>('all')
  const [levelFilter, setLevelFilter] = useState<Level | 'all'>('all')

  const filtered = items.filter((item) => {
    if (bucketFilter !== 'all' && item.bucket !== bucketFilter) return false
    if (levelFilter !== 'all' && item.level !== levelFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <WeeklyProgress readCount={readCount} total={items.length} />

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <BucketFilter active={bucketFilter} onChange={setBucketFilter} />
        <LevelFilter active={levelFilter} onChange={setLevelFilter} />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border bg-card p-6 text-center text-muted-foreground">
          No items match your current filters. Try selecting &ldquo;All&rdquo;.
        </p>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <WeeklyListItem
              key={item.id}
              item={item}
              isRead={isRead(item.id)}
              onToggleRead={toggleRead}
            />
          ))}
        </div>
      )}
    </div>
  )
}
