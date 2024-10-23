// ==UserScript==
// @name        Prevent Tab Inactivity Detection
// @name:vi     Ngăn Chặn Phát Hiện Tab Không Hoạt Động
// @namespace   PreventPageVisibilityAuto
// @match       *://*/*
// @run-at      document-start
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @version     1.2
// @author      Yuusei
// @description Prevents websites from detecting when you switch tabs or minimize the window.
// @description:vi Ngăn chặn các trang web phát hiện khi bạn chuyển tab hoặc thu nhỏ cửa sổ.
// @downloadURL https://github.com/RenjiYuusei/UserJs/raw/main/userjs/PreventPageVisibilityAuto.user.js
// @updateURL https://github.com/RenjiYuusei/UserJs/raw/main/userjs/PreventPageVisibilityAuto.meta.js
// @lastModified 2024-10-23T13:47:28Z
// ==/UserScript==
!function(){"use strict";const t="PreventPageVisibilityAuto",e="none",i="autoinject_visibility_prevention",o=["visibilitychange","webkitvisibilitychange","mozvisibilitychange","hasFocus","blur","focus","mouseleave","mouseout","pagehide"],s=[{obj:document,prop:"visibilityState",value:"visible"},{obj:document,prop:"hidden",value:!1},{obj:document,prop:"mozHidden",value:!1},{obj:document,prop:"webkitHidden",value:!1},{obj:document,prop:"webkitVisibilityState",value:"visible"}];class a{constructor(){this.injectedStatus=!1,this.hostArray=this.loadHostArray(),this.currentValue=this.loadCurrentValue()}log(...t){}loadHostArray(){try{return JSON.parse(GM_getValue(i,"[]"))}catch(t){return this.log("Error loading host array:",t),[]}}loadCurrentValue(){return GM_getValue(`value_${t}_${document.domain}`,e)}saveHostArray(){GM_setValue(i,JSON.stringify(this.hostArray))}inject(){this.injectedStatus?this.log("Already injected"):(o.forEach((t=>{[document,window].forEach((e=>{e.addEventListener(t,this.eventBlocker.bind(this),!0)}))})),s.forEach((({obj:t,prop:e,value:i})=>{try{Object.defineProperty(t,e,{value:i,configurable:!0,enumerable:!0})}catch(t){this.log(`Failed to override ${e}:`,t)}})),document.hasFocus=()=>!0,document.onvisibilitychange=null,this.injectedStatus=!0,this.log("Injection complete"))}eventBlocker(t){return t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),!0}addHost(){const t=location.hostname;this.hostArray.includes(t)||(this.hostArray.push(t),this.saveHostArray(),this.log(`Added ${t} to auto-inject list`),this.injectedStatus||this.inject())}removeHost(){const t=location.hostname,e=this.hostArray.indexOf(t);e>-1&&(this.hostArray.splice(e,1),this.saveHostArray(),this.log(`Removed ${t} from auto-inject list`))}setValue(){const e=window.prompt(`Enter ${t} value for ${document.domain}`,this.currentValue);if(null!==e){const i=parseInt(e);isNaN(i)||(GM_setValue(`value_${t}_${document.domain}`,i),this.currentValue=i,this.log(`Value updated to: ${i}`))}}adjustValue(e){if("number"==typeof this.currentValue){const i=this.currentValue+e;GM_setValue(`value_${t}_${document.domain}`,i),this.currentValue=i,this.log(`Value adjusted to: ${i}`)}}initializeMenuCommands(){try{"number"==typeof this.currentValue&&(GM_registerMenuCommand("Increase Value (+)",(()=>this.adjustValue(1))),GM_registerMenuCommand("Decrease Value (-)",(()=>this.adjustValue(-1)))),GM_registerMenuCommand(`Set ${t} Value`,(()=>this.setValue())),this.hostArray.includes(location.hostname)?(this.inject(),GM_registerMenuCommand(`Stop Auto-Injecting on ${location.hostname}`,(()=>this.removeHost()))):(GM_registerMenuCommand(`Inject ${t}`,(()=>this.inject())),GM_registerMenuCommand(`Auto-Inject on ${location.hostname}`,(()=>this.addHost())))}catch(t){this.log("Error setting up menu commands:",t)}}}try{(new a).initializeMenuCommands()}catch(t){}}();
