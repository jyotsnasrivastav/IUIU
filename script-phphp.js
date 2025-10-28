/*!
 * Infinite Scroll PACKAGED v3.0.6
 * Automatically add next page
 *
 * Licensed GPLv3 for open source use
 * or Infinite Scroll Commercial License for commercial use
 *
 * https://infinite-scroll.com
 * Copyright 2018 Metafizzy
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,l){function a(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,a){var h=l.data(a,i);if(!h)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var c=h[e];if(!c||"_"==e.charAt(0))return void s(r+" is not a valid method");var u=c.apply(h,n);o=void 0===o?u:o}),void 0!==o?o:t}function h(t,e){t.each(function(t,n){var o=l.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),l.data(n,i,o))})}l=l||e||t.jQuery,l&&(r.prototype.option||(r.prototype.option=function(t){l.isPlainObject(t)&&(this.options=l.extend(!0,this.options,t))}),l.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return a(this,t,e)}return h(this,t),this},n(l))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return n.indexOf(e)==-1&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return n!=-1&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(t,r),delete n[r]),r.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e};var n=Array.prototype.slice;i.makeArray=function(t){if(Array.isArray(t))return t;if(null===t||void 0===t)return[];var e="object"==typeof t&&"number"==typeof t.length;return e?n.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){i=i||100;var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var o=t.console;return i.htmlInit=function(e,n){i.docReady(function(){var r=i.toDashed(n),s="data-"+r,l=document.querySelectorAll("["+s+"]"),a=document.querySelectorAll(".js-"+r),h=i.makeArray(l).concat(i.makeArray(a)),c=s+"-options",u=t.jQuery;h.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(c);try{i=r&&JSON.parse(r)}catch(l){return void(o&&o.error("Error parsing "+s+" on "+t.className+": "+l))}var a=new e(t,i);u&&u.data(t,n,a)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/core",["ev-emitter/ev-emitter","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("fizzy-ui-utils")):t.InfiniteScroll=e(t,t.EvEmitter,t.fizzyUIUtils)}(window,function(t,e,i){function n(t,e){var s=i.getQueryElement(t);if(!s)return void console.error("Bad element for InfiniteScroll: "+(s||t));if(t=s,t.infiniteScrollGUID){var l=r[t.infiniteScrollGUID];return l.option(e),l}this.element=t,this.options=i.extend({},n.defaults),this.option(e),o&&(this.$element=o(this.element)),this.create()}var o=t.jQuery,r={};n.defaults={},n.create={},n.destroy={};var s=n.prototype;i.extend(s,e.prototype);var l=0;s.create=function(){var t=this.guid=++l;this.element.infiniteScrollGUID=t,r[t]=this,this.pageIndex=1,this.loadCount=0,this.updateGetPath();var e=this.getPath&&this.getPath();if(!e)return void console.error("Disabling InfiniteScroll");this.updateGetAbsolutePath(),this.log("initialized",[this.element.className]),this.callOnInit();for(var i in n.create)n.create[i].call(this)},s.option=function(t){i.extend(this.options,t)},s.callOnInit=function(){var t=this.options.onInit;t&&t.call(this,this)},s.dispatchEvent=function(t,e,i){this.log(t,i);var n=e?[e].concat(i):i;if(this.emitEvent(t,n),o&&this.$element){t+=".infiniteScroll";var r=t;if(e){var s=o.Event(e);s.type=t,r=s}this.$element.trigger(r,i)}};var a={initialized:function(t){return"on "+t},request:function(t){return"URL: "+t},load:function(t,e){return(t.title||"")+". URL: "+e},error:function(t,e){return t+". URL: "+e},append:function(t,e,i){return i.length+" items. URL: "+e},last:function(t,e){return"URL: "+e},history:function(t,e){return"URL: "+e},pageIndex:function(t,e){return"current page determined to be: "+t+" from "+e}};s.log=function(t,e){if(this.options.debug){var i="[InfiniteScroll] "+t,n=a[t];n&&(i+=". "+n.apply(this,e)),console.log(i)}},s.updateMeasurements=function(){this.windowHeight=t.innerHeight;var e=this.element.getBoundingClientRect();this.top=e.top+t.pageYOffset},s.updateScroller=function(){var e=this.options.elementScroll;if(!e)return void(this.scroller=t);if(this.scroller=e===!0?this.element:i.getQueryElement(e),!this.scroller)throw"Unable to find elementScroll: "+e},s.updateGetPath=function(){var t=this.options.path;if(!t)return void console.error("InfiniteScroll path option required. Set as: "+t);var e=typeof t;if("function"==e)return void(this.getPath=t);var i="string"==e&&t.match("{{#}}");return i?void this.updateGetPathTemplate(t):void this.updateGetPathSelector(t)},s.updateGetPathTemplate=function(t){this.getPath=function(){var e=this.pageIndex+1;return t.replace("{{#}}",e)}.bind(this);var e=t.replace(/(\\\?|\?)/,"\\?").replace("{{#}}","(\\d\\d?\\d?)"),i=new RegExp(e),n=location.href.match(i);n&&(this.pageIndex=parseInt(n[1],10),this.log("pageIndex",[this.pageIndex,"template string"]))};var h=[/^(.*?\/?page\/?)(\d\d?\d?)(.*?$)/,/^(.*?\/?\?page=)(\d\d?\d?)(.*?$)/,/(.*?)(\d\d?\d?)(?!.*\d)(.*?$)/];return s.updateGetPathSelector=function(t){var e=document.querySelector(t);if(!e)return void console.error("Bad InfiniteScroll path option. Next link not found: "+t);for(var i,n,o=e.getAttribute("href"),r=0;o&&r<h.length;r++){n=h[r];var s=o.match(n);if(s){i=s.slice(1);break}}return i?(this.isPathSelector=!0,this.getPath=function(){var t=this.pageIndex+1;return i[0]+t+i[2]}.bind(this),this.pageIndex=parseInt(i[1],10)-1,void this.log("pageIndex",[this.pageIndex,"next link"])):void console.error("InfiniteScroll unable to parse next link href: "+o)},s.updateGetAbsolutePath=function(){var t=this.getPath(),e=t.match(/^http/)||t.match(/^\//);if(e)return void(this.getAbsolutePath=this.getPath);var i=location.pathname,n=t.match(/^\?/);if(n)return void(this.getAbsolutePath=function(){return i+this.getPath()});var o=i.substring(0,i.lastIndexOf("/"));this.getAbsolutePath=function(){return o+"/"+this.getPath()}},n.create.hideNav=function(){var t=i.getQueryElement(this.options.hideNav);t&&(t.style.display="none",this.nav=t)},n.destroy.hideNav=function(){this.nav&&(this.nav.style.display="")},s.destroy=function(){this.allOff();for(var t in n.destroy)n.destroy[t].call(this);delete this.element.infiniteScrollGUID,delete r[this.guid],o&&this.$element&&o.removeData(this.element,"infiniteScroll")},n.throttle=function(t,e){e=e||200;var i,n;return function(){var o=+new Date,r=arguments,s=function(){i=o,t.apply(this,r)}.bind(this);i&&o<i+e?(clearTimeout(n),n=setTimeout(s,e)):s()}},n.data=function(t){t=i.getQueryElement(t);var e=t&&t.infiniteScrollGUID;return e&&r[e]},n.setJQuery=function(t){o=t},i.htmlInit(n,"infinite-scroll"),s._init=function(){},o&&o.bridget&&o.bridget("infiniteScroll",n),n}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/page-load",["./core"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./core")):e(t,t.InfiniteScroll)}(window,function(t,e){function i(t){for(var e=document.createDocumentFragment(),i=0;t&&i<t.length;i++)e.appendChild(t[i]);return e}function n(t){for(var e=t.querySelectorAll("script"),i=0;i<e.length;i++){var n=e[i],r=document.createElement("script");o(n,r),r.innerHTML=n.innerHTML,n.parentNode.replaceChild(r,n)}}function o(t,e){for(var i=t.attributes,n=0;n<i.length;n++){var o=i[n];e.setAttribute(o.name,o.value)}}function r(t,e,i,n,o){var r=new XMLHttpRequest;r.open("GET",t,!0),r.responseType=e||"",r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.onload=function(){if(200==r.status)i(r.response);else if(204==r.status)o(r.response);else{var t=new Error(r.statusText);n(t)}},r.onerror=function(){var e=new Error("Network error requesting "+t);n(e)},r.send()}var s=e.prototype;return e.defaults.loadOnScroll=!0,e.defaults.checkLastPage=!0,e.defaults.responseType="document",e.create.pageLoad=function(){this.canLoad=!0,this.on("scrollThreshold",this.onScrollThresholdLoad),this.on("load",this.checkLastPage),this.options.outlayer&&this.on("append",this.onAppendOutlayer)},s.onScrollThresholdLoad=function(){this.options.loadOnScroll&&this.loadNextPage()},s.loadNextPage=function(){if(!this.isLoading&&this.canLoad){var t=this.getAbsolutePath();this.isLoading=!0;var e=function(e){this.onPageLoad(e,t)}.bind(this),i=function(e){this.onPageError(e,t)}.bind(this),n=function(e){this.lastPageReached(e,t)}.bind(this);r(t,this.options.responseType,e,i,n),this.dispatchEvent("request",null,[t])}},s.onPageLoad=function(t,e){return this.options.append||(this.isLoading=!1),this.pageIndex++,this.loadCount++,this.dispatchEvent("load",null,[t,e]),this.appendNextPage(t,e),t},s.appendNextPage=function(t,e){var n=this.options.append,o="document"==this.options.responseType;if(o&&n){var r=t.querySelectorAll(n),s=i(r),l=function(){this.appendItems(r,s),this.isLoading=!1,this.dispatchEvent("append",null,[t,e,r])}.bind(this);this.options.outlayer?this.appendOutlayerItems(s,l):l()}},s.appendItems=function(t,e){t&&t.length&&(e=e||i(t),n(e),this.element.appendChild(e))},s.appendOutlayerItems=function(i,n){var o=e.imagesLoaded||t.imagesLoaded;return o?void o(i,n):(console.error("[InfiniteScroll] imagesLoaded required for outlayer option"),void(this.isLoading=!1))},s.onAppendOutlayer=function(t,e,i){this.options.outlayer.appended(i)},s.checkLastPage=function(t,e){var i=this.options.checkLastPage;if(i){var n=this.options.path;if("function"==typeof n){var o=this.getPath();if(!o)return void this.lastPageReached(t,e)}var r;if("string"==typeof i?r=i:this.isPathSelector&&(r=n),r&&t.querySelector){var s=t.querySelector(r);s||this.lastPageReached(t,e)}}},s.lastPageReached=function(t,e){this.canLoad=!1,this.dispatchEvent("last",null,[t,e])},s.onPageError=function(t,e){return this.isLoading=!1,this.canLoad=!1,this.dispatchEvent("error",null,[t,e]),t},e.create.prefill=function(){if(this.options.prefill){var t=this.options.append;if(!t)return void console.error("append option required for prefill. Set as :"+t);this.updateMeasurements(),this.updateScroller(),this.isPrefilling=!0,this.on("append",this.prefill),this.once("error",this.stopPrefill),this.once("last",this.stopPrefill),this.prefill()}},s.prefill=function(){var t=this.getPrefillDistance();this.isPrefilling=t>=0,this.isPrefilling?(this.log("prefill"),this.loadNextPage()):this.stopPrefill()},s.getPrefillDistance=function(){return this.options.elementScroll?this.scroller.clientHeight-this.scroller.scrollHeight:this.windowHeight-this.element.clientHeight},s.stopPrefill=function(){this.log("stopPrefill"),this.off("append",this.prefill)},e}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/scroll-watch",["./core","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./core"),require("fizzy-ui-utils")):e(t,t.InfiniteScroll,t.fizzyUIUtils)}(window,function(t,e,i){var n=e.prototype;return e.defaults.scrollThreshold=400,e.create.scrollWatch=function(){this.pageScrollHandler=this.onPageScroll.bind(this),this.resizeHandler=this.onResize.bind(this);var t=this.options.scrollThreshold,e=t||0===t;e&&this.enableScrollWatch()},e.destroy.scrollWatch=function(){this.disableScrollWatch()},n.enableScrollWatch=function(){this.isScrollWatching||(this.isScrollWatching=!0,this.updateMeasurements(),this.updateScroller(),this.on("last",this.disableScrollWatch),this.bindScrollWatchEvents(!0))},n.disableScrollWatch=function(){this.isScrollWatching&&(this.bindScrollWatchEvents(!1),delete this.isScrollWatching)},n.bindScrollWatchEvents=function(e){var i=e?"addEventListener":"removeEventListener";this.scroller[i]("scroll",this.pageScrollHandler),t[i]("resize",this.resizeHandler)},n.onPageScroll=e.throttle(function(){var t=this.getBottomDistance();t<=this.options.scrollThreshold&&this.dispatchEvent("scrollThreshold")}),n.getBottomDistance=function(){return this.options.elementScroll?this.getElementBottomDistance():this.getWindowBottomDistance()},n.getWindowBottomDistance=function(){var e=this.top+this.element.clientHeight,i=t.pageYOffset+this.windowHeight;return e-i},n.getElementBottomDistance=function(){var t=this.scroller.scrollHeight,e=this.scroller.scrollTop+this.scroller.clientHeight;return t-e},n.onResize=function(){this.updateMeasurements()},i.debounceMethod(e,"onResize",150),e}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/history",["./core","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./core"),require("fizzy-ui-utils")):e(t,t.InfiniteScroll,t.fizzyUIUtils)}(window,function(t,e,i){var n=e.prototype;e.defaults.history="replace";var o=document.createElement("a");return e.create.history=function(){if(this.options.history){o.href=this.getAbsolutePath();var t=o.origin||o.protocol+"//"+o.host,e=t==location.origin;return e?void(this.options.append?this.createHistoryAppend():this.createHistoryPageLoad()):void console.error("[InfiniteScroll] cannot set history with different origin: "+o.origin+" on "+location.origin+" . History behavior disabled.")}},n.createHistoryAppend=function(){this.updateMeasurements(),this.updateScroller(),this.scrollPages=[{top:0,path:location.href,title:document.title}],this.scrollPageIndex=0,this.scrollHistoryHandler=this.onScrollHistory.bind(this),this.unloadHandler=this.onUnload.bind(this),this.scroller.addEventListener("scroll",this.scrollHistoryHandler),this.on("append",this.onAppendHistory),this.bindHistoryAppendEvents(!0)},n.bindHistoryAppendEvents=function(e){var i=e?"addEventListener":"removeEventListener";this.scroller[i]("scroll",this.scrollHistoryHandler),t[i]("unload",this.unloadHandler)},n.createHistoryPageLoad=function(){this.on("load",this.onPageLoadHistory)},e.destroy.history=n.destroyHistory=function(){var t=this.options.history&&this.options.append;t&&this.bindHistoryAppendEvents(!1)},n.onAppendHistory=function(t,e,i){if(i&&i.length){var n=i[0],r=this.getElementScrollY(n);o.href=e,this.scrollPages.push({top:r,path:o.href,title:t.title})}},n.getElementScrollY=function(t){return this.options.elementScroll?this.getElementElementScrollY(t):this.getElementWindowScrollY(t)},n.getElementWindowScrollY=function(e){var i=e.getBoundingClientRect();return i.top+t.pageYOffset},n.getElementElementScrollY=function(t){return t.offsetTop-this.top},n.onScrollHistory=function(){for(var t,e,i=this.getScrollViewY(),n=0;n<this.scrollPages.length;n++){var o=this.scrollPages[n];if(o.top>=i)break;t=n,e=o}t!=this.scrollPageIndex&&(this.scrollPageIndex=t,this.setHistory(e.title,e.path))},i.debounceMethod(e,"onScrollHistory",150),n.getScrollViewY=function(){return this.options.elementScroll?this.scroller.scrollTop+this.scroller.clientHeight/2:t.pageYOffset+this.windowHeight/2},n.setHistory=function(t,e){var i=this.options.history,n=i&&history[i+"State"];n&&(history[i+"State"](null,t,e),this.options.historyTitle&&(document.title=t),this.dispatchEvent("history",null,[t,e]))},n.onUnload=function(){var e=this.scrollPageIndex;if(0!==e){var i=this.scrollPages[e],n=t.pageYOffset-i.top+this.top;this.destroyHistory(),scrollTo(0,n)}},n.onPageLoadHistory=function(t,e){this.setHistory(t.title,e)},e}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/button",["./core","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./core"),require("fizzy-ui-utils")):e(t,t.InfiniteScroll,t.fizzyUIUtils)}(window,function(t,e,i){function n(t,e){this.element=t,this.infScroll=e,this.clickHandler=this.onClick.bind(this),this.element.addEventListener("click",this.clickHandler),e.on("request",this.disable.bind(this)),e.on("load",this.enable.bind(this)),e.on("error",this.hide.bind(this)),e.on("last",this.hide.bind(this))}return e.create.button=function(){var t=i.getQueryElement(this.options.button);if(t)return void(this.button=new n(t,this))},e.destroy.button=function(){this.button&&this.button.destroy()},n.prototype.onClick=function(t){t.preventDefault(),this.infScroll.loadNextPage()},n.prototype.enable=function(){this.element.removeAttribute("disabled")},n.prototype.disable=function(){this.element.disabled="disabled"},n.prototype.hide=function(){this.element.style.display="none"},n.prototype.destroy=function(){this.element.removeEventListener("click",this.clickHandler)},e.Button=n,e}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/status",["./core","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./core"),require("fizzy-ui-utils")):e(t,t.InfiniteScroll,t.fizzyUIUtils)}(window,function(t,e,i){function n(t){r(t,"none")}function o(t){r(t,"block")}function r(t,e){t&&(t.style.display=e)}var s=e.prototype;return e.create.status=function(){var t=i.getQueryElement(this.options.status);t&&(this.statusElement=t,this.statusEventElements={request:t.querySelector(".infinite-scroll-request"),error:t.querySelector(".infinite-scroll-error"),last:t.querySelector(".infinite-scroll-last")},this.on("request",this.showRequestStatus),this.on("error",this.showErrorStatus),this.on("last",this.showLastStatus),this.bindHideStatus("on"))},s.bindHideStatus=function(t){var e=this.options.append?"append":"load";this[t](e,this.hideAllStatus)},s.showRequestStatus=function(){this.showStatus("request")},s.showErrorStatus=function(){this.showStatus("error")},s.showLastStatus=function(){this.showStatus("last"),this.bindHideStatus("off")},s.showStatus=function(t){o(this.statusElement),this.hideStatusEventElements();var e=this.statusEventElements[t];o(e)},s.hideAllStatus=function(){n(this.statusElement),this.hideStatusEventElements()},s.hideStatusEventElements=function(){for(var t in this.statusEventElements){var e=this.statusEventElements[t];n(e)}},e}),function(t,e){"function"==typeof define&&define.amd?define(["infinite-scroll/js/core","infinite-scroll/js/page-load","infinite-scroll/js/scroll-watch","infinite-scroll/js/history","infinite-scroll/js/button","infinite-scroll/js/status"],e):"object"==typeof module&&module.exports&&(module.exports=e(require("./core"),require("./page-load"),require("./scroll-watch"),require("./history"),require("./button"),require("./status")))}(window,function(t){return t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("imagesloaded/imagesloaded",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}("undefined"!=typeof window?window:this,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){if(Array.isArray(t))return t;var e="object"==typeof t&&"number"==typeof t.length;return e?h.call(t):[t]}function o(t,e,r){if(!(this instanceof o))return new o(t,e,r);var s=t;return"string"==typeof t&&(s=document.querySelectorAll(t)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),l&&(this.jqDeferred=new l.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||t))}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var l=t.jQuery,a=t.console,h=Array.prototype.slice;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&c[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var c={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(l=e,l.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(l(this))})},o.makeJQueryPlugin(),o});

/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ClipboardJS=e():t.ClipboardJS=e()}(this,function(){return n={686:function(t,e,n){"use strict";n.d(e,{default:function(){return b}});var e=n(279),i=n.n(e),e=n(370),u=n.n(e),e=n(817),r=n.n(e);function c(t){try{return document.execCommand(t)}catch(t){return}}var a=function(t){t=r()(t);return c("cut"),t};function o(t,e){var n,o,t=(n=t,o="rtl"===document.documentElement.getAttribute("dir"),(t=document.createElement("textarea")).style.fontSize="12pt",t.style.border="0",t.style.padding="0",t.style.margin="0",t.style.position="absolute",t.style[o?"right":"left"]="-9999px",o=window.pageYOffset||document.documentElement.scrollTop,t.style.top="".concat(o,"px"),t.setAttribute("readonly",""),t.value=n,t);return e.container.appendChild(t),e=r()(t),c("copy"),t.remove(),e}var f=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{container:document.body},n="";return"string"==typeof t?n=o(t,e):t instanceof HTMLInputElement&&!["text","search","url","tel","password"].includes(null==t?void 0:t.type)?n=o(t.value,e):(n=r()(t),c("copy")),n};function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var s=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.action,n=void 0===e?"copy":e,o=t.container,e=t.target,t=t.text;if("copy"!==n&&"cut"!==n)throw new Error('Invalid "action" value, use either "copy" or "cut"');if(void 0!==e){if(!e||"object"!==l(e)||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===n&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===n&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')}return t?f(t,{container:o}):e?"cut"===n?a(e):f(e,{container:o}):void 0};function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function d(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(n){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=v(n);return t=o?(t=v(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments),e=this,!(t=t)||"object"!==p(t)&&"function"!=typeof t?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}}function v(t){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function m(t,e){t="data-clipboard-".concat(t);if(e.hasAttribute(t))return e.getAttribute(t)}var b=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(r,i());var t,e,n,o=h(r);function r(t,e){var n;return function(t){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this),(n=o.call(this)).resolveOptions(e),n.listenClick(t),n}return t=r,n=[{key:"copy",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{container:document.body};return f(t,e)}},{key:"cut",value:function(t){return a(t)}},{key:"isSupported",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"==typeof t?[t]:t,e=!!document.queryCommandSupported;return t.forEach(function(t){e=e&&!!document.queryCommandSupported(t)}),e}}],(e=[{key:"resolveOptions",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===p(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=u()(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget,n=this.action(e)||"copy",t=s({action:n,container:this.container,target:this.target(e),text:this.text(e)});this.emit(t?"success":"error",{action:n,text:t,trigger:e,clearSelection:function(){e&&e.focus(),window.getSelection().removeAllRanges()}})}},{key:"defaultAction",value:function(t){return m("action",t)}},{key:"defaultTarget",value:function(t){t=m("target",t);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(t){return m("text",t)}},{key:"destroy",value:function(){this.listener.destroy()}}])&&d(t.prototype,e),n&&d(t,n),r}()},828:function(t){var e;"undefined"==typeof Element||Element.prototype.matches||((e=Element.prototype).matches=e.matchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector),t.exports=function(t,e){for(;t&&9!==t.nodeType;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},438:function(t,e,n){var u=n(828);function i(t,e,n,o,r){var i=function(e,n,t,o){return function(t){t.delegateTarget=u(t.target,n),t.delegateTarget&&o.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,i,r),{destroy:function(){t.removeEventListener(n,i,r)}}}t.exports=function(t,e,n,o,r){return"function"==typeof t.addEventListener?i.apply(null,arguments):"function"==typeof n?i.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return i(t,e,n,o,r)}))}},879:function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},370:function(t,e,n){var f=n(879),l=n(438);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!f.string(e))throw new TypeError("Second argument must be a String");if(!f.fn(n))throw new TypeError("Third argument must be a Function");if(f.node(t))return c=e,a=n,(u=t).addEventListener(c,a),{destroy:function(){u.removeEventListener(c,a)}};if(f.nodeList(t))return o=t,r=e,i=n,Array.prototype.forEach.call(o,function(t){t.addEventListener(r,i)}),{destroy:function(){Array.prototype.forEach.call(o,function(t){t.removeEventListener(r,i)})}};if(f.string(t))return t=t,e=e,n=n,l(document.body,t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o,r,i,u,c,a}},817:function(t){t.exports=function(t){var e,n="SELECT"===t.nodeName?(t.focus(),t.value):"INPUT"===t.nodeName||"TEXTAREA"===t.nodeName?((e=t.hasAttribute("readonly"))||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),e||t.removeAttribute("readonly"),t.value):(t.hasAttribute("contenteditable")&&t.focus(),n=window.getSelection(),(e=document.createRange()).selectNodeContents(t),n.removeAllRanges(),n.addRange(e),n.toString());return n}},279:function(t){function e(){}e.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var o=this;function r(){o.off(t,r),e.apply(n,arguments)}return r._=e,this.on(t,r,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,u=o.length;i<u;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}},t.exports=e,t.exports.TinyEmitter=e}},r={},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,{a:e}),e},o.d=function(t,e){for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o(686).default;function o(t){if(r[t])return r[t].exports;var e=r[t]={exports:{}};return n[t](e,e.exports,o),e.exports}var n,r});

/*! jquery.cookie v1.4.1 | MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});



$(document).on("click", "#mobile-fly-menu", function () {
  $('.menusection').toggle();

});

$(document).on("click", ".close", function () {
  $('.menusection').hide();

});

$( window ).on( "load", function() {
  if ($.cookie('fontsize')) {
      $('#fontSize').val($.cookie('fontsize'));
      $("<style>.aryafonts p{font-size:" + $.cookie('fontsize') + "px} </style>").insertBefore("body");
  }
});

$(document).on("input change", "#fontSize" , function() {
    $("<style> .aryafonts p{font-size:" + $(this).val() + "px} </style>").insertBefore("body");
  
    $.cookie('fontsize', $(this).val(), { expires: 7 ,path: '/'} );
  });




var inputtext = $('#thenitesharya-text').val();
if (inputtext == "") {
inputtext = "Cool Symbol"
 }



var normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

const randomfontsfuntionlist = [
"oldEnglishCharMapFun",
"medievalCharMapFun",
"cursiveCharMapFun",
"scriptify",
"doubleStruckCharMapFun",
"italicCharMapFun",
"boldItalicCharMapFun",
"monospaceCharMapFun",
"luni.tools.bubbles.encode",
"invertedSquaresCharMapFun",
"wideTextCharMapFun",
"boldCharMapFun",
"luni.tools.flip.encode",
"squaresCharMapFun",
"luni.tools.mirror.encode",
"asianStyleCharMapFun",
"asianStyle2CharMapFun",
"asbcm",
"luni.tools.tiny.encode",
"strikeThrough",
"tildeStrikeThrough",
"slashThrough",
"underline",
"doubleUnderline",
"squiggleCharMapFun",
"cute0",
"fullCrazy",
"crazyWithFlourishOrSymbols",
"squiggle2CharMapFun",
"squiggle3CharMapFun",
"squiggle4CharMapFun",
"squiggle5CharMapFun",
"squiggle6CharMapFun",
"luni.tools.creepify.encode",
"firework",
"stinky",
"dotBoxtwo",
"connectedJoiner",
"arrowjoin",
"starJoiner",
"hashJoiner",
"zigzagJoiner",
"wavyJoiner",
"heartsBetween",
"singlewavyJoiner",
"dottyJoiner",
"curlybrackets",
"weirdBox",
"thickBox",
"dotBox",
"arrowBox",
"diametricBox",
"thickBlockFramed",
"diametricAngleFrame",
"squaredot",
"arrowjoiner",
"doubleslashjoiner",
"slashjoiner",
"slashboxjoiner",
"barcodejoiner",
"italicblock",
"lineseparator",
"singlelineseparator",
"brackethangtext",
"focustext",
"newsquarebracket"
];



function applyCharMap(map, text) {
let out = "";
for (let c of text.split("")) {
  if (map[c] !== undefined) out += map[c];
  else if (map[c.toLowerCase()] !== undefined) out += map[c.toLowerCase()];
  else out += c;
}
return out;
}

function invertedSquaresCharMapFun(text) {
return applyCharMap(invertedSquaresCharMap, text);
}
function wideTextCharMapFun(text) {
return applyCharMap(wideTextCharMap, text);
}
function squaresCharMapFun(text) {
return applyCharMap(squaresCharMap, text);
}
function asbcm(text) {
return applyCharMap(subscriptCharMap, text);
}

function squiggleCharMapFun(text) {
return applyCharMap(squiggleCharMap, text);
}
function squiggle2CharMapFun(text) {
return applyCharMap(squiggle2CharMap, text);
}
function squiggle3CharMapFun(text) {
return applyCharMap(squiggle3CharMap, text);
}
function squiggle4CharMapFun(text) {
return applyCharMap(squiggle4CharMap, text);
}
function squiggle5CharMapFun(text) {
return applyCharMap(squiggle5CharMap, text);
}
function squiggle6CharMapFun(text) {
return applyCharMap(squiggle6CharMap, text);
}
function boldCharMapFun(text) {
return applyCharMap(boldCharMap, text);
}
function oldEnglishCharMapFun(text) {
return applyCharMap(oldEnglishCharMap, text);
}
function medievalCharMapFun(text) {
return applyCharMap(medievalCharMap, text);
}
function cursiveCharMapFun(text) {
return applyCharMap(cursiveCharMap, text);
}
function doubleStruckCharMapFun(text) {
return applyCharMap(doubleStruckCharMap, text);
}
function italicCharMapFun(text) {
return applyCharMap(italicCharMap, text);
}
function boldItalicCharMapFun(text) {
return applyCharMap(boldItalicCharMap, text);
}
function monospaceCharMapFun(text) {
return applyCharMap(monospaceCharMap, text);
}
function upperAnglesCharMapFun(text) {
return applyCharMap(upperAnglesCharMap, text);
}
function greekCharMapFun(text) {
return applyCharMap(greekCharMap, text);
}
function symbolsCharMapFun(text) {
return applyCharMap(symbolsCharMap, text);
}
function currencyCharMapFun(text) {
return applyCharMap(currencyCharMap, text);
}
function asianStyleCharMapFun(text) {
return applyCharMap(asianStyleCharMap, text);
}
function asianStyle2CharMapFun(text) {
return applyCharMap(asianStyle2CharMap, text);
}


var luni = new Lunicode();
luni.tools.creepify.options.maxHeight = 10;

function crazyWithFlourishOrSymbols(text) {
if (Math.random() < 0.7) return wrapInSymbols(crazifyText(text), 2);
else return wrapInFlourish(crazifyText(text), 2);
}

function angryOrSymbols(text) {
  if (Math.random() < 0.7) return angryInSymbols(text, 1);
  else return angryInSymbols(text, 1);
  }
  
function naughtyOrSymbols(text) {
    if (Math.random() < 0.7) return naughtyInSymbols(text, 1);
    else return naughtyInSymbols(text, 1);
    }
function kissOrSymbols(text) {
      if (Math.random() < 0.7) return kissInSymbols(text, 1);
      else return kissInSymbols(text, 1);
      }
function loveOrSymbols(text) {
        if (Math.random() < 0.7) return loveInSymbols(text, 1);
        else return loveInSymbols(text, 1);
        }
function sadOrSymbols(text) {
          if (Math.random() < 0.7) return sadInSymbols(text, 1);
          else return sadInSymbols(text, 1);
          }

function cryOrSymbols(text) {
            if (Math.random() < 0.7) return cryInSymbols(text, 1);
            else return cryInSymbols(text, 1);
            }
function eatingOrSymbols(text) {
              if (Math.random() < 0.7) return eatingInSymbols(text, 1);
              else return eatingInSymbols(text, 1);
              }

function surprisedOrSymbols(text) {
                if (Math.random() < 0.7) return surprisedInSymbols(text, 1);
                else return surprisedInSymbols(text, 1);
                }
function cuteOrSymbols(text) {
                  if (Math.random() < 0.7) return cuteInSymbols(text, 1);
                  else return cuteInSymbols(text, 1);
                  }
function depressedOrSymbols(text) {
                    if (Math.random() < 0.7) return depressedInSymbols(text, 1);
                    else return depressedInSymbols(text, 1);
                    }
function goodmorningOrSymbols(text) {
                      if (Math.random() < 0.7) return goodmorningInSymbols(text, 1);
                      else return goodmorningInSymbols(text, 1);
                      }
function goodnightOrSymbols(text) {
                        if (Math.random() < 0.7) return goodnightInSymbols(text, 1);
                        else return goodnightInSymbols(text, 1);
                        }


function weddinganniversaryOrSymbols(text) {
                          if (Math.random() < 0.7) return weddinganniversaryInSymbols(text, 1);
                          else return weddinganniversaryInSymbols(text, 1);
                          }

function strikeThrough(text) {
return text.split("").join("̶") + "̶";
}
function tildeStrikeThrough(text) {
return text.split("").join("̴") + "̴";
}
function underline(text) {
return text.split("").join("̲") + "̲";
}
function doubleUnderline(text) {
return text.split("").join("̳") + "̳";
}
function slashThrough(text) {
return text.split("").join("̷") + "̷";
}


function stinky(text) {
return text.split("").join("̾") + "̾"
}
function heartsBetween(text) {
return text.split("").join("♥");
}
function arrowBelow(text) {
return text.split("").join("͎") + "͎";
}
function crossAboveBelow(text) {
return text.split("").join("͓̽") + "͓̽";
}

const wingdingsCharMap =
{ "0": "📁︎", "1": "📂︎", "2": "📄︎", "3": "🗏︎", "4": "🗐︎", "5": "🗄︎", "6": "⌛︎", "7": "🖮︎", "8": "🖰︎", "9": "🖲︎", "!": "✏︎", "\"": "✂︎", "#": "✁︎", "$": "👓︎", "%": "🕭︎", "&": "🕮︎", "'": "🕯︎", "(": "🕿︎", ")": "✆︎", "*": "🖂︎", "+": "🖃︎", ",": "📪︎", "-": "📫︎", ".": "📬︎", "/": "📭︎", ":": "🖳︎", ";": "🖴︎", "<": "🖫︎", "=": "🖬︎", ">": "✇︎", "?": "✍︎", "A": "✌︎", "B": "👌︎", "C": "👍︎", "D": "👎︎", "E": "☜︎", "F": "☞︎", "G": "☝︎", "H": "☟︎", "I": "✋︎", "J": "☺︎", "K": "😐︎", "L": "☹︎", "M": "💣︎", "N": "☠︎", "O": "⚐︎", "P": "🏱︎", "Q": "✈︎", "R": "☼︎", "S": "💧︎", "T": "❄︎", "U": "🕆︎", "V": "✞︎", "W": "🕈︎", "X": "✠︎", "Y": "✡︎", "Z": "☪︎", "[": "☯︎", "\\": "ॐ︎", "]": "☸︎", "^": "♈︎", "_": "♉︎", "`": "♊︎", "a": "♋︎", "b": "♌︎", "c": "♍︎", "d": "♎︎", "e": "♏︎", "f": "♐︎", "g": "♑︎", "h": "♒︎", "i": "♓︎", "j": "🙰", "k": "🙵", "l": "●︎", "m": "❍︎", "n": "■︎", "o": "□︎", "p": "◻︎", "q": "❑︎", "r": "❒︎", "s": "⬧︎", "t": "⧫︎", "u": "◆︎", "v": "❖︎", "w": "⬥︎", "x": "⌧︎", "y": "⍓︎", "z": "⌘︎", "{": "❀︎", "|": "✿︎", "}": "❝︎", "~": "❞︎", " ": "▯︎", "€": "⓪︎", " ": "①︎", "‚": "②︎", "ƒ": "③︎", "„": "④︎", "…": "⑤︎", "†": "⑥︎", "‡": "⑦︎", "ˆ": "⑧︎", "‰": "⑨︎", "Š": "⑩︎", "‹": "⓿︎", "Œ": "❶︎", " ": "❷︎", "Ž": "❸︎", " ": "❹︎", " ": "❺︎", "‘": "❻︎", "’": "❼︎", "“": "❽︎", "”": "❾︎", "•": "❿︎", "–": "◻︎", "—": "◻︎", "˜": "◻︎", "™": "◻︎", "š": "◻︎", "›": "◻︎", "œ": "◻︎", " ": "◻︎", "ž": "·︎", "Ÿ": "•︎", "¡": "○︎", "¢": "⭕︎", "£": "◻︎", "¤": "◉︎", "¥": "◎︎", "¦": "◻︎", "§": "▪︎", "¨": "◻︎", "©": "◻︎", "ª": "✦︎", "«": "★︎", "¬": "✶︎", "®": "✹︎", "¯": "✵︎", "°": "◻︎", "±": "⌖︎", "²": "⟡︎", "³": "⌑︎", "´": "◻︎", "µ": "✪︎", "¶": "✰︎", "·": "🕐︎", "¸": "🕑︎", "¹": "🕒︎", "º": "🕓︎", "»": "🕔︎", "¼": "🕕︎", "½": "🕖︎", "¾": "🕗︎", "¿": "🕘︎", "À": "🕙︎", "Á": "🕚︎", "Â": "🕛︎", "Ã": "◻︎", "Ä": "◻︎", "Å": "◻︎", "Æ": "◻︎", "Ç": "◻︎", "È": "◻︎", "É": "◻︎", "Ê": "◻︎", "Ë": "◻︎", "Ì": "◻︎", "Í": "◻︎", "Î": "◻︎", "Ï": "◻︎", "Ð": "◻︎", "Ñ": "◻︎", "Ò": "◻︎", "Ó": "◻︎", "Ô": "◻︎", "Õ": "⌫︎", "Ö": "⌦︎", "×": "◻︎", "Ø": "➢︎", "Ù": "◻︎", "Ú": "◻︎", "Û": "◻︎", "Ü": "➲︎", "Ý": "◻︎", "Þ": "◻︎", "ß": "◻︎", "à": "◻︎", "á": "◻︎", "â": "◻︎", "ã": "◻︎", "ä": "◻︎", "å": "◻︎", "æ": "◻︎", "ç": "◻︎", "è": "➔︎", "é": "◻︎", "ê": "◻︎", "ë": "◻︎", "ì": "◻︎", "í": "◻︎", "î": "◻︎", "ï": "⇦︎", "ð": "⇨︎", "ñ": "⇧︎", "ò": "⇩︎", "ó": "⬄︎", "ô": "⇳︎", "õ": "⬀︎", "ö": "⬁︎", "÷": "⬃︎", "ø": "⬂︎", "ù": "▭︎", "ú": "▫︎", "û": "✗︎", "ü": "✓︎", "ý": "☒︎", "þ": "☑︎", "ÿ": "◻︎" };
function wingdings(text) {
return text.split("").map(function (a) { return wingdingsCharMap[a] ? wingdingsCharMap[a] : a }).join("");
}

const vaporwaveCharMap = { " ": "　", "`": "`", "1": "１", "2": "２", "3": "３", "4": "４", "5": "５", "6": "６", "7": "７", "8": "８", "9": "９", "0": "０", "-": "－", "=": "＝", "~": "~", "!": "！", "@": "＠", "#": "＃", "$": "＄", "%": "％", "^": "^", "&": "＆", "*": "＊", "(": "（", ")": "）", "_": "_", "+": "＋", "q": "ｑ", "w": "ｗ", "e": "ｅ", "r": "ｒ", "t": "ｔ", "y": "ｙ", "u": "ｕ", "i": "ｉ", "o": "ｏ", "p": "ｐ", "[": "[", "]": "]", "\\": "\\", "Q": "Ｑ", "W": "Ｗ", "E": "Ｅ", "R": "Ｒ", "T": "Ｔ", "Y": "Ｙ", "U": "Ｕ", "I": "Ｉ", "O": "Ｏ", "P": "Ｐ", "{": "{", "}": "}", "|": "|", "a": "ａ", "s": "ｓ", "d": "ｄ", "f": "ｆ", "g": "ｇ", "h": "ｈ", "j": "ｊ", "k": "ｋ", "l": "ｌ", ";": "；", "'": "＇", "A": "Ａ", "S": "Ｓ", "D": "Ｄ", "F": "Ｆ", "G": "Ｇ", "H": "Ｈ", "J": "Ｊ", "K": "Ｋ", "L": "Ｌ", ":": "：", "\"": "\"", "z": "ｚ", "x": "ｘ", "c": "ｃ", "v": "ｖ", "b": "ｂ", "n": "ｎ", "m": "ｍ", ",": "，", ".": "．", "/": "／", "Z": "Ｚ", "X": "Ｘ", "C": "Ｃ", "V": "Ｖ", "B": "Ｂ", "N": "Ｎ", "M": "Ｍ", "<": "<", ">": ">", "?": "？" };
function vaporwaveText(text) {
var numSpaces = text.split(" ").length;
text = applyCharMap(vaporwaveCharMap, text);
var asianChars = getAsianChars(Math.max(3, numSpaces));
if (numSpaces > 6) asianChars = asianChars.split("").map(c => c + ["", ""][Math.round(Math.random() * 0.6)]).join("");
var outputs = [];
outputs.push(text);
return outputs.join();
}
function vaporwaveText1(text) {
var numSpaces = text.split(" ").length;
text = applyCharMap(vaporwaveCharMap, text);
var asianChars = getAsianChars(Math.max(3, numSpaces));
if (numSpaces > 6) asianChars = asianChars.split("").map(c => c + ["", ""][Math.round(Math.random() * 0.6)]).join("");
var outputs = [];
outputs.push(text.replace(/　/g, "░").replace(/ａｅ/, "æ").replace(/Ａ/g, "Λ").replace(/Ｅ/g, function () { return Math.random() > 0.5 ? "Ξ" : "Σ"; }).replace(/Ｏ/g, "♢"));
return outputs.join();
}
function vaporwaveText2(text) {
var numSpaces = text.split(" ").length;
text = applyCharMap(vaporwaveCharMap, text);
var asianChars = getAsianChars(Math.max(3, numSpaces));
if (numSpaces > 6) asianChars = asianChars.split("").map(c => c + ["", ""][Math.round(Math.random() * 0.6)]).join("");
var outputs = [];
outputs.push("【﻿" + text + "】");
return outputs.join();
}
function getAsianChars(n) {
if (!n) n = 1;
var chars = "リサフランク現代のコンピュ竹内 まりや若者が履く流行のスニーカー真夜中のドアホットドッグマスターストライカーソニーブギ新しい日の誕生ライフ - ヒスイ蒸気波 無線゠ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾヿぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ゙゚゛゜ゝゞゟ亜哀挨愛曖悪握圧扱宛嵐安案暗以衣位囲医依委威為畏胃尉異移萎偉椅彙意違維慰遺緯域育壱逸茨芋引印因咽姻員院淫陰飲隠韻右宇羽雨唄鬱畝浦運雲永泳英映栄営詠影鋭衛易疫益液駅悦越謁閲円延沿炎怨宴媛援園煙猿遠鉛塩演縁艶汚王凹央応往押旺欧殴桜翁奥横岡屋億憶臆虞乙俺卸音恩温穏下化火加可仮何花佳価果河苛科";
var str = "";
for (var i = 0; i < n; i++) {
  str += chars[Math.floor(Math.random() * chars.length)];
}
return str;
}

const flourishArray = [
"▄︻デ[[text]]══━一",
" ̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= [[text]] =ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿",
 "一═デ︻ [[text]] ︻デ═一",
 "╾━╤デ╦︻ [[text]]",
"꧁༒☬ [[text]] ☬༒꧂",
"◥꧁ད [[text]] ཌ꧂◤",
"𓂀 [[text]] 𓂀",
"⚔️ [[text]] ⚔️",
"꧁༒༻☬ད [[text]] ཌ☬༺༒꧂",
"◥꧁ད ॐ卐[[text]] 卐ॐ ཌ꧂◤",
"✎ (❁ᴗ͈ˬᴗ͈) ༉‧ [[text]] ♡*.✧",
"( ﾟ∀ﾟ)ﾉ【[[text]]】",
"ღƪ(ˆ◡ˆ)ʃ♡ [[text]] ♡ƪ(ˆ◡ˆ)ʃ♪",
"｡*ﾟ.*.｡(っ ᐛ )っ [[text]]",
"┗(^o^ )┓三 [[text]] 三 ┗(^o^ )┓",
"(ㅅꈍ﹃ꈍ)* [[text]] *(ꈍ﹃ꈍㅅ)♡",
"¯\_( ͡° ͜ʖ ͡°)_/¯ [[text]] ¯\_( ͡° ͜ʖ ͡°)_/¯",
"୧(•̀ᗝ•́)૭ [[text]] ୧(⇀‸↼‶)૭",
"(¯´•._.• [[text]] •._.•´¯)",
"(-_-) [[text]] (-_-)",
"•´¯`•. [[text]] .•´¯`•",
"【｡_｡】 [[text]] 【｡_｡】",
"ღ(¯`◕‿◕´¯) ♫ ♪ ♫ [[text]] ♫ ♪ ♫ (¯`◕‿◕´¯)ღ",
"«-(¯`v´¯)-« [[text]] »-(¯`v´¯)-»",
"[[text]] ☜(`o´)",
"(ง ͠ ᵒ̌ Дᵒ̌ )¤=[]:::::> [[text]]",
"<:::::[]=¤ [[text]] (▀̿̿Ĺ̯̿̿▀̿ ̿)",
"⎝⎝✧GͥOͣDͫ✧⎠⎠ [[text]] ⎝⎝✧GͥOͣDͫ✧⎠⎠",
"▁ ▂ ▄ ▅ ▆ ▇ █ [[text]] █ ▇ ▆ ▅ ▄ ▂ ▁",
"ıllıllı [[text]] ıllıllı",
"•?((¯°·._.• [[text]] •._.·°¯))؟•",
"▌│█║▌║▌║ [[text]] ║▌║▌║█│▌",
"×º°”˜`”°º× [[text]] ×º°”˜`”°º×",
"•]••´º´•» [[text]] «•´º´••[•",
"*•.¸♡ [[text]] ♡¸.•*",
"╰☆☆ [[text]] ☆☆╮",

"░▒▓█ [[text]] █▓▒░",
"░▒▓█►─═  [[text]] ═─◄█▓▒░",
"★彡 [[text]] 彡★",
"•´¯`•. [[text]] .•´¯`•",
"§.•´¨'°÷•..× [[text]] ×,.•´¨'°÷•..§",
"•°¯`•• [[text]] ••´¯°•",
"(¯`*•.¸,¤°´✿.｡.:* [[text]] *.:｡.✿`°¤,¸.•*´¯)",
"|!¤*'~``~'*¤!| [[text]] |!¤*'~``~'*¤!|",
"¸„.-•~¹°”ˆ˜¨ [[text]] ¨˜ˆ”°¹~•-.„¸",
"(¯´•._.• [[text]] •._.•´¯)", 
"••¤(`×[¤ [[text]] ¤]×´)¤••",
"•´¯`•» [[text]] «•´¯`•",
" .o0×X×0o. [[text]] .o0×X×0o.",
"—(••÷[ [[text]] ]÷••)—",
"`•.,¸¸,.•´¯ [[text]] ¯`•.,¸¸,.•´",
"↤↤↤↤↤ [[text]] ↦↦↦↦↦",
"➶➶➶➶➶ [[text]] ➷➷➷➷➷",
"【☆】★【☆】★【[[text]]】★【☆】★【☆】",
"»»————-　[[text]]　————-««",
"·÷±‡±[[text]]±‡±÷·",
"°†° «[[[text]]]» °†°",
"🌊 .·:*¨[[text]]¨*:·. 🌊",
"┕━━☽【[[text]]】☾━━┙",
"↫↫↫↫↫ [[text]] ↬↬↬↬↬",
"・‥…━━━━━━━☆[[text]]☆━━━━━━━…‥・",
"·.¸¸.·♩♪♫ [[text]] ♫♪♩·.¸¸.·",
"⋆┊ ┊ . ┊ . ┊✩.[[text]] ✫ ┊° ☪⋆ ✯. • ° ⋆ ┊",
"]|I{•------» [[text]] «------•}I|[",
"▀▄▀▄▀▄ [[text]] ▄▀▄▀▄▀",
"»»------(¯`[[text]]´¯)------»»",
"╰┈➤ ❝ [[[text]]] ❞",

"-漫~*'¨¯¨'*·舞~ [[text]] ~舞*'¨¯¨'*·~漫-",
"๑۞๑,¸¸,ø¤º°`°๑۩ [[text]] ๑۩ ,¸¸,ø¤º°`°๑۞๑",
".•°¤*(¯`★´¯)*¤° [[text]] °¤*(¯´★`¯)*¤°•.",
"••.•´¯`•.•• [[text]] ••.•´¯`•.••",
"¤¸¸.•´¯`•¸¸.•..>> [[text]] <<..•.¸¸•´¯`•.¸¸¤",
"◦•●◉✿ [[text]] ✿◉●•◦",
"꧁𓊈𒆜 [[text]] 𒆜𓊉꧂",
"╚»★«╝ [[text]] ╚»★«╝",
"⫷ [[text]] ⫸",
"-·=»‡«=·- [[text]] -·=»‡«=·-",
"¸¸♬·¯·♩¸¸♪·¯·♫¸¸ [[text]] ¸¸♫·¯·♪¸¸♩·¯·♬¸¸",
"ஜ۩۞۩ஜ [[text]] ஜ۩۞۩ஜ",
"¤ (¯´☆✭.¸_)¤ [[text]] ¤(_¸.✭☆´¯) ¤",
"✿.｡.:* ☆:**:. [[text]] .:**:.☆*.:｡.✿",
".•♫•♬• [[text]] •♬•♫•."];



function wrapInFlourish(text) {
return flourishArray[Math.floor(Math.random() * flourishArray.length)].replace("[[text]]", text);
}


function wrapInSymbols(text, number) {
return randomSymbols(number) + "  " + text + "  " + randomSymbols(number)
}


function naughtyInSymbols(text, number) {
    return randomnaughtytexticon(number) + "  " + text + "  " + randomnaughtytexticon(number)
    }
function kissInSymbols(text, number) {
      return randomkisstexticon(number) + "  " + text + "  " + randomkisstexticon(number)
      } 
function loveInSymbols(text, number) {
        return randomlovetexticon(number) + "  " + text + "  " + randomlovetexticon(number)
        }        
function sadInSymbols(text, number) {
          return randomsadtexticon(number) + "  " + text + "  " + randomsadtexticon(number)
          }     
          
function cryInSymbols(text, number) {
            return randomcrytexticon(number) + "  " + text + "  " + randomcrytexticon(number)
            }   
function eatingInSymbols(text, number) {
              return randomeatingtexticon(number) + "  " + text + "  " + randomeatingtexticon(number)
              } 
function surprisedInSymbols(text, number) {
                return randomsurprisedtexticon(number) + "  " + text + "  " + randomsurprisedtexticon(number)
                } 
function cuteInSymbols(text, number) {
                  return randomcutetexticon(number) + "  " + text + "  " + randomcutetexticon(number)
                  } 
function depressedInSymbols(text, number) {
                    return randomdepressedtexticon(number) + "  " + text + "  " + randomdepressedtexticon(number)
                    } 
function goodmorningInSymbols(text, number) {
                      return randomgoodmorningtexticon(number) + "  " + text + "  " + randomgoodmorningtexticon(number)
                      } 
function goodnightInSymbols(text, number) {
                        return randomgoodnighttexticon(number) + "  " + text + "  " + randomgoodnighttexticon(number)
                        } 


function weddinganniversaryInSymbols(text, number) {
                          return randomweddinganniversarytexticon(number) + "  " + text + "  " + randomweddinganniversarytexticon(number)
                          } 
    function angryInSymbols(text, number) {
                          return randomangrytexticon(number) + "  " + text + "  " + randomangrytexticon(number)
                          }
function firework(text) {
return text.split("").join("҉") + "҉";
}


function weirdBox(text) {
return text.replace(/([^\s])/g, "[$1̲̅]");
}



function thickBox(text) {
return text.replace(/([^\s])/g, "⟦$1⟧");
}

function diametricBox(text) {
return text.replace(/([^\s])/g, "⦑$1⦒");
}

function curlybrackets(text) {
return text.replace(/([^\s])/g, "⧼$1̼⧽");
}

function arrowBox(text) {
return text.replace(/([^\s])/g, "⦏$1̂⦎");
}

function dotBoxtwo(text) {
return text.replace(/([^\s])/g, "$1̊⫶");
}

function arrowjoin(text) {
return text.replace(/([^\s])/g, "$1͎͍͐￫");
}


function zigzagJoiner(text) {
return text.replace(/([^\s])/g, "$1͛⦚");
}

function dotBox(text) {
return text.replace(/([^\s])/g, "꜍$1꜉");
}

function littleSparkles(text) {
return "˜”*°•.˜”*°• " + text + " •°*”˜.•°*”˜";
}




function kirbyHug(text) {
return "(っ◔◡◔)っ ♥ " + text + " ♥"
}




function dottyJoiner(text) {
return "░" + text.split("").join("░") + "░";
}




function wavyJoiner(text) {
return "≋" + text.split("").join("≋") + "≋";
}

function connectedJoiner(text) {
return  text.split("").join("⊶");
}

function starJoiner(text) {
return  text.split("").join("⋆");
}

function hashJoiner(text) {
return  text.split("").join("⨳");
}


function singlewavyJoiner(text) {
return "〜" + text.split("").join("∿") + "〜";
}

function diametricAngleFrame(text) {
return text.replace(/([^\s])/g, "『$1』");
}

function thickBlockFramed(text) {
return text.replace(/([^\s])/g, "【$1】");
}

/* Joiner */
function squaredot(text) {
return  text.split("").join("▪");
}
function arrowjoiner(text) {
  return text.replace(/([^\s])/g, "⤷$1⤶");
  
}
function doubleslashjoiner(text) {
  return  text.split("").join("⑊");
}
function slashjoiner(text) {
  return  text.split("").join("〵");
}
function slashboxjoiner(text) {
  return text.replace(/([^\s])/g, "⧸$1⧶");
}
function barcodejoiner(text) {
  return  text.split("").join("𝄆");
}
function italicblock(text) {
  return "◤" + text.split("").join("◢◤") + "◢";
}
function lineseparator(text) {
  return  text.split("").join("╎") ;
}
function singlelineseparator(text) {
  return  text.split("").join(" ❘ ") ;
}

