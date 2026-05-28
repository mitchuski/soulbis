# Chronicle — Session Capstone: the Swordsman side made walkable

**Date:** 2026-05-27 → 2026-05-28
**Scope:** soulbis.com (sync + `/star` + `/lattice`), with the connective key system reaching into agentprivacy_master and verified against spellweb.
**Purpose:** the final index of this session before sync + push.

---

## The arc, in one read

This session took soulbis from a 2-month-old brochure to a **living Swordsman-protocol surface** and wired it into the suite's proof economy:

1. **Synced the core site** to current canon — City of Mages node, PVM V5.4, grimoire v10.2.0 / v1.7.1, eight Tomes, OG → soulbis.com; removed the Substack embed.
2. **Shipped `/star` + `/lattice`** — the Star-Tetrahedron Manifold (the Privacy Value Model rendered as a playable 3D field) and the 64 · Vertex Codex. Robust three.js, absolute asset paths, same-origin BroadcastChannel live-link.
3. **Reconciled the gems** to the Soulbis colour law (⚔️ coral · 🧙 cyan · gap navy → sovereignty white) across producer + both consumers + the Vite source.
4. **Named the three keys** — ⚔️ Swordsman's Key (ceremony identity) · 🧙 Mage's Key (spellweb, future) · 🗝️ **City Key** (the lattice-standing export, the artifact in play). Relabelled the experience accordingly.
5. **Made the geometry inhabitable** — wandering soul-orb tracer with lap counter, key tour, focus mana poured per vertex, prove-your-focus (walk to discharge), the **witness** (spent-mana proof), the camera dark-bake, the PVM legend.
6. **Closed the recursion** — two observations: **`/star` = GENERATE** (presence → `trace`) and **`/lattice` = CHARGE** (prove focus → `witness`). agentprivacy `/city` mints the City Key (with `focus`), charges both observations into 🪢 VRC at distinct rates, and shows the **presence vs earned-focus split**. spellweb's City Key import verified intact (lenient — ignores the new fields).

The organising line, which turned out to be both the model's claim and the interaction design: **value lives on the path, not the vertex.**

---

## What ships (soulbis.com)

- `index.html` — synced ecosystem (7 nodes incl. City of Mages), **The Key / The geometry / The layers** sections, hero "Explore the star" CTA, City Key wired to `/city`, Philosophy + V5.4.
- `star/` — the manifold (three.js bundled), favicon synced, dark-bake snapshot, generate (`trace`), key tour, City Key labels.
- `lattice/` — the codex, focus visualization + prove-your-focus + `witness`, the PVM legend, favicon.
- `public/`, `vercel.json`, `scripts/verify-static.cjs` — unchanged plumbing. `npm run build` ✅.

## Cross-repo (their own deploys)

- **agentprivacy_master** — `city-key.ts` (+`witness?`), `city-key-charge.ts` (two-observation charge, two totals), `AchievementsClient` (split display), `/city` canonical (`/guide/achievements` → redirect). Typechecks clean (only pre-existing unrelated `tsc` errors).
- **spellweb** — no change needed; `SwordsmanImport.tsx` imports the City Key leniently; soulbis `/star` + `/lattice` already present as gateway nodes in `data/nodes.ts`/`edges.ts`.

## The detailed chronicles (this session)

- `CHRONICLE.md` — site sync + `/star`/`/lattice` integration entries.
- `CHRONICLE_SWORDSMAN_KEY_2026-05-27.md` — the key system, palette reconciliation, key weight, `/star` interaction polish, landing depth pass.
- `CHRONICLE_THREE_KEYS_AND_THE_RECURSION_2026-05-27.md` — the three keys + the recursion of proofs.
- `PLAN_VRC_TRACING_DEVIATION_2026-05-27.md` — the VRC/deviation plan (mostly now realised).
- `REFLECTION_LATTICE_CONSOLE_AND_THE_WALKABLE_MODEL_2026-05-28.md` — audit + PVM-overlap reflection.
- `CHRONICLE_TWO_OBSERVATIONS_GENERATE_VS_CHARGE_2026-05-28.md` — generate (`/star`) ⊥ charge (`/lattice`); the VRC economy (also in `agentprivacy_master/docs/chronicles/`).

## Verified before push

- `npm run build` OK; `/`, `/star`, `/lattice` → 200 on local `:7000`; favicons synced; all landing links resolve; City Key labels reconciled; agentprivacy + spellweb typecheck/inspection clean.

---

*Capstone 2026-05-28 — the equation learned to walk, and the walk became the proof.* `(⚔️ ⊥ ⿻ ⊥ 🧙) 😊`
