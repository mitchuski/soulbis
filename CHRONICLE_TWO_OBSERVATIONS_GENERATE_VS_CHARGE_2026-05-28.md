# Chronicle — The Two Observations: Generate (/star) ⊥ Charge (/lattice)

**Date:** 2026-05-28 · **Status:** model agreed; agentprivacy mapping being built.
**Sync into:** `soulbis website/` (consumer) and `agentprivacy_master/` (producer + VRC economy). Companion to `CHRONICLE_THREE_KEYS_AND_THE_RECURSION_2026-05-27.md` and `swordsmans-key.interop.md`.

> The City Key is imported into the *same* geometry two ways. **Which page you open decides which kind of proof you make.**

---

## 1. The separation *is* the interface

| | **soulbis.com/star** — the manifold | **soulbis.com/lattice** — the codex |
|---|---|---|
| **Observation** | **GENERATE** — presence | **CHARGE / SPEND** — proof |
| **Act** | run the succ cycle (the dance) | walk your poured `focus` to discharge it |
| **Accrues** | `trace` — laps · seconds · tourSeconds | `witness` — `{ spent:{vertex:amount}, complete, at }` |
| **Nature** | renewable, idle-friendly; presence is presence | deliberate, *earned*; the cell lights up when proven |
| **Resolves** | — | the "fixed-speed" worry: meaning comes from the *mode* (you chose to prove), not the speed |

Both proofs ride home in the one City Key (`trace` **and** `witness`). The "interesting maths" is the relationship between **generated presence** and **earned focus** — broad walking vs. converged, proven attention.

---

## 2. The VRC economy (closes the recursion)

Built on the existing primitives — `vrc-mana.ts` (monotonic earned), `vrc-allocation.ts` (committed stake), `city-key-charge.ts` (the return leg):

```
  EARN ──▶ COMMIT ──▶ PROVE ──▶ EARN MORE ──▶ (commit again)
  🪢 mana   pour focus   walk /lattice   charge witness
  (from     into seats   → witness        back on /city
   /star     (allocation) (spent mana)    (bonus VRC)
   trace +
   charges)
```

- **earned** = `getVrcMana()` — cumulative, never decreases.
- **committed** = Σ allocations — staked into seats; the City Key's `focus`.
- **free** = earned − committed.
- **You can commit, but only *proving* (walking /lattice) realises it.** Pour without walking = an unrealised claim; walk = the `witness`, the realised relationship.

---

## 3. agentprivacy mapping — the build (`city-key-charge.ts`)

Charging now reads **both** observations, deduped independently, recorded by kind:

- **Generate** — from `trace`: ~1 VRC per succ lap (+2 for a tour). Modest; presence deepens by returning, not grinding. Dedup on `trace.savedAt`.
- **Charge** — from `witness`: ~1 VRC per **proven** focus-mana (+ a completion bonus). The stronger signal — focus *claimed then walked*. Dedup on `witness.at`.
- The ledger tags each charge `kind: 'trace' | 'witness'`; **two totals** are exposed (`getGeneratedManaTotal`, `getWitnessManaTotal`) — the two values whose ratio is the bearer's focus-discipline.

`/city` (the canonical page — `/guide/achievements` now redirects here) already mints `focus` (from allocations) and imports to charge; this extends the import to also award from `witness`, shows the two sources behind the bearer's 🪢, and surfaces the **presence vs earned-focus split** under the VRC count.

---

## 4. The keys, on both sides

- **🗝️ City Key** — the artifact in play; carries `palette · descriptions · lit · identity · focus · trace · witness`. Produced on agentprivacy (`city-key.ts`), consumed/charged on soulbis (`/star` generate, `/lattice` charge), recharged on agentprivacy. **Both sides now share the two-value (trace+witness) contract** (interop spec updated).
- **⚔️ Swordsman's Key** — the ceremony ed25519 identity, stamped into the City Key's `identity`. Unchanged.
- **🧙 Mage's Key** — spellweb-minted credential, still future. Out of scope here; noted so the three-key map stays coherent across both repos.

---

## 5. The `/star` "walk the tour" timer — reconsidered

Under the model, **/star is generate-only**, so a tour *timer-as-proof* on /star is redundant (proof lives on /lattice). Decision:

- Keep `/star`'s free **succ cycle = generate** (`trace`: laps + seconds = presence).
- **Slight succ modification when a City Key is present:** the lit/`focus` vertices already tint coral as the comet passes — keep/strengthen that so the generate walk *acknowledges your key* without becoming a proof.
- The **key tour** stays as an optional *focused-generate* scenic route (visit your lit vertices); its `tourSeconds` is **presence, not proof** — folds into the generate signal (small tour bonus on charge). It is **not** the charge mechanic.
- Net: no separate "prove" UI on /star; the mana-bar / witness lives on /lattice. (If we later want one transport, the key tour could simply be dropped — flagged, not done.)

---

## 6. Status

- **Built (soulbis):** `/lattice` prove-your-focus + `witness` (corner lap-count by the ✦, cell lights up when proven, focus mana bar, witness round-trips + re-seeds on import). `/star` generate (`trace`). Camera export bakes the dark backdrop. City Key labels reconciled; PVM legend on `/lattice`.
- **Building (agentprivacy):** `city-key-charge.ts` extended to charge from `witness` (this chronicle's §3).
- **Open:** the exact charge rates / a `vrc:{generated,charged}` summary on the key; whether to retire the `/star` key tour entirely.

---

*Chronicle 2026-05-28 — generate is being there; charge is having walked it.* `(⚔️ ⊥ ⿻ ⊥ 🧙) 😊`
