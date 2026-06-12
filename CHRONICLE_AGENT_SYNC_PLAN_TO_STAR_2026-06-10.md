# Chronicle — how a coding agent updates THIS site to the star-repo work (2026-06-10)

**Status:** plan, not yet executed. The live source of truth for the walkable
model is now **`C:\Users\mitch\star`** (public: `github.com/mitchuski/star`).
This site's `/star` + `/lattice` are the 2026-05-28 deploy — they predate the
κ-labels, the /sigil page, the PNG carrier, and the geometry-in-key work.

> For the agent picking this up: read the star repo's `CLAUDE.md` (contracts),
> `HOW_THE_SIGIL_WORKS.md` (carrier mechanism), and `HOLOSPACE.md` (κ spec +
> conformance vector) BEFORE touching files here. This site's own `CLAUDE.md`
> (landing-page rules, colour law, wave field) remains binding for `index.html`.

## The sync, step by step

1. **Copy the two upgraded pages verbatim** (they are supersets of what's here,
   self-contained single files):
   - `C:\Users\mitch\star\star\index.html` → `star/index.html`
   - `C:\Users\mitch\star\lattice\index.html` → `lattice/index.html`
2. **Add the new third page**:
   - `C:\Users\mitch\star\sigil\index.html` → `sigil/index.html` (new route
     `/sigil` — flat static routing here means just the directory).
3. **Do NOT copy the star repo's root `index.html`** — that is the standalone
   portal. THIS site keeps its own landing (wave field, ecosystem, Built, the
   Key section). Instead, wire `/sigil` into the existing surfaces:
   - nav: add **Sigil** beside Star + Lattice;
   - the **Key** section (`#key`): the *Project* movement gains the third room
     (`/star` · `/lattice` · `/sigil`);
   - the Tetrahedra Forge tool card copy: mention the sigil + that the PNG
     carries the key.
4. **Verify before calling it done** (all locally, `npm run dev` → :8000):
   - all four routes 200; inline scripts parse (`new Function` extraction test);
   - the κ conformance vector holds: the /sigil default key derives
     `sha256:0b4916babe5eb17104b342ab06030f2071a818024b345bf6d2e4115617c3c527`;
   - carrier round-trip: export a sigil PNG → import it on `/star` → *κ
     verified* + manifold rebuilds the carried `geometry`;
   - BroadcastChannel cascade: key imported in one tab mirrors to the others
     (`'agentprivacy-succ'`, all three pages join it);
   - the helper-copy contract: `pngExtractKey`/`readKeyFile`/`b2s` byte-identical
     across the three pages, `pngEmbedKey`/`crc32` identical across /star+/sigil.
5. **Chronicle the sync** in `CHRONICLE.md` (this repo's running log) with the
   star-repo commit hash you synced from.

## Decisions the agent must NOT make alone (ask the user)

- **Deploy topology:** keep serving the pages from soulbis.com (sync like this,
  periodically), or redirect `soulbis.com/star|lattice|sigil` to the standalone
  star deploy once it has a domain. (The 06-10 graduation entry in CHRONICLE.md
  left this open.)
- **Whether soulbis.com mentions the holospace framing** on the landing (the
  Key section could carry one line; the landing's content rules apply).
- Anything touching the landing's wave field, colour law, or attribution.

## Why this sync matters (one line for the record)

The pages this site already hosts gained content-addressed identity (κ), a
third projection (/sigil), and a carrier format (the PNG that *is* the key) —
the Swordsman's surface should serve the Swordsman's current blade.

*Source of truth moved; the gate follows it.* `(⚔️ ⊥ ⿻ ⊥ 🧙) 😊`
