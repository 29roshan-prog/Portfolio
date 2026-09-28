import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/types'
import { ContextBadge } from './ContextBadge'
import { ScreenshotFrame } from './ScreenshotFrame'
import { TechChips } from './TechChips'
import { ProjectLinks } from './ProjectLinks'

/** Large featured layout: big screenshot on one side, story on the other. Alternates by index. */
export function ProjectShowcase({ project, flip }: { project: Project; flip: boolean }) {
  const cover = project.shots[0]
  const second = project.shots[1]
  return (
    <motion.article layout initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Link to={`/projects/${project.slug}`} className={`group relative block lg:col-span-7 ${flip ? 'lg:order-2' : ''}`} aria-label={`${project.name} case study`}>
        {cover && cover.frame === 'phone' ? (
          <div className="grid grid-cols-3 items-end gap-3 rounded-2xl border border-line bg-coal p-4 sm:gap-5 sm:p-8">
            {project.shots.filter((s) => s.frame === 'phone').slice(0, 3).map((s, i) => (
              <div key={s.id} className={i === 1 ? 'sm:-translate-y-6' : ''}><ScreenshotFrame slug={project.slug} shot={s} className="!rounded-[1.4rem] !p-1.5 sm:!rounded-[2rem] sm:!p-2" /></div>
            ))}
          </div>
        ) : cover && <ScreenshotFrame slug={project.slug} shot={cover} zoom />}
        {cover?.frame !== 'phone' && second && second.frame === 'phone' && (
          <div className="absolute -bottom-6 -right-2 hidden w-32 sm:block"><ScreenshotFrame slug={project.slug} shot={second} /></div>
        )}
      </Link>
      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-volt-soft">{project.category}</p>
          <ContextBadge project={project} />
        </div>
        <h3 className="balance mt-3 text-3xl font-semibold tracking-[-0.025em] sm:text-[2.1rem] sm:leading-tight">
          <Link to={`/projects/${project.slug}`} className="hover:text-white">{project.name}</Link>
        </h3>
        <p className="pretty mt-4 leading-relaxed text-fog">{project.summary}</p>
        <dl className="mt-6 space-y-4 border-l border-line pl-5 text-sm leading-relaxed">
          <div><dt className="font-medium text-snow">Problem</dt><dd className="mt-1 text-mist">{project.problem}</dd></div>
          <div><dt className="font-medium text-snow">My contribution</dt><dd className="mt-1 text-mist">{project.contribution}</dd></div>
        </dl>
        <div className="mt-6"><TechChips project={project} /></div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-volt px-5 py-2.5 text-sm font-semibold text-black neon-btn transition-colors hover:bg-[#6bff4f]">
            View Case Study <ArrowUpRight aria-hidden className="size-4" />
          </Link>
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </motion.article>
  )
}
