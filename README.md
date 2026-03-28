# Soulbis

**The Swordsman builds.**

Soulbis is the enforcement layer of the [0xagentprivacy](https://agentprivacy.ai) architecture. Where agentprivacy.ai holds the gestalt — the Mage, the protocol, the Five Grimoires — Soulbis ships the tools that make privacy real at the boundary. Code as commitment.

→ [agentprivacy.ai](https://agentprivacy.ai) · [spellweb.ai](https://spellweb.ai) · [sync.soulbis.com](https://sync.soulbis.com) · [bgin.ai](https://bgin.ai)

---

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Surface | Static `index.html` at repo root | Single shipped document; styles and scripts are inline or adjacent assets |
| Styling | CSS variables in `<style>` | Token system maps to the dual-agent color semantics (see CLAUDE.md) |
| Animation | Canvas API (native) | Wave field renderer in page scripts |
| Fonts | Google Fonts (Cormorant · DM Sans · JetBrains Mono) | Display · Body · Technical labels |
| Local preview | `serve` | `npm run dev` serves the repo root only — no app server |
| Deploy | Vercel (`framework: null`) | Static output; see `vercel.json` |

---

## Dual-agent color system

The visual language is not decorative — it encodes the architecture:

| Color | Hex | Meaning | Nodes |
|---|---|---|---|
| Coral / Red | `#e8523a` | Swordsman — tools, enforcement, boundary | Soulbis, BGIN AI |
| Cyan | `#4dd9e8` | Mage — gestalt, agents, knowledge | agentprivacy, spellweb, Soulbae |
| White / Neutral | `#f0eee8` | Between both | Soul Sync, Research Letters |
| Navy | `#080c20` | The gap itself | Background |

This system must be preserved. Every new section or node should declare which side of the architecture it represents and use the corresponding color token / modifier class.

---

## Project structure

```
soulbis/
├── index.html          # Canonical site — all sections, <style>, and inline scripts
├── public/             # Images and static assets (paths referenced from index.html)
├── scripts/
│   └── verify-static.cjs   # Used by npm run build (CI sanity check)
├── vercel.json         # Static deploy — framework preset disabled
└── package.json        # devDependencies: serve only
```

---

## Getting started

```bash
# Clone
git clone https://github.com/mitchuski/soulbis
cd soulbis

# Install
npm install

# Dev (static site — repo root)
npm run dev

# Sanity check (index.html present)
npm run build
```

Open [http://localhost:8000](http://localhost:8000).

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

They do not share code. Soulbis ships as static HTML; the connection is semantic, not technical.

---

## Attribution

Built by [privacymage](https://x.com/privacymage) / 0xagentprivacy.  
Part of the 8-year [agentprivacy](https://agentprivacy.ai) project.  
`mage@agentprivacy.ai`
