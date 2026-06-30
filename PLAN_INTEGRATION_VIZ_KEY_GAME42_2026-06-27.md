# PLAN · Integrating the Core Overlap — soulbis visualisation ⟷ star key-management ⟷ game42

**Date:** 2026-06-27
**Scope:** Identify and unify the shared primitives across three codebases:
`soulbis website/` (the visualisation + City Key system) · `star/` (the Swordsman's Key holospace / key management) · `game42/` (the Three.js assembly engine).
**Posture:** This is a *coherence + composition* plan, not a rewrite. The three repos already implement the same ideas three times; the goal is one shared core and one direction of flow (game42 **forges**, soulbis/star **carry & charge**).

---

## Part 1 — Review: what exists in `soulbis website`

### 1.1 The four rooms (visualisation)
| Room | Tech | Draws | Role |
|---|---|---|---|
| `/star` | Three.js **r128** (CDN), single-file inline | Parametric manifold `r(θ,φ)=R(1+ε·cos(nθ))` + 64-vertex {0,1}⁶ lattice + stella-octangula core; animated `succ` comet | **GENERATE** — accrues a `trace` proof of presence |
| `/lattice` | Pure CSS-grid + Canvas | 8×8 cell codex; focus glow; κ-glyph overlay; inscription | **CHARGE** — walks `succ`, discharges focus → `witness` |
| `/sigil` | Canvas 2D | κ derivation theatre (Derive→Constellate→Compare); DH-PSI common-ground | **VERIFY / COMPARE** — re-derives κ, intersects two keys |
| `/skye` | Canvas 2D | Many keys as κ-placed stars; gold lineage threads, teal common-ground | **CONSTELLATE** — the night of many keys |

All four are linked same-origin by **`BroadcastChannel('agentprivacy-succ')`** and share one portable artefact: the **City Key**.

### 1.2 The system (key management)
- **City Key v1 JSON**: `{ name, version, palette{cool,warm,sword,mage}, descriptions{0..63}, lit[], identity{}, focus{}, witness{}, trace{}, geometry{}, figures?, packets?, prior?, did?, kappa }`.
- **κ-label** = `sha256:` + SHA-256 over `canonicalJSON` (recursive key-sort, no whitespace, `kappa` excluded). Re-derived and verified on every import. Conformance vector for the default key: `sha256:0b4916ba…c527` (303 canonical bytes).
- **PNG carrier**: key embedded in a tEXt chunk (`cityKey` / `citySky`), CRC32-valid, byte-exact round-trip.
- **Two-value economy** (`CHRONICLE_TWO_OBSERVATIONS…`): `trace` (presence, renewable) + `witness` (proven focus, deliberate) → re-charge 🪢 VRC mana at agentprivacy `/city`, deduped by `trace.savedAt` / `witness.at`.

### 1.3 Relationship to `star`
`star/` is a near-verbatim extraction of these same pages (the five shared pages must stay **byte-identical**, synced by `cp`), wrapped as a holospace: minimal portal, `.devcontainer` (Node 20 + `serve` :8000), `HOLOSPACE.md` (UOR-ADDR Five Laws), plus key evolution beyond soulbis — `figures` (FIG-2.0 measured geometry), `did:key`, `packets` (Merkle root of trust-task proofs), `prior` (κ-chain lineage).

---

## Part 2 — The core overlap (where the three meet)

The three repos converge on **four shared primitives**, each currently implemented 2–3× with drift:

### Overlap A — Identity primitive (κ / canonical / PNG carrier) — **FORKED**
| | soulbis + star | game42 |
|---|---|---|
| Canon fn | `canonicalJSON` | `canonical` (`src/hash.js`) |
| Algorithm | recursive key-sort, no whitespace, SHA-256 | **identical** |
| Excludes | `kappa` only | `{kappa, seal, vrcId, gameId}` |
| Label format | **`sha256:`**`<hex>` | **bare** `<hex>` (no axis prefix) |
| Numbers | JSON-rendered as-is | **stringified upstream** (`toFixed`) for cross-impl determinism |
| PNG keyword | `cityKey` / `citySky` | `game42` |
| Hashed object | the *whole key* | a single *VRC* (relationship edge) |

➜ Same algorithm family, two incompatible parameterizations. game42 hashes **edges** (VRCs) then rolls them into a **`groupSeal`**; soulbis hashes the **whole carried key**. These are complementary layers, not competitors — but they must agree on the byte-level canon to be mutually verifiable.

### Overlap B — Geometry (star tetrahedron + 64-lattice + six axes) — **SAME CANON, DRIFTED CONSTANTS**
- **Identical** stella-octangula vertices in `star/index.html` and `game42/src/star.js`: Sword tetra `(1,1,1)(1,-1,-1)(-1,1,-1)(-1,-1,1)`, Mage tetra the complement.
- **Same six dimensions**: soulbis d₁…d₆ = Protection/Delegation/Memory/Connection/Computation/Value; game42 axes = protection/delegation/memory/connection/compute/value (+ zk-dimension labels). game42's **42 = 6 axes × 7 faculty stations** is a *refinement* of the soulbis 6-bit lattice (the 6 roots are the stratum-1 basis vectors; C(6,1)=6).
- **Binding differs**: soulbis treats Sword/Mage as the two **operators** `neg`/`bnot` over all 64 vertices; game42 binds Sword/Mage to **two of the six axes** (protection/delegation). Reconcilable: operator-Sword and axis-Sword are the same archetype at different altitudes.
- **Palette drift (must reconcile)**: soulbis Sword `#e8523a` (coral) / Mage `#4dd9e8` (cyan); game42 Sword `#E0A526` (amber-gold) / Mage `#2563EB` (sapphire). Scale/units also differ (soulbis `R=1.2`, game42 `SCALE=1/130`).

### Overlap C — Trust / VRC lifecycle — **TWO HALVES OF ONE PIPE**
game42 **issues** relationship credentials (`TASK_VERIFY` → VRC → κ → `groupSeal` → trust graph) but stubs the issuer/DID/RPP. soulbis **carries & charges** them (`focus`→`witness`→`/city` VRC mana) but assumes an external producer. **They are the missing halves of each other**: game42's `groupSeal` is precisely the kind of proof a City Key should carry into soulbis `/star`/`/lattice` and charge at `/city`.

### Overlap D — Data model — **CONVERGENT**
City Key (palette + state + κ) and game42's carrier (`{version, kind:'game-of-42', seal, p, log}`) are siblings: both JSON, both κ-stamped, both PNG-embeddable. game42 adds the **ordered event log** as the canonical replayable artefact — something soulbis's `trace`/`witness` only approximate.

---

## Part 3 — The integration

**Thesis:** one shared identity core, one geometry/palette canon, one direction of flow.
**`game42` forges the seal → it becomes a City Key → `star`/`soulbis` carry, verify, and charge it.**

### Phase 0 — Extract a shared `holokey` core module (foundation)
Create a single dependency-free ES module (`holokey.js`, ~60 lines) that is the **one** implementation of:
- `canonical(obj, exclude)` — parameterized exclude-set (default `{kappa}`; game42 passes `{kappa,seal,vrcId,gameId}`).
- `kappaLabel(obj, {axis='sha256', prefixed=true})` — returns `sha256:<hex>` or bare `<hex>` by flag, so both conventions are one codepath.
- `verifyKappa`, `pngEmbedKey(dataURL, cfg, keyword)`, `pngExtractKey(buf)` (keyword-agnostic; auto-detect `cityKey`/`citySky`/`game42`).
- **Number rule (binding):** adopt game42's "stringify-upstream" discipline everywhere so floats can never diverge cross-impl.
- Ship the conformance vector (`sha256:0b4916ba…c527`) plus game42's demo-VRC vector (`4cdab0eb…`) as a **shared self-test** both build pipelines run.

*Deliverable:* `holokey.js` vendored byte-identically into all three repos (the project already accepts trivial duplication-by-`cp` for the five shared pages; same model here). Acceptance: every repo's self-test reproduces both vectors.

### Phase 1 — Reconcile the geometry & palette canon
- Publish one **canon constants** file: `N=64, BITS=6, STRATA=[1,6,15,20,15,6,1]`, the six axis ids + order, the stella-octangula vertices, and **one palette**. Decide Sword/Mage hex **once** (recommend: keep soulbis coral/cyan as the *carrier* palette since it ships in production; record game42's amber/sapphire as the *forge* theme preset — same archetypes, declared as themeable, not canon-divergent).
- Document the altitude map: operator-Sword (`neg`) ≅ axis-Sword (protection); operator-Mage (`bnot`) ≅ axis-Mage (delegation). Add this to `MODEL-SYNC.md` so the binding is explicit, not implicit.

### Phase 2 — Make a game42 seal a chargeable City Key (the keystone)
This is where the overlap pays off.
- On `BOARD_SEAL`, game42 already computes `groupSeal` + holds the event `log`. Extend its export to emit a **City Key-shaped** payload: map `groupSeal → packets.root` (or a new `seal` field), the 42 VRC κ-labels → `packets`/`witness`, the six locked axes → `lit`, and stamp a top-level `kappa` via the shared `holokey.js`.
- Result: a game42 PNG carrier that **drops straight into `/star` and `/lattice`** — the manifold lights the six sealed axes, `/lattice` shows the proven vertices, `/sigil` re-derives κ (verified), and `/city` charges the VRC mana. The forge output becomes carryable proof.
- Acceptance: export from game42 → import on soulbis `/star` → κ verifies → `/city` accepts the charge (deduped by seal).

#### Phase 2 detail — linking a Game-of-42 PNG into `/star` (the actual wire)

**Current blocker (verified 2026-06-27):**
1. `/star`'s `pngExtractKey` (`star/index.html:586`) only matches the tEXt keyword **`cityKey`** (line 592); game42 stamps **`game42`** (`pngkey.js:5`) → chunk skipped → falls through to `JSON.parse` on binary → "⚠ no City Key in this file."
2. game42's payload (`main.js` `currentCfg`) is `{kind:'game-of-42', seal, p, log, preset, inscription}` — none of the City-Key fields `loadConfig` (`star:629`) reads.

**Chosen approach — one PNG, two tEXt chunks (zero soulbis-side change):**
PNG permits multiple tEXt chunks. game42's export embeds **both**:
- `game42` chunk — the full event `log` (unchanged; its own re-import/replay still works).
- `cityKey` chunk — a City-Key *projection* of the seal, which `/star`/`/lattice`/`/sigil`/`/city` already read verbatim.

Each reader greps its own keyword and ignores the other. soulbis stays byte-identical; the work lives entirely in game42 + the shared `holokey.js`.

**The projection — `game42ToCityKey(game)` (lives in `holokey.js`):**
| City Key field | Source from game42 |
|---|---|
| `name`, `version` | `"game of 42 · <preset> seal"`, `1` |
| `palette` | **canon carrier palette** (coral/cyan) so it renders + charges correctly; game42's forge palette rides only as descriptive metadata |
| `lit` | the six locked-axis basis vertices `{1,2,4,8,16,32}` + apex **`63`** on full seal (board sovereignty = all six dimensions held) |
| `packets` | `{ root: game.groupSeal, count: 42 }` — the seal is the honest single-value digest over all 42 κ-labels + geometryHash; `/star` already carries `packets` untouched (`star:670`) |
| `witness` | `{ spent: {63: 42}, complete: true, at: savedAt }` — 42 sealed slots = proven focus, chargeable |
| `descriptions` | optional: the six axis proverbs |
| `prior` | optional: κ of the raw game42 carrier (lineage forge→key) |
| `kappa` | **re-stamped via `holokey` with the soulbis parameterization** (`sha256:` prefix, exclude only `kappa`) so `/star` + `/sigil` re-derivation matches |

Result: dropping the board-seal PNG on `/star` lights six basis points + the apex on the manifold, `/sigil` shows **κ verified**, and `/city` charges `packets.root` as VRC mana (deduped by the seal, exactly like a `trace`/`witness`).

**Fallback (only if a one-chunk PNG is required):** teach `/star`'s `pngExtractKey` to also accept keyword `game42` and run `game42ToCityKey` on it. Costs a soulbis edit (and a `cp` to `star/`), so prefer the dual-chunk approach.

**Acceptance:** seal a board → Save PNG → drop on a clean `/star` → six axes + V63 light, κ verifies, `/city` accepts one charge; re-dropping the same PNG charges nothing (seal dedup); the same PNG still replays in game42.

### Phase 3 — Wire game42's event log into the soulbis proof model
- soulbis's `trace`/`witness` are lossy summaries; game42's **ordered event log** is the deterministic source. Adopt the log as the canonical proof artefact: let `/lattice` optionally accept a game42 log and *replay* it to reconstruct `witness` (rather than re-deriving by walking), giving a single replayable proof format across all three.
- Keep `trace` (presence, renewable on `/star`) and `witness` (earned focus) as the two soulbis-side accruals; the game42 log feeds `witness`.

### Phase 4 — One carrier, many rooms
- Generalise `/skye` to ingest all three keyword variants (`cityKey`/`citySky`/`game42`) so a board seal, a city key, and a sky all rise as κ-placed stars in one night — DH-PSI common-ground then works across forge-output and carried keys uniformly.

---

## Part 4 — Risks / constraints
- **Byte-identical sync rule**: `star/` mirrors soulbis's five pages exactly; any edit to the shared `holokey.js` must be `cp`-propagated and byte-verified (CI `verify-static.cjs` should add a byte-compare).
- **No-push discipline**: report per-repo status; Mitch triggers commits/pushes ([[feedback-no-pushes-without-ask]]).
- **Production caution**: soulbis `/star`/`/lattice` are live; introduce `holokey.js` behind the existing conformance self-test before swapping the inline copies.
- **κ stability**: changing the exclude-set or number rule changes κ for existing keys. The shared core must keep the *default* (soulbis) parameterization bit-stable so the `0b4916ba…` vector still holds; game42 keeps its richer exclude-set as an explicit argument.

## Part 5 — Suggested order of work
1. **Phase 0** `holokey.js` + shared self-test (lowest risk, highest leverage).
2. **Phase 1** canon constants + palette decision (unblocks everything visual).
3. **Phase 2** game42 → City Key export (the keystone demo: forge → carry → charge).
4. **Phase 3/4** event-log proof unification + `/skye` multi-carrier (polish, can follow).

---

*Companion context:* [[project-game42-visualization]] · [[project-star-holospace-extraction]] · [[project-soulbis-swordsman-key]] · [[project-model-coherence-v1-8-0]]
