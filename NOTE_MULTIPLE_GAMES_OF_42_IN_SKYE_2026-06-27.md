# NOTE · Multiple Games of 42 in the soulbis interface — the /skye low level

**Date:** 2026-06-27
**Status:** Explanation note + direction. **Decision taken:** build the overlap at the **/skye low level first**; everything else stays exploratory/uncommitted.
**Companions:** `PLAN_INTEGRATION_VIZ_KEY_GAME42_2026-06-27.md` (the keystone export) · `game42/chronicles/2026-06-27_suggestion_shared_holokey_with_soulbis_star.md`.

---

## 1. Why this note exists
We want more than one Game of 42 to live inside the soulbis interface so the games *overlap* — share ground, show lineage, compare. But the **full shape of a Game of 42 is not settled** (the 42-slot interior, the fold, the presets, the fractal seam are all still moving). So this note does two things:
1. Names the **stable seam** an integration can safely bind to today.
2. Records the **decision to build at the /skye level first**, with the richer `/star` overlaps left outlined-but-uncommitted.

## 2. The stable seam (bind only to this)
A sealed game exposes four things that are already locked and will not change as the game's interior evolves:

| Field | What it is | Source |
|---|---|---|
| `seal` | the group seal — one SHA-256 over all 42 κ-labels + geometryHash | game42 `groupSeal` |
| `kappa` | the key's content identity (`sha256:…`), re-derivable on import | shared `holokey` |
| `axisBitmask` | which of the six axes locked — a 6-bit number 0…63 | the six locked heptads |
| `packets` | `{root: seal, count: 42}` — the proof digest | game42 carrier |

**Rule:** overlap reads `{seal, kappa, axisBitmask, packets}` and *nothing inside the game*. The 42-slot layout, the fold geometry, the preset vocabularies, the fractal seam all stay game-side. This is what lets us add games now without freezing their shape.

## 3. The four overlap shapes (the menu, for the record)
Lowest commitment first. **We are starting at #3 (Skye), which is the substrate the others read from.**

1. **Overlay** — one `/star` lattice, many constellations. Each game lights its six axis-basis vertices `{1,2,4,8,16,32}` + apex `63` in its preset tint; shared axes brighten. System: extend `/star` `lit[]` → `lits:[{seal,axes,tint}]`; overlap = bitmask-AND. *Low; visible shared ground; best ≤~5 games.*
2. **Gallery** — small-multiples of mini-stars, one per game, click to focus. System: N City-Key projections, each its own render. *Visual overlap, not computed; "a city of games."*
3. **Skye (CHOSEN low level)** — game seals rise as κ-placed stars in `/skye`; `/star` stays single-focus and you pick one to walk; overlap = gold lineage threads (`prior` κ-chain) + teal DH-PSI common ground. System: **reuses what `/skye` already does** — κ-placement, lineage, PSI. A game seal is just a key with `packets.root`. *Lowest build; it is the plurality substrate.*
4. **Composite super-seal** — games fold into a higher "city" game; `/star` renders the meta-lattice. System: packets/Merkle parent digest over child seals = game42's deferred fractal seam. *North star; binds the unsettled shape; do not build yet.*

**Composition:** 3 → 1 → 4. Skye holds the many (now); Star overlays a small selected set later; the super-seal waits for the fractal seam to settle.

## 4. What "build at the /skye low level" means concretely
`/skye` is already the night of many keys — it ingests keys (JSON or PNG), places each as a star by its κ, draws gold lineage threads (`prior`) and teal common-ground threads (DH-PSI). Building the games-of-42 overlap *here* means establishing the data model — **a game = a key bearing a seal + axisBitmask** — at the plurality layer before any `/star` visual work.

The low-level work (all additive, none committing the game's shape):
- **Carrier:** `/skye` accepts a game42 seal-PNG. Cleanest path = the dual-chunk PNG from the integration plan (a `cityKey` projection chunk alongside the `game42` log chunk), so `/skye` reads it with the keyword it already knows. Fallback = teach `/skye`'s extractor the `game42` keyword + run `game42ToCityKey`.
- **Star placement:** a game rises like any key, placed by `kappa`. Its label/tint comes from `preset`; its scope for common-ground = the `axisBitmask` (which axes it sealed).
- **Lineage:** if a game carries `prior` (the κ of a parent game/seal), draw the gold thread — forge V1 → V2 → … shows as ancestry in the sky.
- **Common ground:** two games' DH-PSI intersects over their sealed axes/slots — "these two cities locked the same axes" — without revealing interiors.
- **Sky shot:** the existing `citySky` PNG export already snapshots the whole night; a sky of game-seals round-trips for free.

Result: many Games of 42 coexist as stars, with lineage and shared-ground visible, on the room *designed* for plurality — and `/star` overlay (#1) and the super-seal (#4) later read the same star-set, no rework.

## 5. Constraints / guardrails
- **Byte-identical sync:** `/skye` exists in both `soulbis website/skye/` and `star/skye/`; any edit must `cp`-propagate and byte-verify.
- **κ stability:** the seam's `kappa` is stamped with the soulbis parameterization (`sha256:` prefix, exclude-only-`kappa`) so re-derivation on import reads "verified"; depends on the Phase-0 `holokey.js`.
- **No-commit posture:** only the four-field seam and `/skye` ingest are in scope. `/star` overlay, gallery, and super-seal stay outlined here, unbuilt.
- **No-push discipline:** report status; Mitch triggers commits/pushes.
