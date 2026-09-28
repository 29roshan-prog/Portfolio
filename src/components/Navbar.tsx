import { FileText, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import { sections, useSectionNav } from '../lib/nav'

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>('top')
  useEffect(() => {
    if (!enabled) return
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [enabled])
  return active
}

export function Navbar() {
  const { pathname } = useLocation()
  const goTo = useSectionNav()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const onHome = pathname === '/'
  const active = useActiveSection(onHome)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const click = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (open) {
      setOpen(false)
      setTimeout(() => goTo(id), 320) // let the menu collapse first
    } else goTo(id)
  }

  const resume = site.resumeUrl ? (
    <a href={site.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-snow transition-colors hover:border-volt hover:text-white">
      <FileText aria-hidden className="size-4" /> Resume
    </a>
  ) : (
    <span title="Add your resume in src/data/site.ts" aria-disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-mist">
      <FileText aria-hidden className="size-4" /> Resume
    </span>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-b border-line/80 bg-ink/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link to="/" onClick={click('top')} className="group flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
          <span aria-hidden className="grid size-7 place-items-center rounded-lg border border-line text-[11px] font-semibold transition-colors group-hover:border-volt">RP</span>
          {site.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => {
            const isActive = onHome && active === s.id
            return (
              <li key={s.id}>
                <a href={s.id === 'top' ? '/' : `/#${s.id}`} onClick={click(s.id)} aria-current={isActive ? 'true' : undefined}
                  className={`relative px-3 py-2 text-sm transition-colors ${isActive ? 'text-snow' : 'text-mist hover:text-snow'}`}>
                  {s.label}
                  {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-px bg-volt" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:block">{resume}</div>

        <button onClick={() => setOpen((v) => !v)} className="-mr-2 rounded-lg p-2 md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden">
            <ul className="space-y-1 px-5 pb-6 pt-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={s.id === 'top' ? '/' : `/#${s.id}`} onClick={click(s.id)} className="block rounded-lg px-3 py-3 text-lg text-fog hover:bg-white/5 hover:text-snow">{s.label}</a>
                </li>
              ))}
              <li className="pt-3">{resume}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
