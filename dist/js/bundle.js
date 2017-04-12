(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
* Moon v0.7.1
* Copyright 2016-2017, Kabir Shah
* https://github.com/KingPixil/moon/
* Free to use under the MIT license.
* https://kingpixil.github.io/license
*/
!function(e,t){"object"==typeof module&&module.exports?module.exports=t():e.Moon=t()}(this,function(){"use strict";function e(e){this.instance=e,this.cache={}}function t(t){this.$opts=t||{},this.$id=s++,this.$name=this.$opts.name||"root",this.$data=this.$opts.data||{},this.$render=this.$opts.render||S,this.$hooks=this.$opts.hooks||{},this.$methods=this.$opts.methods||{},this.$events={},this.$dom={},this.$observer=new e(this),this.$destroyed=!1,this.$initialRender=!0,this.$queued=!1,this.$opts.computed&&a(this,this.$opts.computed),this.init()}var n={},r={},o={},i={stop:"event.stopPropagation();",prevent:"event.preventDefault();",ctrl:"if(!event.ctrlKey) {return;};",shift:"if(!event.shiftKey) {return;};",alt:"if(!event.altKey) {return;};",enter:"if(event.keyCode !== 13) {return;};"},s=0,a=function(e,t){var n=function(n){var r={get:function(){return t[n].get.call(e)}};t[n].set&&(r.set=function(r){return t[n].set.call(e,r)}),Object.defineProperty(e.$data,n,r)};for(var r in t)n(r)};e.prototype.notify=function(){u(this.instance)};var c=function(e){t.config.silent||console.log(e)},p=function(e){console.error("[Moon] ERR: "+e)},u=function(e){e.$queued||e.$destroyed||(e.$queued=!0,setTimeout(function(){e.build(),w(e,"updated"),e.$queued=!1},0))},l=function(e){for(var t={},n=e.attributes,r=n.length;r--;)t[n[r].name]=n[r].value;return e.__moon__props__=t,t},f=function(){return{shouldRender:!0,eventListeners:{}}},h=function(e){var t=/\n/g,n=/"/g,r=/\\/g;return e.replace(r,"\\\\").replace(n,'\\"').replace(t,"\\n")},v=function(e,t,n,r){var o;n.replace(/\[(\w+)\]/g,function(e,t){n=n.replace(e,"."+t)});var i=n.split(".");for(o=0;o<i.length-1;o++){var s=i[o];t=t[s]}return t[i[o]]=r,t},d=function(e,t){var n=/{{([A-Za-z0-9_$@]+)([A-Za-z0-9_.()'"+\-*\/\s\[\]]+)?}}/gi,r=e;return e.replace(n,function(e,n,o){o||(o=""),r=t?r.replace(e,'" + instance.get("'+n+'")'+o+' + "'):r.replace(e,'instance.get("'+n+'")'+o)}),r},m=function(e){var t={};if(!e)return t;var n="default";t[n]=[];for(var r=0;r<e.length;r++){var o=e[r],i=o.props.attrs;i.slot?(t[i.slot]?t[i.slot].push(o):t[i.slot]=[o],delete i.slot):t[n].push(o)}return t},y=function(e,t,n,r,o){return{type:e,val:t,props:n,children:r,meta:o||f()}},g=function(e,t,n,r,o){var i=o.opts.data||{};if(o.opts.props)for(var s=0;s<o.opts.props.length;s++){var a=o.opts.props[s];i[a]=t.attrs[a]}return o.opts.render($,{data:i,slots:m(r)})},$=function(e,t,n){for(var r=[],i=arguments.length-3,s=0;s<i;s++){var a=arguments[s+3];Array.isArray(a)?r=r.concat(a):"string"==typeof a||null===a?r.push(y("#text",a||"",{attrs:{}},[],f())):r.push(a)}if(o[e]){if(o[e].opts.functional)return g(e,t,n,r,o[e]);n.component=o[e]}return y(e,"",t,r,n)},_=function(e,t,n){var r=t.meta.eventListeners;for(var o in r)for(var i=0;i<r[o].length;i++){var s=r[o][i];e.addEventListener(o,s)}},x=function(e,t){var n;if("#text"===e.type)n=document.createTextNode(e.val);else{if(n=e.meta.isSVG?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),1===e.children.length&&"#text"===e.children[0].type)n.textContent=e.children[0].val;else for(var r=0;r<e.children.length;r++){var o=e.children[r],i=x(e.children[r],t);n.appendChild(i),o.meta.component&&k(i,o,o.meta.component)}_(n,e,t)}return n.__moon__props__=C({},e.props.attrs),b(n,{},e,e.props.attrs),n.__moon__nodeName__=e.type,n},k=function(e,t,n){for(var r=new n.CTor,o=0;o<r.$props.length;o++){var i=r.$props[o];r.$data[i]=t.props.attrs[i]}return r.$slots=m(t.children),r.$el=e,r.build(),w(r,"mounted"),r.$el},b=function(e,t,r,o){var i=G(t,o),s=e instanceof SVGElement;for(var a in i)!o.hasOwnProperty(a)||n[a]?(n[a]&&n[a](e,i[a],r),s?e.removeAttributeNS(null,a):e.removeAttribute(a),delete e.__moon__props__[a]):t[a]&&t[a]===o[a]||(s?e.setAttributeNS(null,a,o[a]):e.setAttribute(a,o[a]),e.__moon__props__[a]=o[a]);if(r.props.dom)for(var c in r.props.dom){r.props.dom[c];e[c]!==r.props.dom[c]&&(e[c]=r.props.dom[c])}},A=function(e,t,n,r){var o;if(e&&(o=e.__moon__nodeName__||e.nodeName.toLowerCase()),!e&&t){var i=x(t,r);return n.appendChild(i),t.meta.component&&k(i,t,t.meta.component),i}if(t){if(o!==t.type){var i=x(t,r);return n.replaceChild(i,e),e.__moon__&&e.__moon__.destroy(),t.meta.component&&k(i,t,t.meta.component),i}if(t.meta.shouldRender&&"#text"===t.type&&"#text"===o&&t.val!==e.textContent)return e.textContent=t.val,e;if(t&&"#text"!==t.type&&t.meta.shouldRender){if(t.meta.component){if(e.__moon__){var s=e.__moon__,a=!1;for(var c in t.props.attrs)s.$data[c]!==t.props.attrs[c]&&(s.$data[c]=t.props.attrs[c],a=!0);t.children&&(s.$slots=m(t.children),a=!0),a&&s.build()}else k(e,t,t.meta.component);return e}var p=e.__moon__props__||l(e);if(b(e,p,t,t.props.attrs),r.$initialRender&&_(e,t,r),t.props.dom&&t.props.dom.innerHTML)return e;var u=e.firstChild;if(1===t.children.length&&"#text"===t.children[0].type&&u&&!u.nextSibling&&"#text"===u.nodeName)t.children[0].val!==u.textContent&&(u.textContent=t.children[0].val);else for(var f=0;f<t.children.length||u;f++){var h=u?u.nextSibling:null;A(u,t.children[f],e,r),u=h}return e}return e}return n.removeChild(e),e.__moon__&&e.__moon__.destroy(),null},C=function(e,t){for(var n in t)e[n]=t[n];return e},G=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n},w=function(e,t){var n=e.$hooks[t];n&&n.call(e)},S=function(){},L=function(e){var t={input:e,current:0,tokens:[]};return O(t),t.tokens},O=function(e){for(var t=e.input,n=t.length;e.current<n;)"<"===t.charAt(e.current)?"<!--"!==t.substr(e.current,4)?T(e):E(e):R(e)},R=function(e){var t=e.input,n=t.length,r=t.indexOf("<",e.current);return r===-1?(e.tokens.push({type:"text",value:t.slice(e.current)}),void(e.current=n)):void(r!==e.current&&(e.tokens.push({type:"text",value:t.slice(e.current,r)}),e.current=r))},E=function(e){var t=e.input,n=t.length;e.current+=4;var r=t.indexOf("-->",e.current);return r===-1?(e.tokens.push({type:"comment",value:t.slice(e.current)}),void(e.current=n)):(e.tokens.push({type:"comment",value:t.slice(e.current,r)}),void(e.current=r+3))},T=function(e){var t=e.input,n=(t.length,"/"===t.charAt(e.current+1));e.tokens.push({type:"tagStart",close:n}),e.current+=n?2:1;var r=N(e);j(e);var o="/"===t.charAt(e.current);e.tokens.push({type:"tagEnd",close:!1}),e.current+=o?2:1,o&&(e.tokens.push({type:"tagStart",close:!0}),e.tokens.push({type:"tag",value:r}),e.tokens.push({type:"attribute",value:{}}),e.tokens.push({type:"tagEnd",close:!1}))},N=function(e){for(var t=e.input,n=t.length,r=e.current;r<n;){var o=t.charAt(r);if("/"!==o&&">"!==o&&" "!==o)break;r++}for(var i=r;i<n;){var o=t.charAt(i);if("/"===o||">"===o||" "===o)break;i++}var s=t.slice(r,i);return e.tokens.push({type:"tag",value:s}),e.current=i,s},j=function(e){for(var t=e.input,n=t.length,r=e.current,o={},i=t.charAt(r),s=t.charAt(r+1),a=function(){r++,i=t.charAt(r),s=t.charAt(r+1)};r<n&&">"!==i&&("/"!==i||">"!==s);)if(" "!==i){for(var c="",p=!1;"="!==i&&r<n;){if(!(" "!==i&&">"!==i||"/"===i&&">"!==s)){p=!0;break}c+=i,a()}if(p)o[c]="";else{var u={meta:{},value:""},l=" ";for(a(),"'"===i||'"'===i?(l=i,a()):u.value+=i;(i!==l&&">"!==i||"/"===i&&">"!==s)&&r<n;)u.value+=i,a();if(c.indexOf(":")!==-1){var f=c.split(":");c=f[0],u.meta.arg=f[1]}o[c]=u,a()}}else a();e.current=r,e.tokens.push({type:"attribute",value:o})},D=function(e){for(var t={type:"ROOT",children:[]},n={current:0,tokens:e};n.current<e.length;){var r=V(n);r&&t.children.push(r)}return t},M=["area","base","br","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],P=["svg","animate","circle","clippath","cursor","defs","desc","ellipse","filter","font-face","foreignObject","g","glyph","image","line","marker","mask","missing-glyph","path","pattern","polygon","polyline","rect","switch","symbol","text","textpath","tspan","use","view"],q=function(e,t,n){return{type:e,props:t,children:n}},V=function(e){var t=e.tokens[e.current],n=e.tokens[e.current-1],r=e.tokens[e.current+1],o=e.tokens[e.current+2],i=e.tokens[e.current+3],s=function(i){e.current+=void 0===i?1:i,t=e.tokens[e.current],n=e.tokens[e.current-1],r=e.tokens[e.current+1],o=e.tokens[e.current+2]};if("text"===t.type)return s(),n.value;if("comment"===t.type)return void s();if("tagStart"===t.type&&!t.close&&!i.close){var a=q(r.value,o.value,[]);r.value;if(s(4),P.indexOf(a.type)!==-1&&(a.isSVG=!0),M.indexOf(a.type)!==-1)return a;e.current;if(t){for(;"tagStart"!==t.type||"tagStart"===t.type&&!t.close;){var c=V(e);if(c&&a.children.push(c),s(0),!t){p('The element "'+a.type+'" was left unclosed.');break}}s()}return a}s()},H=function(e){var t=e.props.attrs,o="{attrs: {";if(t){for(var i in t)if(n[i]&&(e.dynamic=!0),r[i])r[i].afterGenerate&&(e.specialDirectivesAfter||(e.specialDirectivesAfter={}),e.specialDirectivesAfter[i]=t[i]),r[i].beforeGenerate&&r[i].beforeGenerate(t[i].value,t[i].meta,e),r[i].duringPropGenerate&&(o+=r[i].duringPropGenerate(t[i].value,t[i].meta,e)),e.dynamic=!0,delete t[i];else{var s=JSON.stringify(t[i].value),a=d(s,!0);s!==a&&(e.dynamic=!0),o+='"'+i+'": '+a+", "}Object.keys(t).length?o=o.slice(0,-2)+"}":o+="}"}var c=e.props.dom;if(c){e.dynamic=!0,o+=", dom: {";for(var p in c)o+='"'+p+'": '+c[p]+", ";o=o.slice(0,-2)+"}"}return o+="}"},K=function(e){if(0===Object.keys(e).length)return"{}";var t="{";for(var n in e)t+='"'+n+'": ['+F(e[n])+"], ";return t=t.slice(0,-2)+"}"},z=function(e){var t="{";for(var n in e)t+="eventListeners"===n?'"'+n+'": '+K(e[n])+", ":'"'+n+'": '+e[n]+", ";return t=t.slice(0,-2)+"}"},F=function(e){for(var t="",n=0;n<e.length;n++)t+=e[n]+", ";return t=t.slice(0,-2)},Z=function(e){var t='h("'+e.type+'", ';t+=H(e)+", ";var n=e.children.map(J);return 1!==e.children.length||1!==n.length||"string"!=typeof e.children[0]||'"'+e.children[0]+'"'!==n[0]||e.dynamic||(e.meta.shouldRender="instance.$initialRender"),t+=z(e.meta),t+=n.length?", "+F(n):"",t+=")"},J=function(e){var t="";if("string"==typeof e)t+='"'+d(h(e),!0)+'"';else{e.meta||(e.meta=f(),e.isSVG&&(e.meta.isSVG=!0)),e.props={attrs:e.props};var n=e.props.attrs.name,o="slot"===e.type?"instance.$slots['"+(n&&n.value||"default")+"']":Z(e);if(e.specialDirectivesAfter)for(var i in e.specialDirectivesAfter)o=r[i].afterGenerate(e.specialDirectivesAfter[i].value,e.specialDirectivesAfter[i].meta,o,e);t+=o}return t},B=function(e){var t=e.children[0],n="var instance = this; return "+J(t);try{return new Function("h",n)}catch(e){return p("Could not create render function"),S}},I=function(e){var t=L(e),n=D(t);return B(n)};return t.prototype.get=function(e){return this.$data[e]},t.prototype.set=function(e,t){v(this,this.$data,e,t),this.$observer.notify()},t.prototype.destroy=function(){this.removeEvents(),this.$el=null,this.$destroyed=!0,w(this,"destroyed")},t.prototype.callMethod=function(e,t){t=t||[],this.$methods[e].apply(this,t)},t.prototype.on=function(e,t){this.$events[e]?this.$events[e].push(t):this.$events[e]=[t]},t.prototype.off=function(e,t){var n=this.$events[e].indexOf(t);n!==-1&&this.$events[e].splice(n,1)},t.prototype.removeEvents=function(){for(var e in this.$events)this.$events[e]=[]},t.prototype.emit=function(e,t){if(t=t||{},t.type=e,this.$events["*"])for(var n=0;n<this.$events["*"].length;n++){var r=this.$events["*"][n];r(t)}for(var n=0;n<this.$events[e].length;n++){var o=this.$events[e][n];o(t)}},t.prototype.renderLoop=function(e,t){for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r));return n},t.prototype.renderClass=function(e){if("string"==typeof e)return e;var t="";if(Array.isArray(e))for(var n=0;n<e.length;n++)t+=this.renderClass(e[n])+" ";else if("object"==typeof e)for(var r in e)e[r]&&(t+=r+" ");return t=t.slice(0,-1)},t.prototype.mount=function(e){this.$el=document.querySelector(e),this.$destroyed=!1,this.$el||p("Element "+this.$opts.el+" not found"),this.$el.__moon__=this,this.$template=this.$opts.template||this.$el.outerHTML,this.$render===S&&(this.$render=t.compile(this.$template)),this.build(),w(this,"mounted")},t.prototype.render=function(){return this.$render($)},t.prototype.patch=function(e,t,n){var r=A(e,t,n,this);e!==r&&(this.$el=r,this.$el.__moon__=this),this.$initialRender=!1},t.prototype.build=function(){this.$dom=this.render(),this.patch(this.$el,this.$dom,this.$el.parentNode)},t.prototype.init=function(){c("======= Moon ======="),w(this,"init"),this.$opts.el&&this.mount(this.$opts.el)},t.config={silent:"undefined"==typeof console,prefix:"m-",keyCodes:function(e){for(var t in e)i[t]="if(event.keyCode !== "+e[t]+") {return;};"}},t.version="0.7.1",t.util={noop:S,error:p,log:c,merge:G,extend:C},t.use=function(e){e.init(t)},t.compile=function(e){return I(e)},t.nextTick=function(e){setTimeout(e,0)},t.directive=function(e,r){n[t.config.prefix+e]=r},t.component=function(e,n){function r(){t.call(this,n)}var i=this;return n.name=e,r.prototype=Object.create(i.prototype),r.prototype.constructor=r,r.prototype.init=function(){w(this,"init"),this.$destroyed=!1,this.$props=this.$opts.props||[],this.$template=this.$opts.template,this.$render===S&&(this.$render=t.compile(this.$template))},o[e]={CTor:r,opts:n},r},r[t.config.prefix+"if"]={afterGenerate:function(e,t,n,r){return"("+d(e,!1)+") ? "+n+" : ''"}},r[t.config.prefix+"for"]={afterGenerate:function(e,t,n,r){var o=e.split(" in "),i=o[0].split(","),s=d(o[1],!1),a=i.join(",");return n.replace(/instance\.get\("([^"]+)"\)/g,function(e,t){i.indexOf(t)!==-1&&(n=n.replace(new RegExp('instance.get\\("'+t+'"\\)',"g"),t))}),"instance.renderLoop("+s+", function("+a+") { return "+n+"; })"}},r[t.config.prefix+"on"]={beforeGenerate:function(e,t,n){var r=t.arg.split("."),o=r[0],s="event",a=d(e,!1),c=a.split("(");c.length>1&&(a=c.shift(),s=c.join("(").slice(0,-1));var p="";r.shift();for(var u=0;u<r.length;u++)p+=i[r[u]];var l="function(event) {"+p+'instance.callMethod("'+a+'", ['+s+"])}";n.meta.eventListeners[o]?n.meta.eventListeners[o].push(l):n.meta.eventListeners[o]=[l]}},r[t.config.prefix+"model"]={beforeGenerate:function(e,t,n){var r=d(e,!0),o="input",i="value";n.props.attrs.type&&"checkbox"===n.props.attrs.type.value&&(o="change",i="checked");var s='function(event) {instance.set("'+r+'", event.target.'+i+")}";n.meta.eventListeners[o]?n.meta.eventListeners[o].push(s):n.meta.eventListeners[o]=[s];var a=d("{{"+d(e,!1)+"}}",!1);n.props.dom||(n.props.dom={}),n.props.dom[i]=a}},r[t.config.prefix+"literal"]={duringPropGenerate:function(e,t,n){var r=t.arg;return n.props.attrs[r]={value:!0,meta:{}},"class"===r?'"class": instance.renderClass('+d(e,!1)+"), ":'"'+r+'": '+d(e,!1)+", "}},r[t.config.prefix+"once"]={beforeGenerate:function(e,t,n){n.meta.shouldRender="instance.$initialRender"}},r[t.config.prefix+"pre"]={beforeGenerate:function(e,t,n){n.meta.shouldRender=!1}},r[t.config.prefix+"html"]={beforeGenerate:function(e,t,n){n.props.dom||(n.props.dom={}),n.props.dom.innerHTML='"'+d(e,!0)+'"'}},r[t.config.prefix+"text"]={beforeGenerate:function(e,t,n){n.children=[e]}},n[t.config.prefix+"show"]=function(e,t,n){var r=new Function("return "+t);r()?e.style.display="block":e.style.display="none"},n[t.config.prefix+"mask"]=function(e,t,n){},t});
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

			if (localData) {
				this.$data = localData;

				// TODO: Figure out why we need to set collection to trigger the changes
				this.set('collection', localData.collection);
			}
		},
		mounted: function mounted() {
			var _this = this;

			this.on('mediaplayer:play', function (url) {
				_this.set('mediaUrl', url);
			});

			this.on('update:details', function (data) {
				_this.set('details', data.album);
				_this.set('details.show', true);

				// this.callMethod('updateLocalStorage');
			});
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
							return artist.name;
						}),
						title: info.title,
						year: info.year > 0 ? info.year : 'Unknown',
						thumb: info.thumb
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

},{"./api/discogs":2,"./components/album":6,"./components/album-details":5,"./components/media-player":7,"./components/user":8,"moonjs":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moonjs = require('moonjs');

var _moonjs2 = _interopRequireDefault(_moonjs);

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
					alert('Yo no track found!1! :(');

					return;
				}

				window.discofy.emit('mediaplayer:play', [previewUrl]); // refactor :')
			});
		}
	}
});

