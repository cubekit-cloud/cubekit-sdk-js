!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("CubekitSdkJs",[],t):"object"==typeof exports?exports.CubekitSdkJs=t():e.CubekitSdkJs=t()}("undefinded"==typeof self?this:self,(()=>(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.d(t,{default:()=>at});var n,r,o,i,s,a,c,u,l,f,d,p={};function h(e,t){return function(){return e.apply(t,arguments)}}e.r(p),e.d(p,{hasBrowserEnv:()=>pe,hasStandardBrowserEnv:()=>he,hasStandardBrowserWebWorkerEnv:()=>ye}),function(e){e.EQUAL="=",e.INEQUAL="!=",e.LIKE="like",e.ILIKE="ilike",e.MORE=">",e.MORE_OR_EQUAL=">=",e.LESS="<",e.LESS_OR_EQUAL="<="}(n||(n={})),function(e){e.POINTER="pointer",e.SCALAR="scalar"}(r||(r={})),function(e){e.AND="and",e.OR="or"}(o||(o={})),function(e){e.GROUP="group",e.SINGLE="single"}(i||(i={})),function(e){e.LEFT="left",e.RIGHT="right",e.FULL="full",e.INNER="inner"}(s||(s={})),function(e){e.ASC="asc",e.DESC="DESC"}(a||(a={})),function(e){e.FIRST="first",e.LAST="last"}(c||(c={})),function(e){e.RESOURCE="resource",e.EXPORT="export"}(u||(u={})),function(e){e.XLSX="xlsx",e.CSV="csv"}(l||(l={})),function(e){e.UTF_8="utf-8",e.WINDOWS_1251="windows-1251"}(f||(f={})),function(e){e.SEARCH="search",e.GET_BY_ID="get_by_id",e.CREATE="create",e.UPDATE="update",e.DELETE="delete"}(d||(d={}));const{toString:m}=Object.prototype,{getPrototypeOf:y}=Object,b=(g=Object.create(null),e=>{const t=m.call(e);return g[t]||(g[t]=t.slice(8,-1).toLowerCase())});var g;const E=e=>(e=e.toLowerCase(),t=>b(t)===e),w=e=>t=>typeof t===e,{isArray:O}=Array,S=w("undefined"),R=E("ArrayBuffer"),A=w("string"),T=w("function"),v=w("number"),j=e=>null!==e&&"object"==typeof e,x=e=>{if("object"!==b(e))return!1;const t=y(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},C=E("Date"),P=E("File"),N=E("Blob"),_=E("FileList"),L=E("URLSearchParams");function U(e,t,{allOwnKeys:n=!1}={}){if(null==e)return;let r,o;if("object"!=typeof e&&(e=[e]),O(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let s;for(r=0;r<i;r++)s=o[r],t.call(null,e[s],s,e)}}function k(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,o=n.length;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const F="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,D=e=>!S(e)&&e!==F,B=(I="undefined"!=typeof Uint8Array&&y(Uint8Array),e=>I&&e instanceof I);var I;const q=E("HTMLFormElement"),M=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),z=E("RegExp"),H=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};U(n,((n,o)=>{let i;!1!==(i=t(n,o,e))&&(r[o]=i||n)})),Object.defineProperties(e,r)},J="abcdefghijklmnopqrstuvwxyz",W="0123456789",K={DIGIT:W,ALPHA:J,ALPHA_DIGIT:J+J.toUpperCase()+W},V=E("AsyncFunction"),G={isArray:O,isArrayBuffer:R,isBuffer:function(e){return null!==e&&!S(e)&&null!==e.constructor&&!S(e.constructor)&&T(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"==typeof FormData&&e instanceof FormData||T(e.append)&&("formdata"===(t=b(e))||"object"===t&&T(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&R(e.buffer),t},isString:A,isNumber:v,isBoolean:e=>!0===e||!1===e,isObject:j,isPlainObject:x,isUndefined:S,isDate:C,isFile:P,isBlob:N,isRegExp:z,isFunction:T,isStream:e=>j(e)&&T(e.pipe),isURLSearchParams:L,isTypedArray:B,isFileList:_,forEach:U,merge:function e(){const{caseless:t}=D(this)&&this||{},n={},r=(r,o)=>{const i=t&&k(n,o)||o;x(n[i])&&x(r)?n[i]=e(n[i],r):x(r)?n[i]=e({},r):O(r)?n[i]=r.slice():n[i]=r};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&U(arguments[e],r);return n},extend:(e,t,n,{allOwnKeys:r}={})=>(U(t,((t,r)=>{n&&T(t)?e[r]=h(t,n):e[r]=t}),{allOwnKeys:r}),e),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let o,i,s;const a={};if(t=t||{},null==e)return t;do{for(o=Object.getOwnPropertyNames(e),i=o.length;i-- >0;)s=o[i],r&&!r(s,e,t)||a[s]||(t[s]=e[s],a[s]=!0);e=!1!==n&&y(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:b,kindOfTest:E,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(O(e))return e;let t=e.length;if(!v(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:q,hasOwnProperty:M,hasOwnProp:M,reduceDescriptors:H,freezeMethods:e=>{H(e,((t,n)=>{if(T(e)&&-1!==["arguments","caller","callee"].indexOf(n))return!1;const r=e[n];T(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}))}))},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0}))};return O(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>(e=+e,Number.isFinite(e)?e:t),findKey:k,global:F,isContextDefined:D,ALPHABET:K,generateString:(e=16,t=K.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n},isSpecCompliantForm:function(e){return!!(e&&T(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(j(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const o=O(e)?[]:{};return U(e,((e,t)=>{const i=n(e,r+1);!S(i)&&(o[t]=i)})),t[r]=void 0,o}}return e};return n(e,0)},isAsyncFn:V,isThenable:e=>e&&(j(e)||T(e))&&T(e.then)&&T(e.catch)};function X(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}G.inherits(X,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:G.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const $=X.prototype,Q={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{Q[e]={value:e}})),Object.defineProperties(X,Q),Object.defineProperty($,"isAxiosError",{value:!0}),X.from=(e,t,n,r,o,i)=>{const s=Object.create($);return G.toFlatObject(e,s,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),X.call(s,e.message,t,n,r,o),s.cause=e,s.name=e.name,i&&Object.assign(s,i),s};const Y=X;function Z(e){return G.isPlainObject(e)||G.isArray(e)}function ee(e){return G.endsWith(e,"[]")?e.slice(0,-2):e}function te(e,t,n){return e?e.concat(t).map((function(e,t){return e=ee(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}const ne=G.toFlatObject(G,{},null,(function(e){return/^is[A-Z]/.test(e)})),re=function(e,t,n){if(!G.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(n=G.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!G.isUndefined(t[e])}))).metaTokens,o=n.visitor||u,i=n.dots,s=n.indexes,a=(n.Blob||"undefined"!=typeof Blob&&Blob)&&G.isSpecCompliantForm(t);if(!G.isFunction(o))throw new TypeError("visitor must be a function");function c(e){if(null===e)return"";if(G.isDate(e))return e.toISOString();if(!a&&G.isBlob(e))throw new Y("Blob is not supported. Use a Buffer instead.");return G.isArrayBuffer(e)||G.isTypedArray(e)?a&&"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}function u(e,n,o){let a=e;if(e&&!o&&"object"==typeof e)if(G.endsWith(n,"{}"))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(G.isArray(e)&&function(e){return G.isArray(e)&&!e.some(Z)}(e)||(G.isFileList(e)||G.endsWith(n,"[]"))&&(a=G.toArray(e)))return n=ee(n),a.forEach((function(e,r){!G.isUndefined(e)&&null!==e&&t.append(!0===s?te([n],r,i):null===s?n:n+"[]",c(e))})),!1;return!!Z(e)||(t.append(te(o,n,i),c(e)),!1)}const l=[],f=Object.assign(ne,{defaultVisitor:u,convertValue:c,isVisitable:Z});if(!G.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!G.isUndefined(n)){if(-1!==l.indexOf(n))throw Error("Circular reference detected in "+r.join("."));l.push(n),G.forEach(n,(function(n,i){!0===(!(G.isUndefined(n)||null===n)&&o.call(t,n,G.isString(i)?i.trim():i,r,f))&&e(n,r?r.concat(i):[i])})),l.pop()}}(e),t};function oe(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function ie(e,t){this._pairs=[],e&&re(e,this,t)}const se=ie.prototype;se.append=function(e,t){this._pairs.push([e,t])},se.toString=function(e){const t=e?function(t){return e.call(this,t,oe)}:oe;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};const ae=ie;function ce(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function ue(e,t,n){if(!t)return e;const r=n&&n.encode||ce,o=n&&n.serialize;let i;if(i=o?o(t,n):G.isURLSearchParams(t)?t.toString():new ae(t,n).toString(r),i){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}const le=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){G.forEach(this.handlers,(function(t){null!==t&&e(t)}))}},fe={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},de={isBrowser:!0,classes:{URLSearchParams:"undefined"!=typeof URLSearchParams?URLSearchParams:ae,FormData:"undefined"!=typeof FormData?FormData:null,Blob:"undefined"!=typeof Blob?Blob:null},protocols:["http","https","file","blob","url","data"]},pe="undefined"!=typeof window&&"undefined"!=typeof document,he=(me="undefined"!=typeof navigator&&navigator.product,pe&&["ReactNative","NativeScript","NS"].indexOf(me)<0);var me;const ye="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts,be={...p,...de},ge=function(e){function t(e,n,r,o){let i=e[o++];if("__proto__"===i)return!0;const s=Number.isFinite(+i),a=o>=e.length;return i=!i&&G.isArray(r)?r.length:i,a?(G.hasOwnProp(r,i)?r[i]=[r[i],n]:r[i]=n,!s):(r[i]&&G.isObject(r[i])||(r[i]=[]),t(e,n,r[i],o)&&G.isArray(r[i])&&(r[i]=function(e){const t={},n=Object.keys(e);let r;const o=n.length;let i;for(r=0;r<o;r++)i=n[r],t[i]=e[i];return t}(r[i])),!s)}if(G.isFormData(e)&&G.isFunction(e.entries)){const n={};return G.forEachEntry(e,((e,r)=>{t(function(e){return G.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),r,n,0)})),n}return null},Ee={transitional:fe,adapter:["xhr","http"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,o=G.isObject(e);if(o&&G.isHTMLForm(e)&&(e=new FormData(e)),G.isFormData(e))return r?JSON.stringify(ge(e)):e;if(G.isArrayBuffer(e)||G.isBuffer(e)||G.isStream(e)||G.isFile(e)||G.isBlob(e))return e;if(G.isArrayBufferView(e))return e.buffer;if(G.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let i;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return re(e,new be.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,r){return be.isNode&&G.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((i=G.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return re(i?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||r?(t.setContentType("application/json",!1),function(e,t,n){if(G.isString(e))try{return(0,JSON.parse)(e),G.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||Ee.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(e&&G.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(e){if(n){if("SyntaxError"===e.name)throw Y.from(e,Y.ERR_BAD_RESPONSE,this,null,this.response);throw e}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:be.classes.FormData,Blob:be.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};G.forEach(["delete","get","head","post","put","patch"],(e=>{Ee.headers[e]={}}));const we=Ee,Oe=G.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Se=Symbol("internals");function Re(e){return e&&String(e).trim().toLowerCase()}function Ae(e){return!1===e||null==e?e:G.isArray(e)?e.map(Ae):String(e)}function Te(e,t,n,r,o){return G.isFunction(r)?r.call(this,t,n):(o&&(t=n),G.isString(t)?G.isString(r)?-1!==t.indexOf(r):G.isRegExp(r)?r.test(t):void 0:void 0)}class ve{constructor(e){e&&this.set(e)}set(e,t,n){const r=this;function o(e,t,n){const o=Re(t);if(!o)throw new Error("header name must be a non-empty string");const i=G.findKey(r,o);(!i||void 0===r[i]||!0===n||void 0===n&&!1!==r[i])&&(r[i||t]=Ae(e))}const i=(e,t)=>G.forEach(e,((e,n)=>o(e,n,t)));return G.isPlainObject(e)||e instanceof this.constructor?i(e,t):G.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())?i((e=>{const t={};let n,r,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),n=e.substring(0,o).trim().toLowerCase(),r=e.substring(o+1).trim(),!n||t[n]&&Oe[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)})),t})(e),t):null!=e&&o(t,e,n),this}get(e,t){if(e=Re(e)){const n=G.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(G.isFunction(t))return t.call(this,e,n);if(G.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=Re(e)){const n=G.findKey(this,e);return!(!n||void 0===this[n]||t&&!Te(0,this[n],n,t))}return!1}delete(e,t){const n=this;let r=!1;function o(e){if(e=Re(e)){const o=G.findKey(n,e);!o||t&&!Te(0,n[o],o,t)||(delete n[o],r=!0)}}return G.isArray(e)?e.forEach(o):o(e),r}clear(e){const t=Object.keys(this);let n=t.length,r=!1;for(;n--;){const o=t[n];e&&!Te(0,this[o],o,e,!0)||(delete this[o],r=!0)}return r}normalize(e){const t=this,n={};return G.forEach(this,((r,o)=>{const i=G.findKey(n,o);if(i)return t[i]=Ae(r),void delete t[o];const s=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,n)=>t.toUpperCase()+n))}(o):String(o).trim();s!==o&&delete t[o],t[s]=Ae(r),n[s]=!0})),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return G.forEach(this,((n,r)=>{null!=n&&!1!==n&&(t[r]=e&&G.isArray(n)?n.join(", "):n)})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((([e,t])=>e+": "+t)).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const n=new this(e);return t.forEach((e=>n.set(e))),n}static accessor(e){const t=(this[Se]=this[Se]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=Re(e);t[r]||(function(e,t){const n=G.toCamelCase(" "+t);["get","set","has"].forEach((r=>{Object.defineProperty(e,r+n,{value:function(e,n,o){return this[r].call(this,t,e,n,o)},configurable:!0})}))}(n,e),t[r]=!0)}return G.isArray(e)?e.forEach(r):r(e),this}}ve.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),G.reduceDescriptors(ve.prototype,(({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(e){this[n]=e}}})),G.freezeMethods(ve);const je=ve;function xe(e,t){const n=this||we,r=t||n,o=je.from(r.headers);let i=r.data;return G.forEach(e,(function(e){i=e.call(n,i,o.normalize(),t?t.status:void 0)})),o.normalize(),i}function Ce(e){return!(!e||!e.__CANCEL__)}function Pe(e,t,n){Y.call(this,null==e?"canceled":e,Y.ERR_CANCELED,t,n),this.name="CanceledError"}G.inherits(Pe,Y,{__CANCEL__:!0});const Ne=Pe,_e=be.hasStandardBrowserEnv?{write(e,t,n,r,o,i){const s=[e+"="+encodeURIComponent(t)];G.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),G.isString(r)&&s.push("path="+r),G.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read:()=>null,remove(){}};function Le(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?function(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}const Ue=be.hasStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let n;function r(n){let r=n;return e&&(t.setAttribute("href",r),r=t.href),t.setAttribute("href",r),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return n=r(window.location.href),function(e){const t=G.isString(e)?r(e):e;return t.protocol===n.protocol&&t.host===n.host}}():function(){return!0};function ke(e,t){let n=0;const r=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o,i=0,s=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),u=r[s];o||(o=c),n[i]=a,r[i]=c;let l=s,f=0;for(;l!==i;)f+=n[l++],l%=e;if(i=(i+1)%e,i===s&&(s=(s+1)%e),c-o<t)return;const d=u&&c-u;return d?Math.round(1e3*f/d):void 0}}(50,250);return o=>{const i=o.loaded,s=o.lengthComputable?o.total:void 0,a=i-n,c=r(a);n=i;const u={loaded:i,total:s,progress:s?i/s:void 0,bytes:a,rate:c||void 0,estimated:c&&s&&i<=s?(s-i)/c:void 0,event:o};u[t?"download":"upload"]=!0,e(u)}}const Fe={http:null,xhr:"undefined"!=typeof XMLHttpRequest&&function(e){return new Promise((function(t,n){let r=e.data;const o=je.from(e.headers).normalize();let i,s,{responseType:a,withXSRFToken:c}=e;function u(){e.cancelToken&&e.cancelToken.unsubscribe(i),e.signal&&e.signal.removeEventListener("abort",i)}if(G.isFormData(r))if(be.hasStandardBrowserEnv||be.hasStandardBrowserWebWorkerEnv)o.setContentType(!1);else if(!1!==(s=o.getContentType())){const[e,...t]=s?s.split(";").map((e=>e.trim())).filter(Boolean):[];o.setContentType([e||"multipart/form-data",...t].join("; "))}let l=new XMLHttpRequest;if(e.auth){const t=e.auth.username||"",n=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(t+":"+n))}const f=Le(e.baseURL,e.url);function d(){if(!l)return;const r=je.from("getAllResponseHeaders"in l&&l.getAllResponseHeaders());!function(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new Y("Request failed with status code "+n.status,[Y.ERR_BAD_REQUEST,Y.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}((function(e){t(e),u()}),(function(e){n(e),u()}),{data:a&&"text"!==a&&"json"!==a?l.response:l.responseText,status:l.status,statusText:l.statusText,headers:r,config:e,request:l}),l=null}if(l.open(e.method.toUpperCase(),ue(f,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,"onloadend"in l?l.onloadend=d:l.onreadystatechange=function(){l&&4===l.readyState&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))&&setTimeout(d)},l.onabort=function(){l&&(n(new Y("Request aborted",Y.ECONNABORTED,e,l)),l=null)},l.onerror=function(){n(new Y("Network Error",Y.ERR_NETWORK,e,l)),l=null},l.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const r=e.transitional||fe;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new Y(t,r.clarifyTimeoutError?Y.ETIMEDOUT:Y.ECONNABORTED,e,l)),l=null},be.hasStandardBrowserEnv&&(c&&G.isFunction(c)&&(c=c(e)),c||!1!==c&&Ue(f))){const t=e.xsrfHeaderName&&e.xsrfCookieName&&_e.read(e.xsrfCookieName);t&&o.set(e.xsrfHeaderName,t)}void 0===r&&o.setContentType(null),"setRequestHeader"in l&&G.forEach(o.toJSON(),(function(e,t){l.setRequestHeader(t,e)})),G.isUndefined(e.withCredentials)||(l.withCredentials=!!e.withCredentials),a&&"json"!==a&&(l.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",ke(e.onDownloadProgress,!0)),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",ke(e.onUploadProgress)),(e.cancelToken||e.signal)&&(i=t=>{l&&(n(!t||t.type?new Ne(null,e,l):t),l.abort(),l=null)},e.cancelToken&&e.cancelToken.subscribe(i),e.signal&&(e.signal.aborted?i():e.signal.addEventListener("abort",i)));const p=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(f);p&&-1===be.protocols.indexOf(p)?n(new Y("Unsupported protocol "+p+":",Y.ERR_BAD_REQUEST,e)):l.send(r||null)}))}};G.forEach(Fe,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(e){}Object.defineProperty(e,"adapterName",{value:t})}}));const De=e=>`- ${e}`,Be=e=>G.isFunction(e)||null===e||!1===e,Ie=e=>{e=G.isArray(e)?e:[e];const{length:t}=e;let n,r;const o={};for(let i=0;i<t;i++){let t;if(n=e[i],r=n,!Be(n)&&(r=Fe[(t=String(n)).toLowerCase()],void 0===r))throw new Y(`Unknown adapter '${t}'`);if(r)break;o[t||"#"+i]=r}if(!r){const e=Object.entries(o).map((([e,t])=>`adapter ${e} `+(!1===t?"is not supported by the environment":"is not available in the build")));let n=t?e.length>1?"since :\n"+e.map(De).join("\n"):" "+De(e[0]):"as no adapter specified";throw new Y("There is no suitable adapter to dispatch the request "+n,"ERR_NOT_SUPPORT")}return r};function qe(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ne(null,e)}function Me(e){return qe(e),e.headers=je.from(e.headers),e.data=xe.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Ie(e.adapter||we.adapter)(e).then((function(t){return qe(e),t.data=xe.call(e,e.transformResponse,t),t.headers=je.from(t.headers),t}),(function(t){return Ce(t)||(qe(e),t&&t.response&&(t.response.data=xe.call(e,e.transformResponse,t.response),t.response.headers=je.from(t.response.headers))),Promise.reject(t)}))}const ze=e=>e instanceof je?e.toJSON():e;function He(e,t){t=t||{};const n={};function r(e,t,n){return G.isPlainObject(e)&&G.isPlainObject(t)?G.merge.call({caseless:n},e,t):G.isPlainObject(t)?G.merge({},t):G.isArray(t)?t.slice():t}function o(e,t,n){return G.isUndefined(t)?G.isUndefined(e)?void 0:r(void 0,e,n):r(e,t,n)}function i(e,t){if(!G.isUndefined(t))return r(void 0,t)}function s(e,t){return G.isUndefined(t)?G.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}function a(n,o,i){return i in t?r(n,o):i in e?r(void 0,n):void 0}const c={url:i,method:i,data:i,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:a,headers:(e,t)=>o(ze(e),ze(t),!0)};return G.forEach(Object.keys(Object.assign({},e,t)),(function(r){const i=c[r]||o,s=i(e[r],t[r],r);G.isUndefined(s)&&i!==a||(n[r]=s)})),n}const Je={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{Je[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));const We={};Je.transitional=function(e,t,n){function r(e,t){return"[Axios v1.6.7] Transitional option '"+e+"'"+t+(n?". "+n:"")}return(n,o,i)=>{if(!1===e)throw new Y(r(o," has been removed"+(t?" in "+t:"")),Y.ERR_DEPRECATED);return t&&!We[o]&&(We[o]=!0,console.warn(r(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,o,i)}};const Ke={assertOptions:function(e,t,n){if("object"!=typeof e)throw new Y("options must be an object",Y.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const i=r[o],s=t[i];if(s){const t=e[i],n=void 0===t||s(t,i,e);if(!0!==n)throw new Y("option "+i+" must be "+n,Y.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new Y("Unknown option "+i,Y.ERR_BAD_OPTION)}},validators:Je},Ve=Ke.validators;class Ge{constructor(e){this.defaults=e,this.interceptors={request:new le,response:new le}}async request(e,t){try{return await this._request(e,t)}catch(e){if(e instanceof Error){let t;Error.captureStackTrace?Error.captureStackTrace(t={}):t=new Error;const n=t.stack?t.stack.replace(/^.+\n/,""):"";e.stack?n&&!String(e.stack).endsWith(n.replace(/^.+\n.+\n/,""))&&(e.stack+="\n"+n):e.stack=n}throw e}}_request(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},t=He(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:o}=t;void 0!==n&&Ke.assertOptions(n,{silentJSONParsing:Ve.transitional(Ve.boolean),forcedJSONParsing:Ve.transitional(Ve.boolean),clarifyTimeoutError:Ve.transitional(Ve.boolean)},!1),null!=r&&(G.isFunction(r)?t.paramsSerializer={serialize:r}:Ke.assertOptions(r,{encode:Ve.function,serialize:Ve.function},!0)),t.method=(t.method||this.defaults.method||"get").toLowerCase();let i=o&&G.merge(o.common,o[t.method]);o&&G.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e]})),t.headers=je.concat(i,o);const s=[];let a=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,s.unshift(e.fulfilled,e.rejected))}));const c=[];let u;this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)}));let l,f=0;if(!a){const e=[Me.bind(this),void 0];for(e.unshift.apply(e,s),e.push.apply(e,c),l=e.length,u=Promise.resolve(t);f<l;)u=u.then(e[f++],e[f++]);return u}l=s.length;let d=t;for(f=0;f<l;){const e=s[f++],t=s[f++];try{d=e(d)}catch(e){t.call(this,e);break}}try{u=Me.call(this,d)}catch(e){return Promise.reject(e)}for(f=0,l=c.length;f<l;)u=u.then(c[f++],c[f++]);return u}getUri(e){return ue(Le((e=He(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}G.forEach(["delete","get","head","options"],(function(e){Ge.prototype[e]=function(t,n){return this.request(He(n||{},{method:e,url:t,data:(n||{}).data}))}})),G.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,o){return this.request(He(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Ge.prototype[e]=t(),Ge.prototype[e+"Form"]=t(!0)}));const Xe=Ge;class $e{constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const n=this;this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null})),this.promise.then=e=>{let t;const r=new Promise((e=>{n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e,r,o){n.reason||(n.reason=new Ne(e,r,o),t(n.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}static source(){let e;return{token:new $e((function(t){e=t})),cancel:e}}}const Qe=$e,Ye={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Ye).forEach((([e,t])=>{Ye[t]=e}));const Ze=Ye,et=function e(t){const n=new Xe(t),r=h(Xe.prototype.request,n);return G.extend(r,Xe.prototype,n,{allOwnKeys:!0}),G.extend(r,n,null,{allOwnKeys:!0}),r.create=function(n){return e(He(t,n))},r}(we);et.Axios=Xe,et.CanceledError=Ne,et.CancelToken=Qe,et.isCancel=Ce,et.VERSION="1.6.7",et.toFormData=re,et.AxiosError=Y,et.Cancel=et.CanceledError,et.all=function(e){return Promise.all(e)},et.spread=function(e){return function(t){return e.apply(null,t)}},et.isAxiosError=function(e){return G.isObject(e)&&!0===e.isAxiosError},et.mergeConfig=He,et.AxiosHeaders=je,et.formToJSON=e=>ge(G.isHTMLForm(e)?new FormData(e):e),et.getAdapter=Ie,et.HttpStatusCode=Ze,et.default=et;const tt=et;function nt(e){return nt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},nt(e)}function rt(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,it(r.key),r)}}function ot(e,t,n){return(t=it(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function it(e){var t=function(e,t){if("object"!=nt(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=nt(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==nt(t)?t:String(t)}var st="{key}";const at=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),ot(this,"axios",void 0),this.axios=tt.create({baseURL:t.baseUrl,withCredentials:!0,headers:ot({},"x-api-key",t.serviceKey)})}var t,n;return t=e,(n=[{key:"setConfig",value:function(e){this.axios.defaults.baseURL=e.baseUrl,this.axios.defaults.headers["x-api-key"]=e.serviceKey}},{key:"send",value:function(e){switch(e.method){case d.GET_BY_ID:return this.getById(e);case d.CREATE:return this.create(e);case d.UPDATE:return this.update(e);case d.DELETE:return this.delete(e);default:return this.search(e)}}},{key:"preparePathWithId",value:function(e,t){return e.indexOf(st)>-1?e.replace(st,t):"/"===e.slice(-1)?"".concat(e).concat(t):"".concat(e,"/").concat(t)}},{key:"search",value:function(e){var t=e.path,n=e.options;return n.pagination&&(t+="?",n.pagination.limit&&(t="".concat(t,"limit=").concat(n.pagination.limit,"&")),n.pagination.page&&(t="".concat(t,"page=").concat(n.pagination.page))),delete n.pagination,this.axios.post(t,n)}},{key:"getById",value:function(e){var t=e.options;return this.axios.post(this.preparePathWithId(e.path,t.id),t)}},{key:"create",value:function(e){return this.axios.post(e.path,e.options)}},{key:"update",value:function(e){var t=e.options;return this.axios.put(this.preparePathWithId(e.path,t.id),e.options)}},{key:"delete",value:function(e){var t=e.options;return this.axios.delete(this.preparePathWithId(e.path,t.id),{data:e.options})}}])&&rt(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();return t.default})()));