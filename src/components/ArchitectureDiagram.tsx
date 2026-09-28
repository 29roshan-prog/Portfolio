import { ArrowDown, ArrowRight } from 'lucide-react'
import type { Flow, FlowNode, NodeKind } from '../data/types'

const kindStyle: Record<NodeKind, { cls: string; label: string }> = {
  input: { cls: 'border-line bg-slate', label: 'Input' },
  process: { cls: 'border-line bg-coal', label: 'Processing' },
  model: { cls: 'border-volt/50 bg-volt/[.08]', label: 'Model' },
  rule: { cls: 'border-cyan-300/40 bg-cyan-300/[.06]', label: 'Deterministic rules' },
  store: { cls: 'border-violet-400/35 bg-violet-400/[.06]', label: 'Storage' },
  output: { cls: 'border-snow/30 bg-white/[.04]', label: 'Output' },
}

function Node({ n }: { n: FlowNode }) {
  return (
    <div className={`rounded-xl border px-3.5 py-3 ${kindStyle[n.kind].cls}`}>
      <p className="text-sm font-medium leading-snug text-snow">{n.label}</p>
      {n.detail && <p className="mt-0.5 text-xs leading-snug text-mist">{n.detail}</p>}
    </div>
  )
}

/** Flow diagram generated from data. Horizontal on wide screens, vertical on mobile. */
export function ArchitectureDiagram({ flow }: { flow: Flow }) {
  const kinds = Array.from(new Set(flow.steps.flat().map((n) => n.kind)))
  return (
    <figure className="rounded-2xl border border-line bg-[#0b0c11] p-5 sm:p-7">
      <figcaption className="mb-6">
        <p className="font-medium">{flow.title}</p>
        {flow.caption && <p className="mt-1 text-sm text-mist">{flow.caption}</p>}
      </figcaption>
      <ol className="flex flex-col items-stretch gap-2 xl:flex-row xl:items-center">
        {flow.steps.map((s, i) => (
          <li key={i} className="flex flex-col items-stretch gap-2 xl:flex-1 xl:flex-row xl:items-center">
            <div className="flex flex-col gap-2 xl:flex-1">
              {Array.isArray(s) ? s.map((n) => <Node key={n.label} n={n} />) : <Node n={s} />}
            </div>
            {i < flow.steps.length - 1 && (
              <span aria-hidden className="flex justify-center text-volt/70">
                <ArrowDown className="size-4 xl:hidden" />
                <ArrowRight className="hidden size-4 xl:block" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-mist" aria-label="Legend">
        {kinds.map((k) => (
          <li key={k} className="flex items-center gap-2"><span className={`size-3 rounded border ${kindStyle[k].cls}`} aria-hidden />{kindStyle[k].label}</li>
        ))}
      </ul>
    </figure>
  )
}
