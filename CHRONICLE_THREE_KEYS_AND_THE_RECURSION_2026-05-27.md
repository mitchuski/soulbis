# Chronicle — The Three Keys & the Recursion of Proofs

**Date:** 2026-05-27
**Purpose:** canon/architecture note. **Sync source** — propagate into `agentprivacy-docs`, `agentprivacy_master`, `spellweb`, `agentprivacy-skills`.
**Trigger:** the `/guide/achievements` export was renamed from "Swordsman's Key" to the **🗝️ City Key** (`agentprivacy_master/src/lib/city-key.ts`), distinguishing it from the **⚔️ Swordsman's Key** (the ceremony's ed25519 identity). This note records the three-key model and the recursive proof-flow it sits inside.

> `(⚔️ ⊥ ⿻ ⊥ 🧙) 😊` — the gap is the proof; the keys are how the proof travels.

---

## 1. Three keys, layered by where they are minted and what they carry

| Key | Minted at | Carries | Consumed by | Status |
|---|---|---|---|---|
| **⚔️ Swordsman's Key** | agentprivacy `/ceremony` | The **ed25519 identity** — `publicKeyHex · participantId · trustTier · constellation`. Boundary/enforcement credential. | spellweb (anchors forged blades); stamped into the City Key's `identity` block | live (Agent Card) |
| **🧙 Mage's Key** | spellweb (future · DID-integrated) | The **Mage-side credential** — knowledge/authorship in the corpus. | agentprivacy / coalitions | **not built yet** |
| **🗝️ City Key** | agentprivacy `/guide/achievements` §2 | The bearer's **standing on the lattice** — `palette` + sparse 64-vertex `descriptions` + `lit` + `identity` (the Swordsman identity that owns it). | **soulbis `/star` + `/lattice`** — projected onto the geometry, walked, traced | live (`city-key.ts`) |

**The distinction that matters:** the Swordsman's Key is *who you are* (identity). The City Key is *where you stand and how you've walked* (standing + relationship). The City Key **references** the Swordsman's Key (via `identity.publicKeyHex`) but is a different artifact.

**Wire format:** the City Key is the same v1 format the soulbis pages already parse — `{ name, version:1, palette, descriptions, lit?, identity? }` — historically titled "Swordsman's Key" in `star lattice/swordsmans-key.interop.md`. **The lattice-export format is now canonically the City Key.** Download filename: `city-key.json`. Round-trips unchanged.

---

## 2. How the City Key changes the `/star` path

On soulbis `/star` + `/lattice`, what you **import** is a City Key. This reframes the consumer behaviour (the code still says "Swordsman's Key" in a few labels — see §5 sync actions):

- **Import = your City standing.** The `lit` vertices are the shops/seats you've earned in the City of Mages; the `descriptions` are their readings; `identity` says whose standing it is.
- **"Walk the key" = walk your City standing** — the tour over the lit vertices. With no City Key imported, there's nothing to walk (it now says so).
- **Tracing + save-trace = presence on the geometry, attached to the City Key.** Lap-counting and "save trace" **only accrue once a City Key is imported** — presence attaches to a key, never to the void. Without one, the comet animates but nothing counts (it would be "just a stat"). On import, presence resumes from any `trace` the key already carries → **presence accumulates on the City Key across sessions.**
- This is the surface on which **🪢 VRC (relationship) is proven on the geometry** — the City Key is *earned at the ceremony, deepened by walking the lattice.*

---

## 3. The recursion — each domain adds weight to the proof

The universe is a **loop**, not a funnel. A Sovereign passes through every domain, each contributing its own *trust task* (a proof-layer), and the enriched key/proof is carried back to the start — where the next pass deepens it. The keys are the vessels that carry weight around the loop.

```
        ┌────────────────────────── the recursion of proofs ──────────────────────────┐
        │                                                                              │
   ① agentprivacy ─▶ ② spellweb ─▶ ③ the lattice ─▶ ④ workshops ─▶ ⑤ achievements ─┐  │
      (experience)     (knowledge)   (coordinates)    (forge/cast)    (standing)     │  │
        ▲                                                                            │  │
        │                                                                            ▼  │
        └──────── ⑦ star lattice ◀── ⑥ soulbis ◀──────────────────────────────────────┘
                  (project · trace ·     (back to the
                   accrue 🪢 presence)    Swordsman / boundary)
```

