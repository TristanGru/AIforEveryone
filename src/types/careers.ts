import type { Level } from './weekly'

export type ThreatLevel = 'low' | 'moderate' | 'significant' | 'transformative'
export type CareerCategory = 'white-collar' | 'creative' | 'healthcare' | 'blue-collar'

export interface CompanyAdoption {
  company: string
  sector: string
  aiUse: string
  sourceUrl?: string
  year: number
}

export interface SkillImplications {
  declining: string[]
  growing: string[]
  emerging: string[]
}

export interface ReadingItem {
  title: string
  url: string
  source: string
  level: Level
}

export interface Tool {
  name: string
  url: string
  oneLiner: string
}

export interface CareerPage {
  slug: string
  title: string
  category: CareerCategory
  threatLevel: ThreatLevel
  threatExplainer: string
  summary: string
  whatIsChanging: string[]
  companyAdoptions: CompanyAdoption[]
  skillImplications: SkillImplications
  weeklySignalId?: string
  recommendedReading: ReadingItem[]
  toolsWorthKnowing: Tool[]
  version: string
  lastUpdated: string
  publishedAt: string
  body: string
}

export interface CareerMeta
  extends Omit<
    CareerPage,
    | 'whatIsChanging'
    | 'companyAdoptions'
    | 'skillImplications'
    | 'recommendedReading'
    | 'toolsWorthKnowing'
    | 'threatExplainer'
    | 'weeklySignalId'
    | 'body'
  > {}
