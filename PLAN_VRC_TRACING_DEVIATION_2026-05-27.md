# Plan (for review) — Tracing → VRC → Deviation chain across the suite

**Date:** 2026-05-27 · **Status:** PLAN ONLY — no build until approved.
**Origin of the idea:** the `/star` lap counter + "save trace" proof; the open questions about speed-vs-laps, the deviation chain, whether to use VRC instead of stapling to the Swordsman's Key, and how to enrich the agentprivacy + spellweb sides.

---

## 0. The governing distinction — State vs. Accumulation

- **Swordsman's Key = STATE.** A point-in-time projection onto the lattice: `palette · descriptions · lit · identity`. It round-trips because it's a snapshot. *It should stay pure state.*
- **Tracing = ACCUMULATION.** Laps, runtime, the speed-profile, the sequence of manifold shapes walked. This is a **relationship with the geometry over time** → it belongs to **VRC-mana 🪢** (the suite's monotonic relationship accumulator) and the **spellweb deviation layer** (the runtime history of forged/walked artefacts), **not** as a flat field on the Key.

The Key may carry at most a small **summary pointer** (e.g. `vrc: { laps, deviations, manaContributed }`) — provenance, not the chain itself.

**Presence attaches to a key (decided 2026-05-27).** Tracing accrues *against an imported key*, not in the void. With **no key imported**, the comet still animates but nothing counts and "save trace" is disabled ("import a key first") — a trace with no key is just an idle stat, not a proof. Once a key is imported, laps + runtime accrue and "save trace" attaches the presence to *that* key (resuming from any `trace` the key already carried). This is implemented on `/star` now and is the seed of the VRC accrual: **import = the specific path; export = the presence accrued on it.**

---

## 1. Real shapes we're landing on (verified)

- **VRC-mana** — `agentprivacy_master/src/lib/vrc-mana.ts`: `getVrcMana()`, `addVrcMana(amount, source)`, key `agentprivacy:vrc-mana`, event `agentprivacy:vrc-mana-changed {source,amount,total}`. Monotonic int. Only `WaypointPortal.tsx:139` feeds it today (`addVrcMana(1,'charthouse:waypoint-admitted:V…')`).
- **Spellweb deviation node** — `spellweb/src/types/graph.ts`: `type:'artefact'`, runtime-only from `localStorage['spellweb-forged-blades']`; fields `bladeTier|bladeStratum|spellEmoji|isWitness|forgedAt|bladeId`; connects via `inhabits` edge to its workshop. NodeType `'key'` + edges `keys_to` (key→vertex), `synced_with` (key→gateway) already exist.
- **Deviation hash chain** — `spellweb/src/lib/forge.ts`: `hashCanonicalDeviations(canonicalKeys)` hashes chained 🔗 deviation-to-deviation links; `computeBladeHash(…, deviationHash?)` embeds it (omitted when empty → backward-compatible). **This is the chain primitive we reuse.**
- **Artefact MD spec** — `cityofmages/tomes/specs/09-spellweb-artefact-md-format.md` §11 (deviation layer): frontmatter `workshop · constellation_* · blade_tier · blade_stratum · blade_is_witness · forgedAt · blade_hash …`.

---

## 2. The new payload — trace proof v2 (+ "gates" presence)

Captured on `/star` when you **save trace**. A **deviation snapshot** (the start of a chain):

```json
{
  "kind": "manifold-trace",
  "laps": 7,
  "seconds": 142,
  "savedAt": "2026-05-27T19:40:00Z",
  "vertex": 51,
  "stratum": 4,
  "geometry": { "eps": 0.35, "m": 5, "n": 6, "core": 0.60, "smRatio": 1.0 },
  "palette": { "cool": "#141a3d", "warm": "#f0eee8", "sword": "#e8523a", "mage": "#4dd9e8" },
  "gates": [ { "t": 0, "speed": 0.12 }, { "t": 41, "speed": 0.28 }, { "t": 96, "speed": 0.05 } ],
  "prev": "<hash of previous deviation, or null>",
  "hash": "<digest over the above, mirroring forge.ts>"
}
```

- **`gates` = proof of presence.** The log of speed changes through the run. A flat, constant-speed run reads as automated; a varying one reads as someone *actually there*. The variability is the human/agent fingerprint — and it neatly resolves the speed-vs-laps worry: **VRC accrues on deliberate time, `gates` evidences the presence, laps stay a live flourish.**
- **`prev` + `hash`** make each save an entry in a **deviation chain** (reusing the `forge.ts` chain-hash pattern). The chain is the relationship history.

---

## 3. How it threads the three surfaces

```
  soulbis /star  ──save trace──▶  trace v2 (deviation node + gates + chain hash)
        │                               │
        │  exported in the key /        │  (cross-origin: travels as JSON, not a live link)
        │  as a deviation .md           ▼
        │                        agentprivacy import
        │                          ├─ addVrcMana(weight, 'star:trace:…')  → 🪢 accrues
        │                          └─ /guide/achievements shows "🪢 +N from tracing"
        ▼                               │
  Key carries a small `vrc` summary ◀───┘
                                        │
                                        ▼
                                 spellweb import
                                   └─ render trace as a deviation node
                                      (type 'artefact' or new 'trace'),
                                      `inhabits`/`keys_to` edge, chained 🔗 via deviationHash
```

- **VRC accrual rule (resists farming):** `weight = f(deliberate seconds, gates-variability)`, capped per save; raw laps do **not** drive mana. e.g. `min(seconds/10, cap) × presenceBonus(gates)`. Exact curve = an open decision (§5).
- **agentprivacy ingestion:** since `/star` is a different origin, the trace rides the exported JSON → an importer on the agentprivacy side calls `addVrcMana()` once, idempotently (dedupe on `hash`).
- **spellweb:** the trace deviation slots into the existing deviation layer; the chain uses the existing `🔗`/`hashCanonicalDeviations` machinery.

---

## 4. Phasing (each independently shippable)

1. **`/star` (soulbis), self-contained:** trace v2 — add `geometry`, `palette`, `gates` (speed-profile log), `prev`/`hash`, and chain successive saves locally. Time-based accrual display; laps stay the orb flourish. *No other repo touched.*
2. **Bridge/spec:** define the trace-deviation export shape (JSON now; optionally spec-09 `.md` later) + document in `swordsmans-key.interop.md`. Decide if the Key carries a `vrc` summary pointer.
3. **agentprivacy:** importer → `addVrcMana()` (dedupe by hash) + a 🪢 line on `/guide/achievements`.
4. **spellweb:** render trace deviations as nodes + chain edges (reuse `forged-blades` store + deviation hash, or a sibling `traces` store / new `'trace'` NodeType).

---

## 5. Open decisions (need your call before/within Phase 1–2)

1. **VRC accrual curve** — time-based with a gates-variability bonus, capped per save. What cap / curve? (Goal: deliberate walking earns mana; speed-farming doesn't.)
2. **Key summary pointer** — does the Swordsman's Key carry a tiny `vrc: {laps, deviations, mana}` (provenance), or stay pure state with the chain living only in VRC/spellweb?
3. **Node identity in spellweb** — reuse `type:'artefact'` for traces, or add a dedicated `'trace'` NodeType so they read distinctly in the graph?
4. **Chain store** — extend `spellweb-forged-blades`, or a new `spellweb-traces` localStorage store?
5. **`gates` granularity** — log every speed change (sparse, presence-shaped) vs. periodic sampling (denser). Sparse-on-change is lighter and more "fingerprint."

---

## 6. Note on current state (nothing broken)

Today the flat `trace: {laps, seconds, savedAt}` field on the exported key (soulbis side only; the agentprivacy producer does **not** emit it) is harmless and works. We leave it until Phase 1 supersedes it. The producer/Key state model is untouched by this plan until §2's decision.