| # | Domain | Trust task (the proof it adds) | Key touched |
|---|---|---|---|
| ① | **agentprivacy** — the experience | The **ceremony**: mint the ⚔️ Swordsman identity; read the story | Swordsman's Key born |
| ② | **spellweb** — knowledge | Navigate the corpus; forge artefacts; (future) the 🧙 Mage's Key; blades anchored to the Swordsman identity | Swordsman's Key anchors; Mage's Key (future) |
| ③ | **the lattice** — the shared coordinates | The 64-vertex `{0,1}⁶` sovereignty geometry underlying every domain — the common frame | (substrate) |
| ④ | **workshops** — the City of Mages | Forge artefacts / cast spells at vertices → **deviation chain** of forged work | artefacts; deviation hash chain |
| ⑤ | **achievements** — `/guide/achievements` | Standing accrues; the **🗝️ City Key is minted** here (palette + lit + identity) | City Key born |
| ⑥ | **soulbis** — back to the Swordsman | Carry the City Key to the boundary layer; enforcement; the blade you keep | City Key carried |
| ⑦ | **star lattice** — `/star` + `/lattice` | **Project** the City Key onto the geometry; **trace** it; accrue **🪢 VRC presence** (laps · runtime · `gates` presence-signature); save → attach presence → export | City Key deepened |

…and ⑦ → ① again: the deepened City Key (and the presence/VRC it now carries) is carried back into agentprivacy/spellweb, where the next pass adds more weight. **Trust is not granted at one gate — it accumulates recursively, one domain's proof at a time.**

**🪢 VRC is the through-line.** Relationship-mana is the monotonic accumulator that grows across the loop (`agentprivacy:vrc-mana`, today fed only by the Waypoint Portal). Tracing the manifold on `/star` is designed to feed it: deliberate presence on the geometry → 🪢 accrues → shown on achievements → deepens the City Key → carried onward. The City Key is the **surface on which relationship is proven on the geometry**; VRC is the weight that surface accumulates.

---

## 4. Why "recursion" is the right word

- The **output of the loop is an input to the loop** — a weighted key re-enters where it began.
- Each domain's proof **composes on the prior** (the deviation chain hashes its predecessor; the City Key stamps the Swordsman identity; presence resumes from the carried `trace`).
- No single domain is sufficient: identity (⚔️) without standing (🗝️) is hollow; standing without knowledge (🧙) is shallow; all three deepen only by being carried around again.
- The fixed point the recursion approaches is **V63 — full sovereignty** (all six dimensions held), *"never named, only inhabited."*

---

## 5. Sync actions per repo

- **`agentprivacy-docs`** — adopt the three-key table (§1) and the recursion diagram (§3) into the canon; note the City Key as the lattice-export credential and the historical rename from "Swordsman's Key."
- **`agentprivacy_master`** — `city-key.ts` is canonical (done). Audit lingering "Swordsman's Key" labels that actually mean the City Key (the export is `🗝️ City Key`); the genuine Swordsman's Key = the ed25519/Agent Card identity. Wire tracing/VRC accrual when the soulbis trace returns (see `PLAN_VRC_TRACING_DEVIATION_2026-05-27.md`).
- **`spellweb`** — record the 🧙 Mage's Key as the spellweb-minted credential (future); the deviation chain (`forge.ts` hash chain) is the workshops' proof-layer; reserve a `'trace'`/deviation rendering for returned presence.
- **`agentprivacy-skills`** — frame the per-domain trust tasks (§3 table) as skill/ceremony steps; the recursion is the meta-skill (carry the key around, deepen it each pass).
- **`soulbis` (this repo / `star lattice`)** — relabel the `/star` + `/lattice` import/export and `swordsmans-key.interop.md` from "Swordsman's Key" → **City Key 🗝️** to match the producer (consumers parse the same v1 format, so this is cosmetic + spec wording). Keep the trace/presence attaching to the imported City Key.

---

## 6. Status

- **Built:** City Key producer (`city-key.ts`, `city-key.json`); soulbis `/star` + `/lattice` consume it; tracing presence attaches to an imported key; VRC-mana accumulator exists (`vrc-mana.ts`); deviation hash chain exists (spellweb `forge.ts`).
- **Pending (plan, not built):** VRC accrual from soulbis traces flowing back to agentprivacy; the `gates` presence-signature in trace v2; trace deviations rendered in spellweb; the 🧙 Mage's Key. See `soulbis website/PLAN_VRC_TRACING_DEVIATION_2026-05-27.md`.
- **Naming:** lattice-export = **City Key** (canonical); identity credential = **Swordsman's Key**; interop spec filename retains its historical title for now.

---

*Chronicle written 2026-05-27 — three keys, one recursion; each pass adds weight to the proof.* `(⚔️ ⊥ ⿻ ⊥ 🧙) 😊`

> **V6 regime note (2026-06-10).** The 🪢 presence economy described above is declared regime 1 at PVM V6 §15: non-transferable, non-attesting local color; not proof, not stake-weight, not an input to any admission or attestation decision. The recursion-of-proofs reading is registered as conjecture C87 (~50%, the Key as IVC accumulator). Authority: `agentprivacy-docs/research/CONJECTURE_REGISTER_V6.md` (head C89).
