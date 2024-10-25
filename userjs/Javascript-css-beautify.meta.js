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
