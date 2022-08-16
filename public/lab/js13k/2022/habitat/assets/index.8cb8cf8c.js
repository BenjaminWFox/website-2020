let t,e,i=()=>{},s={};function h(t,...e){(s[t]||[]).map((t=>t(...e)))}let n={get:(t,e)=>"_proxy"==e||i};function o(){return t}function a(){return e}class r{constructor({spriteSheet:t,frames:e,frameRate:i,loop:s=!0}){this.spriteSheet=t,this.frames=e,this.frameRate=i,this.loop=s;let{width:h,height:n,margin:o=0}=t.frame;this.width=h,this.height=n,this.margin=o,this._f=0,this._a=0}clone(){return new r(this)}reset(){this._f=0,this._a=0}update(t=1/60){if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render({x:t,y:e,width:i=this.width,height:s=this.height,context:h=a()}){let n=this.frames[this._f]/this.spriteSheet._f|0,o=this.frames[this._f]%this.spriteSheet._f|0;h.drawImage(this.spriteSheet.image,o*this.width+(2*o+1)*this.margin,n*this.height+(2*n+1)*this.margin,this.width,this.height,t,e,i,s)}}function d(){return new r(...arguments)}function c(t,e,i){return Math.min(Math.max(t,i),e)}class l{constructor(t=0,e=0,i={}){this.x=t,this.y=e,i._c&&(this.clamp(i._a,i._b,i._d,i._e),this.x=t,this.y=e)}add(t){return new l(this.x+t.x,this.y+t.y,this)}subtract(t){return new l(this.x-t.x,this.y-t.y,this)}scale(t){return new l(this.x*t,this.y*t)}normalize(t=this.length()){return new l(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}clamp(t,e,i,s){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=s}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?c(this._a,this._d,t):t}set y(t){this._y=this._c?c(this._b,this._e,t):t}}function g(){return new l(...arguments)}class u extends class{constructor(t){return this.init(t)}init(t={}){this.position=g(),this.velocity=g(),this.acceleration=g(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let e=this.acceleration;t&&(e=e.scale(t)),this.velocity=this.velocity.add(e);let i=this.velocity;t&&(i=i.scale(t)),this.position=this.position.add(i),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}{init({width:t=0,height:e=0,context:i=a(),render:s=this.draw,update:h=this.advance,children:n=[],anchor:o={x:0,y:0},opacity:r=1,rotation:d=0,scaleX:c=1,scaleY:l=1,...g}={}){this._c=[],super.init({width:t,height:e,context:i,anchor:o,opacity:r,rotation:d,scaleX:c,scaleY:l,...g}),this._di=!0,this._uw(),this.addChild(n),this._rf=s,this._uf=h}update(t){this._uf(t),this.children.map((e=>e.update&&e.update(t)))}render(){let t=this.context;t.save(),(this.x||this.y)&&t.translate(this.x,this.y),this.rotation&&t.rotate(this.rotation),1==this.scaleX&&1==this.scaleY||t.scale(this.scaleX,this.scaleY);let e=-this.width*this.anchor.x,i=-this.height*this.anchor.y;(e||i)&&t.translate(e,i),this.context.globalAlpha=this.opacity,this._rf(),(e||i)&&t.translate(-e,-i),this.children.map((t=>t.render&&t.render())),t.restore()}draw(){}_pc(){this._uw(),this.children.map((t=>t._pc()))}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:e=0,_wo:i=1,_wr:s=0,_wsx:h=1,_wsy:n=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=i*this.opacity,this._wsx=h*this.scaleX,this._wsy=n*this.scaleY,this._wx=this._wx*h,this._wy=this._wy*n,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wr=s+this.rotation;let{x:o,y:a}=((t,e)=>{let i=Math.sin(e),s=Math.cos(e);return{x:t.x*s-t.y*i,y:t.x*i+t.y*s}})({x:this._wx,y:this._wy},s);this._wx=o,this._wy=a,this._wx+=t,this._wy+=e}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}set children(t){this.removeChild(this._c),this.addChild(t)}get children(){return this._c}addChild(...t){t.flat().map((t=>{this.children.push(t),t.parent=this,t._pc=t._pc||i,t._pc()}))}removeChild(...t){t.flat().map((t=>{((t,e)=>{let i=t.indexOf(e);if(-1!=i)return t.splice(i,1),!0})(this.children,t)&&(t.parent=null,t._pc())}))}get opacity(){return this._opa}set opacity(t){this._opa=t,this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}setScale(t,e=t){this.scaleX=t,this.scaleY=e}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}class w extends u{init({image:t,width:e=(t?t.width:void 0),height:i=(t?t.height:void 0),...s}={}){super.init({image:t,width:e,height:i,...s})}get animations(){return this._a}set animations(t){let e,i;for(e in this._a={},t)this._a[e]=t[e].clone(),i=i||this._a[e];this.currentAnimation=i,this.width=this.width||i.width,this.height=this.height||i.height}playAnimation(t){this.currentAnimation=this.animations[t],this.currentAnimation.loop||this.currentAnimation.reset()}advance(t){super.advance(t),this.currentAnimation&&this.currentAnimation.update(t)}draw(){this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color&&(this.context.fillStyle=this.color,this.context.fillRect(0,0,this.width,this.height))}}function p(){return new w(...arguments)}let x=/(\d+)(\w+)/;class f extends u{init({text:t="",textAlign:e="",lineHeight:i=1,font:s=a().font,...h}={}){t=""+t,super.init({text:t,textAlign:e,lineHeight:i,font:s,...h}),this._p()}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=""+t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=(t=>{let e=t.match(x),i=+e[1];return{size:i,unit:e[2],computed:i}})(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;let t=this.context;if(t.font=this.font,!this._s.length&&this._fw){let e=this.text.split(" "),i=0,s=2;for(;s<=e.length;s++){let h=e.slice(i,s).join(" ");t.measureText(h).width>this._fw&&(this._s.push(e.slice(i,s-1).join(" ")),i=s-1)}this._s.push(e.slice(i,s).join(" "))}if(!this._s.length&&this.text.includes("\n")){let e=0;this.text.split("\n").map((i=>{this._s.push(i),e=Math.max(e,t.measureText(i).width)})),this._w=this._fw||e}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,e=this.textAlign,i=this.context;e=this.textAlign||("rtl"==i.canvas.dir?"right":"left"),t="right"==e?this.width:"center"==e?this.width/2|0:0,this._s.map(((s,h)=>{i.textBaseline="top",i.textAlign=e,i.fillStyle=this.color,i.font=this.font,i.fillText(s,t,this._fs*this.lineHeight*h)}))}}function m(){return new f(...arguments)}let y=new WeakMap,A={},_={},E={0:"left",1:"middle",2:"right"};function S(t,e){let{x:i,y:s,width:h,height:n}=(t=>{let{x:e=0,y:i=0,width:s,height:h}=t.world||t;return t.mapwidth&&(s=t.mapwidth,h=t.mapheight),t.anchor&&(e-=s*t.anchor.x,i-=h*t.anchor.y),0>s&&(e+=s,s*=-1),0>h&&(i+=h,h*=-1),{x:e,y:i,width:s,height:h}})(t);do{i-=t.sx||0,s-=t.sy||0}while(t=t.parent);let o=e.x-Math.max(i,Math.min(e.x,i+h)),a=e.y-Math.max(s,Math.min(e.y,s+n));return o*o+a*a<e.radius*e.radius}function C(t,e){return parseFloat(t.getPropertyValue(e))||0}function b(t){let e=null!=t.button?E[t.button]:"left";_[e]=!0,J(t,"onDown")}function v(t){let e=null!=t.button?E[t.button]:"left";_[e]=!1,J(t,"onUp")}function k(t){J(t,"onOver")}function R(t){y.get(t.target)._oo=null,_={}}function B(t,e,i){let s=(t=>{let e=t._lf.length?t._lf:t._cf;for(let i=e.length-1;i>=0;i--){let s=e[i];if(s.collidesWithPointer?s.collidesWithPointer(t):S(s,t))return s}})(t);s&&s[e]&&s[e](i),A[e]&&A[e](i,s),"onOver"==e&&(s!=t._oo&&t._oo&&t._oo.onOut&&t._oo.onOut(i),t._oo=s)}function J(t,e){t.preventDefault();let i=t.target,s=y.get(i),{scaleX:n,scaleY:o,offsetX:a,offsetY:r}=(t=>{let{canvas:e,_s:i}=t,s=e.getBoundingClientRect(),h="none"!=i.transform?i.transform.replace("matrix(","").split(","):[1,1,1,1],n=parseFloat(h[0]),o=parseFloat(h[3]),a=(C(i,"border-left-width")+C(i,"border-right-width"))*n,r=(C(i,"border-top-width")+C(i,"border-bottom-width"))*o,d=(C(i,"padding-left")+C(i,"padding-right"))*n,c=(C(i,"padding-top")+C(i,"padding-bottom"))*o;return{scaleX:(s.width-a-d)/e.width,scaleY:(s.height-r-c)/e.height,offsetX:s.left+(C(i,"border-left-width")+C(i,"padding-left"))*n,offsetY:s.top+(C(i,"border-top-width")+C(i,"padding-top"))*o}})(s);t.type.includes("touch")?(Array.from(t.touches).map((({clientX:t,clientY:e,identifier:i})=>{let h=s.touches[i];h||(h=s.touches[i]={start:{x:(t-a)/n,y:(e-r)/o}},s.touches.length++),h.changed=!1})),Array.from(t.changedTouches).map((({clientX:i,clientY:d,identifier:c})=>{let l=s.touches[c];l.changed=!0,l.x=s.x=(i-a)/n,l.y=s.y=(d-r)/o,B(s,e,t),h("touchChanged",t,s.touches),"onUp"==e&&(delete s.touches[c],s.touches.length--,s.touches.length||h("touchEnd"))}))):(s.x=(t.clientX-a)/n,s.y=(t.clientY-r)/o,B(s,e,t))}function Q({radius:t=5,canvas:e=o()}={}){let i=y.get(e);if(!i){let s=window.getComputedStyle(e);i={x:0,y:0,radius:t,touches:{length:0},canvas:e,_cf:[],_lf:[],_o:[],_oo:null,_s:s},y.set(e,i)}var h;return e.addEventListener("mousedown",b),e.addEventListener("touchstart",b),e.addEventListener("mouseup",v),e.addEventListener("touchend",v),e.addEventListener("touchcancel",v),e.addEventListener("blur",R),e.addEventListener("mousemove",k),e.addEventListener("touchmove",k),i._t||(i._t=!0,h=()=>{i._lf.length=0,i._cf.map((t=>{i._lf.push(t)})),i._cf.length=0},s.tick=s.tick||[],s.tick.push(h)),i}class M extends w{init({padX:t=0,padY:e=0,text:s,disabled:h=!1,onDown:n,onUp:a,...r}={}){super.init({padX:t,padY:e,...r}),this.textNode=m({...s,context:this.context}),this.width||(this.width=this.textNode.width,this.height=this.textNode.height),function(...t){t.flat().map((t=>{let e=t.context?t.context.canvas:o(),i=y.get(e);if(!i)throw new ReferenceError("Pointer events not initialized for the objects canvas");t._r||(t._r=t.render,t.render=function(){i._cf.push(this),this._r()},i._o.push(t))}))}(this),this.addChild(this.textNode),this._od=n||i,this._ou=a||i;let d=this._dn=document.createElement("button");d.style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);",d.textContent=this.text,h&&this.disable(),d.addEventListener("focus",(()=>this.focus())),d.addEventListener("blur",(()=>this.blur())),d.addEventListener("keydown",(t=>this._kd(t))),d.addEventListener("keyup",(t=>this._ku(t))),((t,e)=>{let i=e.parentNode;if(t.setAttribute("data-kontra",""),i){let s=i.querySelector("[data-kontra]:last-of-type")||e;i.insertBefore(t,s.nextSibling)}else document.body.appendChild(t)})(d,this.context.canvas),this._uw(),this._p()}get text(){return this.textNode.text}set text(t){this._d=!0,this.textNode.text=t}destroy(){this._dn.remove()}_p(){this.text!=this._dn.textContent&&(this._dn.textContent=this.text),this.textNode._p();let t=this.textNode.width+2*this.padX,e=this.textNode.height+2*this.padY;this.width=Math.max(t,this.width),this.height=Math.max(e,this.height),this._uw()}render(){this._d&&this._p(),super.render()}enable(){this.disabled=this._dn.disabled=!1,this.onEnable()}disable(){this.disabled=this._dn.disabled=!0,this.onDisable()}focus(){this.disabled||(this.focused=!0,document.activeElement!=this._dn&&this._dn.focus(),this.onFocus())}blur(){this.focused=!1,document.activeElement==this._dn&&this._dn.blur(),this.onBlur()}onOver(){this.disabled||(this.hovered=!0)}onOut(){this.hovered=!1}onEnable(){}onDisable(){}onFocus(){}onBlur(){}onDown(){this.disabled||(this.pressed=!0,this._od())}onUp(){this.disabled||(this.pressed=!1,this._ou())}_kd(t){"Enter"!=t.code&&"Space"!=t.code||this.onDown()}_ku(t){"Enter"!=t.code&&"Space"!=t.code||this.onUp()}}function I(){return new M(...arguments)}function Y(t){let e=t.canvas;t.clearRect(0,0,e.width,e.height)}let L={},T={},F={},K={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"arrowleft",ArrowUp:"arrowup",ArrowRight:"arrowright",ArrowDown:"arrowdown"};function W(t=i,e){t._pd&&e.preventDefault(),t(e)}function U(t){let e=K[t.code],i=L[e];F[e]=!0,W(i,t)}function V(t){let e=K[t.code],i=T[e];F[e]=!1,W(i,t)}function D(){F={}}function O(t){if(+t==t)return t;let e=[],i=t.split(".."),s=+i[0],h=+i[1],n=s;if(h>s)for(;h>=n;n++)e.push(n);else for(;n>=h;n--)e.push(n);return e}class G{constructor({image:t,frameWidth:e,frameHeight:i,frameMargin:s,animations:h}={}){if(!t)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t,this.frame={width:e,height:i,margin:s},this._f=t.width/e|0,this.createAnimations(h)}createAnimations(t){let e,i;for(i in t){let{frames:s,frameRate:h,loop:n}=t[i];if(e=[],null==s)throw Error("Animation "+i+" must provide a frames property");[].concat(s).map((t=>{e=e.concat(O(t))})),this.animations[i]=d({spriteSheet:this,frames:e,frameRate:h,loop:n})}}}let{canvas:P,context:N}=((i,{contextless:s=!1}={})=>{if(t=document.getElementById(i)||i||document.querySelector("canvas"),s&&(t=t||new Proxy({},n)),!t)throw Error("You must provide a canvas element for the game");return e=t.getContext("2d")||new Proxy({},n),e.imageSmoothingEnabled=!1,h("init"),{canvas:t,context:e}})();function j(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function X(t,e,i,s=0){const h=i?.75:0,n=e.x>t.x+t.width+s,o=e.x+e.width<t.x-s+t.width*h;if(n||o)return!1;const a=e.y+e.height<t.y-s,r=e.y>t.y+t.height+s;return!a&&!r}function H(){let t=1600;return window.innerWidth>2*window.innerHeight?console.log("SET WIDTH",t):console.log("OTHER WIDTH",t),P.width=t,P.height=800,{playing:!1,menuing:!0,ending:!1,ratio:1,width:t,height:800,refWidth:80,maxDyUp:-8,maxDyDown:5.992509363295881,maxDyUpChange:Math.abs(-.4),maxDyDownChange:Math.abs(-.8),objectives:[],obstacles:[],distance:1,pickups:0,canvas:P,context:N,baseSpeed:-7,scrollSpeed:-3,font:"32px Arial",maxY:740,minY:20,taper:.05,lastObstacleSpawn:0,canSpawnObstacle:!1}}let Z={...H(),setPlaying(){},setEnding(){},setMenuing(){}};Z={...H(),setPlaying(){console.log("SIP"),Z.playing=!0,Z.ending=!1,Z.menuing=!1},setEnding(){Z.playing=!1,Z.ending=!0,Z.menuing=!1},setMenuing(){Z.playing=!1,Z.ending=!1,Z.menuing=!0}};const q=.25*Z.refWidth,z=q;function $(t,e){return p({x:t,y:e,color:"yellow",width:q,height:z,dy:0,dx:Z.scrollSpeed})}class tt{constructor(t,e,i){this.fn=t,this.yMin=e,this.yMax=i}function(t){const e=t||j(this.yMin,this.yMax);return t=>this.fn(t,e)}}const et=new tt(((t,e)=>e*Z.ratio+100*Z.ratio*Math.sin(1*Math.PI*t+3)),50,750),it=[et,new tt(((t,e)=>e*Z.ratio+150*Z.ratio*Math.sin(1*Math.PI*t+3)),50,750),new tt(((t,e)=>e*Z.ratio-75*Z.ratio*Math.sin(2.5*Math.PI*t*.1+3)),100,700),new tt(((t,e)=>e*Z.ratio+150*Z.ratio*Math.sin(.1*Math.PI*t+3)),170,610),new tt(((t,e)=>e*Z.ratio+300*Z.ratio*Math.sin(.1*Math.PI*t+0)),320,450),new tt(((t,e)=>e*Z.ratio+150*Z.ratio*Math.sin(.04*Math.PI*t+3)),170,740),new tt(((t,e)=>e*Z.ratio+150*Z.ratio*Math.sin(2.952*Math.PI*t+0)),170,610),new tt(((t,e)=>e*Z.ratio+50*Z.ratio*Math.sin(2.94*Math.PI*t+0)),70,710)];function st(t,e){const i=t||1.25*Z.width;let s=it[j(0,it.length-1)].function();for(let h=0;21>h;h+=1){const t=i+2*q*h,n=e?e(h):s(h);Z.objectives.push($(t,n))}}const ht=.25*Z.refWidth,nt=10*ht,ot=Z.height-nt-20*Z.ratio,at=20*Z.ratio;function rt(t,e){return p({x:t,y:e,color:"teal",width:ht,height:nt,dy:0,dx:Z.scrollSpeed})}Q();const dt=I({x:.5*Z.width,y:Z.height/2-50*Z.ratio,anchor:{x:.5,y:.5},text:{text:"Fly!",color:"white",font:Z.font,anchor:{x:.5,y:.5}},onUp(){console.log("OUP"),Z.setPlaying()},render(){this.context.lineWidth=5*Z.ratio,this.context.strokeStyle="red"}}),ct=I({x:.7*Z.width,y:Z.height/2-50*Z.ratio,anchor:{x:.5,y:.5},text:{text:"Buy!",color:"white",font:Z.font,anchor:{x:.5,y:.5}},render(){this.context.lineWidth=5*Z.ratio,this.context.strokeStyle="red",this.context?.strokeRect(100*Z.ratio,60*Z.ratio,this.width-200*Z.ratio||0,this.height-100*Z.ratio||0)}});function lt(){console.log("setting style");let t=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",`${t}px`)}window.addEventListener("resize",(()=>{lt()})),lt(),(()=>{let t;for(t=0;26>t;t++)K["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;10>t;t++)K["Digit"+t]=K["Numpad"+t]=""+t;window.addEventListener("keydown",U),window.addEventListener("keyup",V),window.addEventListener("blur",D)})(),Q();let gt,ut,wt=p({x:300,y:Z.height/2-12.5,width:100,height:25,dy:-20*Z.ratio});const pt=new Image;function xt(t){Object.keys(t).forEach((e=>{wt[e]=t[e],gt&&(gt[e]=t[e]),ut&&("y"===e&&t.y!==Z.maxY&&t.y!==Z.minY?ut.y=t.y-200:ut[e]=t[e])}))}pt.src="data:image/png;base64,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",pt.width=100,pt.height=25,pt.onload=()=>{gt=p({x:300,y:Z.height/2-12.5,image:pt});const t=new Image;t.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAACCAgMAAADnMl4vAAAACVBMVEX///8AAAAaGhoir4xaAAAAAXRSTlMAQObYZgAAAopJREFUeF7t3EGu4zAIANCRd+k9spjeB4Sy8rLqKbiE991U6viUo9/FbAhl/CNTqg9bhHhSFLcmTn69joxT7xyQdQe4xFOdAAA5HGsFAKjhWO2LRdFUBb4Co7GWmKwVnsExWTUYqyVr5Eb8eFaylsmsZCWLkqVFspKVLPwZrGQla43LOr5RTNa536YDzp0HWecG22xXb3C9DbFODQA2njzwEz0Eq4rJJUwbXto92j6rOCwboofNWhxYy7dZwA6LAFssWVLfwyrwflYdZ5EDi16xaJeFsViLWGXnsTAWS/aQKaB9bnVgVTUlV/l5GzW7h81CBxaaLLnM8nwW8DirTgCZPWwWvZfFfiy7x2qy0IGFn8ZCUWLcismKdxEpKEskkkWRWLK53X11vRPZ6i4TV9V14mOJJnpI1kVJbF1Blf7QEt2okD200Wnn3QSqQ67zH9QSwEaF0kNk+mN/73F9qCfkGpCWwP+sWNQei3KdnizsrKj6HQDoaKI8e7Oy+9i/Tg36Qx0twlfQ4UQTvf+Br13r/WK0+AzUEmRU2D1K52+MFhVWA8ESFf5rcxEJUfHzWG2Y1Ty36FC1XRSpFR4sHmax4+RAslCtcBj/kMFSKtynUqvFqh4sHmax5+NaySKtwoFFwyxyOKcK1VpnZYUHi4dZPFFVYJRVwJGF5nBPVjiwaJhFHqyqZHRWfTeL38ZCHmUhO5yvv5h/LWTF1PgtDi8IllIxNcodYLtZT5ZkhcObcEIlWFqFfywKyz+O/9tLFicrz2TOYdEAIFk1Fqsly4iD+65kYQDKwe1gsujzWcmqkwDJShYna+gVhog/1RSTVWN+tIRDfuJlE4kQt2IN+QmojeOxTg1vswB/AfrLE5JRy45GAAAAAElFTkSuQmCC",t.width=600,t.height=130,t.onload=()=>{let e=function(){return new G(...arguments)}({image:t,frameWidth:100,frameHeight:130,animations:{fly:{frames:"0..5",frameRate:30},stop:{frames:"5",frameRate:1}}});ut=p({x:350,y:gt.y,anchor:{x:.5,y:.5},animations:e.animations})}},st(1.5*Z.width,et.function(390)),(()=>{const t=Z.width,e=Z.height/2+nt/2,i=1.35*Z.width,s=Z.height/2-1.5*nt;Z.obstacles.push(rt(t,e)),Z.obstacles.push(rt(i,s))})();const ft=m({text:"",font:`${Z.font}`,color:"white",x:20*Z.ratio,y:20*Z.ratio,textAlign:"left",anchor:{x:0,y:0}});function mt(t){return X(wt,t,!1)}function yt(t){return Z.playing&&X(wt,t,!0,-2*Z.ratio)}let At=function({fps:t=60,clearCanvas:e=!0,update:s=i,render:n,context:o=a(),blur:r=!1}={}){if(!n)throw Error("You must provide a render() function");let d,c,l,g,u,w=0,p=1e3/t,x=1/t,f=e?Y:i,m=!0;function y(){if(c=requestAnimationFrame(y),m&&(l=performance.now(),g=l-d,d=l,1e3>=g)){for(h("tick"),w+=g;w>=p;)u.update(x),w-=p;f(o),u.render()}}return r||(window.addEventListener("focus",(()=>{m=!0})),window.addEventListener("blur",(()=>{m=!1}))),u={update:s,render:n,isStopped:!0,start(){d=performance.now(),this.isStopped=!1,requestAnimationFrame(y)},stop(){this.isStopped=!0,cancelAnimationFrame(c)},_frame:y,set _last(t){d=t}},u}({update(){Z.playing?(Z.scrollSpeed=Z.baseSpeed+Z.baseSpeed*(Z.distance/1e4),Z.distance+=1):Z.ending&&(0>Z.scrollSpeed&&(Z.scrollSpeed=Math.min(Z.scrollSpeed+Z.taper,0)),wt.dx>0&&xt({dx:Math.max(wt.dx-Z.taper,0)})),(Z.playing||Z.ending)&&((()=>{for(let t=0;t<Z.objectives.length;t+=1){const e=Z.objectives[t];e.x<0-e.width?(Z.objectives.splice(t,1),t-=1):mt(e)?(Z.pickups+=1,Z.objectives.splice(t,1),t-=1):(e.dx!==Z.scrollSpeed&&(e.dx=Z.scrollSpeed),e.update())}Z.objectives.length&&Z.objectives.at(-1).x<Z.width&&st()})(),(()=>{for(let t=0;t<Z.obstacles.length;t+=1){const e=Z.obstacles[t];e.x<0-e.width?(Z.obstacles.splice(t,1),t-=1):(yt(e)&&(Z.setEnding(),xt({dx:Z.scrollSpeed}),ut&&ut.playAnimation("stop")),e.dx!==Z.scrollSpeed&&(e.dx=Z.scrollSpeed),e.update())}Z.distance-Z.lastObstacleSpawn>150&&Z.distance%50==0&&(Z.canSpawnObstacle=!0),Z.canSpawnObstacle&&30===j(1,30)&&(Z.canSpawnObstacle=!1,Z.lastObstacleSpawn=Z.distance,(()=>{let t=rt(Z.width+4*ht*Z.ratio,j(at,ot));Z.objectives.forEach((e=>{if(X(e,t,!1,.5*e.width*Z.ratio))for(;X(e,t,!1,.5*e.width*Z.ratio);)t.y-=20*Z.ratio,t.y<at&&(t.y=ot)})),Z.obstacles.push(t)})())})(),(F.space||_.left||((t=o())=>y.get(t))().touches.length>0)&&wt.dy>Z.maxDyUp&&(Z.playing||wt.dx>2*Z.ratio)?xt({dy:wt.dy-Z.maxDyUpChange}):wt.dy<Z.maxDyDown&&xt({dy:wt.dy+Z.maxDyDownChange}),wt.y>Z.maxY?xt({y:Z.maxY,dy:0}):wt.y<Z.minY&&xt({y:Z.minY,dy:0}),wt.update(),gt&&gt.update(),ut&&ut.update()),Z.menuing},render(){Z.context.fillStyle="blue",Z.context.fillRect(0,0,Z.canvas.width,Z.canvas.height),wt.render(),gt&&gt.render(),ut&&ut.render(),Z.objectives.forEach((t=>{t.render()})),Z.obstacles.forEach((t=>{t.render()})),ft.text=`Distance: ${Z.distance} Pickups: ${Z.pickups}`,ft.render(),Z.menuing&&(dt.render(),ct.render())}});Z.setPlaying(),At.start();
