# Soulbis

**The Swordsman builds.**

Soulbis is the enforcement layer of the [0xagentprivacy](https://agentprivacy.ai) architecture. Where agentprivacy.ai holds the gestalt — the Mage, the protocol, the Five Grimoires — Soulbis ships the tools that make privacy real at the boundary. Code as commitment.

→ [agentprivacy.ai](https://agentprivacy.ai) · [spellweb.ai](https://spellweb.ai) · [sync.soulbis.com](https://sync.soulbis.com) · [bgin.ai](https://bgin.ai)

---

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Consistent with agentprivacy-spellbook |
| Language | TypeScript | Type safety across agent interfaces |
| Styling | Tailwind CSS + CSS variables | Token system maps to the dual-agent color semantics |
| Animation | Canvas API (native) | Wave field renderer, no dependencies |
| Fonts | Cormorant Garamond · DM Sans · JetBrains Mono | Display · Body · Technical labels |
| Deploy | Vercel | Zero-config, edge-ready |

---

## Dual-agent color system

The visual language is not decorative — it encodes the architecture:

| Color | Hex | Meaning | Nodes |
|---|---|---|---|
| Coral / Red | `#e8523a` | Swordsman — tools, enforcement, boundary | Soulbis, BGIN AI |
| Cyan | `#4dd9e8` | Mage — gestalt, agents, knowledge | agentprivacy, spellweb, Soulbae |
| White / Neutral | `#f0eee8` | Between both | Soul Sync, Research Letters |
| Navy | `#080c20` | The gap itself | Background |

This system must be preserved. Every new component should declare which side of the architecture it represents and use the corresponding color token.

---

## Project structure

```
soulbis/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, cursor
│   ├── page.tsx            # Single-page composition
│   └── globals.css         # CSS custom properties / token system
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx         # Fixed nav — logo, links, CTA
│   │   └── Footer.tsx      # Wave canvas footer + attribution
│   │
│   ├── canvas/
│   │   ├── WaveField.tsx   # Animated wave renderer (hero + divider + footer)
│   │   └── useWaveField.ts # Canvas animation hook
│   │
│   ├── ecosystem/
│   │   ├── EcosystemGrid.tsx     # 3×2 node grid
│   │   ├── EcosystemNode.tsx     # Single node card
│   │   └── ecosystem.data.ts     # Node definitions (name, role, color, href)
│   │
│   ├── tools/
│   │   ├── ToolsGrid.tsx         # 2×2 tool card grid
│   │   ├── ToolCard.tsx          # Single tool card with status dot
│   │   └── tools.data.ts         # Tool definitions
│   │
│   ├── Built.tsx           # Open source inventory (category × items grid)
│   ├── Philosophy.tsx      # Centre-aligned inscription + proverb strip
│   ├── Hero.tsx            # Hero section — title, sub, CTAs
│   └── Donate.tsx          # Donation section — ETH + ZEC buttons
│
├── lib/
│   ├── types.ts            # Shared TypeScript interfaces
│   └── constants.ts        # Site-wide constants (inscription, proverb, etc.)
│
└── public/
    └── fonts/              # Self-hosted Cormorant Garamond if needed
```

---

## Getting started

```bash
# Clone
git clone https://github.com/mitchuski/soulbis
cd soulbis

# Install
npm install

# Dev
npm run dev

# Build
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment

No environment variables required for the base site. If you add contact form or analytics:

```bash
cp .env.example .env.local
```

---

## Relationship to agentprivacy-spellbook

Soulbis and agentprivacy-spellbook are **sibling repositories**, not nested. They share:
- The same Vercel organisation
- The same color token semantics (coral = Swordsman, cyan = Mage)
- The same font stack

They do not share code. Each is a standalone Next.js app. The connection is semantic, not technical.

---

## Attribution

Built by [privacymage](https://x.com/privacymage) / 0xagentprivacy.  
Part of the 8-year [agentprivacy](https://agentprivacy.ai) project.  
`mage@agentprivacy.ai`
