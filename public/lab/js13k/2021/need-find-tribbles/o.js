!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"u",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.u)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.u?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=0)}({0:function(e,t,n){e.exports=n("tjUo")},FRuT:function(e,t,n){"use strict";n.r(t);var r=n("JPst"),o=n.n(r)()(!1);o.push([e.i,'html{box-sizing:border-box;font-size:16px}*,*:before,*:after{box-sizing:inherit}body{font-size:14px;font-family:Rockwell,Consolas,Georgia,Times,"Times New Roman",serif;transition:opacity 1s}body:not(.loading){opacity:1 !important}body,h1,h2,h3,h4,h5,h6,p,ol,ul,a{margin:0;padding:0;font-weight:normal;color:#fff}a:hover,button.textlike:hover{background-color:transparent;color:#ddd}sub{font-size:.875rem;vertical-align:baseline}ol,ul{list-style:none}img{max-width:100%;height:auto}@keyframes glowing{0%{background-color:#d23cff;box-shadow:0 0 2px #d036ff}50%{background-color:#9215b8;box-shadow:0 0 15px #ac1cd8}100%{background-color:#d23cff;box-shadow:0 0 2px #d036ff}}button{border:1px #fff solid;color:#fff;background:transparent;padding:10px 12px;cursor:pointer;font-size:14px;font-family:inherit}button.textlike{border:none;padding:0;margin:none;display:inline-block;text-decoration:underline}button:hover{background-color:#333}button:disabled,button.important:disabled{animation:none;cursor:none;opacity:.5}button.important{font-weight:bold;animation:glowing 2s ease-in-out infinite}button.inline{margin:0px 4px}.nauth{display:unset}.yauth,.yauthB{display:none}.authd .yauth{display:unset}.authd .yauthB{display:block}.authd .nauth{display:none}#cvWrap.overlaid #presignin{display:none}body.authd #presignin{display:none}.info>*{margin-top:15px}.smtext{font-size:.75rem}.split{display:flex;justify-content:space-between}#wrapper,#top{display:flex;flex-direction:row}.fetching #loading{opacity:1;transition:none}#loading{width:64px;height:64px;position:absolute;top:308px;opacity:0;transition:opacity .5s}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}#spinner{animation:spin 2s linear infinite}#display{width:100%;min-width:300px;height:300px;border:1px solid;margin:0 auto;display:flex;justify-content:center;align-items:center;border:1px #000 solid}@keyframes pulse{0%{background:#222}50%{background:#000}100%{background:#222}}.dClear{width:100%;height:100%;animation:pulse .5s ease-in-out infinite}.dText{padding:50px}.tabs{display:flex}.tabs>div{width:50%;text-align:center;border:1px #000 solid;padding:15px;background-color:#070707;cursor:pointer}.tabs>div.sel{border-bottom:none;background-color:#111}.sI .tgc{display:none}.tG .sic,.tG #sicContent{display:none !important}#tabContent{padding:10px;border:1px #000 solid;border-top:none;max-height:400px;overflow-y:auto}#more{padding:10px;border:1px #000 solid;margin-top:20px}#gC>ul>li>ul{margin-bottom:20px}#gC>ul>li>ul>li{padding:5px;margin:5px;border:1px #000 solid}#gC label{margin-left:15px}#details{margin-top:15px}#top,#bottom{width:100%}#bottom{border-top:1px solid #333}#cvWrap{position:relative;overflow:auto;border-right:1px solid #333;max-height:100vh;padding:10px}#cvWrap.overlaid{overflow-x:hidden}#cvWrap.overlaid #overlay,body:not(.authd) #overlay{display:flex}#overlay{position:absolute;right:0;left:0;top:0;bottom:0;min-height:1025px;background-color:rgba(90,90,90,.75);display:none;justify-content:center}#about,#foundTribble,#backTribbles{display:none}.showAbout #about,.showFoundTribble #foundTribble,.showBackTribbles #backTribbles{display:unset}.showFoundTribble #close{display:none}#content{position:relative;top:20px;max-width:60%;max-height:50%}@media(min-width: 1025px){#content{top:50%;transform:translateY(-50%)}}#content h2{font-size:2rem}#overlay .info{max-width:275px;min-width:150px;margin:0 auto}#canvas{background-color:#000}#panel{position:relative;width:350px;overflow:hidden;max-height:1025px;padding:20px 10px;overflow-y:auto;min-width:350px}.flex{flex-grow:1}#tid{font-weight:600;font-style:italic;display:inline-block}#claimGroup{display:flex;justify-content:space-between}#stuffed,#gear,#trib,#other,#space{display:none}#details.tribble #trib{display:unset}#details.gear #gear{display:unset}#details.other #other{display:unset}#details.space #space{display:unset}#details.stuffed #stuffed{display:unset}#details:not(.empty) #nomatch{display:none}@media only screen and (min-device-width: 375px)and (max-device-width: 1000px)and (orientation: landscape){#panel{height:90vh}}',""]),t.default=o},JPst:function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,u=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(u),"/*# ".concat(s," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([o]).join("\n")}var a,u,s;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var u=0;u<e.length;u++){var s=[].concat(e[u]);r&&o[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),t.push(s))}},t}},LboF:function(e,t,n){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function u(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function s(e,t){for(var n={},r=[],o=0;o<e.length;o++){var i=e[o],s=t.base?i[0]+t.base:i[0],c=n[s]||0,l="".concat(s," ").concat(c);n[s]=c+1;var f=u(l),d={css:i[1],media:i[2],sourceMap:i[3]};-1!==f?(a[f].references++,a[f].updater(d)):a.push({identifier:l,updater:m(d,t),references:1}),r.push(l)}return r}function c(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=n.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var l,f=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function d(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=f(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function b(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var p=null,h=0;function m(e,t){var n,r,o;if(t.singleton){var i=h++;n=p||(p=c(t)),r=d.bind(null,n,i,!1),o=d.bind(null,n,i,!0)}else n=c(t),r=b.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=s(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=u(n[r]);a[o].references--}for(var i=s(e,t),c=0;c<n.length;c++){var l=u(n[c]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}n=i}}}},"q+Kr":function(e,t,n){var r=n("LboF"),o=n("FRuT");"string"==typeof(o=o.u?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},tjUo:function(e,t,n){"use strict";n.r(t);n("q+Kr");var r={TRIBBLE_PREFIX:"Tribble_R1_",TRIBBLE_SUFFIX:".png",TRIBBLE_PREVIEW_URL:"https://js13k-2021-tribbles.s3.us-west-2.amazonaws.com/",DEFAULT_OWNER:"need-find-tribbles-js13k.testnet",GEAR:{"eyes-bandit":!1,"eyes-Eyes_Cross":!1,"eyes-Eyes_Down":!1,"eyes-Eyes_Up":!1,"eyes-Glasses_Yellow":!1,"eyes-Green_Glasses":!1,"eyes-Pink_Glasses":!1,"face-Beard":!1,"face-Beauty_Mark":!1,"face-Big_Nose":!1,"face-Flower":!1,"face-Freckles":!1,"face-Gold_Ring":!1,"face-Silver_Ring":!1,"face-Small_Nose":!1,"feet-Boots":!1,"feet-Sandals":!1,"feet-Skateboard":!1,"feet-Skates":!1,"feet-Slippers":!1,"hair-Blonde":!1,"hair-Blue_Hat":!1,"hair-Brown":!1,"hair-Durag":!1,"hair-Headband":!1,"hair-Orange_Punk":!1,"hair-Pink_Punk":!1,"hair-Red_Hat":!1,"mouth-Bubblegum":!1,"mouth-Cigar":!1,"mouth-Cigarette":!1,"mouth-Pursed_Lips":!1,"mouth-Small_Smile":!1,"mouth-Smirk":!1,"mouth-Tongue_Out":!1,"stuffed-tribble":!1}},o=r;function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u={searchContent:{displayContent:"Nothing here but empty space, for now...",displayImage:""},gearContent:{tribble:new Image,drawn:{hair:"",eyes:"",face:"",mouth:"",feet:""}}};u.gearContent.tribble.src="https://js13k-2021-tribbles-gear.s3.us-west-2.amazonaws.com/stuffed-tribble.png";var s=s||function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},u),c=s;function l(e,t,n,r,o,i,a){try{var u=e[i](a),s=u.value}catch(e){return void n(e)}u.done?t(s):Promise.resolve(s).then(r,o)}function f(e){return function(e){if(Array.isArray(e))return p(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||b(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}(e,t)||b(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var h,m,v,g=document.getElementById.bind(document),y=function(e){var t=d(e.split("-"),2),n=t[0],r=t[1],o=r.split("_").join(" ");return{category:n,id:r,friendly:o}},w=function(e,t){var n=y(e),r=n.category,o=(n.id,n.friendly);g("gearType").innerHTML="You found ".concat(o,". It's for the ").concat(r,"!"),g("gearExtra").innerHTML=t?"Something new and fun! Your stuffed tribble will love it!":"You already have one of these. Oh well, maybe someone else will find it someday!"},x=function(e,t){if("None"===e)c.gearContent.drawn[t]="",k();else{var n=new Image;n.src=C("".concat(t,"-").concat(e)),c.gearContent.drawn[t]=n,n.addEventListener("load",k)}},k=function(){var e=document.createElement("canvas"),t=e.getContext("2d");e.width=240,e.height=240,t.clearRect(0,0,e.width,e.height),t.drawImage(c.gearContent.tribble,0,0),Object.keys(c.gearContent.drawn).forEach((function(e){c.gearContent.drawn[e]&&t.drawImage(c.gearContent.drawn[e],0,0)})),g("display").innerHTML="",g("display").appendChild(e)},j=function(){Object.entries(o.GEAR).forEach((function(e){var t=d(e,2),n=t[0];if(t[1]&&"stuffed-tribble"!==n){var r=y(n),o=r.category,i=r.id,a=r.friendly;if(!g(i)){var u=function(e,t,n){var r=document.createElement("li"),o=document.createElement("input"),i=document.createElement("label");return o.type="radio",o.id=e,o.onclick=function(){x(this.id,this.parentNode.parentNode.id)},o.name=n,i.htmlFor=e,i.innerHTML=t,r.appendChild(o),r.appendChild(i),r}(i,a,o);g(o).appendChild(u)}}}))},T=function(e,t){g(e).className=t},O=function(e,t,n){var r;e?g(t).classList.add(n):"string"!=typeof n?(r=g(t).classList).remove.apply(r,f(n)):g(t).classList.remove(n)},R=function(e){O(!1,"sI","sel"),O(!1,"tabContent","sI"),O(!1,"tG","sel"),O(!1,"tabContent","tG"),O(!0,e,"sel"),O(!0,"tabContent",e),"tG"===e&&o.GEAR["stuffed-tribble"]&&k(),"sI"===e&&S(c.searchContent.type,c.searchContent.displayImage)},_=function(e,t){T("details",e),S(e,t)},S=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=g("display");switch(e){default:case"empty":c.searchContent.displayContent='<div class="dText">Nothing here but empty space, for now...</div>';break;case"gear":c.searchContent.displayContent='<img src="'.concat(t,'" />'),c.searchContent.displayImage=t;break;case"other":var r='<img src="'.concat(t,'" style="max-width: 260px; max-height: 260px;" />')||!1;c.searchContent.displayContent='<div class="dText">'.concat(r,"</div>"),c.searchContent.displayImage=t;break;case"clear":c.searchContent.displayContent='<div class="dClear dText"></div>';break;case"tribble":c.searchContent.displayContent='<img src="'.concat(t,'" />'),c.searchContent.displayImage=t;break;case"space":c.searchContent.displayContent='<img src="'.concat(t,'" style="max-width: 260px; max-height: 260px;" />'),c.searchContent.displayImage=t;break;case"stuffed":c.searchContent.displayContent='<img src="'.concat(t,'" />'),c.searchContent.displayImage=t}c.searchContent.type=e,n.innerHTML=c.searchContent.displayContent},I=function(e){g("cAcct").innerHTML="Account: ".concat(e),O(!0,"b","authd"),A(!1)},C=function(e){return"https://js13k-2021-tribbles-gear.s3.us-west-2.amazonaws.com/".concat(e,".png")},B=function(){var e,t=(e=regeneratorRuntime.mark((function e(t,n){var r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.metadata,o="http://ipfs.io/".concat(r.reference.replace("://","/")),"need-find-tribbles-js13k.testnet"===t.owner_id?(g("claim").disabled=!1,g("ownership").innerHTML="currently unowned!"):(g("claim").disabled=!0,g("ownership").innerHTML="owned by ".concat(t.owner_id)),g("tid").innerHTML=t.token_id,g("ipfsmeta").href=o;case 6:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function a(e){l(i,r,o,a,u,"next",e)}function u(e){l(i,r,o,a,u,"throw",e)}a(void 0)}))});return function(e,n){return t.apply(this,arguments)}}(),P=function(e){O(e,"panel","fetching")},A=function(e){e?O(!0,"cvWrap","overlaid"):T("cvWrap","")},E=function(){T("cvWrap","showAbout overlaid")},U=function(){T("cvWrap","showBackTribbles overlaid")};function F(e,t,n,r,o,i,a){try{var u=e[i](a),s=u.value}catch(e){return void n(e)}u.done?t(s):Promise.resolve(s).then(r,o)}function G(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function a(e){F(i,r,o,a,u,"next",e)}function u(e){F(i,r,o,a,u,"throw",e)}a(void 0)}))}}var M=function(){v.requestSignIn("need-find-tribbles-js13k.testnet","Need to Find the Tribbles!")},N=function(){v.signOut(),window.location.reload()};function L(){return W.apply(this,arguments)}function W(){return(W=G(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=g("tid").innerHTML,P(!0),g("claim").disabled=!0,e.next=6,fetch("https://benjaminwfox.com/api/tribble/transfer",{method:"POST",body:JSON.stringify({token_id:t,new_token_owner_id:m.accountId}),headers:{"Content-Type":"application/json"}});case 6:return n=e.sent,e.next=9,n.json();case 9:"Success"===e.sent.status!==-1?g("ownership").innerHTML="owned by ".concat(m.accountId):g("claim").disabled=!1,P(!1);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function z(e){return Y.apply(this,arguments)}function Y(){return(Y=G(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.get_token({token_id:t});case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(){return q.apply(this,arguments)}function q(){return(q=G(regeneratorRuntime.mark((function e(){var t,n,r,o,i,a,u,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.nearApi,n=t.keyStores,r=t.connect,o=t.WalletConnection,i=new n.BrowserLocalStorageKeyStore,a={networkId:"testnet",keyStore:i,nodeUrl:"https://rpc.testnet.near.org",walletUrl:"https://wallet.testnet.near.org",helperUrl:"https://helper.testnet.near.org",explorerUrl:"https://explorer.testnet.near.org"},e.next=6,r(a);case 6:if(u=e.sent,!(v=new o(u)).isSignedIn()){e.next=22;break}return s=v.getAccountId(),I(s),e.next=14,u.account(v._authData.accountId);case 14:return m=e.sent,e.next=17,m.state();case 17:e.sent,h=new t.Contract(m,"need-find-tribbles-js13k.testnet",{viewMethods:["get_token"],changeMethods:["nft_reassign_ownership"],sender:m}),e.next=23;break;case 22:O(!1,"b","authd");case 23:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(e,t,n,r,o,i,a){try{var u=e[i](a),s=u.value}catch(e){return void n(e)}u.done?t(s):Promise.resolve(s).then(r,o)}function H(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function a(e){D(i,r,o,a,u,"next",e)}function u(e){D(i,r,o,a,u,"throw",e)}a(void 0)}))}}var K=[],X=new alea("hello."),V=[0,50,100,150,200,225,250],$=1e3-(V.length-1),Q={},Z={},ee={},te={};function ne(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var re,oe,ie={getRandomKeyPoint:function(){var e=Object.keys(Q);return e[ne(0,e.length)]},getTribbleId:function(e){return"".concat(o.TRIBBLE_PREFIX).concat(e)},getTribblePreview:function(e){return"".concat(o.TRIBBLE_PREVIEW_URL).concat(o.TRIBBLE_PREFIX).concat(e).concat(o.TRIBBLE_SUFFIX)},showTribble:(oe=H(regeneratorRuntime.mark((function e(t){var n,r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=ie.getTribbleId(t),r=ie.getTribblePreview(t),e.next=4,z(n);case 4:if(!(o=e.sent)){e.next=11;break}return T("cvWrap","showFoundTribble overlaid"),_("tribble",r),B(o),e.abrupt("return",!0);case 11:return e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e)}))),function(e){return oe.apply(this,arguments)}),getRandomGear:function(){var e=Object.keys(o.GEAR),t=e[ne(0,e.length-2)];_("gear",C(t)),o.GEAR[t]?w(t,!1):(window.localStorage.setItem(t,"true"),o.GEAR[t]=!0,w(t,!0))},giveStuffedTribble:function(){_("stuffed",C("stuffed-tribble")),o.GEAR["stuffed-tribble"]=!0,window.localStorage.setItem("stuffed-tribble","true")},checkClickedPixel:(re=H(regeneratorRuntime.mark((function e(t){var n,r,i,a,u,s,c,l,f,d,b,p,h,m,v,y,w,x,k,T,O;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.x,t.y,n=t.key,P(!0),R("sI"),o.GEAR["stuffed-tribble"]){e.next=7;break}ie.giveStuffedTribble(),e.next=72;break;case 7:if(!Z[n]){e.next=13;break}ie.getRandomGear(),j(),e.next=72;break;case 13:if(!ee[n]){e.next=38;break}return r=ne(0,670),i="",e.prev=17,e.next=20,fetch("https://rickandmortyapi.com/api/character/".concat(r));case 20:return a=e.sent,e.next=23,a.json();case 23:u=e.sent,s=u.name,c=u.location,l=u.species,f=u.origin,d=u.image,i="You found ".concat(s," the ").concat(l,".<br/><br/>"),i+=f.name===c.name?"Lives on ".concat(null==f?void 0:f.name,"."):"Originally from ".concat(null==f?void 0:f.name,", now on ").concat(null==c?void 0:c.name,"."),g("otherText").innerHTML=i,_("other",d),e.next=36;break;case 31:e.prev=31,e.t0=e.catch(17),g("otherText").innerHTML="Who can say, but what it once was it is now not and never will be again.",_("other",null);case 36:e.next=72;break;case 38:if(!te[n]){e.next=67;break}return b=["planet","nebula","galaxy","beautiful"],p=ne(0,3),h=ne(1,3),e.next=45,fetch("https://images-api.nasa.gov/search?media_type=image&q=".concat(b[p],"&page=").concat(h));case 45:return m=e.sent,e.prev=47,e.next=50,m.json();case 50:v=e.sent,y=ne(0,v.collection.items.length-1),w=v.collection.items[y],x=w.links[0].href,k=w.data[0],T=k.title,O=k.nasa_id,_("space",x),g("spaceText").innerHTML="".concat(T,'.<br/><br/><a href="https://images-assets.nasa.gov/image/').concat(O,'/metadata.json" target="_blank">Read more from NASA<a/>!'),e.next=65;break;case 61:e.prev=61,e.t1=e.catch(47),_("empty");case 65:e.next=72;break;case 67:return e.next=70,ie.showTribble(n);case 70:e.sent||_("empty");case 72:P(!1);case 74:case"end":return e.stop()}}),e,null,[[17,31],[47,61]])}))),function(e){return re.apply(this,arguments)})},ae=function(e,t){var n,r,o,i=X(),a=parseInt(1e3*i,10);return r=e,o=t,(n=a)>600&&n<700&&(Z["".concat(r,"-").concat(o)]=!0),n>800&&n<900&&(ee["".concat(r,"-").concat(o)]=!0),n>200&&n<500&&(te["".concat(r,"-").concat(o)]=!0),a<$?V[0]:V[1e3-a]},ue=function(e){for(var t=0;t<1e3;t+=1){for(var n=[],r=0;r<1e3;r+=1){var o=ae(r,t);n.push(o),e.fillStyle="rgb(".concat(o,", ").concat(o,", ").concat(o,")"),e.fillRect(r,t,1,1)}K.push(n)}Object.keys(Q).join(",")};function se(e,t){var n=e.getBoundingClientRect(),r=Math.floor(t.clientX-n.left),o=Math.floor(t.clientY-n.top);return{x:r,y:o,key:"".concat(r,"-").concat(o)}}window.onload=H(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object.keys(o.GEAR).forEach((function(e){window.localStorage.getItem(e)&&(o.GEAR[e]=!0)})),O(!1,"b","loading"),j(),_("empty"),e.next=7,J();case 7:t=document.getElementById("canvas"),n=t.getContext("2d"),window.fn={signIn:M,signOut:N,claimNFT:L,closeOverlay:function(){return A(!1)},setTab:R,setGearImage:x,showAbout:E,showBackTribbles:U},t.width=1e3,t.height=1e3,t.addEventListener("mousedown",(function(e){var n=se(t,e);ie.checkClickedPixel(n)})),ue(n);case 14:case"end":return e.stop()}}),e)})))}});