import type { Project } from '../data/types'
import { site } from '../data/site'
import { DraftNote } from './Draft'

export function TechStack({ project }: { project: Project }) {
  const groups = project.stack
    .map((g) => ({ ...g, items: g.items.filter((t) => !t.verify || site.draftMode) }))
    .filter((g) => g.items.length)
  if (!groups.length) return <DraftNote>Technology stack not added yet</DraftNote>
  return (
    <dl className="divide-y divide-line border-y border-line">
      {groups.map((g) => (
        <div key={g.group} className="grid gap-2 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
          <dt className="text-sm text-mist">{g.group}</dt>
          <dd className="flex flex-wrap gap-2">
            {g.items.map((t) => (
              <span key={t.name} className={`rounded-lg border px-3 py-1.5 text-sm ${t.verify ? 'border-dashed border-amber-400/35 text-amber-100/75' : 'border-line bg-white/[.02] text-snow'}`}>
                {t.name}{t.verify && <span className="sr-only"> (to be verified)</span>}
              </span>
            ))}
          </dd>
        </div>
      ))}
      {site.draftMode && groups.some((g) => g.items.some((t) => t.verify)) && (
        <div className="py-3 text-xs text-amber-100/60">Dashed items are unconfirmed and are hidden when draft mode is off.</div>
      )}
    </dl>
  )
}
