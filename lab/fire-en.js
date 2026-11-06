/* GENERATED from fire-ar.js by i18n/build.py; do not edit */
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {CSS2DRenderer,CSS2DObject} from 'three/addons/renderers/CSS2DRenderer.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const $=s=>document.querySelector(s);
const stageEl=$('#stage'),panel=$('#panel'),rail=$('#rail'),hint=$('#hint'),toastEl=$('#toast');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- renderer ----------
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
stageEl.prepend(renderer.domElement);
const labels=new CSS2DRenderer({element:$('#labels')});
const camera=new THREE.PerspectiveCamera(42,1,.05,200);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;controls.dampingFactor=.08;controls.enablePan=false;
const pmrem=new THREE.PMREMGenerator(renderer);
const ENV=pmrem.fromScene(new RoomEnvironment(),.04).texture;
const composer=new EffectComposer(renderer);const rpass=new RenderPass(new THREE.Scene(),camera);composer.addPass(rpass);
const bloom=new UnrealBloomPass(new THREE.Vector2(256,256),.38,.45,1.02);composer.addPass(bloom);composer.addPass(new OutputPass());
function resize(){const w=stageEl.clientWidth,h=stageEl.clientHeight;renderer.setSize(w,h);composer.setSize(w,h);labels.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();PX=h*renderer.getPixelRatio()*.9}
let PX=600;new ResizeObserver(resize).observe(stageEl);

let toastT=0;
function toast(msg,kind=''){toastEl.textContent=msg;toastEl.className='show '+kind;clearTimeout(toastT);toastT=setTimeout(()=>toastEl.className='',2600)}

// ---------- particles ----------
const PVS=`attribute float aSize;attribute vec3 aColor;attribute float aAlpha;varying vec3 vC;varying float vA;uniform float uPx;
void main(){vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=aSize*uPx/max(.1,-mv.z);vC=aColor;vA=aAlpha;}`;
const PFS=`varying vec3 vC;varying float vA;void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,0.,d);a*=a;if(a*vA<.004)discard;gl_FragColor=vec4(vC,a*vA);}`;
class PS{
  constructor(max,additive){
    this.max=max;this.g=new THREE.BufferGeometry();
    this.pos=new Float32Array(max*3);this.col=new Float32Array(max*3);this.size=new Float32Array(max);this.alpha=new Float32Array(max);
    this.vel=new Float32Array(max*3);this.life=new Float32Array(max).fill(1e9);this.maxL=new Float32Array(max).fill(1);this.s0=new Float32Array(max);this.type=new Uint8Array(max);
    this.g.setAttribute('position',new THREE.BufferAttribute(this.pos,3));this.g.setAttribute('aColor',new THREE.BufferAttribute(this.col,3));
    this.g.setAttribute('aSize',new THREE.BufferAttribute(this.size,1));this.g.setAttribute('aAlpha',new THREE.BufferAttribute(this.alpha,1));
    this.u={uPx:{value:PX}};
    this.m=new THREE.ShaderMaterial({vertexShader:PVS,fragmentShader:PFS,uniforms:this.u,transparent:true,depthWrite:false,blending:additive?THREE.AdditiveBlending:THREE.NormalBlending});
    this.wind=[0,0];this.obj=new THREE.Points(this.g,this.m);this.obj.frustumCulled=false;this.obj.renderOrder=additive?3:2;this.i=0;
  }
  spawn(x,y,z,vx,vy,vz,life,size,type){const i=this.i;this.i=(this.i+1)%this.max;
    this.pos.set([x,y,z],i*3);this.vel.set([vx,vy,vz],i*3);this.life[i]=0;this.maxL[i]=life;this.s0[i]=size;this.type[i]=type}
  update(dt){this.u.uPx.value=PX;const p=this.pos,v=this.vel,c=this.col;
    for(let i=0;i<this.max;i++){let L=this.life[i];if(L>this.maxL[i]){this.alpha[i]=0;continue}
      L+=dt;this.life[i]=L;const t=L/this.maxL[i],j=i*3,ty=this.type[i];let ax=0,ay=0,az=0,drag=0;
      if(ty===0){ay=2.2;drag=1.2;// fire
        const r=t<.25?[1,.92-t*.6,.6-t*1.6]:t<.6?[1,.75-(t-.25)*1.3,.18-(t-.25)*.3]:[.95-(t-.6)*1.6,.3-(t-.6)*.6,.06];
        c[j]=r[0];c[j+1]=Math.max(0,r[1]);c[j+2]=Math.max(0,r[2]);this.alpha[i]=Math.sin(Math.PI*Math.min(1,t*1.15))*.42;this.size[i]=this.s0[i]*(1-.55*t)*.8}
      else if(ty===1){ay=.9;drag=.6;ax=this.wind[0];az=this.wind[1];c[j]=c[j+1]=.17+.2*t;c[j+2]=.19+.2*t;this.alpha[i]=.42*Math.sin(Math.PI*t);this.size[i]=this.s0[i]*(1+2.4*t)}// smoke
      else if(ty===2){ay=-9.8;drag=.2;c[j]=.55;c[j+1]=.8;c[j+2]=1;this.alpha[i]=.75*(1-t);this.size[i]=this.s0[i]}// water
      else if(ty===3){ay=-.6;drag=2.6;ax=this.wind[0]*.5;az=this.wind[1]*.5;c[j]=c[j+1]=.78;c[j+2]=.82;this.alpha[i]=.26*(1-t)*Math.min(1,t*6);this.size[i]=this.s0[i]*(1+2*t)}// powder/co2
      else if(ty===4){ay=1.5;drag=.4;c[j]=1;c[j+1]=.75;c[j+2]=.35;this.alpha[i]=(1-t)*(.6+.4*Math.sin(L*40));this.size[i]=this.s0[i]}// ember
      else if(ty===5){ay=.25;drag=.8;c[j]=.6;c[j+1]=.85;c[j+2]=1;this.alpha[i]=.9*Math.sin(Math.PI*t)*(.5+.5*Math.sin(L*25));this.size[i]=this.s0[i]}// ion sparkle
      else if(ty===6){ay=-1;drag=1.5;c[j]=.98;c[j+1]=.94;c[j+2]=.8;this.alpha[i]=.55*(1-t);this.size[i]=this.s0[i]*(1+1.5*t)}// foam
      const k=Math.exp(-drag*dt);v[j]=(v[j]+ax*dt)*k;v[j+1]=(v[j+1]+ay*dt)*k;v[j+2]=(v[j+2]+az*dt)*k;
      p[j]+=v[j]*dt;p[j+1]+=v[j+1]*dt;p[j+2]+=v[j+2]*dt;
      if(ty===2&&p[j+1]<0){this.life[i]=1e9}
    }
    for(const a of ['position','aColor','aSize','aAlpha'])this.g.attributes[a].needsUpdate=true}
  clear(){this.life.fill(1e9);this.alpha.fill(0)}
}
const R=(a,b)=>a+Math.random()*(b-a);
const FLV=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const FLF=`varying vec2 vUv;uniform float uT,uI,uS,uW;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
void main(){vec2 uv=vUv;float y=uv.y;float x=(uv.x-.5)*2.;
 float q=fbm(vec2(uv.x*2.6+uS,y*2.2-uT*1.9));float r=fbm(vec2(uv.x*5.5-uS*1.7,y*4.4-uT*3.4)+q*1.3);
 x+=(q-.5)*.75*y;float w=.92*pow(1.-y,.55);
 float shape=1.-smoothstep(w*.35,w,abs(x));
 float d=clamp((r*1.35+.18-y*1.05)*shape*1.8,0.,1.)*smoothstep(0.,.06,y);d*=min(uI,1.5);
 vec3 c=mix(vec3(.45,.04,.0),vec3(1.,.36,.03),smoothstep(.08,.4,d));c=mix(c,vec3(1.,.7,.28),smoothstep(.55,.92,d));c=mix(c,vec3(1.,.88,.55),smoothstep(.93,1.,d)*(1.-y));
 c=mix(c,vec3(1.,.97,.92)*1.3,uW*smoothstep(.05,.5,d));gl_FragColor=vec4(c*1.05,smoothstep(.03,.6,d)*.55);}`;
class Flame{constructor(scene,seed){this.u={uT:{value:0},uI:{value:1},uS:{value:seed*7.3},uW:{value:0}};
  this.m=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.ShaderMaterial({vertexShader:FLV,fragmentShader:FLF,uniforms:this.u,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));
  this.m.renderOrder=4;this.m.frustumCulled=false;scene.add(this.m)}
}
class Fire{
  constructor(ctx,pos,o={}){this.ctx=ctx;this.p=pos.clone();this.r=o.r??.35;this.h=o.h??1;this.rate=o.rate??170;this.smoke=o.smoke??.25;this.I=o.I??1;this.T=o.T??this.I;this.acc=0;this.sacc=0;
    this.light=new THREE.PointLight(0xff8a35,0,9,1.4);this.light.position.copy(pos).add(new THREE.Vector3(0,.6*this.h,0));ctx.scene.add(this.light);
    this.white=o.white||0;this.fl=[0,1,2].map(k=>new Flame(ctx.scene,Math.random()*10+k));this.fl.forEach(f=>f.u.uW.value=this.white);this.off=[[0,0],[.35,.15],[-.35,-.1]]}
  update(dt,t){this.I+=(this.T-this.I)*Math.min(1,dt*(this.T>this.I?1.2:2));const I=Math.max(0,this.I),ps=this.ctx.add;
    this.acc+=this.rate*.45*Math.min(I,2.2)*dt;const rr=this.r*Math.sqrt(Math.min(I,2));
    const yaw=Math.atan2(camera.position.x-this.p.x,camera.position.z-this.p.z);const sI=Math.sqrt(Math.max(0,Math.min(I,2.2)));
    this.fl.forEach((f,k)=>{const o=this.off[k];const sc=k?.72:1;f.u.uT.value=t;f.u.uI.value=I*(k?.85:1);f.m.visible=I>.02;
      const W=this.r*3.4*sc*(.55+.45*sI),H=this.h*1.75*sc*sI;f.m.scale.set(W,H,1);f.m.rotation.set(0,yaw,0);
      f.m.position.set(this.p.x+(o[0]*Math.cos(yaw))*this.r,this.p.y+H*.47,this.p.z-(o[0]*Math.sin(yaw))*this.r+o[1]*this.r*.3)});
    while(this.acc>=1){this.acc--;const a=R(0,6.283),d=Math.sqrt(Math.random())*rr;
      ps.spawn(this.p.x+Math.cos(a)*d,this.p.y+R(0,.08),this.p.z+Math.sin(a)*d,R(-.15,.15),this.h*R(.9,1.9)*(.6+.4*Math.min(I,1.6)),R(-.15,.15),R(.45,.95),this.r*R(1.1,2)*(.7+.3*Math.min(I,1.8)),0)}
    if(Math.random()<I*dt*6)ps.spawn(this.p.x+R(-rr,rr),this.p.y+.3*this.h,this.p.z+R(-rr,rr),R(-.4,.4),R(1.5,3),R(-.4,.4),R(.8,1.6),.035,4);
    this.sacc+=this.smoke*40*Math.min(I,2)*dt;while(this.sacc>=1){this.sacc--;this.ctx.norm.spawn(this.p.x+R(-rr,rr)*.6,this.p.y+this.h*1.1*Math.max(.5,I),this.p.z+R(-rr,rr)*.6,R(-.12,.12),R(.5,.9),R(-.12,.12),R(2.2,3.6),this.r*1.6,1)}
    this.light.intensity=I*(3.6+1.1*Math.sin(t*23)+.7*Math.sin(t*37))*this.h}
  remove(){this.ctx.scene.remove(this.light);this.fl.forEach(f=>this.ctx.scene.remove(f.m))}
}

// ---------- shared world helpers ----------
function floorTex(){const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');const gr=g.createRadialGradient(256,256,10,256,256,256);gr.addColorStop(0,'#3a2a22');gr.addColorStop(.6,'#1d1512');gr.addColorStop(1,'#120d0b');g.fillStyle=gr;g.fillRect(0,0,512,512);
  g.strokeStyle='rgba(255,255,255,.035)';for(let i=0;i<=512;i+=32){g.beginPath();g.moveTo(i,0);g.lineTo(i,512);g.moveTo(0,i);g.lineTo(512,i);g.stroke()}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
const FT=floorTex();
function makeCtx(o={}){const scene=new THREE.Scene();scene.background=new THREE.Color(0x120d0b);scene.fog=new THREE.Fog(0x120d0b,o.fogNear??9,o.fogFar??26);scene.environment=ENV;
  const hemi=new THREE.HemisphereLight(0xb8c4d6,0x2a160a,.55);scene.add(hemi);
  const key=new THREE.DirectionalLight(0xfff1e0,1.1);key.position.set(-4,8,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-8,right:8,top:8,bottom:-8});scene.add(key);
  if(o.floor!==false){const f=new THREE.Mesh(new THREE.CircleGeometry(14,64),new THREE.MeshStandardMaterial({map:FT,roughness:.95}));f.rotation.x=-Math.PI/2;f.receiveShadow=true;scene.add(f)}
  const ctx={scene,add:new PS(o.addMax??2600,true),norm:new PS(o.normMax??1400,false),fires:[],tags:[],key,hemi};
  scene.add(ctx.add.obj);scene.add(ctx.norm.obj);return ctx}
function tag(ctx,parent,html,pos,cls=''){const d=document.createElement('div');d.className='tag '+cls;d.innerHTML=html;const o=new CSS2DObject(d);d._o=o;o.position.copy(pos);parent.add(o);ctx.tags.push(o);return d}
const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.6,metalness:0},o));
function mesh(g,m,x=0,y=0,z=0){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;return o}
function logs(){const g=new THREE.Group();const m=M(0x5a3420,{roughness:.9});for(let i=0;i<3;i++){const c=mesh(new THREE.CylinderGeometry(.1,.11,1.1,10),m);c.rotation.z=Math.PI/2;c.rotation.y=i*Math.PI/3;c.position.y=.12+i*.07;g.add(c)}
  const ash=mesh(new THREE.CircleGeometry(.6,24),M(0x1c1410,{roughness:1}));ash.rotation.x=-Math.PI/2;ash.position.y=.01;g.add(ash);return g}
function crate(s=.6,col=0x8a5a32){const g=new THREE.Group();const b=mesh(new THREE.BoxGeometry(s,s,s),M(col,{roughness:.85}));b.position.y=s/2;g.add(b);
  const lm=M(0x5c3a1f,{roughness:.9});for(const y of [.08,s-.08]){const p=mesh(new THREE.BoxGeometry(s*1.02,.08,s*1.02),lm);p.position.y=y;g.add(p)}g.userData.body=b;return g}

