'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { Level } from '@/types'

interface TechnicalModeContextValue {
  mode: Level
  setMode: (mode: Level) => void
}

const TechnicalModeContext = createContext<TechnicalModeContextValue>({
  mode: 'accessible',
  setMode: () => {},
})

const STORAGE_KEY = 'ai-decoded-level'

export function TechnicalModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Level>('accessible')

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY) as Level | null
        if (stored === 'accessible' || stored === 'intermediate' || stored === 'technical') {
          setModeState(stored)
        }
      }
    } catch {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[useTechnicalMode] localStorage unavailable')
      }
    }
  }, [])

  function setMode(newMode: Level) {
    setModeState(newMode)
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newMode)
      }
    } catch {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[useTechnicalMode] Failed to write localStorage')
      }
    }
  }

  return (
    <TechnicalModeContext.Provider value={{ mode, setMode }}>
      {children}
    </TechnicalModeContext.Provider>
  )
}

export function useTechnicalMode() {
  return useContext(TechnicalModeContext)
}
