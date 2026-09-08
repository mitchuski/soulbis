# Core artefact, moving ceiling and the VTA browser connection

Status: local renderer and image carrier implemented, 8 September 2026; authenticated custody, Archon publishing and the extension connection remain proposed. Origin: [First Person observation](../../codex_mage/observations/2026-09-08_core-artefact-moving-ceiling.md).

## Current local carrier and Archon direction

Customise → Core groups the image, reveal ratio and surrounding glow. The image remains whole; 100% removes its shading and renders it above the surrounding glow. JSON downloads carry an additive `coreArtefact` object: `{version:1, kind:"image", image:"data:image/png;base64,…", visibility:0.6, glow:true}`. The image is a cropped 512px PNG. Portrait embeds the same payload when a key is loaded. Imports restore the image covered, retaining its selected visibility; cover is a visual preference, not encryption. Embedded bytes are readable by recipients and travel through the existing same-origin key broadcast. Unsupported records are preserved without fetching remote resources. Cross-room preservation still needs end-to-end validation.

For persistent publication, use [Archon's draft did:cid specification](https://archon.technology/specs). Its identifier hashes a canonical creation operation, not the raw image. An agent DID controls an asset DID; that asset's application data can reference the core image's separate pinned IPFS URI. A future carrier should retain the asset DID, immutable image CID and resolved version/provenance alongside an optional portable preview. Do not construct an asset DID by adding `did:cid:` to an image CID.

The extension should resolve and verify the asset and controller, validate content against its CID, then supply the permitted preview to Soulbis. Publishing requires an explicit choice of public or encrypted content and a configured pinning service; an address alone does not ensure availability. Nothing in this local implementation creates a DID, pins an image, verifies ownership, or connects a wallet. The following custody and assessment sections describe that future integration.

This follows the [Codex Mage core proposal](../../codex_mage/proposals/STAR_CORE_ARTEFACT.md), including its compact City/extension orb. The active ceiling source is the Soulbis checkout, distinct from the sibling Star checkout inspected by that proposal.

## Purpose and placement

Give the Star a recognisable centre: a chosen image, or a permitted preview of an artefact that matters to the observer. It is the “core PFP” of this expression. Its surrounding geometry continues to express the agentprivacy model and the observer's permitted perspective.

Keep the coral Swordsman and cyan Mage tetrahedra, their proportions, lattice coordinates, paths and existing shape mappings. Add a small presentation layer at the existing heart position. Default to the original luminous heart. A portrait is an optional camera-facing disc within a transparent orb, so it remains readable while the tetrahedra turn. An artefact without a permitted image uses a neutral glyph and title. The core is not a new model vertex or proof of identity.

Begin at the current heart's scale; assess readability on mobile before introducing a bounded enlargement. Avoid opaque geometry that obscures the tetrahedra, and do not resize the model to fit an avatar. Provide the same title, status and description in an accessible Core panel. Selecting the core opens that panel; Customise → Core provides an equivalent touch/keyboard path without relying on WebGL hit testing. Keep the four minimised corner controls.

## What the existing ceiling actually does

The inspected Soulbis implementation defines `R(t) = R₀ exp(g t)` and `t* = ln(1/R₀)/g`. Defaults are R₀ = 0.35 and g = 0.25 per year, giving approximately 4.2 years in that scenario. The page itself labels the rate unparameterised and the sliders a what-if.

`ensureCeilShell()` builds the enclosing shell; `applyCeiling()` updates its reading. `tick()` contracts and colours the shell, pulses the central heart when R ≥ 1, and applies a display-only 1.5-second half-life to the visual path value while the relevant tracing branch runs. That visual half-life is an animation choice, not an information lifetime. These effects do not rewrite the key's contents.

The proposed core makes explicit what is being protected. It must not turn the existing scenario into a measurement merely by placing someone's image inside it.

## Three readings, kept distinct

| Reading | Meaning | Core presentation |
|---|---|---|
| Reconstruction horizon | A scenario or supported assessment of adversarial reach against a named information set | Separate rim/veil, source and assessment date |
| Evidence freshness | Whether a named record has a current assessment or valid evidence | Text status: current, stale, expired, revoked or unknown |
| Artefact availability | Whether this observer may retrieve the selected content | Preview, placeholder or unavailable state |

For the exponential scenario, a display margin may be `clamp(1 − R(t), 0, 1)`. This is a normalised visual margin, not a probability of safety, remaining entropy or a trust score. Label it “Scenario” unless a source supports the parameters for this particular artefact and threat model. At R ≥ 1 show “Scenario threshold reached”, not “Your information was compromised”. Keep the full unbounded R value in the details even when the visual rim saturates.

Keep the actual portrait pixels stable. Let a neutral/violet veil change around them, with the existing coral alert treatment near the threshold. An optional illustrative dissolve may affect a disposable display texture only and must be explicitly labelled; it is not the initial implementation. Colour is supplemented by text and a nonanimated reading. Unknown assessments use a neutral rim, never an invented healthy percentage.

Assess a named subject. An avatar may stand for a private document or information set, but the panel must name that relationship. A public avatar's own exposure is different from the reconstruction risk of the private artefact it represents. Do not use one generic timer for all of an agent's memory. Clock passage, credential expiry, actual revocation and retention deletion are different events.

## Carrier and rendering contract

Propose an additive, versioned `coreArtefact` block; do not overload `figures`, change `FIG-2.0` or redefine κ. Final field names require an interop fixture before shipping.

- **Presentation:** schema version, kind (`heart`, `image`, `artefact`), accessible title/description, crop and an approved preview reference/digest.
- **Assessment:** subject reference, basis (`scenario` or `assessment`), model/version, source/evidence reference, assessed-at time, units, R₀ and g when supported, threat scope and horizon. No parameters means unassessed. A signed assessment is only verified under the actual verifier's stated checks.
- **Freshness:** separate evidence status and validity information. An assessment date does not implicitly reset expiry or erase an earlier exposure.

Separate two functions: `SHAPE(approvedProjection)` keeps the existing deterministic geometry contract; `CORE_VIEW(approvedCore, assessment, asOf)` computes the presentation at an explicit time. Wall-clock animation never silently changes canonical key content or κ. Changing the selected portrait, crop or committed assessment is an explicit versioned edit under the existing lineage rules. Merely opening the file later does not remint it.

A private source reference stays in the VTA or private carrier. Do not auto-fetch arbitrary URLs or broadcast opaque private extension fields to render the core. Decode an explicitly selected image locally, bound byte size and dimensions, remove metadata from a derived preview, and dispose textures/object URLs on replacement. For the first implementation use raster previews; an artefact is not executable page content.

Export must distinguish “picture only” from “picture with approved key payload”. Both disclose the visible portrait and any visible assessment. Neither includes the private source by default. Existing legacy carriers currently preserve unknown fields; that is compatibility, not an audience filter. Produce an allowlisted approved projection before any public render, cross-page sync or export. Even a stable digest or distinctive portrait can link encounters.

## Browser extension transition

The [OpenVTC browser project](https://github.com/OpenVTC/vta-browser-plugin#readme), inspected 8 September 2026, describes passkey/VTA DID binding and PWA/MV3 shells over WalletSession. Its README still describes RP login-page interception as future work. The core below is a Soulbis integration proposal, not an existing upstream capability.

1. **Select:** in the extension, choose the VTA identity and its bound City Key. Show the core preview as a recognition cue alongside the identity name, connection state and key version.
2. **Inspect:** open the core card to choose a portrait or artefact and inspect its assessment. “No assessment” is a valid starting state. Changing a picture does not authenticate a different identity.
3. **Approve a view:** for the requesting City/Soulbis origin and audience, select the permitted preview and assessment details. The authenticated service resolves access to the source artefact and returns only the approved projection.
4. **Render:** the page validates the message schema, sender/origin, session, audience, selected identity/key binding and request freshness. The extension bridge must be origin-scoped; the existing same-origin BroadcastChannel is not the cross-site transport. Keep credentials and private source retrieval outside page content.
5. **Act and update:** City services check the exact requested action and current entitlement. Approved results and receipts may produce a new assessment or key version. Sign-in, a matching portrait and a matching κ cannot grant that action themselves.
6. **End or switch:** clear the old preview, decoded textures, assessment and pending requests on disconnect, identity/audience change or revoked view permission. Reject late responses from the prior session. Offline views state their last assessment time; they cannot assert fresh entitlement.

The extension's compact view can use the same core and rim without rendering the entire animated Star. Opening Soulbis gives the larger geometric perspective. Use a static compact rendering for reduced-motion and low-power contexts. Do not derive real elapsed years from animation frames or reset the horizon whenever the extension opens.

## Build sequence and acceptance

1. **Local presentation:** optional image/artefact fixture in the existing heart position, original heart fallback, accessible Core panel. Check no changes to tetrahedra, model coordinates, slider defaults or measured geometry. Verify small-screen legibility and texture cleanup.
2. **Explicit scenario:** reuse the current ceiling parameters and shell; expose the subject, units and as-of time. Test R₀=0.35/g=0.25, threshold equality, beyond-threshold saturation, g=0, invalid/negative inputs, future assessment dates and unknown source data. No automatic key mutation or deletion.
3. **Carrier compatibility:** JSON and image-carrier round trips across Star, Lattice, Sigil and Skye; preserve old keys without a core block. Verify unchanged re-export κ, explicit edits/prior, bounded asset references and picture-only versus payload exports. Do not copy the sibling Star checkout over Soulbis.
4. **Extension read-only slice:** synthetic identity and artefact first, then an explicitly selected real VTA record. Pin the actual upstream API/version. Prove that wrong origins, copied keys, audience changes, late responses and disconnect cannot display the wrong private core. No state writes in this slice.
5. **One City encounter:** bind a permitted action to its actual receipt and an explicit record update, following the existing private-perspective proposal. Only after this works end-to-end describe the core as connected agent state.

Initial acceptance: default Star preserved; optional central preview; honest scenario/assessment distinction; one versioned approved projection; no private-content leak on render, sync, export or observer switch. A live production decay assessment is outside the first milestone until its source and parameter calibration exist.

## Existing model and integration references

- [Soulbis Star implementation](../star/index.html): `buildCore`, `ceilR`, `ceilTstar`, `applyCeiling`, `tick`, `loadConfig`, `buildExportCfg`.
- [Measured geometry evolution](../../star/PLAN_KEY_EVOLUTION_MEASURED_GEOMETRY_2026-06-10.md): existing versioned geometry rule; historical design statements need checking against each checkout.
- [Star as model](../../codex_mage/STAR_AS_MODEL.md): observer, evidence and geometry invariants.
- [Private perspective proposal](../../codex_mage/proposals/CITY_KEY_PRIVATE_PERSPECTIVE.md): custody, presentation and service decision.
- [Soulbis/City compatibility](star-city-compatibility.md): carrier preservation and extension integration boundary.
