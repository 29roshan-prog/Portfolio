import { contextLabels } from '../data/projects'
import type { Project } from '../data/types'

const tone: Record<Project['context'], string> = {
  personal: 'border-sky-400/30 text-sky-200',
  academic: 'border-cyan-300/30 text-cyan-100',
  professional: 'border-volt/40 text-volt-soft',
  client: 'border-violet-400/30 text-violet-200',
  review: 'border-amber-400/30 text-amber-200',
}

export function ContextBadge({ project, withNote = false }: { project: Project; withNote?: boolean }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
      <span className={`rounded-full border px-2.5 py-0.5 ${tone[project.context]}`}>{contextLabels[project.context]}</span>
      {withNote && project.contextNote && <span className="text-mist">{project.contextNote}</span>}
    </span>
  )
}
