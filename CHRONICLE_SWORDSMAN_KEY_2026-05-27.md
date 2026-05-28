# Chronicle — The Soulbis Swordsman Protocol & the Swordsman's Key

**Date:** 2026-05-27
**Repo:** `soulbis website/` (static — `soulbis.com`)
**Scope:** Integration of `/star` + `/lattice` into the root site, and the protocol seam that threads the **Swordsman's Key** across every domain in the 0xagentprivacy suite.

> **The master inscription:** `(⚔️ ⊥ ⿻ ⊥ 🧙) 😊`
> The gap between ⚔️ and 🧙 is the proof of personhood. Soulbis guards that gap — and now it *carries* it, as a key.

---

## 0. One-line thesis

Soulbis is the **Swordsman layer**: it does not forge identity (that is the Mage's experiential work on `agentprivacy.ai`) — it **verifies, projects, and carries** it. The portable artifact that makes this possible is the **Swordsman's Key**: a small JSON that travels across origins because localStorage cannot. The 64-vertex sovereignty lattice is the shared coordinate system the whole suite agrees on. This session wired the consumer half of that loop onto the root site.

---

## 1. What was integrated this session

The `star lattice` deliverable (`C:\Users\mitch\star lattice`) was integrated into the static site as two new same-origin routes.

| Route | Page | Source | Notes |
|---|---|---|---|
| **`/star`** | Star-Tetrahedron Manifold (3D) | Vite `dist/index.html` + `dist/assets/` | three.js **bundled locally** (`star/assets/index-CyCaOCmH.js`, ~500 KB) — no CDN dependency. Value manifold + 64-vertex `{0,1}⁶` lattice + dual-agent dihedral core, full live console. |
| **`/lattice`** | The 64 · Vertex Codex | Vite `dist/codex.html` → `lattice/index.html` | Self-contained — no bundle, no three.js. The lattice as a navigable grid of 64 sovereignty states. |

**Engineering details**
- **Asset paths:** the manifold's Vite-relative `./assets/…` were rewritten to absolute `/star/assets/…` so the route resolves **with or without a trailing slash** (the sub-path relative-base trap on Vercel and local `serve`).
- **Live link:** both pages communicate over `BroadcastChannel('agentprivacy-succ')`. Same-origin on `soulbis.com`, so `/star`'s succ marker lights the matching cell in `/lattice`, and an imported key recolours both.
- **Import / Export:** each page reads and writes `swordsmans-key.json` (see §3).
- **Homepage wiring:** added **Star** + **Lattice** to the nav; the **Tetrahedra Forge** tool card now opens both live pages, with copy naming the Swordsman's Key bridge.
- **Removed** the Substack embed iframe from the Philosophy strip (visual cleanup).
- **Verified locally** (`serve` on :8000): `/`, `/star/`, `/star`, `/star/assets/index-CyCaOCmH.js`, `/lattice/`, `/lattice` → all HTTP 200.

Routing decision (user-confirmed): **paths** under the main domain (`soulbis.com/star`, `soulbis.com/lattice`) — not a `star.soulbis.com` subdomain. No DNS/extra Vercel project needed.

---

## 2. The Soulbis Swordsman Protocol — across the whole suite

The suite is a single loop that crosses a domain boundary. The Mage side teaches and forges; the Swordsman side verifies, projects, and carries. The **Swordsman's Key** is the object that crosses the boundary.

```
   ┌─────────────────────── agentprivacy.ai (the Mage · gestalt) ───────────────────────┐
   │  Read           Inscribe          Forge                 Display                     │
   │  /story /zero   /evoke /proverbs   /ceremony             /guide/achievements         │
   │  /canon /society                   ed25519 keypair       identity · Drake Orb tier   │
   │  /plurality      proverbs ≤512B    Agent Card            loadout · runecasts         │
   │  + City of Mages (16 workshops, Drake Island) · spellweb.ai graph · Soulbae 🧙       │
   └───────────────────────────────────────────────────────────────┬────────────────────┘
                                                                     │
                                        EXPORT  ⇣  swordsmans-key.json   (the boundary crossing)
                                                                     │
   ┌──────────────────────────────────── soulbis.com (the Swordsman · blade) ────────────┐
   │  Verify             Project                          Carry                           │
   │  /key (proposed)    /star (manifold) · /lattice      the key is the blade you take   │
   │  public key ·       (codex) — your sovereignty       across the web; MyTerms /        │
   │  signature ·        state is a point/vertex; the     swordsman-blade extensions       │
   │  trust tier ·       succ path is your journey        enforce it at each boundary      │
   │  burn / rotate                                       · agentprivacy-zypher (ZEC)      │
   └──────────────────────────────────────────────────────────────────────────────────────┘
                                                                     │
                                        EXPORT  ⇡  (round-trips cleanly back to the Mage side)
```

**Domain roles in the protocol**

| Domain / surface | Role | Side |
|---|---|---|
| `agentprivacy.ai/ceremony` | **Forge** — ed25519 keypair + Agent Card (BGIN-style identity), key-burn → public-key-only | Producer (Mage forges) |
| `agentprivacy.ai/guide/achievements` | **Display** — identity, Drake Orb tier, loadout (sword ring + mage orbit), runecasts | Producer |
| `agentprivacy.ai` spellbooks · City of Mages · `spellweb.ai` · Soulbae | **Teach / earn** — narrative, proverbs, the 16 workshops | Producer |
| **`soulbis.com/star` + `/lattice`** | **Project** — render the key as geometry on the shared lattice | **Consumer (built ✅)** |
| **`soulbis.com/key`** (proposed) | **Verify & carry** — Swordsman-side mirror of the card: verify public key, show tier/posture, burn/rotate | Consumer (to build) |
| MyTerms / swordsman-blade / mages-spell extensions · `agentprivacy-zypher` | **Enforce** — the key honoured at each real boundary (browser, value transfer) | Swordsman tools |
| `sync.soulbis.com` · `bgin.ai` | Research letters · governance reference | Context |

---

## 3. The Swordsman's Key — the artifact that threads it all

**Current schema (v1, already consumed by `/star` + `/lattice`)**

```json
{
  "name": "agentprivacy · achievements key",
  "version": 1,
  "palette": { "cool": "#1f54d6", "warm": "#ff4533", "sword": "#9fe8ff", "mage": "#ffc070" },
  "descriptions": { "0": "…", "1": "…", "63": "…" }
}
```

- `palette.cool → warm` = the surveillance→sovereignty gradient (manifold + lattice cells).
- `palette.sword` = ⚔️ Swordsman gem (`neg` / **protect**); `palette.mage` = 🧙 Mage gem (`bnot` / **project** / antipode).
- `descriptions` keyed by **vertex 0–63** (a `"s0".."s6"` stratum form may be expanded to all 64 on import).
- Reserved (consumers ignore unknown fields): `geometry { coreScale, smRatio }`, where `smRatio` is the Swordsman:Mage ratio (1.0 balanced, φ≈1.618 = conjectured optimal protect:project, **canon C1**).

**Proposed v1 extension — the `identity` block (backward-compatible):**

```json
"identity": {
  "publicKeyHex": "…",
  "trustTier": "blade | light | heavy | dragon",
  "stratum": 0,            // 0..6 — popcount of the current vertex
  "vertex": 0,             // 0..63 — current sovereignty state
  "drakeOrb": { "tier": "…", "walkedAt": "…", "signature": "…" },
  "signature": "…"         // over the card; verifiable against publicKeyHex
}
```

This unifies the two key objects that exist today — the **Agent Card** (`src/lib/ceremony/types.ts`: `publicKeyHex`, `trustTier`, `drakeOrb`, `constellationPath`, `signature`) and the **Swordsman's Key** (palette + descriptions) — into one portable file, without breaking the existing consumers.

---

## 4. The exact seam — Agent Card ↔ lattice vertex

The reason this fits together at all (not by analogy — by construction):

- The lattice is `ℒ = ℤ/64ℤ`, a **6-bit address** across the **six sovereignty dimensions**. `stratum = popcount(vertex)`.
- The ceremony's **moon phase** notation (`src/lib/ceremony/moon-phase.ts`) is exactly this: `🌑` stratum 0 (no dimensions) → `🌕` stratum 6 (all 6 dimensions). `dimensionsActive` = "n of 6".
- Therefore **moon phase = stratum = popcount of the vertex.** A sovereignty posture *is* a lattice vertex.
- `TrustTier → stratum`: blade→1, light→2, heavy→3, dragon→5 (`getTierStratum`).
- The operators line up: ⚔️ Swordsman = `neg` (reflection), 🧙 Mage = `bnot` (antipode), `succ = neg∘bnot` (the comet that visits all 64 and returns to 0).
- The holographic boundary: `∂M` 96 edges encode the 64 vertices — `96/64 = 1.5 = P^1.5`, the privacy exponent.

So `/achievements` can emit each achievement against its vertex (or stratum), and `/star`/`/lattice` render your real account state on the manifold.

---

## 5. Redesign sketch — Soulbis as the Swordsman's keyring

Today the site is a brochure with two live instruments bolted on. The direction is to make the **key the centre of gravity**.

**Information architecture (soulbis.com)**
- `/` — keep the Swordsman identity + ecosystem, but add a **Key panel** to the hero: drop a Swordsman's Key, see it verified and projected. Reframe the hero CTA from "see the tools" → "carry your key."
- `/star` — manifold (done)
- `/lattice` — codex (done)
- `/key` (new) — the keyring: import + verify the Swordsman's Key / Agent Card (public key, trust tier, moon-phase posture, Drake Orb), with burn/rotate guidance that links back to `/ceremony`. The Swordsman-flavoured mirror of `/achievements` — **verification, not earning.**

**What deliberately does NOT move to Soulbis:** the forge and the narrative stay on `agentprivacy.ai` (they are experiential, stateful, Mage-side). Soulbis avoids duplicating ceremony/achievements; it consumes their output.

**Open design decisions (flagged, not resolved):**
1. **Palette reconciliation.** Soulbis canon: Swordsman = coral `#e8523a`, Mage = cyan `#4dd9e8`. Star/lattice ship sword = `#9fe8ff` (cyan-ish), mage = amber `#ffc070`. The Swordsman's Key `palette` should likely map **sword → coral, mage → cyan** to honour the Soulbis colour law — or we accept the instruments as a distinct "tool" aesthetic (Fraunces + Spline Mono on near-black vs. the site's Cormorant + DM Sans + JetBrains Mono on navy). Decide before the producer hard-codes gem colours.
2. **Keying.** Emit **vertex-keyed** (`"0".."63"`) or **stratum-keyed** (`"s0".."s6"`) descriptions from `/achievements`? Importer supports both; pick the one that matches how achievements actually map.
3. **Signature phase.** v1 `identity.signature` is hash-only / verifiable against the stored public key; ed25519 verification on the Soulbis side is a later phase (keys are not session-available cross-origin).