exports.default = albumDetails;

},{"../api/spotify":3,"../templates/album-details":9,"moonjs":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moonjs = require('moonjs');

var _moonjs2 = _interopRequireDefault(_moonjs);

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
				window.discofy.emit('update:details', _this.$data); // refactor :')
			});
		}
	}
});

exports.default = album2;

},{"../api/discogs":2,"../templates/album":10,"moonjs":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moonjs = require('moonjs');

var _moonjs2 = _interopRequireDefault(_moonjs);

var _mediaPlayer = require('../templates/media-player');

var _mediaPlayer2 = _interopRequireDefault(_mediaPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mediaPlayer = _moonjs2.default.component('component-media-player', {
	props: ['src'],
	template: _mediaPlayer2.default,
	hooks: {
		mounted: function mounted() {
			this.player = this.$el.querySelector('audio');

			var src = this.get('src');

			if (src) {
				this.callMethod('playAudio');
			}
		}
	},
	methods: {
		playAudio: function playAudio() {
			this.player.play();
		}
	}
});

exports.default = mediaPlayer;

},{"../templates/media-player":11,"moonjs":1}],8:[function(require,module,exports){
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
var template = "<div class=\"album\" m-on:click=\"setAlbumData()\">\n    <div class=\"album__visual\">\n        <img src=\"{{album.thumb}}\" alt=\"Album\">\n    </div>\n    <div class=\"album__body\">\n        <h1>{{album.title}} <span m-if=\"{{album.year}}\">({{album.year}})</span></h1>\n        <ul m-for=\"artist in {{album.artists}}\">\n            <li>{{artist}}</li>\n        </ul>\n    </div>\n</div>";

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
var template = "<figure class=\"avatar\">\n    <img src=\"{{user.avatar}}\" alt=\"{{user.name}}\" class=\"avatar__visual\">\n    <figcaption class=\"avatar_caption\">{{user.name}}, {{user.location}} ({{user.username}})</figcaption>\n</figure>";

exports.default = template;

},{}]},{},[4]);
