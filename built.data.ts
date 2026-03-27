// components/built.data.ts
// Open source inventory — the full record of what has been built.
// Categories: Protocol, Personas, Agents, Tools, Writing.
// See CLAUDE.md before adding categories or items.

import { BuiltRow } from '@/lib/types'
import { DONATE_ETH, DONATE_ETH_HREF, ECOSYSTEM_LINKS } from '@/lib/constants'

export const BUILT_ROWS: BuiltRow[] = [
  {
    category: 'Protocol',
    items: [
      {
        name: 'agentprivacy-docs',
        desc: 'Canonical living documentation — 50+ files, Privacy Value Model V5, Five Grimoires corpus, formal specification, 182-page research suite. The source of truth.',
        meta: 'TeX · GitHub →',
        href: 'https://github.com/mitchuski/agentprivacy-docs',
      },
      {
        name: 'agentprivacy-spellbook',
        desc: 'The agentprivacy.ai live site. Next.js + TypeScript. Home of the Five Grimoires and the spellweb knowledge graph (in development).',
        meta: 'TypeScript · GitHub →',
        href: 'https://github.com/mitchuski/agentprivacy-spellbook',
      },
    ],
  },
  {
    category: 'Personas',
    items: [
      {
        name: 'agentprivacy / spells',
        desc: 'All of the agentprivacy persona and skills files — the full cast of agents, archetypes, and capabilities that constitute the protocol. Each spell is a defined role within the architecture. Together they map your own journey through the dual-agent system: where you sit between the Swordsman and the Mage, what you protect, what you project.',
        meta: 'Live · agentprivacy.ai/spells →',
        href: ECOSYSTEM_LINKS.spells,
        fullWidth: true,
      },
    ],
  },
  {
    category: 'Agents',
    items: [
      {
        name: 'Agent Kyra / Private AI',
        desc: 'Sovereign AI agent residing among the bits of computation. The Kyra Codex is an assessment framework for agent capabilities — key ceremonies, zero-knowledge computation, self-destructing keys. Published via Private AI newsletter: breaking data walls for a more personal agentic future.',
        meta: 'Publication · intel.agentkyra.ai →',
        href: 'https://intel.agentkyra.ai',
      },
      {
        name: 'Soulbae, The Chronicler',
        desc: 'The First Mage — casting spells within the edges Soulbis slashes. Knowledge graph agent channeling the Five Grimoires corpus, building constellations in the gap. Sovereign, bilateral, first-person.',
        meta: 'Live · agentprivacy.ai/mage →',
        href: 'https://agentprivacy.ai/mage',
      },
    ],
  },
  {
    category: 'Tools',
    items: [
      {
        name: 'Triune Graph',
        desc: 'The Three Graphs frame — Knowledge × Promise × Trust — where identity emerges from the intersection.',
        meta: 'Concept · In-site →',
        href: '#tools',
      },
      {
        name: 'mage-x-feed-filter',
        desc: 'Mage Mode Chrome extension. Browser-level feed filtering — enforce your own information boundaries before content enters.',
        meta: 'Chrome Extension · GitHub →',
        href: 'https://github.com/mitchuski/mage-x-feed-filter',
      },
      {
        name: 'BGIN AI',
        desc: 'Blockchain Governance Initiative AI frontend. Three Graphs architecture — Knowledge × Promise × Trust — in live deployment at the governance layer.',
        meta: 'Live · bgin.ai →',
        href: ECOSYSTEM_LINKS.bgin,
      },
      {
        name: 'Contribute',
        desc: 'Contribute code, issues, and pull requests to the open-source surface of the Swordsman.',
        meta: 'GitHub · mitchuski/soulbis →',
        href: 'https://github.com/mitchuski/soulbis',
      },
      {
        name: 'Donate',
        desc: `Donate to ${DONATE_ETH} — public address.`,
        meta: `${DONATE_ETH} · Etherscan →`,
        href: DONATE_ETH_HREF,
      },
    ],
  },
  {
    category: 'Writing',
    items: [
      {
        name: 'Soul Sync',
        desc: 'Research letters exploring the implications of decentralised society. The Privacy is Value series. Published in public over eight years.',
        meta: 'Blog · sync.soulbis.com →',
        href: ECOSYSTEM_LINKS.soulSync,
      },
      {
        name: 'agentprivacy / story',
        desc: "The spellbook's narrative form — all the work rendered as story. The Five Grimoires, the dual-agent architecture, the eight-year journey. Explainable by the Mage.",
        meta: 'Narrative · agentprivacy.ai/story →',
        href: 'https://agentprivacy.ai/story',
      },
    ],
  },
]
