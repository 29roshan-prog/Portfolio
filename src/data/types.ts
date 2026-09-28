export type FilterKey = 'ai-ml' | 'voice' | 'fullstack' | 'enterprise' | 'iot-research'

/** How the work was done — shown on every card so professional, client and personal work never blur together. */
export type WorkContext = 'personal' | 'academic' | 'professional' | 'client' | 'review'

export type FrameKind = 'browser' | 'phone' | 'dashboard' | 'terminal' | 'plain'

export interface Shot {
  /** File name (no extension) inside src/assets/projects/<slug>/. Drop a .png/.jpg/.webp with this name and it appears automatically. */
  id: string
  title: string
  caption: string
  frame: FrameKind
  /** CSS aspect-ratio of the real screenshot, e.g. "16 / 10" or "9 / 19.5" */
  aspect: string
  /** Annotation bullets shown beside the screenshot in the case study */
  notes?: string[]
}

export interface Tech {
  name: string
  /** true = mentioned in project notes but not yet confirmed from source code */
  verify?: boolean
}

export type NodeKind = 'input' | 'process' | 'model' | 'rule' | 'store' | 'output'
export interface FlowNode {
  label: string
  detail?: string
  kind: NodeKind
}
export interface Flow {
  title: string
  caption?: string
  /** A nested array is a parallel stage (rendered stacked) */
  steps: (FlowNode | FlowNode[])[]
}

export interface Project {
  slug: string
  name: string
  tagline: string
  category: string
  filters: FilterKey[]
  context: WorkContext
  /** Shown beside the context badge, e.g. "Client project at Skyup Digital Solutions" */
  contextNote?: string
  /** false = hidden everywhere, including its route */
  visible: boolean
  /** true = large alternating showcase on the home page */
  featured: boolean
  order: number
  year?: string

  summary: string
  problem: string
  contribution: string

  overview: string[]
  problemContext: string[]
  objectives: string[]
  role: string[]
  solution: string[]
  flows: Flow[]
  features: { title: string; body: string }[]
  shots: Shot[]
  stack: { group: string; items: Tech[] }[]
  challenges: { title: string; body: string }[]
  /** Verified, measurable outcomes only. Leave empty rather than estimating. */
  results: string[]
  links: { live?: string; repo?: string; other?: { label: string; url: string }[] }
  /** What Roshan still needs to confirm or provide — shown as a review panel while site.draftMode is on */
  pending: string[]
  disclaimer?: string
}
