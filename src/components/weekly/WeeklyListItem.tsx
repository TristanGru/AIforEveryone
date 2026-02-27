'use client'

import { track } from '@vercel/analytics/react'
import { Check } from 'lucide-react'
import { BucketBadge } from '@/components/shared/BucketBadge'
import { ReadingTime } from '@/components/shared/ReadingTime'
import { ShareButton } from '@/components/shared/ShareButton'
import { cn } from '@/lib/utils'
import type { WeeklyItem } from '@/types'

const DAY_HINT_LABEL: Record<string, string> = {
  sunday: 'Good for Sunday',
  wednesday: 'Good for midweek',
  friday: 'Good for Friday',
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
        'border-b border-border py-6 transition-opacity last:border-b-0',
        isRead && 'opacity-50'
      )}
      aria-label={`${item.title}${isRead ? ' — marked as read' : ''}`}
    >
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <BucketBadge bucket={item.bucket} />
        <ReadingTime minutes={item.readingTimeMin} />
        {item.dayHint && (
          <span className="text-2xs text-muted-foreground italic">
            {DAY_HINT_LABEL[item.dayHint]}
          </span>
        )}
      </div>

      <h2 className="text-lg font-semibold leading-snug tracking-tight">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleExternalClick}
          className={cn(
            'hover:text-primary transition-colors',
            isRead && 'line-through'
          )}
        >
          {item.title}
        </a>
      </h2>
      <p className="mt-0.5 text-xs text-muted-foreground">{item.source}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{item.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={handleToggle}
          aria-pressed={isRead}
          className={cn(
            'inline-flex items-center gap-1.5 text-xs font-medium transition-colors',
            isRead
              ? 'text-emerald-700 dark:text-emerald-400'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {isRead && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
          {isRead ? 'Read' : 'Mark as read'}
        </button>

        <ShareButton url={item.url} title={item.title} itemId={item.id} />

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Tags">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-2xs text-muted-foreground"
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
