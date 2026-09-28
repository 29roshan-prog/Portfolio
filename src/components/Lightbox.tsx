import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'

export interface LightboxItem { src: string; title: string; caption: string }

export function Lightbox({ items, index, onClose, onIndex }: { items: LightboxItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = index !== null

  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex(((index ?? 0) + 1) % items.length)
      if (e.key === 'ArrowLeft') onIndex(((index ?? 0) - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus()
    }
  }, [open, index, items.length, onClose, onIndex])

  const item = index !== null ? items[index] : null

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between gap-4 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="truncate text-xs text-mist">{item.caption}</p>
            </div>
            <div className="flex items-center gap-3">
              {items.length > 1 && <span className="text-xs tabular-nums text-mist">{(index ?? 0) + 1} of {items.length}</span>}
              <button ref={closeRef} onClick={onClose} className="rounded-full border border-line p-2 hover:bg-white/5" aria-label="Close">
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16">
            <motion.img
              key={item.src}
              src={item.src}
              alt={`${item.title} — ${item.caption}`}
              className="max-h-full max-w-full rounded-lg border border-line object-contain"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
            {items.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); onIndex(((index ?? 0) - 1 + items.length) % items.length) }} className="absolute left-2 rounded-full border border-line bg-ink/70 p-2.5 hover:bg-white/5 sm:left-4" aria-label="Previous image">
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onIndex(((index ?? 0) + 1) % items.length) }} className="absolute right-2 rounded-full border border-line bg-ink/70 p-2.5 hover:bg-white/5 sm:right-4" aria-label="Next image">
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
