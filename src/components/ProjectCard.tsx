import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/types'
import { ContextBadge } from './ContextBadge'
import { ScreenshotFrame } from './ScreenshotFrame'
import { TechChips } from './TechChips'
import { ProjectLinks } from './ProjectLinks'

/** Compact card for non-featured projects. Whole top image links to the case study. */
export function ProjectCard({ project }: { project: Project }) {
  const cover = project.shots.find((s) => s.frame !== 'phone') ?? project.shots[0]
  return (
    <motion.article layout initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45 }}
      className="group flex flex-col">
      <Link to={`/projects/${project.slug}`} className="block" aria-label={`${project.name} case study`}>
        {cover && <ScreenshotFrame slug={project.slug} shot={{ ...cover, frame: 'plain', aspect: '16 / 10' }} zoom />}
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="text-sm text-volt-soft">{project.category}</p>
          <ContextBadge project={project} />
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          <Link to={`/projects/${project.slug}`} className="hover:text-white">{project.name}</Link>
        </h3>
        <p className="pretty mt-2 text-sm leading-relaxed text-fog">{project.summary}</p>
        <p className="mt-3 text-sm leading-relaxed text-mist"><span className="text-fog">Problem: </span>{project.problem}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-mist"><span className="text-fog">My contribution: </span>{project.contribution}</p>
        <div className="mt-4"><TechChips project={project} max={5} /></div>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <Link to={`/projects/${project.slug}`} className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-volt">View Case Study</Link>
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </motion.article>
  )
}
