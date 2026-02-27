import type { SkillImplications } from '@/types'

interface SkillsMatrixProps {
  skills: SkillImplications
}

function SkillColumn({
  title,
  items,
  accent,
}: {
  title: string
  items: string[]
  accent: string
}) {
  return (
    <div>
      <h3 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${accent}`}>{title}</h3>
      <ul className="space-y-2">
        {items.map((skill, i) => (
          <li key={i} className="text-sm text-muted-foreground leading-snug">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SkillsMatrix({ skills }: SkillsMatrixProps) {
  return (
    <section className="my-8 border-t border-border pt-7" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-lg font-bold tracking-tight mb-6">Skills Matrix</h2>
      <div className="grid gap-8 sm:grid-cols-3">
        <SkillColumn
          title="Declining"
          items={skills.declining}
          accent="text-red-700 dark:text-red-400"
        />
        <SkillColumn
          title="Growing"
          items={skills.growing}
          accent="text-emerald-700 dark:text-emerald-400"
        />
        <SkillColumn
          title="Emerging"
          items={skills.emerging}
          accent="text-primary"
        />
      </div>
    </section>
  )
}
