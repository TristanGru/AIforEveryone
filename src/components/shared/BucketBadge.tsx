import { cn } from '@/lib/utils'
import type { Bucket } from '@/types'

const BUCKET_CONFIG: Record<Bucket, { label: string; className: string }> = {
  models: { label: 'Models', className: 'bg-violet-100 text-violet-800' },
  business: { label: 'Business', className: 'bg-blue-100 text-blue-800' },
  regulation: { label: 'Regulation', className: 'bg-amber-100 text-amber-800' },
  tools: { label: 'Tools', className: 'bg-green-100 text-green-800' },
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
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        colorClass,
        className
      )}
    >
      {label}
    </span>
  )
}
