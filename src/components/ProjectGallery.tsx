import { useMemo, useState } from 'react'
import type { Project } from '../data/types'
import { shotAsset } from '../lib/assets'
import { Lightbox } from './Lightbox'
import { ScreenshotFrame } from './ScreenshotFrame'

/** Annotated screenshot sequence for a case study, with lightbox for real images. */
export function ProjectGallery({ project }: { project: Project }) {
  const [open, setOpen] = useState<number | null>(null)
  const real = useMemo(
    () => project.shots.map((s) => ({ s, a: shotAsset(project.slug, s.id) })).filter((x) => !!x.a).map((x) => ({ s: x.s, src: x.a!.url, mockup: x.a!.mockup })),
    [project],
  )
  const items = real.map(({ s, src, mockup }) => ({ src, title: mockup ? `${s.title} (illustrative mockup)` : s.title, caption: s.caption }))

  return (
    <div className="space-y-14">
      {project.shots.map((shot) => {
        const realIndex = real.findIndex((r) => r.s.id === shot.id)
        const phone = shot.frame === 'phone'
        return (
          <figure key={shot.id} className={`grid items-start gap-6 ${phone ? 'md:grid-cols-[300px_1fr] md:gap-12' : 'lg:grid-cols-[1fr_260px] lg:gap-10'}`}>
            <div className="group">
              <ScreenshotFrame slug={project.slug} shot={shot} onOpen={realIndex >= 0 ? () => setOpen(realIndex) : undefined} />
            </div>
            <figcaption className={phone ? 'md:pt-6' : 'lg:pt-2'}>
              <p className="font-medium">{shot.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-mist">{shot.caption}</p>
              {shot.notes && (
                <ul className="mt-4 space-y-2 border-l border-volt/40 pl-4 text-sm text-fog">
                  {shot.notes.map((n) => <li key={n}>{n}</li>)}
                </ul>
              )}
            </figcaption>
          </figure>
        )
      })}
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  )
}
