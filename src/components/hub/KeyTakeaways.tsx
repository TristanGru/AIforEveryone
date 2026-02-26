import { CheckCircle2 } from 'lucide-react'

interface KeyTakeawaysProps {
  takeaways: [string, string, string]
}

export function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  return (
    <aside className="my-6 rounded-xl border bg-primary/5 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Key Takeaways</h2>
      <ul className="mt-3 space-y-2">
        {takeaways.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
