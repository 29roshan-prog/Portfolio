import { ExternalLink } from 'lucide-react'
import type { Project } from '../data/types'

/** Only renders buttons for URLs that actually exist. */
export function ProjectLinks({ project, compact }: { project: Project; compact?: boolean }) {
  const { live, repo, other = [] } = project.links
  const cls = compact
    ? 'inline-flex items-center gap-1.5 text-sm text-fog hover:text-snow'
    : 'inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-volt'
  return (
    <>
      {live && <a className={cls} href={live} target="_blank" rel="noreferrer">Live Demo <ExternalLink aria-hidden className="size-3.5" /></a>}
      {repo && <a className={cls} href={repo} target="_blank" rel="noreferrer">GitHub <ExternalLink aria-hidden className="size-3.5" /></a>}
      {!compact && other.map((o) => <a key={o.url} className={cls} href={o.url} target="_blank" rel="noreferrer">{o.label} <ExternalLink aria-hidden className="size-3.5" /></a>)}
    </>
  )
}
