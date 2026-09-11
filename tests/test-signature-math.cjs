const assert=require('node:assert/strict');
const M=require('../star/signature-math.js');
for(const [name,p] of Object.entries(M.profiles)){
 assert.equal(p.parts.reduce((sum,p)=>sum+p[1],0),p.total,name);
 for(const eps of [0,.1,.35])for(const bytes of [p.total,...p.parts.map(p=>p[1])]){
  const mesh=M.perturbed(bytes,eps),actual=M.volume(mesh),target=bytes/4627*.46;
  assert.ok(mesh.every(Number.isFinite));assert.ok(Math.abs(actual-target)/target<1e-10,`${name}: volume mismatch`);
 }
}
assert.equal(M.profiles.Ed25519.total,64);
assert.equal(M.profiles['ECDSA-P256-raw'].total,64);
assert.equal(M.profiles['RSA-PSS-2048'].total,256);
console.log('PASS: eleven encoding totals; 120 mesh/component/deformation combinations conserve byte-proportional volume.');

for(const [id,total,parts] of [
 ['128s',7856,[16,2912,4928]],['128f',17088,[16,3696,13376]],['256s',29792,[32,10560,19200]]
]){const p=M.profiles['SLH-DSA-SHA2-'+id];assert.equal(p.total,total);assert.deepEqual(p.parts.map(x=>x[1]),parts);}
