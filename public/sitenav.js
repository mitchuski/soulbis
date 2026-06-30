/* sitenav.js — the collapsible corner nav for the Swordsman's Key rooms.
   One component, lives top-left on every experience page (/star /lattice /sigil /skye /guide).
   Collapsed: a small column of emoji buttons. Expanded (hover, or click to pin): the emoji
   open into word descriptions, with the current room's title information at the top.

   A page may set, before this script loads:
     window.SITENAV = {
       actions: [ {id, ico, name, title} ... ]   // page-local buttons folded into the nav
                                                  // (wire them on the 'sitenav:ready' event)
     };
   Everything else (links, per-room title cards) is canonical and lives here. */
(function () {
  "use strict";
  if (window.__sitenavBuilt) return;
  window.__sitenavBuilt = true;
  var CFG = window.SITENAV || {};

  // The rooms of the key — the canonical loop. ico = the small emoji button; tag = the word.
  var ROOMS = [
    { p: "/",        ico: "⌂",  name: "home",     tag: "the surface" },
    { p: "/star",    ico: "⚔️", name: "/star",    tag: "walk it" },
    { p: "/lattice", ico: "🧙", name: "/lattice", tag: "prove it" },
    { p: "/sigil",   ico: "🪬", name: "/sigil",   tag: "name it" },
    { p: "/skye",    ico: "🌌", name: "/skye",    tag: "gather it" },
    { p: "/guide",   ico: "🗡️", name: "/guide",   tag: "how it works · the Game of 42" }
  ];
  // Per-room title information — surfaced at the head of the expanded panel.
  var TITLES = {
    "/":        { eyebrow: "soulbis · the swordsman", title: "Soulbis",                  meta: "(⚔️ ⊥ ⿻ ⊥ 🧙) 😊" },
    "/star":    { eyebrow: "holographic boundary · V5.4", title: "Star Tetrahedron Manifold", meta: "r(θ,φ) = R + ε·sin(mφ)·cos(nθ)", note: "∂M : 96 edges encode 64 vertices · 96/64 = 1.5 = P¹·⁵" },
    "/lattice": { eyebrow: "the lattice as manifold",  title: "The 64 · Vertex Codex",   meta: "V(π,t) on ∂M · 96 → 64" },
    "/sigil":   { eyebrow: "the κ derivation",         title: "The Sigil",               meta: "κ = sha256: H(key)" },
    "/skye":    { eyebrow: "the night of many keys",   title: "Skye",                    meta: "lineage · common ground" },
    "/guide":   { eyebrow: "how the key works",        title: "The Swordsman Guide",     meta: "walk · prove · name · gather" }
  };

  function currentPath() {
    var p = (location.pathname || "/").replace(/\/index\.html?$/i, "").replace(/\.html?$/i, "");
    if (p.length > 1) p = p.replace(/\/$/, "");
    if (p === "" ) p = "/";
    // tolerate flat-folder deploys (/star/ , /star/index.html already handled)
    return p;
  }

  var here = currentPath();
  var T = TITLES[here] || null;
  var esc = function (s) { return String(s).replace(/[<>&]/g, function (c) { return ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]; }); };

  // ---- styles (scoped, self-contained; leans on page CSS vars where present) ----
  var css = "" +
    "#snav{position:fixed;top:20px;left:20px;z-index:60;font-family:'Spline Sans Mono',ui-monospace,monospace;" +
      "--snav-ink:#e8edff;--snav-dim:#7c86b8;--snav-line:rgba(120,140,220,0.18);--snav-glass:rgba(10,13,28,0.72);" +
      "--snav-sword:#e8523a;--snav-mage:#4dd9e8;}" +
    "#snav *{box-sizing:border-box;}" +
    "#snav .snav-panel{display:flex;flex-direction:column;gap:5px;width:52px;padding:7px;border-radius:15px;" +
      "background:var(--snav-glass);border:1px solid var(--snav-line);backdrop-filter:blur(14px) saturate(1.1);" +
      "-webkit-backdrop-filter:blur(14px) saturate(1.1);box-shadow:0 18px 48px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.05);" +
      "transition:width .34s cubic-bezier(.2,.8,.2,1);overflow:hidden;}" +
    "#snav[data-open='true'] .snav-panel{width:248px;}" +
    "#snav .snav-toggle{display:flex;align-items:center;gap:9px;width:100%;padding:5px 6px;border:none;background:none;" +
      "cursor:pointer;color:var(--snav-ink);font-family:inherit;border-radius:9px;}" +
    "#snav .snav-toggle:hover{background:rgba(120,140,220,0.10);}" +
    "#snav .snav-orb{width:22px;height:22px;flex:0 0 22px;border-radius:50%;" +
      "background:radial-gradient(40% 40% at 42% 38%,#4dd9e8,#8b4daa 52%,#e8523a);box-shadow:0 0 12px rgba(139,77,170,0.6);}" +
    "#snav .snav-tlabel{flex:1;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:var(--snav-dim);" +
      "white-space:nowrap;opacity:0;transition:opacity .2s;}" +
    "#snav[data-open='true'] .snav-tlabel{opacity:1;}" +
    "#snav .snav-chev{color:var(--snav-dim);font-size:14px;transition:transform .34s;opacity:0;}" +
    "#snav[data-open='true'] .snav-chev{opacity:1;transform:rotate(90deg);}" +
    "#snav .snav-card{max-height:0;opacity:0;overflow:hidden;transition:max-height .34s,opacity .24s,margin .34s;margin:0 4px;}" +
    "#snav[data-open='true'] .snav-card{max-height:200px;opacity:1;margin:2px 4px 8px;padding-bottom:9px;border-bottom:1px solid var(--snav-line);}" +
    "#snav .snav-eyebrow{font-size:8.5px;letter-spacing:0.26em;text-transform:uppercase;color:var(--snav-dim);margin-bottom:6px;white-space:nowrap;}" +
    "#snav .snav-title{font-family:'Fraunces',Georgia,serif;font-weight:300;font-style:italic;font-size:18px;line-height:1.04;" +
      "background:linear-gradient(100deg,#9fc0ff,#e8edff 46%,#ffb9a6);-webkit-background-clip:text;background-clip:text;color:transparent;}" +
    "#snav .snav-meta{margin-top:7px;font-size:10px;color:#aeb8ee;letter-spacing:0.01em;}" +
    "#snav .snav-note{margin-top:6px;font-size:9px;line-height:1.5;color:var(--snav-dim);}" +
    "#snav .snav-link{display:flex;align-items:center;gap:0;text-decoration:none;color:var(--snav-ink);" +
      "border-radius:9px;padding:6px;transition:background .16s;position:relative;}" +
    "#snav .snav-link:hover{background:rgba(120,140,220,0.12);}" +
    "#snav .snav-link .ico{flex:0 0 24px;width:24px;text-align:center;font-size:16px;line-height:1;filter:grayscale(.55);opacity:.62;transition:filter .18s,opacity .18s;}" +
    "#snav .snav-link:hover .ico,#snav .snav-link.is-current .ico{filter:none;opacity:1;}" +
    "#snav .snav-words{display:flex;flex-direction:column;min-width:0;margin-left:9px;opacity:0;width:0;overflow:hidden;transition:opacity .2s;white-space:nowrap;}" +
    "#snav[data-open='true'] .snav-words{opacity:1;width:auto;}" +
    "#snav .snav-words b{font-weight:500;font-size:12px;letter-spacing:0.04em;color:var(--snav-ink);}" +
    "#snav .snav-words i{font-style:normal;font-size:9.5px;color:var(--snav-dim);letter-spacing:0.02em;margin-top:1px;}" +
    "#snav .snav-link.is-current{background:rgba(232,82,58,0.10);}" +
    "#snav .snav-link.is-current::before{content:'';position:absolute;left:0;top:18%;bottom:18%;width:2px;border-radius:2px;background:linear-gradient(180deg,var(--snav-mage),var(--snav-sword));}" +
    "#snav .snav-acts{display:flex;flex-direction:column;gap:5px;margin-top:5px;padding-top:6px;border-top:1px solid var(--snav-line);}" +
    "#snav .snav-link.snav-act{cursor:pointer;background:none;border:none;width:100%;font-family:inherit;text-align:left;}" +
    "body.focus #snav{opacity:0 !important;pointer-events:none !important;transition:opacity .6s ease;}" +
    "@media (max-width:760px){#snav{top:12px;left:12px;}#snav[data-open='true'] .snav-panel{width:226px;}}";

  var st = document.createElement("style");
  st.id = "snav-style";
  st.textContent = css;
  document.head.appendChild(st);

  // ---- markup ----
  var aside = document.createElement("aside");
  aside.id = "snav";
  aside.setAttribute("aria-label", "Rooms of the key");
  aside.dataset.open = "false";

  var html = "<div class='snav-panel'>";
  html += "<button class='snav-toggle' type='button' aria-expanded='false' aria-label='Open navigation'>" +
            "<span class='snav-orb'></span><span class='snav-tlabel'>rooms of the key</span><span class='snav-chev'>›</span></button>";
  if (T) {
    html += "<div class='snav-card'>";
    if (T.eyebrow) html += "<div class='snav-eyebrow'>" + esc(T.eyebrow) + "</div>";
    if (T.title)   html += "<div class='snav-title'>" + esc(T.title) + "</div>";
    if (T.meta)    html += "<div class='snav-meta'>" + esc(T.meta) + "</div>";
    if (T.note)    html += "<div class='snav-note'>" + esc(T.note) + "</div>";
    html += "</div>";
  }
  ROOMS.forEach(function (r) {
    var cur = r.p === here ? " is-current" : "";
    html += "<a class='snav-link" + cur + "' href='" + r.p + "'" + (cur ? " aria-current='page'" : "") + ">" +
              "<span class='ico'>" + r.ico + "</span>" +
              "<span class='snav-words'><b>" + esc(r.name) + "</b><i>" + esc(r.tag) + "</i></span></a>";
  });
  var acts = Array.isArray(CFG.actions) ? CFG.actions : [];
  if (acts.length) {
    html += "<div class='snav-acts'>";
    acts.forEach(function (a) {
      html += "<button class='snav-link snav-act' type='button' id='" + esc(a.id) + "' title='" + esc(a.title || a.name || "") + "'>" +
                "<span class='ico'>" + (a.ico || "•") + "</span>" +
                "<span class='snav-words'><b>" + esc(a.name || "") + "</b>" + (a.tag ? "<i>" + esc(a.tag) + "</i>" : "") + "</span></button>";
    });
    html += "</div>";
  }
  html += "</div>";
  aside.innerHTML = html;

  function build() {
    document.body.appendChild(aside);

    var pinned = false, hovering = false;
    var toggle = aside.querySelector(".snav-toggle");
    var fine = window.matchMedia && window.matchMedia("(pointer:fine)").matches;

    function sync() {
      var open = pinned || (hovering && fine);
      aside.dataset.open = open ? "true" : "false";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    toggle.addEventListener("click", function () { pinned = !pinned; sync(); });
    aside.addEventListener("mouseenter", function () { hovering = true; sync(); });
    aside.addEventListener("mouseleave", function () { hovering = false; sync(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && pinned) { pinned = false; sync(); } });

    // let the host page wire any folded-in action buttons now that they exist in the DOM
    document.dispatchEvent(new Event("sitenav:ready"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
