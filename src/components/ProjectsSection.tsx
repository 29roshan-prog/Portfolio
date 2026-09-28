import { AnimatePresence, LayoutGroup } from 'motion/react'
import { useMemo, useState } from 'react'
import { filters, projects } from '../data/projects'
import type { FilterKey } from '../data/types'
import { ProjectCard } from './ProjectCard'
import { ProjectFilters } from './ProjectFilters'
import { ProjectShowcase } from './ProjectShowcase'

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterKey | 'all'>('all')
  const counts = useMemo(
    () => Object.fromEntries(filters.map((f) => [f.key, f.key === 'all' ? projects.length : projects.filter((p) => p.filters.includes(f.key as FilterKey)).length])),
    [],
  )
  const list = filter === 'all' ? projects : projects.filter((p) => p.filters.includes(filter))
  const featured = list.filter((p) => p.featured)
  const rest = list.filter((p) => !p.featured)

  return (
    <section id="projects" className="border-t border-line py-24 sm:py-32" aria-labelledby="projects-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 id="projects-title" className="text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">Selected Work</h2>
            <p className="mt-4 max-w-xl text-lg text-fog">From intelligent AI systems to real-world software products.</p>
          </div>
        </div>
        <div className="mt-10"><ProjectFilters value={filter} onChange={setFilter} counts={counts} /></div>

        <LayoutGroup>
          <div className="mt-16 space-y-28 sm:space-y-36">
            <AnimatePresence mode="popLayout">
              {featured.map((p, i) => <ProjectShowcase key={p.slug} project={p} flip={i % 2 === 1} />)}
            </AnimatePresence>
          </div>
          {rest.length > 0 && (
            <div className={featured.length ? 'mt-28 border-t border-line pt-16 sm:mt-36' : ''}>
              {featured.length > 0 && <h3 className="mb-10 text-2xl font-semibold tracking-tight">More projects</h3>}
              <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {rest.map((p) => <ProjectCard key={p.slug} project={p} />)}
                </AnimatePresence>
              </div>
            </div>
          )}
        </LayoutGroup>
      </div>
    </section>
  )
}
