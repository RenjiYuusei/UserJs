// ==UserScript==
// @name            Javascript-css beautify
// @name:vi         Javascript-css beautify
// @namespace       http://devs.forumvi.com
// @description     Beautify and syntax highlighting for source code JavaScript, JSON, CSS. From v4.1+, a few more formats are also supported.
// @description:vi  Định dạng và làm đẹp mã nguồn JavaScript, JSON, CSS. Từ bản v4.1+, một vài định dạng khác cũng được hỗ trợ .
// @version         4.1.2
// @icon            http://i.imgur.com/kz8nqz1.png
// @author          Zzbaivong
// @license         MIT; https://baivong.mit-license.org/license.txt
// @match           *://*/*
// @require         https://unpkg.com/prettier@2.8.8/standalone.js
// @require         https://unpkg.com/prettier@2.8.8/parser-postcss.js
// @require         https://unpkg.com/prettier@2.8.8/parser-html.js
// @require         https://unpkg.com/prettier@2.8.8/parser-babel.js
// @require         https://unpkg.com/prettier@2.8.8/parser-graphql.js
// @require         https://unpkg.com/prettier@2.8.8/parser-markdown.js
// @require         https://unpkg.com/prettier@2.8.8/parser-typescript.js
// @require         https://unpkg.com/prettier@2.8.8/parser-yaml.js
// @require         https://unpkg.com/prettier@2.8.8/parser-angular.js
// @require         https://unpkg.com/@prettier/plugin-php@0.19.3/standalone.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js
// @resource        dark https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/atom-one-dark.min.css
// @resource        light https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/atom-one-light.min.css
// @require         https://raw.githubusercontent.com/RenjiYuusei/gm4-polyfill/refs/heads/master/gm4-polyfill.js
// @noframes
// @supportURL https://github.com/RenjiYuusei/UserJs/issues
// @run-at          document-idle
// @grant           GM.getResourceUrl
// @grant           GM_getResourceURL
// @grant           GM_addStyle
// @inject-into     content
// @downloadURL https://github.com/RenjiYuusei/UserJs/raw/main/userjs/Javascript-css-beautify.user.js
// @updateURL https://github.com/RenjiYuusei/UserJs/raw/main/userjs/Javascript-css-beautify.meta.js
// ==/UserScript==
(()=>{"use strict";const e="dark";const t=document.querySelector("body > pre");if(t===null)return;if(document.querySelector("body").firstElementChild.tagName!=="PRE")return;const s=document.contentType,l=location.pathname;if(/^application\/(xhtml+xml|xml|rss+xml)|text\/(html|xml)$/.test(s))return;let r;if(s==="text/css"||/.+\.css$/.test(l)){r="css"}else if(s==="application/json"||/.+\.(json|map)$/.test(l)){r="json"}else if(/^application\/(x-javascript|javascript)$/.test(s)||/.+\.jsx?$/.test(l)){r="babel"}else if(s==="text/plain"){if(/.+\.component\.html$/.test(l)){r="angular"}else if(/.+\.(gql|graphql)$/.test(l)){r="graphql"}else if(/.+\.ya?ml$/.test(l)){r="yaml"}else if(/.+\.(x?html?|xml)$/.test(l)){r="html"}else if(/.+\.tsx?$/.test(l)){r="typescript"}else if(/.+\.php$/.test(l)){r="php"}else if(/.+\.vue$/.test(l)){r="vue"}else if(/.+\.(less|scss)$/.test(l)){r="css"}else if(/.+\.(md|markdown)$/.test(l)){r="markdown"}}GM.getResourceUrl(e).then((e=>fetch(e))).then((e=>e.text())).then((t=>GM_addStyle(`${t}*{margin:0;padding:0}html{line-height:1em;background:${e==="dark"?"#282c34":"#fafafa"}}pre{white-space:pre-wrap;word-wrap:break-word;word-break:break-all}`)));let a=t.textContent;try{if(r)a=prettier.format(a,{parser:r,plugins:prettierPlugins})}catch(e){console.error(e)}a=hljs.highlightAuto(a).value;const n=document.createDocumentFragment(),i=document.createElement("pre");i.innerHTML=a;i.className="hljs";n.appendChild(i);document.body.replaceChild(n,t)})();
