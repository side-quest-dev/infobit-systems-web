// ── Icon types ───────────────────────────────────────────────────────────────

export type IconName =
  | 'trending-up'
  | 'archive'
  | 'alert-circle'
  | 'layers'
  | 'zap'
  | 'users'
  | 'cpu'
  | 'cloud'
  | 'activity'
  | 'monitor'
  | 'credit-card'
  | 'building'
  | 'database'
  | 'shopping-cart'
  | 'dollar-sign'
  | 'shield'
  | 'clock'
  | 'message'
  | 'check'
  | 'arrow-right'

// ── Site content types ───────────────────────────────────────────────────────

export interface ProcessStep {
  n: string
  title: string
  desc: string
}

export interface Value {
  icon: IconName
  title: string
  desc: string
}

export interface ExperienceEntry {
  title: string
  desc: string
}

export interface ContactSignal {
  icon: IconName
  title: string
  desc: string
}

export interface Metric {
  value: string
  label: string
}

export interface NavItem {
  label: string
  href: string
}

export interface Service {
  slug: string
  title: string
  shortDesc: string
  description: string
  icon: IconName
  color: 'blue' | 'teal'
  highlights: string[]
  manifesto: string
  when: string[]
}

export interface Problem {
  q: string
  a: string
  icon: IconName
}

export interface Industry {
  title: string
  desc: string
  icon: IconName
}

export interface Engagement {
  badge: string
  title: string
  desc: string
  items: string[]
}

export interface FaqItem {
  q: string
  a: string
}

// ── Diagram types ────────────────────────────────────────────────────────────

export interface DiagramNode {
  label: string
  sub?: string
  color: string
  x: number
  y: number
  r?: number
}

export interface DiagramEdge {
  from: number
  to: number
  label?: string
}

// ── Form types ───────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  company?: string
  engagement?: string
  scale?: string
  message: string
}

export type FormStatus = 'idle' | 'sending' | 'success' | 'error'

// ── Analytics ─────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}