**Phasing**
- **Phase 0 — done:** `/star` + `/lattice` deployed; homepage links; Tetrahedra Forge wired.
- **Phase 1 — producer:** add **Export Swordsman's Key** to `agentprivacy.ai/guide/achievements` (map achievements → vertices, emit `palette` + `descriptions` + `identity`). Resolve decisions 1–2.
- **Phase 2 — `/key`:** Soulbis import + verify + display card; wire the homepage hero key panel.
- **Phase 3 — verification:** ed25519 signature check on the Soulbis side; key-burn awareness; "carry across the web" handoff to the MyTerms/swordsman-blade extensions.

---

## 6. Files touched this session

- `index.html` — nav (+Star, +Lattice); Tetrahedra Forge tool card → live `/star` + `/lattice`; removed Substack iframe. *(Also, earlier the same day: ecosystem +City of Mages node, stats refreshed to PVM V5.4 / grimoire v10.2.0 / v1.7.1, OG URLs → soulbis.com.)*
- `star/index.html` + `star/assets/` — manifold (asset paths absolutised; title → `soulbis.com/star`).
- `lattice/index.html` — codex.
- `README.md` — project structure now lists `star/` + `/lattice/` and the key system.
- `CLAUDE.md` — node table (+City of Mages neutral); grid-count note.
- `CHRONICLE.md` — dated entries for the sync + the integration.
- `CHRONICLE_SWORDSMAN_KEY_2026-05-27.md` — this document.

