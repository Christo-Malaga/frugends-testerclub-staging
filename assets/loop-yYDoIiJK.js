import{J as no,A as H,K as x,C as z,V as so,N as lo,L as V,Y as K,c as J,G as Y,a6 as Z,a4 as $,m as N,s as ro,z as F,D as io,H as E,aB as W,a8 as uo,a9 as co,aa as Q,ab as fo,ac as X,ad as po,aC as mo,aD as vo}from"./index-Adiq-PfP.js";function yo({low:e=!1,palette:n}){const c=e?14:26,d=e?10:18,f=c+d,a=no(f,{map:H(2),size:.11});a.points.renderOrder=6;const w=Array.from({length:c},(i,t)=>({s0:x(t+.71),speed:.2+x(t+4.2)*.12,ox:(x(t+8.3)-.5)*.1,oy:(x(t+2.9)-.5)*.1,tw:x(t+6.6)*6.28})),O=Array.from({length:d},(i,t)=>({delay:t/d*.32+x(t+1.9)*.05,ox:(x(t+3.7)-.5)*.16,oy:(x(t+5.3)-.5)*.16,oz:(x(t+9.1)-.5)*.1,tw:x(t+7.4)*6.28})),I=new z(n.gold),P=new z(16774084),k=new z,h=new so;function U(i,t,M,u){const l=1-u;return h.copy(i).multiplyScalar(l*l).addScaledVector(t,2*l*u).addScaledVector(M,u*u)}function G(i,t,M,u,l,v){k.copy(I).lerp(P,v),a.pos[i*3]=t,a.pos[i*3+1]=M,a.pos[i*3+2]=u,a.col[i*3]=k.r*l,a.col[i*3+1]=k.g*l,a.col[i*3+2]=k.b*l}function D({t:i,from:t,ctrl:M,to:u,amount:l,burst:v,scale:y}){a.setScale(y);let b=0;for(let r=0;r<c;r+=1){const s=w[r],p=(s.s0+i*s.speed)%1;U(t,M,u,p);const m=Math.sin(Math.PI*p),A=.75+.25*Math.sin(i*7+s.tw),S=l*Math.pow(m,.5)*A*1.05;G(r,h.x+s.ox*m,h.y+s.oy*m,h.z,S,.45*(1-p)),b+=Math.exp(-(((1-p)/.07)**2))*l}const o=v>5e-4&&v<.9995;for(let r=0;r<d;r+=1){const s=c+r,p=O[r],m=o?lo((v-p.delay)/.62):0;if(m<=0||m>=1){G(s,t.x,t.y,t.z,0,0);continue}const A=V(m);U(t,M,u,A);const S=Math.sin(Math.PI*A),B=.8+.2*Math.sin(i*9+p.tw),C=l*(.85+.9*(1-K(m,.8,1)))*B*Math.min(1,m*8);G(s,h.x+p.ox*S,h.y+p.oy*S,h.z+p.oz*S,C,.55*(1-A))}const g=l*V(K(v,.5,.78))*(1-V(K(v,.84,1)));return a.commit(),.35*Math.min(1,b)+g}return{points:a.points,update:D,dispose:a.dispose}}const ho=`
  uniform vec2 uRes;
  uniform vec2 uMaskDir;
  uniform float uMaskOff;
  uniform float uMaskAmt;
  float typoMask() {
    vec2 suv = gl_FragCoord.xy / uRes;
    return smoothstep(0.0, 0.22, dot(suv, uMaskDir) + uMaskOff) * uMaskAmt;
  }
`;function bo(){const e={uRes:{value:new J(1,1)},uMaskDir:{value:new J(-1,0)},uMaskOff:{value:.6},uMaskAmt:{value:0}};return{uniforms:e,set(n,c,d,f){e.uRes.value.set(d,f),e.uMaskAmt.value=c,n==="links"?(e.uMaskDir.value.set(-1,0),e.uMaskOff.value=.6):n==="rechts"?(e.uMaskDir.value.set(1,0),e.uMaskOff.value=-.4):(e.uMaskDir.value.set(0,-1),e.uMaskOff.value=.56)}}}const R=Math.PI*2,Mo=`
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`,go=`
  uniform float uOrbit;
  uniform float uFill;
  uniform float uTime;
  uniform float uGain;
  uniform float uBase;
  uniform float uHalo;
  uniform vec3 uGold;
  uniform vec3 uHot;
  uniform float uClosed;
  uniform float uIntro;
  uniform float uRun;
  uniform float uWeg;
  uniform float uLandD;
  uniform float uLandAmt;
  ${ho}
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vV;
  const float TAU = 6.2831853;
  float bogen(float d, float c, float w) {
    float x = abs(d - c);
    x = min(x, TAU - x) / w;
    return exp(-x * x);
  }

  void main() {
    float ang = vUv.x * TAU;
    // d: Weg ab der Boxen-Station in Loop-Richtung (Boxen → Creator → Games → Intel)
    float d = mod(ang + uOrbit - 1.5707963, TAU);
    float lit = uFill >= TAU - 0.002 ? 1.0 : 1.0 - smoothstep(uFill - 0.02, uFill + 0.1, d);
    float behind = max(0.0, uFill - d);
    // Ist der Loop geschlossen, gibt es keinen Kopf mehr — keine Naht an der Boxen-Station
    float head = lit * exp(-behind * 2.6) * (1.0 - uClosed);
    float trail = lit * mix(0.5 + 0.5 * exp(-behind * 0.55), 1.05, uClosed);

    float comets = 0.0;
    for (int i = 0; i < 4; i++) {
      float pp = mod(uTime * 0.62 + float(i) * 1.5707963, TAU);
      float dd = mod(pp - d, TAU);
      comets += exp(-dd * 5.5);
    }
    comets *= 0.22 + 0.78 * lit;

    // Intro: ein Lichtkopf läuft den Loop entlang, bevor gescrollt wird — der Ring ist
    // eine Bahn, kein Saturnring (Kritik M3). Schweif hinter dem Kopf, davor dunkel.
    float run = mod(uRun - d, TAU);
    float runHead = exp(-run * 7.0);
    float runTrail = exp(-run * 0.9);
    comets += uIntro * (runTrail * 0.75 + runHead * 2.2);

    // Outro als Wegweiser: der vordere Bogen zwischen Intel und Boxen (Sampling & Surveys)
    // leuchtet auf, Games (Kampagnen) und Creator (Reichweite) glimmen an ihren Stationen
    float wegS = bogen(d, 5.4977871, 0.62);
    float wegK = bogen(d, 3.1415927, 0.24) + bogen(d, 1.5707963, 0.24);
    comets += uWeg * (wegS * 1.25 + wegK * 0.5);

    // Landestelle der Points: heller Kern, weicher Hof entlang des Rings
    float land = uLandAmt * (bogen(d, uLandD, 0.045) * 1.6 + bogen(d, uLandD, 0.2) * 0.5);
    comets += land;

    float facing = abs(dot(normalize(vN), normalize(vV)));
    float profile = uHalo > 0.5 ? pow(facing, 2.2) * 0.32 : pow(facing, 1.4);

    float e = uBase * (1.0 - lit) + trail * 0.75 + head * 1.5 + comets * 0.9;
    vec3 col = uGold * e + uHot * (head * 0.45 + comets * 0.3 + uIntro * runHead * 0.6 + land * 0.5);
    // Wo die Riesentypo steht, tritt der Ring zurück (Lesbarkeit vor Licht)
    float a = clamp(profile * uGain, 0.0, 1.0) * mix(1.0, 0.22, typoMask());
    gl_FragColor = vec4(col, a);
    #include <colorspace_fragment>
  }
`;let L=null;function xo(){if(L)return L;const e=128,n=new Uint8Array(e*e*4);for(let c=0;c<e;c+=1)for(let d=0;d<e;d+=1){const f=(d+.5)/e-.5,a=(c+.5)/e-.5,w=Math.sqrt(f*f+a*a)*2,O=Math.exp(-(((w-.66)/.075)**2)),I=w<.66?.16*(1-w/.66)**.6:0;mo(n,(c*e+d)*4,Math.min(1,O+I)*(w<1?1:0))}return L=vo(n,e),L}function j(e){const n=new uo({uniforms:e,vertexShader:Mo,fragmentShader:go,transparent:!0,depthWrite:!1,toneMapped:!1});return n.blending=co,n.blendEquation=Q,n.blendSrc=fo,n.blendDst=X,n.blendEquationAlpha=Q,n.blendSrcAlpha=po,n.blendDstAlpha=X,n}function Ao({low:e,radius:n,stations:c=4,mask:d}){const f=new Y,a={uOrbit:{value:0},uFill:{value:0},uTime:{value:0},uBase:{value:.3},uGold:{value:new z(Z.gold)},uHot:{value:new z(16774084)},uClosed:{value:0},uIntro:{value:0},uRun:{value:0},uWeg:{value:0},uLandD:{value:0},uLandAmt:{value:0},...d.uniforms},w={...a,uGain:{value:1},uHalo:{value:0}},O={...a,uGain:{value:1},uHalo:{value:1}},I=new $(n,.02,e?6:8,e?300:560),P=new $(n,.1,8,e?200:360),k=j(w),h=j(O),U=new N(I,k),G=new N(P,h);U.rotation.x=G.rotation.x=Math.PI/2,U.renderOrder=G.renderOrder=3,f.add(G,U);const D=new Y;f.add(D);const i=new ro(1,1),t=[];for(let o=0;o<c;o+=1){const g=-o*(Math.PI/2),r=F({map:xo(),color:Z.gold,opacity:.2,sprite:!1});r.side=io;const s=new N(i,r);s.rotation.x=-Math.PI/2,s.position.set(Math.sin(g)*n,.002,Math.cos(g)*n),s.scale.setScalar(.95),s.renderOrder=3,D.add(s),t.push({m:s,mat:r,d:o*(Math.PI/2)})}const M=F({map:H(2.6),color:16769162,opacity:0}),u=new E(M);u.scale.setScalar(e?.9:1.05),u.renderOrder=4,f.add(u);const l=new E(F({map:H(5),color:16774872,opacity:0}));l.scale.setScalar(.34),l.renderOrder=4,f.add(l);const v=F({map:H(2.2),color:16766554,opacity:0}),y=new E(v);y.renderOrder=4,y.visible=!1,f.add(y);const b={d:0,amt:0};return{group:f,land(o,g){b.d=o,b.amt=g},update(o,g,r=1,s=null){const p=o.orbit+o.outro*(R-o.orbit);a.uOrbit.value=o.orbit,a.uFill.value=Math.max(0,p),a.uClosed.value=W.smoothstep(o.outro,.55,1),a.uTime.value=g,a.uBase.value=.26+o.intro*.08;const m=g*.9%R;a.uRun.value=m,a.uIntro.value=o.intro*(s===null?1:s),a.uWeg.value=W.smoothstep(o.outro,.5,1);const A=m-o.orbit+Math.PI/2;u.position.set(Math.cos(A)*n,0,Math.sin(A)*n),l.position.copy(u.position),u.visible=l.visible=o.intro>.01;const S=s===null?r:s;M.opacity=.75*o.intro*S,l.material.opacity=.95*o.intro*S;const B=(1+o.outro*.7)*r;w.uGain.value=B,O.uGain.value=B*(.85+o.outro*.6),D.rotation.y=o.orbit;const C=Math.min(1.5,b.amt)*r;if(a.uLandD.value=b.d,a.uLandAmt.value=C,y.visible=C>.002,y.visible){const T=b.d-o.orbit+Math.PI/2;y.position.set(Math.cos(T)*n,0,Math.sin(T)*n),y.scale.setScalar(.7+.5*Math.min(1,C)),v.opacity=.62*Math.min(1,C)}t.forEach((T,_)=>{const oo=W.smoothstep(p,T.d-.3,T.d),q=o.focus[_]||0,eo=.5+.5*Math.sin(g*2.4+_),ao=((m-T.d)%R+R)%R,to=Math.exp(-ao*2.2)*o.intro*(s===null?1:s);T.mat.opacity=(.16+oo*.42+q*(.3+.2*eo)+o.outro*.35+to*.6)*r,T.m.scale.setScalar(.85+q*.35+o.outro*.15)})},dispose(){I.dispose(),P.dispose(),k.dispose(),h.dispose(),i.dispose(),t.forEach(o=>o.mat.dispose()),M.dispose(),l.material.dispose(),v.dispose(),L&&(L.dispose(),L=null)}}}export{ho as M,Ao as a,yo as b,bo as c};
