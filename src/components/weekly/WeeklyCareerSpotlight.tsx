import Link from 'next/link'
import { getCareer } from '@/lib/content/careers'

interface WeeklyCareerSpotlightProps {
  slug: string
}

export function WeeklyCareerSpotlight({ slug }: WeeklyCareerSpotlightProps) {
  const career = getCareer(slug)
  if (!career) return null

  return (
    <section className="mt-10 pt-8 border-t border-border" aria-labelledby="career-spotlight-heading">
      <h2 id="career-spotlight-heading" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Career Spotlight
      </h2>
      <Link
        href={`/careers/${career.slug}`}
        className="block rounded-xl border bg-card p-4 hover:border-primary/50 transition-colors"
      >
        <p className="font-semibold leading-tight">{career.title}</p>
        <p className="mt-1.5 text-sm text-muted-foreground">{career.summary}</p>
        <p className="mt-3 text-xs font-medium text-primary">Read the full breakdown →</p>
      </Link>
    </section>
  )
}
