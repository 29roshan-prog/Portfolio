import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

/** Links each skill group to the projects whose stack actually mentions its tools. */
function projectsFor(items: string[]) {
  const keys = items.map(norm)
  return projects.filter((p) => {
    const names = p.stack.flatMap((g) => g.items.filter((t) => !t.verify).map((t) => norm(t.name)))
    return keys.some((k) => names.some((n) => n === k || n.startsWith(k)))
  })
}

export function Skills() {
  return (
    <section id="skills" className="border-t border-line py-24 sm:py-32" aria-labelledby="skills-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 id="skills-title" className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Skills & technologies</h2>
          <p className="mt-4 text-lg text-fog">Tools I've used in the projects above, grouped by what they're for.</p>
        </div>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {skillGroups.map((g) => {
            const used = projectsFor(g.items)
            return (
              <div key={g.title} className="group grid gap-4 py-7 transition-colors md:grid-cols-12 md:gap-8">
                <div className="md:col-span-4">
                  <h3 className="text-lg font-medium transition-colors group-hover:text-white">{g.title}</h3>
                  <p className="mt-1 text-sm text-mist">{g.blurb}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-2 md:col-span-5">
                  {g.items.map((i) => <li key={i} className="rounded-lg border border-line bg-white/[.02] px-3 py-1.5 text-sm text-snow transition-colors group-hover:border-volt/40">{i}</li>)}
                </ul>
                <div className="text-sm md:col-span-3">
                  {used.length > 0 && (
                    <>
                      <p className="text-mist">Used in</p>
                      <ul className="mt-1.5 space-y-1">
                        {used.slice(0, 4).map((p) => (
                          <li key={p.slug}><Link to={`/projects/${p.slug}`} className="text-fog underline decoration-line underline-offset-4 hover:text-snow hover:decoration-volt">{p.name.split(' — ')[0]}</Link></li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
