'use client'

import { useState, useEffect } from 'react'
import { startOfWeek, subWeeks, format } from 'date-fns'

export function useReadingStreak(): number {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const today = new Date()
    let count = 0

    // Current week: counts toward streak if any articles read, but doesn't break it if not
    const currentWeekStr = format(startOfWeek(today, { weekStartsOn: 1 }), 'yyyy-MM-dd')
    try {
      const raw = localStorage.getItem(`ai-decoded-read-${currentWeekStr}`)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0) count = 1
      }
    } catch {}

    // Walk backwards through past weeks, break on first gap
    for (let i = 1; i < 52; i++) {
      const weekStr = format(startOfWeek(subWeeks(today, i), { weekStartsOn: 1 }), 'yyyy-MM-dd')
      try {
        const raw = localStorage.getItem(`ai-decoded-read-${weekStr}`)
        if (!raw) break
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed) || parsed.length === 0) break
        count++
      } catch {
        break
      }
    }

    setStreak(count)
  }, [])

  return streak
}
