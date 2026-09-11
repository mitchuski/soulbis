(() => {
 'use strict';
 const h=window.starMeasureHost,T=THREE,M=SignatureMath,q=new URLSearchParams(location.search),lab=location.pathname.startsWith('/signatures')&&q.get('view')!=='manifold';
 let scheme=Object.hasOwn(M.profiles,q.get('scheme'))?q.get('scheme'):'ML-DSA-44',part='total',role='Unassigned';
 let selected=0,phase=0,orbitPaused=window.matchMedia('(prefers-reduced-motion: reduce)').matches,orbitRadius=0;
 const records=[{scheme,role}],orbitColors=[0x82b9dc,0xe5bd87,0xa6d2aa,0xc3ace0,0xe3a5b2,0xaacac5];
 let folded=false,foldProgress=0,routeDistance=0,routePaused=window.matchMedia('(prefers-reduced-motion: reduce)').matches,route,routeMarker;
 const routeGroup=new T.Group();h.coreGroup.parent.add(routeGroup);routeGroup.rotation.x=.32;
 const group=new T.Group(),packed=new T.Group();h.coreGroup.parent.add(group,packed);
 group.rotation.x=.32;packed.rotation.x=.32;
 let layout,rounded,signatureBodies=[];

 const panel=document.createElement('details');panel.open=true;panel.className='panel-details';
 panel.innerHTML=`<summary>Signatures</summary>
 <label class="sf-label"><input id="sfShow" type="checkbox" checked> Show signatures</label>
 <label class="sf-label">Selected signature<select id="sfRecord"></select></label>
 <div class="sf-actions"><button id="sfAdd">Add signature</button><button id="sfRemove">Remove</button></div><p id="sfCapacity" class="sf-note"></p>
 <label class="sf-label">Scheme<select id="sfScheme">${['Post-quantum','Classical'].map(f=>`<optgroup label="${f}">${Object.entries(M.profiles).filter(([,p])=>p.family===f).map(([name,p])=>`<option value="${name}">${name}${p.alias?" · "+p.alias:""}</option>`).join('')}</optgroup>`).join('')}</select></label>
 <div id="sfCollection"><div id="sfTotals" class="sf-note" aria-live="polite"></div><label class="sf-label">Byte budget<select id="sfBudget"><option value="8192">8 KiB · 8,192 bytes</option><option value="24576" selected>24 KiB · 24,576 bytes</option><option value="49152">48 KiB · 49,152 bytes</option></select></label><progress id="sfMeter" max="24576" value="0" aria-label="Sample budget used"></progress><p id="sfFoldNote" class="sf-note">Sample budget · 24,576 B</p><div class="sf-actions"><button id="sfFold">Fold into Star</button><button id="sfMotion">Pause motion</button></div></div>
 <label class="sf-label">Folded geometry<select id="sfFoldGeometry"><option value="blocks">Blocks</option><option value="spheres">Overlapping spheres</option><option value="perturbed">Perturbed spheres</option></select></label>
 <label class="sf-label">Solidity <output id="sfOpacityValue">90%</output><input id="sfOpacity" type="range" min="25" max="100" value="90"></label>
 <div id="sfRouteControls" hidden><label class="sf-label"><input type="checkbox" id="sfRouteVisible" checked> Signature circuit</label><p id="sfRouteMetrics" class="sf-note"></p><p id="sfRouteStatus" class="sf-note" aria-live="off"></p></div>
 <details id="sfInspection" ${lab?'open':''}><summary>Inspect signature</summary><div id="sfMeasurement"><strong id="sfBytes"></strong><div id="sfCaption"></div><div id="sfBar" role="img" aria-label="Signature composition"></div><div id="sfParts"></div><details><summary>Encoding details</summary><p id="sfDetail" class="sf-note"></p><a id="sfSource" target="_blank" rel="noreferrer">Specification ↗</a></details></div></details>
 <details><summary>Experiments</summary><label class="sf-label">Expanded geometry<select id="sfGeometry"><option value="bounded">Tetrahedron</option><option value="reshape">Perturbed sphere</option></select></label></details>
 <details><summary>Appearance</summary><label class="sf-label">Star glow <output id="sfGlowValue">15%</output><input id="sfGlow" type="range" min="0" max="100" value="15"></label><label class="sf-label"><input id="sfBackground" type="checkbox" ${lab?'':'checked'}> Background motion</label>${lab?'<label class="sf-label"><input type="checkbox" id="sfLattice"> Lattice reference</label>':''}</details>
 <details><summary>Legend</summary><p class="sf-note">Volume: encoded bytes. Colour: signature or selected component. Path: illustrative traversal.</p><p class="sf-note">Folding preserves bytes. Overlap does not increase the sample budget. Shapes do not measure privacy or verification.</p><p class="sf-note">Samples only · collection export unavailable.</p></details>`;

 document.getElementById('appearanceBody').prepend(panel);
 const link=document.createElement('a');link.id='sfNavigation';link.className='snav-link';
 document.addEventListener('sitenav:ready',()=>{const actions=document.createElement('div');actions.className='snav-acts';actions.append(link);document.getElementById('snav-content').append(actions);},{once:true});
 const style=document.createElement('style');style.textContent=`
 [hidden]{display:none!important}.sf-label{display:block;margin:13px 0;font-size:12px;color:#dce7f8}.sf-label select{display:block;width:100%;padding:8px;margin-top:6px;background:#132035;border:1px solid #526982;color:#ecf3ff;border-radius:6px;font:inherit}.sf-label input[type=range]{margin-top:12px}.sf-note{font-size:12px;line-height:1.6;color:#acbed5;margin:12px 0}#sfMeasurement{margin:16px 0}#sfCollection{border-bottom:1px solid #48607a;padding-bottom:10px}#sfMeter{width:100%;height:8px;accent-color:#82b9dc}#sfFold{border-color:#82b9dc}#sfBytes{font-size:26px;font-weight:400}#sfCaption{font-size:12px;margin-top:6px;color:#c1d0e6}#sfBar{display:flex;height:16px;margin:14px 0;gap:0}#sfBar span{display:block;min-width:0;height:100%;flex-shrink:0}#sfBar[data-focused=true] span{opacity:.22}#sfBar[data-focused=true] span[data-selected=true]{opacity:1;box-shadow:inset 0 2px #f1f7ff,inset 0 -2px #f1f7ff}#sfBar{overflow:hidden;border-radius:4px;outline:1px solid #526982}.sf-swatch{display:inline-block;width:9px;height:9px;margin-right:8px;border-radius:2px}.sf-actions{display:flex;gap:6px;flex-wrap:wrap}.sf-actions button{padding:8px;background:#112337;color:#e8f0fc;border:1px solid #48607a;border-radius:6px;cursor:pointer}.sf-actions button:disabled{opacity:.4;cursor:default}#sfParts{display:grid;gap:6px}#sfParts button,#sfPlay{padding:8px;text-align:left;background:#112337;color:#e8f0fc;border:1px solid #48607a;border-radius:6px;font:12px monospace;cursor:pointer}#sfParts button[aria-pressed=true]{border-color:#daf0ff;background:#294257}#sfSource{color:#b6dfff;font-size:12px}#snav #sfNavigation{font-size:12px;min-height:44px;padding:10px;text-decoration:none;white-space:normal}
 .console{width:350px;max-height:65vh}.console .body{max-height:calc(65vh - 65px)}.console.trace{max-height:29vh}.console.trace .body{max-height:calc(29vh - 65px)}
 ${lab?'.console{top:18px;bottom:18px;max-height:calc(100vh - 36px)}.console .body{max-height:calc(100vh - 100px)}#appearanceBody> :not(:first-child),.console.trace,#launcher2,#ceilBadge,.hint,.focusbadge,.inspector,#viewControls{display:none!important}':''}
 @media(max-width:760px){.console{top:65px;width:min(340px,calc(100vw - 24px));max-height:48vh}.console .body{max-height:calc(48vh - 65px)}}
 `;document.head.append(style);
 const $=id=>document.getElementById(id),partColors=[0xafc3e6,0x5e99bb,0xdfbf8a];$('sfScheme').value=scheme;
 function bytes(){const p=M.profiles[scheme];return part==='total'?p.total:p.parts[+part][1];}
 function clear(){for(const g of [group,packed,routeGroup]){g.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose();});g.clear();}signatureBodies=[];routeMarker=null;}
 function outline(geometry,parent,color=0xa9c8db){const edge=new T.LineSegments(new T.EdgesGeometry(geometry),new T.LineBasicMaterial({color,transparent:true,opacity:.28,depthWrite:false}));edge.userData.baseOpacity=.28;parent.add(edge);return edge;}
 function buildRoute(){
 route=rounded?rounded.route:M.edgeRoute(layout);$('sfRouteMetrics').textContent=`Path ${route.length.toFixed(2)} scene units · Lap ${(route.length/.3).toFixed(1)} s`; 
 const raw=route.segments.flatMap(s=>[...s.a,...s.b]);
 const edges=new T.LineSegments(new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(raw,3)),new T.LineBasicMaterial({color:0x91c3c8,transparent:true,opacity:.55,depthTest:false,depthWrite:false}));edges.userData.baseOpacity=.55;edges.renderOrder=30;routeGroup.add(edges);
 route.segments.filter(s=>s.record===selected&&!s.connector).forEach(s=>{const curve=new T.LineCurve3(new T.Vector3(...s.a),new T.Vector3(...s.b));const line=new T.Mesh(new T.TubeGeometry(curve,1,.003,5,false),new T.MeshBasicMaterial({color:0xe7cb8b,transparent:true,opacity:.9,depthTest:false,depthWrite:false}));line.userData.baseOpacity=.9;line.renderOrder=31;routeGroup.add(line);});
 routeMarker=new T.Mesh(new T.SphereGeometry(.015,12,8),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:1,depthTest:false,depthWrite:false}));routeMarker.userData.baseOpacity=1;routeMarker.renderOrder=32;routeGroup.add(routeMarker);
 }
 function buildPacked(){
 rounded=null;
 if($('sfFoldGeometry').value!=='blocks'){
 const shape=h.shape(),eps=$('sfFoldGeometry').value==='perturbed'?shape.epsilon/1.2:0;
 rounded=M.roundRegions(records.map(r=>M.profiles[r.scheme].total),eps,shape.m,shape.n);
 const boundary=M.roundRegions([layout.capacity],0).regions[0].points;
 for(let axis=0;axis<3;axis++){const pts=boundary.map(p=>new T.Vector3(...(axis===0?p:axis===1?[p[0],p[2],p[1]]:[p[2],p[0],p[1]])));pts.push(pts[0].clone());const ring=new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:0x9cafc4,transparent:true,opacity:.22,depthWrite:false}));ring.userData.baseOpacity=.22;packed.add(ring);}

 rounded.regions.forEach((r,i)=>{
 const focused=i===selected&&part!=='total';
 const geo=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(focused?M.perturbed(bytes(),eps,shape.m,shape.n):r.raw,3));geo.computeVertexNormals();
 const mesh=new T.Mesh(geo,new T.MeshStandardMaterial({color:focused?partColors[+part]:orbitColors[i],roughness:.75,emissive:focused?partColors[+part]:orbitColors[i],emissiveIntensity:.16,transparent:true,opacity:+$('sfOpacity').value/100,depthWrite:true,side:T.FrontSide}));mesh.position.set(...r.center);mesh.userData.record=i;mesh.userData.baseOpacity=mesh.material.opacity;packed.add(mesh);
 if(focused){const full=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(r.raw,3));full.computeVertexNormals();const ghost=new T.Mesh(full,new T.MeshBasicMaterial({color:orbitColors[i],transparent:true,opacity:.1,depthWrite:false}));ghost.position.set(...r.center);ghost.userData.record=i;ghost.userData.baseOpacity=.1;packed.add(ghost);}
 });return;
 }

 const boundaryGeometry=new T.BoxGeometry(layout.side,layout.side,layout.side);outline(boundaryGeometry,packed);boundaryGeometry.dispose();
 layout.cells.forEach((cell,i)=>{
 const focused=i===selected&&part!=='total',fraction=focused?bytes()/cell.bytes:1;
 const full=new T.BoxGeometry(cell.width,layout.side,layout.side),frame=outline(full,packed,i===selected?0xf1f7ff:orbitColors[i]);frame.position.x=cell.x;frame.userData.record=i;full.dispose();
 const mesh=new T.Mesh(new T.BoxGeometry(cell.width*fraction,layout.side,layout.side),new T.MeshStandardMaterial({color:focused?partColors[+part]:orbitColors[i],roughness:.75,emissive:focused?partColors[+part]:orbitColors[i],emissiveIntensity:.16,transparent:true,opacity:+$('sfOpacity').value/100,depthWrite:true}));
 mesh.position.x=cell.x-cell.width*(1-fraction)/2;mesh.userData.record=i;mesh.userData.baseOpacity=mesh.material.opacity;packed.add(mesh);
 });
}

 function solid(n,color,x){const reshape=$('sfGeometry').value==='reshape';let geometry,scale=1;
 if(reshape){const s=h.shape();geometry=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(M.perturbed(n,s.epsilon/1.2,s.m,s.n),3));geometry.computeVertexNormals();}
 else{geometry=new T.TetrahedronGeometry(1,0);scale=Math.cbrt((n/4627*.46)/(8/(9*Math.sqrt(3))));}
 const mesh=new T.Mesh(geometry,new T.MeshStandardMaterial({color,roughness:.65,metalness:.02,emissive:color,emissiveIntensity:.1,transparent:true,opacity:+$('sfOpacity').value/100,side:T.DoubleSide,depthWrite:true}));mesh.scale.setScalar(scale);mesh.position.x=x;geometry.computeBoundingSphere();mesh.userData.radius=geometry.boundingSphere.radius*scale;mesh.userData.baseOpacity=mesh.material.opacity;group.add(mesh);return mesh;}
 function draw(){clear();const none=scheme==='none',reshape=!none&&$('sfGeometry').value==='reshape';
 if(!none){layout=M.territory(records.map(r=>M.profiles[r.scheme].total),+$('sfBudget').value);if(!layout.fits){folded=false;foldProgress=0;routeDistance=0;}}
 h.replaceCore(!none&&folded);if(lab)h.reference(true,$('sfLattice').checked);group.visible=!none;packed.visible=!none;
 for(const id of ['sfScheme','sfGeometry','sfOpacity','sfRecord','sfAdd','sfRemove','sfMotion','sfFold','sfFoldGeometry'])$(id).disabled=none;
 $('sfRouteControls').hidden=none||!folded;$('sfMotion').textContent=orbitPaused?'Play motion':'Pause motion';$('sfInspection').hidden=none;$('sfMeasurement').hidden=none;$('sfFold').textContent=folded?'Unfold signatures':'Fold into Star';$('sfGeometry').disabled=none||folded;$('sfMotion').disabled=none||(!folded&&records.length===1);
 $('sfRecord').innerHTML=records.map((r,i)=>`<option value="${i}">${i+1} · ${r.scheme}</option>`).join('');$('sfRecord').value=selected;
 $('sfRemove').disabled=none||records.length===1;$('sfMotion').disabled=none||(!folded&&records.length===1);
 $('sfCapacity').textContent=none?'No signature displayed.':'';if(none){$('sfTotals').textContent='No signature displayed';$('sfMeter').value=0;}
 if(!none){const p=M.profiles[scheme],b=bytes();
 records.forEach((r,i)=>{const whole=M.profiles[r.scheme].total,mesh=solid(i===selected?b:whole,i===selected&&part!=='total'?partColors[+part]:orbitColors[i],0);mesh.userData.record=i;
 if(i===selected&&part!=='total'){const ghost=solid(whole,orbitColors[i],0);const frame=outline(ghost.geometry,group);frame.scale.copy(ghost.scale);frame.userData.record=i;mesh.userData.radius=ghost.userData.radius;group.remove(ghost);ghost.geometry.dispose();ghost.material.dispose();}
 signatureBodies.push(mesh);});
 const radii=signatureBodies.map(o=>o.userData.radius);orbitRadius=0;
 for(let i=0;i<radii.length;i++)for(let j=i+1;j<radii.length;j++)orbitRadius=Math.max(orbitRadius,(radii[i]+radii[j]+.025)/(2*Math.sin(Math.PI*(j-i)/radii.length)));
 $('sfAdd').disabled=records.length>=6||layout.total+M.profiles[scheme].total>layout.capacity;
 $('sfFold').disabled=!layout.fits;
 $('sfCapacity').textContent=!layout.fits?'Collection exceeds the budget':records.length>=6?'6 signatures · sample limit':$('sfAdd').disabled?'Next signature exceeds the budget':`${records.length} / 6 signatures`;
 $('sfTotals').textContent=`Held ${layout.total.toLocaleString()} B · Budget used ${(100*layout.total/layout.capacity).toFixed(1)}% · Remaining ${layout.remaining.toLocaleString()} B`;
 $('sfMeter').max=layout.capacity;$('sfMeter').value=layout.total;
 $('sfFoldNote').textContent=layout.fits?'Sample budget · '+layout.capacity.toLocaleString()+' B':(layout.total-layout.capacity).toLocaleString()+' B over budget · increase budget or choose a smaller sample';
 if(layout.fits){buildPacked();buildRoute();}else{route=null;routeMarker=null;rounded=null;$('sfRouteMetrics').textContent='';$('sfRouteStatus').textContent='';}
 position();
 $('sfBytes').textContent=b.toLocaleString()+' bytes';$('sfCaption').textContent=`${p.family}${p.alias?' · '+p.alias+' · hash-based':''} · ${part==='total'?'Whole signature':p.parts[+part][0]} `;
 $('sfDetail').textContent=p.detail;$('sfSource').href=p.source;
 $('sfBar').replaceChildren();$('sfBar').dataset.focused=String(part!=='total');$('sfBar').setAttribute('aria-label',(part==='total'?'Whole signature. ':`Selected: ${p.parts[+part][0]}. `)+p.parts.map(([name,size])=>`${name}: ${size} bytes, ${(100*size/p.total).toFixed(1)} percent`).join('; '));$('sfParts').replaceChildren();
 const select=(value)=>{part=value;draw();};const whole=document.createElement('button');whole.textContent=`Whole signature · ${p.total.toLocaleString()} B`;whole.setAttribute('aria-pressed',part==='total');whole.onclick=()=>select('total');$('sfParts').append(whole);
 p.parts.forEach(([name,size],i)=>{const bar=document.createElement('span');bar.dataset.selected=String(part===String(i));bar.style.width=100*size/p.total+'%';bar.style.background='#'+partColors[i].toString(16);bar.title=`${name}: ${size.toLocaleString()} B (${(100*size/p.total).toFixed(1)}%)`;$('sfBar').append(bar);const btn=document.createElement('button');btn.innerHTML=`<span class="sf-swatch" style="background:#${partColors[i].toString(16)}"></span>${name} · ${size.toLocaleString()} B · ${(100*size/p.total).toFixed(1)}%`;btn.setAttribute('aria-pressed',part===String(i));btn.onclick=()=>select(String(i));$('sfParts').append(btn);});}
 link.href='/signatures/?scheme='+encodeURIComponent(none?'none':scheme)+'&budget='+$('sfBudget').value+(lab?'&view=manifold':'');link.textContent=lab?'Explore sample in manifold →':'Signature playground →';link.title='Opens a fresh view of the selected scheme';
 }
 $('sfScheme').onchange=()=>{scheme=$('sfScheme').value;if(scheme!=='none')records[selected].scheme=scheme;part='total';draw();};$('sfGeometry').onchange=draw;$('sfOpacity').oninput=()=>{$('sfOpacityValue').textContent=$('sfOpacity').value+'%';draw();};$('sfGlow').oninput=()=>{window.starGlowStrength=+$('sfGlow').value/100;$('sfGlowValue').textContent=$('sfGlow').value+'%';};$('sfRecord').onchange=()=>{selected=+$('sfRecord').value;activate();};
 function activate(){scheme=records[selected].scheme;role=records[selected].role;part='total';$('sfScheme').value=scheme;draw();}
 $('sfAdd').onclick=()=>{if($('sfAdd').disabled)return;records.push({scheme,role:'Unassigned'});selected=records.length-1;activate();};
 $('sfRemove').onclick=()=>{if(records.length<2)return;records.splice(selected,1);selected=Math.min(selected,records.length-1);activate();};
 $('sfFoldGeometry').onchange=draw;$('sfBudget').onchange=draw;
 $('sfShow').onchange=()=>{scheme=$('sfShow').checked?records[selected].scheme:'none';$('sfScheme').value=records[selected].scheme;draw();};
 $('sfRouteVisible').onchange=position;
 $('sfFold').onclick=()=>{folded=!folded;draw();};
 $('sfMotion').onclick=()=>{orbitPaused=!orbitPaused;routePaused=orbitPaused;$('sfMotion').textContent=orbitPaused?'Play motion':'Pause motion';};
 $('sfBackground').onchange=()=>{window.starScenePaused=!$('sfBackground').checked;};
 function position(){
 group.children.forEach(mesh=>{const i=mesh.userData.record;if(i===undefined)return;const angle=phase+i*2*Math.PI/records.length;mesh.position.set(orbitRadius*Math.cos(angle)*(1-foldProgress),0,orbitRadius*Math.sin(angle)*(1-foldProgress));});
 routeGroup.visible=scheme!=='none'&&foldProgress>.001&&$('sfRouteVisible').checked;
 h.fadeLattice(scheme==='none'?1:1-.82*foldProgress);
 if(routeMarker&&route){const sample=M.routePoint(route,routeDistance);routeMarker.position.set(...sample.point);const text=`Signature ${sample.record+1} / ${records.length}`;if($('sfRouteStatus').textContent!==text)$('sfRouteStatus').textContent=text;}
 group.visible=scheme!=='none'&&foldProgress<.999;packed.visible=scheme!=='none'&&foldProgress>.001;
 for(const [g,opacity] of [[group,1-foldProgress],[packed,foldProgress],[routeGroup,foldProgress]])g.traverse(o=>{if(o.material)o.material.opacity=o.userData.baseOpacity*opacity;});
 }
 const raycaster=new T.Raycaster();let pointerStart=null;
 h.canvas.addEventListener('pointerdown',e=>{pointerStart=[e.clientX,e.clientY];});
 h.canvas.addEventListener('pointerup',e=>{if(!pointerStart||Math.hypot(e.clientX-pointerStart[0],e.clientY-pointerStart[1])>5)return;pointerStart=null;const r=h.canvas.getBoundingClientRect();raycaster.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),h.camera);const hit=raycaster.intersectObjects((folded?packed:group).children).find(x=>x.object.isMesh&&x.object.userData.record!==undefined);if(hit){selected=hit.object.userData.record;activate();}});

 const exportButton=$('expBtn');if(exportButton){exportButton.textContent='Download City Key';const note=document.createElement('p');note.className='sf-note';note.textContent='City Key export excludes signature samples.';exportButton.parentElement.after(note);}
 window.starGlowStrength=.15;
 if(lab){window.starScenePaused=true;h.quiet(true);$('console').classList.remove('folded');$('sfLattice').onchange=draw;}
 for(const id of ['sEps','sM','sN'])$(id).addEventListener('input',draw);
 window.starMeasure={update(dt,realDt){if(folded&&!routePaused&&$('sfRouteVisible').checked)routeDistance+=Math.min(realDt||0,.05)*.3;if(!folded&&!orbitPaused&&records.length>1){phase+=Math.min(realDt||0,.05)*.18;position();}const target=folded?1:0;foldProgress=window.matchMedia('(prefers-reduced-motion: reduce)').matches?target:foldProgress+(target-foldProgress)*Math.min(1,(realDt||0)*7);position();if(lab)h.reference(true,$('sfLattice').checked);h.replaceCore(scheme!=='none'&&folded,lab);}};
 if(['8192','24576','49152'].includes(q.get('budget')))$('sfBudget').value=q.get('budget');
 if(q.get('scheme')==='none'){scheme='none';$('sfShow').checked=false;}draw();
})();