/* Boxed New Added */
function brackethangtext(text) {
return text.replace(/([^\s])/g, "╟$1╢");
}
function focustext(text) {
return text.replace(/([^\s])/g, "⎡$1⎦");
}

function newsquarebracket(text) {
return text.replace(/([^\s])/g, "⁅$1⁆");
}

/* Birthday */

function birthday0(text) {
  return "🎂🥳ミ💖 "+ text +" 💖彡";
}
function birthday1(text) {
  return "(　ﾟ∀ﾟ)っ由 "+ text +" ෴❤️෴";
}
function birthday2(text) {
  return "(◞ꈍ∇ꈍ)っ🎁 "+ text +" (❛0❛⋆)";
}
function birthday3(text) {
  return ""+ text +" *･ﾟ☆ндрру(*⌒▽⌒*)b вiятнDду☆ﾟ･*";
}
function birthday4(text) {
  return "(^･ω･)ﾉ”┌iii┐♡ " + text ;
}
function birthday5(text) {
  return ""+ text +" (*≧∀≦)ﾊ┏━iiiiii━┓ﾊ(≧∇≦*) ";
}
function birthday6(text) {
  return "(•̀o•́)┌iii┐ "+ text +"";
}
function birthday7(text) {
  return "┌iii┐٩(º▽º๑)۶ "+ text +"";
}

/* Star Decorated */
function satr0(text) {
  return "ミ★ "+ text +" ★彡";
}
function satr1(text) {
  return "╰•★★  "+ text +" ★★•╯";
}
function satr2(text) {
  return "꧁•⊹٭"+ text +"٭⊹•꧂";
}
function satr3(text) {
  return "¸.·✩·.¸¸.·¯⍣✩ "+ text +" ✩⍣¯·.¸¸.·✩·.¸";
}
function satr4(text) {
  return "`✵•.¸,✵°✵.｡.✰ "+ text +" ✰.｡.✵°✵,¸.•✵´";
}
function satr5(text) {
  return "·.★·.·´¯`·.·★ "+ text +" ★·.·´¯`·.·★.·";
}
function satr6(text) {
  return "¨˜ˆ”°⍣~•✡⊹٭„¸ "+ text +" ¸„٭⊹✡•~⍣°”ˆ˜¨";
}
function satr7(text) {
  return "¸„٭⊹✡•~⍣°”ˆ˜¨ "+ text +" ¨˜ˆ”°⍣~•✡⊹٭„¸";
}
function satr8(text) {
  return "★¸.•☆•.¸★ "+ text +" ★⡀.•☆•.★";
}
function satr9(text) {
  return "٭⊹¤.•⨳•.*☆✬ "+ text +" ✬☆*.•⨳•.¤⊹٭";
}
function satr10(text) {
  return "ıllıllı⭐🌟 "+ text +" 🌟⭐ıllıllı";
}

/* Emoticon */
function em0(text) {
  return "彡(✿╹◡╹) "+ text +" (｀∀´)Ψ";
}
function em1(text) {
  return "щ（ﾟДﾟщ） < "+ text +" )";
}
function em2(text) {
  return "☞ó ͜つò☞ "+ text;
}
function em3(text) {
  return "(☝◞‸◟)☞ "+ text;
}
function em4(text) {
  return "(づ｡◕‿‿◕｡)づ "+ text +" ٩(˘◡˘)۶";
}
function em5(text) {
  return "🌘‿🌘 "+ text +" (✿ヘᴥヘ)";
}
function em6(text) {
  return "(^▽^) "+ text +" (✿^▽^)";
}
function em7(text) {
  return "(人◕‿◕) "+ text +" (•◡•)";
}

/* Heart */

function heart0(text) {
  return "(◍•ᴗ•◍) ミ💖 "+ text +" 💖彡";
}
function heart1(text) {
  return "෴❤️෴ "+ text +" ෴❤️෴";
}
function heart2(text) {
  return "💖´ *•.¸♥¸.•** "+ text +" **•.¸♥¸.•*´💖";
}
function heart3(text) {
  return "♡〜ლ(๑癶 "+ text +" 癶๑)ლ〜♡";
}
function heart4(text) {
  return "◦•●❤♡ "+ text +" ♡❤●•◦";
}
function heart5(text) {
  return "🌸ξξ(∵❤◡❤∵)ξξ·¯·♩¸ "+ text +" ¸♩·¯·ξξ(∵❤◡❤∵)ξξ🌸";
}
function heart6(text) {
  return "♥╣[-_-]╠♥ "+ text +" ♥╣[-_-]╠♥";
}
function heart7(text) {
  return "ミミ◦❧◦°˚°◦.¸¸◦°´❤*•.¸♥ "+ text +" ♥¸.•*❤´°◦¸¸.◦°˚°◦☙◦彡彡";
}


/* Mood Of Fonts */

/* Thank You */
function thankyou0(text) {
  return ""+ text +"♪(･ω･)ﾉ";
}
function thankyou1(text) {
  return "(*ˊᗜˋ*)/"+ text +"*";
}
function thankyou2(text) {
  return "(*ゝω・)ﾉ"+ text +"";
}
function thankyou3(text) {
  return "＼(´∀｀●)／"+ text +"!";
}
function thankyou4(text) {
  return "<(_ _*)> "+ text +".";
}
function thankyou5(text) {
  return "★⌒(●ゝω・)ｂ"+ text +"";
}
function thankyou6(text) {
  return "ﾟ･:,｡★＼(^-^ )♪"+ text +"♪( ^-^)/★,｡･:･ﾟ";
}
function thankyou7(text) {
  return "+｡:.ﾟヽ(*´∀)ﾉﾟ"+ text +".:｡+ﾟ";
}
/* Sad */
function sad0(text) {
  return "(◕︿◕✿) "+ text +" (๑′°︿°๑)";
}
function sad1(text) {
  return "┏༼ ◉ ╭╮ ◉༽┓ "+ text +" (︶︹︺)";
}
function sad2(text) {
  return "( ⚈̥̥̥̥̥́⌢⚈̥̥̥̥̥̀) "+ text +" ( ⚈̥̥̥̥̥́⌢⚈̥̥̥̥̥̀)";
}
function sad3(text) {
  return "( ◔ ʖ̯ ◔ ) "+ text +" ( ◔ ʖ̯ ◔ )";
}
function sad4(text) {
  return "(ಥ ͜ʖಥ) "+ text +" ٩꒰´·⌢•｀꒱۶⁼³₌₃";
}
function sad5(text) {
  return "(oꆤ︵ꆤo) "+ text +" ●︿●";
}
function sad6(text) {
  return "(′︿‵｡) "+ text +" (|||❛︵❛.)";
}
function sad7(text) {
  return "(.﹒︠₋﹒︡.) ﾟ"+ text +" （（●´∧｀●））";
}

/* Angry */
function angry0(text) {
return angryOrSymbols(randomfun(text));
}
function angry1(text) {
return angryOrSymbols(randomfun(text));

}
function angry2(text) {
return angryOrSymbols(randomfun(text));

}  

function angry3(text) {
return angryOrSymbols(randomfun(text));

} 
function angry4(text) {
return angryOrSymbols(randomfun(text));

} 
function angry5(text) {
return angryOrSymbols(randomfun(text));

} 
function angry6(text) {
return angryOrSymbols(randomfun(text));

} 

/* Naughty */
function naughty0(text) {
return naughtyOrSymbols(randomfun(text));
}
function naughty1(text) {
return naughtyOrSymbols(randomfun(text));

}
function naughty2(text) {
return naughtyOrSymbols(randomfun(text));

}  

function naughty3(text) {
return naughtyOrSymbols(randomfun(text));

} 
function naughty4(text) {
return naughtyOrSymbols(randomfun(text));

} 
function naughty5(text) {
return naughtyOrSymbols(randomfun(text));

} 
function naughty6(text) {
return naughtyOrSymbols(randomfun(text));

} 

