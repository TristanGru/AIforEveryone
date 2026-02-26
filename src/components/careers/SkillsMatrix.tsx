import { TrendingDown, TrendingUp, Sparkles } from 'lucide-react'
import type { SkillImplications } from '@/types'

interface SkillsMatrixProps {
  skills: SkillImplications
}

export function SkillsMatrix({ skills }: SkillsMatrixProps) {
  return (
    <section className="my-6" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-xl font-bold">Skills Matrix</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {/* Declining */}
        <div className="rounded-xl border-l-4 border-l-red-400 bg-card p-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-500" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-red-700">Declining</h3>
          </div>
          <ul className="mt-3 space-y-1.5">
            {skills.declining.map((skill, i) => (
              <li key={i} className="text-sm text-muted-foreground before:mr-1.5 before:content-['•']">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Growing */}
        <div className="rounded-xl border-l-4 border-l-green-400 bg-card p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-green-700">Growing</h3>
          </div>
          <ul className="mt-3 space-y-1.5">
            {skills.growing.map((skill, i) => (
              <li key={i} className="text-sm text-muted-foreground before:mr-1.5 before:content-['•']">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Emerging */}
        <div className="rounded-xl border-l-4 border-l-indigo-400 bg-card p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-500" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-indigo-700">Emerging</h3>
          </div>
          <ul className="mt-3 space-y-1.5">
            {skills.emerging.map((skill, i) => (
              <li key={i} className="text-sm text-muted-foreground before:mr-1.5 before:content-['•']">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
