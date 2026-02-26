'use client'

import { track } from '@vercel/analytics/react'
import { Check } from 'lucide-react'
import { BucketBadge } from '@/components/shared/BucketBadge'
import { LevelBadge } from '@/components/shared/LevelBadge'
import { ReadingTime } from '@/components/shared/ReadingTime'
import { ShareButton } from '@/components/shared/ShareButton'
import { cn } from '@/lib/utils'
import type { WeeklyItem } from '@/types'

const DAY_HINT_LABEL: Record<string, string> = {
  sunday: '📅 Good for Sunday reading',
  wednesday: '📅 Good for midweek',
  friday: '📅 Good for Friday wind-down',
}

interface WeeklyListItemProps {
  item: WeeklyItem
  isRead: boolean
  onToggleRead: (id: string) => void
}

export function WeeklyListItem({ item, isRead, onToggleRead }: WeeklyListItemProps) {
  function handleToggle() {
    onToggleRead(item.id)
    if (!isRead) {
      track('weekly_item_read', {
        item_id: item.id,
        bucket: item.bucket,
        slot: item.slot,
        week: item.week,
      })
    } else {
      track('weekly_item_unread', { item_id: item.id, week: item.week })
    }
  }

  function handleExternalClick() {
    track('outbound_link_clicked', { item_id: item.id, source_page: 'weekly' })
  }

  return (
    <article
      className={cn(
        'rounded-xl border bg-card p-5 shadow-sm transition-opacity',
        isRead && 'opacity-60'
      )}
      aria-label={`${item.title}${isRead ? ' — marked as read' : ''}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <BucketBadge bucket={item.bucket} />
        <LevelBadge level={item.level} />
        <ReadingTime minutes={item.readingTimeMin} />
        {item.dayHint && (
          <span className="text-xs text-muted-foreground">{DAY_HINT_LABEL[item.dayHint]}</span>
        )}
      </div>

      <h2 className="mt-3 text-lg font-semibold leading-snug">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleExternalClick}
          className={cn('hover:text-primary hover:underline', isRead && 'line-through')}
        >
          {item.title}
        </a>
      </h2>
      <p className="mt-0.5 text-sm text-muted-foreground">{item.source}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{item.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={handleToggle}
          aria-pressed={isRead}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
            isRead
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          {isRead && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
          {isRead ? 'Read' : 'Mark as Read'}
        </button>

        <ShareButton url={item.url} title={item.title} itemId={item.id} />

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1" aria-label="Tags">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
