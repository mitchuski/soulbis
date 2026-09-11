const assert=require('node:assert/strict');
const M=require('../star/signature-math.js');
for(const sizes of [[64],[2420,666],[64,64,256,666,1280,2420]]){
 const t=M.territory(sizes),r=M.edgeRoute(t);
 for(let i=0;i<r.segments.length;i++){
  const s=r.segments[i],next=r.segments[(i+1)%r.segments.length],c=t.cells[s.record];
  assert.ok(s.length>0);
  assert.ok(s.b.every((v,k)=>Math.abs(v-next.a[k])<1e-12),'continuous closed route');
  for(const pt of [s.a,s.b])assert.ok(Math.abs(pt[2]-t.side/2)<1e-12&&pt[0]>=c.x-c.width/2-1e-12&&pt[0]<=c.x+c.width/2+1e-12);
  const mid=M.routePoint(r,s.start+s.length/2);assert.equal(mid.record,s.record);
 }
 const a=M.routePoint(r,0),b=M.routePoint(r,r.length);assert.deepEqual(a,b);
}
console.log('PASS: closed continuous routes, region ownership, edge bounds, and wraparound.');
