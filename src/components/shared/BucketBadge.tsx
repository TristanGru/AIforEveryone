import { cn } from '@/lib/utils'
import type { Bucket } from '@/types'

const BUCKET_CONFIG: Record<Bucket, { label: string; className: string }> = {
  models: { label: 'Models', className: 'text-violet-700 dark:text-violet-400' },
  business: { label: 'Business', className: 'text-blue-700 dark:text-blue-400' },
  regulation: { label: 'Regulation', className: 'text-amber-700 dark:text-amber-400' },
  tools: { label: 'Tools', className: 'text-emerald-700 dark:text-emerald-400' },
}

interface BucketBadgeProps {
  bucket: Bucket
  className?: string
}

export function BucketBadge({ bucket, className }: BucketBadgeProps) {
  const { label, className: colorClass } = BUCKET_CONFIG[bucket]
  return (
    <span
      className={cn(
        'text-2xs font-semibold uppercase tracking-widest',
        colorClass,
        className
      )}
    >
      {label}
    </span>
  )
}
