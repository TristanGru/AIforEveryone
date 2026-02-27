import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Bucket } from '@/types'

const BUCKETS: Array<{ bucket: Bucket; label: string }> = [
  { bucket: 'models', label: 'Models' },
  { bucket: 'business', label: 'Business' },
  { bucket: 'regulation', label: 'Regulation' },
  { bucket: 'tools', label: 'Tools' },
]

interface BucketNavProps {
  activeBucket?: Bucket
}

export function BucketNav({ activeBucket }: BucketNavProps) {
  return (
    <nav className="flex flex-wrap gap-6 border-b border-border pb-0" aria-label="Knowledge hub buckets">
      {BUCKETS.map(({ bucket, label }) => (
        <Link
          key={bucket}
          href={`/hub/${bucket}`}
          className={cn(
            'pb-3 text-sm transition-colors border-b-2 -mb-px',
            activeBucket === bucket
              ? 'border-primary font-semibold text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
          )}
          aria-current={activeBucket === bucket ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
