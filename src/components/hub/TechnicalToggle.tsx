'use client'

import { cn } from '@/lib/utils'
import { useTechnicalMode } from '@/context/TechnicalModeContext'

export function TechnicalToggle() {
  const { mode, setMode } = useTechnicalMode()

  function handleChange(newMode: 'accessible' | 'technical') {
    setMode(newMode)
  }

  return (
    <div className="sticky top-14 z-10 border-b border-border bg-background py-2.5">
      <div className="container mx-auto max-w-article px-4 sm:px-6">
        <div className="flex items-center gap-1" role="group" aria-label="Reading mode">
          <span className="mr-2 text-xs text-muted-foreground">Reading mode:</span>
          <button
            onClick={() => handleChange('accessible')}
            aria-pressed={mode === 'accessible'}
            className={cn(
              'px-3 py-1 text-xs font-medium transition-colors border-b-2',
              mode === 'accessible'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Accessible
          </button>
          <button
            onClick={() => handleChange('technical')}
            aria-pressed={mode === 'technical'}
            className={cn(
              'px-3 py-1 text-xs font-medium transition-colors border-b-2',
              mode === 'technical'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Technical
          </button>
        </div>
      </div>
    </div>
  )
}
