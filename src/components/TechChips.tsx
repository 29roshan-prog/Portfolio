import type { Project } from '../data/types'
import { site } from '../data/site'

export function TechChips({ project, max = 8 }: { project: Project; max?: number }) {
  const items = project.stack.flatMap((g) => g.items).filter((t) => !t.verify || site.draftMode)
  const unique = items.filter((t, i) => items.findIndex((x) => x.name === t.name) === i)
  if (unique.length === 0) return null
  const shown = unique.slice(0, max)
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {shown.map((t) => (
        <li key={t.name} className={`rounded-md border px-2 py-0.5 text-xs ${t.verify ? 'border-dashed border-amber-400/30 text-amber-100/70' : 'border-line text-fog'}`} title={t.verify ? 'To be verified from source' : undefined}>
          {t.name}
        </li>
      ))}
      {unique.length > max && <li className="px-1 py-0.5 text-xs text-mist">+{unique.length - max} more</li>}
    </ul>
  )
}
