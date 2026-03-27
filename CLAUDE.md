# CLAUDE.md — Coding instructions for Soulbis

This file gives you, as an AI coding assistant, the full context needed to work on the Soulbis codebase without breaking its architecture or visual language. Read this before touching any file.

---

## What Soulbis is

Soulbis is the **Swordsman layer** of the 0xagentprivacy dual-agent architecture. It ships tools — plugins, enforcement mechanisms, open-source code — that make the privacy guarantees defined in [agentprivacy.ai](https://agentprivacy.ai) real at the boundary.

The site is the Swordsman's surface. Everything visible is an expression of the protocol.

**The master inscription:** `(⚔️ ⊥ ⿻ ⊥ 🧙) 😊`

The gap between ⚔️ and 🧙 is the proof of personhood. Soulbis guards that gap.

---

## Architectural framing you must preserve

### The dual-agent color system

This is not decoration. Every color carries architectural meaning:

| Token | Value | Meaning | Apply to |
|---|---|---|---|
| `--coral` | `#e8523a` | Swordsman — boundary, enforcement, tools | Soulbis nodes, BGIN AI, section labels, hero eyebrow |
| `--cyan` | `#4dd9e8` | Mage — gestalt, agents, knowledge | agentprivacy, spellweb, Soulbae nodes |
| `--white` | `#f0eee8` | Neutral — between both | Body text, neutral nodes |
| `--navy` | `#080c20` | The gap | Background |

**Rule:** Never assign coral to a Mage-side element. Never assign cyan to a Swordsman-side element. When adding a new ecosystem node, decide first which side of the architecture it represents, then apply the color accordingly.

### The three typography registers

```
Cormorant Garamond  →  Display, titles, philosophical text, names
DM Sans             →  Body copy, descriptions, readable prose  
JetBrains Mono      →  Labels, specs, status, metadata, technical strings
```

Never mix registers arbitrarily. JetBrains Mono is for anything that reads as a signal or a tag — not for paragraphs. Cormorant is for anything that carries weight or identity — not for UI chrome.

### The wave field

The animated canvas wave is not a background effect. It is the visual representation of the information-theoretic field — the boundary across which the Swordsman and Mage operate. The coral-to-cyan color gradient across the wave encodes this directly.

- Do not replace the wave with a static image or CSS gradient
- Do not remove the wave from hero, divider, or footer positions
- The dual-sphere in the footer (cyan + coral overlapping) is the Soulbis logo in motion — preserve it

---

## Component conventions

### EcosystemNode

Each node must declare its `colorVariant`:

```typescript
type ColorVariant = 'red' | 'cyan' | 'neutral'

interface EcosystemNodeProps {
  glyph: string
  role: string
  name: string
  desc: string
  href: string
  colorVariant: ColorVariant
  isActive?: boolean
}
```

The `colorVariant` drives both the `node-role` and `node-name` text color. Never hardcode colors inline — use the variant classes: `node-role--red`, `node-role--cyan`, `node-name--red`, `node-name--cyan`.

**Current node assignments:**

| Node | Variant |
|---|---|
| Soulbis | `red` |
| agentprivacy | `cyan` |
| spellweb | `cyan` |
| Soul Sync | `neutral` |
| BGIN AI | `red` |
| Soulbae | `cyan` |

### ToolCard

Status variants:

```typescript
type ToolStatus = 'available' | 'building' | 'planned'
```

- `available` → cyan dot, pulse animation
- `building` → coral dot, pulse animation  
- `planned` → ghost/dim dot, no animation, card gets `opacity: 0.35`

### Built inventory

The `built.data.ts` file owns all built-item content. Categories are: `Protocol`, `Personas`, `Agents`, `Tools`, `Writing`. Do not add categories without considering where the item sits in the Swordsman/Mage framing.

---

## Content rules

### Inscriptions and proverbs

The master inscription `(⚔️ ⊥ ⿻ ⊥ 🧙) 😊` must appear verbatim in the Philosophy strip. Do not paraphrase or simplify it.

Proverbs used on the site come from the Five Grimoires corpus. Do not invent new proverbs — source them from `agentprivacy-docs` or ask. The current proverb in the Philosophy strip:

> "The Swordsman guards the gap. The gap is the proof."

The donation section quote:

> "The right people arrive, the right thing happens, the right moment opens, and the right ending closes — trust the pattern, for it trusts you."

### Attribution

The site is attributed to `privacymage / 0xagentprivacy`, not to any institutional name. Never change the attribution to a legal name or organisation.

### Tool descriptions

When writing tool descriptions:
- State what the tool does in one sentence
- State the architectural significance (which side of the gap it enforces)
- Never use the word "solution" or "platform"
- Prefer: boundary, bilateral, first-person, commitment, enforcement, guard, gap

---

## What not to do

- Do not add a hero image or illustration that replaces the wave canvas
- Do not add a testimonials or social proof section
- Do not add a pricing section (Soulbis does not sell plans)
- Do not change the footer attribution from `privacymage / 0xagentprivacy`
- Do not add cookie consent banners (Soulbis does not track)
- Do not add a hamburger menu that opens a full-screen overlay on mobile — use a simple stacked layout
- Do not change the ZEC button label — "ZEC shielded spellbook (private)" is intentional
- Do not add gradients to backgrounds — the navy is flat, depth comes from borders and the wave

---

## Adding new tools

When a new Soulbis tool is ready to list:

1. Add a new entry to `components/tools/tools.data.ts`
2. Assign `status: 'available' | 'building' | 'planned'`
3. Decide if it is Swordsman-side (boundary enforcement) or supporting infrastructure
4. Write a description following the content rules above
5. Add the corresponding entry to the `Built` inventory under the correct category
6. If it has a GitHub repo, link it in the built entry

---

## Adding new ecosystem nodes

When a new node enters the ecosystem:

1. Add to `components/ecosystem/ecosystem.data.ts`
2. Assign `colorVariant` based on which side of the architecture it represents
3. Choose an appropriate glyph (single emoji, visible at 18px)
4. Update the section heading if the count changes ("Four nodes / One architecture" → adjust)
5. The grid is `repeat(3, 1fr)` — 6 nodes = 2 rows of 3, which is the intended layout

---

## Relationship to agentprivacy-spellbook

Do not import from or create dependencies on `agentprivacy-spellbook`. They are sibling repos. If shared types are needed, define them independently in `lib/types.ts` and keep them in sync manually — the separation is intentional.

---

## Deployment

```bash
# Production build check
npm run build

# Type check
npm run type-check

# Deploy (Vercel auto-deploys on push to main)
git push origin main
```

Vercel project name: `soulbis`  
Production domain: `soulbis.com`  
Linked org: same Vercel org as `agentprivacy-spellbook`

---

## Contact

`mage@agentprivacy.ai` — privacymage / 0xagentprivacy
