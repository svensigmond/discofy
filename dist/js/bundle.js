(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Moon v0.9.0
 * Copyright 2016-2017 Kabir Shah
 * Released under the MIT License
 * http://moonjs.ga
 */
!function(e,t){"object"==typeof module&&module.exports?module.exports=t():e.Moon=t()}(this,function(){"use strict";function e(e){this.instance=e,this.cache={},this.setters={},this.clear={},this.target=null,this.map={}}function t(t){this.$opts=t||{};var r=this;this.$id=a++,this.$name=this.$opts.name||"root",this.$data=this.$opts.data||{},this.$render=this.$opts.render||b,this.$hooks=this.$opts.hooks||{};var n=this.$opts.methods;void 0!==n&&s(r,n),this.$events={},this.$dom={},this.$observer=new e(this),this.$destroyed=!0,this.$queued=!1;var i=this.$opts.computed;void 0!==i&&l(this,i),this.init()}var r={},n={},i={},o={stop:"event.stopPropagation();",prevent:"event.preventDefault();",ctrl:"if(!event.ctrlKey) {return;};",shift:"if(!event.shiftKey) {return;};",alt:"if(!event.altKey) {return;};",enter:"if(event.keyCode !== 13) {return;};"},a=0,s=function(e,t){for(var r in t)!function(t,r){e.$data[t]=function(){return r.apply(e,arguments)}}(r,t[r])},l=function(e,t){for(var r in t)!function(r){var n=e.$observer;n.observe(r),Object.defineProperty(e.$data,r,{get:function(){var i=null;return void 0===n.cache[r]?(n.target=r,i=t[r].get.call(e),n.target=null,n.cache[r]=i):i=n.cache[r],i},set:b});var i=null;void 0!==(i=t[r].set)&&(n.setters[r]=i)}(r)};e.prototype.observe=function(e){var t=this;this.clear[e]=function(){t.cache[e]=void 0}},e.prototype.notify=function(e,t){var r=null;if(void 0!==(r=this.map[e]))for(var n=0;n<r.length;n++)this.notify(r[n]);var i=null;void 0!==(i=this.clear[e])&&i()};var u=function(e){t.config.silent||console.log(e)},c=function(e){t.config.silent||console.error("[Moon] ERR: "+e)},p=function(e){!1===e.$queued&&!1===e.$destroyed&&(e.$queued=!0,setTimeout(function(){e.build(),y(e,"updated"),e.$queued=!1},0))},f=function(){return{shouldRender:!1,eventListeners:{}}},v=function(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n")},h=function(e,t,r,n){var i=null;r.replace(/\[(\w+)\]/g,function(e,t){r=r.replace(e,"."+t)});var o=r.split(".");for(i=0;i<o.length-1;i++){t=t[o[i]]}return t[o[i]]=n,o[0]},d=function(e){var t={};if(t.default=[],0===e.length)return t;for(var r=0;r<e.length;r++){var n=e[r],i=n.props.attrs,o="";void 0!==(o=i.slot)?(void 0===t[o]?t[o]=[n]:t[o].push(n),delete i.slot):t.default.push(n)}return t},m=function(e,t){for(var r in t)e[r]=t[r];return e},g=function(e,t){var r={};for(var n in e)r[n]=e[n];for(var n in t)r[n]=t[n];return r},y=function(e,t){var r=e.$hooks[t];void 0!==r&&r.call(e)},$=function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},b=function(){},x=function(e){for(var t={},r=e.attributes,n=r.length;n--;)t[r[n].name]=r[n].value;return t},k=function(e,t,r){var n=t.meta.eventListeners;for(var i in n)for(var o=0;o<n[i].length;o++){var a=n[i][o];e.addEventListener(i,a)}},E=function(e,t){var r=null;if("#text"===e.type)r=document.createTextNode(e.val);else{if(r=e.meta.isSVG?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),1===e.children.length&&"#text"===e.children[0].type)r.textContent=e.children[0].val,e.children[0].meta.el=r.firstChild;else for(var n=0;n<e.children.length;n++){var i=e.children[n],o=E(e.children[n],t);r.appendChild(o),i.meta.component&&G(o,i,i.meta.component)}k(r,e)}return O(r,{},e,e.props.attrs),e.meta.el=r,r},_=function(e,t,r){r.appendChild(e),t.meta.component&&G(e,t,t.meta.component)},R=function(e,t){e.__moon__&&e.__moon__.destroy(),t.removeChild(e)},w=function(e,t,r,n){e.__moon__&&e.__moon__.destroy(),n.replaceChild(t,e),r.meta.component&&G(t,r,r.meta.component)},A={SKIP:0,APPEND:1,REMOVE:2,REPLACE:3,TEXT:4,CHILDREN:5},C=function(e,t,r,n,i){return{type:e,val:t,props:r,children:i,meta:n||f()}},L=function(e,t,r){var n=r.opts.data||{};if(void 0!==r.opts.props)for(var i=r.opts.props,o=0;o<i.length;o++){var a=i[o];n[a]=e.attrs[a]}return r.opts.render(P,{data:n,slots:d(t)})},P=function(e,t,r,n){var o=null;if("#text"===e)return C("#text",r,{attrs:{}},t,[]);if(void 0!==(o=i[e])){if(!0===o.opts.functional)return L(t,n,i[e]);r.component=o}return C(e,"",t,r,n)},G=function(e,t,r){for(var n=new r.CTor,i=0;i<n.$props.length;i++){var o=n.$props[i];n.$data[o]=t.props.attrs[o]}return n.$slots=d(t.children),n.$el=e,n.build(),y(n,"mounted"),t.meta.el=n.$el,n.$el},O=function(e,t,n){var i=n.props.attrs;for(var o in i){var a=i[o],s=t[o];void 0===a&&!1===a&&null===a||void 0!==s&&!1!==s&&null!==s&&a===s||(10===o.length&&"xlink:href"===o?e.setAttributeNS("http://www.w3.org/1999/xlink","href",a):e.setAttribute(o,!0===a?"":a))}for(var l in t){var u=i[l];void 0!==u&&!1!==u&&null!==u||e.removeAttribute(l)}if(void 0!==n.props.directives)for(var c in n.props.directives)r[c](e,n.props.directives[c],n);if(void 0!==n.props.dom)for(var p in n.props.dom){var f=n.props.dom[p];e[p]!==f&&(e[p]=f)}},S=function(e,t){if(void 0===e.__moon__)G(e,t,t.meta.component);else{for(var r=e.__moon__,n=!1,i=0;i<r.$props.length;i++){var o=r.$props[i];r.$data[o]!==t.props.attrs[o]&&(r.$data[o]=t.props.attrs[o],n=!0)}0!==t.children.length&&(r.$slots=d(t.children),n=!0),!0===n&&r.build()}},T=function(e,t,r,n){var i=e?e.nodeName.toLowerCase():null;if(null===e){var o=E(t,n);return _(o,t,r),o}if(null===t)return R(e,r),null;if(i!==t.type){var o=E(t,n);return w(e,o,t,r),o}if("#text"===t.type)return"#text"===i?(e.textContent!==t.val&&(e.textContent=t.val),t.meta.el=e):w(e,E(t,n),t,r),e;if(t.meta.el=e,void 0!==t.meta.component)return S(e,t),e;if(O(e,x(e),t),k(e,t),void 0!==t.props.dom&&void 0!==t.props.dom.innerHTML)return e;for(var a=t.children.length,s=0,l=e.firstChild,u=0!==a?t.children[0]:null;null!==u||null!==l;){var c=l?l.nextSibling:null;T(l,u,e,n),u=++s<a?t.children[s]:null,l=c}return e},D=function(e,t,r,n){if(null===e)return _(E(t,n),t,r),A.APPEND;if(null===t)return R(e.meta.el,r),A.REMOVE;if(e===t)return A.SKIP;if(e.type!==t.type)return w(e.meta.el,E(t,n),t,r),A.REPLACE;if(!0===t.meta.shouldRender&&"#text"===t.type){var i=e.meta.el;return"#text"===e.type?(t.val!==e.val&&(i.textContent=t.val),A.TEXT):(w(i,E(t,n),t,r),A.REPLACE)}if(!0===t.meta.shouldRender){var o=e.meta.el;if(void 0!==t.meta.component)return S(o,t),A.SKIP;if(O(o,e.props.attrs,t),e.props.attrs=t.props.attrs,void 0!==t.props.dom&&void 0!==t.props.dom.innerHTML)return A.SKIP;var a=t.children.length,s=e.children.length;if(0===a){if(0!==s){for(var l=null;null!==(l=o.firstChild);)R(l,o);e.children=[]}}else for(var u=a>s?a:s,c=0;c<u;c++){var p=c<s?e.children[c]:null,f=c<a?t.children[c]:null,v=D(p,f,o,n);switch(v){case A.APPEND:e.children[s++]=f;break;case A.REMOVE:e.children.splice(c,1),s--;break;case A.REPLACE:e.children[c]=t.children[c];break;case A.TEXT:p.val=f.val}}return A.CHILDREN}return t.meta.el=e.meta.el,A.SKIP},N=/\s/,M=function(e,t,r,n){var i={current:0,template:e,output:"",openDelimiterLen:t[0].length,closeDelimiterLen:t[1].length,openRE:new RegExp(r[0]),closeRE:new RegExp("\\s*"+r[1])};return j(i,n),i.output},j=function(e,t){for(var r=e.template,n=r.length;e.current<n;){var i=K(e,e.openRE);if(i&&(e.output+=i),e.current===n)break;e.current+=e.openDelimiterLen,I(e);var o=K(e,e.closeRE);if(e.current===n)break;if(o){var a="",s=null;-1!==(s=o.search(/\[|\.|\(/))&&(a=o.substring(s),o=o.substring(0,s)),e.output+=t?'" + instance.get("'+o+'")'+a+' + "':'instance.get("'+o+'")'+a}I(e),e.current+=e.closeDelimiterLen}},K=function(e,t){var r=e.template,n=r.substring(e.current),i=(n.length,n.search(t)),o="";switch(i){case-1:o=n;break;case 0:o="";break;default:o=n.substring(0,i)}return e.current+=o.length,o},I=function(e){for(var t=e.template,r=t[e.current];N.test(r);)r=t[++e.current]},V=function(e){var t={input:e,current:0,tokens:[]};return H(t),t.tokens},H=function(e){for(var t=e.input,r=t.length;e.current<r;)"<"===t.charAt(e.current)?"\x3c!--"!==t.substr(e.current,4)?J(e):X(e):q(e)},q=function(e){var t=e.input,r=t.length,n=t.substring(e.current).search(/<[\w\/]\s*/)+e.current;if(-1===n)return e.tokens.push({type:"text",value:t.slice(e.current)}),void(e.current=r);n!==e.current&&(e.tokens.push({type:"text",value:t.slice(e.current,n)}),e.current=n)},X=function(e){var t=e.input,r=t.length;e.current+=4;var n=t.indexOf("--\x3e",e.current);if(-1===n)return e.tokens.push({type:"comment",value:t.slice(e.current)}),void(e.current=r);e.tokens.push({type:"comment",value:t.slice(e.current,n)}),e.current=n+3},J=function(e){var t=e.input,r=(t.length,"/"===t.charAt(e.current+1));e.current+=r?2:1;var n=F(e);z(n,e);var i="/"===t.charAt(e.current);e.current+=i?2:1,r&&(n.closeStart=!0),i&&(n.closeEnd=!0)},F=function(e){for(var t=e.input,r=t.length,n=e.current,i="";n<r;){var o=t.charAt(n);if("/"===o||">"===o||" "===o)break;i+=o,n++}var a={type:"tag",value:i};return e.tokens.push(a),e.current=n,a},z=function(e,t){for(var r=t.input,n=r.length,i=t.current,o=r.charAt(i),a=r.charAt(i+1),s=function(){i++,o=r.charAt(i),a=r.charAt(i+1)},l={};i<n&&">"!==o&&("/"!==o||">"!==a);)if(" "!==o){for(var u="",c=!1;i<n&&"="!==o;){if(" "===o||">"===o||"/"===o||">"===a){c=!0;break}u+=o,s()}var p={name:u,value:"",meta:{}};if(c)l[u]=p;else{s();var f=" ";for("'"!==o&&'"'!==o||(f=o,s());i<n&&o!==f;)p.value+=o,s();s();var v=u.indexOf(":");if(-1!==v){var h=u.split(":");p.name=h[0],p.meta.arg=h[1]}l[u]=p}}else s();t.current=i,e.attributes=l},B=function(e){for(var t={type:"ROOT",children:[]},r={current:0,tokens:e};r.current<e.length;){var n=Y(r);n&&t.children.push(n)}return t},Q=["area","base","br","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],U=["svg","animate","circle","clippath","cursor","defs","desc","ellipse","filter","font-face","foreignObject","g","glyph","image","line","marker","mask","missing-glyph","path","pattern","polygon","polyline","rect","switch","symbol","text","textpath","tspan","use","view"],W=function(e,t,r){return{type:e,props:t,children:r}},Y=function(e){var t=e.tokens[e.current],r=e.tokens[e.current-1],n=e.tokens[e.current+1],i=function(i){e.current+=void 0===i?1:i,t=e.tokens[e.current],r=e.tokens[e.current-1],n=e.tokens[e.current+1]};if("text"===t.type)return i(),r.value;if("comment"===t.type)return i(),null;if("tag"===t.type){var o=t.value,a=t.closeStart,s=(t.closeEnd,-1!==U.indexOf(o)),l=-1!==Q.indexOf(o),u=W(o,t.attributes,[]);if(i(),s&&(u.isSVG=!0),l)return u;if(!0===a)return null;if(void 0!==t){for(e.current;"tag"!==t.type||"tag"===t.type&&(void 0===t.closeStart&&void 0===t.closeEnd||t.value!==o);){var c=Y(e);if(null!==c&&u.children.push(c),i(0),void 0===t)break}i()}return u}i()},Z=null,ee=null,te=function(e,t){var i=e.props.attrs,o="{attrs: {";if(e.props.directives=[],i){for(var a in i){var s=i[a],l=s.name,u=null;void 0!==(u=n[l])&&u.beforeGenerate&&u.beforeGenerate(s.value,s.meta,e,t)}for(var c in i){var p=i[c],f=p.name,v=null;if(void 0!==(v=n[f]))void 0!==v.afterGenerate&&(void 0===e.specialDirectivesAfter&&(e.specialDirectivesAfter={}),e.specialDirectivesAfter[c]=p),void 0!==v.duringPropGenerate&&(o+=v.duringPropGenerate(p.value,p.meta,e)),e.meta.shouldRender=!0,delete i[c];else if(void 0!==r[f])e.props.directives.push(p),e.meta.shouldRender=!0;else{var h=JSON.stringify(p.value),d=M(h,Z,ee,!0);h!==d&&(e.meta.shouldRender=!0),o+='"'+c+'": '+d+", "}}0!==Object.keys(i).length?o=o.slice(0,-2)+"}":o+="}"}var m=e.props.dom;if(void 0!==m){e.meta.shouldRender=!0,o+=", dom: {";for(var g in m)o+='"'+g+'": '+m[g]+", ";o=o.slice(0,-2)+"}"}var y=e.props.directives;if(0!==y.length){o+=", directives: {";for(var $=0;$<y.length;$++){var b=y[$],x=b.literal?b.value:JSON.stringify(b.value);o+='"'+b.name+'": '+x+", "}o=o.slice(0,-2)+"}"}return o+="}"},re=function(e){if(0===Object.keys(e).length)return"{}";var t="{";for(var r in e)t+='"'+r+'": ['+ie(e[r])+"], ";return t=t.slice(0,-2)+"}"},ne=function(e){var t="{";for(var r in e)t+="eventListeners"===r?'"'+r+'": '+re(e[r])+", ":'"'+r+'": '+e[r]+", ";return t=t.slice(0,-2)+"}"},ie=function(e){for(var t="",r=0;r<e.length;r++)t+=e[r]+", ";return t=t.slice(0,-2)},oe=function(e,t){var r='h("'+e.type+'", ';r+=te(e,t)+", ";var n=e.children.map(function(t){return ae(t,e)});return!0===e.meta.shouldRender&&void 0!==t&&(t.meta.shouldRender=!0),r+=ne(e.meta),0!==n.length?!0===e.deep?r+=", [].concat.apply([], ["+ie(n)+"])":r+=", ["+ie(n)+"]":r+=", []",r+=")"},ae=function(e,t){var r="";if("string"==typeof e){var i=v(e),o=M(i,Z,ee,!0),a=f();i!==o&&(t.meta.shouldRender=!0,a.shouldRender=!0),r+='h("#text", '+ne(a)+', "'+o+'")'}else{e.meta||(e.meta=f()),e.isSVG&&(e.meta.isSVG=!0),e.props={attrs:e.props};var s="";if("slot"===e.type){t.meta.shouldRender=!0,t.deep=!0;var l=e.props.attrs.name;s="instance.$slots['"+(l&&l.value||"default")+"']"}else s=oe(e,t);if(void 0!==e.specialDirectivesAfter)for(var u in e.specialDirectivesAfter){var c=e.specialDirectivesAfter[u];s=n[c.name].afterGenerate(c.value,c.meta,s,e)}r+=s}return r},se=function(e){var r=e.children[0],n=null;(n=t.config.delimiters)!==Z&&(Z=n,ee=new Array(2),ee[0]=$(Z[0]),ee[1]=$(Z[1]));var i="var instance = this; return "+ae(r);try{return new Function("h",i)}catch(e){return c("Could not create render function"),b}},le=function(e){var t=V(e),r=B(t);return se(r)};return t.prototype.get=function(e){var t=this.$observer,r=null;return null!==(r=t.target)&&(void 0===t.map[e]?t.map[e]=[r]:-1===t.map[e].indexOf(r)&&t.map[e].push(r)),this.$data[e]},t.prototype.set=function(e,t){var r=this.$observer,n=h(0,this.$data,e,t),i=null;void 0!==(i=r.setters[n])&&i.call(this,t),r.notify(n,t),p(this)},t.prototype.destroy=function(){this.off(),this.$el=null,this.$destroyed=!0,y(this,"destroyed")},t.prototype.callMethod=function(e,t){t=t||[],this.$data[e].apply(this,t)},t.prototype.on=function(e,t){var r=this.$events[e];void 0===r?this.$events[e]=[t]:r.push(t)},t.prototype.off=function(e,t){if(void 0===e)this.$events={};else if(void 0===t)this.$events[e]=[];else{var r=this.$events[e],n=r.indexOf(t);r.splice(n,1)}},t.prototype.emit=function(e,t){var r=t||{};r.type=e;for(var n=this.$events[e],i=this.$events["*"],o=0;o<n.length;o++)n[o](r);if(void 0!==i)for(var o=0;o<i.length;o++)i[o](r)},t.prototype.renderLoop=function(e,t){for(var r=new Array(e.length),n=0;n<e.length;n++)r[n]=t(e[n],n);return r},t.prototype.renderClass=function(e){if("string"==typeof e)return e;var t="";if(Array.isArray(e))for(var r=0;r<e.length;r++)t+=this.renderClass(e[r])+" ";else if("object"==typeof e)for(var n in e)e[n]&&(t+=n+" ");return t=t.slice(0,-1)},t.prototype.mount=function(e){this.$el=document.querySelector(e),this.$destroyed=!1,this.$el.__moon__=this,this.$template=this.$opts.template||this.$el.outerHTML,this.$render===b&&(this.$render=t.compile(this.$template)),this.build(),y(this,"mounted")},t.prototype.render=function(){return this.$render(P)},t.prototype.patch=function(e,t,r){if(void 0!==e.meta&&void 0!==e.meta.el)t.type!==e.type?(w(e.meta.el,E(t,this),r),this.$el=t.meta.el,this.$el.__moon__=this):D(e,t,r,this);else if(e instanceof Node){var n=T(e,t,r,this);n!==e&&(this.$el=t.meta.el,this.$el.__moon__=this)}},t.prototype.build=function(){var e=this.render(),t=null;void 0!==this.$dom.meta?t=this.$dom:(t=this.$el,this.$dom=e),this.patch(t,e,this.$el.parentNode)},t.prototype.init=function(){u("======= Moon ======="),y(this,"init"),void 0!==this.$opts.el&&this.mount(this.$opts.el)},t.config={silent:!0,prefix:"m-",delimiters:["{{","}}"],keyCodes:function(e){for(var t in e)o[t]="if(event.keyCode !== "+e[t]+") {return;};"}},t.version="0.9.0",t.util={noop:b,error:c,log:u,merge:g,extend:m,h:P},t.use=function(e){e.init(t)},t.compile=function(e){return le(e)},t.nextTick=function(e){setTimeout(e,0)},t.directive=function(e,n){r[t.config.prefix+e]=n},t.component=function(e,r){function n(){t.call(this,r)}var o=this;return r.name?e=r.name:r.name=e,n.prototype=Object.create(o.prototype),n.prototype.constructor=n,n.prototype.init=function(){y(this,"init"),this.$destroyed=!1,this.$props=this.$opts.props||[],this.$template=this.$opts.template,this.$render===b&&(this.$render=t.compile(this.$template))},i[e]={CTor:n,opts:r},n},n[t.config.prefix+"if"]={afterGenerate:function(e,t,r,n){return"("+M(e,Z,ee,!1)+") ? "+r+' : h("#text", '+ne(f())+', "")'}},n[t.config.prefix+"show"]={beforeGenerate:function(e,r,n,i){var o={name:t.config.prefix+"show",value:M(e,Z,ee,!1),literal:!0};n.props.directives.push(o)}},n[t.config.prefix+"for"]={beforeGenerate:function(e,t,r,n){n.deep=!0},afterGenerate:function(e,t,r,n){var i=e.split(" in "),o=i[0].split(","),a=M(i[1],Z,ee,!1),s=o.join(",");return r.replace(new RegExp('instance\\.get\\("('+o.join("|")+')"\\)',"g"),function(e,t){r=r.replace(new RegExp('instance.get\\("'+t+'"\\)',"g"),t)}),"instance.renderLoop("+a+", function("+s+") { return "+r+"; })"}},n[t.config.prefix+"on"]={beforeGenerate:function(e,t,r){var n=t.arg.split("."),i=n[0],a="event",s=M(e,Z,ee,!1),l=s.split("(");l.length>1&&(s=l.shift(),a=l.join("(").slice(0,-1));var u="";n.shift();for(var c=0;c<n.length;c++)u+=o[n[c]];var p="function(event) {"+u+'instance.callMethod("'+s+'", ['+a+"])}";void 0===r.meta.eventListeners[i]?r.meta.eventListeners[i]=[p]:r.meta.eventListeners[i].push(p)}},n[t.config.prefix+"model"]={beforeGenerate:function(e,t,r){var n=M(e,Z,ee,!0),i="input",o="value";void 0!==r.props.attrs.type&&"checkbox"===r.props.attrs.type.value&&(i="change",o="checked");var a='function(event) {instance.set("'+n+'", event.target.'+o+")}";void 0===r.meta.eventListeners[i]?r.meta.eventListeners[i]=[a]:r.meta.eventListeners[i].push(a);var s=M(""+Z[0]+M(e,Z,ee,!1)+Z[1],Z,ee,!1);void 0===r.props.dom&&(r.props.dom={}),r.props.dom[o]=s}},n[t.config.prefix+"literal"]={duringPropGenerate:function(e,t,n){var i=t.arg;return"class"===i?'"class": instance.renderClass('+M(e,Z,ee,!1)+"), ":r[i]?(n.props.directives.push({name:i,value:M(e,Z,ee,!1),meta:{}}),""):'"'+i+'": '+M(e,Z,ee,!1)+", "}},n[t.config.prefix+"html"]={beforeGenerate:function(e,t,r){void 0===r.props.dom&&(r.props.dom={}),r.props.dom.innerHTML='"'+M(e,Z,ee,!0)+'"'}},r[t.config.prefix+"show"]=function(e,t,r){e.style.display=t?"":"none"},r[t.config.prefix+"mask"]=function(e,t,r){},t});
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Discogs = function () {
	function Discogs() {
		_classCallCheck(this, Discogs);

		this.token = 'tCCPbvQBMjhlVMqrIkjKWkpLduNeOXXQgwhWjWQs';
		this.baseUrl = 'https://api.discogs.com/';
	}

	_createClass(Discogs, [{
		key: 'getUserData',
		value: function getUserData(id) {
			var url = this.baseUrl + 'users/' + id + '?token=' + this.token;

			return fetch(url).then(function (response) {
				return response.json();
			});
		}
	}, {
		key: 'getCollectionData',
		value: function getCollectionData(id, url, sorting) {
			url = url || this.baseUrl + '/users/' + id + '/collection/folders/0/releases?page=1&sort=' + sorting.sort + '&sort_order=' + sorting.order + '&token=' + this.token;

			return fetch(url).then(function (response) {
				return response.json();
			});
		}
	}, {
		key: 'getAlbumData',
		value: function getAlbumData(id) {
			var url = this.baseUrl + 'releases/' + id + '?token=' + this.token;

			return fetch(url).then(function (response) {
				return response.json();
			});
		}
	}]);

	return Discogs;
}();

exports.default = new Discogs();

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spotify = function () {
	function Spotify() {
		_classCallCheck(this, Spotify);

		this.baseUrl = 'https://api.spotify.com/v1/';
	}

	_createClass(Spotify, [{
		key: 'searchTrack',
		value: function searchTrack(query) {
			var url = this.baseUrl + 'search?type=track&q=' + query;

			return fetch(url).then(function (response) {
				return response.json();
			});
		}
	}]);

	return Spotify;
}();

exports.default = new Spotify();

},{}],4:[function(require,module,exports){
'use strict';

var _moonjs = require('moonjs');

var _moonjs2 = _interopRequireDefault(_moonjs);

var _utils = require('./utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _eventbus = require('./utils/eventbus');

var _eventbus2 = _interopRequireDefault(_eventbus);

var _discogs = require('./api/discogs');

var _discogs2 = _interopRequireDefault(_discogs);

require('./components/album-details');

require('./components/album');

require('./components/media-player');

require('./components/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var discofy = new _moonjs2.default({
	el: '#js-discofy',
	data: {
		id: 'edw1n',
		user: {
			show: false
		},
		collection: [],
		pagination: {},
		sorting: {
			active: 0,
			options: [{
				sort: 'added',
				order: 'desc'
			}, {
				sort: 'artist',
				order: 'asc'
			}, {
				sort: 'title',
				order: 'asc'
			}, {
				sort: 'year',
				order: 'asc'
			}]
		},
		details: {
			show: false
		},
		mediaUrl: ''
	},

	hooks: {
		init: function init() {
			var localData = JSON.parse(localStorage.getItem('discofy'));

			console.log(this.$data);

			if (localData) {
				// this.$data = localData;

				// TODO: Figure out why we need to set collection to trigger the changes
				this.set('collection', localData.collection);
			}
		},
		mounted: function mounted() {
			var _this = this;

			_eventbus2.default.on('mediaplayer:change', function (url) {
				_this.set('mediaUrl', url);
			});

			_eventbus2.default.on('update:details', function (data) {
				_this.set('details', data.album);
				_this.set('details.show', true);
			});
		},
		updated: function updated() {
			var mediaUrl = this.get('mediaUrl');

			if (mediaUrl) {
				_eventbus2.default.emit('mediaplayer:play');
			}
		}
	},

	methods: {
		getData: function getData(e) {
			this.callMethod('setUserData');
			this.callMethod('setCollectionData');
		},
		setUserData: function setUserData() {
			var _this2 = this;

			_discogs2.default.getUserData(this.get('id')).then(function (response) {
				_this2.set('user', {
					show: true,
					name: response.name,
					username: response.username,
					avatar: response.avatar_url,
					ownedAmount: response.num_collection,
					location: response.location
				});

				_this2.callMethod('updateLocalStorage');
			});
		},
		setCollectionData: function setCollectionData(url) {
			var _this3 = this;

			var sorting = this.get('sorting');
			var activeSorting = sorting.options[sorting.active];

			_discogs2.default.getCollectionData(this.get('id'), url, activeSorting).then(function (response) {
				var releases = response.releases;

				var albums = releases.map(function (release) {
					var info = release.basic_information;
					var album = {
						id: info.id,
						artists: info.artists.map(function (artist) {
							return _utils2.default.stripNumber(artist.name);
						}),
						title: info.title,
						year: info.year > 0 ? info.year : null,
						thumb: info.thumb,
						isPictureDisc: _utils2.default.isPictureDisc(info)
					};

					return album;
				});

				var pagination = {
					urls: response.pagination.urls,
					items: response.pagination.items,
					range: {
						low: albums.length * response.pagination.page - albums.length + 1,
						high: albums.length * response.pagination.page
					}
				};

				_this3.set('collection', albums);
				_this3.set('pagination', pagination);

				_this3.callMethod('updateLocalStorage');
			});
		},
		paginate: function paginate(action) {
			var pagination = this.get('pagination');

			this.callMethod('setCollectionData', [pagination.urls[action]]);
		},
		sort: function sort(option, index) {
			var sorting = this.get('sorting');

			if (sorting.options[sorting.active].sort === option.sort) {
				if (option.order === 'desc') {
					option.order = 'asc';
				} else {
					option.order = 'desc';
				}
			}

			sorting.active = index;
			sorting.options[index] = option;

			this.set('sorting', sorting);

			this.callMethod('setCollectionData');
		},
		updateLocalStorage: function updateLocalStorage() {
			// return false;

			localStorage.setItem('discofy', JSON.stringify(this.$data));
		}
	}
});

window.discofy = discofy;

},{"./api/discogs":2,"./components/album":6,"./components/album-details":5,"./components/media-player":7,"./components/user":8,"./utils/eventbus":13,"./utils/utils":14,"moonjs":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moonjs = require('moonjs');

var _moonjs2 = _interopRequireDefault(_moonjs);

var _eventbus = require('../utils/eventbus');

var _eventbus2 = _interopRequireDefault(_eventbus);

var _spotify = require('../api/spotify');

var _spotify2 = _interopRequireDefault(_spotify);

var _albumDetails = require('../templates/album-details');

var _albumDetails2 = _interopRequireDefault(_albumDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var albumDetails = _moonjs2.default.component('component-album-details', {
	props: ['details'],
	template: _albumDetails2.default,
	methods: {
		clickTrack: function clickTrack(track) {
			var details = this.get('details');
			var artists = details.artists.join();
			var query = artists + ' ' + track;

			_spotify2.default.searchTrack(query).then(function (response) {
				var tracks = response.tracks.items;
				var previewUrl = tracks.length && tracks[0].preview_url;

				if (!previewUrl) {
					return;
				}

				_eventbus2.default.emit('mediaplayer:change', [previewUrl]);
			});
		}
	}
});

exports.default = albumDetails;

},{"../api/spotify":3,"../templates/album-details":9,"../utils/eventbus":13,"moonjs":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moonjs = require('moonjs');

var _moonjs2 = _interopRequireDefault(_moonjs);

var _eventbus = require('../utils/eventbus');

var _eventbus2 = _interopRequireDefault(_eventbus);

var _discogs = require('../api/discogs');

var _discogs2 = _interopRequireDefault(_discogs);

var _album = require('../templates/album');

var _album2 = _interopRequireDefault(_album);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var album2 = _moonjs2.default.component('component-album', {
	props: ['album'],
	template: _album2.default,
	methods: {
		setAlbumData: function setAlbumData() {
			var _this = this;

			var album = this.get('album');

			_discogs2.default.getAlbumData(album.id).then(function (response) {
				album.meta = {
					genres: response.genres.join(', '),
					styles: response.styles ? response.styles.join(', ') : null,
					art: response.images[0].uri,
					// trackList: response.tracklist.map((track) => {
					// 	// let formattedTrack = '';

					// 	// if (track.position) {
					// 	// 	formattedTrack = `${track.position} - ${track.title}`;
					// 	// } else {
					// 	// 	formattedTrack = `${track.title}`;
					// 	// }

					// 	return track.title;
					// }),
					trackList: response.tracklist.map(function (track) {
						return track.title;
					}),
					discogsUrl: response.uri,
					formats: response.formats.map(function (format) {
						var descriptions = format.descriptions ? format.descriptions.join(', ') : null;

						return format.qty + 'x ' + descriptions;
					})
				};

				_this.set('album', album);
			}).then(function () {
				_eventbus2.default.emit('update:details', _this.$data);
			});
		}
	}
});

exports.default = album2;

},{"../api/discogs":2,"../templates/album":10,"../utils/eventbus":13,"moonjs":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moonjs = require('moonjs');

var _moonjs2 = _interopRequireDefault(_moonjs);

var _eventbus = require('../utils/eventbus');

var _eventbus2 = _interopRequireDefault(_eventbus);

var _mediaPlayer = require('../templates/media-player');

var _mediaPlayer2 = _interopRequireDefault(_mediaPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mediaPlayer = _moonjs2.default.component('component-media-player', {
	props: ['src'],
	template: _mediaPlayer2.default,
	hooks: {
		mounted: function mounted() {
			var _this = this;

			this.player = this.$el.querySelector('audio');

			// Workaround beause updated hook doesn't work with components
			_eventbus2.default.on('mediaplayer:play', function () {
				_this.callMethod('playAudio');
			});
		}
	},
	methods: {
		playAudio: function playAudio() {
			this.player.play();
		}
	}
});

exports.default = mediaPlayer;

},{"../templates/media-player":11,"../utils/eventbus":13,"moonjs":1}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moonjs = require('moonjs');

var _moonjs2 = _interopRequireDefault(_moonjs);

var _user = require('../templates/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = _moonjs2.default.component('component-user', {
	props: ['user'],
	template: _user2.default
});

exports.default = user;

},{"../templates/user":12,"moonjs":1}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var template = "<div class=\"album-details\">\n    <img src=\"{{details.meta.art}}\">\n    <table>\n        <tbody>\n            <tr>\n                <th>Title:</th>\n                <td>{{details.title}}</td>\n            </tr>\n            <tr>\n                <th>Artists:</th>\n                <td>\n                    <ul class=\"list-unstyled\">\n                        <li m-for=\"artist in {{details.artists}}\">\n                            {{artist}}\n                        </li>\n                    </ul>\n                </td>\n            </tr>\n            <tr>\n                <th>Format:</th>\n                <td>\n                    <ul class=\"list-unstyled\" m-for=\"format in {{details.meta.formats}}\">\n                        <li>{{format}}</li>\n                    </ul>\n                </td>\n            </tr>\n            <tr>\n                <th>Released:</th>\n                <td>{{details.year}}</td>\n            </tr>\n            <tr>\n                <th>Genre:</th>\n                <td>{{details.meta.genres}}</td>\n            </tr>\n            <tr m-if=\"{{details.meta.styles}}\">\n                <th>Style:</th>\n                <td>{{details.meta.styles}}</td>\n            </tr>\n            <tr>\n                <th>Track list:</th>\n                <td>\n                    <ul class=\"list-unstyled\" m-if=\"{{details.meta.trackList}}\">\n                        <li m-for=\"track in {{details.meta.trackList}}\">{{track}} <button m-on:click=\"clickTrack({{track}})\">\uD83C\uDFB5</button></li>\n                    </ul>\n                </td>\n            </tr>\n            <tr>\n                <th>External:</th>\n                <td>\n                    <a href=\"{{details.meta.discogsUrl}}\">View on discogs</a>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>";

exports.default = template;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var template = "<a href=\"detail.html\"><img src=\"{{album.thumb}}\" m-literal:class=\"{{album.isPictureDisc}} ? 'album__cover__img album__cover__img--rounded' : 'album__cover__img'\" alt=\"{{album.title}}\"></a>\n\t\t\t\t\t<h2 class=\"albums__item__title\">\n\t\t\t\t\t\t<span class=\"album-release\">{{album.year}}</span>\n\t\t\t\t\t\t<span class=\"album-artist\">\n\t\t\t\t\t\t\t<ul m-for=\"artist in {{album.artists}}\">\n\t\t\t\t\t\t\t\t<li>{{artist}}</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</span><br>\n\t\t\t\t\t\t<span class=\"album-title\">{{album.title}}</span>\n\t\t\t\t\t</h2>";

exports.default = template;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var template = "<div class=\"mediaplayer\">\n\t<audio controls=\"true\" src=\"{{src}}\">\n\t\tYour browser does not support the <code>audio</code> element.\n\t</audio>\n</div>";

exports.default = template;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
					value: true
});
var template = "<div class=\"albums__account\">\n\t\t\t\t\t<span><b>{{user.name}}</b></span>\n\t\t\t\t\t<span>{{user.location}}</span>\n\t\t\t\t\t<span>Joined on September 9, 2013</span>\n\t\t\t\t\t<h1>{{user.username}}</h1>\n\t\t\t\t\t<span>837 in Collection</span>\n\t\t\t\t\t<span>798 in Wantlist</span>\n\t\t\t\t</div>";

exports.default = template;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moonjs = require('moonjs');

var _moonjs2 = _interopRequireDefault(_moonjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventbus = new _moonjs2.default();

exports.default = eventbus;

},{"moonjs":1}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
	function Utils() {
		_classCallCheck(this, Utils);
	}

	_createClass(Utils, null, [{
		key: 'stripNumber',

		// Strip number between parentheses at the end of of string
		// 'Temples (4)' will return 'Temples'
		value: function stripNumber(value) {
			return value.replace(/ \([\d]+\)$/, '');
		}
	}, {
		key: 'isPictureDisc',
		value: function isPictureDisc(album) {
			var _album$formats = _slicedToArray(album.formats, 1),
			    descriptions = _album$formats[0].descriptions;

			return descriptions && descriptions.indexOf('Picture Disc') > -1;
		}
	}]);

	return Utils;
}();

exports.default = Utils;

},{}]},{},[4]);
