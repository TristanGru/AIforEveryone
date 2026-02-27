import type { CompanyAdoption } from '@/types'

interface CompanyAdoptionTableProps {
  adoptions: CompanyAdoption[]
}

export function CompanyAdoptionTable({ adoptions }: CompanyAdoptionTableProps) {
  return (
    <section className="my-8 border-t border-border pt-7" aria-labelledby="adoption-heading">
      <h2 id="adoption-heading" className="text-lg font-bold tracking-tight mb-1">Company Adoption</h2>
      <p className="mb-5 text-sm text-muted-foreground">
        Real-world examples of AI deployment in this field.
      </p>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2.5 pr-6 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Company
              </th>
              <th className="py-2.5 pr-6 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Sector
              </th>
              <th className="py-2.5 pr-6 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                How They Use AI
              </th>
              <th className="py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Year
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {adoptions.map((a, i) => (
              <tr key={i}>
                <td className="py-3 pr-6 font-medium">
                  {a.sourceUrl ? (
                    <a
                      href={a.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors"
                    >
                      {a.company}
                    </a>
                  ) : (
                    a.company
                  )}
                </td>
                <td className="py-3 pr-6 text-muted-foreground">{a.sector}</td>
                <td className="py-3 pr-6 text-foreground/85">{a.aiUse}</td>
                <td className="py-3 text-muted-foreground tabular-nums">{a.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked list */}
      <div className="divide-y divide-border md:hidden">
        {adoptions.map((a, i) => (
          <div key={i} className="py-4 text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-semibold">
                {a.sourceUrl ? (
                  <a
                    href={a.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors"
                  >
                    {a.company}
                  </a>
                ) : (
                  a.company
                )}
              </p>
              <span className="text-xs text-muted-foreground tabular-nums flex-shrink-0">{a.year}</span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{a.sector}</p>
            <p className="mt-2 leading-relaxed text-foreground/85">{a.aiUse}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
