import { cn, slugify, formatDate, truncate } from '@/lib/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('merges tailwind conflicts correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})

describe('slugify', () => {
  it('lowercases text', () => {
    expect(slugify('Marketing Manager')).toBe('marketing-manager')
  })

  it('replaces spaces with hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(slugify('AI & ML!')).toBe('ai-ml')
  })

  it('trims leading and trailing hyphens', () => {
    expect(slugify('  hello  ')).toBe('hello')
  })
})

describe('truncate', () => {
  it('returns string unchanged if under limit', () => {
    expect(truncate('short', 100)).toBe('short')
  })

  it('truncates with ellipsis', () => {
    const result = truncate('abcdefghij', 5)
    expect(result).toHaveLength(5)
    expect(result.endsWith('…')).toBe(true)
  })
})

describe('formatDate', () => {
  it('returns a human-readable date', () => {
    const result = formatDate('2026-02-24')
    expect(result).toContain('2026')
    expect(result).toContain('February')
  })
})