/* kiss */
function kiss0(text) {
return kissOrSymbols(randomfun(text));
}
function kiss1(text) {
return kissOrSymbols(randomfun(text));

}
function kiss2(text) {
return kissOrSymbols(randomfun(text));

}  

function kiss3(text) {
return kissOrSymbols(randomfun(text));

} 
function kiss4(text) {
return kissOrSymbols(randomfun(text));

} 
function kiss5(text) {
return kissOrSymbols(randomfun(text));

} 
function kiss6(text) {
return kissOrSymbols(randomfun(text));

} 


/* love */
function love0(text) {
return loveOrSymbols(randomfun(text));
}
function love1(text) {
return loveOrSymbols(randomfun(text));

}
function love2(text) {
return loveOrSymbols(randomfun(text));

}  

function love3(text) {
return loveOrSymbols(randomfun(text));

} 
function love4(text) {
return loveOrSymbols(randomfun(text));

} 
function love5(text) {
return loveOrSymbols(randomfun(text));

} 
function love6(text) {
return loveOrSymbols(randomfun(text));

} 

/* sad */
function sad0(text) {
return sadOrSymbols(randomfun(text));
}
function sad1(text) {
return sadOrSymbols(randomfun(text));

}
function sad2(text) {
return sadOrSymbols(randomfun(text));

}  

function sad3(text) {
return sadOrSymbols(randomfun(text));

} 
function sad4(text) {
return sadOrSymbols(randomfun(text));

} 
function sad5(text) {
return sadOrSymbols(randomfun(text));

} 
function sad6(text) {
return sadOrSymbols(randomfun(text));

} 

/* cry */
function cry0(text) {
return cryOrSymbols(randomfun(text));
}
function cry1(text) {
return cryOrSymbols(randomfun(text));

}
function cry2(text) {
return cryOrSymbols(randomfun(text));

}  

function cry3(text) {
return cryOrSymbols(randomfun(text));

} 
function cry4(text) {
return cryOrSymbols(randomfun(text));

} 
function cry5(text) {
return cryOrSymbols(randomfun(text));

} 
function cry6(text) {
return cryOrSymbols(randomfun(text));

} 


/* eating */
function eating0(text) {
return eatingOrSymbols(randomfun(text));
}
function eating1(text) {
return eatingOrSymbols(randomfun(text));

}
function eating2(text) {
return eatingOrSymbols(randomfun(text));

}  

function eating3(text) {
return eatingOrSymbols(randomfun(text));

} 
function eating4(text) {
return eatingOrSymbols(randomfun(text));

} 
function eating5(text) {
return eatingOrSymbols(randomfun(text));

} 
function eating6(text) {
return eatingOrSymbols(randomfun(text));

} 


/* surprised */
function surprised0(text) {
return surprisedOrSymbols(randomfun(text));
}
function surprised1(text) {
return surprisedOrSymbols(randomfun(text));

}
function surprised2(text) {
return surprisedOrSymbols(randomfun(text));

}  

function surprised3(text) {
return surprisedOrSymbols(randomfun(text));

} 
function surprised4(text) {
return surprisedOrSymbols(randomfun(text));

} 
function surprised5(text) {
return surprisedOrSymbols(randomfun(text));

} 
function surprised6(text) {
return surprisedOrSymbols(randomfun(text));

} 


/* cute */
function cute0(text) {
return cuteOrSymbols(randomfun(text));
}
function cute1(text) {
return cuteOrSymbols(randomfun(text));

}
function cute2(text) {
return cuteOrSymbols(randomfun(text));

}  

function cute3(text) {
return cuteOrSymbols(randomfun(text));

} 
function cute4(text) {
return cuteOrSymbols(randomfun(text));

} 
function cute5(text) {
return cuteOrSymbols(randomfun(text));

} 
function cute6(text) {
return cuteOrSymbols(randomfun(text));

} 
function cute7(text) {
return cuteOrSymbols(randomfun(text));

} 

/* depressed */
function depressed0(text) {
return depressedOrSymbols(randomfun(text));
}
function depressed1(text) {
return depressedOrSymbols(randomfun(text));

}
function depressed2(text) {
return depressedOrSymbols(randomfun(text));

}  

function depressed3(text) {
return depressedOrSymbols(randomfun(text));

} 
function depressed4(text) {
return depressedOrSymbols(randomfun(text));

} 
function depressed5(text) {
return depressedOrSymbols(randomfun(text));

} 
function depressed6(text) {
return depressedOrSymbols(randomfun(text));

} 


/* goodmorning */
function goodmorning0(text) {
return goodmorningOrSymbols(randomfun(text));
}
function goodmorning1(text) {
return goodmorningOrSymbols(randomfun(text));

}
function goodmorning2(text) {
return goodmorningOrSymbols(randomfun(text));

}  

function goodmorning3(text) {
return goodmorningOrSymbols(randomfun(text));

} 
function goodmorning4(text) {
return goodmorningOrSymbols(randomfun(text));

} 
function goodmorning5(text) {
return goodmorningOrSymbols(randomfun(text));

} 
function goodmorning6(text) {
return goodmorningOrSymbols(randomfun(text));

} 

/* goodnight */
function goodnight0(text) {
return goodnightOrSymbols(randomfun(text));
}
function goodnight1(text) {
return goodnightOrSymbols(randomfun(text));

}
function goodnight2(text) {
return goodnightOrSymbols(randomfun(text));

}  

function goodnight3(text) {
return goodnightOrSymbols(randomfun(text));

} 
function goodnight4(text) {
return goodnightOrSymbols(randomfun(text));

} 
function goodnight5(text) {
return goodnightOrSymbols(randomfun(text));

} 
function goodnight6(text) {
return goodnightOrSymbols(randomfun(text));

} 


/* weddinganniversary */
function weddinganniversary0(text) {
return weddinganniversaryOrSymbols(randomfun(text));
}
function weddinganniversary1(text) {
return weddinganniversaryOrSymbols(randomfun(text));

}
function weddinganniversary2(text) {
return weddinganniversaryOrSymbols(randomfun(text));

}  