// ---------- extinguisher model ----------
function canvasTex(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'));const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t}
const GAUGE=canvasTex(256,256,g=>{g.fillStyle='#f7f7f2';g.beginPath();g.arc(128,128,124,0,7);g.fill();g.lineWidth=26;
  const arc=(a0,a1,c)=>{g.strokeStyle=c;g.beginPath();g.arc(128,140,82,a0,a1);g.stroke()};arc(Math.PI*1.05,Math.PI*1.38,'#e23b2e');arc(Math.PI*1.38,Math.PI*1.62,'#29b765');arc(Math.PI*1.62,Math.PI*1.95,'#e23b2e');
  g.strokeStyle='#111';g.lineWidth=8;g.beginPath();g.moveTo(128,140);g.lineTo(128,62);g.stroke();g.fillStyle='#111';g.beginPath();g.arc(128,140,12,0,7);g.fill();
  g.font='bold 26px sans-serif';g.textAlign='center';g.fillText('PSI',128,205)});
function labelTex(kind){return canvasTex(512,512,g=>{g.fillStyle='#f4efe6';g.fillRect(0,0,512,512);g.fillStyle='#c0392b';g.fillRect(40,40,432,56);
  g.fillStyle='#fff';g.font='bold 36px sans-serif';g.textAlign='center';g.fillText('FIRE EXTINGUISHER',256,82);
  g.fillStyle='#222';g.font='bold 54px sans-serif';g.fillText(kind,256,190);g.fillStyle='#777';for(let i=0;i<3;i++)g.fillRect(70,240+i*34,372-i*60,14);
  const cl={A:'#2ecc71',B:'#e74c3c',C:'#3498db'};const cs=kind==='WATER'?['A']:kind==='FOAM'?['A','B']:kind==='CO2'?['B','C']:['A','B','C'];
  cs.forEach((c,i)=>{const x=256+(i-(cs.length-1)/2)*110;g.fillStyle=cl[c];g.beginPath();g.arc(x,420,44,0,7);g.fill();g.fillStyle='#fff';g.font='bold 50px sans-serif';g.fillText(c,x,438)})})}
function extinguisher(type='POWDER'){
  const G=new THREE.Group(),parts={};
  const red=new THREE.MeshPhysicalMaterial({color:0xc4120c,roughness:.28,metalness:.1,clearcoat:1,clearcoatRoughness:.08});
  const chrome=new THREE.MeshStandardMaterial({color:0xf2f2f2,metalness:.75,roughness:.22,envMapIntensity:2.2});
  const black=M(0x151515,{roughness:.55});
  const prof=[];for(let i=0;i<=10;i++){const a=i/10*Math.PI/2;prof.push(new THREE.Vector2(.42*Math.sin(a)+.001,.06-.06*Math.cos(a)))}
  prof.push(new THREE.Vector2(.42,1.55));for(let i=1;i<=12;i++){const a=i/12*Math.PI/2;prof.push(new THREE.Vector2(.42*Math.cos(a)*.98+.12*Math.sin(a)*.0+.001,1.55+.32*Math.sin(a)))}
  const body=mesh(new THREE.LatheGeometry(prof,48),red);body.position.y=.06;G.add(body);parts.body=[body];
  const foot=mesh(new THREE.CylinderGeometry(.43,.43,.14,48),black);foot.position.y=.07;G.add(foot);
  const bandCol={WATER:0xc4120c,FOAM:0xe9d9a6,CO2:0x111111,POWDER:0x2d6fd6}[type];
  const band=mesh(new THREE.CylinderGeometry(.424,.424,type==='CO2'?.26:.09,48,1,true),M(bandCol,{roughness:.35}));band.position.y=1.32;G.add(band);parts.band=band;
  const lab=mesh(new THREE.CylinderGeometry(.426,.426,.62,48,1,true,-.85,1.7),new THREE.MeshStandardMaterial({map:labelTex(type),roughness:.5}));lab.position.y=.82;lab.rotation.y=Math.PI;G.add(lab);
  const neck=mesh(new THREE.CylinderGeometry(.12,.14,.16,24),chrome);neck.position.y=1.98;G.add(neck);
  const valve=mesh(new THREE.BoxGeometry(.2,.22,.2),chrome);valve.position.y=2.15;G.add(valve);parts.valve=valve;
  const handle=mesh(new THREE.BoxGeometry(.5,.05,.12),black);handle.position.set(0,2.12,.32);handle.rotation.y=0;const hg=new THREE.Group();hg.add(handle);handle.position.set(0,0,0);hg.position.set(0,2.12,0);handle.position.z=.33;handle.rotation.x=.1;G.add(hg);parts.handle=[handle];
  const lever=mesh(new THREE.BoxGeometry(.13,.04,.62),chrome);lever.position.set(0,2.3,.28);lever.rotation.x=-.18;G.add(lever);parts.lever=[lever];
  const pin=new THREE.Group();const ring=mesh(new THREE.TorusGeometry(.07,.016,10,28),M(0xf2c230,{metalness:.6,roughness:.3}));ring.position.set(.2,0,0);ring.rotation.y=Math.PI/2;
  const rod=mesh(new THREE.CylinderGeometry(.012,.012,.32,8),chrome);rod.rotation.z=Math.PI/2;rod.position.x=.06;pin.add(ring,rod);pin.position.set(.06,2.22,.06);G.add(pin);parts.pin=[ring,rod];parts.pinG=pin;
  let gauge=null;
  if(type!=='CO2'){gauge=new THREE.Group();const rim=mesh(new THREE.CylinderGeometry(.09,.09,.04,32),chrome);rim.rotation.x=Math.PI/2;const face=new THREE.Mesh(new THREE.CircleGeometry(.075,32),new THREE.MeshBasicMaterial({map:GAUGE}));face.position.z=.021;gauge.add(rim,face);gauge.position.set(0,2.16,-.13);gauge.rotation.y=Math.PI;G.add(gauge);parts.gauge=[rim,face]}
  // hose
  const isCO2=type==='CO2';
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.1,2.12,-.06),new THREE.Vector3(-.36,2.0,-.08),new THREE.Vector3(-.5,1.6,0),new THREE.Vector3(-.5,1.1,.05),new THREE.Vector3(-.48,.75,.08)]);
  const hose=mesh(new THREE.TubeGeometry(curve,40,isCO2?.045:.035,10,false),black);G.add(hose);parts.hose=[hose];
  const end=curve.getPoint(1);
  if(isCO2){const horn=mesh(new THREE.CylinderGeometry(.05,.16,.42,24,1,true),M(0x1a1a1a,{roughness:.4,side:THREE.DoubleSide}));horn.position.set(end.x,end.y-.2,end.z);G.add(horn);parts.hose.push(horn);parts.nozzleTip=new THREE.Vector3(end.x,end.y-.42,end.z)}
  else{const nz=mesh(new THREE.CylinderGeometry(.03,.045,.16,16),black);nz.position.set(end.x,end.y-.08,end.z);G.add(nz);parts.hose.push(nz);parts.nozzleTip=new THREE.Vector3(end.x,end.y-.16,end.z)}
  const clip=mesh(new THREE.BoxGeometry(.06,.1,.08),chrome);clip.position.set(-.43,1.15,.05);G.add(clip);
  G.userData.parts=parts;return G}

// ---------- real model + realistic props ----------
let EXT_SRC=null;
try{const g=await new GLTFLoader().loadAsync('models/extinguisher.json');
  g.scene.traverse(m=>{if(!m.isMesh)return;m.castShadow=true;m.receiveShadow=true;const geo=m.geometry;if(!geo.index)return;
    const pos=geo.attributes.position,idx=geo.index.array,keep=[];
    for(let i=0;i<idx.length;i+=3){const y=Math.max(pos.getY(idx[i]),pos.getY(idx[i+1]),pos.getY(idx[i+2]));if(y>=.117)keep.push(idx[i],idx[i+1],idx[i+2])}
    geo.setIndex(keep)});
  EXT_SRC=g.scene}catch(e){EXT_SRC=null}
// real extinguisher: origin at the base of the cylinder (y .117 in the source), front (label, gauge) faces +z
function realExt(band){if(!EXT_SRC)return null;const g=new THREE.Group();const c=EXT_SRC.clone(true);c.position.set(0,-.117,-.03);g.add(c);
  if(band){const r=new THREE.Mesh(new THREE.CylinderGeometry(.0955,.0955,.04,48,1,true),new THREE.MeshStandardMaterial({color:band,roughness:.4,metalness:.1}));r.position.y=.27;g.add(r)}
  g.userData.anchor={lever:[.075,.535,.02],pin:[.02,.47,.035],handle:[.08,.49,.02],gauge:[0,.46,.045],hose:[-.118,.24,-.03],body:[0,.2,.1],tag:[-.05,.385,-.09],nozzle:[-.118,.02,-.03]};
  return g}
const texCache={};
function tex(key,w,h,draw,rep){if(texCache[key])return texCache[key];const t=canvasTex(w,h,draw);if(rep){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(...rep)}return texCache[key]=t}
const noise=(g,w,h,n,a,col)=>{for(let i=0;i<n;i++){g.fillStyle=col(Math.random());g.globalAlpha=a*Math.random();g.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*3,1+Math.random()*2)}g.globalAlpha=1};
const WOOD=()=>tex('wood',256,256,g=>{g.fillStyle='#9b6a3c';g.fillRect(0,0,256,256);for(let y=0;y<256;y+=2){g.fillStyle=`rgba(${70+Math.random()*40|0},${40+Math.random()*25|0},20,${.15+Math.random()*.2})`;g.fillRect(0,y+Math.sin(y*.3)*2,256,1)}
  noise(g,256,256,1400,.25,()=>'#3a2210');g.fillStyle='rgba(40,22,10,.6)';for(let k=0;k<3;k++){g.beginPath();g.ellipse(40+Math.random()*180,40+Math.random()*180,6,3,0,0,7);g.fill()}});
const CARD=()=>tex('card',512,512,g=>{g.fillStyle='#b98d58';g.fillRect(0,0,512,512);noise(g,512,512,5000,.18,()=>'#7a5530');
  g.fillStyle='rgba(200,170,120,.85)';g.fillRect(226,0,60,512);g.fillStyle='rgba(255,255,255,.08)';g.fillRect(226,0,6,512);
  g.fillStyle='#f3efe6';g.fillRect(60,320,150,100);g.fillStyle='#333';g.fillRect(72,336,110,10);g.fillRect(72,356,80,8);g.fillRect(72,372,96,8);
  g.strokeStyle='#2a1c10';g.lineWidth=5;g.beginPath();g.moveTo(340,330);g.lineTo(340,400);g.moveTo(320,350);g.lineTo(340,330);g.lineTo(360,350);g.moveTo(400,330);g.lineTo(400,400);g.moveTo(380,350);g.lineTo(400,330);g.lineTo(420,350);g.stroke()});
function drumTex(){return tex('drum',512,256,g=>{g.fillStyle='#1d4f86';g.fillRect(0,0,512,256);noise(g,512,256,3000,.2,()=>'#0b2440');
  for(const y of [40,214]){g.fillStyle='rgba(0,0,0,.3)';g.fillRect(0,y,512,8);g.fillStyle='rgba(255,255,255,.12)';g.fillRect(0,y-3,512,3)}
  g.save();g.translate(150,128);g.rotate(Math.PI/4);g.fillStyle='#e32a1e';g.fillRect(-46,-46,92,92);g.strokeStyle='#fff';g.lineWidth=5;g.strokeRect(-40,-40,80,80);g.restore();
  g.fillStyle='#fff';g.font='bold 30px sans-serif';g.textAlign='center';g.fillText('3',150,150);g.fillText('FLAMMABLE',330,120);g.font='bold 22px sans-serif';g.fillText('DIESEL FUEL',330,152)})}
function panelTex(){return tex('panel',256,384,g=>{g.fillStyle='#9aa3ad';g.fillRect(0,0,256,384);noise(g,256,384,1500,.2,()=>'#556');
  g.fillStyle='#2b2f35';g.fillRect(24,30,208,300);for(let r=0;r<6;r++)for(let c=0;c<4;c++){g.fillStyle='#e6e6e6';g.fillRect(36+c*50,46+r*46,38,34);g.fillStyle=r===2&&c===1?'#e74c3c':'#333';g.fillRect(50+c*50,52+r*46,10,20)}
  g.fillStyle='#f2c230';g.beginPath();g.moveTo(128,338);g.lineTo(158,378);g.lineTo(98,378);g.fill();g.fillStyle='#111';g.font='bold 30px sans-serif';g.textAlign='center';g.fillText('⚡',128,374)})}
// NFPA style class signs: A triangle green, B square red, C circle blue, D star yellow, K hexagon black
function classSign(k){return tex('sign'+k,256,256,g=>{const C={A:'#22a35a',B:'#d9342b',C:'#2f7fd1',D:'#e9b80f',K:'#222'};g.clearRect(0,0,256,256);g.fillStyle=C[k];g.strokeStyle='#fff';g.lineWidth=10;g.beginPath();
  if(k==='A'){g.moveTo(128,18);g.lineTo(240,226);g.lineTo(16,226);g.closePath()}
  if(k==='B'){g.rect(26,26,204,204)}
  if(k==='C'){g.arc(128,128,106,0,7)}
  if(k==='D'){for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?50:116;g.lineTo(128+Math.cos(a)*r,132+Math.sin(a)*r)}g.closePath()}
  if(k==='K'){for(let i=0;i<6;i++){const a=i*Math.PI/3+Math.PI/6;g.lineTo(128+Math.cos(a)*112,128+Math.sin(a)*112)}g.closePath()}
  g.fill();g.stroke();g.fillStyle='#fff';g.font='bold 120px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(k,128,k==='A'?160:k==='D'?140:134)})}
function sign3d(k){const m=new THREE.Mesh(new THREE.PlaneGeometry(.62,.62),new THREE.MeshBasicMaterial({map:classSign(k),transparent:true,side:THREE.DoubleSide,toneMapped:false}));return m}
// detectors (modelled after real ceiling units)
function smokeDetector(kind){const g=new THREE.Group();const wm=new THREE.MeshStandardMaterial({color:0xeeebe4,roughness:.55});
  const base=mesh(new THREE.CylinderGeometry(.27,.27,.03,48),wm);base.position.y=-.015;g.add(base);
  const prof=[];for(let i=0;i<=12;i++){const a=i/12*Math.PI/2;prof.push(new THREE.Vector2(.24*Math.cos(a)+.001,-.03-.1*Math.sin(a)))}
  const dome=mesh(new THREE.LatheGeometry([new THREE.Vector2(.25,-.03),...prof],48),wm);g.add(dome);
  const dark=new THREE.MeshStandardMaterial({color:0x2a2a2a,roughness:.8});
  if(kind!=='heat'){for(let i=0;i<20;i++){const s=mesh(new THREE.BoxGeometry(.012,.035,.05),dark);const a=i/20*Math.PI*2;s.position.set(Math.cos(a)*.205,-.075,Math.sin(a)*.205);s.rotation.y=-a;g.add(s)}}
  const cap=mesh(new THREE.CylinderGeometry(.13,.15,.025,40),wm);cap.position.y=-.135;g.add(cap);
  if(kind==='ion'){for(let r=1;r<4;r++){const ring=mesh(new THREE.TorusGeometry(.035*r,.004,6,32),dark);ring.rotation.x=Math.PI/2;ring.position.y=-.15;g.add(ring)}}
  if(kind==='heat'){const cage=new THREE.Group();for(let i=0;i<6;i++){const p=mesh(new THREE.CylinderGeometry(.007,.007,.09,6),wm);const a=i/6*Math.PI*2;p.position.set(Math.cos(a)*.06,-.18,Math.sin(a)*.06);cage.add(p)}
    const th=mesh(new THREE.SphereGeometry(.022,12,8),new THREE.MeshStandardMaterial({color:0x222222,metalness:.6,roughness:.3}));th.position.y=-.2;cage.add(th);g.add(cage)}
  const led=new THREE.Mesh(new THREE.SphereGeometry(.015,10,8),new THREE.MeshBasicMaterial({color:0x330000}));led.position.set(0,-.1,.2);g.add(led);g.userData.led=led;return g}
function flameDetector(){const g=new THREE.Group();const red=new THREE.MeshStandardMaterial({color:0xb3221a,roughness:.4,metalness:.3});
  const br=mesh(new THREE.BoxGeometry(.05,.18,.25),new THREE.MeshStandardMaterial({color:0x777,metalness:.8,roughness:.3}));br.position.set(0,-.08,0);g.add(br);
  const box=mesh(new THREE.BoxGeometry(.36,.26,.24),red);box.position.set(.14,-.2,0);box.rotation.z=-.35;g.add(box);
  const lens=new THREE.Mesh(new THREE.SphereGeometry(.07,24,12,0,Math.PI*2,0,Math.PI/2),new THREE.MeshPhysicalMaterial({color:0x99ccff,roughness:.05,transmission:.6,thickness:.02,metalness:0}));
  lens.rotation.z=Math.PI/2-.35;lens.position.set(.32,-.27,0);g.add(lens);const led=new THREE.Mesh(new THREE.SphereGeometry(.015,10,8),new THREE.MeshBasicMaterial({color:0x330000}));led.position.set(.3,-.17,.11);g.add(led);g.userData.led=led;return g}
// pendent sprinkler head with frame arms, star deflector and glass bulb
function sprinklerHead(){const g=new THREE.Group();const brass=new THREE.MeshStandardMaterial({color:0xc9a24a,metalness:1,roughness:.28});
  const thr=mesh(new THREE.CylinderGeometry(.03,.03,.06,20),brass);thr.position.y=.03;g.add(thr);const hex=mesh(new THREE.CylinderGeometry(.045,.045,.03,6),brass);hex.position.y=-.01;g.add(hex);
  [-1,1].forEach(s=>{const arm=mesh(new THREE.TorusGeometry(.06,.008,8,24,Math.PI),brass);arm.rotation.z=Math.PI;arm.position.set(s*.0,-.08,0);arm.rotation.y=s>0?0:Math.PI;arm.scale.set(.6,1.15,1);g.add(arm)});
  const def=new THREE.Group();const disc=mesh(new THREE.CylinderGeometry(.06,.06,.006,24),brass);def.add(disc);for(let i=0;i<16;i++){const t=mesh(new THREE.BoxGeometry(.02,.006,.012),brass);const a=i/16*Math.PI*2;t.position.set(Math.cos(a)*.068,0,Math.sin(a)*.068);t.rotation.y=-a;def.add(t)}def.position.y=-.155;g.add(def);
  const bulb=new THREE.Mesh(new THREE.CapsuleGeometry(.011,.05,4,10),new THREE.MeshPhysicalMaterial({color:0xff2a1a,roughness:.05,transmission:.5,thickness:.01,emissive:0x660000,emissiveIntensity:.6}));bulb.position.y=-.09;g.add(bulb);
  const escut=mesh(new THREE.CylinderGeometry(.11,.11,.01,32),new THREE.MeshStandardMaterial({color:0xe8e8e8,metalness:.6,roughness:.3}));escut.position.y=.01;g.add(escut);
  g.userData.bulb=bulb;return g}
// outside stem & yoke gate valve on a riser, with flanges, bolts, handwheel and gauges
function osyValve(){const g=new THREE.Group();const red=new THREE.MeshStandardMaterial({color:0xc21d14,roughness:.42,metalness:.25});const steel=new THREE.MeshStandardMaterial({color:0xcfcfcf,metalness:.9,roughness:.25});
  const body=mesh(new THREE.CylinderGeometry(.16,.16,.36,28),red);g.add(body);
  [-.2,.2].forEach(y=>{const fl=mesh(new THREE.CylinderGeometry(.22,.22,.05,32),red);fl.position.y=y;g.add(fl);for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const b=mesh(new THREE.CylinderGeometry(.014,.014,.08,8),steel);b.position.set(Math.cos(a)*.185,y,Math.sin(a)*.185);g.add(b)}});
  const bonnet=mesh(new THREE.CylinderGeometry(.08,.12,.22,24),red);bonnet.rotation.z=Math.PI/2;bonnet.position.x=.26;g.add(bonnet);
  const yoke=mesh(new THREE.BoxGeometry(.32,.04,.2),red);yoke.position.x=.5;g.add(yoke);[-.08,.08].forEach(z=>{const arm=mesh(new THREE.BoxGeometry(.3,.035,.035),red);arm.position.set(.5,0,z);g.add(arm)});
  const stem=mesh(new THREE.CylinderGeometry(.018,.018,.55,10),steel);stem.rotation.z=Math.PI/2;stem.position.x=.62;g.add(stem);
  const wheel=new THREE.Group();const rim=mesh(new THREE.TorusGeometry(.17,.016,10,40),red);wheel.add(rim);for(let i=0;i<5;i++){const sp=mesh(new THREE.CylinderGeometry(.01,.01,.34,6),red);sp.rotation.z=i/5*Math.PI;wheel.add(sp)}
  wheel.rotation.y=Math.PI/2;wheel.position.x=.68;g.add(wheel);
  const lock=new THREE.Group();const brassL=new THREE.MeshStandardMaterial({color:0xc9a24a,metalness:.9,roughness:.3});lock.add(mesh(new THREE.BoxGeometry(.07,.06,.03),brassL));const sh=mesh(new THREE.TorusGeometry(.022,.006,8,16,Math.PI),new THREE.MeshStandardMaterial({color:0xcfcfcf,metalness:1,roughness:.2}));sh.position.y=.03;lock.add(sh);const chain=mesh(new THREE.TorusGeometry(.17,.005,6,40),new THREE.MeshStandardMaterial({color:0xaaaaaa,metalness:1,roughness:.3}));chain.rotation.y=Math.PI/2;chain.position.x=.68;g.add(chain);lock.position.set(.68,-.2,0);lock.rotation.z=-Math.PI/2;g.add(lock);g.userData.lock=lock;
  g.userData.wheel=wheel;return g}
function gaugeMesh(){const g=new THREE.Group();const rim=mesh(new THREE.CylinderGeometry(.07,.07,.03,28),new THREE.MeshStandardMaterial({color:0xdddddd,metalness:.9,roughness:.2}));rim.rotation.x=Math.PI/2;
  const face=new THREE.Mesh(new THREE.CircleGeometry(.06,28),new THREE.MeshBasicMaterial({map:GAUGE}));face.position.z=.016;g.add(rim,face);return g}
function metalPile(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:0xd5dae0,metalness:1,roughness:.25});
  for(let i=0;i<70;i++){const c=mesh(new THREE.TorusGeometry(R(.02,.05),.006,4,12,R(2,5)),m);const a=R(0,6.28),d=Math.sqrt(Math.random())*.28;c.position.set(Math.cos(a)*d,R(.02,.12)*(1-d*2),Math.sin(a)*d);c.rotation.set(R(0,3),R(0,3),R(0,3));g.add(c)}return g}