**Source of truth for the interop:** `C:\Users\mitch\star lattice\swordsmans-key.interop.md` (and the mirror `…\SWORDSMANS-KEY.md`).

---

## 7. Addendum (same day) — palette reconciliation + key weight + interop fix

**Deployment switched to the standalone pages.** The user's most-current `/star` + `/lattice` are the self-contained single-file HTMLs (`star lattice/star-tetrahedron-manifold.html`, `vertex-codex.html`, three.js via CDN r128), not the Vite `dist/`. Deployed those over the old bundle and removed `star/assets/`. This also fixed the "`/star` not working" report (the stale bundle).

**Gem palette reconciled to the soulbis colour law** across producer + both consumers + the Vite source:
- `sword` → coral `#e8523a` (⚔️) · `mage` → cyan `#4dd9e8` (🧙) · `cool` → navy `#141a3d` (the gap · 🌑) · `warm` → white `#f0eee8` (full reflection · 🌕).
- Files: `star-tetrahedron-manifold.html`, `vertex-codex.html` (defaults + `PRESETS.artificial` + swatches), `src/config.js`, `public/codex.html`, and the agentprivacy producer `SWORDSMAN_KEY_PALETTE`. Manifold inspector caption fixed (cyan/amber → coral/cyan). Codex loaded-desc panel re-tinted coral.

