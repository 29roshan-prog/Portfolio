import { ImageOff, Maximize2 } from 'lucide-react'
import { useState } from 'react'
import { site } from '../data/site'
import type { Shot } from '../data/types'
import { shotAsset, shotPath } from '../lib/assets'

interface Props {
  slug: string
  shot: Shot
  onOpen?: () => void
  priority?: boolean
  className?: string
  /** allow parent hover (group) to zoom the image */
  zoom?: boolean
}

/** Renders a real screenshot inside a device/app frame, or a clearly labelled placeholder when none exists yet. */
export function ScreenshotFrame({ slug, shot, onOpen, priority, className = '', zoom }: Props) {
  const asset = shotAsset(slug, shot.id)
  const url = asset?.url
  const mockup = !!asset?.mockup
  const [failed, setFailed] = useState(false)
  const real = url && !failed
  const isPhone = shot.frame === 'phone'

  const body = real ? (
    <img
      src={url}
      alt={`${mockup ? 'Illustrative mockup of ' : ''}${shot.title} — ${shot.caption}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`absolute inset-0 size-full object-cover object-top ${zoom ? 'transition-transform duration-700 ease-out group-hover:scale-[1.025]' : ''}`}
    />
  ) : (
    <div className="hatch absolute inset-0 flex flex-col items-center justify-center gap-2 bg-coal p-4 text-center" role="img" aria-label={`Placeholder: ${shot.title} screenshot not yet added`}>
      <ImageOff aria-hidden className="size-5 text-mist/70" />
      <p className="text-sm font-medium text-fog">{shot.title}</p>
      <p className="text-xs text-mist">Screenshot pending — not a real interface</p>
      {site.draftMode && (
        <code className="mt-1 max-w-full break-all rounded bg-white/[.04] px-2 py-1 font-mono text-[11px] text-mist/80">{shotPath(slug, shot.id)}</code>
      )}
    </div>
  )

  const screen = (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: shot.aspect }}>
      {body}
      {real && mockup && (
        <span className={`pointer-events-none absolute rounded-md border border-white/10 bg-black/75 font-medium tracking-wide text-fog backdrop-blur ${isPhone ? 'bottom-1.5 left-1.5 px-1.5 py-px text-[9px]' : 'bottom-2.5 left-2.5 px-2 py-0.5 text-[10px]'}`} title="Design illustration, not a capture of the deployed app">
          {isPhone ? 'Mockup' : 'Illustrative mockup'}
        </span>
      )}
      {real && onOpen && (
        <button
          type="button"
          onClick={onOpen}
          className="absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          aria-label={`Enlarge ${shot.title}`}
        >
          <span className="rounded-full bg-ink/80 p-2 text-snow backdrop-blur"><Maximize2 aria-hidden className="size-4" /></span>
        </button>
      )}
    </div>
  )

  if (isPhone) {
    return (
      <div className={`mx-auto w-full max-w-[280px] rounded-[2.4rem] border border-line bg-[#0c0d12] p-2.5 shadow-[0_30px_80px_-40px_rgba(0,0,0,.9)] ${className}`}>
        <div className="overflow-hidden rounded-[1.9rem] border border-white/5">{screen}</div>
      </div>
    )
  }

  const bar =
    shot.frame === 'browser' ? (
      <div className="flex items-center gap-3 border-b border-line bg-[#0d0f15] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-white/10" />)}
        </span>
        <span className="h-5 flex-1 rounded-md bg-white/[.04]" aria-hidden />
      </div>
    ) : shot.frame === 'terminal' ? (
      <div className="flex items-center gap-2 border-b border-line bg-[#0b0c10] px-4 py-2 font-mono text-[11px] text-mist">
        <span className="flex gap-1.5" aria-hidden>{[0, 1, 2].map((i) => <span key={i} className="size-2 rounded-full bg-white/10" />)}</span>
        <span className="ml-2">terminal</span>
      </div>
    ) : shot.frame === 'dashboard' ? (
      <div className="h-1 bg-gradient-to-r from-volt/60 via-volt/10 to-transparent" aria-hidden />
    ) : null

  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-coal shadow-[0_40px_100px_-50px_rgba(0,0,0,.9)] ${className}`}>
      {bar}
      {screen}
    </div>
  )
}
