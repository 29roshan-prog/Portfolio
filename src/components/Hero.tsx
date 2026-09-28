import { motion, useReducedMotion } from 'motion/react'
import { site } from '../data/site'
import { useSectionNav } from '../lib/nav'

const nodes = [
  { label: 'Python', x: 60, y: 70 },
  { label: 'LLM agents', x: 330, y: 44 },
  { label: 'APIs', x: 402, y: 205 },
  { label: 'Vector DB', x: 380, y: 400 },
  { label: 'Voice / SIP', x: 120, y: 462 },
  { label: 'ESP32', x: 18, y: 290 },
]
const HUB = { x: 240, y: 258 }

function SystemMark() {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 500 520" className="h-auto w-full" role="img" aria-label="Monogram RP surrounded by the building blocks of Roshan's work: Python, LLM agents, APIs, vector databases, voice telephony and ESP32 hardware">
      <defs>
        <linearGradient id="mono" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3F4F7" stopOpacity=".9" />
          <stop offset="1" stopColor="#39FF14" stopOpacity=".35" />
        </linearGradient>
        <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <text x="250" y="330" textAnchor="middle" fontSize="250" fontWeight="600" letterSpacing="-2" fill="none" stroke="url(#mono)" strokeWidth="1.2" fontFamily="Geist Variable, Geist, ui-sans-serif, system-ui">RP</text>

      {nodes.map((n, i) => {
        const cx = n.x + 44
        const cy = n.y + 16
        const d = `M ${cx} ${cy} Q ${(cx + HUB.x) / 2 + (i % 2 ? 30 : -30)} ${(cy + HUB.y) / 2} ${HUB.x} ${HUB.y}`
        return (
          <g key={n.label}>
            <path id={`p${i}`} d={d} fill="none" stroke="#39FF14" strokeOpacity=".28" strokeWidth="1" strokeDasharray="3 5" />
            {!reduce && (
              <circle r="2.6" fill="#39FF14" filter="url(#glow)">
                <animateMotion dur={`${3.2 + i * 0.55}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" keyPoints={i % 2 ? '1;0' : '0;1'} keyTimes="0;1" calcMode="linear">
                  <mpath href={`#p${i}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        )
      })}

      <rect x={HUB.x - 7} y={HUB.y - 7} width="14" height="14" rx="3" fill="#020302" stroke="#39FF14" strokeWidth="1.5" filter="url(#glow)" />

      {nodes.map((n, i) => (
        <motion.g key={n.label} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}>
          <rect x={n.x} y={n.y} width="88" height="32" rx="9" fill="#0A0C0A" stroke="#1D231D" />
          <text x={n.x + 44} y={n.y + 20.5} textAnchor="middle" fontSize="12" fill="#C3CAC3" fontFamily="Geist Variable, Geist, ui-sans-serif, system-ui">{n.label}</text>
        </motion.g>
      ))}
    </svg>
  )
}

export function Hero() {
  const goTo = useSectionNav()
  const reduce = useReducedMotion()
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } })

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
        <div>
          <motion.div {...rise(0)} className="flex flex-wrap items-center gap-3">
            <p className="neon-text text-xs font-medium tracking-[0.18em] text-volt">AI ENGINEER / FULL-STACK DEVELOPER</p>
            {site.availability.show && (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-fog">
                <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />{site.availability.label}
              </span>
            )}
          </motion.div>
          <motion.h1 {...rise(0.08)} className="balance mt-6 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.6rem]">
            I Build Intelligent Products That Solve Real Problems.
          </motion.h1>
          <motion.p {...rise(0.18)} className="pretty mt-7 max-w-[34rem] text-lg leading-relaxed text-fog">
            I'm Roshan Prabhu, an AI and software developer working across intelligent applications, voice AI, automation, and full-stack product development. I turn complex ideas into practical, usable software.
          </motion.p>
          <motion.div {...rise(0.26)} className="mt-10 flex flex-wrap gap-3">
            <a href="/#projects" onClick={(e) => { e.preventDefault(); goTo('projects') }} className="inline-flex items-center rounded-full bg-volt px-6 py-3 text-sm font-semibold text-black neon-btn transition-colors hover:bg-[#6bff4f]">
              Explore My Projects
            </a>
            <a href="/#contact" onClick={(e) => { e.preventDefault(); goTo('contact') }} className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-snow transition-colors hover:border-mist/60 hover:bg-white/[.04]">
              Let's Connect
            </a>
          </motion.div>
        </div>
        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: 0.2 }} className="mx-auto w-full max-w-[440px] lg:max-w-none">
          <SystemMark />
        </motion.div>
      </div>
    </section>
  )
}
