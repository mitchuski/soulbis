(function(root){
const profiles={
 'SLH-DSA-SHA2-128s':{family:'Post-quantum',alias:'SPHINCS+',total:7856,parts:[['Randomizer R',16],['FORS signature',2912],['Hypertree signature',4928]],detail:'Stateless hash-based signature, based on SPHINCS+. R: 16 bytes; FORS: 14 × (12 + 1) × 16; hypertree: (7 × 35 + 63) × 16. Hypertree includes WOTS+ signatures and authentication paths.',source:'https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.205.pdf'},
 'SLH-DSA-SHA2-128f':{family:'Post-quantum',alias:'SPHINCS+',total:17088,parts:[['Randomizer R',16],['FORS signature',3696],['Hypertree signature',13376]],detail:'Stateless hash-based signature, based on SPHINCS+. R: 16 bytes; FORS: 33 × (6 + 1) × 16; hypertree: (22 × 35 + 66) × 16. Hypertree includes WOTS+ signatures and authentication paths.',source:'https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.205.pdf'},
 'SLH-DSA-SHA2-256s':{family:'Post-quantum',alias:'SPHINCS+',total:29792,parts:[['Randomizer R',32],['FORS signature',10560],['Hypertree signature',19200]],detail:'Stateless hash-based signature, based on SPHINCS+. R: 32 bytes; FORS: 22 × (14 + 1) × 32; hypertree: (8 × 67 + 64) × 32. Hypertree includes WOTS+ signatures and authentication paths.',source:'https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.205.pdf'},
 'Ed25519':{family:'Classical',total:64,parts:[['Encoded point R',32],['Scalar S',32]],detail:'64-byte signature: encoded point R and scalar S, 32 bytes each.',source:'https://www.rfc-editor.org/rfc/rfc8032.html'},
 'ECDSA-P256-raw':{family:'Classical',total:64,parts:[['Integer r',32],['Integer s',32]],detail:'Fixed-width r || s encoding: 32 bytes each. This sample uses the JWS binary signature encoding, not DER or Base64url text.',source:'https://www.rfc-editor.org/rfc/rfc7518.html'},
 'RSA-PSS-2048':{family:'Classical',total:256,parts:[['Encoded signature integer',256]],detail:'256-byte signature for a 2048-bit RSA modulus. Salt and message hash are not separate portions of the transmitted signature.',source:'https://www.rfc-editor.org/rfc/rfc8017.html'},
 'ML-DSA-44':{total:2420,parts:[['Challenge hash',32],['Response vector z',2304],['Hint encoding',84]],detail:'4 response polynomials × 256 coefficients × 18 bits; hint = 80 + 4 bytes.',source:'https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf'},
 'ML-DSA-65':{total:3309,parts:[['Challenge hash',48],['Response vector z',3200],['Hint encoding',61]],detail:'5 response polynomials × 256 coefficients × 20 bits; hint = 55 + 6 bytes.',source:'https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf'},
 'ML-DSA-87':{total:4627,parts:[['Challenge hash',64],['Response vector z',4480],['Hint encoding',83]],detail:'7 response polynomials × 256 coefficients × 20 bits; hint = 75 + 8 bytes.',source:'https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf'},
 'Falcon-padded-512':{total:666,parts:[['Header',1],['Nonce',40],['Encoded vector + padding',625]],detail:'512 coefficients. Vector and padding cannot be separated without a concrete encoded signature.',source:'https://falcon-sign.info/falcon.pdf'},
 'Falcon-padded-1024':{total:1280,parts:[['Header',1],['Nonce',40],['Encoded vector + padding',1239]],detail:'1024 coefficients. Vector and padding cannot be separated without a concrete encoded signature.',source:'https://falcon-sign.info/falcon.pdf'}
};
for(const p of Object.values(profiles))p.family ||= 'Post-quantum';
function volume(raw){let sum=0;for(let i=0;i<raw.length;i+=9){const [ax,ay,az,bx,by,bz,cx,cy,cz]=raw.slice(i,i+9);sum+=(ax*(by*cz-bz*cy)+ay*(bz*cx-bx*cz)+az*(bx*cy-by*cx))/6;}return Math.abs(sum);}
function perturbed(bytes,epsilon,m=5,n=6){
 const point=(i,j)=>{const phi=i/32*Math.PI,theta=j/64*2*Math.PI,r=1+epsilon*Math.sin(m*phi)*Math.cos(n*theta);return [r*Math.sin(phi)*Math.cos(theta),r*Math.sin(phi)*Math.sin(theta),r*Math.cos(phi)];};
 const raw=[];for(let i=0;i<32;i++)for(let j=0;j<64;j++){const a=point(i,j),b=point(i,j+1),c=point(i+1,j),d=point(i+1,j+1);raw.push(...a,...c,...b,...b,...c,...d);}
 const target=bytes/4627*.46,scale=Math.cbrt(target/volume(raw));return raw.map(x=>x*scale);
}
const unitVolume=.46/4627;
function territory(sizes,capacity=24576){
 if(!Number.isSafeInteger(capacity)||capacity<=0)throw new Error('Invalid byte budget');
 if(!sizes.every(b=>Number.isFinite(b)&&b>0))throw new Error('Invalid byte count');
 const total=sizes.reduce((a,b)=>a+b,0),side=Math.cbrt(capacity*unitVolume);
 let cursor=-side/2;
 const cells=sizes.map(bytes=>{const width=bytes*unitVolume/(side*side),x=cursor+width/2;cursor+=width;return {bytes,width,x};});
 return {total,capacity,remaining:Math.max(0,capacity-total),fits:total<=capacity,side,cells};
}
function edgeRoute(layout){
 const y=layout.side/2,z=layout.side/2,segments=[];
 layout.cells.forEach((c,i)=>{const l=c.x-c.width/2,r=c.x+c.width/2;
 const points=[[l,y,z],[l,-y,z],[r,-y,z],[r,y,z]];
 for(let k=0;k<3;k++)segments.push({a:points[k],b:points[k+1],record:i});
 });
 for(let i=layout.cells.length-1;i>=0;i--){const c=layout.cells[i];segments.push({a:[c.x+c.width/2,y,z],b:[c.x-c.width/2,y,z],record:i});}
 let total=0;for(const s of segments){s.start=total;s.length=Math.hypot(...s.a.map((v,i)=>s.b[i]-v));total+=s.length;}
 return {segments,length:total};
}
function routePoint(route,distance){const d=((distance%route.length)+route.length)%route.length;const s=route.segments.find(s=>d<s.start+s.length)||route.segments[route.segments.length-1],t=(d-s.start)/s.length;return {record:s.record,point:s.a.map((v,i)=>v+(s.b[i]-v)*t)};}
function roundRegions(sizes,epsilon=0,m=5,n=6){
 const regions=sizes.map((bytes,i)=>{
 const raw=perturbed(bytes,epsilon,m,n),radius=Math.max(...raw.map(Math.abs));
 const angle=i*2*Math.PI/sizes.length,offset=sizes.length===1?0:.16;
 const center=[offset*Math.cos(angle),offset*Math.sin(angle),0];
 // Extract the exact equatorial polygon from the rendered mesh.
 const points=[];for(let j=0;j<64;j++){const k=(16*64+j)*18;points.push(raw.slice(k,k+3).map((v,a)=>v+center[a]));}
 return {raw,center,points,radius};
 });
 const segments=[];
 regions.forEach((r,i)=>{for(let j=0;j<64;j++)segments.push({a:r.points[j],b:r.points[(j+1)%64],record:i});
 if(regions.length>1){const a=r.points[0],b=regions[(i+1)%regions.length].points[0];if(Math.hypot(...a.map((v,k)=>b[k]-v))>1e-10)segments.push({a,b,record:i,connector:true});}});
 let length=0;segments.forEach(s=>{s.start=length;s.length=Math.hypot(...s.a.map((v,k)=>s.b[k]-v));length+=s.length;});
 return {regions,route:{segments,length}};
}
const api={profiles,volume,perturbed,territory,edgeRoute,routePoint,roundRegions};if(typeof module!=='undefined')module.exports=api;else root.SignatureMath=api;
})(typeof window==='undefined'?globalThis:window);
