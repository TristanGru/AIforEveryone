import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReadingTimeProps {
  minutes: number
  className?: string
}

export function ReadingTime({ minutes, className }: ReadingTimeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs text-muted-foreground', className)}>
      <Clock className="h-3 w-3" aria-hidden="true" />
      {minutes} min read
    </span>
  )
}
