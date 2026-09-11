const assert=require('node:assert/strict');
const M=require('../star/signature-math.js');
for(const sizes of [[2420],[2420,2420],[666,64,256],[4096,4096],[4627,4627]]){
 const t=M.territory(sizes,8192);
 assert.equal(t.total,sizes.reduce((a,b)=>a+b,0));
 assert.equal(t.fits,t.total<=8192);
 let edge=-t.side/2;
 for(const c of t.cells){
  assert.ok(Math.abs(c.x-c.width/2-edge)<1e-12);
  assert.ok(Math.abs(c.width*t.side*t.side-c.bytes*.46/4627)<1e-12);
  edge=c.x+c.width/2;
 }
 if(t.fits)assert.ok(edge<=t.side/2+1e-12);
}
assert.equal(M.territory([4096,4096],8192).remaining,0);
assert.equal(M.territory([4096,4097],8192).fits,false);
console.log('PASS: folded regions preserve byte volume, tile without overlap, and enforce capacity boundary.');

for (const capacity of [8192,24576,49152]) {
 const t=M.territory([capacity/2,capacity/2],capacity);
 assert.equal(t.remaining,0);
 assert.equal(t.fits,true);
 assert.equal(M.territory([capacity,1],capacity).fits,false);
 assert.ok(Math.abs(t.cells.reduce((v,c)=>v+c.width*t.side*t.side,0)-capacity*.46/4627)<1e-9);
}
assert.equal(M.territory([17088]).remaining,7488);
assert.equal(M.territory([29792]).fits,false);
assert.equal(M.territory([29792],49152).fits,true);
for(const budget of [0,-1,NaN,Infinity,1.5])assert.throws(()=>M.territory([64],budget));
console.log('PASS: configurable budgets, byte volume, oversized samples and default 24,576-byte budget.');

assert.equal(M.territory([17088,3309,2420]).remaining,1759);