// ---------- chapters ----------
const CH=[];
const btn=(act,html,cls='')=>`<button data-act="${act}" class="${cls}">${html}</button>`;

// 1. Fire tetrahedron
CH.push({id:'tetra',name:'Fire tetrahedron',build(){
  const ctx=makeCtx();const s=ctx.scene;const L=logs();s.add(L);
  const fire=new Fire(ctx,new THREE.Vector3(0,.18,0),{r:.38,h:1.1,smoke:.2});ctx.fires.push(fire);
  const T=new THREE.Group();T.position.y=1.15;s.add(T);
  const k=1.65;const V=[new THREE.Vector3(1,1,1),new THREE.Vector3(1,-1,-1),new THREE.Vector3(-1,1,-1),new THREE.Vector3(-1,-1,1)].map(v=>v.multiplyScalar(k/Math.sqrt(3)));
  const faces=[{id:'fuel',n:'Fuel',me:'Starvation',c:0xd9822b,v:[1,2,3]},{id:'oxy',n:'Oxygen',me:'Smothering',c:0x3fa2ff,v:[0,2,3]},{id:'heat',n:'Heat',me:'Cooling',c:0xff3d2e,v:[0,1,3]},{id:'chain',n:'Chain reaction',me:'Chain inhibition',c:0xf2c230,v:[0,1,2]}];
  faces.forEach(f=>{const g=new THREE.BufferGeometry().setFromPoints(f.v.map(i=>V[i]));g.computeVertexNormals();
    const m=new THREE.MeshStandardMaterial({color:f.c,transparent:true,opacity:.3,side:THREE.DoubleSide,emissive:f.c,emissiveIntensity:.25,depthWrite:false});
    const me=new THREE.Mesh(g,m);const ed=new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:f.c,transparent:true,opacity:.9}));
    const grp=new THREE.Group();grp.add(me,ed);T.add(grp);f.g=grp;f.m=[m,ed.material];
    const c=new THREE.Vector3();f.v.forEach(i=>c.add(V[i]));c.divideScalar(3);f.n0=c.clone().normalize();f.tag=tag(ctx,grp,f.n,c.clone().multiplyScalar(1.15),'big');f.tag.style.color='#'+f.c.toString(16).padStart(6,'0');f.on=true;f.k=0});
  // method props
  const lid=mesh(new THREE.CylinderGeometry(.75,.75,.06,40),M(0x8d8d8d,{metalness:.7,roughness:.35}));lid.position.y=4;s.add(lid);
  let st={method:null,t:0};
  const self={ctx,cam:[0,2.6,5.4],target:[0,1,0],orbit:true,hint:'Drag to rotate the pyramid · tap a face to remove it',
   panel:()=>`<div class="kick">Lesson 1 · Fire and its causes</div><h2>Fire tetrahedron</h2>
    <p class="lead">Fire needs four elements together. Remove any one and watch the fire go out. Each element you remove is one way of extinguishing.</p>
    <div class="btns">${faces.map(f=>btn('f:'+f.id,`<span class="sw" style="background:#${f.c.toString(16).padStart(6,'0')}"></span>Remove ${f.n}<small>${f.me}</small>`)).join('')}</div>
    <div class="out" id="o1">The fire is burning because all four elements are present: <b>fuel + oxygen + heat + chain reaction</b>.</div>
    <div class="btns one">${btn('reset','Relight the fire','primary')}</div>
    <ul class="facts"><li><b>Oxygen</b> is about 19–21% of the air.</li><li><b>Heat</b> must bring the material to its ignition temperature.</li><li><b>Fuel</b> can be solid, liquid or gas.</li></ul>`,
   act(a){if(a==='reset'){faces.forEach(f=>{f.on=true});st.method=null;fire.T=1;L.position.set(0,0,0);lid.position.y=4;$('#o1').innerHTML='The fire is burning because all four elements are present: <b>fuel + oxygen + heat + chain reaction</b>.';return}
     if(a.startsWith('f:')){const f=faces.find(x=>x.id===a.slice(2));if(!f.on)return;f.on=false;st.method=f.id;st.t=0;fire.T=0;
      const txt={fuel:'<b>Starvation:</b> we moved the fuel away, so nothing is left to burn.',oxy:'<b>Smothering:</b> we covered the fire and cut off the oxygen, like foam or CO₂ does.',heat:'<b>Cooling:</b> water absorbed the heat until it fell below the ignition temperature.',chain:'<b>Breaking the chain reaction:</b> dry chemical powder stopped the chain of reactions.'}[f.id];
      $('#o1').innerHTML=txt;toast('Fire out: '+f.me,'good')}},
   tagClick:faces.map(f=>[f.tag,'f:'+f.id]),
   update(dt,t){T.rotation.y+=dt*(RM?0:.25);faces.forEach(f=>{f.k+=((f.on?0:1)-f.k)*Math.min(1,dt*2.5);f.g.position.copy(f.n0).multiplyScalar(f.k*2.2);f.m[0].opacity=.3*(1-f.k);f.m[1].opacity=.9*(1-f.k);f.tag.classList.toggle('ghost',!f.on)});
     st.t+=dt;const m=st.method;
     if(m==='fuel')L.position.x+=(3-L.position.x)*Math.min(1,dt*1.5);
     if(m==='oxy')lid.position.y+=(.5-lid.position.y)*Math.min(1,dt*3);
     if(m==='heat'&&st.t<2.5)for(let i=0;i<10;i++)ctx.add.spawn(R(-1.5,-1.2),2.6,R(-.2,.2),R(2.2,3),R(.5,1.5),R(-.3,.3),.9,.06,2);
     if(m==='chain'&&st.t<2.5)for(let i=0;i<6;i++)ctx.norm.spawn(R(1.3,1.5),1.4,R(-.2,.2),R(-3,-2.2),R(-.4,.4),R(-.5,.5),1.6,.25,3);
   }};
  self.tagClick.forEach(([el,a])=>{el.classList.add('hot');el.addEventListener('click',()=>self.act(a))});
  return self}});

// 2. Stages
CH.push({id:'stages',name:'Stages of fire',build(){
  const ctx=makeCtx({fogNear:12,fogFar:30});const s=ctx.scene;
  const wallT=tex('wall',256,256,g=>{g.fillStyle='#5b524b';g.fillRect(0,0,256,256);noise(g,256,256,4000,.12,()=>'#2d2622')},[3,2]);
  const wm=new THREE.MeshStandardMaterial({map:wallT,roughness:.95});const w1=mesh(new THREE.BoxGeometry(6,3.2,.1),wm,0,1.6,-2);const w2=mesh(new THREE.BoxGeometry(.1,3.2,4),wm,-3,1.6,0);s.add(w1,w2);
  const skirt=new THREE.MeshStandardMaterial({color:0x2a2420,roughness:.6});s.add(mesh(new THREE.BoxGeometry(6,.12,.12),skirt,0,.06,-1.94),mesh(new THREE.BoxGeometry(.12,.12,4),skirt,-2.94,.06,0));
  const ceil=mesh(new THREE.BoxGeometry(6,.08,4),new THREE.MeshStandardMaterial({color:0x3a332e,roughness:1,transparent:true,opacity:.6}),0,3.24,0);ceil.castShadow=false;s.add(ceil);
  // metal waste bin with ribs
  const binM=new THREE.MeshStandardMaterial({color:0x8a9097,metalness:.85,roughness:.35,side:THREE.DoubleSide});
  const bin=new THREE.Group();bin.position.set(-.6,0,-.6);s.add(bin);bin.add(mesh(new THREE.CylinderGeometry(.28,.22,.62,32,1,true),binM,0,.31,0));bin.add(mesh(new THREE.CylinderGeometry(.22,.22,.02,32),binM,0,.01,0));
  for(let i=0;i<3;i++){const r=mesh(new THREE.TorusGeometry(.235+i*.02,.008,6,40),binM);r.rotation.x=Math.PI/2;r.position.y=.12+i*.2;bin.add(r)}
  const paperM=new THREE.MeshStandardMaterial({color:0xe9e2d0,roughness:1});for(let i=0;i<6;i++){const p=mesh(new THREE.IcosahedronGeometry(R(.08,.12),0),paperM);p.position.set(R(-.12,.12),R(.5,.6),R(-.12,.12));p.rotation.set(R(0,3),R(0,3),0);bin.add(p)}
  // desk & chair silhouettes for context
  const deskM=new THREE.MeshStandardMaterial({map:WOOD(),roughness:.7});s.add(mesh(new THREE.BoxGeometry(1.6,.06,.8),deskM,1.2,.76,-1.4));[[0.45,-1.75],[1.95,-1.75],[0.45,-1.05],[1.95,-1.05]].forEach(([x,z])=>s.add(mesh(new THREE.BoxGeometry(.05,.76,.05),M(0x333333,{metalness:.6}),x,.38,z)));
  // manual call point on wall
  const mcp=mesh(new THREE.BoxGeometry(.18,.18,.06),M(0xd21f15,{roughness:.4}),-2.93,1.4,.9);mcp.rotation.y=Math.PI/2;s.add(mcp);s.add(mesh(new THREE.BoxGeometry(.01,.11,.11),M(0xf5f5f5),-2.9,1.4,.9));
  const fire=new Fire(ctx,new THREE.Vector3(-.6,.62,-.6),{r:.22,h:.75,I:0,T:0,smoke:0});ctx.fires.push(fire);
  const DD=[{n:'Ionization detector',x:-2,o:smokeDetector('ion')},{n:'Photoelectric detector',x:-.7,o:smokeDetector('photo')},{n:'Infrared detector',x:.6,o:flameDetector()},{n:'Heat detector',x:1.9,o:smokeDetector('heat')}];
  const dets=DD.map(d=>{d.o.position.set(d.x,3.2,.4);d.o.scale.setScalar(1.15);s.add(d.o);d.led=d.o.userData.led;d.tg=tag(ctx,d.o,d.n,new THREE.Vector3(0,-.45,0));return d});
  const room=new THREE.PointLight(0xff3a10,0,12,1.2);room.position.set(0,1.6,0);s.add(room);
  const info=[{t:'Incipient stage',d:'Tiny combustion particles the eye can’t see. No smoke, no flame.',k:'Detected by: ionization detector'},
    {t:'Smoke stage',d:'Particles grow into visible smoke, with no flame or noticeable heat.',k:'Detected by: photoelectric detector'},
    {t:'Flame stage',d:'The fire reaches ignition: visible flame, more smoke, and heat you can feel.',k:'Detected by: infrared detector'},
    {t:'Heat stage',d:'High heat, flame, smoke and toxic gases, developing within seconds.',k:'Detected by: heat detector'}];
  let stage=0,auto=true,clock=0;
  function set(n){stage=n;fire.T=[0,0,.7,2.1][n];fire.smoke=[0,0,.35,.9][n];
    document.querySelectorAll('[data-act^="s:"]').forEach((b,i)=>b.classList.toggle('on',i===n));
    $('#o2').innerHTML=`<b>${info[n].t}</b><br>${info[n].d}<br><span style="color:var(--flame)">${info[n].k}</span>`}
  const self={ctx,cam:[2.6,2.3,5.2],target:[-.4,1.6,-.4],orbit:true,hint:'Play the stages or pick one',
   panel:()=>`<div class="kick">Lesson 1 · Fire and its causes</div><h2>Stages of fire</h2>
   <p class="lead">A wastebasket in an office corner. Watch the fire grow, and which ceiling detector notices it first.</p>
   <div class="btns">${info.map((x,i)=>btn('s:'+i,`${i+1} · ${x.t}`)).join('')}</div>
   <div class="out" id="o2"></div><div class="btns one">${btn('play','Play the stages from the start','primary')}</div>
   <div class="kick">What the detectors look like</div><div class="pics"><figure><img src="img/det_photo.png" alt="Photoelectric smoke detector"><figcaption>Photoelectric smoke detector</figcaption></figure><figure><img src="img/det_ion.png" alt="Ionization smoke detector"><figcaption>Ionization smoke detector</figcaption></figure></div>
   <ul class="facts"><li>The move from the flame stage to the heat stage is <b>very fast</b>.</li><li>Each detector is designed for a specific stage, so we install different types.</li></ul>`,
   act(a){if(a==='play'){auto=true;clock=0;ctx.norm.clear();set(0);return}if(a.startsWith('s:')){auto=false;set(+a.slice(2))}},
   init(){set(0)},
   update(dt,t){if(auto){clock+=dt;const n=Math.min(3,Math.floor(clock/4.5));if(n!==stage)set(n);if(clock>20){clock=0;ctx.norm.clear();set(0)}}
     if(stage<=1)for(let i=0;i<3;i++)ctx.add.spawn(-.6+R(-.15,.15),.62,-.6+R(-.15,.15),R(-.1,.1),R(.3,.8),R(-.1,.1),R(1.5,3),.03,5);
     if(stage>=1){const n=stage===1?5:stage===2?6:10;for(let i=0;i<n*dt*12;i++)ctx.norm.spawn(-.6+R(-.15,.15),.8,-.6+R(-.15,.15),R(-.15,.15),R(.6,1),R(-.15,.15),R(4,7),.35,1)}
     dets.forEach((d,i)=>{const on=stage>=i;d.led.material.color.setHex(on?(Math.sin(t*10)>0?0xff2a1a:0x550000):0x330000);d.tg.classList.toggle('sel',stage===i)});
     room.intensity+=((stage===3?14:stage===2?3:0)-room.intensity)*Math.min(1,dt*2)}};
  return self}});

// 3. Spread
function cardboardBox(w=.5,h=.4,d=.4){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({map:CARD(),roughness:.9});const b=mesh(new THREE.BoxGeometry(w,h,d),m);b.position.y=h/2;g.add(b);g.userData.body=b;return g}
function pallet(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({map:WOOD(),roughness:.85});
  for(let i=0;i<5;i++)g.add(mesh(new THREE.BoxGeometry(1,.022,.16),m,0,.13,-.42+i*.21));
  for(const z of [-.42,0,.42])g.add(mesh(new THREE.BoxGeometry(1,.1,.1),m,0,.07,z));for(let i=0;i<3;i++)g.add(mesh(new THREE.BoxGeometry(1,.022,.12),m,0,.011,-.42+i*.42));return g}
function stack(){const g=new THREE.Group();const p=pallet();g.add(p);const a=cardboardBox(.48,.4,.44);a.position.set(-.24,.14,-.2);const b=cardboardBox(.48,.4,.44);b.position.set(.24,.14,-.2);const c=cardboardBox(.48,.4,.44);c.position.set(0,.14,.24);const d=cardboardBox(.46,.36,.42);d.position.set(0,.54,0);d.rotation.y=.2;
  g.add(a,b,c,d);g.userData.body=a.userData.body;g.userData.bodies=[a,b,c,d].map(x=>x.userData.body);return g}
