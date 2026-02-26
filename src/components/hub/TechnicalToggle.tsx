'use client'

import { track } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'
import { useTechnicalMode } from '@/context/TechnicalModeContext'

export function TechnicalToggle() {
  const { mode, setMode } = useTechnicalMode()

  function handleChange(newMode: 'accessible' | 'technical') {
    setMode(newMode)
    track('technical_mode_toggled', { to_mode: newMode })
  }

  return (
    <div className="sticky top-16 z-10 border-b bg-background/95 backdrop-blur py-2">
      <div className="container mx-auto max-w-3xl px-4">
        <div
          className="inline-flex rounded-lg border bg-muted p-1"
          role="group"
          aria-label="Reading mode"
        >
          <button
            onClick={() => handleChange('accessible')}
            aria-pressed={mode === 'accessible'}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              mode === 'accessible'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Accessible
          </button>
          <button
            onClick={() => handleChange('technical')}
            aria-pressed={mode === 'technical'}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              mode === 'technical'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Technical
          </button>
        </div>
      </div>
    </div>
  )
}
