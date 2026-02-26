import { ExternalLink } from 'lucide-react'
import type { Source } from '@/types'

interface SourceListProps {
  sources: Source[]
}

export function SourceList({ sources }: SourceListProps) {
  if (!sources.length) return null

  return (
    <section className="mt-8 border-t pt-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Sources</h2>
      <ul className="mt-3 space-y-2">
        {sources.map((source, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary hover:underline"
              >
                {source.name}
              </a>
              {source.note && <p className="text-muted-foreground">{source.note}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