CH.push({id:'spread',name:'Fire spread',build(){
  const ctx=makeCtx();const s=ctx.scene;let items=[],mode='v',clock=0,rings=[];
  const ringM=new THREE.MeshBasicMaterial({color:0xff6a20,transparent:true,opacity:.5,side:THREE.DoubleSide,depthWrite:false});
  const char=new THREE.Color(.16,.1,.07);
  function clear(){items.forEach(it=>{s.remove(it.o);it.f&&it.f.remove()});ctx.fires.length=0;items=[];rings.forEach(r=>s.remove(r));rings=[];ctx.add.clear();ctx.norm.clear();clock=0}
  function bodiesOf(o){return o.userData.bodies||[o.userData.body].filter(Boolean)}
  function ignite(it){if(it.f)return;it.f=new Fire(ctx,it.fp,{r:it.r||.3,h:it.h||.9,I:0,T:1.25,smoke:.35});ctx.fires.push(it.f);it.burn=0}
  function build(m){clear();mode=m;
    if(m==='v'){const rack=new THREE.Group();s.add(rack);items.push({o:rack});const steel=new THREE.MeshStandardMaterial({color:0x3d6fa8,metalness:.6,roughness:.4});const gal=new THREE.MeshStandardMaterial({color:0x9aa3ad,metalness:.8,roughness:.35});
      for(const x of [-.9,.9])for(const z of [-.4,.4])rack.add(mesh(new THREE.BoxGeometry(.06,3.4,.06),steel,x,1.7,z));
      for(let i=0;i<3;i++){const y=.1+i*1.15;rack.add(mesh(new THREE.BoxGeometry(1.86,.05,.86),gal,0,y,0));rack.add(mesh(new THREE.BoxGeometry(1.86,.08,.04),M(0xe2a12a,{metalness:.4}),0,y+.02,.43));
        const b1=cardboardBox(.6,.5,.5);b1.position.set(-.35,y+.03,0);const b2=cardboardBox(.55,.45,.5);b2.position.set(.35,y+.03,0);s.add(b1,b2);
        items.push({o:b1,fp:new THREE.Vector3(-.35,y+.55,0),at:i*2.8,r:.25,h:.75},{o:b2,fp:new THREE.Vector3(.35,y+.5,0),at:i*2.8+.6,r:.25,h:.75})}}
    if(m==='h'){[-1.6,1.6].forEach((x,i)=>{const st=stack();st.position.set(x,0,0);s.add(st);items.push({o:st,fp:new THREE.Vector3(x,.98,0),at:i?5.5:0,rad:!i,r:.4,h:1.1})})}
    if(m==='c'){for(let i=0;i<5;i++){const b=cardboardBox(.6,.55,.55);b.position.set(-1.2+i*.6,0,0);b.rotation.y=(i%2)*.04;s.add(b);items.push({o:b,fp:new THREE.Vector3(-1.2+i*.6,.58,0),at:i*1.9,r:.26,h:.85})}}
    document.querySelectorAll('[data-act^="m:"]').forEach(b=>b.classList.toggle('on',b.dataset.act==='m:'+m));
    $('#o3').innerHTML={v:'<b>Vertical spread:</b> hot gases and sparks rise, igniting the boxes on the shelves above the fire.',h:'<b>Horizontal spread:</b> radiant heat warms the other goods until they ignite, without the flames touching them.',c:'<b>Direct contact:</b> each burning box ignites the box touching it.'}[m]}
  const self={ctx,cam:[3.6,2.8,5.2],target:[0,1.2,0],orbit:true,hint:'Pick a type of spread and watch',
   panel:()=>`<div class="kick">Lesson 1 · Fire and its causes</div><h2>How does fire spread?</h2>
   <p class="lead">Every fire starts small. The real danger is its ability to spread. See the three ways in a warehouse.</p>
   <div class="btns">${btn('m:v','Vertical spread<small>upward</small>')}${btn('m:h','Horizontal spread<small>by radiation</small>')}${btn('m:c','Direct contact<small>material to material</small>')}${btn('again','Run it again')}</div>
   <div class="out" id="o3"></div>
   <div class="kick" style="margin-top:4px">We prevent spread with</div><div class="chips"><span class="chip">Building separation</span><span class="chip">Fire barriers</span><span class="chip">Door opening direction</span><span class="chip">Removing combustibles</span></div>`,
   act(a){if(a==='again')build(mode);else if(a.startsWith('m:'))build(a.slice(2))},init(){build('v')},
   update(dt,t){clock+=dt;items.forEach(it=>{if(it.fp&&!it.f&&clock>=it.at)ignite(it);if(it.f){it.burn=Math.min(1,(it.burn||0)+dt*.25);bodiesOf(it.o).forEach(b=>{if(!b.material.userData.c){b.material=b.material.clone();b.material.userData.c=1}b.material.color.setRGB(1-.84*it.burn,1-.9*it.burn,1-.93*it.burn)})}});
     if(mode==='h'&&items[0]&&items[0].f){if(Math.random()<dt*2.2){const r=new THREE.Mesh(new THREE.RingGeometry(.3,.36,48),ringM.clone());r.position.set(-1.6,.8,0);r.rotation.y=Math.PI/2;r.userData.t=0;s.add(r);rings.push(r)}
       if(!items[1].f){const k=Math.min(1,clock/5.5);bodiesOf(items[1].o).forEach(b=>{if(!b.material.userData.c){b.material=b.material.clone();b.material.userData.c=1}b.material.emissive=new THREE.Color(.6*k*k,.12*k*k,0)})}}
     rings.forEach(r=>{r.userData.t+=dt;r.position.x=-1.6+r.userData.t*1.9;r.scale.setScalar(1+r.userData.t*.8);r.material.opacity=.5*(1-r.userData.t/1.7)});
     rings=rings.filter(r=>{if(r.userData.t>1.7){s.remove(r);return false}return true});
     if(mode==='v')for(let i=0;i<2;i++)ctx.add.spawn(R(-.4,.4),R(.8,1.2),R(-.2,.2),R(-.1,.1),R(1.5,2.5),R(-.1,.1),R(.8,1.4),.03,4);
     if(clock>17)build(mode)}};
  return self}});

// 4. Classes
const AG=[{id:'water',n:'Water'},{id:'foam',n:'Foam'},{id:'co2',n:'Carbon dioxide'},{id:'pow',n:'Dry chemical powder'},{id:'dpow',n:'Special dry powder'},{id:'blank',n:'Fire blanket'}];
CH.push({id:'classes',name:'Fire classes',build(){
  const ctx=makeCtx({fogFar:30});const s=ctx.scene;
  const C=[{k:'A',n:'Solids',d:'Wood, paper, cloth, plastic, rubber',c:'#22a35a',ok:['water','foam','pow']},
    {k:'B',n:'Liquids and gases',d:'Petrol, oils, greases, acetylene',c:'#d9342b',ok:['foam','pow','co2']},
    {k:'C',n:'Electrical equipment',d:'Transformers, breakers, cables, batteries',c:'#2f7fd1',ok:['co2','pow']},
    {k:'D',n:'Metals',d:'Aluminum, magnesium, sodium, potassium',c:'#e9b80f',ok:['dpow']},
    {k:'K',n:'Cooking oils',d:'Kitchen oils and fats',c:'#9b59b6',ok:['blank','pow']}];
  const bad={water:{B:'Water spreads the burning liquid!',C:'Electric shock hazard! Water conducts electricity.',D:'Water reacts violently with metals!',K:'Water on cooking oil causes a flame burst!'},
    foam:{C:'Foam conducts electricity: shock hazard!',D:'Foam contains water and intensifies the reaction!',K:'Not the best choice for cooking oils.'},co2:{A:'CO₂ is weak against deep-seated fires in solids.',D:'Not suitable for reactive metals!',K:'Not the best choice for cooking oils.'},
    pow:{D:'Metals need special dry powder only.'},dpow:{A:'Special powder is for metals only.',B:'Special powder is for metals only.',C:'Special powder is for metals only.',K:'Special powder is for metals only.'},blank:{A:'The blanket is for small kitchen fires.',B:'Not enough for liquid fires.',C:'Cut the power and use CO₂ or powder.',D:'Metals need special dry powder.'}};
  const objs=[];
  C.forEach((c,i)=>{const a=(i-2)*.62;const x=Math.sin(a)*3.6,z=-Math.cos(a)*3.6+2.6;const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=-a;s.add(g);
    const ped=mesh(new THREE.CylinderGeometry(.72,.8,.4,48),M(0x2a211d,{roughness:.55,metalness:.2}));ped.position.y=.2;g.add(ped);
    const ringc=mesh(new THREE.TorusGeometry(.74,.03,8,64),new THREE.MeshBasicMaterial({color:c.c,toneMapped:false}));ringc.rotation.x=Math.PI/2;ringc.position.y=.4;g.add(ringc);
    let fp=[0,.9,0],fr=.25,white=0,fh=.75;
    if(c.k==='A'){const p=pallet();p.scale.setScalar(.8);p.position.y=.4;g.add(p);const b=cardboardBox(.42,.32,.36);b.position.set(-.15,.52,0);const b2=cardboardBox(.36,.28,.3);b2.position.set(.18,.52,.05);b2.rotation.y=.4;g.add(b,b2);fp=[0,.85,0];fr=.3}
    if(c.k==='B'){const dr=new THREE.Group();const dm=new THREE.MeshStandardMaterial({map:drumTex(),metalness:.6,roughness:.4});dr.add(mesh(new THREE.CylinderGeometry(.26,.26,.8,40),dm,0,.4,0));
      const top=new THREE.MeshStandardMaterial({color:0x1d4f86,metalness:.7,roughness:.35});for(const y of [.0,.8])dr.add(mesh(new THREE.TorusGeometry(.26,.015,8,40),top,0,y,0)).children.at(-1).rotation.x=Math.PI/2;
      dr.add(mesh(new THREE.CylinderGeometry(.255,.255,.01,40),top,0,.8,0));dr.position.set(-.18,.4,-.1);g.add(dr);
      const pud=mesh(new THREE.CircleGeometry(.5,32),new THREE.MeshPhysicalMaterial({color:0x140a04,roughness:.05,clearcoat:1}));pud.rotation.x=-Math.PI/2;pud.position.set(.15,.41,.15);g.add(pud);fp=[.2,.42,.2];fr=.38;fh=.9}
    if(c.k==='C'){const box=mesh(new THREE.BoxGeometry(.6,.9,.28),new THREE.MeshStandardMaterial({color:0x8d969f,metalness:.6,roughness:.4}));box.position.y=.85;g.add(box);
      const face=new THREE.Mesh(new THREE.PlaneGeometry(.56,.84),new THREE.MeshStandardMaterial({map:panelTex(),roughness:.6}));face.position.set(0,.85,.141);g.add(face);
      const cond=new THREE.MeshStandardMaterial({color:0x777,metalness:.8,roughness:.3});[-.18,0,.18].forEach(x=>g.add(mesh(new THREE.CylinderGeometry(.025,.025,.5,10),cond,x,1.55,0)));fp=[.1,1.05,.2];fr=.18;fh=.6}
    if(c.k==='D'){const pile=metalPile();pile.position.y=.4;g.add(pile);fp=[0,.46,0];white=1;fr=.28;fh=.6}
    if(c.k==='K'){const st=new THREE.Group();st.add(mesh(new THREE.BoxGeometry(.9,.5,.6),M(0xd8d8d8,{metalness:.6,roughness:.35}),0,.25,0));
      st.add(mesh(new THREE.BoxGeometry(.9,.02,.6),new THREE.MeshPhysicalMaterial({color:0x111111,roughness:.1,clearcoat:1}),0,.51,0));
      for(let k=0;k<4;k++)st.add(mesh(new THREE.CylinderGeometry(.025,.025,.03,12),M(0x222222),-.3+k*.2,.4,.31)).children.at(-1).rotation.x=Math.PI/2;
      const coil=mesh(new THREE.TorusGeometry(.12,.012,6,30),new THREE.MeshStandardMaterial({color:0xff4010,emissive:0xff3000,emissiveIntensity:1.5}));coil.rotation.x=Math.PI/2;coil.position.set(-.18,.525,0);st.add(coil);
      const pan=mesh(new THREE.CylinderGeometry(.2,.16,.07,32,1,true),M(0x2b2b2b,{metalness:.8,roughness:.35,side:THREE.DoubleSide}));pan.position.set(-.18,.565,0);st.add(pan);st.add(mesh(new THREE.CylinderGeometry(.16,.16,.01,32),M(0x2b2b2b,{metalness:.8}),-.18,.53,0));
      const oil=mesh(new THREE.CylinderGeometry(.18,.18,.005,32),new THREE.MeshPhysicalMaterial({color:0x6b4a10,roughness:.05,clearcoat:1}));oil.position.set(-.18,.575,0);st.add(oil);
      const hdl=mesh(new THREE.BoxGeometry(.3,.025,.04),M(0x111111));hdl.position.set(.12,.58,0);st.add(hdl);st.position.y=.4;g.add(st);fp=[-.18,1,0];fr=.18;fh=.8}
    const sg=sign3d(c.k);sg.position.set(0,2.15,0);g.add(sg);
    const wp=new THREE.Vector3(...fp);g.updateMatrixWorld();g.localToWorld(wp);
    const f=new Fire(ctx,wp,{r:fr,h:fh,smoke:white?.05:.2,white});ctx.fires.push(f);
    if(c.k==='C')g.userData.spark=true;
    const t=tag(ctx,g,`<span class="cls" style="background:${c.c}">${c.k}</span> ${c.n}`,new THREE.Vector3(0,-.05,.95),'hot');t.addEventListener('click',()=>self.act('c:'+i));
    objs.push({c,g,f,wp,sg})});
  let sel=0,spray=null;
  function pick(i){sel=i;const o=objs[i];o.f.T=1;spray=null;$('#c-n').innerHTML=`<span class="cls" style="background:${o.c.c}">${o.c.k}</span> &nbsp;${o.c.n}`;$('#c-d').textContent=o.c.d;$('#o4').innerHTML='Pick the right extinguishing agent for this fire.';
    document.querySelectorAll('.tag.hot').forEach((t,j)=>t.classList.toggle('sel',j===i));const v=new THREE.Vector3();o.g.getWorldPosition(v);self.focus=v}
  const self={ctx,cam:[0,4,9.4],target:[0,1,0],orbit:true,hint:'Pick a fire, then try an agent',
   panel:()=>`<div class="kick">Lesson 1 · Fire classification (US)</div><h2>Fire classes</h2>
   <p class="lead">Each class has a symbol, a color and an agent. Pick the fire, then try. The wrong agent can make the fire worse.</p>
   <div class="btns">${C.map((c,i)=>btn('c:'+i,`<span class="cls" style="background:${c.c};width:22px;height:22px;font-size:12px">${c.k}</span> ${c.n}`)).join('')}</div>
   <div class="out"><div id="c-n" style="font-weight:600"></div><div id="c-d" style="color:var(--mut);font-size:13px"></div></div>
   <div class="kick">Try an agent</div><div class="btns">${AG.map(a=>btn('a:'+a.id,a.n)).join('')}</div><div class="out" id="o4"></div>`,
   init(){pick(0)},
   act(a){if(a.startsWith('c:'))return pick(+a.slice(2));if(a.startsWith('a:')){const ag=a.slice(2),o=objs[sel];const ok=o.c.ok.includes(ag);spray={ag,t:0,ok};
     if(ok){o.f.T=0;$('#o4').innerHTML=`<b style="color:var(--ok)">Correct.</b> ${AG.find(x=>x.id===ag).n} is suitable for Class ${o.c.k}.`;toast('Well done! The fire is out','good')}
     else{o.f.T=2.2;setTimeout(()=>{if(o.f.T>1)o.f.T=1},1800);const m=(bad[ag]&&bad[ag][o.c.k])||'Not the right agent.';$('#o4').innerHTML=`<b style="color:var(--alarm)">Wrong.</b> ${m}`;toast(m,'bad')}}},
   update(dt,t){objs.forEach(o=>{o.sg.rotation.y=Math.atan2(camera.position.x-o.g.position.x,camera.position.z-o.g.position.z)-o.g.rotation.y;o.sg.position.y=2.15+Math.sin(t*1.5+o.g.position.x)*.05;
       if(o.g.userData.spark&&o.f.I>.1&&Math.random()<dt*6)for(let i=0;i<8;i++)ctx.add.spawn(o.wp.x,o.wp.y,o.wp.z,R(-1.5,1.5),R(.5,2.5),R(-1.5,1.5),R(.3,.7),.03,4)});
     if(spray&&spray.t<1.8){spray.t+=dt;const o=objs[sel],src=new THREE.Vector3(0,1.8,7);const dir=o.wp.clone().sub(src);const ty={water:2,foam:6,co2:3,pow:3,dpow:3,blank:-1}[spray.ag];
       if(ty>=0)for(let i=0;i<14;i++){const v=dir.clone().multiplyScalar(R(.85,1.05)/(ty===2?.85:.9));(ty===3||ty===6?ctx.norm:ctx.add).spawn(src.x,src.y,src.z,v.x+R(-.3,.3),v.y+(ty===2?4:1)+R(-.3,.3),v.z+R(-.3,.3),.95,ty===2?.05:.22,ty)}}
     if(this.focus){controls.target.lerp(new THREE.Vector3(this.focus.x*.5,1,this.focus.z*.5),Math.min(1,dt*2))}}};
  return self}});
// 5. Extinguisher anatomy + types
const TYPES=[{id:'WATER',n:'Water extinguisher',band:null,cls:['A'],pr:'Cooling',use:'Aim the water at the base of the flames. For vertical fires, start from the bottom.',pro:'Easy, cheap and non-toxic',con:'Class A only · freezes · conducts electricity · rusts'},
  {id:'FOAM',n:'Foam extinguisher',band:0xe9d9a6,cls:['A','B'],pr:'Smothering and cooling',use:'On liquid in a tank: aim at the inner wall above the liquid level.',pro:'Spreads fast and resists heat',con:'Freezes · conducts electricity'},
  {id:'CO2',n:'CO₂ extinguisher',band:0x111111,cls:['B','C'],pr:'Smothering',use:'From the nearest edge of the flames to the farthest. For equipment: aim the gas into its openings.',pro:'No residue · non-conductive · reaches into gaps',con:'No pressure gauge (checked by weight) · breathing hazard in enclosed spaces · weak in wind'},
  {id:'POWDER',n:'Dry chemical powder extinguisher',band:0x2d6fd6,cls:['A','B','C'],pr:'Smothering and chain inhibition',use:'Same method as the CO₂ extinguisher, sweeping side to side.',pro:'Fast knockdown · non-conductive · most common',con:'Blocks visibility · doesn’t cool · fire may reignite'}];
const PARTS=[{id:'lever',n:'Operating lever',d:'The moving lever above the carrying handle. Squeeze it to discharge the extinguisher.'},{id:'pin',n:'Safety pin',d:'Locks the lever to prevent accidental discharge. First step: pull it.'},
  {id:'handle',n:'Carrying handle',d:'The fixed handle you hold the extinguisher by.'},{id:'gauge',n:'Pressure gauge',d:'Shows readiness: the needle must be in the green. CO₂ extinguishers have no gauge; they’re checked by weight.'},
  {id:'hose',n:'Discharge hose',d:'Carries the agent to the nozzle. Small extinguishers may have no hose.'},{id:'body',n:'Cylinder',d:'The metal cylinder that holds the extinguishing agent.'},{id:'tag',n:'Inspection tag',d:'Records the periodic inspection date. Inspect regularly and check the pin and the gauge.'}];
const CO2A={lever:[0,2.55,.55],pin:[.55,2.28,.1],handle:[-.15,1.98,.75],hose:[-.56,1.4,.02],body:[.44,.9,.2],gauge:null,tag:null};
function makeExt(type,scaleReal){const T=TYPES.find(x=>x.id===type);if(type!=='CO2'&&EXT_SRC){const e=realExt(T.band);e.scale.setScalar(scaleReal);e.userData.real=true;return e}
  const e=extinguisher(type);e.userData.real=false;return e}
