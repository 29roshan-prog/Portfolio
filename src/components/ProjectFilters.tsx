import { motion } from 'motion/react'
import { filters } from '../data/projects'
import type { FilterKey } from '../data/types'

export function ProjectFilters({ value, onChange, counts }: { value: FilterKey | 'all'; onChange: (v: FilterKey | 'all') => void; counts: Record<string, number> }) {
  return (
    <div role="tablist" aria-label="Filter projects by category" className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
      {filters.map((f) => {
        const active = value === f.key
        const n = counts[f.key] ?? 0
        return (
          <button key={f.key} role="tab" aria-selected={active} onClick={() => onChange(f.key)} disabled={n === 0}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors disabled:opacity-35 ${active ? 'text-white' : 'text-mist hover:text-snow'}`}>
            {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full border border-volt/50 bg-volt/15" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="relative">{f.label} <span className="tabular-nums text-mist">{n}</span></span>
          </button>
        )
      })}
    </div>
  )
}
