/* lattice-orb.js — the moving lattice-manifold Star for the landing's inscription orbs.
   Same geometry as /star: the 64-vertex lattice {0,1}^6 projected on six icosahedral axes,
   its 96-edge holographic boundary (succ cycle + half-turn chords), and the star tetrahedron
   (coral = Swordsman, cyan = Mage). 2D canvas, no WebGL. Turns slowly; still under reduced motion.
   Usage: <canvas class="lattice-orb"></canvas> anywhere; this script finds and draws them all. */
(function () {
  "use strict";
  var PHI = (1 + Math.sqrt(5)) / 2, N = 64, BITS = 6;
  var gen = [[0,1,PHI],[0,1,-PHI],[1,PHI,0],[1,-PHI,0],[PHI,0,1],[PHI,0,-1]].map(function (v) {
    var L = Math.hypot(v[0], v[1], v[2]); return [v[0]/L, v[1]/L, v[2]/L];
  });
  var V = [], maxR = 0, x, b;
  for (x = 0; x < N; x++) {
    var p = [0,0,0];
    for (b = 0; b < BITS; b++) { var s = ((x >> b) & 1) - 0.5; p[0] += s*gen[b][0]; p[1] += s*gen[b][1]; p[2] += s*gen[b][2]; }
    V.push(p); maxR = Math.max(maxR, Math.hypot(p[0], p[1], p[2]));
  }
  V = V.map(function (p) { return [p[0]*0.8/maxR, p[1]*0.8/maxR, p[2]*0.8/maxR]; });
  var POP = []; for (x = 0; x < N; x++) { var c = 0, y = x; while (y) { c += y & 1; y >>= 1; } POP.push(c / BITS); }
  var E = []; for (x = 0; x < N; x++) E.push([x, (x+1) % N]); for (x = 0; x < 32; x++) E.push([x, x+32]);
  var k = 0.5;
  var TA = [[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]].map(function (v) { return v.map(function (c) { return c*k; }); });
  var TB = [[-1,-1,-1],[-1,1,1],[1,-1,1],[1,1,-1]].map(function (v) { return v.map(function (c) { return c*k; }); });
  var TE = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
  // coral #e8523a -> cyan #4dd9e8 by popcount
  function mix(t, a) { var r = Math.round(232 + (77-232)*t), g = Math.round(82 + (217-82)*t), bl = Math.round(58 + (232-58)*t); return "rgba(" + r + "," + g + "," + bl + "," + a + ")"; }

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canvases = [].slice.call(document.querySelectorAll("canvas.lattice-orb"));
  if (!canvases.length) return;

  function size(cv) {
    var d = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 120, h = cv.clientHeight || 120;
    if (cv.width !== Math.round(w*d) || cv.height !== Math.round(h*d)) { cv.width = Math.round(w*d); cv.height = Math.round(h*d); }
    return { w: cv.width, h: cv.height };
  }
  function rot(p, ay, ax) {
    var cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
    var X = p[0]*cy + p[2]*sy, Z = -p[0]*sy + p[2]*cy, Y = p[1]*cx - Z*sx; Z = p[1]*sx + Z*cx;
    return [X, Y, Z];
  }
  function draw(cv, t) {
    var S = size(cv), ctx = cv.getContext("2d"); if (!ctx) return;
    var R = Math.min(S.w, S.h) * 0.46, cx = S.w/2, cy = S.h/2, ay = t*0.00012, ax = 0.42 + Math.sin(t*0.00007)*0.12;
    ctx.clearRect(0, 0, S.w, S.h);
    // boundary sphere: one faint ring + a meridian
    ctx.lineWidth = Math.max(1, R*0.006);
    ctx.strokeStyle = "rgba(120,140,220,0.22)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.stroke();
    ctx.strokeStyle = "rgba(120,140,220,0.10)"; ctx.beginPath(); ctx.ellipse(cx, cy, R*Math.abs(Math.cos(ay)), R, 0, 0, Math.PI*2); ctx.stroke();
    var P = V.map(function (v) { return rot(v, ay, ax); });
    function sx(p) { return cx + p[0]*R; } function sy(p) { return cy - p[1]*R; }
    // 96-edge boundary
    ctx.lineWidth = Math.max(0.6, R*0.005);
    E.forEach(function (e) {
      var a = P[e[0]], c = P[e[1]], depth = ((a[2] + c[2]) / 2 + 1) / 2;
      var g = ctx.createLinearGradient(sx(a), sy(a), sx(c), sy(c));
      g.addColorStop(0, mix(POP[e[0]], 0.10 + 0.28*depth)); g.addColorStop(1, mix(POP[e[1]], 0.10 + 0.28*depth));
      ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(sx(a), sy(a)); ctx.lineTo(sx(c), sy(c)); ctx.stroke();
    });
    // star tetrahedron
    [[TA, "rgba(232,82,58,"], [TB, "rgba(77,217,232,"]].forEach(function (pair) {
      var Q = pair[0].map(function (v) { return rot(v, ay, ax); });
      ctx.lineWidth = Math.max(1, R*0.012);
      TE.forEach(function (e) {
        var a = Q[e[0]], c = Q[e[1]], depth = ((a[2] + c[2]) / 2 + 1) / 2;
        ctx.strokeStyle = pair[1] + (0.35 + 0.5*depth) + ")";
        ctx.beginPath(); ctx.moveTo(sx(a), sy(a)); ctx.lineTo(sx(c), sy(c)); ctx.stroke();
      });
    });
    // the 64 vertices, far ones dimmer
    P.forEach(function (p, i) {
      var depth = (p[2] + 1) / 2, r = Math.max(0.8, R*(0.012 + 0.012*depth));
      ctx.fillStyle = mix(POP[i], 0.35 + 0.6*depth);
      ctx.beginPath(); ctx.arc(sx(p), sy(p), r, 0, Math.PI*2); ctx.fill();
    });
  }

  var visible = new Set(canvases);
  if ("IntersectionObserver" in window) {
    visible = new Set();
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); }); });
    canvases.forEach(function (c) { io.observe(c); });
  }
  if (reduced) {
    var still = function () { canvases.forEach(function (c) { draw(c, 9000); }); };
    still(); window.addEventListener("resize", still); return;
  }
  function frame(t) { visible.forEach(function (c) { draw(c, t); }); requestAnimationFrame(frame); }
  canvases.forEach(function (c) { draw(c, 0); });
  requestAnimationFrame(frame);
})();