CH.push({id:'anatomy',name:'The extinguisher up close',build(){
  const ctx=makeCtx({fogFar:30});const s=ctx.scene;let ex=null,type='POWDER',selp=null,marks=[];let co=[];const NS='http://www.w3.org/2000/svg';const svg=document.createElementNS(NS,'svg');svg.id='leaders';$('#labels').prepend(svg);
  const plinth=mesh(new THREE.CylinderGeometry(.9,1,.12,48),M(0x2a211d,{roughness:.45,metalness:.25}));plinth.position.y=.06;s.add(plinth);
  const rim=mesh(new THREE.TorusGeometry(.95,.012,6,64),new THREE.MeshBasicMaterial({color:0xff7a1f,toneMapped:false}));rim.rotation.x=Math.PI/2;rim.position.y=.12;s.add(rim);
  const spot=new THREE.SpotLight(0xffffff,11,12,.45,.6,1.2);spot.position.set(2.5,5,3);spot.target.position.set(0,1.1,0);spot.castShadow=true;s.add(spot,spot.target);
  const SC=4.2;
  function make(t){if(ex){s.remove(ex);ctx.tags.filter(o=>o.userData.part).forEach(o=>o.parent&&o.parent.remove(o));marks.forEach(m=>m.parent&&m.parent.remove(m));marks=[];co.forEach(c=>{c.el.remove();c.g.remove()});co=[]}type=t;ex=makeExt(t,SC);ex.position.y=.12;s.add(ex);
    const A=ex.userData.real?ex.userData.anchor:CO2A;
    PARTS.forEach((p,i)=>{const a=A[p.id];if(!a)return;const v=new THREE.Vector3(...a);
      const mk=new THREE.Mesh(new THREE.SphereGeometry(ex.userData.real?.012:.05,16,12),new THREE.MeshBasicMaterial({color:0xffb547,toneMapped:false,transparent:true,opacity:.9}));mk.position.copy(v);ex.add(mk);mk.userData.p=p.id;marks.push(mk);
      mk.visible=false;
      const el=document.createElement('div');el.className='tag hot co';el.innerHTML=`<i>${i+1}</i><span>${p.n}</span>`;el.dataset.p=p.id;el.addEventListener('click',()=>self.act('p:'+p.id));$('#labels').appendChild(el);
      const g=document.createElementNS(NS,'g');g.innerHTML='<path/><circle class="ring" r="9"/><circle class="dot" r="4"/>';svg.appendChild(g);
      co.push({el,g,mk,id:p.id,side:null,lx:null,ly:null})});
    const T=TYPES.find(x=>x.id===t);const cl={A:'#22a35a',B:'#d9342b',C:'#2f7fd1'};
    $('#o5t').innerHTML=`<b>${T.n}</b><div class="chips" style="margin:8px 0">${T.cls.map(c=>`<span class="chip"><span class="cls" style="background:${cl[c]};width:20px;height:20px;font-size:11px">${c}</span> Class ${c}</span>`).join('')}<span class="chip" style="color:var(--flame)">${T.pr}</span></div>
      <div style="color:var(--mut);font-size:13px">${T.use}</div><div style="margin-top:8px;font-size:13px"><span style="color:var(--ok)">+</span> ${T.pro}<br><span style="color:var(--alarm)">−</span> ${T.con}</div>`;
    document.querySelectorAll('[data-act^="t:"]').forEach(b=>b.classList.toggle('on',b.dataset.act==='t:'+t));selp=null;$('#o5').innerHTML='Tap any number on the extinguisher to learn the part.'}
  const self={ctx,cam:[2.6,2.1,4.4],target:[0,1.15,0],orbit:true,hint:'Drag to rotate the extinguisher · tap the numbers',
   panel:()=>`<div class="kick">Lesson 3 · Firefighting systems and equipment</div><h2>The extinguisher up close</h2>
   <p class="lead">A real extinguisher at true scale. Rotate it, tap its parts, and switch types to see the difference.</p>
   <div class="out" id="o5"></div>
   <div class="kick">Parts</div><div class="btns">${PARTS.map((p,i)=>btn('p:'+p.id,`${i+1} · ${p.n}`)).join('')}</div>
   <div class="kick">Extinguisher type</div><div class="btns">${TYPES.map(t=>btn('t:'+t.id,t.n.replace(/ extinguisher$/,''))).join('')}</div>
   <div class="out" id="o5t"></div>`,
   init(){make('POWDER')},
   act(a){if(a.startsWith('t:'))return make(a.slice(2));if(a.startsWith('p:')){const id=a.slice(2);if(type==='CO2'&&(id==='gauge'||id==='tag')){$('#o5').innerHTML=id==='gauge'?'<b>CO₂ extinguishers have no pressure gauge.</b> They’re checked by weight.':'<b>Inspection tag</b> is on every extinguisher.';return}
     selp=id;const p=PARTS.find(x=>x.id===id);$('#o5').innerHTML=`<b>${p.n}</b><br>${p.d}`;document.querySelectorAll('.tag[data-p]').forEach(t=>t.classList.toggle('sel',t.dataset.p===id))}},
   post(){callouts()},
   update(dt,t){if(!ex)return;marks.forEach(m=>{const on=m.userData.p===selp;m.scale.setScalar(on?1.6+.5*Math.sin(t*6):1);m.material.color.setHex(on?0xffffff:0xffb547)});
     if(!RM&&!selp)ex.rotation.y+=dt*.15}};
  /* Callouts: names sit in two tidy columns beside the extinguisher, each tied to
     its part by a leader line ending in a dot on the part itself. Columns re-sort
     as the extinguisher turns, with easing so nothing jumps. */
  function callouts(){if(!co.length)return;const host=$('#labels'),W=host.clientWidth,H=host.clientHeight,narrow=W<560;
    const pr=v=>{const q=v.clone().project(camera);return[(q.x*.5+.5)*W,(-q.y*.5+.5)*H]};
    const ctr=new THREE.Vector3();ex.getWorldPosition(ctr);ctr.y+=1.1;const C=pr(ctr);
    const it=co.map(c=>{const w=new THREE.Vector3();c.mk.getWorldPosition(w);const[x,y]=pr(w);
      const out=w.clone().sub(new THREE.Vector3(ctr.x,w.y,ctr.z)),toCam=camera.position.clone().sub(w);
      const dx=x-C[0];if(c.side==null||Math.abs(dx)>14)c.side=dx<0?'L':'R';return{c,x,y,back:out.dot(toCam)<-.02,side:c.side}});
    for(;;){const L=it.filter(o=>o.side==='L'),R=it.filter(o=>o.side==='R');if(Math.abs(L.length-R.length)<=1)break;
      const big=L.length>R.length?L:R;big.sort((a,b)=>Math.abs(a.x-C[0])-Math.abs(b.x-C[0]));big[0].side=big[0].side==='L'?'R':'L'}
    const off=narrow?0:Math.min(W*.3,250),gap=8,pad=8;
    ['L','R'].forEach(sd=>{const col=it.filter(o=>o.side===sd).sort((a,b)=>a.y-b.y);let prev=pad-gap;
      col.forEach(o=>{o.w=o.c.el.offsetWidth;o.h=o.c.el.offsetHeight;o.ty=Math.max(prev+gap,o.y-o.h/2);prev=o.ty+o.h});
      let lim=H-pad;for(let k=col.length-1;k>=0;k--){const o=col[k];if(o.ty+o.h>lim)o.ty=lim-o.h;lim=o.ty-gap}
      col.forEach(o=>{let tx=narrow?(sd==='L'?pad:W-pad-o.w):(sd==='L'?C[0]-off-o.w:C[0]+off);tx=Math.max(pad,Math.min(W-pad-o.w,tx));o.tx=tx})});
    it.forEach(o=>{const c=o.c,el=c.el,on=c.id===selp;
      c.lx=c.lx==null?o.tx:c.lx+(o.tx-c.lx)*.2;c.ly=c.ly==null?o.ty:c.ly+(o.ty-c.ly)*.2;
      el.style.transform=`translate(${c.lx.toFixed(1)}px,${c.ly.toFixed(1)}px)`;el.classList.toggle('R',o.side==='R');el.classList.toggle('back',o.back&&!on);
      const ay=c.ly+o.h/2,ax=o.side==='L'?c.lx+o.w:c.lx,ex2=ax+(o.side==='L'?14:-14);
      const g=c.g;g.setAttribute('class',(on?'on ':'')+(o.back&&!on?'back':''));
      g.children[0].setAttribute('d',`M${ax.toFixed(1)} ${ay.toFixed(1)}H${ex2.toFixed(1)}L${o.x.toFixed(1)} ${o.y.toFixed(1)}`);
      g.children[1].setAttribute('cx',o.x.toFixed(1));g.children[1].setAttribute('cy',o.y.toFixed(1));g.children[2].setAttribute('cx',o.x.toFixed(1));g.children[2].setAttribute('cy',o.y.toFixed(1))})}
  return self}});
