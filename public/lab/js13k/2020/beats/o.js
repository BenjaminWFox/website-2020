!function(t){var i={};function s(h){if(i[h])return i[h].exports;var e=i[h]={i:h,l:!1,exports:{}};return t[h].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.m=t,s.c=i,s.d=function(t,i,h){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:h})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"u",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.u)return t;var h=Object.create(null);if(s.r(h),Object.defineProperty(h,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var e in t)s.d(h,e,function(i){return t[i]}.bind(null,e));return h},s.n=function(t){var i=t&&t.u?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="./",s(s.s=0)}({0:function(t,i,s){t.exports=s("tjUo")},tjUo:function(t,i,s){"use strict";s.r(i);const h={};function e(t,...i){(h[t]||[]).map(t=>t(...i))}let n,r;function o(){return n}function a(){return r}function c(t){return n=document.getElementById(t)||t||document.querySelector("canvas"),r=n.getContext("2d"),r.imageSmoothingEnabled=!1,e("init"),{canvas:n,cX:r}}class u{constructor({spriteSheet:t,frames:i,frameRate:s,loop:h=!0}){this.spriteSheet=t,this.frames=i,this.frameRate=s,this.loop=h;const{width:e,height:n,margin:r=0}=t.frame;this.width=e,this.height=n,this.margin=r,this._f=0,this._a=0}clone(){return new u(this)}reset(){this._f=0,this._a=0}update(t=1/60){if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render({x:t,y:i,width:s=this.width,height:h=this.height,cX:e=a()}){const n=this.frames[this._f]/this.spriteSheet._f|0,r=this.frames[this._f]%this.spriteSheet._f|0;e.drawImage(this.spriteSheet.image,r*this.width+(2*r+1)*this.margin,n*this.height+(2*n+1)*this.margin,this.width,this.height,t,i,s,h)}}function f(){return new u(...arguments)}f.prototype=u.prototype,f.class=u;new WeakMap;function d(t,i){const s=Math.sin(i),h=Math.cos(i);return{x:t.x*h-t.y*s,y:t.x*s+t.y*h}}function A(t,i,s){return Math.min(Math.max(t,s),i)}function l(t,i){return t.rotation||i.rotation?null:([t,i]=[t,i].map(t=>g(t)),t.x<i.x+i.width&&t.x+t.width>i.x&&t.y<i.y+i.height&&t.y+t.height>i.y)}function g(t){let{x:i,y:s,width:h,height:e}=t.world||t;return t.anchor&&(i-=h*t.anchor.x,s-=e*t.anchor.y),h<0&&(i+=h,h*=-1),e<0&&(s+=e,e*=-1),{x:i,y:s,width:h,height:e}}class v{constructor(t=0,i=0,s={}){this.x=t,this.y=i,s._c&&(this.clamp(s._a,s._b,s._d,s._e),this.x=t,this.y=i)}add(t){return new v(this.x+t.x,this.y+t.y,this)}subtract(t){return new v(this.x-t.x,this.y-t.y,this)}scale(t){return new v(this.x*t,this.y*t)}normalize(t=this.length()){return new v(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}clamp(t,i,s,h){this._c=!0,this._a=t,this._b=i,this._d=s,this._e=h}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?A(this._a,this._d,t):t}set y(t){this._y=this._c?A(this._b,this._e,t):t}}function p(){return new v(...arguments)}p.prototype=v.prototype,p.class=v;const x=()=>{};function w(t,i){const s=i.parentNode;if(t.setAttribute("data-kontra",""),s){const h=s.querySelector("[data-kontra]:last-of-type")||i;s.insertBefore(t,h.nextSibling)}else document.body.appendChild(t)}class y extends class{constructor(t){return this.init(t)}init(t={}){this.position=p(),this.velocity=p(),this.acceleration=p(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let i=this.acceleration;t&&(i=i.scale(t)),this.velocity=this.velocity.add(i);let s=this.velocity;t&&(s=s.scale(t)),this.position=this.position.add(s),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}{init({width:t=0,height:i=0,cX:s=a(),render:h=this.draw,update:e=this.advance,children:n=[],anchor:r={x:0,y:0},sx:o=0,sy:c=0,opacity:u=1,rotation:f=0,scaleX:d=1,scaleY:A=1,...l}={}){this._c=[],super.init({width:t,height:i,cX:s,anchor:r,sx:o,sy:c,opacity:u,rotation:f,scaleX:d,scaleY:A,...l}),this._di=!0,this._uw(),n.map(t=>this.addChild(t)),this._rf=h,this._uf=e}update(t){this._uf(t),this._c.map(t=>t.update&&t.update())}render(t){const i=this.cX;i.save(),(this.x||this.y)&&i.translate(this.x,this.y),this.rotation&&i.rotate(this.rotation),(this.sx||this.sy)&&i.translate(-this.sx,-this.sy),1==this.scaleX&&1==this.scaleY||i.scale(this.scaleX,this.scaleY);const s=-this.width*this.anchor.x,h=-this.height*this.anchor.y;(s||h)&&i.translate(s,h),this.cX.globalAlpha=this.opacity,this._rf(),(s||h)&&i.translate(-s,-h);let e=this._c;t&&(e=e.filter(t)),e.map(t=>t.render&&t.render()),i.restore()}draw(){}_pc(t,i){this._uw(),this._c.map(t=>t._pc())}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;const{_wx:t=0,_wy:i=0,_wo:s=1,_wr:h=0,_wsx:e=1,_wsy:n=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=s*this.opacity,this._wr=h+this.rotation;const{x:r,y:o}=d({x:this.x,y:this.y},h);this._wx=r,this._wy=o,this._wsx=e*this.scaleX,this._wsy=n*this.scaleY,this._wx=this.x*e,this._wy=this.y*n,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wx+=t,this._wy+=i}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}addChild(t,{absolute:i=!1}={}){this._c.push(t),t.parent=this,t._pc=t._pc||x,t._pc()}removeChild(t){const i=this._c.indexOf(t);-1!==i&&(this._c.splice(i,1),t.parent=null,t._pc())}get opacity(){return this._opa}set opacity(t){this._opa=t,this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}setScale(t,i=t){this.scaleX=t,this.scaleY=i}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}function m(){return new y(...arguments)}m.prototype=y.prototype,m.class=y;class b extends m.class{init({image:t,width:i=(t?t.width:void 0),height:s=(t?t.height:void 0),...h}={}){super.init({image:t,width:i,height:s,...h})}get animations(){return this._a}set animations(t){let i,s;for(i in this._a={},t)this._a[i]=t[i].clone(),s=s||this._a[i];this.cA=s,this.width=this.width||s.width,this.height=this.height||s.height}playAnimation(t){this.cA=this.animations[t],this.cA.loop||this.cA.reset()}advance(t){super.advance(t),this.cA&&this.cA.update(t)}draw(){this.image&&this.cX.drawImage(this.image,0,0,this.image.width,this.image.height),this.cA&&this.cA.render({x:0,y:0,width:this.width,height:this.height,cX:this.cX}),this.color&&(this.cX.fillStyle=this.color,this.cX.fillRect(0,0,this.width,this.height))}}function M(){return new b(...arguments)}M.prototype=b.prototype,M.class=b;const S=/(\d+)(\w+)/;class E extends m.class{init({text:t="",textAlign:i="",lineHeight:s=1,font:h=a().font,...e}={}){super.init({text:t,textAlign:i,lineHeight:s,font:h,...e}),this._p()}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=function(t){const i=t.match(S),s=+i[1];return{size:s,unit:i[2],computed:s}}(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;const t=this.cX;if(t.font=this.font,!this._s.length&&this._fw){const i=this.text.split(" ");let s=0,h=2;for(;h<=i.length;h++){const e=i.slice(s,h).join(" ");t.measureText(e).width>this._fw&&(this._s.push(i.slice(s,h-1).join(" ")),s=h-1)}this._s.push(i.slice(s,h).join(" "))}if(!this._s.length&&this.text.includes("\n")){let i=0;this.text.split("\n").map(s=>{this._s.push(s),i=Math.max(i,t.measureText(s).width)}),this._w=this._fw||i}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,i=this.textAlign;const s=this.cX;i=this.textAlign||("rtl"===s.canvas.dir?"right":"left"),t="right"===i?this.width:"center"===i?this.width/2|0:0,this._s.map((h,e)=>{s.textBaseline="top",s.textAlign=i,s.fillStyle=this.color,s.font=this.font,s.fillText(h,t,this._fs*this.lineHeight*e)})}}function k(){return new E(...arguments)}k.prototype=E.prototype,k.class=E;const O=new WeakMap;function R(...t){t.map(t=>{const i=t.cX?t.cX.canvas:o(),s=O.get(i);t._r||(t._r=t.render,t.render=function(){s._cf.push(this),this._r()},s._o.push(t))})}class C extends M.class{init({padX:t=0,padY:i=0,text:s,onDown:h,onUp:e,...n}={}){super.init({padX:t,padY:i,...n}),this.textNode=k({...s,cX:this.cX}),this.width||(this.width=this.textNode.width,this.height=this.textNode.height),R(this),this.addChild(this.textNode),this._od=h||x,this._ou=e||x;const r=this._dn=document.createElement("button");r.style="position:absolute;left:-9999px",r.textContent=this.text,r.addEventListener("focus",()=>this.focus()),r.addEventListener("blur",()=>this.blur()),r.addEventListener("keydown",t=>this._kd(t)),r.addEventListener("keyup",t=>this._ku(t)),w(r,this.cX.canvas),this._uw(),this._p()}get text(){return this.textNode.text}set text(t){this._d=!0,this.textNode.text=t}destroy(){this._dn.remove()}_p(){this.text!==this._dn.textContent&&(this._dn.textContent=this.text),this.textNode._p();const t=this.textNode.width+2*this.padX,i=this.textNode.height+2*this.padY;this.width=Math.max(t,this.width),this.height=Math.max(i,this.height),this._uw()}render(){this._d&&this._p(),super.render()}enable(){this.disabled=this._dn.disabled=!1,this.onEnable()}disable(){this.disabled=this._dn.disabled=!0,this.onDisable()}focus(){this.disabled||(this.focused=!0,document.activeElement!=this._dn&&this._dn.focus(),this.onFocus())}blur(){this.focused=!1,document.activeElement==this._dn&&this._dn.blur(),this.onBlur()}onOver(){this.disabled||(this.hovered=!0)}onOut(){this.hovered=!1}onEnable(){}onDisable(){}onFocus(){}onBlur(){}onDown(){this.disabled||(this.pressed=!0,this._od())}onUp(){this.disabled||(this.pressed=!1,this._ou())}_kd(t){"Enter"!=t.code&&"Space"!=t.code||this.onDown()}_ku(t){"Enter"!=t.code&&"Space"!=t.code||this.onUp()}}function T(){return new C(...arguments)}function j(t){const i=t.canvas;t.clearRect(0,0,i.width,i.height)}function Q({fps:t=60,clearCanvas:i=!0,update:s=x,render:h,cX:n=a()}={}){let r=0;const o=1e3/t,c=1/t,u=i?j:x;let f,d,A,l,g;function v(){if(d=requestAnimationFrame(v),A=performance.now(),l=A-f,f=A,!(l>1e3)){for(e("tick"),r+=l;r>=o;)g.update(c),r-=o;u(n),g.render()}}return g={update:s,render:h,isStopped:!0,start(){f=performance.now(),this.isStopped=!1,requestAnimationFrame(v)},stop(){this.isStopped=!0,cancelAnimationFrame(d)},_frame:v,set _last(t){f=t}},g}T.prototype=C.prototype,T.class=C;const U={set:(t,i,s)=>(i.startsWith("_")||(t._d=!0),Reflect.set(t,i,s))},F={start:t=>t?1:0,center:()=>.5,end:t=>t?0:1};class B extends m.class{init({flow:t="column",align:i="start",justify:s="start",colGap:h=0,rowGap:e=0,numCols:n=1,dir:r="",breakpoints:o=[],...a}={}){return super.init({flow:t,align:i,justify:s,colGap:h,rowGap:e,numCols:n,dir:r,breakpoints:o,...a}),this._p(),new Proxy(this,U)}addChild(t){this._d=!0,super.addChild(t)}removeChild(t){this._d=!0,super.removeChild(t)}render(){this._d&&this._p(),super.render()}destroy(){this._c.map(t=>t.destroy&&t.destroy())}_p(){this._d=!1,this.breakpoints.map(t=>{t.metric.call(this)&&this._b!==t&&(this._b=t,t.callback.call(this))});const t=this._g=[],i=this._cw=[],s=this._rh=[],h=this._c,e=this._nc="column"===this.flow?1:"row"===this.flow?h.length:this.numCols;let n=0,r=0;for(let o,a=0;o=h[a];a++){t[n]=t[n]||[],o._p&&o._p(),s[n]=Math.max(s[n]||0,o.height);let h=o.colSpan||1;const a=h;do{i[r]=Math.max(i[r]||0,o.width/a),t[n][r]=o}while(a+r++<=e&&--h);r>=e&&(r=0,n++)}for(;r>0&&r<e;)t[n][r++]=!1;const o=t.length,a=[].concat(this.colGap),c=[].concat(this.rowGap);this._w=i.reduce((t,i)=>t+i,0);for(let t=0;t<e-1;t++)this._w+=a[t%a.length];this._h=s.reduce((t,i)=>t+i,0);for(let t=0;t<o-1;t++)this._h+=c[t%c.length];this._uw();const u="rtl"===this.cX.canvas.dir&&!this.dir||"rtl"===this.dir;this._rtl=u,u&&(this._g=t.map(t=>t.reverse()),this._cw=i.reverse());let f=-this.anchor.y*this.height;const d=[];this._g.map((t,h)=>{let e=-this.anchor.x*this.width;t.map((t,n)=>{if(t&&!d.includes(t)){d.push(t);const r=F[t.justifySelf||this.justify](this._rtl),o=F[t.alignSelf||this.align](),c=t.colSpan||1;let u=i[n];if(c>1&&n+c<=this._nc)for(let t=1;t<c;t++)u+=i[n+t]+a[(n+t)%a.length];let A=u*r,l=s[h]*o,g=0,v=0;const{width:p,height:x}=t;if(t.anchor&&(g=t.anchor.x,v=t.anchor.y),0===r)A+=p*g;else if(.5===r){A+=(g<.5?-1:.5===g?0:1)*p*r}else A-=p*(1-g);if(0===o)l+=x*v;else if(.5===o){l+=(v<.5?-1:.5===v?0:1)*x*o}else l-=x*(1-v);t.x=e+A,t.y=f+l}e+=i[n]+a[n%a.length]}),f+=s[h]+c[h%c.length]})}}function G(){return new B(...arguments)}G.prototype=B.prototype,G.class=B;class D{constructor({create:t,maxSize:i=1024}={}){let s;!t||!(s=t())||s.update&&s.init&&s.isAlive&&s.render,this._c=t,this.objects=[t()],this.size=0,this.maxSize=i}get(t={}){if(this.size===this.objects.length){if(this.size===this.maxSize)return;for(let t=0;t<this.size&&this.objects.length<this.maxSize;t++)this.objects.push(this._c())}const i=this.objects[this.size];return this.size++,i.init(t),i}getAliveObjects(){return this.objects.slice(0,this.size)}clear(){this.size=this.objects.length=0,this.objects.push(this._c())}update(t){let i,s=!1;for(let h=this.size;h--;)i=this.objects[h],i.update(t),i.isAlive()||(s=!0,this.size--);s&&this.objects.sort((t,i)=>i.isAlive()-t.isAlive())}render(){for(let t=this.size;t--;)this.objects[t].render()}}function H(){return new D(...arguments)}function _(t,i){const s=[],h=i.x+i.width/2,e=i.y+i.height/2,{x:n,y:r,width:o,height:a}=g(t),c=t.y<e,u=t.y+t.height>=e;return t.x<h&&(c&&s.push(0),u&&s.push(2)),t.x+t.width>=h&&(c&&s.push(1),u&&s.push(3)),s}H.prototype=D.prototype,H.class=D;class I{constructor({maxDepth:t=3,maxObjects:i=25,bounds:s}={}){this.maxDepth=t,this.maxObjects=i;const h=o();this.bounds=s||{x:0,y:0,width:h.width,height:h.height},this._b=!1,this._d=0,this._o=[],this._s=[],this._p=null}clear(){this._s.map((function(t){t.clear()})),this._b=!1,this._o.length=0}get(t){const i=new Set;for(;this._s.length&&this._b;)return _(t,this.bounds).map(s=>{this._s[s].get(t).map(t=>i.add(t))}),Array.from(i);return this._o.filter(i=>i!==t)}add(...t){t.map(t=>{Array.isArray(t)?this.add.apply(this,t):this._b?this._a(t):(this._o.push(t),this._o.length>this.maxObjects&&this._d<this.maxDepth&&(this._sp(),this._o.map(t=>this._a(t)),this._o.length=0))})}_a(t){_(t,this.bounds).map(i=>{this._s[i].add(t)})}_sp(t,i,s){if(this._b=!0,!this._s.length)for(t=this.bounds.width/2|0,i=this.bounds.height/2|0,s=0;s<4;s++)this._s[s]=new I({bounds:{x:this.bounds.x+(s%2==1?t:0),y:this.bounds.y+(s>=2?i:0),width:t,height:i},maxDepth:this.maxDepth,maxObjects:this.maxObjects}),this._s[s]._d=this._d+1,this._s[s]._p=this}}function N(){return new I(...arguments)}function K(t){let i=[];return t._dn?i.push(t._dn):t.children&&t.children.map(t=>{i=i.concat(K(t))}),i}N.prototype=I.prototype,N.class=I;class V extends m.class{init({id:t,name:i=t,cullObjects:s=!0,cullFunction:h=l,...e}){const n=this._dn=document.createElement("section");n.tabIndex=-1,n.style="position:absolute;left:-9999px",n.id=t,n.setAttribute("aria-label",i),super.init({id:t,name:i,cullObjects:s,cullFunction:h,...e}),w(n,this.cX.canvas);const r=this.cX.canvas;this.camera=m({x:r.width/2,y:r.height/2,width:r.width,height:r.height,anchor:{x:.5,y:.5}}),this.camera._pc=()=>{super._pc.call(this.camera);this.cX.canvas;this.camera._wx=this.camera.x*this.scaleX,this.camera._wy=this.camera.y*this.scaleY}}show(){this.hidden=this._dn.hidden=!1;const t=this._c.find(t=>t.focus);t?t.focus():this._dn.focus(),this.onShow()}hide(){this.hidden=this._dn.hidden=!0,this.onHide()}addChild(t,i){super.addChild(t,i),K(t).map(t=>{this._dn.appendChild(t)})}removeChild(t){super.removeChild(t),K(t).map(t=>{w(t,this.cX.canvas)})}destroy(){this._dn.remove(),this._c.map(t=>t.destroy&&t.destroy())}update(t){this.hidden||super.update(t)}lookAt(t){let i=(t=t.world||t).x,s=t.y;t.scaleX&&(i/=t.scaleX,s/=t.scaleY),this.camera.x=i,this.camera.y=s,this._pc()}_pc(){super._pc(),this.camera&&this.camera._pc()}render(){const{x:t,y:i,width:s,height:h}=this.camera;this.sx=t*this.scaleX-s/2,this.sy=i*this.scaleY-h/2,this.hidden||super.render(t=>!this.cullObjects||this.cullFunction(t,this.camera))}onShow(){}onHide(){}}function P(){return new V(...arguments)}function L(t){if(+t===t)return t;const i=[],s=t.split(".."),h=+s[0],e=+s[1];let n=h;if(h<e)for(;n<=e;n++)i.push(n);else for(;n>=e;n--)i.push(n);return i}P.prototype=V.prototype,P.class=V;class X{constructor({image:t,frameWidth:i,frameHeight:s,frameMargin:h,animations:e}={}){this.animations={},this.image=t,this.frame={width:i,height:s,margin:h},this._f=t.width/i|0,this.createAnimations(e)}createAnimations(t){let i,s;for(s in t){const{frames:h,frameRate:e,loop:n}=t[s];i=[],[].concat(h).map(t=>{i=i.concat(L(t))}),this.animations[s]=f({spriteSheet:this,frames:i,frameRate:e,loop:n})}}}function Y(){return new X(...arguments)}Y.prototype=X.prototype,Y.class=X;function J(t){this.c=t}J.prototype.setup=function(){this.o=this.c.createOscillator(),this.g=this.c.createGain(),this.o.connect(this.g),this.g.connect(this.c.destination)},J.prototype.trigger=function(t){this.setup(),this.o.frequency.setValueAtTime(100,t),this.g.gain.setValueAtTime(.95,t),this.o.frequency.exponentialRampToValueAtTime(.01,t+1.25),this.g.gain.exponentialRampToValueAtTime(.01,t+1.25),this.o.start(t),this.o.stop(t+1)};var W=J;function z(t){this.c=t}z.prototype.setup=function(){this.o=this.c.createOscillator(),this.g=this.c.createGain(),this.o.connect(this.g),this.g.connect(this.c.destination)},z.prototype.trigger=function(t){this.setup(),this.o.frequency.setValueAtTime(200,t),this.g.gain.setValueAtTime(.95,t),this.o.frequency.exponentialRampToValueAtTime(.01,t+1.25),this.g.gain.exponentialRampToValueAtTime(.01,t+1.25),this.o.start(t),this.o.stop(t+1.25)};var q=z;function $(t){this.c=t}$.prototype.nb=function(){for(var t=this.c.sampleRate,i=this.c.createBuffer(1,t,this.c.sampleRate),s=i.getChannelData(0),h=0;h<t;h++)s[h]=2*Math.random()-1;return i},$.prototype.setup=function(){this.n=this.c.createBufferSource(),this.n.buffer=this.nb();var t=this.c.createBiquadFilter();t.type="highpass",t.frequency.value=1e3,this.n.connect(t),this.nE=this.c.createGain(),t.connect(this.nE),this.nE.connect(this.c.destination),this.o=this.c.createOscillator(),this.o.type="triangle",this.oE=this.c.createGain(),this.o.connect(this.oE),this.oE.connect(this.c.destination)},$.prototype.trigger=function(t){this.setup(),this.nE.gain.setValueAtTime(.25,t),this.nE.gain.exponentialRampToValueAtTime(.01,t+.2),this.n.start(t),this.o.frequency.setValueAtTime(100,t),this.oE.gain.setValueAtTime(.5,t),this.oE.gain.exponentialRampToValueAtTime(.01,t+.1),this.o.start(t),this.o.stop(t+.2),this.n.stop(t+.2)};var Z=$;function tt(t){this.c=t,this.fundamental=40,this.ratios=[2,3,4.16,5.43,6.79,8.21]}tt.prototype.setup=function(){this.g=this.c.createGain(),this.b=this.c.createBiquadFilter(),this.b.type="bandpass",this.b.frequency.value=1e4,this.h=this.c.createBiquadFilter(),this.h.type="highpass",this.h.frequency.value=7e3,this.b.connect(this.h),this.h.connect(this.g),this.g.connect(this.c.destination)},tt.prototype.trigger=function(t){var i=this;this.setup(),this.ratios.forEach((function(s){var h=i.c.createOscillator();h.type="square",h.frequency.value=i.fundamental*s,h.connect(i.b),h.start(t),h.stop(t+.5)})),this.g.gain.setValueAtTime(1e-5,t),this.g.gain.exponentialRampToValueAtTime(.75,t+.02),this.g.gain.exponentialRampToValueAtTime(.3,t+.08),this.g.gain.exponentialRampToValueAtTime(1e-5,t+.5)};var it=tt;function st(t){return function(t){if(Array.isArray(t))return ht(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,i){if(!t)return;if("string"==typeof t)return ht(t,i);var s=Object.prototype.toString.call(t).slice(8,-1);"Object"===s&&t.constructor&&(s=t.constructor.name);if("Map"===s||"Set"===s)return Array.from(t);if("Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))return ht(t,i)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ht(t,i){(null==i||i>t.length)&&(i=t.length);for(var s=0,h=new Array(i);s<i;s++)h[s]=t[s];return h}var et,nt,rt,ot,at,ct,ut,ft,dt,At,lt,gt,vt,pt,xt,wt,yt,mt,bt,Mt,St,Et,kt,Ot,Rt,Ct,Tt,jt,Qt,Ut,Ft,Bt,Gt,Dt,Ht="#1cfe3f",_t="#17f5fc",It="#f5ff3c",Nt="#fe1015",Kt="When the beats pass through\nthe zone at the bottom, press\nthe right key (shown here)!\n\nTiming is everything...\nIn the game they don't stop!",Vt=!1,Pt=!1,Lt=0,Xt=void 0,Yt=0,Jt=["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAFAQAAAAAMYNPcAAAAGUlEQVR4AQXBAQEAAAjDoDV/cxEaMmLCwj3bHhHsStx0BgAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAFAQAAAACS2tR8AAAAIUlEQVR4AWO4//////sgCAQM9UBOPQgCAcN/JIDB+QPDAMpQN1yWKcW4AAAAAElFTkSuQmCC","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAFAQAAAACS2tR8AAAAHElEQVR4AWP4jwTgnL9AyABhQSBDORIAyfyBYQAY9zVQJD9WeQAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAFAQAAAADdh9esAAAAHklEQVR4AWOoB4H4+niG/1CAYHwFge9fv4NE/oAwANEpI0e/cdSyAAAAAElFTkSuQmCC","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAFAQAAAACS2tR8AAAAKklEQVR4AWOoB4JyIPgPBAzfgeAuEISGfi9H5fz9//c/DDAA8R8g/geiAeOLMoKu1VkEAAAAAElFTkSuQmCC","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAFAQAAAAClONkNAAAAJElEQVR4AWOoRwMM/4HgOxIACSDA7/+/4QLlUAAS+AfFf0AYAGVrQwF5jrPtAAAAAElFTkSuQmCC"],Wt=["tutorial","Get it Pumping","Hello Hat","Highs and Lows","FJ Cruiser","Ensnared"],zt=[],qt=[],$t=[],Zt=["GRAPHICS","ASSETS","MELODIES","BEATS","ERROR 404\nBEATS\nNOT FOUND","BEATS\nNOT FOUND"],ti="introscene",ii="titlescene",si="prelevelscene",hi="gamescene",ei="postlevelscene",ni="gameoverscene",ri={p:{t:"PERFECT",c:Ht,p:1e3},g:{t:"GOOD",c:_t,p:750},o:{t:"OK",c:It,p:500},m:{t:"MEH",c:"#ff9827",p:250},b:{t:"MISS",c:Nt,p:-500}};function oi(t){t.show(),Ot=t}var ai=document.querySelector.bind(document);var ci,ui,fi=new(window.AudioContext||window.webkitAudioContext),di=new W(fi),Ai=new q(fi),li=new Z(fi),gi=new it(fi),vi=function(){for(var t=arguments.length,i=new Array(t),s=0;s<t;s++)i[s]=arguments[s];var h=yi.createBufferSource(),e=yi.createBuffer(i.length,i[0].length,wi);return i.map((function(t,i){return e.getChannelData(i).set(t)})),h.buffer=e,h.connect(yi.destination),h},pi=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.05,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:220,h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,e=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:.1,r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,o=arguments.length>7&&void 0!==arguments[7]?arguments[7]:1,a=arguments.length>8&&void 0!==arguments[8]?arguments[8]:0,c=arguments.length>9&&void 0!==arguments[9]?arguments[9]:0,u=arguments.length>10&&void 0!==arguments[10]?arguments[10]:0,f=arguments.length>11&&void 0!==arguments[11]?arguments[11]:0,d=arguments.length>12&&void 0!==arguments[12]?arguments[12]:0,A=arguments.length>13&&void 0!==arguments[13]?arguments[13]:0,l=arguments.length>14&&void 0!==arguments[14]?arguments[14]:0,g=arguments.length>15&&void 0!==arguments[15]?arguments[15]:0,v=arguments.length>16&&void 0!==arguments[16]?arguments[16]:0,p=arguments.length>17&&void 0!==arguments[17]?arguments[17]:1,x=arguments.length>18&&void 0!==arguments[18]?arguments[18]:0,w=arguments.length>19&&void 0!==arguments[19]?arguments[19]:wi,y=arguments.length>20&&void 0!==arguments[20]?arguments[20]:99+h*w,m=arguments.length>21&&void 0!==arguments[21]?arguments[21]:e*w,b=arguments.length>22&&void 0!==arguments[22]?arguments[22]:n*w,M=arguments.length>23&&void 0!==arguments[23]?arguments[23]:x*w,S=arguments.length>24&&void 0!==arguments[24]?arguments[24]:v*w,E=arguments.length>25&&void 0!==arguments[25]?arguments[25]:2*Math.PI,k=arguments.length>26&&void 0!==arguments[26]?arguments[26]:function(t){return 0<t?1:-1},O=arguments.length>27&&void 0!==arguments[27]?arguments[27]:y+M+m+b+S,R=arguments.length>28&&void 0!==arguments[28]?arguments[28]:a*=500*E/Math.pow(w,2),C=arguments.length>29&&void 0!==arguments[29]?arguments[29]:s*=(1+2*i*Math.random()-i)*E/w,T=arguments.length>30&&void 0!==arguments[30]?arguments[30]:k(l)*E/4,j=arguments.length>31&&void 0!==arguments[31]?arguments[31]:0,Q=arguments.length>32&&void 0!==arguments[32]?arguments[32]:0,U=arguments.length>33&&void 0!==arguments[33]?arguments[33]:0,F=arguments.length>34&&void 0!==arguments[34]?arguments[34]:0,B=arguments.length>35&&void 0!==arguments[35]?arguments[35]:0,G=arguments.length>36&&void 0!==arguments[36]?arguments[36]:0,D=arguments.length>37&&void 0!==arguments[37]?arguments[37]:1,H=arguments.length>38&&void 0!==arguments[38]?arguments[38]:[];U<O;H[U++]=G)++B>100*g&&(B=0,G=j*s*Math.sin(Q*l*E/w-T),G=k(G=r?1<r?2<r?3<r?Math.sin(Math.pow(G%E,3)):Math.max(Math.min(Math.tan(G),1),-1):1-(2*G/E%2+2)%2:1-4*Math.abs(Math.round(G/E)-G/E):Math.sin(G))*Math.pow(Math.abs(G),o)*t*xi*(U<y?U/y:U<y+M?1-(U-y)/M*(1-p):U<y+M+m?p:U<O-S?(O-U-S)/b*p:0),G=S?G/2+(S>U?0:(U<O-S?1:(U-O)/S)*H[U-S|0]/2):G),j+=1-A+1e9*(Math.sin(U)+1)%2*A,Q+=1-A+1e9*(Math.pow(Math.sin(U),2)+1)%2*A,s+=a+=500*c*E/Math.pow(w,3),D&&++D>f*w&&(s+=u*E/w,C+=u*E/w,D=0),d&&++F>d*w&&(s=C,a=R,F=1,D=D||1);return H},xi=1,wi=44100,yi=fi,mi=function(t,i,s){for(var h,e,n,r,o,a,c,u,f,d,A,l,g,v,p,x=arguments.length>3&&void 0!==arguments[3]?arguments[3]:125,w=[],y=[],m=[],b=0,M=1,S={},E=wi/x*60>>2;M;b++)w=[M=u=l=0],s.map((function(x,k){for(c=i[x][b]||[0,0,0],M|=!!i[x][b],v=l+(i[x][0].length-2-!u)*E,e=2,r=l;e<c.length+(k==s.length-1);u=++e){for(o=c[e],f=d!=(c[0]||0)|o|0,n=0;n<E&&u;n++>E-99&&f?A+=(A<1)/99:0)a=(1-A)*w[g++]/2||0,y[r]=(y[r]||0)+a*p-a,m[r]=(m[r++]||0)+a*p+a;o&&(A=o%1,p=c[1]||0,(o|=0)&&(w=S[[d=c[g=0]||0,o]]=S[[d,o]]||((h=st(t[d]))[2]*=Math.pow(2,(o-12)/12),pi.apply(void 0,st(h)))))}l=v}));return[y,m]},bi=[[[,0,200]],[[[,,13,13,16,13,18,13,20,18,16,16,20,16,23,16,20,16,11,11,15,11,18,11,18,16,9,9,13,9,16,9,16,15]]],[0],60,{}];function Mi(){var t=Math.ceil(Jt[Ft].songRepeats/2)+1;return bi[2]=new Array(t).fill(0,0,t),vi.apply(void 0,st(mi.apply(void 0,bi)))}function Si(t,i,s){this.sprite=k({x:i,y:ut-nt/2,color:t.c,anchor:{x:.5,y:.5},text:t.t,textAlign:"center",font:ts(25),opacity:1}),this.update=function(){this.sprite.opacity>0?(this.sprite.opacity=A(0,1,this.sprite.opacity-.01),this.sprite.y-=2):$t.pop()},this.render=function(){this.sprite.render()}}function Ei(t,i){switch($t.unshift(new Si(t,Dt[i].x,i)),t.t){case ri.p.t:Lt+=ri.p.p;break;case ri.g.t:Lt+=ri.g.p;break;case ri.o.t:Lt+=ri.o.p;break;case ri.m.t:Lt+=ri.m.p;break;case ri.b.t:Lt+=ri.b.p}Rt._c[1].text="SCORE:\n".concat(Lt)}function ki(t){var i=this;this.id="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var i=16*Math.random()|0;return("x"==t?i:3&i|8).toString(16)})),this.startTime=fi.currentTime,this.index=t,this.beat=Dt[t],this.y=-2*nt,this.x=this.beat.x-nt/2,this.image=this.beat.image,this.hit=!1,this.beat=void 0,this.zone=-2,this.phase=0,this.move=function(t,i){this.beat||(this.beat=i),0===Ft&&this.y>=ut?this.y=ut:(this.y+=ct,this.beat<i&&(this.zone+=1,this.beat=i,this.y=nt*this.zone)),0===this.phase&&this.y>ut-nt&&this.id===zt[zt.length-1].id&&(zt.pop(),qt.unshift(this),this.phase=1),this.y>rt&&(this.hit||Ei(ri.b,this.index),qt.pop())},this.render=function(){Et.drawImage(i.image,i.x,i.y)}}function Oi(t){zt.unshift(new ki(t))}function Ri(t,i,s,h){var e=document.createElement("canvas");e.width=nt,e.height=nt;var n=e.getContext("2d");return n.fillStyle=t,n.strokeStyle=i,n.beginPath(),n.arc(nt/2,nt/2,nt/2*.9,0,2*Math.PI),n.fill(),n.stroke(),n.fillStyle="#000",n.font=ts(48),n.textAlign="center",n.textBaseline="middle",n.fillText(s,0+nt/2,0+nt/2),e}function Ci(t){if(qt.length){for(var i=!1,s=qt.length;s>0;s-=1){var h=qt[s-1];if(h.index===t){var e=Math.floor(h.y);if(!h.hit){if(e>=pt){Ei(ri.b,t),i=Ti(h);continue}if(e<=vt)continue;if(e<Mt&&h.y>=bt){Ei(ri.p,t),i=Ti(h);continue}if(e<mt&&h.y>=yt){Ei(ri.g,t),i=Ti(h);continue}if(e<wt&&h.y>=xt){Ei(ri.o,t),i=Ti(h);continue}if(e<pt&&h.y>=vt){Ei(ri.m,t),i=Ti(h);continue}}}}i||Ot.id===hi&&Ei(ri.b,t)}else Ei(ri.b,t)}function Ti(t){if(Ot.id===hi)return t.hit=!0,!0}function ji(){Qi(Ft+1)}function Qi(t){Ft=+t,+t>=Jt.length?oi(Ut):(Ft=+t,Vt=!1,Pt=!1,Gi=0,Di=0,Hi=0,_i=0,Et.clearRect(0,0,St.width,St.height),Lt=0,zt=[],qt=[],$t=[],Bt=st(Jt[Ft].data[4]),ui&&(ui=!1,ci.stop()),oi(jt))}function Ui(){Pt=!0}function Fi(){var t,i,s;t=Ft,(s=null===(i=localStorage.getItem("b2020js13"))||void 0===i?void 0:i.split(""))?(s.includes(t.toString())||s.push(t),!s.includes((t+1).toString())&&t+1<Jt.length-1&&s.push(t+1)):s=[t,t+1],localStorage.setItem("b2020js13",s.join("")),oi(Qt)}function Bi(){Vi=fi.currentTime,Vt=!0}var Gi,Di,Hi,_i,Ii=0,Ni=0,Ki=function(){return Q({update:function(t){switch(Ii+=t,Ot.id){case ti:var i=Tt._c[1];switch(i.text){case Zt[0]:case Zt[1]:case Zt[2]:is(Ni,Ii,1,i)||(Ni=Ii,Tt.text+=1,ss(i,Tt.text));break;case Zt[3]:is(Ni,Ii,3,Tt._c[0]),is(Ni,Ii,3,i)||(Ni=Ii,i.color=Nt,ss(i,4));break;case Zt[4]:"off"===function(t,i,s,h){void 0===h.fin&&(h.fin=0===h.opacity);if(!h.fin&&h.opacity>=0&&(h.opacity=A(0,1,h.opacity-.05),0===h.opacity))return h.fin=!0,"off";if(h.fin&&h.opacity<=1)return h.opacity=A(0,1,h.opacity+.05),1!==h.opacity||(h.fin=!1,"on")}(0,0,0,i)&&Ni+3<Ii&&oi(Ct)}break;case ii:Ct._c[0].opacity<1&&hs(Ct._c[0]),Ct._c[1].opacity<1&&hs(Ct._c[1]),Ct._c[2].opacity<1&&hs(Ct._c[2]),Vt&&(Ct._c[3].text!==Kt&&Ct._c[3].opacity>0?es(Ct._c[3]):0===Ct._c[3].opacity?(Ct._c[3].text=Kt,Ct._c[3].font=ts(24),Ct._c[3].opacity=.05):Ct._c[3].opacity<1&&hs(Ct._c[3]),Xi());break;case si:(jt._c[0].opacity<1||jt._c[1].opacity<1||jt._c[2].opacity<1)&&(hs(jt._c[0]),hs(jt._c[1]),hs(jt._c[2]));break;case hi:(Rt._c[0].opacity>0||Rt._c[2].opacity>0)&&(es(Rt._c[0]),es(Rt._c[2])),Rt._c[1].opacity<1&&hs(Rt._c[1]),Xi(),Pt&&0===zt.length&&0===qt.length&&Fi();break;case ei:(Qt._c[0].opacity<1||Qt._c[1].opacity<1||Qt._c[2].opacity<1)&&(hs(Qt._c[0]),hs(Qt._c[1]),hs(Qt._c[2]));break;case ni:(Ut._c[0].opacity<1||Ut._c[1].opacity<1||Ut._c[2].opacity<1)&&(hs(Ut._c[0]),hs(Ut._c[1]),hs(Ut._c[2]))}},render:function(){switch(Ot.id){case ti:Tt.render();break;case ii:Wi(),Yi(),Ji(),Ct.render();break;case si:Wi(),jt.render();break;case hi:Wi(),Yi(),Ji(),Rt.render();break;case ei:Wi(),Qt.render();break;case ni:Ut.render()}}})},Vi=0;function Pi(t,i){ui||void 0!==Xt?ui||!1!==Xt?ui||!0!==Xt?ui&&(Li(Di),Di+=1):(Gi=0,ci.start(i),ui=!0,Li(Di),Di+=1):Xt=!0:Xt=!1}function Li(t){for(var i=0;i<4;i+=1)Jt[Ft].data[i][Hi]&&Oi(i);var s=Bt[Hi];s?(Bt[Hi]-=1,Hi-=_i,_i=0):0===s?(Bt[Hi]="",_i=0,(Hi+=1)===Bt.length&&Ui()):(_i+=1,(Hi+=1)===Bt.length&&Ui())}function Xi(){!function(){for(;Vi<fi.currentTime+.01;)Pi(0,Vi),Vi+=.125,16==++Gi&&(Gi=0)}(),function(){for(var t=0;t<zt.length;t+=1)zt[t].move(Gi,Di);for(var i=0;i<qt.length;i+=1)qt[i].move(Gi,Di)}(),function(){for(var t=0;t<$t.length;t+=1)$t[t].update()}()}function Yi(){for(var t=0;t<zt.length;t+=1)zt[t].render();for(var i=0;i<qt.length;i+=1)qt[i].render()}function Ji(){for(var t=0;t<$t.length;t+=1)$t[t].render()}function Wi(){Et.fillStyle="#ffffff",Et.strokeStyle="#ffffff",Et.setLineDash([4,6]),Et.strokeRect(-2,ut-.08*nt,ot+4,1.08*gt),Et.fillStyle="#222222",Et.strokeStyle="#f9f9f9",Et.fillRect(ft,0,1,rt),Et.fillRect(dt,0,1,rt),Et.fillRect(At,0,1,rt),Et.fillRect(lt,0,1,rt)}function zi(t){switch(Ot.id){case ti:"Space"===t.code&&(di.trigger(fi.currentTime),oi(Ct));break;case ii:"Space"===t.code?(di.trigger(fi.currentTime),ji()):"KeyT"===t.code?Vt||(di.trigger(fi.currentTime),Bi()):t.key>0&&t.key<6?Gt.includes(t.key)&&Qi(t.key):qi(t.code);break;case si:"Space"===t.code&&(di.trigger(fi.currentTime),oi(Rt));break;case hi:"Space"===t.code||qi(t.code);break;case ei:"Space"===t.code&&(di.trigger(fi.currentTime),ji()),"KeyR"===t.code&&Qi(Ft);break;case ni:"Space"===t.code&&(di.trigger(fi.currentTime),oi(Ct))}}function qi(t){switch(t){case"KeyD":di.trigger(fi.currentTime),Ci(0);break;case"KeyF":Ai.trigger(fi.currentTime),Ci(1);break;case"KeyJ":li.trigger(fi.currentTime),Ci(2);break;case"KeyK":gi.trigger(fi.currentTime),Ci(3);break;default:return}}function $i(){Yt===Jt.length?(kt=ai("#canvas").getContext("2d"),Jt.forEach((function(t,i){t.data={},t.length=t.image.width,t.totalLength=0,t.width=t.image.width,t.height=t.image.height,kt.drawImage(t.image,0,0);for(var s=0,h=0,e=0,n=0;n<t.height;n+=1){t.data[n]=[];for(var r=0,o=0;o<t.width;o+=1){var a=0===kt.getImageData(o,n,1,1).data[0]?1:"";if(n<4)t.data[n].push(a);else{var c=0===kt.getImageData(o+1,n,1,1).data[0]?1:"";if(a){if(c&&o!==t.width-1)r+=1,h+=1,t.data[n].push("");else if(a&&(!c||o===t.width-1)){for(var u=0,f=0;f<4;f+=1)for(var d=s;d<o;d+=1)t.data[f][d]&&(u+=1);u*=r+1,s=o,t.data[n].push(r),e+=u,h+=1,r=0}}else t.data[n].push(a)}}}t.totalBeats=e,t.songRepeats=Math.ceil(h),t.maxScore=e*ri.p.p})),rt=et=1200,nt=Math.floor(et/16),ct=nt/7.5,at=(ot=5*nt)/2,gt=nt,ut=14*Math.floor(rt/16)-nt/2,pt=15.5*nt,xt=(vt=ut-nt)+Math.floor(nt-nt/1.25),yt=vt+Math.floor(nt-nt/2),bt=vt+Math.floor(nt-nt/3.5),wt=pt-Math.floor(nt-nt/3),mt=pt-Math.floor(nt),Mt=pt-Math.floor(1.3*nt),ft=at-nt/2*3,dt=at-nt/2,At=at+nt/2,lt=at+nt/2*3,ai("#body").style.height="".concat(et,"px"),ai("#body").style.overflow="hidden",St.height=et,St.width=5*nt,St.style.height="100vh",Zi(),Tt=P({id:ti,text:0,children:[k({text:"LOADING",color:_t,x:at,y:100,anchor:{x:.5,y:.5},textAlign:"center",font:ts(40)}),k({text:"GRAPHICS",color:Ht,x:at,y:160,anchor:{x:.5,y:.5},textAlign:"center",font:ts(60)}),k({x:at,y:475,color:_t,anchor:{x:.5,y:.5},text:"SKIP\n[ space ]",textAlign:"center",font:ts(30)})],onShow:function(){}}),Ct=P({id:ii,children:[Tt._c[1],Tt._c[0],Tt._c[2],k({x:at,y:615,color:It,anchor:{x:.5,y:.5},text:"TUTORIAL\n[ t ]",textAlign:"center",font:ts(30)}),k({x:at,y:750,color:_t,anchor:{x:.5,y:.5},text:"",textAlign:"center",font:ts(30)})],onShow:function(){var t;Qi(0),Zi(!0),this._c[0].text=Zt[5],this._c[0].color=Nt,this._c[2].text="START\n[ space ]",this._c[0].opacity=0,this._c[2].opacity=0,this._c[1].y=325,this._c[1].opacity=0,this._c[1].color=Ht,this._c[1].text="Prepare For\nManual Re-entry...",this._c[1].font=ts(30),(Gt=null===(t=localStorage.getItem("b2020js13"))||void 0===t?void 0:t.split(""))&&(this._c[4].text="JUMP TO LEVEL\n[ ".concat(Gt.join(", ")," ]"))},onHide:function(){zt=[],qt=[]}}),Rt=P({id:hi,children:[Tt._c[1],Tt._c[0],Tt._c[2]],onShow:function(){Zi(),Bi(),this._c[1].y=100,this._c[1].opacity=0,this._c[1].color=Ht,this._c[1].text="SCORE:\n".concat(Lt),this._c[1].font=ts(30)}}),jt=P({id:si,children:[Tt._c[1],Tt._c[0],Tt._c[2]],onShow:function(){ci=Mi(),this._c[0].text="LEVEL ".concat(Ft),this._c[0].color=Nt,this._c[2].text="START\n[ space ]",this._c[0].opacity=0,this._c[2].opacity=0,this._c[1].y=350,this._c[1].opacity=0,this._c[1].color=Ht,this._c[1].text=Jt[Ft].name,this._c[1].font=ts(30)},onhide:function(){}}),Qt=P({id:ei,children:[Tt._c[1],Tt._c[0],Tt._c[2]],onShow:function(){this._c[0].text="LEVEL ".concat(Ft,"\nCOMPLETE"),this._c[0].color=Nt,this._c[2].text="NEXT\n[ space ]\n\nRETRY\n[ r ]",this._c[0].opacity=0,this._c[2].opacity=0,this._c[1].y=300,this._c[1].opacity=0,this._c[1].color=Ht,this._c[1].text="Score:\n".concat(Lt,"/\n").concat(Jt[Ft].maxScore),this._c[1].font=ts(30)},onhide:function(){}}),Ut=P({id:ni,children:[Tt._c[1],Tt._c[0],Tt._c[2]],onShow:function(){this._c[0].text="MANUAL\nREPROGRAM\nCOMPLETE",this._c[0].color=Nt,this._c[2].text="Replay\n[ space ]",this._c[0].opacity=0,this._c[2].opacity=0,this._c[1].y=350,this._c[1].opacity=0,this._c[1].color=Ht,this._c[1].text="Thank you for\nplaying!!",this._c[1].font=ts(30)},onhide:function(){}}),oi(Ct),Ki().start()):setTimeout($i,250)}function Zi(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];Dt=[{x:ft,image:Ri("#ff5555","#eeeeee",t?"D":"")},{x:dt,image:Ri("#08ff08","#eeeeee",t?"F":"")},{x:At,image:Ri("#6600ff","#eeeeee",t?"J":"")},{x:lt,image:Ri("#04d9ff","#eeeeee",t?"K":"")}]}function ts(t){return"".concat(t,"px Impact, AvenirNextCondensed-Heavy, Arial-BoldMT, Arial-black, Arial")}function is(t,i,s,h){return t+s>i||h.opacity>0&&(h.opacity=A(0,1,h.opacity-.2),!0)}function ss(t,i){var s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];t.text=Zt[i],t.opacity=s?A(0,1,t.opacity+.05):1}function hs(t){t.opacity<1&&(t.opacity=A(0,1,t.opacity+.05))}function es(t){t.opacity>0&&(t.opacity=A(0,1,t.opacity-.05))}window.addEventListener("load",(function(){var t=c("board");St=t.canvas,Et=t.cX,window.addEventListener("keydown",zi),Jt.forEach((function(t,i){return function(t){var i=new Image,s={image:i,id:t,length:void 0,name:Wt[t]};i.src=Jt[t],i.onload=function(){Jt.splice(t,1,s),Yt+=1}}(i)})),$i()}))}});