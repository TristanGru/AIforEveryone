'use client'

import { useTechnicalMode } from '@/context/TechnicalModeContext'

export function Accessible({ children }: { children: React.ReactNode }) {
  const { mode } = useTechnicalMode()
  return mode === 'technical' ? null : <>{children}</>
}

export function Technical({ children }: { children: React.ReactNode }) {
  const { mode } = useTechnicalMode()
  return mode === 'technical' ? <>{children}</> : null
}