// 6. PASS training yard
function skyDome(){const m=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{},vertexShader:`varying vec3 vP;void main(){vP=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
  fragmentShader:`varying vec3 vP;float h(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,45.164)))*43758.5453);}
  void main(){float y=vP.y;vec3 top=vec3(.02,.04,.11),mid=vec3(.16,.09,.2),hor=vec3(.95,.42,.16);
   vec3 c=mix(hor,mid,smoothstep(-.02,.18,y));c=mix(c,top,smoothstep(.15,.7,y));
   float glow=pow(max(0.,1.-abs(y-.01)*7.),3.)*smoothstep(-.3,1.,-vP.z);c+=vec3(1.,.45,.15)*glow*.6;
   float st=step(.9975,h(floor(vP*420.)))*smoothstep(.25,.6,y);c+=vec3(st*.8);gl_FragColor=vec4(c,1.);}`});
  const s=new THREE.Mesh(new THREE.SphereGeometry(90,32,16),m);s.renderOrder=-1;return s}
function concreteTex(){return canvasTex(512,512,g=>{g.fillStyle='#4a4644';g.fillRect(0,0,512,512);
  for(let i=0;i<9000;i++){const v=60+Math.random()*40|0;g.fillStyle=`rgba(${v},${v-3},${v-6},.35)`;g.fillRect(Math.random()*512,Math.random()*512,2,2)}
  g.strokeStyle='rgba(20,18,17,.7)';g.lineWidth=3;g.beginPath();g.moveTo(256,0);g.lineTo(256,512);g.moveTo(0,256);g.lineTo(512,256);g.stroke()})}
function hazardTex(){const t=canvasTex(256,32,g=>{for(let i=-2;i<12;i++){g.fillStyle=i%2?'#f2c230':'#1a1a1a';g.beginPath();g.moveTo(i*32,0);g.lineTo(i*32+32,0);g.lineTo(i*32+16,32);g.lineTo(i*32-16,32);g.fill()}});t.wrapS=THREE.RepeatWrapping;return t}
function sockTex(){const t=canvasTex(256,64,g=>{for(let i=0;i<5;i++){g.fillStyle=i%2?'#f4f1ea':'#ff5a1f';g.fillRect(i*52,0,52,64)}});return t}
CH.push({id:'pass',name:'PASS training yard',build(){
  const ctx=makeCtx({floor:false,fogNear:22,fogFar:70});const s=ctx.scene;s.background=null;s.fog.color.setHex(0x1b1220);
  s.add(skyDome());ctx.hemi.intensity=.35;ctx.key.intensity=.35;ctx.key.color.setHex(0xffb38a);ctx.key.position.set(-6,5,-10);
  const ct=concreteTex();ct.wrapS=ct.wrapT=THREE.RepeatWrapping;ct.repeat.set(18,18);
  const ground=mesh(new THREE.PlaneGeometry(140,140),new THREE.MeshStandardMaterial({map:ct,roughness:.92,color:0x8a8480}));ground.rotation.x=-Math.PI/2;s.add(ground);
  const pt=concreteTex();const pad=mesh(new THREE.BoxGeometry(9,.06,9),new THREE.MeshStandardMaterial({map:pt,roughness:.8,color:0xb5afaa}),0,.03,0);s.add(pad);
  const hz=hazardTex();hz.repeat.set(9,1);[[0,4.4,0],[0,-4.4,0],[4.4,0,1],[-4.4,0,1]].forEach(([x,z,r])=>{const b=mesh(new THREE.PlaneGeometry(9,.3),new THREE.MeshStandardMaterial({map:hz,roughness:.7}));b.rotation.x=-Math.PI/2;b.rotation.z=r?Math.PI/2:0;b.position.set(x,.065,z);s.add(b)});
  // distance rings painted on pad
  [1,2.5,4].forEach(d=>{const r=mesh(new THREE.RingGeometry(d+.95,d+1.0,64,1,Math.PI*.25,Math.PI*.5),new THREE.MeshBasicMaterial({color:d===2.5?0x3fd17e:0xffffff,transparent:true,opacity:d===2.5?.75:.25}));r.rotation.x=-Math.PI/2;r.position.y=.066;s.add(r)});
  // tray
  const steel=new THREE.MeshStandardMaterial({color:0x6d7177,metalness:.8,roughness:.45});
  const tray=new THREE.Group();s.add(tray);const gB=tray;const T2=1.9;
  [[0,T2/2,T2,.06],[0,-T2/2,T2,.06],[T2/2,0,.06,T2],[-T2/2,0,.06,T2]].forEach(([x,z,w,d])=>{tray.add(mesh(new THREE.BoxGeometry(w,.26,d),steel,x,.19,z))});
  tray.add(mesh(new THREE.BoxGeometry(T2,.04,T2),steel,0,.08,0));
  const liquid=mesh(new THREE.PlaneGeometry(T2-.08,T2-.08),new THREE.MeshPhysicalMaterial({color:0x140a04,roughness:.05,metalness:.2,clearcoat:1}));liquid.rotation.x=-Math.PI/2;liquid.position.y=.2;tray.add(liquid);
  const tagB=tag(ctx,tray,'Fuel tray · Class B fire',new THREE.Vector3(0,-.05,1.25));
  // scenario A: pallets + cardboard
  const gA=new THREE.Group();s.add(gA);
  [[-.5,-.48],[.5,-.48],[-.5,.48],[.5,.48]].forEach(([x,z],k)=>{const p1=pallet();p1.position.set(x,.065,z);p1.rotation.y=(k%2)*.04;gA.add(p1);const p2=pallet();p2.position.set(x+R(-.04,.04),.215,z);p2.rotation.y=Math.PI/2+R(-.06,.06);gA.add(p2)});
  [[-1.25,-.9,.3],[1.3,-.7,-.4],[-1.2,.85,.9],[1.15,1.05,.2]].forEach(([x,z,r])=>{const b=cardboardBox(.5,.42,.44);b.position.set(x,.065,z);b.rotation.y=r;gA.add(b)});
  const plk=new THREE.MeshStandardMaterial({map:WOOD(),roughness:.85});[[-.3,.2,.5],[.4,-.1,-.7],[0,.35,1.2]].forEach(([x,z,r])=>{const b=mesh(new THREE.BoxGeometry(1.1,.04,.12),plk,x,.39,z);b.rotation.y=r;gA.add(b)});
  const char=mesh(new THREE.CircleGeometry(1.5,40),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.5,depthWrite:false}));char.rotation.x=-Math.PI/2;char.position.y=.068;gA.add(char);
  const tagA=tag(ctx,gA,'Wood and cardboard · Class A fire',new THREE.Vector3(0,-.05,1.45));
  // scenario C: electrical panel + cables
  const gC=new THREE.Group();s.add(gC);
  const cab=new THREE.Group();cab.position.set(0,.065,-1.45);gC.add(cab);
  const pm=new THREE.MeshStandardMaterial({map:panelTex(),roughness:.6,metalness:.4}),gm=M(0x8d959d,{metalness:.5,roughness:.5});
  [-.55,0,.55].forEach(x=>{cab.add(mesh(new THREE.BoxGeometry(.53,1.9,.6),gm,x,.95,0));const d=mesh(new THREE.PlaneGeometry(.47,1.8),pm,x,.95,.302);cab.add(d)});
  const hvT=canvasTex(256,220,g=>{g.fillStyle='#ffd400';g.beginPath();g.moveTo(128,8);g.lineTo(248,212);g.lineTo(8,212);g.closePath();g.fill();g.lineWidth=10;g.strokeStyle='#111';g.stroke();g.fillStyle='#111';g.beginPath();g.moveTo(140,60);g.lineTo(100,140);g.lineTo(130,140);g.lineTo(112,195);g.lineTo(160,115);g.lineTo(128,115);g.lineTo(150,60);g.closePath();g.fill()});
  [-.55,.55].forEach(x=>{const w=new THREE.Mesh(new THREE.PlaneGeometry(.26,.22),new THREE.MeshStandardMaterial({map:hvT,transparent:true,roughness:.6}));w.position.set(x,1.55,.306);cab.add(w)});
  const cblM=M(0x161616,{roughness:.7}),cblO=M(0xb8551c,{roughness:.6});
  for(let k=0;k<7;k++){const z0=-1.15,pts=[new THREE.Vector3(-.75+k*.25,.4,z0),new THREE.Vector3(-.8+k*.26+R(-.15,.15),.1,-.6),new THREE.Vector3(-.85+k*.27+R(-.2,.2),.1,.2),new THREE.Vector3(-1+k*.33+R(-.2,.2),.1,.95)];
    gC.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),40,.035,8),k%3===1?cblO:cblM))}
  const tryM=M(0x7c848c,{metalness:.7,roughness:.4});[-.95,.95].forEach(x=>gC.add(mesh(new THREE.BoxGeometry(.05,.08,2.2),tryM,x,.1,-.05)));for(let i=0;i<8;i++)gC.add(mesh(new THREE.BoxGeometry(1.9,.025,.04),tryM,0,.07,-1.05+i*.28));
  const drum=new THREE.Group();drum.position.set(1.55,.065,.6);gC.add(drum);[-.2,.2].forEach(z=>{const d=mesh(new THREE.CylinderGeometry(.38,.38,.04,32),M(0x8a6a3d,{map:WOOD()}),0,.38,z);d.rotation.x=Math.PI/2;drum.add(d)});const core=mesh(new THREE.CylinderGeometry(.24,.24,.38,24),cblM,0,.38,0);core.rotation.x=Math.PI/2;drum.add(core);
  const tagC=tag(ctx,gC,'Electrical panel and cables · Class C fire',new THREE.Vector3(0,-.05,1.4));
  // scenario K: commercial fryer counter
  const gK=new THREE.Group();s.add(gK);const ss=M(0xc9ccd0,{metalness:.85,roughness:.3});
  gK.add(mesh(new THREE.BoxGeometry(2.2,.84,1.2),ss,0,.485,0));gK.add(mesh(new THREE.BoxGeometry(2.2,.6,.06),ss,0,1.2,-.63));
  [-.55,.55].forEach(x=>{gK.add(mesh(new THREE.BoxGeometry(.96,.06,1.02),M(0x2a2a2a,{metalness:.6,roughness:.4}),x,.9,0));const oil=mesh(new THREE.PlaneGeometry(.9,.96),new THREE.MeshPhysicalMaterial({color:0x5a3a08,roughness:.1,clearcoat:1}));oil.rotation.x=-Math.PI/2;oil.position.set(x,.935,0);gK.add(oil);
    const bk=mesh(new THREE.BoxGeometry(.4,.02,.35),M(0x999999,{metalness:.9,roughness:.3}),x+.2,1.15,-.45);bk.rotation.x=-.6;gK.add(bk)});
  for(let i=0;i<4;i++)gK.add(mesh(new THREE.CylinderGeometry(.025,.025,.04,12),M(0x111111),-.75+i*.5,.65,.61).rotateX(Math.PI/2));
  const hood=mesh(new THREE.BoxGeometry(2.4,.4,1.1),ss,0,2.55,-.2);gK.add(hood);
  const tagK=tag(ctx,gK,'Kitchen oil pan · Class K fire',new THREE.Vector3(0,.2,1.05));
  
  const SCN={
   A:{n:'Wood and cardboard',c:'A',col:'#22a35a',g:gA,t:tagA,y:.34,sx:.55,sz:.55,bx:1,bz:1,r:.3,
      brief:'Pallets and cardboard burning in the yard. Ordinary solids = <b>Class A fire</b>.',
      ok:{WATER:'Excellent choice: water cools solids and prevents reignition',FOAM:'Suitable: foam works on Class A fires',POWDER:'Suitable: ABC powder works on Class A, but cool the area afterwards'},
      bad:{CO2:'CO₂ doesn’t cool or cover the wood, and the embers reignite. Pick a Class A extinguisher'}},
   B:{n:'Fuel tray',c:'B',col:'#d9342b',g:gB,t:tagB,y:.2,sx:.58,sz:.58,bx:1,bz:1,r:.3,
      brief:'Fuel burning in the training tray. Liquid fuel = <b>Class B fire</b>.',
      ok:{POWDER:'Excellent choice: dry chemical powder for Class B',CO2:'Suitable: CO₂ for Class B',FOAM:'Suitable: foam blankets the fuel surface'},
      bad:{WATER:'Water spreads the burning fuel! Pick another extinguisher'},flare:'WATER'},
   C:{n:'Electrical panel and cables',c:'C',col:'#2f7fd1',g:gC,t:tagC,y:.14,sx:.55,sz:.55,bx:1,bz:1,r:.28,
      brief:'Cables burning in front of a live electrical panel. Electrical equipment = <b>Class C fire</b>.<br><span style="color:var(--mut)">Cut the power if you can do it safely before extinguishing.</span>',
      ok:{CO2:'Excellent choice: CO₂ doesn’t conduct electricity and leaves no residue',POWDER:'Suitable: powder is non-conductive, but leaves residue on equipment'},
      bad:{WATER:'Electric shock hazard! Water conducts electricity',FOAM:'Electric shock hazard! Foam contains water and conducts electricity'},flare:'WATER FOAM',zap:true},
   K:{n:'Cooking oil in a kitchen',c:'K',col:'#9b59b6',g:gK,t:tagK,y:.94,sx:.55,sz:.3,bx:1.02,bz:.5,r:.22,
      brief:'The frying pan caught fire in the site kitchen. Cooking oils = <b>Class K fire</b>.<br><span style="color:var(--mut)">The fire blanket isn’t on the rack; choose from the extinguishers.</span>',
      ok:{POWDER:'Suitable: powder smothers the flames. Then turn off the source and cover the pan, because the oil stays hot'},
      bad:{WATER:'No! Water on hot oil flashes to steam and throws burning oil',FOAM:'Ordinary foam can’t handle cooking-oil heat and the fire comes back',CO2:'CO₂ pushes the burning oil and splashes it, and the hot oil reignites'},flare:'WATER CO2'}};
  let scn='B',SC=SCN.B;
  // patches
  const patches=[];for(let i=0;i<3;i++)for(let j=0;j<3;j++){const p=new THREE.Vector3((i-1)*.58,.2,(j-1)*.58);const f=new Fire(ctx,p,{r:.3,h:1.05,rate:120,smoke:.28});f.light.intensity=0;if(i*3+j!==4){f.light.visible=false}ctx.fires.push(f);patches.push({p,f,life:1})}
  const mainL=patches[4].f.light;mainL.distance=16;
  // floodlights
  [[-6,-5],[6,-5]].forEach(([x,z])=>{const pole=mesh(new THREE.CylinderGeometry(.07,.09,6,10),M(0x2b2b2e,{metalness:.6}),x,3,z);s.add(pole);
    const head=mesh(new THREE.BoxGeometry(.7,.35,.25),M(0x222222),x,6,z);head.lookAt(0,0,0);s.add(head);
    const lamp=new THREE.Mesh(new THREE.PlaneGeometry(.6,.26),new THREE.MeshBasicMaterial({color:0xfff4d8}));lamp.position.set(x*.985,5.98,z*.985+.13);lamp.lookAt(0,0,0);s.add(lamp);
    const sp=new THREE.SpotLight(0xfff0d8,7,30,.55,.6,1.2);sp.position.set(x,6,z);sp.target.position.set(0,0,0);sp.castShadow=true;sp.shadow.mapSize.set(1024,1024);s.add(sp,sp.target)});
  // fence & skyline
  const fm=M(0x1c1c22,{metalness:.5});for(let a=0;a<64;a++){const ang=a/64*Math.PI*2,x=Math.cos(ang)*20,z=Math.sin(ang)*20;s.add(mesh(new THREE.BoxGeometry(.08,2.2,.08),fm,x,1.1,z))}
  const fence=mesh(new THREE.TorusGeometry(20,.03,4,96),fm);fence.rotation.x=Math.PI/2;fence.position.y=2.1;s.add(fence);
  const sk=M(0x0d0a12,{roughness:1});for(let k=0;k<26;k++){const w=R(2,6),h=R(2,9),a=R(-2.6,-.5);s.add(mesh(new THREE.BoxGeometry(w,h,w),sk,Math.cos(a)*R(38,55),h/2,Math.sin(a)*R(38,55)))}
  const tank=mesh(new THREE.CylinderGeometry(3,3,5,28),M(0x1a1820,{metalness:.3}),-22,2.5,-32);s.add(tank);
  // windsock (wind blows from +z toward -z)
  const WIND=new THREE.Vector3(0,0,-1);ctx.norm.wind=[0,-.9];ctx.add.wind=[0,-.4];
  const wpole=mesh(new THREE.CylinderGeometry(.045,.06,4.2,10),M(0xd9d9d9,{metalness:.7}),-3.6,2.1,-1.2);s.add(wpole);
  const sock=new THREE.Mesh(new THREE.CylinderGeometry(.3,.14,1.7,24,8,true),new THREE.MeshStandardMaterial({map:sockTex(),side:THREE.DoubleSide,roughness:.8}));sock.geometry.rotateX(Math.PI/2);sock.geometry.translate(0,0,-.85);sock.position.set(-3.6,4.05,-1.2);s.add(sock);
  const sockRing=mesh(new THREE.TorusGeometry(.3,.02,8,24),M(0xd9d9d9,{metalness:.7}));sockRing.position.set(-3.6,4.05,-1.2);s.add(sockRing);
  tag(ctx,wpole,'Windsock: shows which way the wind blows',new THREE.Vector3(0,-2.3,0));
  // big painted ground arrow showing the wind direction
  const arrowT=canvasTex(256,512,g=>{g.fillStyle='rgba(120,200,255,.95)';g.beginPath();g.moveTo(128,20);g.lineTo(236,190);g.lineTo(168,190);g.lineTo(168,492);g.lineTo(88,492);g.lineTo(88,190);g.lineTo(20,190);g.closePath();g.fill()});
  const arrow=new THREE.Mesh(new THREE.PlaneGeometry(1.1,2.2),new THREE.MeshBasicMaterial({map:arrowT,transparent:true,depthWrite:false,toneMapped:false,opacity:.75}));arrow.rotation.x=-Math.PI/2;arrow.position.set(-5.6,.07,0);s.add(arrow);
  tag(ctx,arrow,'Wind direction',new THREE.Vector3(0,0,0));
  // moving wind streaks across the yard
  const streakM=new THREE.MeshBasicMaterial({color:0xcfe8ff,transparent:true,opacity:.35,depthWrite:false});const streaks=[];
  for(let i=0;i<34;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.012,.012,R(.6,1.4)),streakM);m.position.set(R(-7,7),R(.4,3.2),R(-9,9));m.userData.v=R(3,5);s.add(m);streaks.push(m)}
  // rack
  const rack=new THREE.Group();rack.position.set(-2.7,0,3.1);rack.rotation.y=.6;s.add(rack);
  const redM=new THREE.MeshStandardMaterial({color:0xb81d15,roughness:.45,metalness:.3}),dk=new THREE.MeshStandardMaterial({color:0x1c1c1c,roughness:.9});
  rack.add(mesh(new THREE.BoxGeometry(2.7,.05,.75),dk,0,.025,.05));
  rack.add(mesh(new THREE.BoxGeometry(2.7,1.9,.06),redM,0,.95,-.32));[-1.32,1.32].forEach(x=>rack.add(mesh(new THREE.BoxGeometry(.07,1.95,.4),redM,x,.97,-.14)));
  rack.add(mesh(new THREE.BoxGeometry(2.72,.08,.42),redM,0,1.94,-.12));
  const signT=canvasTex(512,96,g=>{g.fillStyle='#b81d15';g.fillRect(0,0,512,96);g.fillStyle='#fff';g.font='bold 44px sans-serif';g.textAlign='center';g.fillText('FIRE EXTINGUISHERS',256,62)});
  const sgn=new THREE.Mesh(new THREE.PlaneGeometry(2.2,.4),new THREE.MeshStandardMaterial({map:signT,roughness:.5}));sgn.position.set(0,1.62,-.285);rack.add(sgn);
  for(let i=0;i<4;i++){const x=-.96+i*.64;
    const pad=mesh(new THREE.CylinderGeometry(.2,.2,.02,24),dk);pad.position.set(x,.06,0);rack.add(pad)}
  const OPT=[{id:'WATER',n:'Water'},{id:'FOAM',n:'Foam'},{id:'CO2',n:'CO₂'},{id:'POWDER',n:'Dry chemical'}];
  OPT.forEach((o,i)=>{const e=makeExt(o.id,1.5);if(!e.userData.real)e.scale.setScalar(.35);e.position.set(-.96+i*.64,.07,0);e.rotation.y=e.userData.real?0:Math.PI*.15;rack.add(e);o.e=e;
    {const bb=new THREE.Box3().setFromObject(e),sz=bb.getSize(new THREE.Vector3());const rr=e.userData.real?.0955*1.5+.016:Math.min(sz.x,sz.z)/2*.8+.012,yy=.07+sz.y*(e.userData.real?.5:.55);
      const brM=M(0x2b2b2b,{metalness:.6,roughness:.4}),bz=-.29;
      const strap=mesh(new THREE.TorusGeometry(rr,.012,8,40,Math.PI*1.45),brM);strap.rotation.set(Math.PI/2,0,-Math.PI*.725+Math.PI/2+Math.PI);strap.position.set(e.position.x,yy,0);strap.scale.z=2.6;rack.add(strap);
      rack.add(mesh(new THREE.BoxGeometry(.07,.05,-bz-rr+.01),brM,e.position.x,yy,(bz-rr)/2));
      rack.add(mesh(new THREE.BoxGeometry(.13,.26,.012),brM,e.position.x,yy+.02,bz+.008));
      const clip=mesh(new THREE.BoxGeometry(.05,.035,.03),M(0xcf2a1f,{roughness:.4}),e.position.x+rr*.62,yy,rr*.78);rack.add(clip)}
      o.t=tag(ctx,e,o.n,new THREE.Vector3(0,e.userData.real?.64:3.1,0),'hot');o.t.addEventListener('click',()=>self.act('x:'+o.id))});
  // markers for approach
  const MK=[{id:'back',p:[0,0,4.2],ok:true,n:'Wind at your back'},{id:'face',p:[0,0,-4.2],n:'Wind in your face'},{id:'side',p:[4.2,0,0],n:'Wind from the side'}];
  MK.forEach(m=>{const r=new THREE.Mesh(new THREE.RingGeometry(.35,.48,40),new THREE.MeshBasicMaterial({color:0xffb547,transparent:true,opacity:.9,depthWrite:false}));r.rotation.x=-Math.PI/2;r.position.set(m.p[0],.08,m.p[2]);r.visible=false;s.add(r);m.r=r;
    m.t=tag(ctx,r,m.n,new THREE.Vector3(0,0,.4),'hot');m.t._o.visible=false;m.t.addEventListener('click',()=>self.act('m:'+m.id))});
  // held extinguisher (first person, child of camera)
  const held=new THREE.Group();const heldExt=t=>{const e=makeExt(t,.95);if(!e.userData.real)e.scale.setScalar(.22);e.position.set(.34,-.66,-.62);e.rotation.set(.1,-.5+(e.userData.real?-1.2:0),.05);return e};
  const pinFor=e=>{if(!e.userData.real){const p=e.userData.parts.pinG;p.userData.p0=p.position.clone();p.userData.off=.9;return p}const pg=new THREE.Group();const ring=new THREE.Mesh(new THREE.TorusGeometry(.016,.004,8,20),new THREE.MeshStandardMaterial({color:0xf2c230,metalness:.6,roughness:.3}));ring.rotation.y=Math.PI/2;const rod=new THREE.Mesh(new THREE.CylinderGeometry(.0025,.0025,.05,6),new THREE.MeshStandardMaterial({color:0xdddddd,metalness:.9,roughness:.2}));rod.rotation.z=Math.PI/2;rod.position.x=-.02;pg.add(ring,rod);pg.position.set(...e.userData.anchor.pin);pg.position.x+=.03;pg.userData.p0=pg.position.clone();pg.userData.off=.12;e.add(pg);return pg};
  const hx=heldExt('POWDER');held.add(hx);
  const nozzle=new THREE.Group();const nzm=mesh(new THREE.CylinderGeometry(.022,.012,.16,16),M(0x111111,{roughness:.4}));nzm.rotation.x=Math.PI/2;nzm.position.z=.08;nozzle.add(nzm);
  const grip=mesh(new THREE.CylinderGeometry(.018,.018,.08,12),M(0x222222));grip.rotation.x=Math.PI/2;grip.position.z=-.02;nozzle.add(grip);nozzle.position.set(.06,-.24,-.55);held.add(nozzle);
  const hoseC=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(.28,-.42,-.62),new THREE.Vector3(.2,-.5,-.6),new THREE.Vector3(.1,-.36,-.56),new THREE.Vector3(.06,-.25,-.53)]),20,.012,8),M(0x111111,{roughness:.5}));held.add(hoseC);
  held.visible=false;s.add(camera);camera.add(held);let PIN=pinFor(hx);
  // reticle
  const ret=new THREE.Mesh(new THREE.RingGeometry(.2,.26,40),new THREE.MeshBasicMaterial({color:0x3fd17e,transparent:true,opacity:.9,depthTest:false}));ret.rotation.x=-Math.PI/2;ret.renderOrder=9;ret.visible=false;s.add(ret);
  // heat overlay
  const heat=document.createElement('div');heat.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(255,80,20,0) 40%,rgba(255,60,10,.55) 100%);opacity:0;transition:opacity .3s';stageEl.appendChild(heat);
  // state
  let phase='pick',agent=null,firstPick=null,windOk=null,D=6,distOk=null,step=0,hold=false,lastX=0,sweep=0,tm=0,aimT=0,baseT=0,done=false,pinPull=0,pinDrag=null,fly=null;
  const ray=new THREE.Raycaster(),ptr=new THREE.Vector2(0,-.3),aim=new THREE.Vector3(0,.2,0),plane=new THREE.Plane(new THREE.Vector3(0,1,0),-.2);
  function flyTo(p,t,dur=1.4){fly={p0:camera.position.clone(),p1:new THREE.Vector3(...p),t0:controls.target.clone(),t1:new THREE.Vector3(...t),k:0,dur}}
  const PH=['Extinguisher','Wind direction','Distance','PASS','Result'];
  function phaseIdx(){return {pick:0,approach:1,distance:2,pass:3,retreat:3,result:4}[phase]}
  function hdr(){return `<div class="steps" style="grid-template-columns:repeat(5,1fr);direction:ltr">${PH.map((n,i)=>`<div class="step ${i<phaseIdx()?'done':i===phaseIdx()?'now':''}"><i style="font-size:22px">${i+1}</i><span>${n}</span></div>`).join('')}</div>`}
  function draw(){const P=$('#psx');if(!P)return;let h=hdr();
    if(phase==='pick')h+=`<div class="kick">Fire type</div><div class="btns">${Object.entries(SCN).map(([k,v])=>`<button data-act="s:${k}" class="${k===scn?'on':''}"><span class="cls" style="background:${v.col};width:22px;height:22px;font-size:12px;margin-right:8px">${v.c}</span>${v.n}</button>`).join('')}</div><div class="btns one">${btn('s:R','🎲 Random scenario')}</div>
      <div class="out"><b>Report:</b> ${SC.brief}<br>Pick the right extinguisher from the rack.</div><div class="btns">${OPT.map(o=>btn('x:'+o.id,o.n)).join('')}</div>`;
    if(phase==='approach')h+=`<div class="out">Check the windsock (the orange cone): the wind blows toward where it points.<br><b>Choose your approach point</b> from the circles around the fire.</div><div class="btns">${MK.map(m=>btn('m:'+m.id,m.n)).join('')}</div>`;
    if(phase==='distance')h+=`<div class="out">Move toward the fire. The green line on the ground is the <b>safe distance (about 2.5 m)</b>.</div>
      <div class="row2"><span>Distance from the fire</span><span id="dd" style="font-size:20px;color:var(--fg)">${D.toFixed(1)} m</span></div>
      <div class="btns">${btn('d:-','Step forward ↑')}${btn('d:+','Step back ↓')}</div><div class="btns one">${btn('d:ok','Hold here and start','primary')}</div>`;
    if(phase==='pass')h+=`<div class="steps">${['P','A','S','S'].map((l,i)=>`<div class="step ${i<step?'done':i===step?'now':''}"><i>${l}</i><span>${['Pull','Aim','Squeeze','Sweep'][i]}</span></div>`).join('')}</div>
      <div class="out" id="o6">${['<b>P · Pull the safety pin:</b> drag the yellow ring on the extinguisher with the mouse, or press the button.','<b>A · Aim</b> the circle at the base of the flames (not the top).','<b>S · Press and hold</b> on the scene to discharge the agent.','<b>S · Sweep side to side</b> while holding, and cover the whole area.'][step]}</div>
      <div><div class="row2"><span>Fire remaining</span><span id="pct">100%</span></div><div class="meter"><div id="bar"></div></div></div>
      <div class="row2"><span id="tm">0.0 s</span><span id="base"></span></div>${step===0?`<div class="btns one">${btn('pull','Pull the safety pin')}</div>`:''}`;
    if(phase==='retreat')h+=`<div class="out"><b style="color:var(--ok)">Fire out.</b><br>Never turn your back on the fire. Back away carefully the way you came, and keep watching the area.</div><div class="btns one">${btn('back','Back away','primary')}</div>`;
    if(phase==='result'){const pct=aimT?Math.round(baseT/aimT*100):0;const stars=[firstPick,windOk,distOk,pct>=70].filter(Boolean).length;
      h+=`<div class="out" style="text-align:center"><div style="font-family:var(--display);font-size:40px;color:var(--flame);letter-spacing:4px">${'★'.repeat(stars)}${'☆'.repeat(4-stars)}</div>${stars===4?'Excellent performance!':'Try again and improve the red points.'}<div style="font-size:13px;color:var(--mut);margin-top:4px">Scenario: ${SC.n} · Class ${SC.c}</div></div>
      <ul class="facts"><li>${firstPick?'✓':'✗'} <b>Extinguisher choice:</b> ${firstPick?'correct first time':'wrong extinguisher first'}</li><li>${windOk?'✓':'✗'} <b>Wind:</b> ${windOk?'at your back':'it must be at your back'}</li>
      <li>${distOk?'✓':'✗'} <b>Distance:</b> ${distOk?'safe':'try to stand on the green line'}</li><li>${pct>=70?'✓':'✗'} <b>Aimed at the base:</b> ${pct}% of spray time</li><li>⏱ <b>Time:</b> ${tm.toFixed(1)} seconds</li></ul><div class="btns one">${btn('restart','New drill · pick another fire type','primary')}</div>`}
    P.innerHTML=h}
  function setPhase(p){phase=p;held.visible=p==='pass'||p==='retreat';ret.visible=false;MK.forEach(m=>{m.r.visible=p==='approach';m.t._o.visible=p==='approach'});
    OPT.forEach(o=>o.t._o.visible=p==='pick');Object.values(SCN).forEach(v=>v.t._o.visible=v===SC&&(p==='pick'||p==='approach'));
    if(p==='pick')flyTo([2.2,2.6,8.2],[-1,.8,1.4]);
    if(p==='approach')flyTo([0,8.5,7.5],[0,0,.5]);
    if(p==='distance'||p==='pass')flyTo([0,1.62,D],[0,SC.y+.05,0],p==='pass'?.6:1.6);
    if(p==='result')flyTo([4,3.2,7.5],[0,.6,0],1.8);
    draw()}
  function setScn(k){if(k==='R'){const ks=Object.keys(SCN).filter(x=>x!==scn);k=ks[Math.floor(Math.random()*ks.length)]}scn=k;SC=SCN[k];
    Object.values(SCN).forEach(v=>v.g.visible=v===SC);plane.constant=-SC.y;
    patches.forEach((p,n)=>{const i=Math.floor(n/3),j=n%3;p.p.set((i-1)*SC.sx,SC.y,(j-1)*SC.sz);p.f.p.copy(p.p);p.f.r=SC.r;p.f.h=SC.c==='K'?.7:1.05;p.f.light.position.copy(p.p).add(new THREE.Vector3(0,.6,0))});reset()}
  function reset(){agent=null;firstPick=null;windOk=null;D=6;distOk=null;step=0;tm=0;aimT=0;baseT=0;done=false;pinPull=0;PIN.visible=true;PIN.position.copy(PIN.userData.p0);
    patches.forEach(p=>{p.life=1;p.f.T=1});ctx.norm.clear();setPhase('pick')}
  const el=renderer.domElement;
  const toN=e=>{const r=el.getBoundingClientRect();return [(e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1]};
  const onMove=e=>{const [x,y]=toN(e);ptr.set(x,y);if(pinDrag){const d=Math.hypot(e.clientX-pinDrag[0],e.clientY-pinDrag[1]);pinPull=Math.min(1,d/90);if(pinPull>=1){pinDrag=null;self.act('pull')}}};
  const onDown=e=>{const [x,y]=toN(e);ptr.set(x,y);if(phase!=='pass')return;
    if(step===0){ray.setFromCamera(ptr,camera);if(ray.intersectObject(self._hx||hx,true).length)pinDrag=[e.clientX,e.clientY];return}
    if(step>=1&&!done){hold=true}};
  const onUp=()=>{hold=false;if(pinDrag&&pinPull<1){pinDrag=null;pinPull=0}};
  el.addEventListener('pointermove',onMove);el.addEventListener('pointerdown',onDown);addEventListener('pointerup',onUp);
  const self={ctx,cam:[2.2,2.6,8.2],target:[-1,.8,1.4],orbit:false,hint:'Training yard: follow the steps in the panel',
   panel:()=>`<div class="kick">Lesson 3 · Hands-on practice</div><h2>Training yard</h2>
   <p class="lead">A full drill like the real training: pick the extinguisher, approach with the wind at your back, stop at the safe distance, then apply PASS and put the fire out completely. Choose the fire: wood, fuel, electrical or cooking oil.</p><div id="psx" style="display:flex;flex-direction:column;gap:12px"></div>`,
   init(){setScn('B')},
   dispose(){el.removeEventListener('pointermove',onMove);el.removeEventListener('pointerdown',onDown);removeEventListener('pointerup',onUp);camera.remove(held);s.remove(camera);heat.remove();ctx.norm.wind=[0,0];ctx.add.wind=[0,0]},
   act(a){
    if(a==='restart')return reset();
    if(a.startsWith('s:')&&phase==='pick'){setScn(a.slice(2));toast('Scenario: '+SC.n+' · Class '+SC.c);return}
    if(a.startsWith('x:')&&phase==='pick'){const id=a.slice(2);const ok=!!SC.ok[id];if(firstPick===null)firstPick=ok;
      if(!ok){toast(SC.bad[id],'bad');if(SC.flare&&SC.flare.includes(id)){patches.forEach(p=>p.f.T=SC.c==='K'?2.4:1.9);setTimeout(()=>patches.forEach(p=>p.f.T=1),1500)}
        if(SC.zap&&(id==='WATER'||id==='FOAM')){heat.style.background='rgba(120,190,255,.55)';heat.style.opacity='1';setTimeout(()=>{heat.style.background='radial-gradient(ellipse at center,rgba(255,80,20,0) 40%,rgba(255,60,10,.55) 100%)';heat.style.opacity='0'},350)}return}
      agent=id;toast(SC.ok[id],'good');
      held.remove(self._hx||hx);const nx=heldExt(agent);held.add(nx);PIN=pinFor(nx);
      self._hx=nx;setPhase('approach');return}
    if(a.startsWith('m:')&&phase==='approach'){const m=MK.find(x=>x.id===a.slice(2));windOk=windOk===null?!!m.ok:windOk&&!!m.ok;
      if(!m.ok){toast(m.id==='face'?'Smoke and heat will come into your face! Go back and pick another spot':'Wind from the side deflects the agent. Pick a spot with the wind at your back','bad');windOk=false;return}
      toast('Correct: wind at your back','good');setPhase('distance');return}
    if(a==='d:-'&&phase==='distance'){D=Math.max(1,D-.5);flyTo([0,1.62,D],[0,SC.y+.05,0],.5);draw();if(D<2){toast('Too close! The heat is intense, step back','bad')}return}
    if(a==='d:+'&&phase==='distance'){D=Math.min(8,D+.5);flyTo([0,1.62,D],[0,SC.y+.05,0],.5);draw();return}
    if(a==='d:ok'&&phase==='distance'){const ok=D>=2&&D<=3;distOk=distOk===null?ok:distOk&&ok;if(!ok){toast(D<2?'Too close to the fire':'Too far: the agent won’t reach','bad');return}
      toast('Safe distance ✓','good');setPhase('pass');return}
    if(a==='pull'&&phase==='pass'&&step===0){step=1;pinPull=1;draw();toast('Safety pin pulled ✓','good');return}
    if(a==='back'&&phase==='retreat'){D=6;flyTo([0,1.62,6.5],[0,SC.y+.05,0],2);setTimeout(()=>setPhase('result'),2100)}},
   update(dt,t){
    if(fly){fly.k=Math.min(1,fly.k+dt/fly.dur);const e=fly.k<.5?4*fly.k**3:1-Math.pow(-2*fly.k+2,3)/2;camera.position.lerpVectors(fly.p0,fly.p1,e);controls.target.lerpVectors(fly.t0,fly.t1,e);if(fly.k>=1)fly=null}
    camera.lookAt(controls.target);
    sock.rotation.y=Math.sin(t*1.7)*.1;sock.rotation.x=.12+Math.sin(t*2.3)*.06;streaks.forEach(m=>{m.position.z-=m.userData.v*dt;if(m.position.z<-9){m.position.z=9;m.position.x=R(-7,7)}});
    MK.forEach(m=>{m.r.scale.setScalar(1+.12*Math.sin(t*4))});
    const close=phase==='distance'||phase==='pass'?Math.max(0,(2.2-D)/1.2):0;heat.style.opacity=Math.min(.9,close).toFixed(2);
    const live=patches.reduce((a,p)=>a+p.life,0)/patches.length;mainL.intensity=live*6*(1+.15*Math.sin(t*20));
    if(phase==='pass'||phase==='retreat'){
      // pin
      {const o=PIN.userData.off;PIN.position.copy(PIN.userData.p0).add(new THREE.Vector3(pinPull*o,pinPull*o*.28,pinPull*o*.45));PIN.visible=pinPull<.98}
      ray.setFromCamera(ptr,camera);const hit=new THREE.Vector3();const ok=ray.ray.intersectPlane(plane,hit);
      if(ok)aim.lerp(hit,Math.min(1,dt*16));const inTray=Math.abs(aim.x)<SC.bx&&Math.abs(aim.z)<SC.bz;const high=!ok||aim.z<-SC.bz-.05;
      ret.visible=step>=1&&!done;ret.position.set(aim.x,SC.y+.015,aim.z);ret.material.color.setHex(inTray?0x3fd17e:0xff3d2e);
      nozzle.lookAt(aim);
      if(step===1&&inTray){step=2;draw()}
      if(step>=1&&!done){tm+=dt;const te=$('#tm');te&&(te.textContent=tm.toFixed(1)+' s')}
      if(hold&&step>=2&&!done){if(step===2){step=3;draw()}
        const tip=nozzle.localToWorld(new THREE.Vector3(0,0,.17));const v=aim.clone().sub(tip);const dist=v.length();v.normalize();
        const isC=agent==='CO2',isF=agent==='FOAM';
        for(let i=0;i<12;i++){const sp=dist*R(1.25,1.6);ctx.norm.spawn(tip.x,tip.y,tip.z,v.x*sp+R(-.35,.35),v.y*sp+R(.2,.9),v.z*sp+R(-.35,.35),R(.8,1.3),isF?.1:R(.12,.22),isF?6:3)}
        if(isC&&Math.random()<.5)ctx.add.spawn(tip.x,tip.y,tip.z,v.x*3,v.y*3,v.z*3,.4,.08,5);
        const sx=Math.abs(ptr.x-lastX)/Math.max(dt,1e-3);sweep+=((sx>.2?1:0)-sweep)*Math.min(1,dt*5);aimT+=dt;
        if(inTray){baseT+=dt;patches.forEach(p=>{const d=Math.hypot(p.p.x-aim.x,(p.p.z-aim.z)*(.58/SC.sz));if(d<.6){p.life-=dt*(.35+1.4*sweep)*(1-d/.75)}})}
        const o6=$('#o6');if(o6){if(high)o6.innerHTML='<b style="color:var(--alarm)">Don’t aim at the top of the flames.</b> Bring the circle down to the base of the fire.';else if(sweep<.3)o6.innerHTML='<b>Sweep side to side</b> while holding, and cover the whole area.';else o6.innerHTML='<b style="color:var(--ok)">Excellent, keep sweeping</b> until the whole fire is out.'}
        const be=$('#base');be&&(be.textContent=(inTray?'On the base ✓':'Off the base ✗'))}
      lastX=ptr.x;
      // reignition from burning neighbours
      patches.forEach(p=>{if(p.life<.02&&!done){const nb=patches.some(q=>q!==p&&q.life>.6&&Math.hypot(q.p.x-p.p.x,q.p.z-p.p.z)<.7);if(nb&&!(hold&&Math.hypot(p.p.x-aim.x,p.p.z-aim.z)<.6))p.life+=dt*.05}
        p.life=Math.max(0,Math.min(1,p.life));p.f.T=p.life<.02?0:.25+.85*p.life});
      const pc=Math.round(live*100);const pe=$('#pct');if(pe){pe.textContent=pc+'%';$('#bar').style.width=pc+'%'}
      if(!done&&patches.every(p=>p.life<.02)&&phase==='pass'){done=true;hold=false;toast(`Fire out in ${tm.toFixed(1)} seconds`,'good');setTimeout(()=>setPhase('retreat'),900)}}}};
  return self}});

// 7. Sprinklers
CH.push({id:'sprinkler',name:'Automatic sprinklers',build(){
  const ctx=makeCtx({fogNear:12,fogFar:32});const s=ctx.scene;
  const ceilT=tex('tiles',256,256,g=>{g.fillStyle='#cfcac2';g.fillRect(0,0,256,256);noise(g,256,256,3000,.1,()=>'#8a857e');g.strokeStyle='#8f8a83';g.lineWidth=4;g.strokeRect(0,0,256,256)},[7,4]);
  const ceil=mesh(new THREE.BoxGeometry(7,.06,4),new THREE.MeshStandardMaterial({map:ceilT,roughness:.9,transparent:true,opacity:.55}),0,3.65,0);ceil.castShadow=false;s.add(ceil);
  const wallT=tex('wall',256,256,g=>{g.fillStyle='#5b524b';g.fillRect(0,0,256,256);noise(g,256,256,4000,.12,()=>'#2d2622')},[3,2]);
  s.add(mesh(new THREE.BoxGeometry(7,3.65,.1),new THREE.MeshStandardMaterial({map:wallT,roughness:.95}),0,1.82,-2));
  const red=new THREE.MeshStandardMaterial({color:0xc21d14,roughness:.42,metalness:.25,transparent:true,opacity:.55,depthWrite:false});
  const segs=[];function pipe(a,b,r=.06){const d=b.clone().sub(a);const len=d.length();const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());
    const outer=mesh(new THREE.CylinderGeometry(r,r,len,20,1,true),red);outer.position.copy(a).add(b).multiplyScalar(.5);outer.quaternion.copy(q);
    const core=mesh(new THREE.CylinderGeometry(r*.62,r*.62,len,12),new THREE.MeshBasicMaterial({color:0x777777}));core.position.copy(outer.position);core.quaternion.copy(q);s.add(outer,core);segs.push(core);
    for(const e of [a,b]){const cpl=mesh(new THREE.CylinderGeometry(r*1.25,r*1.25,.06,20),new THREE.MeshStandardMaterial({color:0xa5160f,roughness:.5,metalness:.3}));cpl.position.copy(e);cpl.quaternion.copy(q);s.add(cpl)}return core}
  pipe(new THREE.Vector3(-3.2,.05,-.6),new THREE.Vector3(-3.2,.9,-.6),.08);pipe(new THREE.Vector3(-3.2,1.55,-.6),new THREE.Vector3(-3.2,3.35,-.6),.08);pipe(new THREE.Vector3(-3.2,3.35,-.6),new THREE.Vector3(-3.2,3.35,0),.07);pipe(new THREE.Vector3(-3.2,3.35,0),new THREE.Vector3(3,3.35,0),.07);
  const hang=M(0x666666,{metalness:.8});[-2,0,2].forEach(x=>s.add(mesh(new THREE.CylinderGeometry(.01,.01,.3,6),hang,x,3.5,0)));
  const valve=osyValve();valve.position.set(-3.2,1.22,-.6);valve.rotation.y=-Math.PI/2;s.add(valve);tag(ctx,valve,'Control valve',new THREE.Vector3(-.2,-.3,0));tag(ctx,valve.userData.lock,'Safety lock: keeps the valve open',new THREE.Vector3(.12,0,0));
  const g1=gaugeMesh();g1.position.set(-2.98,1.75,-.6);g1.rotation.y=Math.PI/2;s.add(g1);const g2=gaugeMesh();g2.position.set(-2.98,.7,-.6);g2.rotation.y=Math.PI/2;s.add(g2);
  const heads=[-1.8,-.3,1.2,2.6].map(x=>{pipe(new THREE.Vector3(x,3.35,0),new THREE.Vector3(x,3.62,0),.03);const h=sprinklerHead();h.scale.setScalar(1.6);h.position.set(x,3.62,0);s.add(h);return {x,g:h,bulb:h.userData.bulb,open:false}});
  tag(ctx,heads[1].g,'Sprinkler head',new THREE.Vector3(0,-.18,0));
  const det=smokeDetector('photo');det.position.set(.5,3.62,1);s.add(det);const detLed=det.userData.led;tag(ctx,det,'Detector',new THREE.Vector3(0,-.25,0));
  // sofa
  const fab=new THREE.MeshStandardMaterial({color:0x4f4568,roughness:.95});const sofa=new THREE.Group();sofa.position.set(-.3,0,.4);s.add(sofa);
  sofa.add(mesh(new THREE.BoxGeometry(1.8,.22,.8),fab,0,.31,0),mesh(new THREE.BoxGeometry(1.8,.55,.2),fab,0,.6,-.32));[-.45,.45].forEach(x=>sofa.add(mesh(new THREE.BoxGeometry(.86,.14,.62),M(0x5c5278,{roughness:.95}),x,.49,.05)));
  [-.95,.95].forEach(x=>sofa.add(mesh(new THREE.BoxGeometry(.18,.42,.8),fab,x,.4,0)));[[-.8,-.3],[.8,-.3],[-.8,.3],[.8,.3]].forEach(([x,z])=>sofa.add(mesh(new THREE.CylinderGeometry(.03,.03,.2,8),M(0x222222),x,.1,z)));
  const fire=new Fire(ctx,new THREE.Vector3(-.3,.56,.45),{r:.42,h:1.05,I:0,T:0,smoke:.6});ctx.fires.push(fire);
  let mode='wet',clock=-1,filled=0,ev={},fly=null;
  const W=new THREE.Color(0x3fa8ff),A=new THREE.Color(0xdddddd),N=new THREE.Color(0x777777);
  function flyTo(p,t){fly={p0:camera.position.clone(),p1:new THREE.Vector3(...p),t0:controls.target.clone(),t1:new THREE.Vector3(...t),k:0}}
  function setMode(m){mode=m;clock=-1;filled=m==='wet'?1:0;ev={};fire.T=0;fire.I=0;heads.forEach(h=>{h.open=false;h.bulb.visible=true});ctx.add.clear();ctx.norm.clear();detLed.material.color.setHex(0x330000);
    document.querySelectorAll('[data-act^="w:"]').forEach(b=>b.classList.toggle('on',b.dataset.act==='w:'+m));
    $('#o7').innerHTML={wet:'<b>Wet system:</b> pipes are always full of water (blue). The simplest and most common.',dry:'<b>Dry system:</b> pipes hold pressurized air or nitrogen (gray). For cold places where water could freeze.',pre:'<b>Pre-action system:</b> pipes are dry. Water enters only on a detector signal, and a head must also break.'}[m]}
  const self={ctx,cam:[3.8,2.4,6.4],target:[0,1.9,0],orbit:true,hint:'Pick a system and press “Start a fire”',
   panel:()=>`<div class="kick">Lesson 3 · Fixed systems</div><h2>Automatic sprinklers</h2>
   <p class="lead">A sprinkler head has a red glass bulb that bursts with heat. Only the head above the fire opens.</p>
   <div class="btns">${btn('w:wet','Wet system')}${btn('w:dry','Dry system')}${btn('w:pre','Pre-action')}${btn('go','Start a fire','primary')}</div>
   <div class="out" id="o7"></div><div class="out" id="o7b" style="min-height:0">Ready.</div>
   <div class="kick">Look up close</div><div class="btns">${btn('z:head','Sprinkler head')}${btn('z:valve','Control valve')}${btn('z:all','Whole scene')}</div>
   <ul class="facts"><li>Components: <b>water supply, pipe network, control valve, sprinkler heads</b>.</li><li>The control valve stays <b>fully open and locked with a safety lock</b>.</li><li>Pipes are painted red; heads are never painted.</li><li>Not suitable for materials that react with water, or for electrical and computer rooms.</li></ul>`,
   init(){setMode('wet')},
   act(a){if(a.startsWith('w:'))setMode(a.slice(2));if(a==='go'){setMode(mode);clock=0;fire.T=1.3;$('#o7b').textContent='A fire started under the second head…'}
     if(a==='z:head')flyTo([.5,3,1.2],[-.3,3.45,0]);if(a==='z:valve')flyTo([-1.9,1.6,1.3],[-3.2,1.25,-.2]);if(a==='z:all')flyTo([3.8,2.4,6.4],[0,1.9,0])},
   update(dt,t){if(fly){fly.k=Math.min(1,fly.k+dt/1.3);const e=fly.k<.5?4*fly.k**3:1-Math.pow(-2*fly.k+2,3)/2;camera.position.lerpVectors(fly.p0,fly.p1,e);controls.target.lerpVectors(fly.t0,fly.t1,e);if(fly.k>=1)fly=null}
     const h=heads[1];if(clock>=0){clock+=dt;
       if(mode==='pre'&&clock>1.6&&!ev.det){ev.det=1;detLed.material.color.setHex(0xff2a1a);valve.userData.wheel.rotation.z+=.5;$('#o7b').textContent='The detector sent a signal → the valve opened and water filled the pipes.'}
       if(mode==='pre'&&ev.det)filled=Math.min(1,filled+dt*.5);
       if(clock>4&&!h.open){h.open=true;h.bulb.visible=false;for(let i=0;i<20;i++)ctx.add.spawn(h.x,3.48,0,R(-1,1),R(-1,.5),R(-1,1),.4,.02,4);$('#o7b').textContent=mode==='dry'?'The bulb burst → air escaped and pressure dropped → the valve opened.':mode==='pre'?'The bulb burst → water was ready in the pipes, so spraying began.':'The bulb burst → spraying started immediately.'}
       if(mode==='dry'&&h.open)filled=Math.min(1,filled+dt*.45);
       const spraying=h.open&&filled>=.98;if(mode==='dry'&&h.open&&filled<.98)for(let i=0;i<3;i++)ctx.norm.spawn(h.x,3.35,0,R(-1,1),R(-1,-.2),R(-1,1),.7,.15,3);
       if(spraying){for(let i=0;i<26;i++){const a=R(0,6.28),sp=R(.8,2.4);ctx.add.spawn(h.x,3.35,0,Math.cos(a)*sp,R(-.6,.2),Math.sin(a)*sp,1.4,.05,2)}if(!ev.out){ev.out=1;fire.T=0;setTimeout(()=>{if(ev.out)$('#o7b').textContent='Fire out. The other heads didn’t open because they weren’t exposed to heat.'},2500)}}}
     const fill=mode==='wet'?1:filled;segs.forEach((c,i)=>{const k=Math.min(1,Math.max(0,fill*segs.length*1.1-i*.9));c.material.color.copy(mode==='wet'?W:k>0?A.clone().lerp(W,k):(mode==='dry'?A:N))})}};
  return self}});

// 8. Quiz
const QZ=[
 {q:'A fire in a live electrical transformer. Which extinguisher do you use?',a:['Water','Carbon dioxide','Foam'],r:1},
 {q:'We moved the fuel away from the fire. This method is called:',a:['Smothering','Cooling','Starvation'],r:2},
 {q:'We covered the fire and cut off the oxygen. This method is called:',a:['Smothering','Starvation','Dilution'],r:0},
 {q:'Water puts out fire mainly by:',a:['Chain inhibition','Cooling','Isolation'],r:1},
 {q:'Dry chemical powder puts out fire mainly by:',a:['Smothering and breaking the chain reaction','Cooling only','Dilution'],r:0},
 {q:'The first step of PASS:',a:['Squeeze the lever','Pull the safety pin','Sweep side to side'],r:1},
 {q:'The A in PASS means:',a:['Aim the nozzle at the base of the flames','Pull the pin','Squeeze the lever'],r:0},
 {q:'The last step of PASS:',a:['Pull the pin','Sweep side to side','Aim the nozzle'],r:1},
 {q:'Where do you aim the agent?',a:['At the base of the flames','At the top of the flames','At the smoke'],r:0},
 {q:'Where should the wind be while you fight the fire?',a:['In your face','at your back','From the side'],r:1},
 {q:'The approximate safe distance when using an extinguisher:',a:['Half a meter','About 2.5 m','Ten meters'],r:1},
 {q:'In which stage does the fire develop within seconds?',a:['Incipient','Smoke','Heat'],r:2},
 {q:'The detector that responds to the incipient stage (invisible particles):',a:['Ionization detector','Heat detector','Flame detector'],r:0},
 {q:'The photoelectric detector responds to:',a:['Visible smoke','Heat only','Ultraviolet rays'],r:0},
 {q:'An extinguisher with no pressure gauge, checked by weight:',a:['Powder','Carbon dioxide','Water'],r:1},
 {q:'Metal fires such as magnesium are put out with:',a:['Special dry powder','Water','Foam'],r:0},
 {q:'A fire in wood and paper is class:',a:['A','B','C'],r:0},
 {q:'A fire in petrol and oils is class:',a:['A','B','D'],r:1},
 {q:'A cooking-oil fire in a kitchen is class:',a:['C','D','K'],r:2},
 {q:'Why don’t we use water on electrical fires?',a:['Because it conducts electricity','Because it’s expensive','Because it cools too much'],r:0},
 {q:'Why don’t we use water on a petrol fire?',a:['It spreads the burning liquid','It puts it out too fast','It causes rust'],r:0},
 {q:'Foam is not suitable for:',a:['Liquid fires in tanks','Electrical equipment','Covering spilled fuel'],r:1},
 {q:'When extinguishing a liquid in a tank with foam:',a:['Aim it straight at the liquid surface','Aim it at the inner wall above the liquid','Spray water afterwards'],r:1},
 {q:'Horizontal fire spread happens through:',a:['Radiant heat','Contact only','Cold air'],r:0},
 {q:'Vertical fire spread happens because:',a:['Hot gases rise upward','Fire moves downward','Smoke is heavy'],r:0},
 {q:'The oxygen content of air is about:',a:['5%','19–21%','50%'],r:1},
 {q:'Smoke from petroleum fires is usually:',a:['White','Black','Blue'],r:1},
 {q:'In a sprinkler system, which head opens?',a:['All heads together','Only the head exposed to heat','The head nearest the valve'],r:1},
 {q:'A dry sprinkler system is used in:',a:['Cold places where water can freeze','Kitchens','Computer rooms'],r:0},
 {q:'The control valve in a sprinkler system is:',a:['Always closed','fully open and locked with a safety lock','Half open'],r:1},
 {q:'Before offloading fuel from a tanker you must:',a:['Discharge static electricity by grounding','Start the engine','Open all valves'],r:0},
 {q:'How often at minimum should we run a fire drill?',a:['Once a year','Once every 5 years','Not required'],r:0},
 {q:'If the fire is large:',a:['Use more than one extinguisher and more than one person','Try on your own','Turn your back on the fire'],r:0},
 {q:'After extinguishing:',a:['Back away carefully the way you came','Turn around and walk away fast','Leave the area unwatched'],r:0},
 {q:'Carbon dioxide is heavier than air by:',a:['About one and a half times','Ten times','Lighter than air'],r:0}];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
CH.push({id:'quiz',name:'Test yourself',build(){
  const ctx=makeCtx();const s=ctx.scene;const L=logs();s.add(L);const fire=new Fire(ctx,new THREE.Vector3(0,.18,0),{r:.42,h:1.2,smoke:.25});ctx.fires.push(fire);
  const N=8;let set=[],i=0,score=0,answered=false;
  function newSet(){set=shuffle(QZ).slice(0,N).map(q=>{const order=shuffle(q.a.map((x,k)=>k));return {q:q.q,a:order.map(k=>q.a[k]),r:order.indexOf(q.r)}})}
  function show(){const q=set[i];$('#qz').innerHTML=`<q>${i+1} / ${N} · ${q.q}</q><div class="btns one">${q.a.map((x,j)=>btn('q:'+j,x)).join('')}</div>`;answered=false}
  const self={ctx,cam:[0,2.2,4.6],target:[0,.9,0],orbit:true,hint:'Every correct answer puts out part of the fire',
   panel:()=>`<div class="kick">Review</div><h2>Test yourself</h2><p class="lead">8 questions drawn at random from a bank of ${QZ.length} questions, so it changes every time. Every correct answer puts out part of the fire.</p>
   <div class="quiz" id="qz"></div><div class="row2"><span>Result</span><span id="sc">0 / ${N}</span></div><div class="btns one">${btn('qr','New questions')}</div>`,
   init(){newSet();show()},
   act(a){if(a==='qr'){newSet();i=0;score=0;fire.T=1;$('#sc').textContent=`0 / ${N}`;return show()}
     if(a.startsWith('q:')&&!answered){answered=true;const j=+a.slice(2),q=set[i];const bs=document.querySelectorAll('#qz button');bs[q.r].classList.add('right');
       if(j===q.r){score++;toast('Correct ✓','good')}else{bs[j].classList.add('wrong');toast('Correct answer: '+q.a[q.r],'bad')}
       fire.T=Math.max(0,1-score/N);$('#sc').textContent=`${score} / ${N}`;
       setTimeout(()=>{i++;if(i<N)show();else $('#qz').innerHTML=`<q>${score===N?'Excellent! You put the whole fire out.':`Your score: ${score} out of ${N}. Press “New questions” and try again.`}</q>`},1300)}},
   update(){}};
  return self}});

// ---------- app shell ----------
let cur=null,curId=null;
rail.innerHTML=CH.map((c,i)=>`<button data-ch="${c.id}"><i>${String(i+1).padStart(2,'0')}</i>${c.name}</button>`).join('');
rail.addEventListener('click',e=>{const b=e.target.closest('[data-ch]');if(b)location.hash=b.dataset.ch});
panel.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b&&cur)cur.act(b.dataset.act)});
function open(id){const c=CH.find(x=>x.id===id)||CH[0];if(curId===c.id)return;
  if(cur){cur.dispose&&cur.dispose();cur.ctx.tags.forEach(o=>o.parent&&o.parent.remove(o));cur.ctx.fires.forEach(f=>f.remove&&f.remove());cur.ctx.scene.traverse(o=>{o.geometry&&o.geometry.dispose()})}
  if(camera.parent)camera.parent.remove(camera);$('#labels').innerHTML='';curId=c.id;cur=c.build();panel.innerHTML=cur.panel();panel.scrollTop=0;
  camera.position.set(...cur.cam);controls.target.set(...cur.target);controls.enabled=cur.orbit;controls.minDistance=1.5;controls.maxDistance=14;controls.maxPolarAngle=Math.PI*.49;controls.update();
  hint.textContent=cur.hint;cur.init&&cur.init();
  rail.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.ch===c.id));
  const ab=rail.querySelector('.on');ab&&ab.scrollIntoView({block:'nearest',inline:'nearest'})}
addEventListener('hashchange',()=>open(location.hash.slice(1)));
resize();open(location.hash.slice(1)||'tetra');
const clk=new THREE.Clock();let T=0;
renderer.setAnimationLoop(()=>{const dt=Math.min(clk.getDelta(),.05);T+=dt;if(!cur)return;
  cur.ctx.fires.forEach(f=>f.update(dt,T));cur.update(dt,T);cur.ctx.add.update(dt);cur.ctx.norm.update(dt);
  if(cur.orbit)controls.update();rpass.scene=cur.ctx.scene;composer.render();labels.render(cur.ctx.scene,camera);cur.post&&cur.post();declutter()});

/* Keep 3D labels from sitting on top of each other: after CSS2DRenderer places
   them, push overlapping tags apart (mostly vertically) and ease the offset so
   they glide instead of jumping. Also keeps every tag inside the stage. */
function declutter(){
  const host=$('#labels');const tags=[...host.children].filter(t=>t.classList.contains('tag')&&!t.classList.contains('co')&&t.style.display!=='none'&&t.offsetWidth);
  if(!tags.length)return;
  const H=host.getBoundingClientRect(),G=6;
  const R=tags.map(t=>{const r=t.getBoundingClientRect();return{t,x:r.left,y:r.top,w:r.width,h:r.height,dx:0,dy:0}});
  for(let it=0;it<20;it++){let moved=false;
    for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],b=R[j];
      const ox=Math.min(a.x+a.dx+a.w,b.x+b.dx+b.w)-Math.max(a.x+a.dx,b.x+b.dx)+G,oy=Math.min(a.y+a.dy+a.h,b.y+b.dy+b.h)-Math.max(a.y+a.dy,b.y+b.dy)+G;
      if(ox<=0||oy<=0)continue;moved=true;
      if(oy<=ox*1.6){const s=(a.y+a.dy+a.h/2)<=(b.y+b.dy+b.h/2)?-1:1;a.dy+=s*oy/2;b.dy-=s*oy/2}
      else{const s=(a.x+a.dx+a.w/2)<=(b.x+b.dx+b.w/2)?-1:1;a.dx+=s*ox/2;b.dx-=s*ox/2}}
    R.forEach(r=>{r.dx=Math.max(H.left+4-r.x,Math.min(H.right-4-r.w-r.x,r.dx));r.dy=Math.max(H.top+4-r.y,Math.min(H.bottom-4-r.h-r.y,r.dy))});
    if(!moved)break}
  R.forEach(r=>{
    const t=r.t;t._dx=(t._dx||0)+(r.dx-(t._dx||0))*.6;t._dy=(t._dy||0)+(r.dy-(t._dy||0))*.6;
    if(Math.abs(t._dx)>.3||Math.abs(t._dy)>.3)t.style.transform+=` translate(${t._dx.toFixed(1)}px,${t._dy.toFixed(1)}px)`;});
}