function weddinganniversary3(text) {
return weddinganniversaryOrSymbols(randomfun(text));

} 
function weddinganniversary4(text) {
return weddinganniversaryOrSymbols(randomfun(text));

} 
function weddinganniversary5(text) {
return weddinganniversaryOrSymbols(randomfun(text));

} 
function weddinganniversary6(text) {
return weddinganniversaryOrSymbols(randomfun(text));

} 
/* new added */
var newtext = {
s1 : {
  1 : "&alpha;", 2 : "&#4310;", 3 : "&#392;", 4 : "&#1283;", 5 : "&#1213;", 6 : "&#989;", 7 : "&#608;", 8 : "&#1291;", 9 : "&iota;", 10 : "&#669;", 11 : "&#409;", 12 : "&#645;", 13 : "&#625;", 14 : "&#627;", 15 : "&sigma;", 16 : "&rho;", 17 : "&#985;", 18 : "&#638;", 19 : "&#642;", 20 : "&#410;", 21 : "&upsilon;", 22 : "&#651;", 23 : "&#623;", 24 : "x", 25 : "&#4327;", 26 : "&#549;", 27 : "A", 28 : "B", 29 : "C", 30 : "D", 31 : "E", 32 : "F", 33 : "G", 34 : "H", 35 : "I", 36 : "J", 37 : "K", 38 : "L", 39 : "M", 40 : "N", 41 : "O", 42 : "P", 43 : "Q", 44 : "R", 45 : "S", 46 : "T", 47 : "U", 48 : "V", 49 : "W", 50 : "X", 51 : "Y", 52 : "Z", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s2 : {
1 : "&#41807;", 2 : "&#9837;", 3 : "&#9790;", 4 : "&#9687;", 5 : "&euro;", 6 : "&#988;", 7 : "&#10081;", 8 : "&#9796;", 9 : "&#9815;", 10 : "&#9834;", 11 : "&#1008;", 12 : "&#8627;", 13 : "&#9812;", 14 : "&#9835;", 15 : "&#8857;", 16 : "&rho;", 17 : "&#9773;", 18 : "&#9736;", 19 : "&#9442;", 20 : "&#9730;", 21 : "&#9739;", 22 : "&#10003;", 23 : "&omega;", 24 : "&#8984;", 25 : "&#9791;", 26 : "&#9761;", 27 : "&#41807;", 28 : "&#9837;", 29 : "&#9790;", 30 : "&#9687;", 31 : "&euro;", 32 : "&#988;", 33 : "&#10081;", 34 : "&#9796;", 35 : "&#9815;", 36 : "&#9834;", 37 : "&#1008;", 38 : "&#8627;", 39 : "&#9812;", 40 : "&#9835;", 41 : "&#8857;", 42 : "&rho;", 43 : "&#9773;", 44 : "&#9736;", 45 : "&#9442;", 46 : "&#9730;", 47 : "&#9739;", 48 : "&#10003;", 49 : "&omega;", 50 : "&#8984;", 51 : "&#9791;", 52 : "&#9761;", 53 : "&#10122;", 54 : "&#10123;", 55 : "&#10124;", 56 : "&#10125;", 57 : "&#10126;", 58 : "&#10127;", 59 : "&#10128;", 60 : "&#10129;", 61 : "&#10130;", 62 : "&#9450;"
},
s3 : {
1 : "&#258;", 2 : "&beta;", 3 : "&#268;", 4 : "&#270;", 5 : "&#276;", 6 : "&#358;", 7 : "&#286;", 8 : "&#292;", 9 : "&#296;", 10 : "&#308;", 11 : "&#310;", 12 : "&#313;", 13 : "&#1052;", 14 : "&#323;", 15 : "&#336;", 16 : "&#1056;", 17 : "Q", 18 : "&#340;", 19 : "&#346;", 20 : "&#356;", 21 : "&Uacute;", 22 : "V", 23 : "&#372;", 24 : "&#1046;", 25 : "&#374;", 26 : "&#377;", 27 : "&#258;", 28 : "&beta;", 29 : "&#268;", 30 : "&#270;", 31 : "&#276;", 32 : "&#358;", 33 : "&#286;", 34 : "&#292;", 35 : "&#296;", 36 : "&#308;", 37 : "&#310;", 38 : "&#313;", 39 : "&#1052;", 40 : "&#323;", 41 : "&#336;", 42 : "&#1056;", 43 : "Q", 44 : "&#340;", 45 : "&#346;", 46 : "&#356;", 47 : "&Uacute;", 48 : "V", 49 : "&#372;", 50 : "&#1046;", 51 : "&#374;", 52 : "&#377;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s4 : {
1 : "&#592;", 2 : "q", 3 : "&#596;", 4 : "p", 5 : "&#477;", 6 : "&#607;", 7 : "&#387;", 8 : "&#613;", 9 : "&#7433;", 10 : "&#638;", 11 : "&#670;", 12 : "l", 13 : "&#623;", 14 : "u", 15 : "o", 16 : "d", 17 : "b", 18 : "&#633;", 19 : "s", 20 : "&#647;", 21 : "n", 22 : "&#652;", 23 : "&#653;", 24 : "x", 25 : "&#654;", 26 : "z", 27 : "&#592;", 28 : "q", 29 : "&#596;", 30 : "p", 31 : "&#477;", 32 : "&#607;", 33 : "&#387;", 34 : "&#613;", 35 : "&#7433;", 36 : "&#638;", 37 : "&#670;", 38 : "l", 39 : "&#623;", 40 : "u", 41 : "o", 42 : "d", 43 : "b", 44 : "&#633;", 45 : "s", 46 : "&#647;", 47 : "n", 48 : "&#652;", 49 : "&#653;", 50 : "x", 51 : "&#654;", 52 : "z", 53 : "&#406;", 54 : "&#4357;", 55 : "&#400;", 56 : "&#12579;", 57 : "&#987;", 58 : "9", 59 : "&#12581;", 60 : "8", 61 : "6", 62 : "0"
},
s5 : {

1 : "&Delta;", 2 : "&beta;", 3 : "&#262;", 4 : "&#272;", 5 : "&euro;", 6 : "&#8355;", 7 : "&#484;", 8 : "&#294;", 9 : "&#407;", 10 : "&#308;", 11 : "&#1180;", 12 : "&#321;", 13 : "&Mu;", 14 : "&#327;", 15 : "&Oslash;", 16 : "&#420;", 17 : "&Omega;", 18 : "&#344;", 19 : "&#350;", 20 : "&#358;", 21 : "&#7918;", 22 : "V", 23 : "&#372;", 24 : "&#1046;", 25 : "&yen;", 26 : "&#381;", 27 : "&Delta;", 28 : "&beta;", 29 : "&#262;", 30 : "&#272;", 31 : "&euro;", 32 : "&#8355;", 33 : "&#484;", 34 : "&#294;", 35 : "&#407;", 36 : "&#308;", 37 : "&#1180;", 38 : "&#321;", 39 : "&Mu;", 40 : "&#327;", 41 : "&Oslash;", 42 : "&#420;", 43 : "&Omega;", 44 : "&#344;", 45 : "&#350;", 46 : "&#358;", 47 : "&#7918;", 48 : "V", 49 : "&#372;", 50 : "&#1046;", 51 : "&yen;", 52 : "&#381;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s6 : {
1 : "&alpha;", 2 : "&#595;", 3 : "&#2798;", 4 : "&part;", 5 : "&epsilon;", 6 : "&fnof;", 7 : "&#608;", 8 : "&#614;", 9 : "&#3648;", 10 : "&#669;", 11 : "&#1185;", 12 : "&#8467;", 13 : "&#625;", 14 : "&#627;", 15 : "&sigma;", 16 : "&rho;", 17 : "&phi;", 18 : "&#2792;", 19 : "&#3619;", 20 : "&#429;", 21 : "&micro;", 22 : "&#1141;", 23 : "&omega;", 24 : "&#1488;", 25 : "&#4327;", 26 : "&#438;", 27 : "&alpha;", 28 : "&#595;", 29 : "&#2798;", 30 : "&part;", 31 : "&epsilon;", 32 : "&fnof;", 33 : "&#608;", 34 : "&#614;", 35 : "&#3648;", 36 : "&#669;", 37 : "&#1185;", 38 : "&#8467;", 39 : "&#625;", 40 : "&#627;", 41 : "&sigma;", 42 : "&rho;", 43 : "&phi;", 44 : "&#2792;", 45 : "&#3619;", 46 : "&#429;", 47 : "&micro;", 48 : "&#1141;", 49 : "&omega;", 50 : "&#1488;", 51 : "&#4327;", 52 : "&#438;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s7 : {
1 : "&#5609;", 2 : "&#5623;", 3 : "&#5205;", 4 : "&#5610;", 5 : "&#5620;", 6 : "&#5556;", 7 : "&#484;", 8 : "&#5500;", 9 : "&#5029;", 10 : "&#5262;", 11 : "&#5845;", 12 : "&#5290;", 13 : "&#5616;", 14 : "&#5198;", 15 : "&#5597;", 16 : "&#5229;", 17 : "&#586;", 18 : "&#5511;", 19 : "&#5397;", 20 : "&#19973;", 21 : "&#5196;", 22 : "&#5167;", 23 : "&#5615;", 24 : "&#5741;", 25 : "&#435;", 26 : "&#20057;", 27 : "&#5609;", 28 : "&#5623;", 29 : "&#5205;", 30 : "&#5610;", 31 : "&#5620;", 32 : "&#5556;", 33 : "&#484;", 34 : "&#5500;", 35 : "&#5029;", 36 : "&#5262;", 37 : "&#5845;", 38 : "&#5290;", 39 : "&#5616;", 40 : "&#5198;", 41 : "&#5597;", 42 : "&#5229;", 43 : "&#586;", 44 : "&#5511;", 45 : "&#5397;", 46 : "&#19973;", 47 : "&#5196;", 48 : "&#5167;", 49 : "&#5615;", 50 : "&#5741;", 51 : "&#435;", 52 : "&#20057;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s8 : {
1 : "&#4315;", 2 : "&#4329;", 3 : "&#4308;", 4 : "&#4331;", 5 : "&#4318;", 6 : "f", 7 : "&#4330;", 8 : "h", 9 : "&#7990;", 10 : "&#4325;", 11 : "&kappa;", 12 : "l", 13 : "&#4317;", 14 : "&#8134;", 15 : "&otilde;", 16 : "&rho;", 17 : "&#4306;", 18 : "&Gamma;", 19 : "&#4336;", 20 : "&#3923;", 21 : "&upsilon;", 22 : "&#8023;", 23 : "w", 24 : "&#4335;", 25 : "&#4327;", 26 : "&#576;", 27 : "&#4315;", 28 : "&#4329;", 29 : "&#4308;", 30 : "&#4331;", 31 : "&#4318;", 32 : "f", 33 : "&#4330;", 34 : "h", 35 : "&#7990;", 36 : "&#4325;", 37 : "&kappa;", 38 : "l", 39 : "&#4317;", 40 : "&#8134;", 41 : "&otilde;", 42 : "&rho;", 43 : "&#4306;", 44 : "&Gamma;", 45 : "&#4336;", 46 : "&#3923;", 47 : "&upsilon;", 48 : "&#8023;", 49 : "w", 50 : "&#4335;", 51 : "&#4327;", 52 : "&#576;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s9 : {
1 : "&#940;", 2 : "&#1074;", 3 : "&sigmaf;", 4 : "&#545;", 5 : "&#941;", 6 : "&#1171;", 7 : "&#291;", 8 : "&#295;", 9 : "&#943;", 10 : "&#1112;", 11 : "&#311;", 12 : "&#315;", 13 : "&#1084;", 14 : "&#942;", 15 : "&#972;", 16 : "&rho;", 17 : "q", 18 : "&#341;", 19 : "&#351;", 20 : "&#355;", 21 : "&ugrave;", 22 : "&nu;", 23 : "&#974;", 24 : "x", 25 : "&#1095;", 26 : "&#382;", 27 : "&#940;", 28 : "&#1074;", 29 : "&sigmaf;", 30 : "&#545;", 31 : "&#941;", 32 : "&#1171;", 33 : "&#291;", 34 : "&#295;", 35 : "&#943;", 36 : "&#1112;", 37 : "&#311;", 38 : "&#315;", 39 : "&#1084;", 40 : "&#942;", 41 : "&#972;", 42 : "&rho;", 43 : "q", 44 : "&#341;", 45 : "&#351;", 46 : "&#355;", 47 : "&ugrave;", 48 : "&nu;", 49 : "&#974;", 50 : "x", 51 : "&#1095;", 52 : "&#382;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s10 : {
1 : "&#41707;", 2 : "&#41155;", 3 : "&#41976;", 4 : "&#41045;", 5 : "&#41823;", 6 : "&#41240;", 7 : "&#41037;", 8 : "&#42075;", 9 : "&#41105;", 10 : "&#41005;", 11 : "&#40983;", 12 : "&#42130;", 13 : "&#41042;", 14 : "&#41081;", 15 : "&#41346;", 16 : "&#41571;", 17 : "&#41080;", 18 : "&#42131;", 19 : "&#41754;", 20 : "&#42181;", 21 : "&#41991;", 22 : "&#41949;", 23 : "&#41296;", 24 : "&#41427;", 25 : "&#42015;", 26 : "&#41076;", 27 : "&#41707;", 28 : "&#41155;", 29 : "&#41976;", 30 : "&#41045;", 31 : "&#41823;", 32 : "&#41240;", 33 : "&#41037;", 34 : "&#42075;", 35 : "&#41105;", 36 : "&#41005;", 37 : "&#40983;", 38 : "&#42130;", 39 : "&#41042;", 40 : "&#41081;", 41 : "&#41346;", 42 : "&#41571;", 43 : "&#41080;", 44 : "&#42131;", 45 : "&#41754;", 46 : "&#42181;", 47 : "&#41991;", 48 : "&#41949;", 49 : "&#41296;", 50 : "&#41427;", 51 : "&#42015;", 52 : "&#41076;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s11 : {
1 : "&#1044;", 2 : "&#1041;", 3 : "C", 4 : "D", 5 : "&Xi;", 6 : "F", 7 : "G", 8 : "H", 9 : "I", 10 : "J", 11 : "&#1180;", 12 : "L", 13 : "M", 14 : "&#1048;", 15 : "&#1060;", 16 : "P", 17 : "&#490;", 18 : "&#1071;", 19 : "S", 20 : "&Gamma;", 21 : "&#1062;", 22 : "V", 23 : "&#1065;", 24 : "&#1046;", 25 : "&#1059;", 26 : "Z", 27 : "&#1044;", 28 : "&#1041;", 29 : "C", 30 : "D", 31 : "&Xi;", 32 : "F", 33 : "G", 34 : "H", 35 : "I", 36 : "J", 37 : "&#1180;", 38 : "L", 39 : "M", 40 : "&#1048;", 41 : "&#1060;", 42 : "P", 43 : "&#490;", 44 : "&#1071;", 45 : "S", 46 : "&Gamma;", 47 : "&#1062;", 48 : "V", 49 : "&#1065;", 50 : "&#1046;", 51 : "&#1059;", 52 : "Z", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s12 : {
1 : "&#41807;", 2 : "&#41731;", 3 : "&#41555;", 4 : "&#41016;", 5 : "&#41823;", 6 : "&#41863;", 7 : "&#41029;", 8 : "&#41157;", 9 : "&#40996;", 10 : "&#41005;", 11 : "&#40984;", 12 : "&#42130;", 13 : "&#41141;", 14 : "&#41508;", 15 : "&#41126;", 16 : "&#41571;", 17 : "&#41392;", 18 : "&#41706;", 19 : "&#41751;", 20 : "&#42180;", 21 : "&#40974;", 22 : "&#41204;", 23 : "&#41295;", 24 : "&#41660;", 25 : "&#41769;", 26 : "&#41076;", 27 : "&#41807;", 28 : "&#41731;", 29 : "&#41555;", 30 : "&#41016;", 31 : "&#41823;", 32 : "&#41863;", 33 : "&#41029;", 34 : "&#41157;", 35 : "&#40996;", 36 : "&#41005;", 37 : "&#40984;", 38 : "&#42130;", 39 : "&#41141;", 40 : "&#41508;", 41 : "&#41126;", 42 : "&#41571;", 43 : "&#41392;", 44 : "&#41706;", 45 : "&#41751;", 46 : "&#42180;", 47 : "&#40974;", 48 : "&#41204;", 49 : "&#41295;", 50 : "&#41660;", 51 : "&#41769;", 52 : "&#41076;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s13 : {
1 : "&#41708;", 2 : "&#41203;", 3 : "&#41556;", 4 : "&#42159;", 5 : "&#41922;", 6 : "&#41648;", 7 : "&#41804;", 8 : "&#41053;", 9 : "&#42128;", 10 : "&#42171;", 11 : "&#40984;", 12 : "&#42130;", 13 : "&#41141;", 14 : "&#41674;", 15 : "&#41266;", 16 : "&#41571;", 17 : "&#41392;", 18 : "&#41706;", 19 : "&#41433;", 20 : "&#42180;", 21 : "&#42148;", 22 : "&#42150;", 23 : "&#41296;", 24 : "&#41575;", 25 : "&#41766;", 26 : "&#41076;", 27 : "&#41708;", 28 : "&#41203;", 29 : "&#41556;", 30 : "&#42159;", 31 : "&#41922;", 32 : "&#41648;", 33 : "&#41804;", 34 : "&#41053;", 35 : "&#42128;", 36 : "&#42171;", 37 : "&#40984;", 38 : "&#42130;", 39 : "&#41141;", 40 : "&#41674;", 41 : "&#41266;", 42 : "&#41571;", 43 : "&#41392;", 44 : "&#41706;", 45 : "&#41433;", 46 : "&#42180;", 47 : "&#42148;", 48 : "&#42150;", 49 : "&#41296;", 50 : "&#41575;", 51 : "&#41766;", 52 : "&#41076;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s14 : {
1 : "&Lambda;", 2 : "&#998;", 3 : "&#12552;", 4 : "&ETH;", 5 : "&#400;", 6 : "F", 7 : "&#403;", 8 : "&#1085;", 9 : "&#618;", 10 : "&#65420;", 11 : "&#1178;", 12 : "&#321;", 13 : "&#3057;", 14 : "&#1051;", 15 : "&Oslash;", 16 : "&thorn;", 17 : "&#1192;", 18 : "&#23610;", 19 : "&#12425;", 20 : "&#356;", 21 : "&#1062;", 22 : "&#404;", 23 : "&#412;", 24 : "&chi;", 25 : "&#996;", 26 : "&#7828;", 27 : "&Lambda;", 28 : "&#998;", 29 : "&#12552;", 30 : "&ETH;", 31 : "&#400;", 32 : "F", 33 : "&#403;", 34 : "&#1085;", 35 : "&#618;", 36 : "&#65420;", 37 : "&#1178;", 38 : "&#321;", 39 : "&#3057;", 40 : "&#1051;", 41 : "&Oslash;", 42 : "&thorn;", 43 : "&#1192;", 44 : "&#23610;", 45 : "&#12425;", 46 : "&#356;", 47 : "&#1062;", 48 : "&#404;", 49 : "&#412;", 50 : "&chi;", 51 : "&#996;", 52 : "&#7828;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s15 : {
1 : "&#411;", 2 : "&#385;", 3 : "&#391;", 4 : "&#394;", 5 : "&#1028;", 6 : "&#401;", 7 : "&#403;", 8 : "&#1223;", 9 : "&#406;", 10 : "&#646;", 11 : "&#408;", 12 : "&#1340;", 13 : "M", 14 : "&#413;", 15 : "&#416;", 16 : "&#420;", 17 : "&#418;", 18 : "&#422;", 19 : "&#423;", 20 : "&#428;", 21 : "&#434;", 22 : "&#404;", 23 : "&#412;", 24 : "&#1202;", 25 : "&#435;", 26 : "&#548;", 27 : "&#411;", 28 : "&#385;", 29 : "&#391;", 30 : "&#394;", 31 : "&#1028;", 32 : "&#401;", 33 : "&#403;", 34 : "&#1223;", 35 : "&#406;", 36 : "&#646;", 37 : "&#408;", 38 : "&#1340;", 39 : "M", 40 : "&#413;", 41 : "&#416;", 42 : "&#420;", 43 : "&#418;", 44 : "&#422;", 45 : "&#423;", 46 : "&#428;", 47 : "&#434;", 48 : "&#404;", 49 : "&#412;", 50 : "&#1202;", 51 : "&#435;", 52 : "&#548;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s16 : {
1 : "&#41074;", 2 : "&#41712;", 3 : "&#41007;", 4 : "&#41120;", 5 : "&#41532;", 6 : "&#41246;", 7 : "&#41029;", 8 : "&#41833;", 9 : "&#41105;", 10 : "&#42171;", 11 : "&#40983;", 12 : "&#42130;", 13 : "&#41141;", 14 : "&#41674;", 15 : "&#41126;", 16 : "&#41571;", 17 : "&#41079;", 18 : "&#41733;", 19 : "&#41754;", 20 : "&#41686;", 21 : "&#41991;", 22 : "&#41008;", 23 : "&#41295;", 24 : "&#41426;", 25 : "&#42014;", 26 : "&#41076;", 27 : "&#41074;", 28 : "&#41712;", 29 : "&#41007;", 30 : "&#41120;", 31 : "&#41532;", 32 : "&#41246;", 33 : "&#41029;", 34 : "&#41833;", 35 : "&#41105;", 36 : "&#42171;", 37 : "&#40983;", 38 : "&#42130;", 39 : "&#41141;", 40 : "&#41674;", 41 : "&#41126;", 42 : "&#41571;", 43 : "&#41079;", 44 : "&#41733;", 45 : "&#41754;", 46 : "&#41686;", 47 : "&#41991;", 48 : "&#41008;", 49 : "&#41295;", 50 : "&#41426;", 51 : "&#42014;", 52 : "&#41076;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s17 : {
1 : "&#1337;", 2 : "&#1349;", 3 : "&#1351;", 4 : "&#1338;", 5 : "&#541;", 6 : "&#1330;", 7 : "&#1331;", 8 : "&#615;", 9 : "&#639;", 10 : "&#669;", 11 : "&#409;", 12 : "&#645;", 13 : "&#653;", 14 : "&#1356;", 15 : "&#1342;", 16 : "&rho;", 17 : "&phi;", 18 : "&#1360;", 19 : "&#1359;", 20 : "&#1333;", 21 : "&#1348;", 22 : "&#1506;", 23 : "&#1377;", 24 : "&#1347;", 25 : "&#1358;", 26 : "&#1344;", 27 : "&#1337;", 28 : "&#1349;", 29 : "&#1351;", 30 : "&#1338;", 31 : "&#541;", 32 : "&#1330;", 33 : "&#1331;", 34 : "&#615;", 35 : "&#639;", 36 : "&#669;", 37 : "&#409;", 38 : "&#645;", 39 : "&#653;", 40 : "&#1356;", 41 : "&#1342;", 42 : "&rho;", 43 : "&phi;", 44 : "&#1360;", 45 : "&#1359;", 46 : "&#1333;", 47 : "&#1348;", 48 : "&#1506;", 49 : "&#1377;", 50 : "&#1347;", 51 : "&#1358;", 52 : "&#1344;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s18 : {
1 : "&alpha;", 2 : "&szlig;", 3 : "&sigmaf;", 4 : "d", 5 : "&epsilon;", 6 : "&fnof;", 7 : "g", 8 : "h", 9 : "&iuml;", 10 : "&#1397;", 11 : "&kappa;", 12 : "&#65434;", 13 : "m", 14 : "&eta;", 15 : "&oplus;", 16 : "p", 17 : "&Omega;", 18 : "r", 19 : "&scaron;", 20 : "&dagger;", 21 : "u", 22 : "&forall;", 23 : "&omega;", 24 : "x", 25 : "&psi;", 26 : "z", 27 : "&alpha;", 28 : "&szlig;", 29 : "&sigmaf;", 30 : "d", 31 : "&epsilon;", 32 : "&fnof;", 33 : "g", 34 : "h", 35 : "&iuml;", 36 : "&#1397;", 37 : "&kappa;", 38 : "&#65434;", 39 : "m", 40 : "&eta;", 41 : "&oplus;", 42 : "p", 43 : "&Omega;", 44 : "r", 45 : "&scaron;", 46 : "&dagger;", 47 : "u", 48 : "&forall;", 49 : "&omega;", 50 : "x", 51 : "&psi;", 52 : "z", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s19 : {
1 : "&#3588;", 2 : "&#4330;", 3 : "&#2414;", 4 : "&#4331;", 5 : "&#2799;", 6 : "&#1330;", 7 : "&#2797;", 8 : "&#1210;", 9 : "&#639;", 10 : "&#646;", 11 : "&#1179;", 12 : "&#1350;", 13 : "&#625;", 14 : "&#1352;", 15 : "&#2790;", 16 : "&#447;", 17 : "&#1193;", 18 : "&#1360;", 19 : "&sigmaf;", 20 : "&#2670;", 21 : "&upsilon;", 22 : "&#3182;", 23 : "&omega;", 24 : "&#2794;", 25 : "&#1506;", 26 : "&#2749;", 27 : "&#3588;", 28 : "&#4330;", 29 : "&#2414;", 30 : "&#4331;", 31 : "&#2799;", 32 : "&#1330;", 33 : "&#2797;", 34 : "&#1210;", 35 : "&#639;", 36 : "&#646;", 37 : "&#1179;", 38 : "&#1350;", 39 : "&#625;", 40 : "&#1352;", 41 : "&#2790;", 42 : "&#447;", 43 : "&#1193;", 44 : "&#1360;", 45 : "&sigmaf;", 46 : "&#2670;", 47 : "&upsilon;", 48 : "&#3182;", 49 : "&omega;", 50 : "&#2794;", 51 : "&#1506;", 52 : "&#2749;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s20 : {
1 : "&#1072;", 2 : "&#1073;", 3 : "c", 4 : "&#1076;", 5 : "&#1105;", 6 : "f", 7 : "g", 8 : "&#1085;", 9 : "&#1111;", 10 : "j", 11 : "&#1082;", 12 : "&#1075;", 13 : "&#1131;", 14 : "&#1087;", 15 : "&#1139;", 16 : "p", 17 : "&#1092;", 18 : "&#1103;", 19 : "$", 20 : "&#1090;", 21 : "&#1094;", 22 : "&#1141;", 23 : "&#1097;", 24 : "&#1078;", 25 : "&#1095;", 26 : "&#1079;", 27 : "&#1040;", 28 : "&#1041;", 29 : "C", 30 : "&#1044;", 31 : "&#1028;", 32 : "F", 33 : "G", 34 : "H", 35 : "&#1031;", 36 : "J", 37 : "&#1050;", 38 : "&#1043;", 39 : "&#1130;", 40 : "&#1049;", 41 : "&#1138;", 42 : "P", 43 : "&#1060;", 44 : "&#1071;", 45 : "$", 46 : "T", 47 : "&#1062;", 48 : "&#1140;", 49 : "&#1064;", 50 : "&#1046;", 51 : "&#1063;", 52 : "&#1047;", 53 : '1', 54 : '2', 55 : '3', 56 : '4', 57 : '5', 58 : '6', 59 : '7', 60 : '8', 61 : '9', 62 : '0'
},
s21 : {
1 : "a&#830;", 2 : "b&#830;", 3 : "c&#830;", 4 : "d&#830;", 5 : "e&#830;", 6 : "f&#830;", 7 : "g&#830;", 8 : "h&#830;", 9 : "i&#830;", 10 : "j&#830;", 11 : "k&#830;", 12 : "l&#830;", 13 : "m&#830;", 14 : "n&#830;", 15 : "o&#830;", 16 : "p&#830;", 17 : "q&#830;", 18 : "r&#830;", 19 : "s&#830;", 20 : "t&#830;", 21 : "u&#830;", 22 : "v&#830;", 23 : "w&#830;", 24 : "x&#830;", 25 : "y&#830;", 26 : "z&#830;", 27 : "A&#830;", 28 : "B&#830;", 29 : "C&#830;", 30 : "D&#830;", 31 : "E&#830;", 32 : "F&#830;", 33 : "G&#830;", 34 : "H&#830;", 35 : "I&#830;", 36 : "J&#830;", 37 : "K&#830;", 38 : "L&#830;", 39 : "M&#830;", 40 : "N&#830;", 41 : "O&#830;", 42 : "P&#830;", 43 : "Q&#830;", 44 : "R&#830;", 45 : "S&#830;", 46 : "T&#830;", 47 : "U&#830;", 48 : "V&#830;", 49 : "W&#830;", 50 : "X&#830;", 51 : "Y&#830;", 52 : "Z&#830;", 53 : "1&#830;", 54 : "2&#830;", 55 : "3&#830;", 56 : "4&#830;", 57 : "5&#830;", 58 : "6&#830;", 59 : "7&#830;", 60 : "8&#830;", 61 : "9&#830;", 62 : "0&#830;"
},
s22 : {
1 : "a&#838;", 2 : "b&#838;", 3 : "c&#838;", 4 : "d&#838;", 5 : "e&#838;", 6 : "f&#838;", 7 : "g&#838;", 8 : "h&#838;", 9 : "i&#838;", 10 : "j&#838;", 11 : "k&#838;", 12 : "l&#838;", 13 : "m&#838;", 14 : "n&#838;", 15 : "o&#838;", 16 : "p&#838;", 17 : "q&#838;", 18 : "r&#838;", 19 : "s&#838;", 20 : "t&#838;", 21 : "u&#838;", 22 : "v&#838;", 23 : "w&#838;", 24 : "x&#838;", 25 : "y&#838;", 26 : "z&#838;", 27 : "A&#838;", 28 : "B&#838;", 29 : "C&#838;", 30 : "D&#838;", 31 : "E&#838;", 32 : "F&#838;", 33 : "G&#838;", 34 : "H&#838;", 35 : "I&#838;", 36 : "J&#838;", 37 : "K&#838;", 38 : "L&#838;", 39 : "M&#838;", 40 : "N&#838;", 41 : "O&#838;", 42 : "P&#838;", 43 : "Q&#838;", 44 : "R&#838;", 45 : "S&#838;", 46 : "T&#838;", 47 : "U&#838;", 48 : "V&#838;", 49 : "W&#838;", 50 : "X&#838;", 51 : "Y&#838;", 52 : "Z&#838;", 53 : "1&#838;", 54 : "2&#838;", 55 : "3&#838;", 56 : "4&#838;", 57 : "5&#838;", 58 : "6&#838;", 59 : "7&#838;", 60 : "8&#838;", 61 : "9&#838;", 62 : "0&#838;"
},
s23 : {
1 : "a&#826;", 2 : "b&#826;", 3 : "c&#826;", 4 : "d&#826;", 5 : "e&#826;", 6 : "f&#826;", 7 : "g&#826;", 8 : "h&#826;", 9 : "i&#826;", 10 : "j&#826;", 11 : "k&#826;", 12 : "l&#826;", 13 : "m&#826;", 14 : "n&#826;", 15 : "o&#826;", 16 : "p&#826;", 17 : "q&#826;", 18 : "r&#826;", 19 : "s&#826;", 20 : "t&#826;", 21 : "u&#826;", 22 : "v&#826;", 23 : "w&#826;", 24 : "x&#826;", 25 : "y&#826;", 26 : "z&#826;", 27 : "A&#826;", 28 : "B&#826;", 29 : "C&#826;", 30 : "D&#826;", 31 : "E&#826;", 32 : "F&#826;", 33 : "G&#826;", 34 : "H&#826;", 35 : "I&#826;", 36 : "J&#826;", 37 : "K&#826;", 38 : "L&#826;", 39 : "M&#826;", 40 : "N&#826;", 41 : "O&#826;", 42 : "P&#826;", 43 : "Q&#826;", 44 : "R&#826;", 45 : "S&#826;", 46 : "T&#826;", 47 : "U&#826;", 48 : "V&#826;", 49 : "W&#826;", 50 : "X&#826;", 51 : "Y&#826;", 52 : "Z&#826;", 53 : "1&#826;", 54 : "2&#826;", 55 : "3&#826;", 56 : "4&#826;", 57 : "5&#826;", 58 : "6&#826;", 59 : "7&#826;", 60 : "8&#826;", 61 : "9&#826;", 62 : "0&#826;"
},
s24 : {
1 : "a&#857;", 2 : "b&#857;", 3 : "c&#857;", 4 : "d&#857;", 5 : "e&#857;", 6 : "f&#857;", 7 : "g&#857;", 8 : "h&#857;", 9 : "i&#857;", 10 : "j&#857;", 11 : "k&#857;", 12 : "l&#857;", 13 : "m&#857;", 14 : "n&#857;", 15 : "o&#857;", 16 : "p&#857;", 17 : "q&#857;", 18 : "r&#857;", 19 : "s&#857;", 20 : "t&#857;", 21 : "u&#857;", 22 : "v&#857;", 23 : "w&#857;", 24 : "x&#857;", 25 : "y&#857;", 26 : "z&#857;", 27 : "A&#857;", 28 : "B&#857;", 29 : "C&#857;", 30 : "D&#857;", 31 : "E&#857;", 32 : "F&#857;", 33 : "G&#857;", 34 : "H&#857;", 35 : "I&#857;", 36 : "J&#857;", 37 : "K&#857;", 38 : "L&#857;", 39 : "M&#857;", 40 : "N&#857;", 41 : "O&#857;", 42 : "P&#857;", 43 : "Q&#857;", 44 : "R&#857;", 45 : "S&#857;", 46 : "T&#857;", 47 : "U&#857;", 48 : "V&#857;", 49 : "W&#857;", 50 : "X&#857;", 51 : "Y&#857;", 52 : "Z&#857;", 53 : "1&#857;", 54 : "2&#857;", 55 : "3&#857;", 56 : "4&#857;", 57 : "5&#857;", 58 : "6&#857;", 59 : "7&#857;", 60 : "8&#857;", 61 : "9&#857;", 62 : "0&#857;"
},
s25 : {
1 : "a&#799;", 2 : "b&#799;", 3 : "c&#799;", 4 : "d&#799;", 5 : "e&#799;", 6 : "f&#799;", 7 : "g&#799;", 8 : "h&#799;", 9 : "i&#799;", 10 : "j&#799;", 11 : "k&#799;", 12 : "l&#799;", 13 : "m&#799;", 14 : "n&#799;", 15 : "o&#799;", 16 : "p&#799;", 17 : "q&#799;", 18 : "r&#799;", 19 : "s&#799;", 20 : "t&#799;", 21 : "u&#799;", 22 : "v&#799;", 23 : "w&#799;", 24 : "x&#799;", 25 : "y&#799;", 26 : "z&#799;", 27 : "A&#799;", 28 : "B&#799;", 29 : "C&#799;", 30 : "D&#799;", 31 : "E&#799;", 32 : "F&#799;", 33 : "G&#799;", 34 : "H&#799;", 35 : "I&#799;", 36 : "J&#799;", 37 : "K&#799;", 38 : "L&#799;", 39 : "M&#799;", 40 : "N&#799;", 41 : "O&#799;", 42 : "P&#799;", 43 : "Q&#799;", 44 : "R&#799;", 45 : "S&#799;", 46 : "T&#799;", 47 : "U&#799;", 48 : "V&#799;", 49 : "W&#799;", 50 : "X&#799;", 51 : "Y&#799;", 52 : "Z&#799;", 53 : "1&#799;", 54 : "2&#799;", 55 : "3&#799;", 56 : "4&#799;", 57 : "5&#799;", 58 : "6&#799;", 59 : "7&#799;", 60 : "8&#799;", 61 : "9&#799;", 62 : "0&#799;"
},
s26 : {
1 : "a&#846;", 2 : "b&#846;", 3 : "c&#846;", 4 : "d&#846;", 5 : "e&#846;", 6 : "f&#846;", 7 : "g&#846;", 8 : "h&#846;", 9 : "i&#846;", 10 : "j&#846;", 11 : "k&#846;", 12 : "l&#846;", 13 : "m&#846;", 14 : "n&#846;", 15 : "o&#846;", 16 : "p&#846;", 17 : "q&#846;", 18 : "r&#846;", 19 : "s&#846;", 20 : "t&#846;", 21 : "u&#846;", 22 : "v&#846;", 23 : "w&#846;", 24 : "x&#846;", 25 : "y&#846;", 26 : "z&#846;", 27 : "A&#846;", 28 : "B&#846;", 29 : "C&#846;", 30 : "D&#846;", 31 : "E&#846;", 32 : "F&#846;", 33 : "G&#846;", 34 : "H&#846;", 35 : "I&#846;", 36 : "J&#846;", 37 : "K&#846;", 38 : "L&#846;", 39 : "M&#846;", 40 : "N&#846;", 41 : "O&#846;", 42 : "P&#846;", 43 : "Q&#846;", 44 : "R&#846;", 45 : "S&#846;", 46 : "T&#846;", 47 : "U&#846;", 48 : "V&#846;", 49 : "W&#846;", 50 : "X&#846;", 51 : "Y&#846;", 52 : "Z&#846;", 53 : "1&#846;", 54 : "2&#846;", 55 : "3&#846;", 56 : "4&#846;", 57 : "5&#846;", 58 : "6&#846;", 59 : "7&#846;", 60 : "8&#846;", 61 : "9&#846;", 62 : "0&#846;"
},
s27 : {
1 : "a&#829;&#851;", 2 : "b&#829;&#851;", 3 : "c&#829;&#851;", 4 : "d&#829;&#851;", 5 : "e&#829;&#851;", 6 : "f&#829;&#851;", 7 : "g&#829;&#851;", 8 : "h&#829;&#851;", 9 : "i&#829;&#851;", 10 : "j&#829;&#851;", 11 : "k&#829;&#851;", 12 : "l&#829;&#851;", 13 : "m&#829;&#851;", 14 : "n&#829;&#851;", 15 : "o&#829;&#851;", 16 : "p&#829;&#851;", 17 : "q&#829;&#851;", 18 : "r&#829;&#851;", 19 : "s&#829;&#851;", 20 : "t&#829;&#851;", 21 : "u&#829;&#851;", 22 : "v&#829;&#851;", 23 : "w&#829;&#851;", 24 : "x&#829;&#851;", 25 : "y&#829;&#851;", 26 : "z&#829;&#851;", 27 : "A&#829;&#851;", 28 : "B&#829;&#851;", 29 : "C&#829;&#851;", 30 : "D&#829;&#851;", 31 : "E&#829;&#851;", 32 : "F&#829;&#851;", 33 : "G&#829;&#851;", 34 : "H&#829;&#851;", 35 : "I&#829;&#851;", 36 : "J&#829;&#851;", 37 : "K&#829;&#851;", 38 : "L&#829;&#851;", 39 : "M&#829;&#851;", 40 : "N&#829;&#851;", 41 : "O&#829;&#851;", 42 : "P&#829;&#851;", 43 : "Q&#829;&#851;", 44 : "R&#829;&#851;", 45 : "S&#829;&#851;", 46 : "T&#829;&#851;", 47 : "U&#829;&#851;", 48 : "V&#829;&#851;", 49 : "W&#829;&#851;", 50 : "X&#829;&#851;", 51 : "Y&#829;&#851;", 52 : "Z&#829;&#851;", 53 : "1&#829;&#851;", 54 : "2&#829;&#851;", 55 : "3&#829;&#851;", 56 : "4&#829;&#851;", 57 : "5&#829;&#851;", 58 : "6&#829;&#851;", 59 : "7&#829;&#851;", 60 : "8&#829;&#851;", 61 : "9&#829;&#851;", 62 : "0&#829;&#851;"
},
s29 : {
1 : "&#120458;&#823;", 2 : "&#120459;&#823;", 3 : "&#120460;&#823;", 4 : "&#120461;&#823;", 5 : "&#120462;&#823;", 6 : "&#120463;&#823;", 7 : "&#120464;&#823;", 8 : "&#120465;&#823;", 9 : "&#120466;&#823;", 10 : "&#120467;&#823;", 11 : "&#120468;&#823;", 12 : "&#120469;&#823;", 13 : "&#120470;&#823;", 14 : "&#120471;&#823;", 15 : "&#120472;&#823;", 16 : "&#120473;&#823;", 17 : "&#120474;&#823;", 18 : "&#120475;&#823;", 19 : "&#120476;&#823;", 20 : "&#120477;&#823;", 21 : "&#120478;&#823;", 22 : "&#120479;&#823;", 23 : "&#120480;&#823;", 24 : "&#120481;&#823;", 25 : "&#120482;&#823;", 26 : "&#120483;&#823;", 27 : "&#120432;&#823;", 28 : "&#120433;&#823;", 29 : "&#120434;&#823;", 30 : "&#120435;&#823;", 31 : "&#120436;&#823;", 32 : "&#120437;&#823;", 33 : "&#120438;&#823;", 34 : "&#120439;&#823;", 35 : "&#120440;&#823;", 36 : "&#120441;&#823;", 37 : "&#120442;&#823;", 38 : "&#120443;&#823;", 39 : "&#120444;&#823;", 40 : "&#120445;&#823;", 41 : "&#120446;&#823;", 42 : "&#120447;&#823;", 43 : "&#120448;&#823;", 44 : "&#120449;&#823;", 45 : "&#120450;&#823;", 46 : "&#120451;&#823;", 47 : "&#120452;&#823;", 48 : "&#120453;&#823;", 49 : "&#120454;&#823;", 50 : "&#120455;&#823;", 51 : "&#120456;&#823;", 52 : "&#120457;&#823;", 53 : "&#120823;&#823;", 54 : "&#120824;&#823;", 55 : "&#120825;&#823;", 56 : "&#120826;&#823;", 57 : "&#120827;&#823;", 58 : "&#120828;&#823;", 59 : "&#120829;&#823;", 60 : "&#120830;&#823;", 61 : "&#120831;&#823;", 62 : "&#120822;&#823;"
},
s30 : {
1 : "a&#866;", 2 : "b&#866;", 3 : "c&#866;", 4 : "d&#866;", 5 : "e&#866;", 6 : "f&#866;", 7 : "g&#866;", 8 : "h&#866;", 9 : "i&#866;", 10 : "j&#866;", 11 : "k&#866;", 12 : "l&#866;", 13 : "m&#866;", 14 : "n&#866;", 15 : "o&#866;", 16 : "p&#866;", 17 : "q&#866;", 18 : "r&#866;", 19 : "s&#866;", 20 : "t&#866;", 21 : "u&#866;", 22 : "v&#866;", 23 : "w&#866;", 24 : "x&#866;", 25 : "y&#866;", 26 : "z&#866;", 27 : "A&#866;", 28 : "B&#866;", 29 : "C&#866;", 30 : "D&#866;", 31 : "E&#866;", 32 : "F&#866;", 33 : "G&#866;", 34 : "H&#866;", 35 : "I&#866;", 36 : "J&#866;", 37 : "K&#866;", 38 : "L&#866;", 39 : "M&#866;", 40 : "N&#866;", 41 : "O&#866;", 42 : "P&#866;", 43 : "Q&#866;", 44 : "R&#866;", 45 : "S&#866;", 46 : "T&#866;", 47 : "U&#866;", 48 : "V&#866;", 49 : "W&#866;", 50 : "X&#866;", 51 : "Y&#866;", 52 : "Z&#866;", 53 : "1&#866;", 54 : "2&#866;", 55 : "3&#866;", 56 : "4&#866;", 57 : "5&#866;", 58 : "6&#866;", 59 : "7&#866;", 60 : "8&#866;", 61 : "9&#866;", 62 : "0&#866;"
},
s31 : {
1 : "a&#828;", 2 : "b&#828;", 3 : "c&#828;", 4 : "d&#828;", 5 : "e&#828;", 6 : "f&#828;", 7 : "g&#828;", 8 : "h&#828;", 9 : "i&#828;", 10 : "j&#828;", 11 : "k&#828;", 12 : "l&#828;", 13 : "m&#828;", 14 : "n&#828;", 15 : "o&#828;", 16 : "p&#828;", 17 : "q&#828;", 18 : "r&#828;", 19 : "s&#828;", 20 : "t&#828;", 21 : "u&#828;", 22 : "v&#828;", 23 : "w&#828;", 24 : "x&#828;", 25 : "y&#828;", 26 : "z&#828;", 27 : "A&#828;", 28 : "B&#828;", 29 : "C&#828;", 30 : "D&#828;", 31 : "E&#828;", 32 : "F&#828;", 33 : "G&#828;", 34 : "H&#828;", 35 : "I&#828;", 36 : "J&#828;", 37 : "K&#828;", 38 : "L&#828;", 39 : "M&#828;", 40 : "N&#828;", 41 : "O&#828;", 42 : "P&#828;", 43 : "Q&#828;", 44 : "R&#828;", 45 : "S&#828;", 46 : "T&#828;", 47 : "U&#828;", 48 : "V&#828;", 49 : "W&#828;", 50 : "X&#828;", 51 : "Y&#828;", 52 : "Z&#828;", 53 : "1&#828;", 54 : "2&#828;", 55 : "3&#828;", 56 : "4&#828;", 57 : "5&#828;", 58 : "6&#828;", 59 : "7&#828;", 60 : "8&#828;", 61 : "9&#828;", 62 : "0&#828;"
},
}

function aryagen(intext, id) {

var text = "";

var intext = intext;
if (intext.length == 0) return;

for (i = 0; i < intext.length; i++) {
    var c = intext.charAt(i),
        loc = normal.indexOf(c) +1;
    if( c == ' '){
      text += ' ';
    }else if( !loc ){
      text += c;
    }else{
      text += newtext[id][loc];
    }

}
return text;
}


/* eslint-disable */
const futureAlienCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "ᗩ", "b": "ᗷ", "c": "ᑢ", "d": "ᕲ", "e": "ᘿ", "f": "ᖴ", "g": "ᘜ", "h": "ᕼ", "i": "ᓰ", "j": "ᒚ", "k": "ᖽᐸ", "l": "ᒪ", "m": "ᘻ", "n": "ᘉ", "o": "ᓍ", "p": "ᕵ", "q": "ᕴ", "r": "ᖇ", "s": "S", "t": "ᖶ", "u": "ᑘ", "v": "ᐺ", "w": "ᘺ", "x": "᙭", "y": "ᖻ", "z": "ᗱ", "A": "ᗩ", "B": "ᗷ", "C": "ᑢ", "D": "ᕲ", "E": "ᘿ", "F": "ᖴ", "G": "ᘜ", "H": "ᕼ", "I": "ᓰ", "J": "ᒚ", "K": "ᖽᐸ", "L": "ᒪ", "M": "ᘻ", "N": "ᘉ", "O": "ᓍ", "P": "ᕵ", "Q": "ᕴ", "R": "ᖇ", "S": "S", "T": "ᖶ", "U": "ᑘ", "V": "ᐺ", "W": "ᘺ", "X": "᙭", "Y": "ᖻ", "Z": "ᗱ" };
const squiggle6CharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "ค", "b": "๖", "c": "¢", "d": "໓", "e": "ē", "f": "f", "g": "ງ", "h": "h", "i": "i", "j": "ว", "k": "k", "l": "l", "m": "๓", "n": "ຖ", "o": "໐", "p": "p", "q": "๑", "r": "r", "s": "Ş", "t": "t", "u": "น", "v": "ง", "w": "ຟ", "x": "x", "y": "ฯ", "z": "ຊ", "A": "ค", "B": "๖", "C": "¢", "D": "໓", "E": "ē", "F": "f", "G": "ງ", "H": "h", "I": "i", "J": "ว", "K": "k", "L": "l", "M": "๓", "N": "ຖ", "O": "໐", "P": "p", "Q": "๑", "R": "r", "S": "Ş", "T": "t", "U": "น", "V": "ง", "W": "ຟ", "X": "x", "Y": "ฯ", "Z": "ຊ" };
const squiggle5CharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "ą", "b": "ც", "c": "ƈ", "d": "ɖ", "e": "ɛ", "f": "ʄ", "g": "ɠ", "h": "ɧ", "i": "ı", "j": "ʝ", "k": "ƙ", "l": "Ɩ", "m": "ɱ", "n": "ŋ", "o": "ơ", "p": "℘", "q": "զ", "r": "ཞ", "s": "ʂ", "t": "ɬ", "u": "ų", "v": "۷", "w": "ῳ", "x": "ҳ", "y": "ყ", "z": "ʑ", "A": "ą", "B": "ც", "C": "ƈ", "D": "ɖ", "E": "ɛ", "F": "ʄ", "G": "ɠ", "H": "ɧ", "I": "ı", "J": "ʝ", "K": "ƙ", "L": "Ɩ", "M": "ɱ", "N": "ŋ", "O": "ơ", "P": "℘", "Q": "զ", "R": "ཞ", "S": "ʂ", "T": "ɬ", "U": "ų", "V": "۷", "W": "ῳ", "X": "ҳ", "Y": "ყ", "Z": "ʑ" };
const asianStyle2CharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "ﾑ", "b": "乃", "c": "ᄃ", "d": "り", "e": "乇", "f": "ｷ", "g": "ム", "h": "ん", "i": "ﾉ", "j": "ﾌ", "k": "ズ", "l": "ﾚ", "m": "ﾶ", "n": "刀", "o": "の", "p": "ｱ", "q": "ゐ", "r": "尺", "s": "丂", "t": "ｲ", "u": "ひ", "v": "√", "w": "W", "x": "ﾒ", "y": "ﾘ", "z": "乙", "A": "ﾑ", "B": "乃", "C": "ᄃ", "D": "り", "E": "乇", "F": "ｷ", "G": "ム", "H": "ん", "I": "ﾉ", "J": "ﾌ", "K": "ズ", "L": "ﾚ", "M": "ﾶ", "N": "刀", "O": "の", "P": "ｱ", "Q": "ゐ", "R": "尺", "S": "丂", "T": "ｲ", "U": "ひ", "V": "√", "W": "W", "X": "ﾒ", "Y": "ﾘ", "Z": "乙" };
const asianStyleCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "卂", "b": "乃", "c": "匚", "d": "ᗪ", "e": "乇", "f": "千", "g": "Ꮆ", "h": "卄", "i": "丨", "j": "ﾌ", "k": "Ҝ", "l": "ㄥ", "m": "爪", "n": "几", "o": "ㄖ", "p": "卩", "q": "Ɋ", "r": "尺", "s": "丂", "t": "ㄒ", "u": "ㄩ", "v": "ᐯ", "w": "山", "x": "乂", "y": "ㄚ", "z": "乙", "A": "卂", "B": "乃", "C": "匚", "D": "ᗪ", "E": "乇", "F": "千", "G": "Ꮆ", "H": "卄", "I": "丨", "J": "ﾌ", "K": "Ҝ", "L": "ㄥ", "M": "爪", "N": "几", "O": "ㄖ", "P": "卩", "Q": "Ɋ", "R": "尺", "S": "丂", "T": "ㄒ", "U": "ㄩ", "V": "ᐯ", "W": "山", "X": "乂", "Y": "ㄚ", "Z": "乙" };
const squaresCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "🄰", "b": "🄱", "c": "🄲", "d": "🄳", "e": "🄴", "f": "🄵", "g": "🄶", "h": "🄷", "i": "🄸", "j": "🄹", "k": "🄺", "l": "🄻", "m": "🄼", "n": "🄽", "o": "🄾", "p": "🄿", "q": "🅀", "r": "🅁", "s": "🅂", "t": "🅃", "u": "🅄", "v": "🅅", "w": "🅆", "x": "🅇", "y": "🅈", "z": "🅉", "A": "🄰", "B": "🄱", "C": "🄲", "D": "🄳", "E": "🄴", "F": "🄵", "G": "🄶", "H": "🄷", "I": "🄸", "J": "🄹", "K": "🄺", "L": "🄻", "M": "🄼", "N": "🄽", "O": "🄾", "P": "🄿", "Q": "🅀", "R": "🅁", "S": "🅂", "T": "🅃", "U": "🅄", "V": "🅅", "W": "🅆", "X": "🅇", "Y": "🅈", "Z": "🅉" };
const squiggle4CharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "Ꮧ", "b": "Ᏸ", "c": "ፈ", "d": "Ꮄ", "e": "Ꮛ", "f": "Ꭶ", "g": "Ꮆ", "h": "Ꮒ", "i": "Ꭵ", "j": "Ꮰ", "k": "Ꮶ", "l": "Ꮭ", "m": "Ꮇ", "n": "Ꮑ", "o": "Ꭷ", "p": "Ꭾ", "q": "Ꭴ", "r": "Ꮢ", "s": "Ꮥ", "t": "Ꮦ", "u": "Ꮼ", "v": "Ꮙ", "w": "Ꮗ", "x": "ጀ", "y": "Ꭹ", "z": "ፚ", "A": "Ꮧ", "B": "Ᏸ", "C": "ፈ", "D": "Ꮄ", "E": "Ꮛ", "F": "Ꭶ", "G": "Ꮆ", "H": "Ꮒ", "I": "Ꭵ", "J": "Ꮰ", "K": "Ꮶ", "L": "Ꮭ", "M": "Ꮇ", "N": "Ꮑ", "O": "Ꭷ", "P": "Ꭾ", "Q": "Ꭴ", "R": "Ꮢ", "S": "Ꮥ", "T": "Ꮦ", "U": "Ꮼ", "V": "Ꮙ", "W": "Ꮗ", "X": "ጀ", "Y": "Ꭹ", "Z": "ፚ" };
const neonCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "ᗩ", "b": "ᗷ", "c": "ᑕ", "d": "ᗪ", "e": "E", "f": "ᖴ", "g": "G", "h": "ᕼ", "i": "I", "j": "ᒍ", "k": "K", "l": "ᒪ", "m": "ᗰ", "n": "ᑎ", "o": "O", "p": "ᑭ", "q": "ᑫ", "r": "ᖇ", "s": "ᔕ", "t": "T", "u": "ᑌ", "v": "ᐯ", "w": "ᗯ", "x": "᙭", "y": "Y", "z": "ᘔ", "A": "ᗩ", "B": "ᗷ", "C": "ᑕ", "D": "ᗪ", "E": "E", "F": "ᖴ", "G": "G", "H": "ᕼ", "I": "I", "J": "ᒍ", "K": "K", "L": "ᒪ", "M": "ᗰ", "N": "ᑎ", "O": "O", "P": "ᑭ", "Q": "ᑫ", "R": "ᖇ", "S": "ᔕ", "T": "T", "U": "ᑌ", "V": "ᐯ", "W": "ᗯ", "X": "᙭", "Y": "Y", "Z": "ᘔ" };
const squiggle3CharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "ǟ", "b": "ɮ", "c": "ƈ", "d": "ɖ", "e": "ɛ", "f": "ʄ", "g": "ɢ", "h": "ɦ", "i": "ɨ", "j": "ʝ", "k": "ӄ", "l": "ʟ", "m": "ʍ", "n": "ռ", "o": "օ", "p": "ք", "q": "զ", "r": "ʀ", "s": "ֆ", "t": "ȶ", "u": "ʊ", "v": "ʋ", "w": "ա", "x": "Ӽ", "y": "ʏ", "z": "ʐ", "A": "ǟ", "B": "ɮ", "C": "ƈ", "D": "ɖ", "E": "ɛ", "F": "ʄ", "G": "ɢ", "H": "ɦ", "I": "ɨ", "J": "ʝ", "K": "ӄ", "L": "ʟ", "M": "ʍ", "N": "ռ", "O": "օ", "P": "ք", "Q": "զ", "R": "ʀ", "S": "ֆ", "T": "ȶ", "U": "ʊ", "V": "ʋ", "W": "ա", "X": "Ӽ", "Y": "ʏ", "Z": "ʐ" };
const monospaceCharMap = { "0": "𝟶", "1": "𝟷", "2": "𝟸", "3": "𝟹", "4": "𝟺", "5": "𝟻", "6": "𝟼", "7": "𝟽", "8": "𝟾", "9": "𝟿", "a": "𝚊", "b": "𝚋", "c": "𝚌", "d": "𝚍", "e": "𝚎", "f": "𝚏", "g": "𝚐", "h": "𝚑", "i": "𝚒", "j": "𝚓", "k": "𝚔", "l": "𝚕", "m": "𝚖", "n": "𝚗", "o": "𝚘", "p": "𝚙", "q": "𝚚", "r": "𝚛", "s": "𝚜", "t": "𝚝", "u": "𝚞", "v": "𝚟", "w": "𝚠", "x": "𝚡", "y": "𝚢", "z": "𝚣", "A": "𝙰", "B": "𝙱", "C": "𝙲", "D": "𝙳", "E": "𝙴", "F": "𝙵", "G": "𝙶", "H": "𝙷", "I": "𝙸", "J": "𝙹", "K": "𝙺", "L": "𝙻", "M": "𝙼", "N": "𝙽", "O": "𝙾", "P": "𝙿", "Q": "𝚀", "R": "𝚁", "S": "𝚂", "T": "𝚃", "U": "𝚄", "V": "𝚅", "W": "𝚆", "X": "𝚇", "Y": "𝚈", "Z": "𝚉" };
const boldItalicCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "𝙖", "b": "𝙗", "c": "𝙘", "d": "𝙙", "e": "𝙚", "f": "𝙛", "g": "𝙜", "h": "𝙝", "i": "𝙞", "j": "𝙟", "k": "𝙠", "l": "𝙡", "m": "𝙢", "n": "𝙣", "o": "𝙤", "p": "𝙥", "q": "𝙦", "r": "𝙧", "s": "𝙨", "t": "𝙩", "u": "𝙪", "v": "𝙫", "w": "𝙬", "x": "𝙭", "y": "𝙮", "z": "𝙯", "A": "𝘼", "B": "𝘽", "C": "𝘾", "D": "𝘿", "E": "𝙀", "F": "𝙁", "G": "𝙂", "H": "𝙃", "I": "𝙄", "J": "𝙅", "K": "𝙆", "L": "𝙇", "M": "𝙈", "N": "𝙉", "O": "𝙊", "P": "𝙋", "Q": "𝙌", "R": "𝙍", "S": "𝙎", "T": "𝙏", "U": "𝙐", "V": "𝙑", "W": "𝙒", "X": "𝙓", "Y": "𝙔", "Z": "𝙕" };
const boldCharMap = { "0": "𝟎", "1": "𝟏", "2": "𝟐", "3": "𝟑", "4": "𝟒", "5": "𝟓", "6": "𝟔", "7": "𝟕", "8": "𝟖", "9": "𝟗", "a": "𝐚", "b": "𝐛", "c": "𝐜", "d": "𝐝", "e": "𝐞", "f": "𝐟", "g": "𝐠", "h": "𝐡", "i": "𝐢", "j": "𝐣", "k": "𝐤", "l": "𝐥", "m": "𝐦", "n": "𝐧", "o": "𝐨", "p": "𝐩", "q": "𝐪", "r": "𝐫", "s": "𝐬", "t": "𝐭", "u": "𝐮", "v": "𝐯", "w": "𝐰", "x": "𝐱", "y": "𝐲", "z": "𝐳", "A": "𝐀", "B": "𝐁", "C": "𝐂", "D": "𝐃", "E": "𝐄", "F": "𝐅", "G": "𝐆", "H": "𝐇", "I": "𝐈", "J": "𝐉", "K": "𝐊", "L": "𝐋", "M": "𝐌", "N": "𝐍", "O": "𝐎", "P": "𝐏", "Q": "𝐐", "R": "𝐑", "S": "𝐒", "T": "𝐓", "U": "𝐔", "V": "𝐕", "W": "𝐖", "X": "𝐗", "Y": "𝐘", "Z": "𝐙" };
const italicCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "𝘢", "b": "𝘣", "c": "𝘤", "d": "𝘥", "e": "𝘦", "f": "𝘧", "g": "𝘨", "h": "𝘩", "i": "𝘪", "j": "𝘫", "k": "𝘬", "l": "𝘭", "m": "𝘮", "n": "𝘯", "o": "𝘰", "p": "𝘱", "q": "𝘲", "r": "𝘳", "s": "𝘴", "t": "𝘵", "u": "𝘶", "v": "𝘷", "w": "𝘸", "x": "𝘹", "y": "𝘺", "z": "𝘻", "A": "𝘈", "B": "𝘉", "C": "𝘊", "D": "𝘋", "E": "𝘌", "F": "𝘍", "G": "𝘎", "H": "𝘏", "I": "𝘐", "J": "𝘑", "K": "𝘒", "L": "𝘓", "M": "𝘔", "N": "𝘕", "O": "𝘖", "P": "𝘗", "Q": "𝘘", "R": "𝘙", "S": "𝘚", "T": "𝘛", "U": "𝘜", "V": "𝘝", "W": "𝘞", "X": "𝘟", "Y": "𝘠", "Z": "𝘡" };
const squiggle2CharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "α", "b": "Ⴆ", "c": "ƈ", "d": "ԃ", "e": "ҽ", "f": "ϝ", "g": "ɠ", "h": "ԋ", "i": "ι", "j": "ʝ", "k": "ƙ", "l": "ʅ", "m": "ɱ", "n": "ɳ", "o": "σ", "p": "ρ", "q": "ϙ", "r": "ɾ", "s": "ʂ", "t": "ƚ", "u": "υ", "v": "ʋ", "w": "ɯ", "x": "x", "y": "ყ", "z": "ȥ", "A": "A", "B": "B", "C": "C", "D": "D", "E": "E", "F": "F", "G": "G", "H": "H", "I": "I", "J": "J", "K": "K", "L": "L", "M": "M", "N": "N", "O": "O", "P": "P", "Q": "Q", "R": "R", "S": "S", "T": "T", "U": "U", "V": "V", "W": "W", "X": "X", "Y": "Y", "Z": "Z" };
const currencyCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "₳", "b": "฿", "c": "₵", "d": "Đ", "e": "Ɇ", "f": "₣", "g": "₲", "h": "Ⱨ", "i": "ł", "j": "J", "k": "₭", "l": "Ⱡ", "m": "₥", "n": "₦", "o": "Ø", "p": "₱", "q": "Q", "r": "Ɽ", "s": "₴", "t": "₮", "u": "Ʉ", "v": "V", "w": "₩", "x": "Ӿ", "y": "Ɏ", "z": "Ⱬ", "A": "₳", "B": "฿", "C": "₵", "D": "Đ", "E": "Ɇ", "F": "₣", "G": "₲", "H": "Ⱨ", "I": "ł", "J": "J", "K": "₭", "L": "Ⱡ", "M": "₥", "N": "₦", "O": "Ø", "P": "₱", "Q": "Q", "R": "Ɽ", "S": "₴", "T": "₮", "U": "Ʉ", "V": "V", "W": "₩", "X": "Ӿ", "Y": "Ɏ", "Z": "Ⱬ" };
const symbolsCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "å", "b": "ß", "c": "¢", "d": "Ð", "e": "ê", "f": "£", "g": "g", "h": "h", "i": "ï", "j": "j", "k": "k", "l": "l", "m": "m", "n": "ñ", "o": "ð", "p": "þ", "q": "q", "r": "r", "s": "§", "t": "†", "u": "µ", "v": "v", "w": "w", "x": "x", "y": "¥", "z": "z", "A": "Ä", "B": "ß", "C": "Ç", "D": "Ð", "E": "È", "F": "£", "G": "G", "H": "H", "I": "Ì", "J": "J", "K": "K", "L": "L", "M": "M", "N": "ñ", "O": "Ö", "P": "þ", "Q": "Q", "R": "R", "S": "§", "T": "†", "U": "Ú", "V": "V", "W": "W", "X": "×", "Y": "¥", "Z": "Z" };
const greekCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "α", "b": "в", "c": "¢", "d": "∂", "e": "є", "f": "ƒ", "g": "g", "h": "н", "i": "ι", "j": "נ", "k": "к", "l": "ℓ", "m": "м", "n": "η", "o": "σ", "p": "ρ", "q": "q", "r": "я", "s": "ѕ", "t": "т", "u": "υ", "v": "ν", "w": "ω", "x": "χ", "y": "у", "z": "z", "A": "α", "B": "в", "C": "¢", "D": "∂", "E": "є", "F": "ƒ", "G": "g", "H": "н", "I": "ι", "J": "נ", "K": "к", "L": "ℓ", "M": "м", "N": "η", "O": "σ", "P": "ρ", "Q": "q", "R": "я", "S": "ѕ", "T": "т", "U": "υ", "V": "ν", "W": "ω", "X": "χ", "Y": "у", "Z": "z" };
const bentTextCharMap = { "0": "⊘", "1": "𝟙", "2": "ϩ", "3": "Ӡ", "4": "५", "5": "Ƽ", "6": "Ϭ", "7": "7", "8": "𝟠", "9": "९", "a": "ą", "b": "ҍ", "c": "ç", "d": "ժ", "e": "ҽ", "f": "ƒ", "g": "ց", "h": "հ", "i": "ì", "j": "ʝ", "k": "ҟ", "l": "Ӏ", "m": "ʍ", "n": "ղ", "o": "օ", "p": "ք", "q": "զ", "r": "ɾ", "s": "ʂ", "t": "է", "u": "մ", "v": "ѵ", "w": "ա", "x": "×", "y": "վ", "z": "Հ", "A": "Ⱥ", "B": "β", "C": "↻", "D": "Ꭰ", "E": "Ɛ", "F": "Ƒ", "G": "Ɠ", "H": "Ƕ", "I": "į", "J": "ل", "K": "Ҡ", "L": "Ꝉ", "M": "Ɱ", "N": "ហ", "O": "ට", "P": "φ", "Q": "Ҩ", "R": "འ", "S": "Ϛ", "T": "Ͳ", "U": "Ա", "V": "Ỽ", "W": "చ", "X": "ჯ", "Y": "Ӌ", "Z": "ɀ" };
const upperAnglesCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "Λ", "b": "B", "c": "ᄃ", "d": "D", "e": "Σ", "f": "F", "g": "G", "h": "Ή", "i": "I", "j": "J", "k": "K", "l": "ᄂ", "m": "M", "n": "П", "o": "Ө", "p": "P", "q": "Q", "r": "Я", "s": "Ƨ", "t": "Ƭ", "u": "Ц", "v": "V", "w": "Щ", "x": "X", "y": "Y", "z": "Z", "A": "Λ", "B": "B", "C": "ᄃ", "D": "D", "E": "Σ", "F": "F", "G": "G", "H": "Ή", "I": "I", "J": "J", "K": "K", "L": "ᄂ", "M": "M", "N": "П", "O": "Ө", "P": "P", "Q": "Q", "R": "Я", "S": "Ƨ", "T": "Ƭ", "U": "Ц", "V": "V", "W": "Щ", "X": "X", "Y": "Y", "Z": "Z" };
const subscriptCharMap = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉", "a": "ₐ", "b": "𝚋", "c": "𝚌", "d": "𝚍", "e": "ₑ", "f": "f", "g": "g", "h": "𝓱", "i": "ᵢ", "j": "ⱼ", "k": "𝓴", "l": "ᄂ", "m": "ᗰ", "n": "𝚗", "o": "ₒ", "p": "𝐩", "q": "q", "r": "ᵣ", "s": "𝘴", "t": "𝚝", "u": "ᵤ", "v": "ᵥ", "w": "w", "x": "ₓ", "y": "y", "z": "z", "A": "ₐ", "B": "B", "C": "C", "D": "D", "E": "ₑ", "F": "F", "G": "G", "H": "H", "I": "ᵢ", "J": "ⱼ", "K": "K", "L": "L", "M": "M", "N": "N", "O": "ₒ", "P": "P", "Q": "Q", "R": "ᵣ", "S": "S", "T": "T", "U": "ᵤ", "V": "ᵥ", "W": "W", "X": "ₓ", "Y": "Y", "Z": "Z", "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎" };
const superscriptCharMap = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "a": "ᵃ", "b": "ᵇ", "c": "ᶜ", "d": "ᵈ", "e": "ᵉ", "f": "ᶠ", "g": "ᵍ", "h": "ʰ", "i": "ⁱ", "j": "ʲ", "k": "ᵏ", "l": "ˡ", "m": "ᵐ", "n": "ⁿ", "o": "ᵒ", "p": "ᵖ", "q": "q", "r": "ʳ", "s": "ˢ", "t": "ᵗ", "u": "ᵘ", "v": "ᵛ", "w": "ʷ", "x": "ˣ", "y": "ʸ", "z": "ᶻ", "A": "ᴬ", "B": "ᴮ", "C": "ᶜ", "D": "ᴰ", "E": "ᴱ", "F": "ᶠ", "G": "ᴳ", "H": "ᴴ", "I": "ᴵ", "J": "ᴶ", "K": "ᴷ", "L": "ᴸ", "M": "ᴹ", "N": "ᴺ", "O": "ᴼ", "P": "ᴾ", "Q": "Q", "R": "ᴿ", "S": "ˢ", "T": "ᵀ", "U": "ᵁ", "V": "ⱽ", "W": "ᵂ", "X": "ˣ", "Y": "ʸ", "Z": "ᶻ", "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾" };



const squiggleCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "ค", "b": "๒", "c": "ς", "d": "๔", "e": "є", "f": "Ŧ", "g": "ﻮ", "h": "ђ", "i": "เ", "j": "ן", "k": "к", "l": "ɭ", "m": "๓", "n": "ภ", "o": "๏", "p": "ק", "q": "ợ", "r": "г", "s": "ร", "t": "Շ", "u": "ย", "v": "ש", "w": "ฬ", "x": "א", "y": "ץ", "z": "չ", "A": "ค", "B": "๒", "C": "ς", "D": "๔", "E": "є", "F": "Ŧ", "G": "ﻮ", "H": "ђ", "I": "เ", "J": "ן", "K": "к", "L": "ɭ", "M": "๓", "N": "ภ", "O": "๏", "P": "ק", "Q": "ợ", "R": "г", "S": "ร", "T": "Շ", "U": "ย", "V": "ש", "W": "ฬ", "X": "א", "Y": "ץ", "Z": "չ" };
const doubleStruckCharMap = { "0": "𝟘", "1": "𝟙", "2": "𝟚", "3": "𝟛", "4": "𝟜", "5": "𝟝", "6": "𝟞", "7": "𝟟", "8": "𝟠", "9": "𝟡", "a": "𝕒", "b": "𝕓", "c": "𝕔", "d": "𝕕", "e": "𝕖", "f": "𝕗", "g": "𝕘", "h": "𝕙", "i": "𝕚", "j": "𝕛", "k": "𝕜", "l": "𝕝", "m": "𝕞", "n": "𝕟", "o": "𝕠", "p": "𝕡", "q": "𝕢", "r": "𝕣", "s": "𝕤", "t": "𝕥", "u": "𝕦", "v": "𝕧", "w": "𝕨", "x": "𝕩", "y": "𝕪", "z": "𝕫", "A": "𝔸", "B": "𝔹", "C": "ℂ", "D": "𝔻", "E": "𝔼", "F": "𝔽", "G": "𝔾", "H": "ℍ", "I": "𝕀", "J": "𝕁", "K": "𝕂", "L": "𝕃", "M": "𝕄", "N": "ℕ", "O": "𝕆", "P": "ℙ", "Q": "ℚ", "R": "ℝ", "S": "𝕊", "T": "𝕋", "U": "𝕌", "V": "𝕍", "W": "𝕎", "X": "𝕏", "Y": "𝕐", "Z": "ℤ" };
const medievalCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "𝖆", "b": "𝖇", "c": "𝖈", "d": "𝖉", "e": "𝖊", "f": "𝖋", "g": "𝖌", "h": "𝖍", "i": "𝖎", "j": "𝖏", "k": "𝖐", "l": "𝖑", "m": "𝖒", "n": "𝖓", "o": "𝖔", "p": "𝖕", "q": "𝖖", "r": "𝖗", "s": "𝖘", "t": "𝖙", "u": "𝖚", "v": "𝖛", "w": "𝖜", "x": "𝖝", "y": "𝖞", "z": "𝖟", "A": "𝕬", "B": "𝕭", "C": "𝕮", "D": "𝕯", "E": "𝕰", "F": "𝕱", "G": "𝕲", "H": "𝕳", "I": "𝕴", "J": "𝕵", "K": "𝕶", "L": "𝕷", "M": "𝕸", "N": "𝕹", "O": "𝕺", "P": "𝕻", "Q": "𝕼", "R": "𝕽", "S": "𝕾", "T": "𝕿", "U": "𝖀", "V": "𝖁", "W": "𝖂", "X": "𝖃", "Y": "𝖄", "Z": "𝖅" };
const invertedSquaresCharMap = { q: "🆀", w: "🆆", e: "🅴", r: "🆁", t: "🆃", y: "🆈", u: "🆄", i: "🅸", o: "🅾", p: "🅿", a: "🅰", s: "🆂", d: "🅳", f: "🅵", g: "🅶", h: "🅷", j: "🅹", k: "🅺", l: "🅻", z: "🆉", x: "🆇", c: "🅲", v: "🆅", b: "🅱", n: "🅽", m: "🅼" }
const cursiveCharMap = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "a": "𝓪", "b": "𝓫", "c": "𝓬", "d": "𝓭", "e": "𝓮", "f": "𝓯", "g": "𝓰", "h": "𝓱", "i": "𝓲", "j": "𝓳", "k": "𝓴", "l": "𝓵", "m": "𝓶", "n": "𝓷", "o": "𝓸", "p": "𝓹", "q": "𝓺", "r": "𝓻", "s": "𝓼", "t": "𝓽", "u": "𝓾", "v": "𝓿", "w": "𝔀", "x": "𝔁", "y": "𝔂", "z": "𝔃", "A": "𝓐", "B": "𝓑", "C": "𝓒", "D": "𝓓", "E": "𝓔", "F": "𝓕", "G": "𝓖", "H": "𝓗", "I": "𝓘", "J": "𝓙", "K": "𝓚", "L": "𝓛", "M": "𝓜", "N": "𝓝", "O": "𝓞", "P": "𝓟", "Q": "𝓠", "R": "𝓡", "S": "𝓢", "T": "𝓣", "U": "𝓤", "V": "𝓥", "W": "𝓦", "X": "𝓧", "Y": "𝓨", "Z": "𝓩" };
const oldEnglishCharMap = { "a": "𝔞", "b": "𝔟", "c": "𝔠", "d": "𝔡", "e": "𝔢", "f": "𝔣", "g": "𝔤", "h": "𝔥", "i": "𝔦", "j": "𝔧", "k": "𝔨", "l": "𝔩", "m": "𝔪", "n": "𝔫", "o": "𝔬", "p": "𝔭", "q": "𝔮", "r": "𝔯", "s": "𝔰", "t": "𝔱", "u": "𝔲", "v": "𝔳", "w": "𝔴", "x": "𝔵", "y": "𝔶", "z": "𝔷", "A": "𝔄", "B": "𝔅", "C": "ℭ", "D": "𝔇", "E": "𝔈", "F": "𝔉", "G": "𝔊", "H": "ℌ", "I": "ℑ", "J": "𝔍", "K": "𝔎", "L": "𝔏", "M": "𝔐", "N": "𝔑", "O": "𝔒", "P": "𝔓", "Q": "𝔔", "R": "ℜ", "S": "𝔖", "T": "𝔗", "U": "𝔘", "V": "𝔙", "W": "𝔚", "X": "𝔛", "Y": "𝔜", "Z": "ℨ" };
const wideTextCharMap = { "`": "`", "1": "１", "2": "２", "3": "３", "4": "４", "5": "５", "6": "６", "7": "７", "8": "８", "9": "９", "0": "０", "-": "－", "=": "＝", "~": "~", "!": "！", "@": "＠", "#": "＃", "$": "＄", "%": "％", "^": "^", "&": "＆", "*": "＊", "(": "（", ")": "）", "_": "_", "+": "＋", "q": "ｑ", "w": "ｗ", "e": "ｅ", "r": "ｒ", "t": "ｔ", "y": "ｙ", "u": "ｕ", "i": "ｉ", "o": "ｏ", "p": "ｐ", "[": "[", "]": "]", "\\": "\\", "Q": "Ｑ", "W": "Ｗ", "E": "Ｅ", "R": "Ｒ", "T": "Ｔ", "Y": "Ｙ", "U": "Ｕ", "I": "Ｉ", "O": "Ｏ", "P": "Ｐ", "{": "{", "}": "}", "|": "|", "a": "ａ", "s": "ｓ", "d": "ｄ", "f": "ｆ", "g": "ｇ", "h": "ｈ", "j": "ｊ", "k": "ｋ", "l": "ｌ", ";": "；", "'": "＇", "A": "Ａ", "S": "Ｓ", "D": "Ｄ", "F": "Ｆ", "G": "Ｇ", "H": "Ｈ", "J": "Ｊ", "K": "Ｋ", "L": "Ｌ", ":": "：", "\"": "\"", "z": "ｚ", "x": "ｘ", "c": "ｃ", "v": "ｖ", "b": "ｂ", "n": "ｎ", "m": "ｍ", ",": "，", ".": "．", "/": "／", "Z": "Ｚ", "X": "Ｘ", "C": "Ｃ", "V": "Ｖ", "B": "Ｂ", "N": "Ｎ", "M": "Ｍ", "<": "<", ">": ">", "?": "？" }

const dashbox = { "a": "🇦 ", "b": "🇧 ", "c": "🇨 ", "d": "🇩 ", "e": "🇪 ", "f": "🇫 ", "g": "🇬 ", "h": "🇭 ", "i": "🇮 ", "j": "🇯 ","k": "🇰 ", "l": "🇱 ", "m": "🇲 ", "n": "🇳 ", "o": "🇴 ", "p": "🇵 ", "q": "🇶 ", "r": "🇷 ", "s": "🇸 ", "t": "🇹 ", "u": "🇺 ", "v": "🇻 ", 
"w": "🇼 ", "x": "🇽 ", "y": "🇾 ", "z": "🇿 ", "A": "🇦 ", "B": "🇧 ", "C": "🇨 ", "D": "🇩 ", "E": "🇪 ", "F": "🇫 ", "G": "🇬 ", "H": "🇭 ", 
"I": "🇮 ", "J": "🇯 ", "K": "🇰 ", "L": "🇱 ", "M": "🇲 ", "N": "🇳 ", "O": "🇴 ", "P": "🇵 ", "Q": "🇶 ", "R": "🇷 ", "S": "🇸 ", "T": "🇹 ",
"U": "🇺 ", "V": "🇻 ", "W": "🇼 ", "X": "🇽 ", "Y": "🇾 ", "Z": "🇿 " };

const roundblackbox = { "a": "🅐", "b": "🅑", "c": "🅒", "d": "🅓", "e": "🅔", "f": "🅕", "g": "🅖", "h": "🅗", "i": "🅘", "j": "🅙","k": "🅚", "l": "🅛", "m": "🅜", "n": "🅝", "o": "🅞", "p": "🅟", "q": "🅠", "r": "🅡", "s": "🅢", "t": "🅣", "u": "🅤", "v": "🅥", 
"w": "🅦", "x": "🅧", "y": "🅨", "z": "🅩", "A": "🅐", "B": "🅑", "C": "🅒", "D": "🅓", "E": "🅔", "F": "🅕", "G": "🅖", "H": "🅗", 
"I": "🅘", "J": "🅙", "K": "🅚", "L": "🅛", "M": "🅜", "N": "🅝", "O": "🅞", "P": "🅟", "Q": "🅠", "R": "🅡", "S": "🅢", "T": "🅣",
"U": "🅤", "V": "🅥", "W": "🅦", "X": "🅧", "Y": "🅨", "Z": "🅩" };

// Lunicode.js
// from lunicode.com
// on GitHub: https://github.com/combatwombat/Lunicode.js