**Interop diagnosis.** The agentprivacy producer (`src/lib/swordsmans-key.ts`, wired into `AchievementsClient`) emits a structurally valid v1 key; the only real defect was the **palette divergence** (producer shipped the old gems) — now fixed. There is no importer on the agentprivacy side, and that is **correct by design**: agentprivacy is the *root* that produces the key; soulbis consumes. One-way.

**Key "weight" — three additive features (v1-compatible):**
1. **Sparse descriptions.** Producer now writes descriptions only for the City's shops, the three special seats (V0·V25·V63), and lit vertices — so `/lattice`'s "described" marker stays meaningful instead of flagging all 64.
2. **`lit: number[]`.** Achievement-lit vertices. `/lattice` rings them coral with a ✦; `/star` tints those points coral. Both pages round-trip the field on export.
3. **`identity` block.** `{ displayName, trustTier, stratum, publicKeyHex, drakeOrb }` carried from the Agent Card; shown beside the key name on both pages (with moon-phase glyph for stratum). Additive, ignored by older parsers.

**Strengthened star↔lattice link.** Both pages broadcast the full imported config over `BroadcastChannel('agentprivacy-succ')`, and both now consume `lit`/`identity` from it — so importing a key on one page cascades palette + lit + identity to the other live.

Interop spec (`star lattice/swordsmans-key.interop.md`) updated: reconciled palette, sparse note, `lit` + `identity` field docs. Producer typechecks clean (`swordsmans-key.ts` + `AchievementsClient.tsx` have no TS errors; remaining `tsc` errors are pre-existing, unrelated files). Verified on local **:7000** (`/`, `/star`, `/lattice` → 200; feature markers present).

## 8. Addendum — cross-nav fix + `[f]` focus mode

**Star↔lattice links fixed.** Both pages carried flat-folder defaults that 404 on the clean-route deploy: `/star`'s `LATTICE_URL` was `codex.html` (→ self-relative 404, hence "the path to lattice isn't showing") and `/lattice`'s `STAR_URL` was `index.html` (→ pointed at itself). Set to `/lattice` and `/star` respectively. Both directions now resolve.

