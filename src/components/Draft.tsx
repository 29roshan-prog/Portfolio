import { TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { site } from '../data/site'

/** Visible only while site.draftMode is on. Marks content Roshan still needs to supply. */
export function DraftNote({ children, className = '' }: { children: ReactNode; className?: string }) {
  if (!site.draftMode) return null
  return (
    <span className={`inline-flex items-start gap-1.5 rounded-md border border-amber-400/30 bg-amber-400/[.06] px-2 py-1 text-xs text-amber-200/90 ${className}`}>
      <TriangleAlert aria-hidden className="mt-px size-3.5 shrink-0" />
      <span>{children}</span>
    </span>
  )
}

export function PendingPanel({ items }: { items: string[] }) {
  if (!site.draftMode || items.length === 0) return null
  return (
    <aside className="rounded-2xl border border-amber-400/25 bg-amber-400/[.04] p-5 sm:p-6" aria-label="Details to confirm">
      <p className="flex items-center gap-2 text-sm font-medium text-amber-200">
        <TriangleAlert aria-hidden className="size-4" /> Needs your input before publishing
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-amber-100/80">
        {items.map((i) => (
          <li key={i} className="flex gap-2"><span aria-hidden>–</span>{i}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-amber-100/50">Hidden when <code>draftMode</code> is off in src/data/site.ts</p>
    </aside>
  )
}
