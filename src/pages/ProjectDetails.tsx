import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArchitectureDiagram } from '../components/ArchitectureDiagram'
import { ContextBadge } from '../components/ContextBadge'
import { DraftNote, PendingPanel } from '../components/Draft'
import { ProjectGallery } from '../components/ProjectGallery'
import { ProjectLinks } from '../components/ProjectLinks'
import { ScreenshotFrame } from '../components/ScreenshotFrame'
import { TechStack } from '../components/TechStack'
import { getProject, projects } from '../data/projects'
import { site } from '../data/site'
import { useSeo } from '../lib/seo'
import NotFound from './NotFound'

const isPlaceholder = (s: string) => /^(to be added|details to (be filled|confirm))/i.test(s.trim())

function Row({ title, children, wide }: { title: string; children: ReactNode; wide?: boolean }) {
  return (
    <section className={`grid gap-6 border-t border-line py-12 sm:py-16 ${wide ? '' : 'lg:grid-cols-12 lg:gap-10'}`} aria-label={title}>
      <h2 className={`text-xl font-semibold tracking-tight sm:text-2xl ${wide ? '' : 'lg:col-span-3'}`}>{title}</h2>
      <div className={wide ? '' : 'lg:col-span-8 lg:col-start-5'}>{children}</div>
    </section>
  )
}

function Prose({ items }: { items: string[] }) {
  return (
    <div className="max-w-[68ch] space-y-4 text-[17px] leading-relaxed text-fog">
      {items.map((t) => (isPlaceholder(t) ? <DraftNote key={t}>{t}</DraftNote> : <p key={t} className="pretty">{t}</p>))}
    </div>
  )
}

function Bullets({ items }: { items: string[] }) {
  const real = items.filter((i) => !isPlaceholder(i))
  if (!real.length) return <DraftNote>{items[0] ?? 'To be added'}</DraftNote>
  return (
    <ul className="max-w-[68ch] space-y-3 text-[17px] leading-relaxed text-fog">
      {real.map((t) => (
        <li key={t} className="flex gap-3"><span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-volt" />{t}</li>
      ))}
    </ul>
  )
}

export default function ProjectDetails() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  useSeo(project ? `${project.name} — Case study · Roshan Prabhu` : 'Project not found', project?.summary ?? '')
  if (!project) return <NotFound />

  const i = projects.indexOf(project)
  const next = projects[(i + 1) % projects.length]
  const cover = project.shots[0]
  const hasLinks = project.links.live || project.links.repo || project.links.other?.length

  return (
    <article className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link to="/" state={{ scrollTo: 'projects' }} className="inline-flex items-center gap-2 text-sm text-mist hover:text-snow">
          <ArrowLeft aria-hidden className="size-4" /> All projects
        </Link>

        <header className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-volt-soft">{project.category}</p>
              <ContextBadge project={project} withNote />
            </div>
            <h1 className="balance mt-4 text-4xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-6xl">{project.name}</h1>
            <p className="pretty mt-5 max-w-2xl text-xl leading-relaxed text-fog">{project.tagline}</p>
          </div>
          {hasLinks && (
            <div className="flex flex-wrap content-end gap-3 lg:col-span-4 lg:justify-end"><ProjectLinks project={project} /></div>
          )}
        </header>

        {cover && <div className="mt-12 group"><ScreenshotFrame slug={project.slug} shot={cover} priority /></div>}

        {site.draftMode && project.pending.length > 0 && <div className="mt-10"><PendingPanel items={project.pending} /></div>}

        <div className="mt-12">
          <Row title="Overview"><Prose items={project.overview} /></Row>
          <Row title="Problem & context"><Prose items={project.problemContext} /></Row>
          <Row title="Objectives"><Bullets items={project.objectives} /></Row>
          <Row title="My role"><Bullets items={project.role} /></Row>
          <Row title="Solution & implementation"><Prose items={project.solution} /></Row>

          {project.flows.length > 0 && (
            <Row title={project.flows.length > 1 ? 'Architecture & workflows' : 'Architecture'} wide>
              <div className="space-y-6">{project.flows.map((f) => <ArchitectureDiagram key={f.title} flow={f} />)}</div>
            </Row>
          )}

          {project.features.length > 0 && (
            <Row title="Features">
              <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {project.features.map((f) => (
                  <div key={f.title}><dt className="font-medium">{f.title}</dt><dd className="mt-1.5 leading-relaxed text-mist">{f.body}</dd></div>
                ))}
              </dl>
            </Row>
          )}

          <Row title="Screens" wide><ProjectGallery project={project} /></Row>

          {(project.stack.some((g) => g.items.some((t) => !t.verify)) || site.draftMode) && <Row title="Technology stack"><TechStack project={project} /></Row>}

          {project.challenges.length > 0 && (
            <Row title="Engineering challenges">
              <div className="space-y-8">
                {project.challenges.map((c) => (
                  <div key={c.title} className="max-w-[68ch]"><h3 className="font-medium">{c.title}</h3><p className="pretty mt-2 leading-relaxed text-fog">{c.body}</p></div>
                ))}
              </div>
            </Row>
          )}

          {(project.results.length > 0 || site.draftMode) && (
            <Row title="Results">
              {project.results.length ? <Bullets items={project.results} /> : <DraftNote>No verified metrics yet. Add measured results to `results` — this section stays hidden until then.</DraftNote>}
            </Row>
          )}

          {hasLinks && <Row title="Links"><div className="flex flex-wrap gap-3"><ProjectLinks project={project} /></div></Row>}

          {project.disclaimer && (
            <p className="max-w-3xl border-t border-line py-8 text-sm leading-relaxed text-mist">{project.disclaimer}</p>
          )}
        </div>

        {next && next.slug !== project.slug && (
          <Link to={`/projects/${next.slug}`} className="group mb-24 mt-8 flex items-center justify-between gap-6 rounded-2xl border border-line p-6 transition-colors hover:border-volt/60 sm:p-10">
            <div className="min-w-0">
              <p className="text-sm text-mist">Next project</p>
              <p className="mt-2 truncate text-2xl font-semibold tracking-tight sm:text-3xl">{next.name}</p>
            </div>
            <ArrowRight aria-hidden className="size-6 shrink-0 text-volt transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </article>
  )
}
