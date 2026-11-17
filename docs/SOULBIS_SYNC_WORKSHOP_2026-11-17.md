# Soulbis sync workshop — 17 Nov 2026

Status: LOCAL, uncommitted. §0 is applied. The rest is for decisions.

## 0. Applied in this pass

- **Nav order** everywhere: Star → Signatures → Lattice → Sigil → Skye → Guide.
- **Orb everywhere** (Mitch's pick): the word bar is gone from /guide /lattice /sigil /skye. Every room now loads `public/sitenav.js` (cache tag `v=20261117-orb`), and `.rooms-top` in `rooms.css` keeps 56px of headroom under the orb.
- **Landing**:
  - The "Sustaining the agent trust internet" block is removed.
  - The key section is cut to two short paragraphs. The quests sentence and "Hold … coming" are dropped.
  - The home note is one line.
  - The extension paragraph is folded into the Swordsman section.
  - Labs links are cut to Builds & research and Work with Labs.
  - The footer column "Forge key" is now "The rooms", in nav order.
  - Inline links are neutral white (they were browser-default blue).
- **Links**: `ecosystem/#myterms` now goes to `work/#project-myterms`; `/board/` now goes to `mages.city`. Nothing on the site points at .org's /fund /begin /ecosystem /board any more.
- **Guide**: §05 now reads "Five ways to read the key".
- Checked: every room returns 200 locally, and the orb renders on /guide at desktop and phone width. The phone hero text clips at the right edge; that was already true before these changes.

## 1. Decisions taken

| Question | Ruling |
|---|---|
| AP stars/constellation arriving in a key | **Faint read-only layer** on the Star: no numbers, off by default (not built yet) |
| Operating-model block | Removed |
| Nav skins | Orb everywhere |
| "Swordsman's Key" meaning | Open: see §3 |

## 2. Roles across the universe (one verb each)

| Site | Verb | Register |
|---|---|---|
| agentprivacy.ai | **learn & earn**: guide, trust tasks, stars, moons, the orb, key derivation | the Mage's voice; game |
| soulbis.com | **look & hold**: personal mirror for the keys you carry; local, no score | the Swordsman's voice; instrument |
| mages.city | **arrive & belong**: arrival, members, scrolls, seals | the City's voice; community |
| agentprivacy.org | **the research**: work, universe, services (narrowing to research + grants) | the lab's voice; plain |
| guide.agentprivacy.ai / HH | **the guide**: work, not research | Hitchhiker voice |
| sync.soulbis.com | **the letters** | privacymage casting |

## 3. Naming clash map

Counts are rough grep hits in source (soulbis · AP src · mages.city site · .org site · star-key).

| # | Term | Meanings in use now | Where | Weight |
|---|---|---|---|---|
| 1 | **Star** | (a) soulbis visualisation of your perspective · (b) AP **stars** = points/marks (★n, ≤42 per moon) · (c) AP "Your Star" / "Privacy Star" pages · (d) mages.city **star of the chains** (the City's evidence star) · (e) **Star Key** = the browser extension / VTA · (f) repo `mitchuski/star` | everywhere | **heaviest** |
| 2 | **Swordsman's Key** | (a) soulbis Star / `mitchuski/star` ("star — The Swordsman's Key") · (b) AP root signing key, derived from the orb (Ed25519 + ML-DSA-65, did:key) | soulbis 53, AP 24 | high |
| 3 | **City Key** | content-addressed **carrier** of the record (JSON/PNG), explicitly *not* a key | soulbis 226, AP 148, mages 74, star-key 94 | name contradicts the thing, but the most-used term |
| 4 | **Orb** | (a) AP **your orb** = the secret (emoji + proverb unlock) all keys derive from · (b) /orbs page = colours, blades, stickers · (c) **Drake Orb** = badge · (d) soulbis **Soul Orb** hero art · (e) soulbis corner nav orb | AP 60+58, soulbis | high: the secret shares a word with decoration |
| 5 | **Sigil** | (a) Sigil encoding (John Servil) for seals · (b) soulbis /sigil = your key's portrait · (c) AP "Sigil name" / "your sigil stays assigned" = personal glyph | all | medium |
| 6 | **Mage's Key** | legacy (the mymage extension), now merged into one Star Key on AP /orbs | soulbis 8 | low; retire |
| 7 | **moon key** | AP per-season signing key = orb + that moon's constellation root, bound by the root key | AP 16 | clean |
| 8 | **Guide** | soulbis /guide · guide.agentprivacy.ai · AP /guide (Drake Island) · HH Guide to Trust · Deep Thought guides | everywhere | medium |
| 9 | **Labs** | agentprivacy Labs (.org) · Lattice Labs (David) · Soulbis as parent of the labs | | medium |
| 10 | **Hold** | soulbis Hold (what others signed with you, carried as a root) · AP StarField "pin = one hold" | | low |

**Cross-universe equivalence:** in the Hitchhiker set, the **Towel** = identity, which *holds the keys* (Marvin uses them). That is the same role AP's **orb** plays. Make the naming a deliberate rhyme rather than an accident.

### Naming options for the thing that keeps many keys (now "orb")

| Name | Reads as | For | Against |
|---|---|---|---|
| **Orb** (keep) | a sphere that holds light | already 60+ uses; poetic; the Soul Orb art fits | clashes with /orbs colours, Drake Orb, the nav orb |
| **Hoard** | the dragon's keeping | Drake lore; "what you keep" is the Swordsman's job | sounds like accumulation |
| **Sheath** | where the Swordsman keeps the blade | pure Swordsman metaphor; blades already exist on /orbs | holds one blade, not many |
| **Soulstone** | the soul part of soulbis | ties Soulbis ↔ root secret | gamey |
| **Keystone** | the stone the arch rests on | exact: everything derives from it | dry |
| **Heart** | the centre | rhymes with Heart of Gold (HH) | that is the Embassy box |
| **Lantern** | carries the light you were given | soft; fits moons/stars | weak "keys" signal |

### A possible convention (to accept, amend or reject)

- **Orb** = only the secret that holds your keys. Decorative orbs become **colours / blades** (/orbs → "Colours & blades"), and Drake Orb → **Drake mark**.
- **Swordsman's Key** = only the root signing key from the orb. The soulbis Star and `mitchuski/star` stop using the phrase.
- **moon keys** = seasonal keys from the same orb.
- **Star Key** = the extension that holds the keys for you (your VTA).
- **City Key** stays (too widespread to rename), and always comes with "carries your record; not a signing key".
- **the Star** (singular, capital) = the visualisation; **stars** (lower case) = deliberate marks on AP; **star of the chains** = the City's. Or rename the points ("marks", "lights") and keep "Star" for the picture alone.
- **Sigil** = the encoding and seals; the soulbis room becomes **portrait** in prose ("the Sigil room draws your key's portrait"); the personal glyph becomes **your glyph**.

## 4. Soulbis itself: three faces on one domain

Soulbis is currently all three of these, and the landing only says the second and third:

1. **The company**: privacymage's business, the parent of the consultancy, advisory and research labs (Labs narrowing to research + grants; ARIA applicant = Soulbis + novation).
2. **The narrative root**: Soulbis the Swordsman, the boundary maker agent (`(⚔️ ⊥ ⿻ ⊥ 🧙) 😊`).
3. **The rooms**: Star, Signatures, Lattice, Sigil, Skye: personal instruments for understanding your keys.

**RULED: B.** Built locally:
- A company band under the hero ("Soulbis · the company — Consultancy · advisory · research labs", with links Work with Soulbis (mailto) and The research labs ↗).
- The Labs section now reads as the research arm of Soulbis.
- The hero and footer inscription image is now `canvas.lattice-orb` drawn by `public/lattice-orb.js`, using the /star geometry: 64 vertices, 96 boundary edges and the star tetrahedron. It stays still under reduced motion.

Landing shapes considered:

- **A. Company first.** Hero: Soulbis is a consultancy, advisory and research house for the agent trust internet. Then "the Swordsman" (the story the work grew from), then "the rooms" (try the instruments), then Labs/research. Fits a business card for clients and funders.
- **B. Swordsman first, company in a band.** Keep "Where the key lives" (Mitch likes the flow), and add a clear band under the hero: *Soulbis · consultancy · advisory · research labs*. The rooms follow.
- **C. Split the door.** The hero offers two clear paths: *Work with Soulbis* (company) | *Enter the Star* (rooms). The Swordsman story sits between them as the reason both exist.

The constraints from CLAUDE.md still apply: no pricing, no testimonials, attribution stays `privacymage / 0xagentprivacy`, the wave stays.

### Hero inscription: moving lattice-manifold Star

The hero and footer currently use `.shared-manifold-orb`, a static PNG (manifold/orb screenshot) over the SVG orb. Proposal: replace the PNG with a small canvas that draws the 64-vertex lattice star slowly turning, reusing the /lattice or /star geometry (read-only, no WebGL fallback needed: a 2D projection is enough at 180px). Keep the wave flowing behind it. Respect reduced motion (still frame). Keep the click-to-copy inscription.
