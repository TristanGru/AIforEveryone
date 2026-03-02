import { ExternalLink } from 'lucide-react'
import type { BonusItem } from '@/types'

interface GoingDeeperProps {
  items: BonusItem[]
}

export function GoingDeeper({ items }: GoingDeeperProps) {
  if (items.length === 0) return null

  return (
    <section className="mt-10 pt-8 border-t border-border" aria-labelledby="going-deeper-heading">
      <h2 id="going-deeper-heading" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Going Deeper
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        Optional reads for those who want more. (Some may be behind a paywall)
      </p>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex flex-col gap-0.5">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors group"
            >
              {item.title}
              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" aria-hidden="true" />
            </a>
            <span className="text-xs text-muted-foreground">{item.source}</span>
            {item.why && (
              <span className="text-xs text-muted-foreground italic">{item.why}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
