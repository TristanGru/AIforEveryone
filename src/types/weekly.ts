export type Bucket = 'models' | 'business' | 'regulation' | 'tools'
export type Level = 'accessible' | 'intermediate' | 'technical'
export type DayHint = 'sunday' | 'wednesday' | 'friday'

export interface WeeklyItem {
  id: string
  week: string
  slot: 1 | 2 | 3 | 4 | 5
  title: string
  source: string
  url: string
  bucket: Bucket
  level: Level
  readingTimeMin: number
  summary: string
  dayHint: DayHint
  tags?: string[]
}

export interface BonusItem {
  title: string
  source: string
  url: string
  why?: string
}

export interface WeeklyList {
  week: string
  items: [WeeklyItem, WeeklyItem, WeeklyItem, WeeklyItem, WeeklyItem]
  featuredSlot: 1 | 2 | 3 | 4 | 5
  bonusItems?: BonusItem[]
}
