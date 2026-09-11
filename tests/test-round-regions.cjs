const assert=require('node:assert/strict'),M=require('../star/signature-math.js');
for(const sizes of [[64],[2420,666],[64,256,666]])for(const eps of [0,.2]){
 const out=M.roundRegions(sizes,eps);
 out.regions.forEach((r,i)=>assert.ok(Math.abs(M.volume(r.raw)-sizes[i]*.46/4627)<1e-10));
 out.route.segments.forEach((s,i)=>{const next=out.route.segments[(i+1)%out.route.segments.length];assert.ok(s.b.every((v,k)=>Math.abs(v-next.a[k])<1e-10));assert.ok(s.length>0);if(!s.connector){const r=out.regions[s.record];assert.ok(r.points.includes(s.a)&&r.points.includes(s.b));}});
 assert.ok(M.routePoint(out.route,out.route.length*.7).point.every(Number.isFinite));
}
console.log('PASS: spherical volume conservation, closed surface routes and explicit connectors.');
