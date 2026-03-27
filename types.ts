// lib/types.ts
// Shared TypeScript interfaces for the Soulbis site.
// The dual-agent architecture is encoded in ColorVariant — read CLAUDE.md before adding types.

export type ColorVariant = 'red' | 'cyan' | 'neutral'

export type ToolStatus = 'available' | 'building' | 'planned'

export interface EcosystemNodeData {
  glyph: string
  role: string
  name: string
  desc: string
  href: string
  colorVariant: ColorVariant
  isActive?: boolean
  isExternal?: boolean
}

export interface ToolData {
  status: ToolStatus
  subcategory?: string
  name: string
  spec: string
  desc: string
  actionLabel?: string
  actionHref?: string
}

export type BuiltCategory = 'Protocol' | 'Personas' | 'Agents' | 'Tools' | 'Writing'

export interface BuiltItem {
  name: string
  desc: string
  meta: string
  href: string
  fullWidth?: boolean
}

export interface BuiltRow {
  category: BuiltCategory
  items: BuiltItem[]
}
