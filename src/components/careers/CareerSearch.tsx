'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search } from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { buildCareerSearchIndex } from '@/lib/search'
import { CareerCard } from './CareerCard'
import type { CareerMeta, CareerCategory } from '@/types'

const CATEGORIES: Array<{ value: CareerCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'knowledge-workers', label: 'Knowledge Workers' },
  { value: 'skilled-trades', label: 'Skilled Trades' },
  { value: 'service-workers', label: 'Service Workers' },
  { value: 'administrative', label: 'Administrative' },
  { value: 'industrial-workers', label: 'Industrial Workers' },
]

interface CareerSearchProps {
  careers: CareerMeta[]
}

export function CareerSearch({ careers }: CareerSearchProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CareerCategory | 'all'>('all')
  const [results, setResults] = useState<CareerMeta[]>(careers)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const searchFn = useCallback(buildCareerSearchIndex(careers), [careers])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      if (query.trim().length >= 2) {
        track('career_search_performed', { query_length: query.trim().length })
      }
      const searched = query.trim() ? searchFn(query) : careers
      const filtered =
        category === 'all' ? searched : searched.filter((c) => c.category === category)
      setResults(filtered)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, category, careers, searchFn])

  if (careers.length === 0) {
    return (
      <p className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        Career pages are coming soon — check back weekly.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search careers..."
          aria-label="Search careers"
          className="w-full rounded-lg border bg-background py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setCategory(value)}
            aria-pressed={category === value}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
              category === value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <p className="rounded-xl border bg-card p-6 text-center text-muted-foreground">
          No results for &ldquo;{query}&rdquo;. Try a different job title.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {results.map((career) => (
            <CareerCard key={career.slug} career={career} />
          ))}
        </div>
      )}
    </div>
  )
}