**`[f]` focus mode on `/star`** (presentation orbit, in the spirit of spellweb's fullscreen): press **F** → `requestFullscreen()`, all chrome (masthead, console, launcher, inspector, hint) fades, and the sculpture drives a deterministic cinematic orbit — steady azimuth (`az += 0.22·dt`) with a slow polar bob (`pol = π/2 + 0.5·sin(0.16·t)`). Press **F** again or **Esc** to exit (also handles the browser `fullscreenchange`). A dim badge ("focus mode · press F or Esc to exit") flashes on entry and on mouse-move. `focusMode`/`focusT` declared early to avoid a TDZ in the render loop; key handler ignores INPUT/TEXTAREA targets.

## 9. Addendum — `/star` interaction polish

- **Star glow fix.** The Swordsman/Mage tetra-vertex sprites only animated scale, never opacity, so they didn't dim with the core glow (or its on/off toggle). Their opacity now tracks the same pulse (`0.6+0.35·sin(1.6t)` on · `0.12` off).
- **Back-to-root nav.** `/star` and `/lattice` are full-bleed standalone pages (no homepage shell), so each menu now has a `↖ soulbis.com` link to `/`. Also fixed both cross-links that 404'd on the clean-route deploy (`/star`'s lattice link was `codex.html`; `/lattice`'s star link was `index.html` → itself). Home ↔ star ↔ lattice all hop now.
- **`[f]` focus mode** — fullscreen presentation orbit (chrome fades; deterministic yaw + polar bob); F/Esc to exit.
- **✦ Walk the key vertices** (under the Swordsman's Key menu) — a tour that visits **only the lit vertices, in key order** (distinct from the succ-cycle Play and from `/lattice`'s stratum sort). It reuses the main transport: **▶/❚❚** play-pauses the path, **◀ ▶** step key vertices; engaging/exiting via the button; importing a new key or clicking a node exits. The continuous succ advance is suppressed in tour mode. When **paused**, the lattice surface glow (`latCell` + neighbour/antipode highlights) shows on the held vertex.
- **`swordsman info` toggle** — the live inspector popup (which flickered during fast succ walks) is now gated by a console checkbox; off quiets it, the key tour forces it on.

## 10. Addendum — landing-page depth pass (`index.html`)

**Goal:** the homepage read as a flat *catalogue of tools*; the most sophisticated work — the Swordsman's Key system and the sovereignty-lattice geometry — was buried inside one Tools card. This pass surfaces the depth and the systems of the Swordsman-protocol side without breaking the static minimalist design.

**Decisions (user-confirmed):** fuller scope — a Key system section **+** a geometry band **+** a layers/stack list, plus hero/Forge/Philosophy refinements. Register: **gestural** — name the systems plainly, keep raw math light, link out to `/star`, `/lattice`, `/model` for the rigor.

**New section order:** Hero → Ecosystem → Built → **The Key** → **The geometry** → Tools → **The layers** → Philosophy → Donate → Footer (9 sections, balanced).

- **① The Key** (`#key`, reuses `.ecosystem`/`.ecosystem-grid`) — the connective spine in three coral movements: **Forge / The Ceremony** (⚒️ → `agentprivacy.ai/ceremony`, cyan link = Mage venue) · **Project / The Lattice** (🔷 → `/star` · `/lattice`) · **Carry / The Artifact** (🗝️ — the portable key). Intro line frames it as "minted on the Mage side, projected and carried on the Swordsman side."
- **② The geometry** (`#geometry`, centred, light) — Cormorant statement: *"a 64-state sovereignty lattice where the Swordsman protects and the Mage projects, and value lives on the path, not the point,"* one quiet mono accent `⚔️ neg ⊥ 🧙 bnot · ∂M: 96 → 64`, and **The model →** (`/model`). The links carry the depth; no math wall.
- **③ The layers** (`#layers`, reuses `.built-grid`) — the stack: **Identity** (the Key, → `#key`) · **Geometry** (the lattice, → `/star`) · **Enforcement** (MyTerms · Mage Mode, → `#tools`) · **Value** (Zypher · Zcash, → repo) · **Coordination** (Improbable Collaborations, → org).

**Refinements:** hero sub → "the tools, the key, and the geometry…" with an **Explore the lattice →** CTA (`/star`, replacing the old "Read the protocol" ghost — agentprivacy.ai stays linked in the sub); Tetrahedra Forge card slimmed to point up to **The Key**; Philosophy strip gained a gestural line *"⚔️ protects · 🧙 projects · the gap is the proof"* above the V5.4 caption; **Key** added to the nav.

**Guardrails honored (per `CLAUDE.md`):** static HTML, dual-agent colour law (the entire Key/geometry/layers run is Swordsman-coral; cyan only on Mage-side outbound links — ceremony, model), no new CSS dependencies, no gradient backgrounds, wave field / soul orb / attribution untouched. No new sections beyond the three justified Swordsman-side additions.

**Verified:** `npm run build` (verify-static) OK; home HTTP 200 on `:7000`; `<section>` tags balanced 9/9; all new anchors + nav link present.

**Open flags (left for the user's eye):** (a) **The Key** sits *before* Tools so the system reads first — trivially swappable; (b) the ② geometry mono line is the one spot with literal notation — can soften to plain language on request.

## 11. Addendum — the wandering-orb tracer + a clarification

**`highlight surface · opacity`** (clarified for the record): the slider drives the opacity of `latCell` — the translucent surface "fan" drawn around the held vertex when the path is **paused**, linking it to its six one-bit-flip neighbours (the dimension-toggles). It visualises the local neighbourhood; `0` = invisible, `0.6` = solid. Pause-only (`latCell.visible = paused`).

**Bouncing popup → compact tracer.** During fast **succ-cycle** play the inspector flickered through vertex/bits/neg/bnot/succ/description every frame. It now **collapses to a calm progress indicator** while playing (`state.playing && !tourMode`), and expands back to full detail when **paused, stepping, or on the key tour** (the deliberate moments). Toggled via `updateTracing()` from `setPlaying`/`exitTour`/init; the detail children are hidden by `.inspector.tracing` CSS.

**Styled as a wandering soul-orb** (to match the orbs on the other agentprivacy domains): a breathing core in the canonical soul-orb gradient (`#4dd9e8 → #8b4daa → #e8523a`), the coral progress **arc** (`stroke-dashoffset` = position around the 64-cycle), and a white **comet dot** (`#tracerDotG` rotated `prog·360°`) that orbits the ring as the cycle advances. Label shows `vertex N · stratum k`. The *swordsman info* toggle still hides the whole popup outright.

Verified: JS syntax OK; `/star` 200; markers present.

## 12. Addendum — emoji toggles + the tracing-runtime proof

**Emoji toggle pills.** The four layer/path toggles are now presentable pill-buttons (hidden checkbox + `:has()` styling, so wiring is unchanged): 💠 **64 vertices** · 🔄 **succ cycle** · ℹ️ **info popup** (Path · Key panel) and 🔮 **core glow** (Lattice Console). Active = coral-tinted with a full-colour glyph; inactive = greyed/dimmed.

**Lap counter in the orb.** The wandering-orb tracer now shows a **lap count** at its centre (counter-rotated SVG `<text>`), incremented each time the succ marker wraps `0→63→0` (`markerF < prevMF`). Total tracing time accrues in `traceSeconds`.

**Tracing-runtime proof + "save trace".** A **💾 save trace** button (Path panel) stamps `TRACE_PROOF = { laps, seconds, savedAt }` and toasts; the button re-arms when a new lap completes. `exportKey` writes it to the key as an optional `trace` field; `loadConfig` **seeds laps/seconds back on import**, so the proof *accumulates across sessions/keys*. Reset clears it. `/lattice` passes `trace` through on round-trip (`TRACEC`); the producer doesn't emit it (it originates from tracing on `/star`). Interop spec updated with the `trace` field + example. Provenance, not a security claim.

Verified: `/star` + `/lattice` JS syntax OK, both 200.

## 13. Addendum — City Key relabel + tour timer

**Naming reconciled on the experience.** Following the three-key model (see `CHRONICLE_THREE_KEYS_AND_THE_RECURSION_2026-05-27.md`), `/star` + `/lattice` now call the imported/exported artifact the **City Key 🗝️** (it's the lattice-standing export from `/guide/achievements`; the ⚔️ Swordsman's Key is the separate ceremony identity). Relabelled: the Path · Key section header → "City Key 🗝️", the codex lede + import button + JSON description, all empty-states ("import a City Key…", "no lit vertices in this City Key"), the toast, and the **download filename → `city-key.json`**. The `⚔️ Swordsman` gem / `neg` / dual-agent-core references are unchanged (the Swordsman is still the gem). Wire format unchanged — existing keys still parse.

**Tour-walk timer.** Tracing the City Key now also records **`tourSeconds`** — dwell time spent walking the **key tour** (the lit vertices), distinct from the succ-cycle `seconds`. It accrues per-frame while the tour is engaged (`tourMode && keyLoaded`), displays live in the key-tour button (`✦ key tour · m:ss (exit)`), accumulates across engagements, is stamped into the proof by **save trace**, and is seeded/accumulated on import. Interop spec `trace` field updated to `{ laps, seconds, tourSeconds, savedAt }`.

Verified: `/star` + `/lattice` JS syntax OK, both 200, zero stray "Swordsman's Key" key-labels.

---

*Chronicle written 2026-05-27 — the City Key walks the manifold; the Swordsman's Key keeps the gate.* `(⚔️ ⊥ ⿻ ⊥ 🧙) 😊`