function Lunicode() {
this.tools = {

  // Flip/rotate Text by 180°
  
  flip: {
    init: function() {
              
      // invert the map
      for (i in this.map) {
        this.map[this.map[i]] = i;
      }
      
    },
    
    encode: function(text) {
      var ret = [],
          ch;
      
      for (var i = 0, len = text.length; i < len; i++) {
        ch = text.charAt(i);
        
        // combining diacritical marks: combine with previous character for ä,ö,ü,...
        if (i > 0 && (ch == '\u0324' ||
                      ch == '\u0317' ||
                      ch == '\u0316' ||
                      ch == '\u032e')) {
          ch = this.map[text.charAt(i-1) + ch];
          ret.pop();             
                        
        } else {
          ch = this.map[ch];
          if (typeof(ch) == "undefined") {
            ch = text.charAt(i);
          }
        }
        
        ret.push(ch); 
        


      }    

      return ret.reverse().join("");
    },
    
    // same as encode(), for now...
    decode: function(text) {
      var ret = [],
          ch;
      
      for (var i = 0, len = text.length; i < len; i++) {
        ch = text.charAt(i);
        
        // combining diacritical marks: combine with previous character for ä,ö,ü,...
        if (i > 0 && (ch == '\u0324' ||
                      ch == '\u0317' ||
                      ch == '\u0316' ||
                      ch == '\u032e')) {
          ch = this.map[text.charAt(i-1) + ch];
          ret.pop();
          
        } else {
          ch = this.map[ch];
          if (typeof(ch) == "undefined") {
            ch = text.charAt(i);
          }
        }          

        ret.push(ch);          
      }
      return ret.reverse().join("");
    },
    
    map: {
        // Thanks to
        // - David Faden: http://www.revfad.com/flip.html
        // - http://en.wikipedia.org/wiki/Transformation_of_text
        'a' : '\u0250',
        'b' : 'q',      
        'c' : '\u0254', 
        'd' : 'p',      
        'e' : '\u01DD', 
        'f' : '\u025F', 
        'g' : '\u0253', 
        'h' : '\u0265', 
        'i' : '\u0131', 
        'j' : '\u027E', 
        'k' : '\u029E',
        'l' : '\u006C',
        'm' : '\u026F',
        'n' : 'u',
        'r' : '\u0279',
        't' : '\u0287',
        'v' : '\u028C',
        'w' : '\u028D',
        'y' : '\u028E',
        'A' : '\u2200',
        'B' : 'ᙠ',
        'C' : '\u0186',
        'D' : 'ᗡ',
        'E' : '\u018e',
        'F' : '\u2132',
        'G' : '\u2141',
        'J' : '\u017f',
        'K' : '\u22CA',
        'L' : '\u02e5',
        'M' : 'W',
        'P' : '\u0500',
        'Q' : '\u038C',
        'R' : '\u1D1A',
        'T' : '\u22a5',
        'U' : '\u2229',
        'V' : '\u039B',
        'Y' : '\u2144',
        '1' : '\u21c2',
        '2' : '\u1105',
        '3' : '\u0190',
        '4' : '\u3123',
        '5' : '\u078e',
        '6' : '9',
        '7' : '\u3125',
        '&' : '\u214b',
        '.' : '\u02D9',
        '"' : '\u201e',
        ';' : '\u061b',
        '[' : ']',
        '(' : ')',
        '{' : '}',
        '?' : '\u00BF', 
        '!' : '\u00A1',
        "\'" : ',',
        '<' : '>',
        '\u203E' : '_',
        '\u00AF' : '_',
        '\u203F' : '\u2040',
        '\u2045' : '\u2046',
        '\u2234' : '\u2235',
        '\r' : '\n',
        'ß' : 'ᙠ',
        
        '\u0308':  '\u0324',
        'ä' : 'ɐ'+'\u0324',
        'ö' : 'o'+'\u0324',
        'ü' : 'n'+'\u0324',
        'Ä' : '\u2200'+'\u0324',
        'Ö' : 'O'+'\u0324',
        'Ü' : '\u2229'+'\u0324',
        
        '´' : ' \u0317',
        'é' : '\u01DD' + '\u0317',
        'á' : '\u0250' + '\u0317',
        'ó' : 'o' + '\u0317',
        'ú' : 'n' + '\u0317',
        'É' : '\u018e' + '\u0317',
        'Á' : '\u2200' + '\u0317',
        'Ó' : 'O' + '\u0317',
        'Ú' : '\u2229' + '\u0317',
        
        '`' : ' \u0316',
        'è' : '\u01DD' + '\u0316',
        'à' : '\u0250' + '\u0316',
        'ò' : 'o' + '\u0316',
        'ù' : 'n' + '\u0316',
        'È' : '\u018e' + '\u0316',
        'À' : '\u2200' + '\u0316',
        'Ò' : 'O' + '\u0316',
        'Ù' : '\u2229' + '\u0316',
        
        '^' : ' \u032E',
        'ê' : '\u01DD' + '\u032e',
        'â' : '\u0250' + '\u032e',
        'ô' : 'o' + '\u032e',
        'û' : 'n' + '\u032e',
        'Ê' : '\u018e' + '\u032e',
        'Â' : '\u2200' + '\u032e',
        'Ô' : 'O' + '\u032e',
        'Û' : '\u2229' + '\u032e'
        // TODO: flip more letters with stuff around them. See http://en.wikipedia.org/wiki/Combining_character
        
    }
  },
  
     
  
  
  // Mirror text (flip horizontally)
  mirror: {
    init: function() {
              
      // invert the map
      for (i in this.map) {
        this.map[this.map[i]] = i;
      }
      
    },
    
    encode: function(text) {
      var ret = [],
          ch,
          newLines = [];
      
      for (var i = 0, len = text.length; i < len; i++) {
        ch = text.charAt(i);
        
        // combining diacritical marks: combine with previous character for ä,ö,ü,...
        if (i > 0 && (ch == '\u0308' ||
                      ch == '\u0300' ||
                      ch == '\u0301' ||
                      ch == '\u0302')) {
          ch = this.map[text.charAt(i-1) + ch];
          ret.pop();
        } else {
          ch = this.map[ch];
          if (typeof(ch) == "undefined") {
            ch = text.charAt(i);
          }
        }
        
        
        if (ch == '\n') {
          newLines.push(ret.reverse().join(""));
          ret = [];
        } else {
          ret.push(ch);
        }
        

      }    
      newLines.push(ret.reverse().join(""));
      return newLines.join("\n");
    },
    
    decode: function(text) {
      var ret = [],
          ch,
          newLines = [];
      
      for (var i = 0, len = text.length; i < len; i++) {
        ch = text.charAt(i);
        
        // combining diacritical marks: combine with previous character for ä,ö,ü,...
        if (i > 0 && (ch == '\u0308' ||
                      ch == '\u0300' ||
                      ch == '\u0301' ||
                      ch == '\u0302')) {
          ch = this.map[text.charAt(i-1) + ch];
          ret.pop();
        } else {
          ch = this.map[ch];
          if (typeof(ch) == "undefined") {
            ch = text.charAt(i);
          }
        }          
        
        if (ch == '\n') {
          newLines.push(ret.reverse().join(""));
          ret = [];
        } else {
          ret.push(ch);
        }
      }
      
      newLines.push(ret.reverse().join(""));
      return newLines.join("\n");
    },
    
    // Thanks to http://www.macchiato.com/unicode/mirrored-ascii
    map: {         
        'a' : 'ɒ',
        'b' : 'd',      
        'c' : 'ɔ',       
        'e' : 'ɘ', 
        'f' : 'Ꮈ', 
        'g' : 'ǫ', 
        'h' : 'ʜ',  
        'j' : 'ꞁ', 
        'k' : 'ʞ',
        'l' : '|',
        'n' : 'ᴎ',
        'p' : 'q',
        'r' : 'ɿ',
        's' : 'ꙅ',
        't' : 'ƚ',
        'y' : 'ʏ',
        'z' : 'ƹ',
        'B' : 'ᙠ',
        'C' : 'Ɔ',
        'D' : 'ᗡ',
        'E' : 'Ǝ',
        'F' : 'ꟻ',
        'G' : 'Ꭾ',
        'J' : 'Ⴑ',
        'K' : '⋊',
        'L' : '⅃',
        'N' : 'Ͷ',
        'P' : 'ꟼ',
        'Q' : 'Ọ',
        'R' : 'Я',
        'S' : 'Ꙅ',
        'Z' : 'Ƹ',
        '1' : '',
        '2' : '',
        '3' : '',
        '4' : '',
        '5' : '',
        '6' : '',
        '7' : '',
        '&' : '',
        ';' : '',
        '[' : ']',
        '(' : ')',
        '{' : '}',
        '?' : '⸮', 
        '<' : '>',
        
        'ä' : 'ɒ'+'\u0308',
        'ß' : 'ᙠ',
        
        '´' : '`',
        'é' : 'ɘ' + '\u0300',
        'á' : 'ɒ' + '\u0300',
        'ó' : 'ò',
        'ú' : 'ù',
        'É' : 'Ǝ' + '\u0300',
        'Á' : 'À',
        'Ó' : 'Ò',
        'Ú' : 'Ù',
        
        '`' : '´',
        'è' : 'ɘ' + '\u0301',
        'à' : 'ɒ' + '\u0301',
        'È' : 'Ǝ' + '\u0301',

        'ê' : 'ɘ' + '\u0302',
        'â' : 'ɒ' + '\u0302',
        'Ê' : 'Ǝ' + '\u0302',
        
        'Ø' : 'ᴓ',
        'ø' : 'ᴓ'
        
    }
  },
  
  // Thanks to Michael S. Kaplan: http://blogs.msdn.com/b/michkap/archive/2006/02/17/533929.aspx
  // Creepify.
  creepify: {
    init: function() {
      
      // Sort diacritics in top, bottom or middle

      for (var i = 768; i <= 789; i++) {
        this.diacriticsTop.push(String.fromCharCode(i));
      }
      
      for (var i = 790; i <= 819; i++) {
        if (i != 794 && i != 795) {
          this.diacriticsBottom.push(String.fromCharCode(i));
        }
      }
      this.diacriticsTop.push(String.fromCharCode(794));
      this.diacriticsTop.push(String.fromCharCode(795));
      
      for (var i = 820; i <= 824; i++) {
        this.diacriticsMiddle.push(String.fromCharCode(i));
      }
      
      for (var i = 825; i <= 828; i++) {
        this.diacriticsBottom.push(String.fromCharCode(i));
      }
      
      for (var i = 829; i <= 836; i++) {
        this.diacriticsTop.push(String.fromCharCode(i));
      }
      this.diacriticsTop.push(String.fromCharCode(836));
      this.diacriticsBottom.push(String.fromCharCode(837));
      this.diacriticsTop.push(String.fromCharCode(838));
      this.diacriticsBottom.push(String.fromCharCode(839));
      this.diacriticsBottom.push(String.fromCharCode(840));
      this.diacriticsBottom.push(String.fromCharCode(841));
      this.diacriticsTop.push(String.fromCharCode(842));
      this.diacriticsTop.push(String.fromCharCode(843));
      this.diacriticsTop.push(String.fromCharCode(844));
      this.diacriticsBottom.push(String.fromCharCode(845));
      this.diacriticsBottom.push(String.fromCharCode(846));
      // 847 (U+034F) is invisible http://en.wikipedia.org/wiki/Combining_grapheme_joiner
      this.diacriticsTop.push(String.fromCharCode(848));
      this.diacriticsTop.push(String.fromCharCode(849));
      this.diacriticsTop.push(String.fromCharCode(850));
      this.diacriticsBottom.push(String.fromCharCode(851));
      this.diacriticsBottom.push(String.fromCharCode(852));
      this.diacriticsBottom.push(String.fromCharCode(853));
      this.diacriticsBottom.push(String.fromCharCode(854));
      this.diacriticsTop.push(String.fromCharCode(855));
      this.diacriticsTop.push(String.fromCharCode(856));
      this.diacriticsBottom.push(String.fromCharCode(857));
      this.diacriticsBottom.push(String.fromCharCode(858));
      this.diacriticsTop.push(String.fromCharCode(859));
      this.diacriticsBottom.push(String.fromCharCode(860));
      this.diacriticsTop.push(String.fromCharCode(861));
      this.diacriticsTop.push(String.fromCharCode(861));
      this.diacriticsBottom.push(String.fromCharCode(863));
      this.diacriticsTop.push(String.fromCharCode(864));
      this.diacriticsTop.push(String.fromCharCode(865));
      

    },
    
    encode: function(text) {
      var newText = '',
          newChar;
      for (i in text) {
        newChar = text[i];
        
        // Middle
        // Put just one of the middle characters there, or it gets crowded
        if (this.options.middle) {
            newChar += this.diacriticsMiddle[Math.floor(Math.random()*this.diacriticsMiddle.length)]          
        }
        
        // Top    
        if (this.options.top) {
          
          // Put up to this.options.maxHeight random diacritics on top.
          // optionally fluctuate the number via the randomization value (0-100%)
          // randomization 100%: 0 to maxHeight
          //                30%: 70% of maxHeight to maxHeight
          //                 x%: 100-x% of maxHeight to maxHeight 
          var diacriticsTopLength = this.diacriticsTop.length - 1;
          for (var  count = 0,
                    len = this.options.maxHeight - Math.random()*((this.options.randomization/100)*this.options.maxHeight); count < len; count++) {
                      
            newChar += this.diacriticsTop[Math.floor(Math.random()*diacriticsTopLength)]          
                      
          }

        }      

        
        // Bottom    
        if (this.options.bottom) {
          
          var diacriticsBottomLength = this.diacriticsBottom.length - 1;
          for (var  count = 0,
                    len = this.options.maxHeight - Math.random()*((this.options.randomization/100)*this.options.maxHeight); count < len; count++) {
                      
            newChar += this.diacriticsBottom[Math.floor(Math.random()*diacriticsBottomLength)]          
                      
          }

        }
        
        
        newText += newChar;
      }
      return newText;
    },
    
    decode: function(text) {
      var newText = '',
          charCode;
          
      for (i in text) {
        charCode = text[i].charCodeAt(0);
        if (charCode < 768 || charCode > 865) {
          newText += text[i];
        }
      }
      return newText;
    },
    
    diacriticsTop: [],
    diacriticsMiddle: [],
    diacriticsBottom: [],
    
    options: {
      top: true,
      middle: true,
      bottom : true,
      maxHeight: 15,   // How many diacritic marks shall we put on top/bottom?
      randomization: 100 // 0-100%. maxHeight 100 and randomization 20%: the height goes from 80 to 100. randomization 70%, height goes from 30 to 100.
    }
  },
  
  
  // Circles around Letters. Uses special circle characters for some letters and combining characters for the rest
  // Thanks to
  // - Alan Wood: http://www.alanwood.net/unicode/enclosed_alphanumerics.html
  bubbles: {
    init: function() {
      
      
      
      // Numbers
      for (var i = 49; i <= 57; i++) {
        this.map[String.fromCharCode(i)] = String.fromCharCode(i+9263);
      }
      this.map['0'] = '\u24ea';
      
      // Capital letters
      for (var i = 65; i <= 90; i++) {
        this.map[String.fromCharCode(i)] = String.fromCharCode(i+9333);
      }
      
      // Lower letters
      for (var i = 97; i <= 122; i++) {
        this.map[String.fromCharCode(i)] = String.fromCharCode(i+9327);
      }
              
      // invert the map
      for (i in this.map) {
        this.mapInverse[this.map[i]] = i;
      }
      
    },
    
    encode: function(text) {
      var ret = "",
          ch,
          first = true;
          
      for (i in text) {
        ch = this.map[text[i]];

        // No dedicated circled character available? Use a Combining Diacritical Mark surrounded
        // with non-breaking spaces, so it doesn't overlap
        if ((typeof(ch) == "undefined")) {
          if (text[i].charCodeAt(0) >= 33) {
            ch = text[i] + String.fromCharCode(8413);
            if (!first) {
              ch = String.fromCharCode(8239) + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(8239) + ch;
            }
          } else {
            ch = text[i];
          }
        }
        ret += ch;
        first = (ch == '\n');
      }
      return ret;
    },
    
    decode: function(text) {
      var ret = "",
          ch,
          newRet = '';
          
      for (i in text) {
        ch = this.mapInverse[text[i]];
        ret += ((typeof(ch) == "undefined") ? text[i] : ch);
      }
      
      for (i in ret) {
        ch = ret[i].charCodeAt(0);
        if (ch != 160 && ch != 8239 && ch != 8413) {
          newRet += ret[i];
        }
      }
      
      return newRet;
    },
    
    map: {},
    mapInverse: {}
  },
  
  
  
  // Puts a Square Combining Character after a letter, thus ensquaring it, squarily.
  squares: {
    init: function() {},
    
    encode: function(text) {
      var ret = "",
          ch,
          first = true;
          
      for (i in text) {
        if (text[i].charCodeAt(0) >= 33) {
          ch = text[i] + String.fromCharCode(8414);
          if (!first) {
            ch = String.fromCharCode(8239) + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(8239) + ch;
          }
        } else {
          ch = text[i];
        }
        
        ret += ch;
        first = (ch == '\n');
      }
      return ret;
    },
    
    decode: function(text) {
      var ret = "",
          ch;
          
      for (i in text) {
        ch = text[i].charCodeAt(0);
        if (ch != 160 && ch != 8239 && ch != 8414) {
          ret += text[i];
        }
      }
      
      return ret;
    }
  },
  
  
  // Same as squares, just round.
  roundsquares: {
    init: function() {},
    
    encode: function(text) {
      var ret = "",
          ch,
          first = true;
          
      for (i in text) {
        if (text[i].charCodeAt(0) >= 33) {
          ch = text[i] + String.fromCharCode(8419);
          if (!first) {
            ch = String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160) + ch;
          }
        } else {
          ch = text[i];
        }
        
        ret += ch;
        first = (ch == '\n');
      }
      return ret;
    },
    
    decode: function(text) {
      var ret = "",
          ch;
          
      for (i in text) {
        ch = text[i].charCodeAt(0);
        if (ch != 160 && ch != 8239 && ch != 8419) {
          ret += text[i];
        }
      }
      
      return ret;
    }
  },
  
  
  // Weird looking alternatives to most characters
  bent: {
    init: function() {

      // invert the map
      for (i in this.map) {
        this.map[this.map[i]] = i;
      }

    },

    encode: function(text) {
      var ret = '',
          ch;

      for (var i = 0, len = text.length; i < len; i++) {
        ch = this.map[text.charAt(i)];
        if (typeof(ch) == "undefined") {
          ch = text.charAt(i);
        }
        ret +=  ch;

      }    

      return ret;
    },

    decode: function(text) {
      var ret = '',
          ch;

      for (var i = 0, len = text.length; i < len; i++) {
        ch = this.map[text.charAt(i)];
        if (typeof(ch) == "undefined") {
            ch = text.charAt(i);
        }
        ret += ch;          
      }
      return ret;
    },

    // Thanks to Eddie Ringle for most lowercase letters: http://funicode.com
    map: {        
        'a' : 'ą',
        'b' : 'ҍ',      
        'c' : 'ç',  
        'd' : 'ժ',     
        'e' : 'ҽ', 
        'f' : 'ƒ', 
        'g' : 'ց', 
        'h' : 'հ', 
        'i' : 'ì',           
        'j' : 'ʝ', 
        'k' : 'ҟ',
        'l' : 'Ӏ',
        'm' : 'ʍ',
        'n' : 'ղ',
        'o' : 'օ',
        'p' : 'ք',
        'q' : 'զ',
        'r' : 'ɾ',
        's' : 'ʂ',
        't' : 'է',
        'u' : 'մ',
        'v' : 'ѵ',
        'w' : 'ա',
        'x' : '×',
        'y' : 'վ',
        'z' : 'Հ',
        'A' : 'Ⱥ',
        'B' : 'β',
        'C' : '↻',
        'D' : 'Ꭰ',
        'E' : 'Ɛ',
        'F' : 'Ƒ',
        'G' : 'Ɠ',
        'H' : 'Ƕ',
        'I' : 'į',
        'J' : 'ل',
        'K' : 'Ҡ',
        'L' : 'Ꝉ',
        'M' : 'Ɱ',
        'N' : 'ហ',
        'O' : 'ට',
        'P' : 'φ',
        'Q' : 'Ҩ',
        'R' : 'འ',
        'S' : 'Ϛ',
        'T' : 'Ͳ',
        'U' : 'Ա',
        'V' : 'Ỽ',
        'W' : 'చ',
        'X' : 'ჯ',
        'Y' : 'Ӌ',
        'Z' : 'ɀ',
        '0' : '⊘',
        '1' : '1',
        '2' : 'ϩ',
        '3' : 'Ӡ',
        '4' : '५',
        '5' : 'Ƽ',
        '6' : 'Ϭ',
        '7' : '7',
        '8' : '8',
        '9' : '९',
        '&' : '⅋',
        '(' : '{',
        ')' : '}',
        '{' : '(',
        '}' : ')',
        
        'ä' : 'ą'+'\u0308',
        'ö' : 'օ'+'\u0308',
        'ü' : 'մ'+'\u0308',
        'Ä' : 'Ⱥ'  + '\u0308',
        'Ö' : 'ට'+'\u0308',
        'Ü' : 'Ա'+'\u0308',
        
        'é' : 'ҽ' + '\u0301',
        'á' : 'ą' + '\u0301',
        'ó' : 'օ' + '\u0301',
        'ú' : 'մ' + '\u0301',
        'É' : 'Ɛ' + '\u0301',
        'Á' : 'Ⱥ' +  '\u0301',
        'Ó' : 'ට' + '\u0301',
        'Ú' : 'Ա' + '\u0301',
        
        'è' : 'ҽ' + '\u0300',
        'à' : 'ą' + '\u0300',
        'ò' : 'օ' + '\u0300',
        'ù' : 'մ' + '\u0300',
        'È' : 'Ɛ' + '\u0300',
        'À' : 'Ⱥ'  +  '\u0300',
        'Ò' : 'ට' + '\u0300',
        'Ù' : 'Ա' + '\u0300',
        
        'ê' : 'ҽ' + '\u0302',
        'â' : 'ą' + '\u0302',
        'ô' : 'օ' + '\u0302',
        'û' : 'մ' + '\u0302',
        'Ê' : 'Ɛ' + '\u0302',
        'Â' : 'Ⱥ'  +  '\u0302',
        'Ô' : 'ට' + '\u0302',
        'Û' : 'Ա' + '\u0302'        
    }
  },
  
  
  // Tiny Capitals
  tiny: {
    init: function() {

      // invert the map
      for (i in this.map) {
        this.map[this.map[i]] = i;
      }

    },

    encode: function(text) {
      var ret = '',
          ch;
      text = text.toUpperCase();
      for (var i = 0, len = text.length; i < len; i++) {
        ch = this.map[text.charAt(i)];
        if (typeof(ch) == "undefined") {
          ch = text.charAt(i);
        }
        ret +=  ch;

      }    

      return ret;
    },

    decode: function(text) {
      var ret = '',
          ch;

      for (var i = 0, len = text.length; i < len; i++) {
        ch = this.map[text.charAt(i)];
        if (typeof(ch) == "undefined") {
            ch = text.charAt(i);
        }
        ret += ch;          
      }
      return ret;
    },

    // TODO: Find small lower case letters
    map: {        
        'A' : 'ᴀ',
        'B' : 'ʙ',
        'C' : 'ᴄ',
        'D' : 'ᴅ',
        'E' : 'ᴇ',
        'F' : 'ꜰ',
        'G' : 'ɢ',
        'H' : 'ʜ',
        'I' : 'ɪ',
        'J' : 'ᴊ',
        'K' : 'ᴋ',
        'L' : 'ʟ',
        'M' : 'ᴍ',
        'N' : 'ɴ',
        'O' : 'ᴏ',
        'P' : 'ᴘ',
        'Q' : 'Q',
        'R' : 'ʀ',
        'S' : 'ꜱ',
        'T' : 'ᴛ',
        'U' : 'ᴜ',
        'V' : 'ᴠ',
        'W' : 'ᴡ',
        'X' : 'x',
        'Y' : 'ʏ',
        'Z' : 'ᴢ'
    }
  }

 
  
  
};



////// functions


// init
for (i in this.tools) {
  this.tools[i].init();
}



// Encode every character: U+00A0 -> &#x00a0; etc. 
this.getHTML = function(text) {
  var html = '',
      ch,
      lastSpaceWasNonBreaking = true, // for alternating [non-braking] spaces
      highSurrogate = 0,
      codepoint = 0;        
      
  for (var i = 0, len = text.length; i < len; i++) {
    ch = text.charCodeAt(i);
    
    // line break: add <br>\n
    if (ch == 10 || ch == 13) {
      html += '<br>\n';
      lastSpaceWasNonBreaking = true;
      
    // space: add alternating space and non-breaking space (U+00A0). Otherwise
    // a series of normal spaces       would collapse to one in the browser  
    } else if (ch == 32) {
      if (lastSpaceWasNonBreaking) {
        html += ' ';
        lastSpaceWasNonBreaking = false;
      } else {
        html += '&nbsp;';
        lastSpaceWasNonBreaking = true;
      }        
    
    // Normal character: Decode. Special cases for higher numbers:
    // http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
    } else {
      
      
      // Character is high surrogate: Remember and continue
      if (ch >= 0xD800 && ch <= 0xDBFF) {
        highSurrogate = ch;
        codepoint = 0;
      
      // last character was high surrogate: Combine with low surrogate  
      } else if (highSurrogate > 0) {
        
        // If char is low surrogate:
        if (ch >= 0xDC00 && ch <= 0xDFFF) {
          codepoint = (highSurrogate-0xD800)*1024 + (ch-0xDC00) + 0x10000;
        }
        highSurrogate = 0;
      
      // no surrogates: Just take the character  
      } else {
        codepoint = ch;
      }

      if (codepoint != 0) {
        html += '&#x' + codepoint.toString(16) + ';';
        lastSpaceWasNonBreaking = true;
      }

    }
  }
  
  return html;
}  
}

// CUTE TEXT:


var food = ["🍬", "🍭", "🍒", "🍎", "🍉", "🍇", "🍓", "🍌", "🍑", "🍰", "🎂", "🍩", "🍪", "🍧", "🍦", "🍫", "🍡"];
var twinkles = ["⚛", "🌌", "🌠", "*", ":", "｡", "･ﾟ", "✧", "✮", "★", "✩", "⋆", ".", "°", "`", "✴", "｡", "✴", "⋆", "✳", "✶", "✷", "❈"];
var animals = ["🐯", "🐎", "🐖", "🐷", "🐏", "🐑", "🐐", "🐫", "🐘", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿", "🐻", "🐨", "🐼", "🐾", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊", "🐸", "🐢", "🐳", "🐋", "🐬", "🐟", "🐠", "🐡", "🐙", "🐚", "🐌", "🐞"];

var flourish = ["•?((¯°·._.• ", "ıllıllı ", "¸,ø¤º°`°º¤ø,¸¸,ø¤º° ", "°°°·.°·..·°¯°·._.· ", "•´¯`•. ", "×º°”˜`”°º× ", "•]••´º´•» ", "]|I{•------» ", "§.•´¨'°÷•..× ", "•°¯`•• ", "(¯`·.¸¸.·´¯`·.¸¸.-> ", "*´¯`*.¸¸.*´¯`* ", "(¯`·.¸¸.-> °º ", "°·.¸.·°¯°·.¸.·°¯°·.¸.-> ", "•._.••´¯``•.¸¸.•` ", "¸„.-•~¹°”ˆ˜¨ ", "(¯´•._.• ", "••¤(`×", "•´¯`•» ", "`•.,¸¸,.•´¯ ", "¸,ø¤º°`°º¤ø,¸ ", ".o0×X×0o. ", ",-*'^'~*-.,_,.-*~ ", "`•.¸¸.•´´¯`••._.• ", "—(••÷", "¤¸¸.•´¯`•¸¸.•..>> ", "••.•´¯`•.•• ", ".•°¤*(¯`★´¯)*¤° ", "๑۞๑,¸¸,ø¤º°`°๑۩ ", "-漫~*'¨¯¨'*·舞~ ", "★·.·´¯`·.·★ ", "▁ ▂ ▄ ▅ ▆ ▇ █ ", "▀▄▀▄▀▄ ", "▌│█║▌║▌║ "];

function boundingString(n) {
return randomElement([foodString, twinkleString, animalString, flourishString])(n);
}
function foodString(n) {
return new Array(n + 1).join('0').split('').map(function (a) { return randomElement(food); }).join(' ⋆ ');
}
function twinkleString(n) {
return new Array(n + 1).join('0').split('').map(function () { return randomElement(twinkles); }).join("");
}
function animalString(n) {
return new Array(n + 1).join('0').split('').map(function (a) { return randomElement(animals); }).join(' ⋆ ');
}
function flourishString(n) {
return randomElement(flourish);
}
function scriptify(text) {
var map = { "0": "𝟢", "1": "𝟣", "2": "𝟤", "3": "𝟥", "4": "𝟦", "5": "𝟧", "6": "𝟨", "7": "𝟩", "8": "𝟪", "9": "𝟫", "a": "𝒶", "b": "𝒷", "c": "𝒸", "d": "𝒹", "e": "𝑒", "f": "𝒻", "g": "𝑔", "h": "𝒽", "i": "𝒾", "j": "𝒿", "k": "𝓀", "l": "𝓁", "m": "𝓂", "n": "𝓃", "o": "𝑜", "p": "𝓅", "q": "𝓆", "r": "𝓇", "s": "𝓈", "t": "𝓉", "u": "𝓊", "v": "𝓋", "w": "𝓌", "x": "𝓍", "y": "𝓎", "z": "𝓏", "A": "𝒜", "B": "𝐵", "C": "𝒞", "D": "𝒟", "E": "𝐸", "F": "𝐹", "G": "𝒢", "H": "𝐻", "I": "𝐼", "J": "𝒥", "K": "𝒦", "L": "𝐿", "M": "𝑀", "N": "𝒩", "O": "𝒪", "P": "𝒫", "Q": "𝒬", "R": "𝑅", "S": "𝒮", "T": "𝒯", "U": "𝒰", "V": "𝒱", "W": "𝒲", "X": "𝒳", "Y": "𝒴", "Z": "𝒵" };
var charArray = text.split("");
for (var i = 0; i < charArray.length; i++) {
  if (map[charArray[i].toLowerCase()]) {
    charArray[i] = map[charArray[i]];
  }
}
text = charArray.join("");
return text;
}
function shuffleArray(array) {
var currentIndex = array.length, temporaryValue, randomIndex;
// While there remain elements to shuffle...
while (0 !== currentIndex) {
  // Pick a remaining element...
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
  // And swap it with the current element.
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
}
return array;
}
function randomElement(a) {
return a[Math.floor(Math.random() * a.length)];
}
//https://github.com/mathiasbynens/esrever
!function (e) { var o = "object" == typeof exports && exports, r = "object" == typeof module && module && module.exports == o && module, n = "object" == typeof global && global; (n.global === n || n.window === n) && (e = n); var t = /(<%= allExceptCombiningMarks %>)(<%= combiningMarks %>+)/g, i = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g, f = function (e) { e = e.replace(t, function (e, o, r) { return f(r) + o }).replace(i, "$2$1"); for (var o = "", r = e.length; r--;)o += e.charAt(r); return o }, l = { version: "<%= version %>", reverse: f }; if ("function" == typeof define && "object" == typeof define.amd && define.amd) define(function () { return l }); else if (o && !o.nodeType) if (r) r.exports = l; else for (var a in l) l.hasOwnProperty(a) && (o[a] = l[a]); else e.esrever = l }(this);



// CRAZY TEXT
function fullCrazy(text) {
if (text.trim() === "") return "";
return randomSymbols(2) + "  " + crazifyText(text) + "  " + randomSymbols(2)
}
function crazifyText(text) {
text = text.split("");
for (var i = 0; i < text.length; i++) { text[i] = crazifyCharacter(text[i]); }
return text.join("");
}
function crazifyCharacter(c) {
c = c.toLowerCase();
var map = { "&": "⅋", "%": ["⅍", "℀", "℁", "℆", "℅"], "0": ["０", "Ѳ", "ʘ"], "1": ["➀", "❶", "１"], "2": ["２", "❷", "➁"], "3": ["３", "❸", "➂"], "4": ["４", "❹", "➃"], "5": ["❺", "➄", "５"], "6": ["６", "❻", "➅"], "7": ["７", "❼", "➆"], "8": ["８", "➇", "❽"], "9": ["➈", "❾", "９"], "<": ["≼", "≺", "≪", "☾", "≾", "⋜", "⋞", "⋐", "⊂", "⊏", "⊑", "《", "＜", "❮", "❰", "⫷"], ">": "☽≫≻≽≿⋝⋟⋑⊃⊐⊒⫸》＞❯❱", "[": "【〖〘〚［", "]": "】〗〙〛］", "*": "✨✩✪✫✬✭✮✯✰✦✱✲✳✴✵✶✷֍֎✸✹✺✻✼✽✾✿❀❁❂❃❄★☆＊", "a": ["Ⓐ", "ⓐ", "α", "Ａ", "ａ", "ᗩ", "卂", "Δ", "ค", "α", "ά", "Ã", "𝔞", "𝓪", "𝒶", "𝓐", "𝐀", "𝐚", "𝔸", "𝕒", "ᵃ"], "b": ["Ⓑ", "ⓑ", "в", "Ｂ", "乃", "ｂ", "ᗷ", "β", "๒", "в", "в", "β", "𝔟", "𝓫", "𝒷", "𝓑", "𝐁", "𝐛", "𝔹", "𝕓", "ᵇ"], "c": ["Ⓒ", "ⓒ", "匚", "¢", "Ｃ", "ｃ", "ᑕ", "Ć", "ς", "c", "ς", "Č", "℃", "𝔠", "𝓬", "𝒸", "𝓒", "𝐂", "𝐜", "ℂ", "𝕔", "ᶜ"], "d": ["Ⓓ", "ⓓ", "∂", "Ｄ", "ｄ", "ᗪ", "Đ", "๔", "∂", "đ", "Ď", "𝔡", "𝓭", "𝒹", "𝓓", "𝐃", "ᗪ", "𝐝", "𝔻", "𝕕", "ᵈ"], "e": ["Ⓔ", "乇", "ⓔ", "є", "Ｅ", "ｅ", "ᗴ", "€", "є", "ε", "έ", "Ẹ", "𝔢", "𝒆", "𝑒", "𝓔", "𝐄", "𝐞", "𝔼", "𝕖", "ᵉ"], "f": ["Ⓕ", "ⓕ", "ƒ", "Ｆ", "ｆ", "千", "ᖴ", "ℱ", "Ŧ", "ғ", "ғ", "Ƒ", "𝔣", "𝒇", "𝒻", "𝓕", "𝐅", "𝐟", "𝔽", "𝕗", "ᶠ"], "g": ["Ⓖ", "ⓖ", "ق", "g", "Ｇ", "ｇ", "Ǥ", "Ꮆ", "ﻮ", "g", "ģ", "Ğ", "𝔤", "𝓰", "𝑔", "𝓖", "𝐆", "𝐠", "𝔾", "𝕘", "ᵍ", "Ꮆ"], "h": ["Ⓗ", "卄", "ⓗ", "н", "Ｈ", "ｈ", "ᕼ", "Ħ", "ђ", "н", "ħ", "Ĥ", "𝔥", "𝓱", "𝒽", "𝓗", "𝐇", "𝐡", "ℍ", "𝕙", "ʰ"], "i": ["Ⓘ", "ⓘ", "ι", "Ｉ", "ｉ", "Ꭵ", "丨", "Ɨ", "เ", "ι", "ί", "Į", "𝔦", "𝓲", "𝒾", "𝓘", "𝐈", "𝐢", "𝕀", "𝕚", "ᶤ"], "j": ["Ⓙ", "ⓙ", "נ", "Ｊ", "ڶ", "ｊ", "ᒎ", "Ĵ", "ן", "נ", "ј", "Ĵ", "𝔧", "𝓳", "𝒿", "𝓙", "𝐉", "𝐣", "𝕁", "𝕛", "ʲ"], "k": ["Ⓚ", "ⓚ", "к", "Ｋ", "ｋ", "ᛕ", "Ҝ", "к", "к", "ķ", "Ќ", "𝔨", "𝓴", "𝓀", "𝓚", "𝐊", "𝐤", "𝕂", "𝕜", "ᵏ", "Ҝ"], "l": ["Ⓛ", "ⓛ", "ℓ", "ㄥ", "Ｌ", "ｌ", "ᒪ", "Ł", "l", "ℓ", "Ļ", "Ĺ", "𝔩", "𝓵", "𝓁", "𝓛", "𝐋", "𝐥", "𝕃", "𝕝", "ˡ"], "m": ["Ⓜ", "ⓜ", "м", "Ｍ", "ｍ", "ᗰ", "Μ", "๓", "м", "м", "ϻ", "𝔪", "𝓶", "𝓂", "𝓜", "𝐌", "𝐦", "𝕄", "𝕞", "ᵐ", "爪"], "n": ["Ⓝ", "几", "ⓝ", "η", "Ｎ", "ｎ", "ᑎ", "Ň", "ภ", "η", "ή", "Ň", "𝔫", "𝓷", "𝓃", "𝓝", "𝐍", "𝐧", "ℕ", "𝕟", "ᶰ"], "o": ["Ⓞ", "ㄖ", "ⓞ", "σ", "Ｏ", "ｏ", "ᗝ", "Ø", "๏", "σ", "ό", "Ỗ", "𝔬", "𝓸", "𝑜", "𝓞", "𝐎", "𝐨", "𝕆", "𝕠", "ᵒ"], "p": ["Ⓟ", "ⓟ", "ρ", "Ｐ", "ｐ", "卩", "ᑭ", "Ƥ", "ק", "ρ", "ρ", "Ƥ", "𝔭", "𝓹", "𝓅", "𝓟", "𝐏", "𝐩", "ℙ", "𝕡", "ᵖ"], "q": ["Ⓠ", "ⓠ", "q", "Ｑ", "ｑ", "Ɋ", "Ω", "ợ", "q", "q", "Ǫ", "𝔮", "𝓺", "𝓆", "𝓠", "𝐐", "𝐪", "ℚ", "𝕢", "ᵠ"], "r": ["Ⓡ", "ⓡ", "я", "尺", "Ｒ", "ｒ", "ᖇ", "Ř", "г", "я", "ŕ", "Ř", "𝔯", "𝓻", "𝓇", "𝓡", "𝐑", "𝐫", "ℝ", "𝕣", "ʳ"], "s": ["Ⓢ", "ⓢ", "ѕ", "Ｓ", "丂", "ｓ", "ᔕ", "Ş", "ร", "s", "ş", "Ŝ", "𝔰", "𝓼", "𝓈", "𝓢", "𝐒", "𝐬", "𝕊", "𝕤", "ˢ"], "t": ["Ⓣ", "ⓣ", "т", "Ｔ", "ｔ", "丅", "Ŧ", "t", "т", "ţ", "Ť", "𝔱", "𝓽", "𝓉", "𝓣", "𝐓", "𝐭", "𝕋", "𝕥", "ᵗ"], "u": ["Ⓤ", "ⓤ", "υ", "Ｕ", "ｕ", "ᑌ", "Ữ", "ย", "υ", "ù", "Ǘ", "𝔲", "𝓾", "𝓊", "𝓤", "𝐔", "𝐮", "𝕌", "𝕦", "ᵘ"], "v": ["Ⓥ", "ⓥ", "ν", "Ｖ", "ｖ", "ᐯ", "V", "ש", "v", "ν", "Ѷ", "𝔳", "𝓿", "𝓋", "𝓥", "𝐕", "𝐯", "𝕍", "𝕧", "ᵛ"], "w": ["Ⓦ", "ⓦ", "ω", "Ｗ", "ｗ", "ᗯ", "Ŵ", "ฬ", "ω", "ώ", "Ŵ", "𝔴", "𝔀", "𝓌", "𝓦", "𝐖", "𝐰", "𝕎", "𝕨", "ʷ", "山"], "x": ["Ⓧ", "ⓧ", "χ", "Ｘ", "乂", "ｘ", "᙭", "Ж", "א", "x", "x", "Ж", "𝔵", "𝔁", "𝓍", "𝓧", "𝐗", "𝐱", "𝕏", "𝕩", "ˣ"], "y": ["Ⓨ", "ㄚ", "ⓨ", "у", "Ｙ", "ｙ", "Ƴ", "¥", "ץ", "ү", "ч", "Ў", "𝔶", "𝔂", "𝓎", "𝓨", "𝐘", "𝐲", "𝕐", "𝕪", "ʸ"], "z": ["Ⓩ", "ⓩ", "z", "乙", "Ｚ", "ｚ", "Ƶ", "Ž", "z", "z", "ž", "Ż", "𝔷", "𝔃", "𝓏", "𝓩", "𝐙", "𝐳", "ℤ", "𝕫", "ᶻ"] };
if (map[c]) { return randomElement(map[c]); }
else { return c; }
}
function randomElement(array) {
return array[Math.floor(Math.random() * array.length)]
}
function randomSymbols(n) {
var symbols = ["🐙", "🐉", "🐊", "🐒", "🐝", "🐜", "🐚", "🐲", "🐳", "🐸", "👑", "👹", "👺", "👤", "💲", "💣", "💙", "💚", "💛", "💜", "💝", "💗", "💘", "💞", "💔", "💥", "🐯", "🐼", "🐻", "🐺", "👌", "🐍", "🐧", "🐟", "🐠", "🐨", "🎯", "🏆", "🎁", "🎀", "🎉", "🎈", "🍮", "🍭", "🍬", "🍫", "🍪", "🍧", "🌷", "🍓", "😺", "😾", "✎", "😎", "😝", "😂", "😈", "😡", "😲", "😳", "🍔", "🍟", "🍩", "🎃", "🎄", "🎅", "🐣", "🐤", "👍", "👊", "👻", "👽", "👮", "💎", "💋", "👣", "💀", "💢", "🔥", "♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟", "♠", "♡", "♢", "♣", "♤", "♥", "♦", "♧", "♨", "♩", "♪", "♬", "★", "☆", "☺", "☹", "☯", "☮", "☢", "☠", "☟", "☞", "☝", "☜", "✌", "✋", "✊", "⛵", "ൠ", "✌", "ඏ"];
var s = [];
for (var i = 0; i < n; i++) s.push(randomElement(symbols));
return s.join("");
}

