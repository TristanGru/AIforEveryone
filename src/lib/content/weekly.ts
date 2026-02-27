import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { startOfWeek, subWeeks, isMonday, parseISO } from 'date-fns'
import type { WeeklyList, WeeklyItem, BonusItem } from '@/types'

const WEEKLY_DIR = path.join(process.cwd(), 'content', 'weekly')

function getMondayDate(date: Date = new Date()): string {
  const monday = startOfWeek(date, { weekStartsOn: 1 })
  return monday.toISOString().slice(0, 10)
}

function getAllWeekFilenames(): string[] {
  if (!fs.existsSync(WEEKLY_DIR)) return []
  return fs
    .readdirSync(WEEKLY_DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.mdx$/.test(f))
    .sort()
    .reverse()
}

function parseWeeklyFile(filename: string): WeeklyList | null {
  const filePath = path.join(WEEKLY_DIR, filename)
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    const items = (data.items ?? []) as WeeklyItem[]
    return {
      week: data.week as string,
      items: items as WeeklyList['items'],
      featuredSlot: (data.featuredSlot ?? 1) as WeeklyList['featuredSlot'],
      bonusItems: (data.bonusItems ?? []) as BonusItem[],
    }
  } catch {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[weekly] Failed to parse ${filename}`)
    }
    return null
  }
}

export function getCurrentWeek(): { list: WeeklyList; isFallback: boolean; fallbackFrom?: string } {
  const currentMonday = getMondayDate()
  const allFiles = getAllWeekFilenames()

  const currentFile = `${currentMonday}.mdx`
  if (allFiles.includes(currentFile)) {
    const list = parseWeeklyFile(currentFile)
    if (list) return { list, isFallback: false }
  }

  // Fallback to most recent available week
  for (const filename of allFiles) {
    const list = parseWeeklyFile(filename)
    if (list) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[weekly] Fallback from ${currentMonday} to ${list.week}`)
      }
      return { list, isFallback: true, fallbackFrom: currentMonday }
    }
  }

  // No files at all — return empty placeholder
  const placeholder: WeeklyList = {
    week: currentMonday,
    items: [] as unknown as WeeklyList['items'],
    featuredSlot: 1,
  }
  return { list: placeholder, isFallback: true }
}

export function getWeekByDate(weekDate: string): WeeklyList | null {
  const filename = `${weekDate}.mdx`
  const allFiles = getAllWeekFilenames()
  if (!allFiles.includes(filename)) return null
  return parseWeeklyFile(filename)
}

export function getAllWeeks(): Array<{ week: string; filename: string }> {
  return getAllWeekFilenames().map((filename) => ({
    week: filename.replace('.mdx', ''),
    filename,
  }))
}

export function getFeaturedItem(list: WeeklyList): WeeklyItem {
  const slot = list.featuredSlot ?? 1
  const item = list.items.find((i) => i.slot === slot)
  if (!item) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[weekly] featuredSlot ${slot} not found in items — defaulting to slot 1`)
    }
    return list.items[0]
  }
  return item
}

export function getAllWeeklyItems(): WeeklyItem[] {
  const allFiles = getAllWeekFilenames()
  const items: WeeklyItem[] = []
  for (const filename of allFiles) {
    const list = parseWeeklyFile(filename)
    if (list) items.push(...list.items)
  }
  return items
}
