'use client'

import { useState, useEffect } from 'react'
import { subWeeks, parseISO, isAfter } from 'date-fns'

function getStorageKey(week: string) {
  return `ai-decoded-read-${week}`
}

function cleanOldKeys() {
  try {
    if (typeof window === 'undefined') return
    const cutoff = subWeeks(new Date(), 8)
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key?.startsWith('ai-decoded-read-')) continue
      const dateStr = key.replace('ai-decoded-read-', '')
      try {
        const date = parseISO(dateStr)
        if (!isAfter(date, cutoff)) {
          keysToRemove.push(key)
        }
      } catch {
        // Invalid date format — skip
      }
    }
    for (const key of keysToRemove) {
      localStorage.removeItem(key)
    }
  } catch {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[useReadState] localStorage unavailable during cleanup')
    }
  }
}

function readStoredIds(week: string): Set<string> {
  try {
    if (typeof window === 'undefined') return new Set()
    const raw = localStorage.getItem(getStorageKey(week))
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return new Set(parsed as string[])
  } catch {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[useReadState] Failed to read localStorage')
    }
  }
  return new Set()
}

function writeStoredIds(week: string, ids: Set<string>) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(getStorageKey(week), JSON.stringify([...ids]))
  } catch {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[useReadState] Failed to write localStorage')
    }
  }
}

export function useReadState(week: string) {
  const [readIds, setReadIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    cleanOldKeys()
    setReadIds(readStoredIds(week))
  }, [week])

  function toggleRead(id: string) {
    setReadIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      writeStoredIds(week, next)
      return next
    })
  }

  function isRead(id: string) {
    return readIds.has(id)
  }

  return {
    readIds,
    toggleRead,
    isRead,
    readCount: readIds.size,
  }
}
