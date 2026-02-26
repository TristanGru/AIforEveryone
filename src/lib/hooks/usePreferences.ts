'use client'

import { useState, useEffect } from 'react'
import { CONTENT_SCHEMA_VERSION } from '@/lib/content/schema-version'
import type { Level } from '@/types'

const PREFS_VERSION_KEY = 'ai-decoded-prefs-version'
const LEVEL_KEY = 'ai-decoded-level'
const JOB_KEY = 'ai-decoded-job'
const ALL_PREFS_KEYS = [PREFS_VERSION_KEY, LEVEL_KEY, JOB_KEY]

function safeGetItem(key: string): string | null {
  try {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  } catch {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[usePreferences] localStorage unavailable reading ${key}`)
    }
    return null
  }
}

function safeSetItem(key: string, value: string) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  } catch {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[usePreferences] localStorage unavailable writing ${key}`)
    }
  }
}

function checkAndMigratePrefs() {
  // Must run before reading any other pref key (BL-013)
  const storedVersion = safeGetItem(PREFS_VERSION_KEY)
  if (storedVersion !== String(CONTENT_SCHEMA_VERSION)) {
    // Version mismatch — clear all prefs
    try {
      if (typeof window !== 'undefined') {
        for (const key of ALL_PREFS_KEYS) {
          localStorage.removeItem(key)
        }
        // Clear all ai-decoded-read-* keys too
        const keysToRemove: string[] = []
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i)
          if (k?.startsWith('ai-decoded-')) keysToRemove.push(k)
        }
        for (const k of keysToRemove) localStorage.removeItem(k)
      }
    } catch {}
    safeSetItem(PREFS_VERSION_KEY, String(CONTENT_SCHEMA_VERSION))
  }
}

export function usePreferences() {
  const [level, setLevelState] = useState<Level>('accessible')
  const [jobSlug, setJobSlugState] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    checkAndMigratePrefs()

    const storedLevel = safeGetItem(LEVEL_KEY) as Level | null
    if (storedLevel === 'accessible' || storedLevel === 'intermediate' || storedLevel === 'technical') {
      setLevelState(storedLevel)
    }

    const storedJob = safeGetItem(JOB_KEY)
    if (storedJob) setJobSlugState(storedJob)

    setInitialized(true)
  }, [])

  function setLevel(newLevel: Level) {
    setLevelState(newLevel)
    safeSetItem(LEVEL_KEY, newLevel)
  }

  function setJobSlug(slug: string | null) {
    setJobSlugState(slug)
    if (slug) {
      safeSetItem(JOB_KEY, slug)
    } else {
      try {
        if (typeof window !== 'undefined') localStorage.removeItem(JOB_KEY)
      } catch {}
    }
  }

  return { level, jobSlug, setLevel, setJobSlug, initialized }
}
