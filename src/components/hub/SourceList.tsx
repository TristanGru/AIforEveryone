import type { Source } from '@/types'

interface SourceListProps {
  sources: Source[]
}

export function SourceList({ sources }: SourceListProps) {
  if (!sources.length) return null

  return (
    <section className="mt-10 border-t border-border pt-7">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Sources
      </h2>
      <ol className="space-y-2.5">
        {sources.map((source, i) => (
          <li key={i} className="flex items-baseline gap-3 text-sm">
            <span className="flex-shrink-0 text-xs text-muted-foreground tabular-nums w-4">
              {i + 1}.
            </span>
            <div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors"
              >
                {source.name}
              </a>
              {source.note && (
                <p className="mt-0.5 text-xs text-muted-foreground">{source.note}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
