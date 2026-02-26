import type { CompanyAdoption } from '@/types'

interface CompanyAdoptionTableProps {
  adoptions: CompanyAdoption[]
}

export function CompanyAdoptionTable({ adoptions }: CompanyAdoptionTableProps) {
  return (
    <section className="my-6" aria-labelledby="adoption-heading">
      <h2 id="adoption-heading" className="text-xl font-bold">Company Adoption</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Real-world examples of AI deployment in this field.
      </p>

      {/* Desktop table */}
      <div className="mt-4 hidden overflow-hidden rounded-xl border md:block">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Company</th>
              <th className="px-4 py-3 text-left font-medium">Sector</th>
              <th className="px-4 py-3 text-left font-medium">How They Use AI</th>
              <th className="px-4 py-3 text-left font-medium">Year</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {adoptions.map((a, i) => (
              <tr key={i} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">
                  {a.sourceUrl ? (
                    <a
                      href={a.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {a.company}
                    </a>
                  ) : (
                    a.company
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{a.sector}</td>
                <td className="px-4 py-3">{a.aiUse}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="mt-4 space-y-3 md:hidden">
        {adoptions.map((a, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 text-sm">
            <div className="flex items-start justify-between">
              <p className="font-semibold">
                {a.sourceUrl ? (
                  <a
                    href={a.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {a.company}
                  </a>
                ) : (
                  a.company
                )}
              </p>
              <span className="text-xs text-muted-foreground">{a.year}</span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{a.sector}</p>
            <p className="mt-2 leading-relaxed">{a.aiUse}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
