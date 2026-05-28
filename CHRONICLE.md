# Chronicle — Soulbis Website

---

## 2026-05-27 — `/star` + `/lattice` integration (Swordsman's Key system)

> Full write-up — including the suite-wide Soulbis Swordsman Protocol and the redesign sketch — in **[`CHRONICLE_SWORDSMAN_KEY_2026-05-27.md`](./CHRONICLE_SWORDSMAN_KEY_2026-05-27.md)**.

Integrated the **star lattice** deliverable (`C:\Users\mitch\star lattice`) into the static site as two new routes. These are the interactive front of the Tetrahedra Forge and the consumer side of the **Swordsman's Key** interop (`swordsmans-key.interop.md`): a portable JSON (`palette` + 64 vertex `descriptions`) authored on the agentprivacy.ai side (`/guide/achievements`, `/ceremony`) and imported here.

- **`/star`** — the Star-Tetrahedron Manifold (3D). Used the Vite production `dist/` (three.js bundled locally in `star/assets/index-CyCaOCmH.js` — no CDN dependency). Files at `star/index.html` + `star/assets/`.
- **`/lattice`** — the 64 · Vertex Codex (`dist/codex.html` → `lattice/index.html`). Self-contained, no bundle, no three.js.
- **Asset paths**: the manifold's Vite-relative `./assets/…` were rewritten to absolute `/star/assets/…` so `/star` resolves whether or not a trailing slash is present (Vercel + local `serve`).
- **Live link**: both pages talk over `BroadcastChannel('agentprivacy-succ')` — same-origin, so on soulbis.com `/star`'s succ marker lights the matching cell in `/lattice` and an imported key recolours both. Each page also has **Import / Export** of `swordsmans-key.json`.
- **Homepage wiring**: added **Star** + **Lattice** nav links; the **Tetrahedra Forge** tool card now opens the manifold and the codex live, with copy noting the Swordsman's Key bridge.
- Cosmetic: manifold `<title>` `star.soulbis.com` → `soulbis.com/star`.

**Verified locally** (`serve` on :8000): `/`, `/star/`, `/star`, `/star/assets/index-CyCaOCmH.js`, `/lattice/`, `/lattice` all HTTP 200; titles correct; nav links present.

**Open design thread (not built):** redesigning Soulbis as a practical *Swordsman key system* with deeper overlap to `agentprivacy.ai/ceremony` (key forge — ed25519 keypair, agent card, key-burn) and `/guide/achievements` (loadout/tier display). The Swordsman's Key JSON is the cross-origin bridge (localStorage is per-origin, so a portable key — not a live link — is the right seam). To be scoped with the user.

---

## 2026-05-27 — Sync pass (project state catch-up)

The site was a 2026-03-29 snapshot; the project had moved on substantially (City of Mages, new agentprivacy.ai routes, grimoire v10.2.0 / v1.7.1, eight Tomes). Content-only sync — no structural or design-system changes; all rules in `CLAUDE.md` preserved.

**Changes to `index.html`:**
- **Metadata** — `og:url` / `og:image` / `twitter:image` repointed from the `mitchuski.github.io/soulbis/` mirror to canonical `https://soulbis.com/`.
- **Ecosystem** — heading "Six nodes" → "Seven nodes". Added **City of Mages** as a `neutral` (between-both) node: glyph 🏙️, role "City of Mages", name "The Convergence", links `agentprivacy.ai/guide`. Refreshed `agentprivacy` node (PVM V5.4, master grimoire = 5 spellbooks / 42 personas, eight Tomes) and `spellweb` node (corpus/conjecture language). spellweb.ai kept as the standalone node URL.
- **Built inventory** — refreshed `agentprivacy-docs` and `agentprivacy-spellbook` descriptions (Next.js 16 / React 19, model, Tomes, live spellweb); added `cityofmages` public repo under Protocol.
- **Philosophy strip** — "Privacy Value Model V5" → "V5.4".
- **Tools** — unchanged this pass; MyTerms Blade deliberately kept "In development" (bundle exists locally, not yet publicly released).

**Decisions (user-confirmed):** City of Mages = new node + built item; node colour = neutral; MyTerms stays in-dev; spellweb.ai retained.

**Build:** `npm run build` (verify-static) OK; `npm run dev` serves at `http://localhost:8000`.

**Deferred:** `soulbis.com/star` — the 3D manifold page. Not started this pass; awaiting the model code from the user.

**Also updated:** `CLAUDE.md` node table (+ City of Mages neutral) and the grid-count note.

---

## 2026-03-27 — Framer → GitHub Pages migration

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

**Assets added (session 2):**
- `soulbisholo.jpg` — Hero holographic artwork with floating animation
- `COMBUSTION.png` — Favicon (transparent background)
- `og-image.jpg` — Twitter/Open Graph social preview image
- Open Graph + Twitter Card meta tags for social sharing

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
| `public/images/soulbisholo.jpg` | **Hero art** — holographic dual-agent visualization (cyan/coral) |
| `public/images/COMBUSTION.png` | **Favicon** — transparent background version of holo art |
| `public/images/og-image.jpg` | **Social preview** — Twitter/OG banner image |
| `public/images/Rectangle 1.png` | Supporting asset |
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
