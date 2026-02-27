interface KeyTakeawaysProps {
  takeaways: [string, string, string]
}

export function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  return (
    <aside className="my-8 border-l-4 border-primary pl-5 py-1">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        Key Takeaways
      </h2>
      <ul className="space-y-2.5">
        {takeaways.map((point, i) => (
          <li key={i} className="text-sm leading-relaxed text-foreground/85">
            {point}
          </li>
        ))}
      </ul>
    </aside>
  )
}
