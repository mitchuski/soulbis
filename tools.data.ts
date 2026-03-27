// components/tools/tools.data.ts
// Source of truth for all Soulbis tools.
// Status drives the visual treatment — see ToolCard.tsx and CLAUDE.md.

import { ToolData } from '@/lib/types'
import { SEPARATION_BOUND } from '@/lib/constants'

export const TOOLS: ToolData[] = [
  {
    status: 'building',
    subcategory: 'Blades',
    name: 'MyTerms Plugin',
    spec: 'IEEE 7012 · Machine-readable · Bilateral',
    desc: 'Forged to slash surveillance and claim the 7th capital for yourself.',
    actionLabel: 'Notify me on release',
    actionHref: 'mailto:mage@agentprivacy.ai?subject=MyTerms Plugin',
  },
  {
    status: 'available',
    name: 'Mage Mode',
    spec: 'Chrome Extension · Feed Filter · Open Source',
    desc: 'Browser-level feed filtering. Enforce your own information boundaries in the browser. The Swordsman guards what enters; the Mage decides what matters.',
    actionLabel: 'View on GitHub',
    actionHref: 'https://github.com/mitchuski/mage-x-feed-filter',
  },
  {
    status: 'planned',
    name: 'Separation Bound',
    spec: `${SEPARATION_BOUND} · Formal verification`,
    desc: 'A verifiable implementation of the dual-agent separation bound. Privacy guarantees that are mathematically auditable, not policy-dependent.',
  },
  {
    status: 'available',
    name: 'BGIN AI Frontend',
    spec: 'Three Graphs · Knowledge × Promise × Trust',
    desc: 'Identity emerges from the unique intersection of Knowledge, Promise, and Trust graphs. Live reference implementation at the governance layer.',
    actionLabel: 'Visit bgin.ai',
    actionHref: 'https://bgin.ai',
  },
]