function randomangrytexticon(n) {
  var symbols = ["🐙", "💀", "💢", "🔥","✊","(¬､¬)","(⩺_⩹)","(╰ ‿ ╯)","ಠ_ಠ","(◣_◢)","(¬▂¬)","༽◺_◿༼","ヾ(。◣∀◢。)ﾉ","┌∩┐(◣_◢)┌∩┐","（ ▽д▽）","-`д´-","（＞д＜）","(⸅⸟⸄)","⸨◺_◿⸩","∩ (◣_◢) ∩","(╬≖_≖)","(⦩_⦨)","☜(`o´)","Ψ(`_´ # )↝","┬─┬ノ(ಠ_ಠノ)","ヽ༼ ಠ益ಠ ༽ﾉ","ლ(⋋·⋌)ლ","(☞’益’☞)","⋋_⋌","( ⋋ · ⋌ )","＼(｀0´)／","(ง •̀_•́)ง","​〴⋋_⋌〵","＼(〇O〇)／","٩(๑ `н´๑)۶","(╯°□°）╯","凸ಠ益ಠ)凸","凸(⊙▂⊙✖ )","╭∩╮(-_-)╭∩╮","( ≧Д≦)","(　ﾟДﾟ)＜!!","(｡+･`ω･´)","૮(ꂧꁞꂧ)ა","(ᗒᗣᗕ)՞","ヾ( ･`⌓´･)ﾉﾞ","＼＼\\٩(๑`^´๑)۶//／／","໒( ⇀ ‸ ↼ )७","凸(｀0´)凸","凸(｀⌒´メ)凸","(☞◣д◢)☞","=͟͟͞͞( •̀д•́)))","( •̀ω•́ )σ","┌(▀Ĺ̯ ▀-͠ )┐","(ू˃̣̣̣̣̣̣︿˂̣̣̣̣̣̣ ू"];
  var s = [];
  for (var i = 0; i < n; i++) s.push(randomElement(symbols));
  return s.join("");
  }

function randomnaughtytexticon(n) {
    var symbols = ["^.~","(☭ ͜ʖ ☭)","(≖ ͜ʖ≖)","(͡o‿O͡) ***","ಸ‿ಸ","👉👌","( ㅅ )","╰⋃╯","( ͡⚆ ͜ʖ ͡⚆)╭∩╮","(｡)(｡)","(‿!‿)","( •_•)σ","🍆🍩🛏","(‿ˠ‿)( ͡⚆ ͜ʖ ͡⚆ )(‿ˠ‿)","8====D","ᕕ( ᐛ )ᕗ","(✿◦’ᴗ˘◦)♡","༼ つ ‿ ༽つ╰⋃╯","(‿!‿) ԅ(≖‿≖ԅ)","( • )( • )ԅ(≖⌣≖ԅ)","(✿˶’◡˘)♡"];
    var s = [];
    for (var i = 0; i < n; i++) s.push(randomElement(symbols));
    return s.join("");
    }

function randomkisstexticon(n) {
      var symbols = ["💋","😙","😘","💏🏿","💏","👨🏼‍❤️‍💋‍👩","(ʃƪ˘ﻬ˘)","(ु*´З`)ू","ᴓᴈᴓ","(ΦзΦ) ❤️","（。ˇ ⊖ˇ）","(ˇ⊖ˇ)","(~￣³￣)~","( ͡♥ 3 ͡♥)","(✿˘ω˘)˘ε˘˶ )","(´ε｀ )♡","ヾ(´〓｀)ﾉ","（￣ε￣ʃƪ）","(⋆ˆ ³ ˆ)♥","kiss(˘ε˘˶ )","(○ﾟεﾟ○)","( ˶⚈Ɛ⚈˵)","(ΘεΘ;) ･:*","( ˘ ³˘)♥","(ꈍᴗꈍ)ε｀*)","～～(／￣3)／ kiss～★","★⌒ヽ(´ ❥ `)","(ʃƪ˶˘ ﻬ ˘˶)","(^з^)-☆Chu!!","★⌒ヽ(●’､＾●)Kiss!","(ˆ⌣ˆ)ε｀●)","✿(* ＾)(＾ *)✿","(˶^ з^(〃‿〃♡)","(ɔˆ ³(ˆ⌣ˆc)","Ⴀ͡კႠ͡","(づ ￣ ³￣)づ","ㄖꏁㄖ","★⌒ヽ( ͡° ε ͡°)♥","𝓴𝓲𝓼𝓼 𝓶𝒆 𝓹𝓵𝒆𝓪𝓼𝒆 (´ ❥ `)ヽ⌒★","( ʃƪ˘ﻬ˘)(˘ ε˘ʃƪ)","( '}{' )","ლ(´◉❥◉｀ლ)","(っ˘³(•́ ᵕ •̀?)","(°૩°)৴♡* ৹","<( ￣ ≧￣)>","(✿˵ ꒡3꒡˵)","(-ε- )","(❀ •̀ᴗ•́ )♡(^ε^ )Lᵒᵛᵉᵧₒᵤ","*ଘ( ॢᵕ꒶̮ᵕ (꒡ᵋ ꒡ღ)","（ʃƪ＾3＾ ）","(✿˵•́ ૩•̀˵)৴♡*","(ღ ･ิ◡･ิ)ε ･ิ ღ)","*ଘ( ॢᵕ꒶̮ᵕ(꒡ᵋ ꒡ღ)zZ‥"];
      var s = [];
      for (var i = 0; i < n; i++) s.push(randomElement(symbols));
      return s.join("");
      }

function randomlovetexticon(n) {
        var symbols = ["❤️","💘","💑","💕","💞","💖","💝","♡","❤","❥","♥","❣","ƪ(♥ﻬ♥)ʃ","(｡♥‿♥｡)","( ♥ ͜ʖ ♥)","✿♥‿♥✿","༼♥ل͜♥༽","(>‿♥)","（♥￫ｏ￩♥）","(♡´౪`♡)","(◕♡◕)","(♥ω♥*)","(๑💗ᗜ💗)","(∿°○°)∿ ︵ ǝʌol","♥╣[-_-]╠♥","♱♡‿♡♰","♡ඩ⌔ඩ♡","( ＾◡＾)っ✂❤","(◍•ᴗ•◍)❤","ღƪ(ˆ◡ˆ)ʃ♡ƪ(ˆ◡ˆ)ʃ♪","⊂（♡⌂♡）⊃","♡＾▽＾♡","♡´･ᴗ･`♡","ℒℴѵℯ*¨*• ♡","( ﾟ∀ﾟ)ﾉ【I LOVE U】","(人･㉨･)♡","(●´□`)♡","(´∩｡• ᵕ •｡∩`) ♡","ⓛⓞⓥⓔ♡","꒒ ০ ⌵ ୧ ♡","(っ˘з(˘⌣˘ )","(๑♡3♡๑)","( ꈍ૩ꈍ(･ิω･ิ)♡","♡♡+.ﾟ(￫ε￩*)ﾟ+.ﾟ","♡( ˶˘ ³˘(˵ ͡° ͜ʖ ͡°˵)","♡+* Ɗɑɫë*+♡","ℒᵒᵛᵉᵧₒᵤ(°▽°๑)","♡〜٩( ╹▿╹ )۶〜♡","(o´〰`o)♡*✲ﾟ*｡","╰(✿´⌣`✿)╯♡","(ꈍ◡ꈍ)♥(❛ε❛⋆)","(ᴖ3ᴖ)♥(ᴖ◡ᴖ)","♡(｡￫ˇ艸￩)","(｡・‧̫・｡).*＊♡","(◍•ᴗ•◍)♡ ✧*。","♡｡ﾟ.(*♡´‿` 人´‿` ♡*)ﾟ♡ °・","( ´˘ᴗ˘)♡(´ ❥ `✿)","❤️ (•́ ω •̀๑)"];
        var s = [];
        for (var i = 0; i < n; i++) s.push(randomElement(symbols));
        return s.join("");
        }
function randomsadtexticon(n) {
          var symbols = ["(╯_╰)","⊙︿⊙","(ノ_<、)","ಠ⌣ಠ","(>_<)","╥﹏╥","(ノ_<。)","ಥ_ಥ","●︿●","(っ˘̩╭╮˘̩)っ","⊛ठ̯⊛","ಠ╭╮ಠ","(◕︿◕✿)","(つ﹏<。)","（πーπ）","(ﾉД`)","(‘A`)","༶ඬ༝ඬ༶","o(TヘTo)","(┳Д┳)","（；へ：）","（ｉДｉ）","(︶︹︺)","(Ｔ▽Ｔ)","(ㄒoㄒ)","(つω`｡)","(╥_╥)","( ﾟ，_ゝ｀)","(T⌓T)","（´＿｀）","(T＿T)","(／ˍ・、)","(;﹏;)","(ToT)","(┳◇┳)","(｡•́︿•̀｡)","(ಥ﹏ಥ)","(个_个)","( ╥ω╥ )","(⋟﹏⋞)","(ノ﹏ヽ)","o(〒﹏〒)o"];
          var s = [];
          for (var i = 0; i < n; i++) s.push(randomElement(symbols));
          return s.join("");
          }
function randomcrytexticon(n) {
            var symbols = ["（>﹏<）","( ɵ̥̥‸ɵ̥̥)","أ‿أ","(⋟﹏⋞)","( ༎ຶ⌑༎ຶ )","(˃̣̣̥⌓˂̣̣̥ )","(≖͞_≖̥)","(ʃᵕ̩̩ ᵕ̩̩)","༼ಢ_ಢ༽","༼ ﹏ ༽","(ಥ﹏ಥ)","ᕕ( ཀ ʖ̯ ཀ)ᕗ","(-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄_-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ )","༼;´༎ຶ ۝ ༎ຶ༽","╰(ɵ̥̥ ˑ̫ ɵ̥̥ ╰)","(TдT)","（；へ：）","(Ｔ▽Ｔ)","（ｉДｉ）","(´Д⊂ヽ","‧º·(˚ ˃̣̣̥⌓˂̣̣̥ )‧º·","╥﹏╥","(ノ﹏ヽ)","(;Д;)","(┳Д┳)","ヽ༼ຈل͜ຈ༽ﾉ","(˚ ˃̣̣̥⌓˂̣̣̥ )","(;﹏;)","(´;︵;`)","(இ﹏இ`｡)","( T ʖ̯ T)","(T⌓T)","(´ ͡༎ຶ ͜ʖ ͡༎ຶ `)︵‿︵","(ಥ _ʖಥ)","(つ﹏⊂)","༼☯﹏☯༽","(☍﹏⁰)｡","(つд⊂)","／༼ ༏༏ີཻ༾ﾍ ༏༏ີཻ༾༾༽༽","|₋ॢọ̶̶̷̥᷅๑)‧˚⁺","( ‘́⌣’̀)/(˘̩̩ε˘̩ƪ)","˚‧º·(˃̣̣̥∩˂̣̣̥)‧º·˚","α ～ (´｀d )","˚‧º·(′̥̥̥ o ‵̥̥̥)‧º·˚","(=ఠ్ఠܫఠ్ఠ =)∫","( ＞Д＜ )ゝ”","( ´•̥̥̥o•̥̥̥`)♡(˘̩̩̩̩̩̩ ⌂ ˘̩̩̩̩̩̩)","( ´•̥̥̥o•̥̥̥`)(˃̣̣̥╭╮˂̣̣̥)‧º·˚","(✖﹏✖)","ʕ ಡ ﹏ ಡ ʔ","(༎ຶ⌑༎ຶ)"];
            var s = [];
            for (var i = 0; i < n; i++) s.push(randomElement(symbols));
            return s.join("");
            }


function randomeatingtexticon(n) {
              var symbols = ["♨(⋆‿⋆)♨","(￣￢￣ヾ)","~:<>","(* ^◇^)_旦","(○ ^ω^)_旦~~♪","( -_- )旦~","┬─┬(◕‿◕♡)","(＃´ ー´)旦","🍉ԅ( ͒ ۝ ͒ )","(　´∀｀)つ―●○◎","且_(ﾟ◇ﾟ；)ノﾞ","🍔ԅ( ͒ ۝ ͒ )","( *･∀･)_Ω~","( ･ิ⌣･ิ) 🍌(‘∀’●)♡","( ˘▽˘)っ♨","( o^ ^o)且 且(´ω`*)","◥█̆̈◤ ࿉∥","(ꈍ૩(✿•ᴗ•) 🍴","🍲-(-‿- )","(　ﾟДﾟ )⊃旦","（￣ ｗ￣）Ψ","✧( ु•⌄• )◞🍝🍝◟( •⌄• )✧","🍦ԅ( ͒ ۝ ͒ )","~~旦_(- ω-｀｡)","~旦_ (^O^ )","♨o(>_<)o♨","(* ´・ω)o旦~┏┓","ℓ ϚϦοςӧԼձϮϵ⃛","(✿´ ‿`)🍨🍨(╹ワ╹✿)","( ◑‿◑)ɔ┏🍟--🍔┑٩(^◡^ )","♪o<( ´∀｀)っ┌iii┐","（　＾▽-）∠※☆","((っ˘ڡ˘ς)🥄 🍛 🥄(*ﾟ∀ﾟ* )","(´ཀ`」∠)","(* ^◇^)_旦"];
              var s = [];
              for (var i = 0; i < n; i++) s.push(randomElement(symbols));
              return s.join("");
              }
function randomsurprisedtexticon(n) {
                var symbols = ["╭( ๐_๐)╮","(;° ロ°)","∑(; °Д°)","(∵) Wow!","(○（●●）○)","(⚆ᗝ⚆)","( ◐ o ◑ )","⋋| ◉ ͟ʖ ◉ |⋌","ต(ꏿ᷅௰ꏿ᷄)ต","\(๑•́o•̀๑)/","⌒(,,๏ ⋏ ๏,,)⌒","／(=๏ x ๏=)＼","(◯Δ ◯ ∥)","(๑ơ艸ơ๑)","(; ꒪ö꒪)","(⊙︿⊙ ✿)","(ʘᗩʘ’)","(○□○)","( ‘◇’)","(✿〇∀〇)","(!! ´◯`)∑","( Ŏ艸Ŏ)","☉Ô☉","╭(* _ *)╮","（＞0＜；；；）","＜('0 ')＞","〣 ( ºΔº ) 〣","(ὀ⌓ὀ⑅)","┌╏ º □ º ╏┐","(ᵒ̤̑ ₀̑ ᵒ̤̑) wow!*✰","٩(●ö●)۶","(๑♡ ⌓♡๑)","(ﾟoﾟ〃)","(☉௰☉ິັ໌໋໊)","ヽ(๏ ∀๏ )ﾉ","( ;ↀ⌓ↀ)","@(。・0・)@","(｢ ⊙Д⊙)｢","(◎0◎)","(((; ఠ ਉ ఠ))","（ ﾟ Дﾟ)","∑(ΦдΦlll","c( O.O )ɔ","╰། ◉ ◯ ◉ །╯","੧[ ⁰ o ⁰ ]ʋ"];
                var s = [];
                for (var i = 0; i < n; i++) s.push(randomElement(symbols));
                return s.join("");
                }

function randomcutetexticon(n) {
                  var symbols = ["⊙▂⊙","(⌐■_■)","٩(⊙‿⊙)۶","( ◥◣_◢◤ )","ლ(◉‿◉ ლ)","(ノಠൠಠ)ノ彡┻━┻","ᕙ(‾̀◡‾́)ᕗ","／(=⌒x⌒=)＼","⊹⋛⋋( ●´⌓`●)⋌⋚⊹","(┳◡┳)","( ˇ෴ˇ)>⌐■-■","(｡´╹A╹｀｡)","✬̴⃛꒰⁍̴ꈊ ॢ⁍̴⌯꒱","٩꒰ ˘ ³˘꒱۶~♡","( •_•)>⌐■-■","=͟͟͞͞ =͟͟͞͞ ﾍ ( ´ Д `)ﾉ","(┳◇┳)","(。┰ω┰。)","(-‿◦☀)","(━┳━ _ ━┳━)",".·´¯`(>▂⁢)´¯`·.","…ᘛ⁐̤ᕐᐷ","(⁎❛ ꒩ુ ❛⁎)","(◎-◎；)","ɿ(｡･ɜ･)ɾ Ⓦⓗⓨ？ ɿ(｡･ɜ･)ɾ Ⓦⓗⓐⓣ？","ू(ʚ̴̶̷́ .̠ ʚ̴̶̷̥̀ ू)","( ๑ ᴖ ᴈ ᴖ)ᴖ ᴑ ᴖ๑)❣","(๑ˊ͈ ॢꇴ ˋ͈)〜♡॰ॱ","(－_－) zzZ","( ⋆•ิ ᴈ-ิ(ᵕ❥ ᵕ⁎ ॢ)","(◑‿◐)","ॱ॰⋆(˶ॢ‾᷄﹃‾᷅˵ॢ) ӵᵘᵐᵐᵞ ♡♡♡","♫꒰･‿･๑꒱","˛˛ƪ(⌾⃝ ౪ ⌾⃝ ๑)و ̉ ̉","(っ˘ڡ˘ς)","(ᵒ̴̶̷̤́◞౪◟ ᵒ̴̶̷̤̀ )","(⁎ ⚈᷀᷁ ᴗ ⚈᷀᷁ ⁎)","⁝⁞⁝⁞ʕु•̫͡•ʔु☂⁝⁞⁝⁝","*✧₊✪͡◡ू✪͡","ヘ(^_^ヘ) ヘ(^o^ヘ)","⁺✧.(˃̶ ॣ⌣ ॣ˂̶∗̀)ɞ⁾","╰(⸝⸝⸝´꒳`⸝⸝⸝)╯","٩(｡θᗨθ｡)۶","٩(•̤̀ᵕ•̤́๑)ᵒᵏᵎᵎᵎᵎ"];
                  var s = [];
                  for (var i = 0; i < n; i++) s.push(randomElement(symbols));
                  return s.join("");
                  }
function randomdepressedtexticon(n) {
                    var symbols = ["（◞‸◟）","(っ´ω｀c)","◕︵◕","(︶︹︺)","从´_υ｀从","(ノ_<。)","(◡︵◡)","(´-ι_-｀)","(*^﹏^*)","(^+.+^)","(˃̣̣̥︿˂̣̣̥)","(--_--)","(´・ω・｀)","'(ﾟ▽ﾟ)'","（ー○ー）＝３","(ｏ´_｀ｏ)","(ﾉω･｀o)","(∥￣■￣∥)","(◢ д ◣)","(´-ω-`)","(*ノз`*)","ε(*´･ω･)з","( oꆤ︵ꆤo)","(￣ ￣|||)","(.づ◡﹏◡)づ.","໒( •́ ∧ •̀ )७","(((0へ0)]","⊙︿⊙","(；⌣̀_⌣́)","(；￣Д￣)","(✿˘̩̩̩̩̩̩ヘ˘̩̩̩̩̩̩ )","(i々i)］","( ´-ω-` )","“∵”","꒰•⌓•꒱","(=˃̣̣̥᷄ᆽ˂̣̣̥᷅=)ฅ","( っ´ω｀c)","( ఠ్ఠᗣఠ్ఠ )","ʕTᴥT ʔ","(✿˃̣̣̥‸˂̣̣̥᷅ )","且_(・-・)","∩︵∩","( ´･仝･｀)","( ´〒^〒`)","˚‧º·(˃̣̣̥⌓˂̣̣̥)‧º·˚","（（（(T-T*)）））","Sorry (◞‸◟ㆀ)","(╥╯⌒╰╥๑)","(Ő︵Ő)"];
                    var s = [];
                    for (var i = 0; i < n; i++) s.push(randomElement(symbols));
                    return s.join("");
                    }
function randomgoodmorningtexticon(n) {
                      var symbols = ["◝(^⌣^)◜","☀（ ´Ｏ｀）～","٩(`･ω･´)و ☀️","Good ヽ(o≧ω≦o)ﾉ Morning ﾟ.:｡+ﾟ","ﾟ:*(* ω )ﾉ” Good morning ヾ( ω *)･ﾟ","( ^ω^ )☀️","Good elf morning ヽ(｡ゝω・｡)ﾉ","☀️(-⊡ω⊡)","(•ө•)💙","(๑╹ω╹๑ )☀️","(｡･`ω´･)ﾉ･*:..｡o *ﾟ｡+ﾟGOOD MORNING!｡+ﾟ","Mor*´○｀)/ning*´▽｀)/~~","Good morning(*`・ω・´)","♡ͫ ͦ ͬⁿⁱⁿᵍ꒰ •ᴗ•｡꒱۶","G࿁࿁ძ ൬໐ɼn૧ฑg (つω-｀)ノ゛","㇏( ෆั ⌣ ෆั )ﾉցօօժ ʍօɾղíղց","☻⋆˚✩Ꮹ∞ძ ოǫɾлілϧ ༘*ೄ˚☻","꒸ᵒ০ⅆ ᵐꄲᖇ∩ⁱ∩ᵍ ♡ ⡷⠶⢾","~ ~(灬 ω 灬)"];
                      var s = [];
                      for (var i = 0; i < n; i++) s.push(randomElement(symbols));
                      return s.join("");
                      }

function randomgoodnighttexticon(n) {
                        var symbols = ["( ︶｡︶✽)","◝(^௰^)◜","(_ _ ) Zzz z","〜ɢᵒᵒᵈ ɴⁱᵍᵗʰ( ᵕᴗᵕ)*･☪︎·̩͙","*ଘ( ॢᵕ꒶̮ᵕ(꒡ᵋ ꒡ღ)zZ","(_ _ ) Zzz z~ Good night","\good night( ᵕᴗᵕ)*・☪︎·̩͙/","Zzz..(ˇ㉨ˇ๑) Good night☆","Lemme go back to sleep!＼(*´Ｑ｀*)／～ｏ○◯","(ㅅꈍ﹃ꈍ)*gᵒᵒᒄ ᵑⁱgᑋᵗ*(ꈍ﹃ꈍㅅ)♡","ヾ( _ﾟ【ﾟo ｡Good йigнт｡Oﾟ】ﾟ_○)ﾉ","Gооd Йight(´ε｀* )ιον∈ Υου","Good(*´ -`)(´- `*)Night","(＊’͜’ )⋆ ᎶᎾᎾⅅ ℕᏐᎶℍᎢ ☾","(´つз-)｡O.ﾟ｡*Zzz","(*ﾟ∀ﾟ)っ［.+:｡☆Good Night☆.+:｡］","꒰ ꒡⌓꒡꒱ᏩɵɵᎴ ɳɩɠɧ✟"];
                        var s = [];
                        for (var i = 0; i < n; i++) s.push(randomElement(symbols));
                        return s.join("");
                        }


function randomweddinganniversarytexticon(n) {
                          var symbols = ["👫🏻","👩‍❤️‍👨","❤️♡","👩🏼‍❤️‍💋‍👩🏼","👩🏻‍❤️‍💋‍👩🏼","ﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـ","꒒ ০ ⌵ ୧ ♡","👯","꒒ ০ ⌵ ୧ ♡","♡･ᴗ･`♡","🥳","🎗","🥰❤","🎊","👰🏻","👩🏻‍❤️‍💋‍👩🏼","💄","🎉🥳🥂","💝🎂🎀","🖤🎂🥂🍾🤎"];
                          var s = [];
                          for (var i = 0; i < n; i++) s.push(randomElement(symbols));
                          return s.join("");
                          }

$(document).ready(function () {
$("#loader").hide();

$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $('#scroll').fadeIn();
  } else {
    $('#scroll').fadeOut();
  }
});
$('#scroll').click(function () {
  $("html, body").animate({ scrollTop: 0 }, 600);
  return false;
});
});

 
function regen() {



  if (text == "") {
    text = "Cool Symbol"
  }
 gen(text)


}


function randomgen() {

  $("#random-cloud").html('');

  var inputtext = $('#thenitesharya-text').val();

  if (inputtext == "") {
    inputtext = "Cool Symbol"
  }
  inputtext = inputtext.trim();


  i=0;

  while (i < 6) {
    random = Math.floor(Math.random() * 7);

    $("#random-cloud").prepend('<div class="item size' + random + '">' + wrapInFlourish(randomfun(inputtext)) + '</div>');
    
    i++;
  }

  


}

(function($){

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *		 the user visible viewport of a web browser.
   *		 only accounts for vertical position, not horizontal.
   */
  $.fn.visible = function(partial){
    
      var $t				= $(this),
        $w				= $(window),
        viewTop			= $w.scrollTop(),
        viewBottom		= viewTop + $w.height(),
        _top			= $t.offset().top,
        _bottom			= _top + $t.height(),
        compareTop		= partial === true ? _bottom : _top,
        compareBottom	= partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };
    
})(jQuery);

