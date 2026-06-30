# Chronicle — the many Games of 42 will overlap at /skye first

**Date:** 2026-06-27
**Reads with:** `NOTE_MULTIPLE_GAMES_OF_42_IN_SKYE_2026-06-27.md` · `PLAN_INTEGRATION_VIZ_KEY_GAME42_2026-06-27.md`

## What was decided
We want multiple Games of 42 to live inside the soulbis interface and overlap. The full shape of a Game of 42 is still moving, so rather than commit to a rich `/star` rendering, we chose to build the overlap **at the /skye low level first** — the room already designed to hold many keys.

## The reasoning, briefly
A sealed game already exposes four things that won't change as the game's interior evolves: its **seal**, its **κ-label**, the **six-axis bitmask** of which axes locked, and its **packets** digest. We bind the overlap to *only* those four and read nothing inside the game. That seam lets us add games today without freezing their shape — the 42-slot layout, the fold, the presets, the fractal seam all stay game-side and free to change.

Four overlap shapes were laid out (Overlay on one /star lattice · Gallery of mini-stars · the Skye route · a composite super-seal). They compose 3 → 1 → 4. `/skye` is the substrate the others read from: once a game is a star in the sky, the future `/star` overlay and the super-seal both inherit the same star-set with no rework. So `/skye` is where the foundation goes.

## What "the low level" is
`/skye` already places keys as κ-positioned stars, draws gold lineage threads (`prior`) and teal common-ground threads (DH-PSI), and round-trips the whole night as a `citySky` PNG. Building here means establishing one fact at the plurality layer — **a Game of 42 is a key bearing a seal + an axis-bitmask** — and letting the room's existing machinery do the rest: a game rises like any key, lineage shows as ancestry, two games' shared sealed axes show as common ground, all without revealing interiors.

The ingest path is additive: read the dual-chunk seal-PNG from the integration plan (a `cityKey` projection chunk so `/skye` reads the keyword it already knows), place by `kappa`, tint by `preset`, scope common-ground by `axisBitmask`.

## What is explicitly NOT committed
- The rich `/star` overlay (#1), the gallery (#2), and the super-seal / fractal seam (#4) are outlined and parked, not built.
- The game's interior shape stays open.
- This depends on the Phase-0 shared `holokey.js` for a κ that re-derives "verified" on import.

## Guardrails carried forward
`/skye` is byte-identical across `soulbis website/` and `star/` — edits `cp`-propagate and byte-verify. No pushes without an explicit ask; status reported, Mitch triggers commits.

## Next, when we build
Wire `/skye` to ingest a game42 seal-PNG and raise it as a star — the smallest real step that makes two Games of 42 overlap on screen.
