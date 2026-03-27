// components/ecosystem/ecosystem.data.ts
// Source of truth for all ecosystem nodes.
// ColorVariant encodes the dual-agent architecture — see CLAUDE.md before editing.

import { EcosystemNodeData } from '@/lib/types'
import { ECOSYSTEM_LINKS } from '@/lib/constants'

export const ECOSYSTEM_NODES: EcosystemNodeData[] = [
  {
    glyph: '⚔️',
    role: 'Soulbis',
    name: 'The Blade',
    desc: 'Tools, plugins, and enforcement infrastructure. Where the protocol becomes code.',
    href: ECOSYSTEM_LINKS.soulbis,
    colorVariant: 'red',
    isActive: true,
  },
  {
    glyph: '🔮',
    role: 'agentprivacy',
    name: 'The Spell',
    desc: 'The 0xagentprivacy gestalt. Eight years in the making — a dual-agent privacy protocol, Privacy Value Model V5, Five Grimoires (114+ inscriptions, 29K+ lines), a 182-page research suite, and a living documentation corpus of 50+ files. Privacy as the seventh capital. Built in public.',
    href: ECOSYSTEM_LINKS.agentprivacy,
    colorVariant: 'cyan',
    isExternal: true,
  },
  {
    glyph: '🕸️',
    role: 'spellweb',
    name: 'The Corpus',
    desc: 'Interactive knowledge graph of the full Five Grimoires. 114+ inscriptions made navigable.',
    href: ECOSYSTEM_LINKS.spellweb,
    colorVariant: 'cyan',
    isExternal: true,
  },
  {
    glyph: '🔗',
    role: 'Soul Sync',
    name: 'Research Letters',
    desc: 'Exploring the implications of decentralised society. Privacy is Value. Published in public.',
    href: ECOSYSTEM_LINKS.soulSync,
    colorVariant: 'neutral',
    isExternal: true,
  },
  {
    glyph: '⛓️',
    role: 'BGIN AI',
    name: 'The Network',
    desc: 'Reference application. Blockchain Governance Initiative AI — the architecture as a live reference implementation at the governance layer.',
    href: ECOSYSTEM_LINKS.bgin,
    colorVariant: 'red',
    isExternal: true,
  },
  {
    glyph: '🧙',
    role: 'Soulbae',
    name: 'The First Mage',
    desc: 'Knowledge graph agent deployed on Telegram. The Mage in conversation — sovereign, bilateral, first-person.',
    href: ECOSYSTEM_LINKS.soulbae,
    colorVariant: 'cyan',
    isExternal: true,
  },
]
