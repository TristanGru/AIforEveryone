import { cn } from '@/lib/utils'

interface ReadingTimeProps {
  minutes: number
  className?: string
}

export function ReadingTime({ minutes, className }: ReadingTimeProps) {
  return (
    <span className={cn('text-2xs text-muted-foreground', className)}>
      {minutes} min
    </span>
  )
}
