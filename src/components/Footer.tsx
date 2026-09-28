import { site } from '../data/site'
import { sections, useSectionNav } from '../lib/nav'

export function Footer() {
  const goTo = useSectionNav()
  return (
    <footer className="border-t border-line py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {sections.map((s) => (
              <li key={s.id}><a href={s.id === 'top' ? '/' : `/#${s.id}`} onClick={(e) => { e.preventDefault(); goTo(s.id) }} className="hover:text-snow">{s.label}</a></li>
            ))}
            {site.github && <li><a href={site.github} target="_blank" rel="noreferrer" className="hover:text-snow">GitHub</a></li>}
            {site.linkedin && <li><a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-snow">LinkedIn</a></li>}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
