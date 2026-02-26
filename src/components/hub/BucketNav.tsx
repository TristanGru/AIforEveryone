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
    <nav className="flex flex-wrap gap-2" aria-label="Knowledge hub buckets">
      {BUCKETS.map(({ bucket, label }) => (
        <Link
          key={bucket}
          href={`/hub/${bucket}`}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
            activeBucket === bucket
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
          )}
          aria-current={activeBucket === bucket ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
