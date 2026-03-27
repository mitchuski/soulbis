# Chronicle — Soulbis Website Migration
**Date:** 2026-03-27
**Session:** Framer → GitHub Pages migration

---

## What was accomplished

### 1. Project Setup
- Created working directory: `C:\Users\mitch\soulbis website`
- User provided reference files from Framer export and Next.js architecture docs
- Reviewed `CLAUDE.md` (coding instructions), `README.md`, and data files

### 2. Index.html Reconstruction
The Framer-exported `index.html` was **truncated** — missing the footer animation completion and closing tags. Created a complete, clean static HTML file with:

**Fixes applied:**
- Removed Cloudflare email protection scripts (`/cdn-cgi/scripts/...`)
- Converted obfuscated emails to direct `mailto:` links
- Fixed duplicate `</section>` tag (was at line 1002)
- Completed truncated footer JavaScript (wave animation + dual-sphere logo draw)
- Added touch device support (hides custom cursor on mobile/tablet)
- Added meta description for SEO
- Corrected ecosystem section title: "Four nodes" → "Six nodes" (matching actual count)

**Features preserved:**
- Animated wave field canvas (coral → cyan gradient) — hero, mid-divider, footer
- Dual-agent color system per CLAUDE.md (coral = Swordsman, cyan = Mage, navy = gap)
- Custom cursor with ring follower
- Typography: Cormorant Garamond (display), DM Sans (body), JetBrains Mono (code/labels)
- All sections: Hero, Ecosystem (6 nodes), Built inventory, Tools (4 cards), Philosophy strip, Donate, Footer
- Responsive breakpoints at 900px and 600px
- ZEC shielded address copy-to-clipboard functionality

### 3. GitHub Deployment
- Initialized git repo in working directory
- Pushed to: **https://github.com/mitchuski/soulbis**
- Branch: `main`
- GitHub Pages deployment instructions provided (Settings → Pages → main branch)
- Live URL: **https://mitchuski.github.io/soulbis/**

### 4. Local Development
- Python HTTP server running on **port 8000**
- Command: `python -m http.server 8000`
- Working directory: `C:\Users\mitch\soulbis website`

---

## File inventory

| File | Purpose |
|------|---------|
| `index.html` | **Production file** — complete static site, GitHub Pages ready |
| `CLAUDE.md` | Coding instructions — design system, color semantics, rules |
| `README.md` | Project documentation — stack, structure, deployment |
| `globals.css` | Reference — Tailwind + CSS variables (not used in static build) |
| `ecosystem.data.ts` | Reference — node definitions |
| `tools.data.ts` | Reference — tool card definitions |
| `built.data.ts` | Reference — open source inventory |
| `constants.ts` | Reference — site constants |
| `types.ts` | Reference — TypeScript interfaces |
| `*.tsx` | Reference — React component patterns |
| `package.json` | Reference — Next.js dependencies (not used in static build) |
| `index (1).html` | Backup — original truncated export |

---

## Design system reference

### Colors (CSS variables in `:root`)
```css
--navy: #080c20        /* Background — the gap */
--navy-mid: #0d1230    /* Section backgrounds */
--navy-light: #141a3d  /* Hover states */
--coral: #e8523a       /* Swordsman — tools, enforcement, boundary */
--cyan: #4dd9e8        /* Mage — gestalt, agents, knowledge */
--white: #f0eee8       /* Neutral text */
```

### Node color assignments
| Node | Variant | Meaning |
|------|---------|---------|
| Soulbis | `red` | Swordsman — The Blade |
| agentprivacy | `cyan` | Mage — The Spell |
| spellweb | `cyan` | Mage — The Corpus |
| Soul Sync | `neutral` | Research Letters |
| BGIN AI | `red` | Swordsman — The Network |
| Soulbae | `cyan` | Mage — The First Mage |

### Typography registers
- **Cormorant Garamond** → Display, titles, philosophical text, names
- **DM Sans** → Body copy, descriptions
- **JetBrains Mono** → Labels, specs, status, metadata, technical strings

---

## Key content (verbatim per CLAUDE.md)

**Master inscription:**
```
(⚔️ ⊥ ⿻ ⊥ 🧙) 😊
```

**Proverb:**
> "The Swordsman guards the gap. The gap is the proof."

**Donation quote:**
> "The right people arrive, the right thing happens, the right moment opens, and the right ending closes — trust the pattern, for it trusts you."

**Attribution:** `privacymage / 0xagentprivacy`

---

## What's next / TODO

1. **Verify GitHub Pages deployment** — check https://mitchuski.github.io/soulbis/
2. **Custom domain** — if soulbis.com DNS needs pointing to GitHub Pages
3. **Content updates** — user mentioned "connection to agentprivacy as the swordsman" — may need copy refinements
4. **Favicon** — not yet added (could add dual-sphere SVG as favicon)
5. **Open Graph meta tags** — for social sharing previews

---

## Commands for next session

```bash
# Navigate to project
cd "C:\Users\mitch\soulbis website"

# Start local server
python -m http.server 8000

# Check git status
git status

# Push changes after edits
git add index.html && git commit -m "Update: description" && git push
```

---

## Links

- **Repo:** https://github.com/mitchuski/soulbis
- **Live site:** https://mitchuski.github.io/soulbis/
- **Local dev:** http://localhost:8000
- **Framer source:** https://irresistible-functions-515428-a4d15b43c.framer.app/
- **Related:** https://agentprivacy.ai · https://spellweb.ai · https://bgin.ai

---

*Chronicle written 2026-03-27 for agent handoff.*