if ($("#random-cloud")[0]){
    setInterval(function(){ 

      if ($('#random-cloud').visible(true)) {

      randomgen();
    } else {
    }
    
    }, 3000);

} else {
}




  // Creepify Tool

  // Set the padding of the second textarea, so that all diacritics are visible but
  // the textareas height doesn't change
  function setCreepifyPadding() {
     

      var setTop = $('#creepify_check_top').prop('checked'),
          setBottom = $('#creepify_check_bottom').prop('checked'),
          diacriticsNumber = $('#creepify_maxHeight').val(),
          $textarea = $('.lunicreepify');

      var padding = (5 + 5 * diacriticsNumber); // 5px initial padding + 5px for every diacritic

      if ((setTop && !setBottom) || (!setTop && setBottom)) {
          padding = Math.min(creepifyTextareaHeight - 5, padding);

          if (setTop && !setBottom) {
              $textarea.css({'padding-top': padding + "px", 'padding-bottom': '5px'});
          }
          if (!setTop && setBottom) {
              $textarea.css({'padding-top': "5px", 'padding-bottom': padding + 'px'});
          }

      } else if (setTop && setBottom) {
          padding = Math.min(creepifyTextareaHeight / 2, padding);
          $textarea.css({'padding-top': padding + "px", 'padding-bottom': padding + 'px'});

      } else if (!(setTop || setBottom)) {
          $textarea.css({'padding-top': "5px", 'padding-bottom': '5px'});
      }

  }

  // Init from object
  $('#creepify_check_top').prop('checked', luni.tools.creepify.options.top);
  $('#creepify_check_middle').prop('checked', luni.tools.creepify.options.middle);
  $('#creepify_check_bottom').prop('checked', luni.tools.creepify.options.bottom);
  $('#creepify_maxHeight').val(luni.tools.creepify.options.maxHeight);
  $('#creepify_randomization').val(luni.tools.creepify.options.randomization);

  var creepifyTextareaHeight = 180;//$('#text_panel_creepify textarea[name=encoded]').outerHeight();

  // set textarea padding if top/bottom is set, so the top/bottom diacritics are visible
  setCreepifyPadding();

  var currentPlainText = '';

  var currentPanelID;

  var inputtext = $('#thenitesharya-text').val();

  if (inputtext == "") {
    inputtext = "Cool Symbol"
    }
  // Set options and refresh
  // Checkboxes

    $(document).on("click", "#text_panel_creepify input[type=checkbox]", function () {  


      var name = $(this).attr('id').split("_")[2];


      luni.tools.creepify.options[name] = $(this).prop('checked');


      $('.lunicreepify').html(luni.tools.creepify.encode(inputtext));


  
     

      // more textarea padding-top/bottom to show the top/bottom diacritics
      if (name == "top" || name == "bottom") {
          setCreepifyPadding();
      }

  });


  // Range
  //$('#text_panel_creepify input[type=range]').change(function () {

    $(document).on("change", "#text_panel_creepify input[type=range]", function () {  

      


      var name = $(this).attr('id').split("_")[1];

      luni.tools.creepify.options[name] = $(this).val();

    $('.lunicreepify').html(luni.tools.creepify.encode(inputtext));



      // more textarea padding if diacritics on top
      if (name == 'maxHeight') {
          setCreepifyPadding();
      }
  });



  function gen(inputtext) {
    $('#random-cloud').html('');
      if (inputtext == "") {
        inputtext = "Cool Symbol"
      }
      inputtext = inputtext.trim();
    
    
      
      $(document).ready(function() {
        
      });
    
    
      $('.illuminati').html("𓂀 "+applyCharMap(doubleStruckCharMap, inputtext)+" 𓂀");
      $('.textgun').html("▄︻デ"+slashThrough(inputtext)+"══━一");
      $('.minigame').html("★彡["+luni.tools.tiny.encode(inputtext)+"]彡★");
      $('.pubggame1').html("꧁༒☬"+applyCharMap(cursiveCharMap, inputtext)+"☬༒꧂");
      $('.pubggame2').html("꧁༺"+applyCharMap(squiggle3CharMap, inputtext)+"༻꧂");
      $('.pubggame3').html("꧁𓊈𒆜"+applyCharMap(invertedSquaresCharMap, inputtext)+"𒆜𓊉꧂");
      $('.bricks').html("▀▄▀▄▀▄"+applyCharMap(squaresCharMap, inputtext)+"▀▄▀▄▀▄");
      $('.bigrus').html("█▓▒­░⡷⠂"+aryagen(inputtext, "s11")+"⠐⢾░▒▓█");
    
      
      $('.result-s1').html(aryagen(inputtext, "s1"));
      $('.result-s2').html(aryagen(inputtext, "s2"));
      $('.result-s3').html(aryagen(inputtext, "s3"));
      $('.result-s4').html(aryagen(inputtext, "s4"));
      $('.result-s5').html(aryagen(inputtext, "s5"));
      $('.result-s6').html(aryagen(inputtext, "s6"));
      $('.result-s7').html(aryagen(inputtext, "s7"));
      $('.result-s8').html(aryagen(inputtext, "s8"));
    
      $('.result-s9').html(aryagen(inputtext, "s9"));
      $('.result-s10').html(aryagen(inputtext, "s10"));
      $('.result-s11').html(aryagen(inputtext, "s11"));
      $('.result-s12').html(aryagen(inputtext, "s12"));
      $('.result-s13').html(aryagen(inputtext, "s13"));
      $('.result-s14').html(aryagen(inputtext, "s14"));
      $('.result-s15').html(aryagen(inputtext, "s15"));
      $('.result-s16').html(aryagen(inputtext, "s16"));
      $('.result-s17').html(aryagen(inputtext, "s17"));
      $('.result-s18').html(aryagen(inputtext, "s18"));
      $('.result-s19').html(aryagen(inputtext, "s19"));
      $('.result-s20').html(aryagen(inputtext, "s20"));
    
      $('.result-s21').html(aryagen(inputtext, "s21"));
      $('.result-s22').html(aryagen(inputtext, "s22"));
      $('.result-s23').html(aryagen(inputtext, "s23"));
      $('.result-s24').html(aryagen(inputtext, "s24"));
      $('.result-s25').html(aryagen(inputtext, "s25"));
      $('.result-s26').html(aryagen(inputtext, "s26"));
      $('.result-s27').html(aryagen(inputtext, "s27"));
      $('.result-s29').html(aryagen(inputtext, "s29"));
      $('.result-s30').html(aryagen(inputtext, "s30"));
    
      $('.result-s31').html(aryagen(inputtext, "s31"));
    
      $('.connectedJoiner').html(connectedJoiner(inputtext));
      $('.starJoiner').html(starJoiner(inputtext));
      $('.hashJoiner').html(hashJoiner(inputtext));
      $('.dotBoxtwo').html(dotBoxtwo(inputtext));
    
      $('.thickBox').html(thickBox(inputtext));
      $('.diametricBox').html(diametricBox(inputtext));
      $('.arrowBox').html(arrowBox(inputtext));
      $('.lunitoolsbubbles').html(luni.tools.bubbles.encode(inputtext));
      $('.invertedSquaresCharMap').html(applyCharMap(invertedSquaresCharMap, inputtext));
      $('.wideTextCharMap').html(applyCharMap(wideTextCharMap, inputtext));
      $('.lunitoolstinyencode').html(luni.tools.tiny.encode(inputtext));
      $('.lunitoolsflipencode').html(luni.tools.flip.encode(inputtext));
      $('.squaresCharMap').html(applyCharMap(squaresCharMap, inputtext));
      $('.lunitoolsmirrorencode').html(luni.tools.mirror.encode(inputtext));
      $('.subscriptCharMap').html(applyCharMap(subscriptCharMap, inputtext));
      $('.superscriptCharMap').html(applyCharMap(superscriptCharMap, inputtext));
      $('.bentTextCharMap').html(applyCharMap(bentTextCharMap, inputtext));
      $('.neonCharMap').html(applyCharMap(neonCharMap, inputtext));
      $('.futureAlienCharMap').html(applyCharMap(futureAlienCharMap, inputtext));
      $('.strikeThrough').html(strikeThrough(inputtext));
      $('.tildeStrikeThrough').html(tildeStrikeThrough(inputtext));
      $('.slashThrough').html(slashThrough(inputtext));
      $('.underline').html(underline(inputtext));
      $('.doubleUnderline').html(doubleUnderline(inputtext));
      $('.lunicreepify').html(luni.tools.creepify.encode(inputtext));
      $('.squiggleCharMap').html(applyCharMap(squiggleCharMap, inputtext));
      $('.squiggle2CharMap').html(applyCharMap(squiggle2CharMap, inputtext));
      $('.squiggle3CharMap').html(applyCharMap(squiggle3CharMap, inputtext));
      $('.squiggle4CharMap').html(applyCharMap(squiggle4CharMap, inputtext));
      $('.squiggle5CharMap').html(applyCharMap(squiggle5CharMap, inputtext));
      $('.squiggle6CharMap').html(applyCharMap(squiggle6CharMap, inputtext));
      $('.boldCharMap').html(applyCharMap(boldCharMap, inputtext));
    
      $('.oldEnglishCharMap').html(applyCharMap(oldEnglishCharMap, inputtext));
      $('.dashbox').html(applyCharMap(dashbox, inputtext));
      $('.roundblackbox').html(applyCharMap(roundblackbox, inputtext));
    
      $('.medievalCharMap').html(applyCharMap(medievalCharMap, inputtext));
      $('.cursiveCharMap').html(applyCharMap(cursiveCharMap, inputtext));
      $('.scriptify').html(scriptify(inputtext));
      $('.doubleStruckCharMap').html(applyCharMap(doubleStruckCharMap, inputtext));
      $('.italicCharMap').html(applyCharMap(italicCharMap, inputtext));
      $('.boldItalicCharMap').html(applyCharMap(boldItalicCharMap, inputtext));
      $('.monospaceCharMap').html(applyCharMap(monospaceCharMap, inputtext));
      $('.upperAnglesCharMap').html(applyCharMap(upperAnglesCharMap, inputtext));
      $('.greekCharMap').html(applyCharMap(greekCharMap, inputtext));
      $('.symbolsCharMap').html(applyCharMap(symbolsCharMap, inputtext));
      $('.currencyCharMap').html(applyCharMap(currencyCharMap, inputtext));
      $('.asianStyleCharMap').html(applyCharMap(asianStyleCharMap, inputtext));
      $('.asianStyle2CharMap').html(applyCharMap(asianStyle2CharMap, inputtext));
    
      $('.luniroundsquares').html(luni.tools.roundsquares.encode(inputtext));
      $('.lunisquares').html(luni.tools.squares.encode(inputtext));
      $('.thickBlockFramed').html(thickBlockFramed(inputtext));
      $('.diametricAngleFrame').html(diametricAngleFrame(inputtext));
    
      $('.wavyJoiner').html(wavyJoiner(inputtext));
      $('.singlewavyJoiner').html(singlewavyJoiner(inputtext));
    
      $('.dottyJoiner').html(dottyJoiner(inputtext));
      $('.kirbyHug').html(kirbyHug(inputtext));
      $('.vaporwaveText').html(vaporwaveText(inputtext));
      $('.vaporwaveText1').html(vaporwaveText1(inputtext));
      $('.vaporwaveText2').html(vaporwaveText2(inputtext));
      $('.littleSparkles').html(littleSparkles(inputtext));
      $('.weirdBox').html(weirdBox(inputtext));
    
    
      
    
      $('.arrowjoin').html(arrowjoin(inputtext));
    
    
      $('.zigzagJoiner').html(zigzagJoiner(inputtext));
    
      $('.dotBox').html(dotBox(inputtext));
    
      
      $('.curlybrackets').html(curlybrackets(inputtext));
    
      $('.firework').html(firework(inputtext));
      $('.stinky').html(stinky(inputtext));
      $('.heartsBetween').html(heartsBetween(inputtext));
      $('.arrowBelow').html(arrowBelow(inputtext));
      $('.crossAboveBelow').html(crossAboveBelow(inputtext));
    
    
       // Joiner New Added
    
       $('.squaredot').html(squaredot(inputtext));
       $('.arrowjoiner').html(arrowjoiner(inputtext));
       $('.doubleslashjoiner').html(doubleslashjoiner(inputtext));
       $('.slashjoiner').html(slashjoiner(inputtext));
       $('.slashboxjoiner').html(slashboxjoiner(inputtext));
       $('.barcodejoiner').html(barcodejoiner(inputtext));
       $('.italicblock').html(italicblock(inputtext));
       $('.lineseparator').html(lineseparator(inputtext));
       $('.singlelineseparator').html(singlelineseparator(inputtext));
    
        // Boxed New Added
      $('.brackethangtext').html(brackethangtext(inputtext));
      $('.focustext').html(focustext(inputtext));
      $('.newsquarebracket').html(newsquarebracket(inputtext));
    
    
      $('.satr0').html(satr0(italicCharMapFun(inputtext)));
      $('.satr1').html(satr1(squiggle5CharMapFun(inputtext)));
      $('.satr2').html(satr2(monospaceCharMapFun(inputtext)));
      $('.satr3').html(satr3(luni.tools.bubbles.encode(inputtext)));
      $('.satr4').html(satr4(doubleStruckCharMapFun(inputtext)));
      $('.satr5').html(satr5(invertedSquaresCharMapFun(inputtext)));
      $('.satr6').html(satr6(asianStyleCharMapFun(inputtext)));
      $('.satr7').html(satr7(asianStyle2CharMapFun(inputtext)));
      $('.satr8').html(satr8(squaresCharMapFun(inputtext)));
      $('.satr9').html(satr9(aryagen(inputtext, "s12")));
      $('.satr10').html(satr10(aryagen(inputtext, "s24")));
    
      
    
     
    
      $('.heart0').html(heart0(dotBox(inputtext)));
      $('.heart1').html(heart1(firework(inputtext)));
      $('.heart2').html(heart2(zigzagJoiner(inputtext)));
      $('.heart3').html(heart3(heartsBetween(inputtext)));
      $('.heart4').html(heart4(symbolsCharMapFun(inputtext)));
      $('.heart5').html(heart5(curlybrackets(inputtext)));
      $('.heart6').html(heart6(currencyCharMapFun(inputtext)));
      $('.heart7').html(heart7(cursiveCharMapFun(inputtext)));
  
      /* Festival */
      $('.birthday0').html(birthday0(randomfun(inputtext)));
      $('.birthday1').html(birthday1(randomfun(inputtext)));
      $('.birthday2').html(birthday2(randomfun(inputtext)));
      $('.birthday3').html(birthday3(randomfun(inputtext)));
      $('.birthday4').html(birthday4(randomfun(inputtext)));
      $('.birthday5').html(birthday5(randomfun(inputtext)));
      $('.birthday6').html(birthday6(randomfun(inputtext)));
      $('.birthday7').html(birthday7(randomfun(inputtext)));
  
      /* Mood */
    
      $('.thankyou0').html(thankyou0(dotBox(inputtext)));
    $('.thankyou1').html(thankyou1(firework(inputtext)));
    $('.thankyou2').html(thankyou2(zigzagJoiner(inputtext)));
    $('.thankyou3').html(thankyou3(heartsBetween(inputtext)));
    $('.thankyou4').html(thankyou4(symbolsCharMapFun(inputtext)));
    $('.thankyou5').html(thankyou5(curlybrackets(inputtext)));
    $('.thankyou6').html(thankyou6(currencyCharMapFun(inputtext)));
    $('.thankyou7').html(thankyou7(cursiveCharMapFun(inputtext)));
    
  
    $('.emoticon0').html(em0(italicCharMapFun(inputtext)));
      $('.emoticon1').html(em1(asianStyleCharMapFun(inputtext)));
      $('.emoticon2').html(em2(cursiveCharMapFun(inputtext)));
      $('.emoticon3').html(em3(monospaceCharMapFun(inputtext)));
      $('.emoticon4').html(em4(greekCharMapFun(inputtext)));
      $('.emoticon5').html(em5(curlybrackets(inputtext)));
      $('.emoticon6').html(em6(currencyCharMapFun(inputtext)));
      $('.emoticon7').html(em7(doubleStruckCharMapFun(inputtext)));
  
      $('.angry0').html(angry0(inputtext));
  $('.angry1').html(angry1(inputtext));
  $('.angry2').html(angry2(inputtext));
  $('.angry3').html(angry3(inputtext));
  $('.angry4').html(angry4(inputtext));
  $('.angry5').html(angry5(inputtext));
  $('.angry6').html(angry6(inputtext));
  
    $('.naughty0').html(naughty0(inputtext));
    $('.naughty1').html(naughty1(inputtext));
    $('.naughty2').html(naughty2(inputtext));
    $('.naughty3').html(naughty3(inputtext));
    $('.naughty4').html(naughty4(inputtext));
    $('.naughty5').html(naughty5(inputtext));
    $('.naughty6').html(naughty6(inputtext));
  
    $('.kiss0').html(kiss0(inputtext));
  $('.kiss1').html(kiss1(inputtext));
  $('.kiss2').html(kiss2(inputtext));
  $('.kiss3').html(kiss3(inputtext));
  $('.kiss4').html(kiss4(inputtext));
  $('.kiss5').html(kiss5(inputtext));
  $('.kiss6').html(kiss6(inputtext));
  
  $('.love0').html(love0(inputtext));
  $('.love1').html(love1(inputtext));
  $('.love2').html(love2(inputtext));
  $('.love3').html(love3(inputtext));
  $('.love4').html(love4(inputtext));
  $('.love5').html(love5(inputtext));
  $('.love6').html(love6(inputtext));
  
  $('.sad0').html(sad0(inputtext));
  $('.sad1').html(sad1(inputtext));
  $('.sad2').html(sad2(inputtext));
  $('.sad3').html(sad3(inputtext));
  $('.sad4').html(sad4(inputtext));
  $('.sad5').html(sad5(inputtext));
  $('.sad6').html(sad6(inputtext));
  
  $('.cry0').html(cry0(inputtext));
  $('.cry1').html(cry1(inputtext));
  $('.cry2').html(cry2(inputtext));
  $('.cry3').html(cry3(inputtext));
  $('.cry4').html(cry4(inputtext));
  $('.cry5').html(cry5(inputtext));
  $('.cry6').html(cry6(inputtext));
  
  $('.eating0').html(eating0(inputtext));
  $('.eating1').html(eating1(inputtext));
  $('.eating2').html(eating2(inputtext));
  $('.eating3').html(eating3(inputtext));
  $('.eating4').html(eating4(inputtext));
  $('.eating5').html(eating5(inputtext));
  $('.eating6').html(eating6(inputtext));
  
  $('.surprised0').html(surprised0(inputtext));
  $('.surprised1').html(surprised1(inputtext));
  $('.surprised2').html(surprised2(inputtext));
  $('.surprised3').html(surprised3(inputtext));
  $('.surprised4').html(surprised4(inputtext));
  $('.surprised5').html(surprised5(inputtext));
  $('.surprised6').html(surprised6(inputtext));
    
      $('.wingdings').html(wingdings(inputtext));
      $('.fullCrazy1').html(fullCrazy(inputtext));
      $('.fullCrazy2').html(fullCrazy(inputtext));
      $('.fullCrazy3').html(fullCrazy(inputtext));
    
      $('.crazyWithFlourishOrSymbols1').html(crazyWithFlourishOrSymbols(inputtext));
      $('.crazyWithFlourishOrSymbols2').html(crazyWithFlourishOrSymbols(inputtext));
      $('.crazyWithFlourishOrSymbols3').html(crazyWithFlourishOrSymbols(inputtext));
      $('.crazyWithFlourishOrSymbols4').html(crazyWithFlourishOrSymbols(inputtext));
  
      $('.cuteText0').html(cute0(inputtext));
      $('.cuteText1').html(cute1(inputtext));
      $('.cuteText2').html(cute2(inputtext));
      $('.cuteText3').html(cute3(inputtext));
      $('.cuteText4').html(cute4(inputtext));
      $('.cuteText5').html(cute5(inputtext));
      $('.cuteText6').html(cute6(inputtext));
  
      $('.depressed0').html(depressed0(inputtext));
      $('.depressed1').html(depressed1(inputtext));
      $('.depressed2').html(depressed2(inputtext));
      $('.depressed3').html(depressed3(inputtext));
      $('.depressed4').html(depressed4(inputtext));
      $('.depressed5').html(depressed5(inputtext));
      $('.depressed6').html(depressed6(inputtext));
    
      $('.goodmorning0').html(goodmorning0(inputtext));
      $('.goodmorning1').html(goodmorning1(inputtext));
      $('.goodmorning2').html(goodmorning2(inputtext));
      $('.goodmorning3').html(goodmorning3(inputtext));
      $('.goodmorning4').html(goodmorning4(inputtext));
      $('.goodmorning5').html(goodmorning5(inputtext));
      $('.goodmorning6').html(goodmorning6(inputtext));
      
      $('.goodnight0').html(goodnight0(inputtext));
  $('.goodnight1').html(goodnight1(inputtext));
  $('.goodnight2').html(goodnight2(inputtext));
  $('.goodnight3').html(goodnight3(inputtext));
  $('.goodnight4').html(goodnight4(inputtext));
  $('.goodnight5').html(goodnight5(inputtext));
  $('.goodnight6').html(goodnight6(inputtext));
  
  $('.weddinganniversary0').html(weddinganniversary0(inputtext));
  $('.weddinganniversary1').html(weddinganniversary1(inputtext));
  $('.weddinganniversary2').html(weddinganniversary2(inputtext));
  $('.weddinganniversary3').html(weddinganniversary3(inputtext));
  $('.weddinganniversary4').html(weddinganniversary4(inputtext));
  $('.weddinganniversary5').html(weddinganniversary5(inputtext));
  $('.weddinganniversary6').html(weddinganniversary6(inputtext));
  
      var i = 1;
    $(".fullCrazy").each(function() {
    $(this).html(fullCrazy(inputtext))
    i++;
    });
    
    var i = 1;
    $(".crazyWithFlourishOrSymbols").each(function() {
    $(this).html(crazyWithFlourishOrSymbols(inputtext))
    i++;
    });
    
    
      var i = 1;
    $(".wrapInFlourish").each(function() {
    $(this).html(wrapInFlourish(randomfun(inputtext)))
    i++;
    });
    
    
    };
    
    
    
    function getrandomfontsfuntionlist() {
     randomfonts = randomfontsfuntionlist[Math.floor(Math.random() * randomfontsfuntionlist.length)];
  
      return randomfonts
  
    }
    
    function randomfun(inputtext) {
      var randomfontsname = getrandomfontsfuntionlist();
      inputtext = inputtext.trim();
      return eval(randomfontsname + '("' + inputtext + '")');
    }


// Load More
$(document).on("click", "#load-more" , function() {
  $(".loader-ellips").fadeIn();
  var inputtext = $('#thenitesharya-text').val();

  if (inputtext == "") {
    inputtext = "Cool Symbol"
    }
    $('.randlist').append('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Random</span><p class="wrapInFlourish">' + wrapInFlourish(crazyWithFlourishOrSymbols(inputtext)) + '</p></div>');
    $('.randlist').append('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Random</span><p class="wrapInFlourish">' + wrapInFlourish(randomfun(inputtext)) + '</p></div>');
    $('.randlist').append('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Random</span><p class="wrapInFlourish">' + wrapInFlourish(crazyWithFlourishOrSymbols(inputtext)) + '</p></div>');
    $('.randlist').append('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Random</span><p class="wrapInFlourish">' + wrapInFlourish(inputtext) + '</p></div>');
  $('.randlist').append('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Random</span><p class="wrapInFlourish">' + wrapInFlourish(crazyWithFlourishOrSymbols(inputtext)) + '</p></div>');
  $('.randlist').append('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Random</span><p class="wrapInFlourish">' + wrapInFlourish(cute1(inputtext)) + '</p></div>');
  $('.randlist').append('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Random</span><p class="wrapInFlourish">' + wrapInFlourish(randomfun(inputtext)) + '</p></div>');
  $('.randlist').append('<div class="ads-sec"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4493747699129738" data-ad-slot="5609110082" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>');


  $(".loader-ellips").fadeOut();
});

// ClipboardJS Settings

var clipboardrand = new ClipboardJS("#random-cloud div", {
  text: function(trigger) {
    return $(trigger).text();
  }
});
clipboardrand.on('success', function(e) {
  var btn = $(e.trigger);
  btn.append('<button>😍Copied!</button>');
  btn.find('button').delay(2000).fadeOut(500, function(){ $(this).remove();});
});

clipboardrand.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

$(".close-alert").on("click", function() {
    $(".copiedalerts,#clock,#overlay").css("display", "none");
    
});
$(".close-top").on("click", function() {
    $(".copiedalerts,#clock,#overlay").css("display", "none");
});


$(document).on("click", ".icon-export", function () { 

    const shareData = {
        text: $(this).parent().parent().find("p").text()
      };
    navigator.share(shareData);

});


function showCopyingModalDialog(theText,theTextName) {
   
  if ($(window).height() > 700) {
      isShortWindowsHeight = true;
      thisPos = $('.container').offset();
      $(".copiedalerts").css("left", thisPos.left);
  }

  $("#overlay").css("display", "block");
  $(".copiedalerts").css("display", "block");
  $(".copiedalerts").css("position", "fixed");
  $(".copiedalerts").css("visibility", "visible");
  var theHTML = "<textarea class='the_copied_text'>" + theText + "</textarea><span class='the_copied_text_description'> has been 😎 <span class='bold'>copied</span>. Now paste anywhere! </span>";
 
  $(".alert-header").html(theHTML);
}
var clipboard = new ClipboardJS(".aryafonts p", {
    text: function(trigger) {
      return $(trigger).text();
    }
  });
  clipboard.on('success', function(e) {
    var btn = $(e.trigger);

    btn.parent().append('<button class="copied">😍 Copied!</button>');
  btn.parent().find('.copied').delay(2000).fadeOut(500, function(){ $(this).remove();});

    fontsname = btn.find('p').attr('class');

    

   showCopyingModalDialog(e.text,btn.find('span').text());

   $("#clock").css("display", "block");
   
   timeLeft = 15;

   function countdown() {
       timeLeft--;
       document.getElementById("seconds").innerHTML = String( timeLeft );
       if (timeLeft > 0) {
           setTimeout(countdown, 1000);

           
       } else{
          $(".copiedalerts,#clock,#overlay").css("display", "none");
        
       }
   };
   
   setTimeout(countdown, 1000);




  });
  
  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
var clipboard = new ClipboardJS(".icon-docs", {
    text: function(trigger) {
      return $(trigger).parent().parent().find('p').text();
    }
  });
  clipboard.on('success', function(e) {
    var btn = $(e.trigger);

    btn.parent().append('<button class="copied">😍 Copied!</button>');
  btn.parent().find('.copied').delay(2000).fadeOut(500, function(){ $(this).remove();});

    fontsname = btn.find('p').attr('class');

    

   showCopyingModalDialog(e.text,btn.find('span').text());

   $("#clock").css("display", "block");
   
   timeLeft = 15;

   function countdown() {
       timeLeft--;
       document.getElementById("seconds").innerHTML = String( timeLeft );
       if (timeLeft > 0) {
           setTimeout(countdown, 1000);

           
       } else{
          $(".copiedalerts,#clock,#overlay").css("display", "none");
        
       }
   };
   
   setTimeout(countdown, 1000);






  });
  
  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });


  $(document).on("click", ".sb .icon-heart", function() {

    $(this).addClass('icon-heart-dark');
    getfontsname = $(this).parent().parent().find('p').attr('class');

    cookiefontname = $.cookie('aryafonts_fav');



    if (cookiefontname) {
        ifexists = cookiefontname.includes(getfontsname);


        if (!ifexists) {

            var cookiefontnamelenth = cookiefontname.split(',');

            if (cookiefontnamelenth.length > 4) {

                cookiefontname = cookiefontname.substring(0, cookiefontname.lastIndexOf(","));

            }
            cookiefontname = getfontsname +','+ cookiefontname;

            $.cookie('aryafonts_fav', cookiefontname, {
                expires: 7,
                path: '/'
            });

            var myArray = cookiefontname.split(',');
    
            $(".aryafontsfavoritelist").html('');
            for(i=(myArray.length-1);i>-1;i--){ 
                      $(".aryafontsfavoritelist").prepend('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Favorite</span><p class="' + myArray[i] + '">Preview</p></div>');
    
            }



        } else {

            $.cookie('aryafonts_fav', cookiefontname, {
                expires: 7,
                path: '/'
            });

            var myArray = cookiefontname.split(',');
            //alert(myArray);
    
            $(".aryafontsfavoritelist").html('');
            for(i=(myArray.length-1);i>-1;i--){ 
                      $(".aryafontsfavoritelist").prepend('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Favorite</span><p class="' + myArray[i] + '">Preview</p></div>');
    
            }
        }

       
    } else {
        $.cookie('aryafonts_fav', getfontsname, {
            expires: 7,
            path: '/'
        });
        var myArray = getfontsname.split(',');
        $(".aryafontsfavoritelist").html('');
        for(i=(myArray.length-1);i>-1;i--){ 
                  $(".aryafontsfavoritelist").prepend('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Favorite</span><p class="' + myArray[i] + '">Preview</p></div>');
        }

    }
    var inputtext = $('#thenitesharya-text').val();
    if (inputtext == "") {
        inputtext = "Cool Symbol"
    }
    gen(inputtext);
});

  

  cookiefontname = $.cookie('aryafonts_fav');

  if (cookiefontname) {



    var myArray = cookiefontname.split(',');
    $(".aryafontsfavoritelist").html('');
     for(i=(myArray.length-1);i>-1;i--){ 
             $(".aryafontsfavoritelist").prepend('<div class="aryafonts"><span class="sb"><button class="icon-export"></button><button class="icon-docs"></button><button class="icon-heart"></button></span><span>Favorite</span><p class="' + myArray[i] + '">Preview</p></div>');
    }
    
    }

  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
  
    if (scroll >= 100) {
        $(".thenitesharya-text").addClass("fixedtop");
    } else {
        $(".thenitesharya-text").removeClass("fixedtop");
    }
  });



$(document).on("click", ".icon-cancel", function () { 
  $('#thenitesharya-text').val('');
  gen('Cool Symbol');
  $.cookie('aryafonts_recent_input_text', '', { expires: 7 ,path: '/'} );
});







var delay = ( function() {
  var timer = 0;
  return function(callback, ms) {
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
  };
})();

$(document).on("input", "#thenitesharya-text", function () {

  delay(function(){
    var inputtext = $('#thenitesharya-text').val();
gen(inputtext);

$.cookie('aryafonts_recent_input_text', inputtext, { expires: 7 ,path: '/'} );


}, 500 );



});



if ($.cookie('aryafonts_recent_input_text')) {
  delay(function(){
  $('#thenitesharya-text').val($.cookie('aryafonts_recent_input_text'));
  gen($.cookie('aryafonts_recent_input_text'));
}, 500 );

} else{
  delay(function(){
  gen("Cool Symbol");
}, 500 );
}


// InfiniteScroll Settings
$(document).on("click", ".infinite-scroll input[type=checkbox]", function () {  


  if($(this).prop('checked')){
              $.cookie('infinite_scroll', 0, { expires: 7 ,path: '/'} );
              
          }else{
              $.cookie('infinite_scroll', 1, { expires: 7 ,path: '/'} );
              
          }
        
          window.location.href = "https://www.coolsymbol.top/";
  
      });
        
if($.cookie('infinite_scroll')== 1){
          $(".infinite-scroll input[type=checkbox]").prop( "checked", false );

          
          $(".page-load-status").html("<span>Infinite scroll is disable</span>");
      } else{
        $(".infinite-scroll input[type=checkbox]").prop( "checked", true );


        // InfiniteScroll Settings
var nextURL;
function updateNextURL( doc ) {
nextURL = $( doc ).find('.aryapage-next').attr('href');

}
updateNextURL( document );
var $container = $('.aryafontsmain').infiniteScroll({
path: function() {
return nextURL;
},

append: '.aryafontslist',
history: 'push',
historyTitle: true,
status: '.page-load-status',
checkLastPage: '.aryapage-next'

});
$container.on( 'load.infiniteScroll', function( event, response, path ) {
updateNextURL( response );
});
$container.on( 'append.infiniteScroll', function( event, response, path, items ) {
var inputtext = $('#thenitesharya-text').val();
gen(inputtext);
});

$container.on( 'history.infiniteScroll', function() {
gtag('config', "G-97SRPXV879", {'page_path': location.pathname});
});



        }


$("#mobile-fly-menu").click(function () {
  $(".leftsection").show(100);
});
$(".leftsection .close").click(function () {
  $(".leftsection").hide(100);
});

$('.settings-share').load('/settings-share.html');
