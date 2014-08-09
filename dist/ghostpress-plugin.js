requirejs.config({
    'baseUrl': 'assets/vendor',
    'paths': {
      'app': '../js/app',
      'jquery': 'jquery/dist/jquery',
      'scribe': 'scribe/scribe',
      'scribe-plugin-blockquote-command': 'scribe-plugin-blockquote-command/scribe-plugin-blockquote-command',
      'scribe-plugin-curly-quotes': 'scribe-plugin-curly-quotes/scribe-plugin-curly-quotes',
      'scribe-plugin-formatter-plain-text-convert-new-lines-to-html': 'scribe-plugin-formatter-plain-text-convert-new-lines-to-html/scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
      'scribe-plugin-heading-command': 'scribe-plugin-heading-command/scribe-plugin-heading-command',
      'scribe-plugin-intelligent-unlink-command': 'scribe-plugin-intelligent-unlink-command/scribe-plugin-intelligent-unlink-command',
      //'scribe-plugin-keyboard-shortcuts': 'scribe-plugin-keyboard-shortcuts/scribe-plugin-keyboard-shortcuts',
      'scribe-plugin-link-prompt-command': 'scribe-plugin-link-prompt-command/scribe-plugin-link-prompt-command',
      'scribe-plugin-sanitizer': 'scribe-plugin-sanitizer/scribe-plugin-sanitizer',
      'scribe-plugin-smart-lists': 'scribe-plugin-smart-lists/scribe-plugin-smart-lists',
      'scribe-plugin-toolbar': 'scribe-plugin-toolbar/scribe-plugin-toolbar',
      // not required to acutally use scribe
      'beautify': 'js-beautify/js/lib/beautify',
      'beautify-html': 'js-beautify/js/lib/beautify-html',
      'beautify-css': 'js-beautify/js/lib/beautify-css'
    }
});

// Load the main app module to start the app
requirejs(['ghostwriter']);;// stuff
define('ghostwriter', ['jquery',
   'scribe',
   'scribe-plugin-blockquote-command',
   'scribe-plugin-curly-quotes',
   'scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
   'scribe-plugin-heading-command',
   'scribe-plugin-intelligent-unlink-command',
   'scribe-plugin-link-prompt-command',
   'scribe-plugin-sanitizer',
   'scribe-plugin-smart-lists',
   'scribe-plugin-toolbar',
   'beautify-html'],

function($,
  Scribe,
  scribePluginBlockquoteCommand,
  scribePluginCurlyQuotes,
  scribePluginFormatterPlainTextConvertNewLinesToHtml,
  scribePluginHeadingCommand,
  scribePluginIntelligentUnlinkCommand,
  scribePluginLinkPromptCommand,
  scribePluginSanitizer,
  scribePluginSmartLists,
  scribePluginToolbar,
  html_beautify) {

  'use strict';

  var writerHTML = '<div class="ghost-writer hidden">' +
      '<div class="toolbar">' +
        '<ul>' +
          '<li><button data-command-name="bold"><span class="fontawesome-bold"></span></button></li>' + 
          '<li><button data-command-name="italic"><span class="fontawesome-italic"></span></button></li>' +
          '<li><button data-command-name="strikeThrough"><span class="fontawesome-strikethrough"></span></button></li>' +
          '<li><button data-command-name="removeFormat"><span class="fontawesome-remove"></span></button></li>' +
          '<li><button data-command-name="linkPrompt"><span class="fontawesome-link"></span></button></li>' + 
          '<li><button data-command-name="insertOrderedList"><span class="fontawesome-list-ol"></span></button></li>' +
          '<li><button data-command-name="insertUnorderedList"><span class="fontawesome-list-ul"></span></button></li>' +
          '<li><button data-command-name="indent"><span class="fontawesome-indent-left"></span></button></li>' +
          '<li><button data-command-name="outdent"><span class="fontawesome-indent-right"></span></button></li>' +
          '<li><button data-command-name="blockquote"><span class="fontawesome-quote-left"></span></button></li>' +
          '<li><button data-command-name="h2"><span class="fontawesome-text-height"></span></button></li>' +
          '<li><button data-command-name="undo"><span class="fontawesome-undo"></span></button></li>' +
        '</ul>' +
      '</div>' +
      '<div class="arrow-down"></div>' +
    '</div>';

  // Load HTML beautify for demo to make html pretty
  var htmlBeautify = html_beautify.html_beautify;
  /**
   * Load Scribe(s)
   */

  $('.ghost-writer-editable').each(function (i, el) {
    // add scribe class so we know scribe is on that element
    $(el).addClass('scribe');

    // add our custom toolbar html
    $('body').append(writerHTML);

    // assign toolbars unique id's for scribe
    $('.toolbar')[i].id = 'scribe-toolbar-' + i;

    // add attribute so we can figure out which toolbar belongs to which instance
    $('.ghost-writer-editable')[i].setAttribute('data-gw-instance', i);

    var scribe = new Scribe(el, { allowBlockElements: true });

    // Demo only
    scribe.on('content-changed', updateHTML);

    function updateHTML() {
      var htmlOut = $('.scribe-html code');
      htmlOut.empty();
      htmlOut.text(htmlBeautify(scribe.getHTML()));
      hljs.configure({ tabReplace: '  ' });
      hljs.highlightBlock(htmlOut[0]);
    }

   /**
    * Scribe Plugins
    */

    scribe.use(scribePluginBlockquoteCommand());
    scribe.use(scribePluginHeadingCommand(2));
    scribe.use(scribePluginIntelligentUnlinkCommand());
    scribe.use(scribePluginLinkPromptCommand());
    scribe.use(scribePluginToolbar(document.getElementById('scribe-toolbar-' + i)));
    scribe.use(scribePluginSmartLists());
    scribe.use(scribePluginCurlyQuotes());

    // Formatters
    scribe.use(scribePluginSanitizer({
      tags: {
        p: {},
        br: {},
        b: {},
        strong: {},
        i: {},
        strike: {},
        blockquote: {},
        ol: {},
        ul: {},
        li: {},
        a: { href: true },
        h2: {}
      }
    }));

    scribe.use(scribePluginFormatterPlainTextConvertNewLinesToHtml());

    if (scribe.allowsBlockElements()) {
      scribe.setContent('<h2>Hello, World!</h2>' + 
        '<blockquote><p>“Easy reading is damned hard writing.” — Nathaniel Hawthorne</p></blockquote><p>GhostWriter is a small JS application that lets you edit content directly in your browser. The main focus is <i>quick</i>, <b>easy</b>, and <b>hassle free</b> composing without writing HTML. GhostWriter is a wrapper on top of <a href="http://theguardian.com">The Guardian’s</a> <a href="http://github.com/guardian/scribe">Scribe</a> content editable framework. Scribe is a plugin based framework which standardized content editable elements across browsers.<br></p><p>Editing is a snap.</p><ol><li>Click the ghost icon and click the edit icon.</li><li>Click on any editable sections and start writing.<br></li></ol><p>In sit amet varius ipsum. Sed sit amet neque vitae eros elementum gravida non a arcu. Proin vel ligula magna. Aenean vestibulum dui nec suscipit molestie. Vestibulum a ante rutrum, volutpat mi vestibulum, scelerisque quam. Sed facilisis sed lectus eget consequat. Duis dignissim libero in suscipit pretium. Pellentesque laoreet sapien mauris, nec suscipit nunc bibendum in. Proin sem dui, mattis eget rhoncus quis, consequat sed arcu. Morbi interdum pharetra lorem id dictum.</p><p><i>GhostWriter was used in the making of this post.</i><br></p>');  }
    else {
      scribe.setContent('Hello, World!');
    }
  });


  /**
   * GhostWriter Events
   * Events mousdown, mouseup, keyup
   */
  function calculateBounds(e) {
    var gwToolbar = $('.ghost-writer').eq($(e.delegateTarget).attr('data-gw-instance')),
        top, left;

    // Handle bounds - x
    if ( e.pageX - (gwToolbar.width() / 2) < 0 ) {
      left = 0;
    }
    else if ( e.pageX + (gwToolbar.width() / 2) > $(window).width() - 25 ) {
      left = $(window).width() - (gwToolbar.width() + 12);
    }
    else {
      left = e.pageX - (gwToolbar.width() / 2);
    }

    // Handle bounds - y
    if ( e.pageY - 50 < 0 ) {
      top = 0;
    }
    else {
      top = e.pageY - 70;
    }

    return {
      top: top,
      left: left + 3 // hack
    };
  }

  function handleToolbarPosition(e) {
    var gwToolbar = $('.ghost-writer').eq($(e.delegateTarget).attr('data-gw-instance')),
        target = e.target || e.srcElement;

    if (!target.isContentEditable)
      return;

    if (window.getSelection().isCollapsed) {
      gwToolbar.addClass('hidden');
    } else {
      var limit = calculateBounds(e);

      gwToolbar.css('top', limit.top);
      gwToolbar.css('left', limit.left);
      gwToolbar.removeClass('hidden');
     
    }
  }

  function goAway(e) {
    $('.ghost-writer').each(function (i, el) {
      if (!$(el).hasClass('hidden')) {
        $(el).addClass('hidden');
      }
    });
    
  }

  $('.scribe').each(function (i, el) {
    var instance = $(el).attr('data-gw-instace');
    $(el).on({
      mousedown: goAway,
      dblclick: handleToolbarPosition,
      // use a timer on mouseup so the browser has time to deselect text
      mouseup: function (e) { setTimeout(function () { handleToolbarPosition(e); }, 100); },
      keyup: handleToolbarPosition
    });

    //$(el).attr('contenteditable', false);
  });
/*
  function enableEditing() {
    $('.ghost-writer-editable').attr('contenteditable', true);
    $el.attr('data-gw-action-name', 'save');
    $el.html('Save <span class="fontawesome-save"></span>');
    $('.gw-tab-menu').addClass('save');
  }

  function disableEditing() {
    $('.ghost-writer-editable').attr('contenteditable', false);
    $el.attr('data-gw-action-name', 'edit');
    $el.html('Edit <span class="fontawesome-edit"></span>');
    $('.gw-tab-menu').removeClass('save');
  }

  $('.gw-tab-menu ul li button').each(function (i, el) {
    $(el).on({
      click: function () {
        var $el = $(el), 
          action = $el.attr('data-gw-action-name');


        switch (action) {
          case 'edit':
            enableEditing();
          break;
          case 'save':
            disableEditing();

            // do ajaxy save stuff here
          break;
          default:
          break;
        }
      }
    });
  });

  $('.tryit').on('click', function() {

  })*/
});
;define("lodash-amd/modern/internals/isNative",[],function(){function e(e){return"function"==typeof e&&r.test(e)}var n=Object.prototype,t=n.toString,r=RegExp("^"+String(t).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$");return e}),define("lodash-amd/modern/internals/objectTypes",[],function(){var e={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1};return e}),define("lodash-amd/modern/objects/isObject",["../internals/objectTypes"],function(e){function n(n){return!(!n||!e[typeof n])}return n}),define("lodash-amd/modern/internals/shimKeys",["./objectTypes"],function(e){var n=Object.prototype,t=n.hasOwnProperty,r=function(n){var r,o=n,i=[];if(!o)return i;if(!e[typeof n])return i;for(r in o)t.call(o,r)&&i.push(r);return i};return r}),define("lodash-amd/modern/objects/keys",["../internals/isNative","./isObject","../internals/shimKeys"],function(e,n,t){var r=e(r=Object.keys)&&r,o=r?function(e){return n(e)?r(e):[]}:t;return o}),define("lodash-amd/modern/objects/defaults",["./keys","../internals/objectTypes"],function(e,n){var t=function(t,r,o){var i,a=t,s=a;if(!a)return s;for(var c=arguments,u=0,l="number"==typeof o?2:c.length;++u<l;)if(a=c[u],a&&n[typeof a])for(var d=-1,f=n[typeof a]&&e(a),m=f?f.length:0;++d<m;)i=f[d],"undefined"==typeof s[i]&&(s[i]=a[i]);return s};return t}),define("lodash-amd/modern/objects/isArguments",[],function(){function e(e){return e&&"object"==typeof e&&"number"==typeof e.length&&r.call(e)==n||!1}var n="[object Arguments]",t=Object.prototype,r=t.toString;return e}),define("lodash-amd/modern/objects/isArray",["../internals/isNative"],function(e){var n="[object Array]",t=Object.prototype,r=t.toString,o=e(o=Array.isArray)&&o,i=o||function(e){return e&&"object"==typeof e&&"number"==typeof e.length&&r.call(e)==n||!1};return i}),define("lodash-amd/modern/internals/baseFlatten",["../objects/isArguments","../objects/isArray"],function(e,n){function t(r,o,i,a){for(var s=(a||0)-1,c=r?r.length:0,u=[];++s<c;){var l=r[s];if(l&&"object"==typeof l&&"number"==typeof l.length&&(n(l)||e(l))){o||(l=t(l,o,i));var d=-1,f=l.length,m=u.length;for(u.length+=f;++d<f;)u[m++]=l[d]}else i||u.push(l)}return u}return t}),define("lodash-amd/modern/utilities/noop",[],function(){function e(){}return e}),define("lodash-amd/modern/internals/baseCreate",["./isNative","../objects/isObject","../utilities/noop"],function(e,n){function t(e){return n(e)?r(e):{}}var r=e(r=Object.create)&&r;return r||(t=function(){function e(){}return function(t){if(n(t)){e.prototype=t;var r=new e;e.prototype=null}return r||window.Object()}}()),t}),define("lodash-amd/modern/internals/setBindData",["./isNative","../utilities/noop"],function(e,n){var t={configurable:!1,enumerable:!1,value:null,writable:!1},r=function(){try{var n={},t=e(t=Object.defineProperty)&&t,r=t(n,n,n)&&t}catch(o){}return r}(),o=r?function(e,n){t.value=n,r(e,"__bindData__",t)}:n;return o}),define("lodash-amd/modern/internals/slice",[],function(){function e(e,n,t){n||(n=0),"undefined"==typeof t&&(t=e?e.length:0);for(var r=-1,o=t-n||0,i=Array(0>o?0:o);++r<o;)i[r]=e[n+r];return i}return e}),define("lodash-amd/modern/internals/baseBind",["./baseCreate","../objects/isObject","./setBindData","./slice"],function(e,n,t,r){function o(o){function i(){if(c){var t=r(c);a.apply(t,arguments)}if(this instanceof i){var o=e(s.prototype),l=s.apply(o,t||arguments);return n(l)?l:o}return s.apply(u,t||arguments)}var s=o[0],c=o[2],u=o[4];return t(i,o),i}var i=[],a=i.push;return o}),define("lodash-amd/modern/internals/baseCreateWrapper",["./baseCreate","../objects/isObject","./setBindData","./slice"],function(e,n,t,r){function o(i){function s(){var t=p?f:this;if(l){var i=r(l);a.apply(i,arguments)}if((d||g)&&(i||(i=r(arguments)),d&&a.apply(i,d),g&&i.length<m))return u|=16,o([c,y?u:-4&u,i,null,f,m]);if(i||(i=arguments),h&&(c=t[v]),this instanceof s){t=e(c.prototype);var b=c.apply(t,i);return n(b)?b:t}return c.apply(t,i)}var c=i[0],u=i[1],l=i[2],d=i[3],f=i[4],m=i[5],p=1&u,h=2&u,g=4&u,y=8&u,v=c;return t(s,i),s}var i=[],a=i.push;return o}),define("lodash-amd/modern/objects/isFunction",[],function(){function e(e){return"function"==typeof e}return e}),define("lodash-amd/modern/internals/createWrapper",["./baseBind","./baseCreateWrapper","../objects/isFunction","./slice"],function(e,n,t,r){function o(i,c,u,l,d,f){var m=1&c,p=2&c,h=4&c,g=16&c,y=32&c;if(!p&&!t(i))throw new TypeError;g&&!u.length&&(c&=-17,g=u=!1),y&&!l.length&&(c&=-33,y=l=!1);var v=i&&i.__bindData__;if(v&&v!==!0)return v=r(v),v[2]&&(v[2]=r(v[2])),v[3]&&(v[3]=r(v[3])),!m||1&v[1]||(v[4]=d),!m&&1&v[1]&&(c|=8),!h||4&v[1]||(v[5]=f),g&&a.apply(v[2]||(v[2]=[]),u),y&&s.apply(v[3]||(v[3]=[]),l),v[1]|=c,o.apply(null,v);var b=1==c||17===c?e:n;return b([i,c,u,l,d,f])}var i=[],a=i.push,s=i.unshift;return o}),define("lodash-amd/modern/functions/bind",["../internals/createWrapper","../internals/slice"],function(e,n){function t(t,r){return arguments.length>2?e(t,17,n(arguments,2),null,r):e(t,1,null,null,r)}return t}),define("lodash-amd/modern/utilities/identity",[],function(){function e(e){return e}return e}),define("lodash-amd/modern/support",["./internals/isNative"],function(e){var n=/\bthis\b/,t={};return t.funcDecomp=!e(window.WinRTError)&&n.test(function(){return this}),t.funcNames="string"==typeof Function.name,t}),define("lodash-amd/modern/internals/baseCreateCallback",["../functions/bind","../utilities/identity","./setBindData","../support"],function(e,n,t,r){function o(o,c,u){if("function"!=typeof o)return n;if("undefined"==typeof c||!("prototype"in o))return o;var l=o.__bindData__;if("undefined"==typeof l&&(r.funcNames&&(l=!o.name),l=l||!r.funcDecomp,!l)){var d=s.call(o);r.funcNames||(l=!i.test(d)),l||(l=a.test(d),t(o,l))}if(l===!1||l!==!0&&1&l[1])return o;switch(u){case 1:return function(e){return o.call(c,e)};case 2:return function(e,n){return o.call(c,e,n)};case 3:return function(e,n,t){return o.call(c,e,n,t)};case 4:return function(e,n,t,r){return o.call(c,e,n,t,r)}}return e(o,c)}var i=/^\s*function[ \n\r\t]+\w/,a=/\bthis\b/,s=Function.prototype.toString;return o}),define("lodash-amd/modern/objects/forIn",["../internals/baseCreateCallback","../internals/objectTypes"],function(e,n){var t=function(t,r,o){var i,a=t,s=a;if(!a)return s;if(!n[typeof a])return s;r=r&&"undefined"==typeof o?r:e(r,o,3);for(i in a)if(r(a[i],i,t)===!1)return s;return s};return t}),define("lodash-amd/modern/internals/arrayPool",[],function(){var e=[];return e}),define("lodash-amd/modern/internals/getArray",["./arrayPool"],function(e){function n(){return e.pop()||[]}return n}),define("lodash-amd/modern/internals/maxPoolSize",[],function(){var e=40;return e}),define("lodash-amd/modern/internals/releaseArray",["./arrayPool","./maxPoolSize"],function(e,n){function t(t){t.length=0,e.length<n&&e.push(t)}return t}),define("lodash-amd/modern/internals/baseIsEqual",["../objects/forIn","./getArray","../objects/isFunction","./objectTypes","./releaseArray"],function(e,n,t,r,o){function i(p,y,v,b,N,C){if(v){var E=v(p,y);if("undefined"!=typeof E)return!!E}if(p===y)return 0!==p||1/p==1/y;var k=typeof p,M=typeof y;if(!(p!==p||p&&r[k]||y&&r[M]))return!1;if(null==p||null==y)return p===y;var S=h.call(p),L=h.call(y);if(S==a&&(S=d),L==a&&(L=d),S!=L)return!1;switch(S){case c:case u:return+p==+y;case l:return p!=+p?y!=+y:0==p?1/p==1/y:p==+y;case f:case m:return p==String(y)}var T=S==s;if(!T){var x=g.call(p,"__wrapped__"),w=g.call(y,"__wrapped__");if(x||w)return i(x?p.__wrapped__:p,w?y.__wrapped__:y,v,b,N,C);if(S!=d)return!1;var j=p.constructor,A=y.constructor;if(j!=A&&!(t(j)&&j instanceof j&&t(A)&&A instanceof A)&&"constructor"in p&&"constructor"in y)return!1}var O=!N;N||(N=n()),C||(C=n());for(var H=N.length;H--;)if(N[H]==p)return C[H]==y;var _=0;if(E=!0,N.push(p),C.push(y),T){if(H=p.length,_=y.length,E=_==H,E||b)for(;_--;){var P=H,B=y[_];if(b)for(;P--&&!(E=i(p[P],B,v,b,N,C)););else if(!(E=i(p[_],B,v,b,N,C)))break}}else e(y,function(e,n,t){return g.call(t,n)?(_++,E=g.call(p,n)&&i(p[n],e,v,b,N,C)):void 0}),E&&!b&&e(p,function(e,n,t){return g.call(t,n)?E=--_>-1:void 0});return N.pop(),C.pop(),O&&(o(N),o(C)),E}var a="[object Arguments]",s="[object Array]",c="[object Boolean]",u="[object Date]",l="[object Number]",d="[object Object]",f="[object RegExp]",m="[object String]",p=Object.prototype,h=p.toString,g=p.hasOwnProperty;return i}),define("lodash-amd/modern/utilities/property",[],function(){function e(e){return function(n){return n[e]}}return e}),define("lodash-amd/modern/functions/createCallback",["../internals/baseCreateCallback","../internals/baseIsEqual","../objects/isObject","../objects/keys","../utilities/property"],function(e,n,t,r,o){function i(i,a,s){var c=typeof i;if(null==i||"function"==c)return e(i,a,s);if("object"!=c)return o(i);var u=r(i),l=u[0],d=i[l];return 1!=u.length||d!==d||t(d)?function(e){for(var t=u.length,r=!1;t--&&(r=n(e[u[t]],i[u[t]],null,!0)););return r}:function(e){var n=e[l];return d===n&&(0!==d||1/d==1/n)}}return i}),define("lodash-amd/modern/objects/forOwn",["../internals/baseCreateCallback","./keys","../internals/objectTypes"],function(e,n,t){var r=function(r,o,i){var a,s=r,c=s;if(!s)return c;if(!t[typeof s])return c;o=o&&"undefined"==typeof i?o:e(o,i,3);for(var u=-1,l=t[typeof s]&&n(s),d=l?l.length:0;++u<d;)if(a=l[u],o(s[a],a,r)===!1)return c;return c};return r}),define("lodash-amd/modern/collections/map",["../functions/createCallback","../objects/forOwn"],function(e,n){function t(t,r,o){var i=-1,a=t?t.length:0;if(r=e(r,o,3),"number"==typeof a)for(var s=Array(a);++i<a;)s[i]=r(t[i],i,t);else s=[],n(t,function(e,n,t){s[++i]=r(e,n,t)});return s}return t}),define("lodash-amd/modern/arrays/flatten",["../internals/baseFlatten","../collections/map"],function(e,n){function t(t,r,o,i){return"boolean"!=typeof r&&null!=r&&(i=o,o="function"!=typeof r&&i&&i[r]===t?null:r,r=!1),null!=o&&(t=n(t,o,i)),e(t,r)}return t}),define("plugins/core/commands/indent",[],function(){return function(){return function(e){var n=new e.api.Command("indent");n.queryEnabled=function(){var n=new e.api.Selection,t=n.getContaining(function(e){return"UL"===e.nodeName||"OL"===e.nodeName});return e.api.Command.prototype.queryEnabled.call(this)&&e.allowsBlockElements()&&!t},e.commands.indent=n}}}),define("plugins/core/commands/insert-list",[],function(){return function(){return function(e){var n=function(n){e.api.Command.call(this,n)};n.prototype=Object.create(e.api.Command.prototype),n.prototype.constructor=n,n.prototype.execute=function(n){function t(e){if(e.length>0){var n=document.createElement(i.nodeName);e.forEach(function(e){n.appendChild(e)}),i.parentNode.insertBefore(n,i.nextElementSibling)}}if(this.queryState()){var r=new e.api.Selection,o=r.range,i=r.getContaining(function(e){return"OL"===e.nodeName||"UL"===e.nodeName}),a=r.getContaining(function(e){return"LI"===e.nodeName});e.transactionManager.run(function(){if(a){var n=new e.api.Node(a).nextAll();t(n),r.placeMarkers();var s=document.createElement("p");s.innerHTML=a.innerHTML,i.parentNode.insertBefore(s,i.nextElementSibling),a.parentNode.removeChild(a)}else{var c=Array.prototype.map.call(i.querySelectorAll("li"),function(e){return o.intersectsNode(e)&&e}).filter(function(e){return e}),u=c.slice(-1)[0],l=new e.api.Node(u).nextAll();t(l),r.placeMarkers();var d=document.createDocumentFragment();c.forEach(function(e){var n=document.createElement("p");n.innerHTML=e.innerHTML,d.appendChild(n)}),i.parentNode.insertBefore(d,i.nextElementSibling),c.forEach(function(e){e.parentNode.removeChild(e)})}0===i.childNodes.length&&i.parentNode.removeChild(i),r.selectMarkers()}.bind(this))}else e.api.Command.prototype.execute.call(this,n)},n.prototype.queryEnabled=function(){return e.api.Command.prototype.queryEnabled.call(this)&&e.allowsBlockElements()},e.commands.insertOrderedList=new n("insertOrderedList"),e.commands.insertUnorderedList=new n("insertUnorderedList")}}}),define("plugins/core/commands/outdent",[],function(){return function(){return function(e){var n=new e.api.Command("outdent");n.queryEnabled=function(){var n=new e.api.Selection,t=n.getContaining(function(e){return"UL"===e.nodeName||"OL"===e.nodeName});return e.api.Command.prototype.queryEnabled.call(this)&&e.allowsBlockElements()&&!t},e.commands.outdent=n}}}),define("plugins/core/commands/redo",[],function(){return function(){return function(e){var n=new e.api.Command("redo");n.execute=function(){var n=e.undoManager.redo();"undefined"!=typeof n&&e.restoreFromHistory(n)},n.queryEnabled=function(){return e.undoManager.position<e.undoManager.stack.length-1},e.commands.redo=n,e.el.addEventListener("keydown",function(e){e.shiftKey&&(e.metaKey||e.ctrlKey)&&90===e.keyCode&&(e.preventDefault(),n.execute())})}}}),define("plugins/core/commands/subscript",[],function(){return function(){return function(e){var n=new e.api.Command("subscript");e.commands.subscript=n}}}),define("plugins/core/commands/superscript",[],function(){return function(){return function(e){var n=new e.api.Command("superscript");e.commands.superscript=n}}}),define("plugins/core/commands/undo",[],function(){return function(){return function(e){var n=new e.api.Command("undo");n.execute=function(){var n=e.undoManager.undo();"undefined"!=typeof n&&e.restoreFromHistory(n)},n.queryEnabled=function(){return e.undoManager.position>1},e.commands.undo=n,e.el.addEventListener("keydown",function(e){e.shiftKey||!e.metaKey&&!e.ctrlKey||90!==e.keyCode||(e.preventDefault(),n.execute())})}}}),define("plugins/core/commands",["./commands/indent","./commands/insert-list","./commands/outdent","./commands/redo","./commands/subscript","./commands/superscript","./commands/undo"],function(e,n,t,r,o,i,a){return{indent:e,insertList:n,outdent:t,redo:r,subscript:o,superscript:i,undo:a}}),define("lodash-amd/modern/internals/baseIndexOf",[],function(){function e(e,n,t){for(var r=(t||0)-1,o=e?e.length:0;++r<o;)if(e[r]===n)return r;return-1}return e}),define("lodash-amd/modern/objects/isString",[],function(){function e(e){return"string"==typeof e||e&&"object"==typeof e&&r.call(e)==n||!1}var n="[object String]",t=Object.prototype,r=t.toString;return e}),define("lodash-amd/modern/collections/contains",["../internals/baseIndexOf","../objects/forOwn","../objects/isArray","../objects/isString"],function(e,n,t,r){function o(o,a,s){var c=-1,u=e,l=o?o.length:0,d=!1;return s=(0>s?i(0,l+s):s)||0,t(o)?d=u(o,a,s)>-1:"number"==typeof l?d=(r(o)?o.indexOf(a,s):u(o,a,s))>-1:n(o,function(e){return++c>=s?!(d=e===a):void 0}),d}var i=Math.max;return o}),define("lodash-amd/modern/objects/values",["./keys"],function(e){function n(n){for(var t=-1,r=e(n),o=r.length,i=Array(o);++t<o;)i[t]=n[r[t]];return i}return n}),define("lodash-amd/modern/collections/toArray",["../objects/isString","../internals/slice","../objects/values"],function(e,n,t){function r(e){return e&&"number"==typeof e.length?n(e):t(e)}return r}),define("scribe-common/src/element",["lodash-amd/modern/collections/contains"],function(e){function n(n){return e(o,n.nodeName)}function t(e){return e.nodeType===Node.ELEMENT_NODE&&"scribe-marker"===e.className}function r(e,n){for(;n.childNodes.length>0;)e.insertBefore(n.childNodes[0],n);e.removeChild(n)}var o=["P","LI","DIV","BLOCKQUOTE","UL","OL","H1","H2","H3","H4","H5","H6"];return{isBlockElement:n,isSelectionMarkerNode:t,unwrap:r}}),define("scribe-common/src/node",[],function(){function e(e){return e.nodeType===Node.TEXT_NODE&&""===e.textContent}function n(e,n){return n.parentNode.insertBefore(e,n.nextSibling)}function t(e){return e.parentNode.removeChild(e)}return{isEmptyTextNode:e,insertAfter:n,removeNode:t}}),define("dom-observer",["lodash-amd/modern/arrays/flatten","lodash-amd/modern/collections/toArray","scribe-common/src/element","scribe-common/src/node"],function(e,n,t,r){function o(o,i){function a(o){var i=e(o.map(function(e){var t=n(e.addedNodes),r=n(e.removedNodes);return t.concat(r)})),a=i.filter(function(e){return!r.isEmptyTextNode(e)}).filter(function(e){return!t.isSelectionMarkerNode(e)});return a.length>0}var s=!1,c=new MutationObserver(function(e){if(!s&&a(e)){s=!0;try{i()}finally{setTimeout(function(){s=!1},0)}}});return c.observe(o,{attributes:!0,childList:!0,subtree:!0}),c}return o}),define("plugins/core/events",["lodash-amd/modern/collections/contains","../../dom-observer"],function(e,n){return function(){return function(t){var r=function(){setTimeout(function(){t.pushHistory()}.bind(t),0),t.el.removeEventListener("focus",r)}.bind(t);t.el.addEventListener("focus",r),t.el.addEventListener("focus",function(){function e(n){var t=document.createTreeWalker(n),r=t.currentNode;return t.firstChild()?"BR"===t.currentNode.nodeName?r:e(t.currentNode):t.currentNode}var n=new t.api.Selection;if(n.range){n.placeMarkers();var r=t.allowsBlockElements()&&t.getHTML().match(/^<em class="scribe-marker"><\/em>/);if(n.removeMarkers(),r){var o=e(t.el.firstChild),i=n.range;i.setStart(o,0),i.setEnd(o,0),n.selection.removeAllRanges(),n.selection.addRange(i)}}}.bind(t));var o=function(){if(!t._skipFormatters){var e=new t.api.Selection,n=e.range,r=function(){n&&e.placeMarkers(),t.setHTML(t._htmlFormatterFactory.format(t.getHTML())),e.selectMarkers()}.bind(t);n?(t.undoManager.undo(),t.transactionManager.run(r)):r()}delete t._skipFormatters}.bind(t);n(t.el,o),t.allowsBlockElements()&&t.el.addEventListener("keydown",function(e){if(13===e.keyCode){var n=new t.api.Selection,r=n.range,o=n.getContaining(function(e){return/^(H[1-6])$/.test(e.nodeName)});if(o&&r.collapsed){var i=r.cloneRange();i.setEndAfter(o,0);var a=i.cloneContents();""===a.firstChild.textContent&&(e.preventDefault(),t.transactionManager.run(function(){var e=document.createElement("p"),t=document.createElement("br");e.appendChild(t),o.parentNode.insertBefore(e,o.nextElementSibling),r.setStart(e,0),r.setEnd(e,0),n.selection.removeAllRanges(),n.selection.addRange(r)}))}}}),t.allowsBlockElements()&&t.el.addEventListener("keydown",function(e){if(13===e.keyCode||8===e.keyCode){var n=new t.api.Selection,r=n.range;if(r.collapsed){var o=n.getContaining(function(e){return"LI"===e.nodeName});if(o&&""===o.textContent.trim()){e.preventDefault();var i=n.getContaining(function(e){return"UL"===e.nodeName||"OL"===e.nodeName}),a=t.getCommand("OL"===i.nodeName?"insertOrderedList":"insertUnorderedList");a.execute()}}}}),t.el.addEventListener("paste",function(n){if(n.clipboardData)n.preventDefault(),e(n.clipboardData.types,"text/html")?t.insertHTML(n.clipboardData.getData("text/html")):t.insertPlainText(n.clipboardData.getData("text/plain"));else{var r=new t.api.Selection;r.placeMarkers();var o=document.createElement("div");document.body.appendChild(o),o.setAttribute("contenteditable",!0),o.focus(),setTimeout(function(){var e=o.innerHTML;o.parentNode.removeChild(o),r.selectMarkers(),t.el.focus(),t.insertHTML(e)},1)}})}}}),define("plugins/core/formatters/html/replace-nbsp-chars",[],function(){return function(){return function(e){var n=/(\s|&nbsp;)+/g;e.registerHTMLFormatter("export",function(e){return e.replace(n," ")})}}}),define("lodash-amd/modern/arrays/last",["../functions/createCallback","../internals/slice"],function(e,n){function t(t,i,a){var s=0,c=t?t.length:0;if("number"!=typeof i&&null!=i){var u=c;for(i=e(i,a,3);u--&&i(t[u],u,t);)s++}else if(s=i,null==s||a)return t?t[c-1]:r;return n(t,o(0,c-s))}var r,o=Math.max;return t}),define("plugins/core/formatters/html/enforce-p-elements",["lodash-amd/modern/arrays/last","scribe-common/src/element"],function(e,n){function t(t){var r=Array.prototype.reduce.call(t.childNodes,function(t,r){function o(){var e=[r];t.push(e)}var i=e(t);if(i){var a=n.isBlockElement(i[0]);a===n.isBlockElement(r)?i.push(r):o()}else o();return t},[]),o=r.filter(function(e){var t=n.isBlockElement(e[0]);return!t});o.forEach(function(e){var n=document.createElement("p");e[0].parentNode.insertBefore(n,e[0]),e.forEach(function(e){n.appendChild(e)})}),t._isWrapped=!0}function r(e){for(var n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT),o=n.firstChild();o;){if("BLOCKQUOTE"===o.nodeName&&!o._isWrapped){t(o),r(e);break}o=n.nextSibling()}}return function(){return function(e){e.registerHTMLFormatter("normalize",function(e){var n=document.createElement("div");return n.innerHTML=e,t(n),r(n),n.innerHTML})}}}),define("plugins/core/formatters/html/ensure-selectable-containers",["scribe-common/src/element","lodash-amd/modern/collections/contains"],function(e,n){function t(o){function i(n){return 0===n.children.length||1===n.children.length&&e.isSelectionMarkerNode(n.children[0])}for(var a=o.firstElementChild;a;)e.isSelectionMarkerNode(a)||(i(a)&&""===a.textContent.trim()&&!n(r,a.nodeName)?a.appendChild(document.createElement("br")):a.children.length>0&&t(a)),a=a.nextElementSibling}var r=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];return function(){return function(e){e.registerHTMLFormatter("normalize",function(e){var n=document.createElement("div");return n.innerHTML=e,t(n),n.innerHTML})}}}),define("lodash-amd/modern/internals/htmlEscapes",[],function(){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e}),define("lodash-amd/modern/internals/escapeHtmlChar",["./htmlEscapes"],function(e){function n(n){return e[n]}return n}),define("lodash-amd/modern/internals/reUnescapedHtml",["./htmlEscapes","../objects/keys"],function(e,n){var t=RegExp("["+n(e).join("")+"]","g");return t}),define("lodash-amd/modern/utilities/escape",["../internals/escapeHtmlChar","../objects/keys","../internals/reUnescapedHtml"],function(e,n,t){function r(n){return null==n?"":String(n).replace(t,e)}return r}),define("plugins/core/formatters/plain-text/escape-html-characters",["lodash-amd/modern/utilities/escape"],function(e){return function(){return function(n){n.registerPlainTextFormatter(e)}}}),define("plugins/core/inline-elements-mode",[],function(){function e(e){for(var n=document.createTreeWalker(e);n.nextNode();)if(n.currentNode&&(~["br"].indexOf(n.currentNode.nodeName.toLowerCase())||n.currentNode.length>0))return!0;return!1}return function(){return function(n){n.el.addEventListener("keydown",function(t){if(13===t.keyCode){var r=new n.api.Selection,o=r.range,i=r.getContaining(function(e){return"LI"===e.nodeName||/^(H[1-6])$/.test(e.nodeName)});i||(t.preventDefault(),n.transactionManager.run(function(){"BR"===n.el.lastChild.nodeName&&n.el.removeChild(n.el.lastChild);var t=document.createElement("br");o.insertNode(t),o.collapse(!1);var i=o.cloneRange();i.setEndAfter(n.el.lastChild,0);var a=i.cloneContents();if(!e(a)){var s=document.createElement("br");o.insertNode(s)}var c=o.cloneRange();c.setStartAfter(t,0),c.setEndAfter(t,0),r.selection.removeAllRanges(),r.selection.addRange(c)}))}}.bind(this)),""===n.getHTML().trim()&&n.setContent("")}}}),define("plugins/core/patches/commands/bold",[],function(){return function(){return function(e){var n=new e.api.CommandPatch("bold");n.queryEnabled=function(){var n=new e.api.Selection,t=n.getContaining(function(e){return/^(H[1-6])$/.test(e.nodeName)});return e.api.CommandPatch.prototype.queryEnabled.apply(this,arguments)&&!t},e.commandPatches.bold=n}}}),define("plugins/core/patches/commands/indent",[],function(){var e="﻿";return function(){return function(n){var t=new n.api.CommandPatch("indent");t.execute=function(t){n.transactionManager.run(function(){var r=new n.api.Selection,o=r.range,i="P"===o.commonAncestorContainer.nodeName&&"<br>"===o.commonAncestorContainer.innerHTML;if(i){var a=document.createTextNode(e);o.insertNode(a),o.setStart(a,0),o.setEnd(a,0),r.selection.removeAllRanges(),r.selection.addRange(o)}n.api.CommandPatch.prototype.execute.call(this,t),r=new n.api.Selection;var s=r.getContaining(function(e){return"BLOCKQUOTE"===e.nodeName});s&&s.removeAttribute("style")}.bind(this))},n.commandPatches.indent=t}}}),define("plugins/core/patches/commands/insert-html",["scribe-common/src/element"],function(e){return function(){return function(n){var t=new n.api.CommandPatch("insertHTML");t.execute=function(t){n.transactionManager.run(function(){function r(n){var t=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT),o=t.firstChild();if(o)do"SPAN"===o.nodeName?e.unwrap(n,o):(o.style.lineHeight=null,""===o.getAttribute("style")&&o.removeAttribute("style")),r(o);while(o=t.nextSibling())}n.api.CommandPatch.prototype.execute.call(this,t),r(n.el)}.bind(this))},n.commandPatches.insertHTML=t}}}),define("plugins/core/patches/commands/insert-list",["scribe-common/src/element","scribe-common/src/node"],function(e,n){return function(){return function(t){var r=function(e){t.api.CommandPatch.call(this,e)};r.prototype=Object.create(t.api.CommandPatch.prototype),r.prototype.constructor=r,r.prototype.execute=function(r){t.transactionManager.run(function(){if(t.api.CommandPatch.prototype.execute.call(this,r),this.queryState()){var o=new t.api.Selection,i=o.getContaining(function(e){return"OL"===e.nodeName||"UL"===e.nodeName});if(i.nextElementSibling&&0===i.nextElementSibling.childNodes.length&&n.removeNode(i.nextElementSibling),i){var a=i.parentNode;a&&/^(H[1-6]|P)$/.test(a.nodeName)&&(o.placeMarkers(),n.insertAfter(i,a),o.selectMarkers(),2===a.childNodes.length&&n.isEmptyTextNode(a.firstChild)&&n.removeNode(a),0===a.childNodes.length&&n.removeNode(a))}var s=Array.prototype.slice.call(i.childNodes);s.forEach(function(n){var t=Array.prototype.slice.call(n.childNodes);t.forEach(function(t){if("SPAN"===t.nodeName){var r=t;e.unwrap(n,r)}else t.nodeType===Node.ELEMENT_NODE&&(t.style.lineHeight=null,""===t.getAttribute("style")&&t.removeAttribute("style"))})})}}.bind(this))},t.commandPatches.insertOrderedList=new r("insertOrderedList"),t.commandPatches.insertUnorderedList=new r("insertUnorderedList")}}}),define("plugins/core/patches/commands/outdent",[],function(){return function(){return function(e){var n=new e.api.CommandPatch("outdent");n.execute=function(){e.transactionManager.run(function(){var n=new e.api.Selection,t=n.range,r=n.getContaining(function(e){return"BLOCKQUOTE"===e.nodeName});if("BLOCKQUOTE"===t.commonAncestorContainer.nodeName){n.placeMarkers(),n.selectMarkers(!0);var o=t.cloneContents();r.parentNode.insertBefore(o,r),t.deleteContents(),n.selectMarkers(),""===r.textContent&&r.parentNode.removeChild(r)}else{var i=n.getContaining(function(e){return"P"===e.nodeName});if(i){var a=new e.api.Node(i).nextAll();if(a.length){var s=document.createElement(r.nodeName);a.forEach(function(e){s.appendChild(e)}),r.parentNode.insertBefore(s,r.nextElementSibling)}n.placeMarkers(),r.parentNode.insertBefore(i,r.nextElementSibling),n.selectMarkers(),""===r.innerHTML&&r.parentNode.removeChild(r)}else e.api.CommandPatch.prototype.execute.call(this)}}.bind(this))},e.commandPatches.outdent=n}}}),define("plugins/core/patches/commands/create-link",[],function(){return function(){return function(e){var n=new e.api.CommandPatch("createLink");e.commandPatches.createLink=n,n.execute=function(n){var t=new e.api.Selection;if(t.selection.isCollapsed){var r=document.createElement("a");r.setAttribute("href",n),r.textContent=n,t.range.insertNode(r);var o=document.createRange();o.setStartBefore(r),o.setEndAfter(r),t.selection.removeAllRanges(),t.selection.addRange(o)}else e.api.CommandPatch.prototype.execute.call(this,n)}}}}),define("plugins/core/patches/events",["scribe-common/src/element"],function(e){return function(){return function(n){n.allowsBlockElements()&&n.el.addEventListener("keyup",function(t){if(8===t.keyCode||46===t.keyCode){var r=new n.api.Selection,o=r.getContaining(function(e){return"P"===e.nodeName});o&&(n.undoManager.undo(),n.transactionManager.run(function(){r.placeMarkers();var n=Array.prototype.slice.call(o.childNodes);n.forEach(function(n){if("SPAN"===n.nodeName){var t=n;e.unwrap(o,t)}else n.nodeType===Node.ELEMENT_NODE&&(n.style.lineHeight=null,""===n.getAttribute("style")&&n.removeAttribute("style"))}),r.selectMarkers()}))}})}}}),define("plugins/core/patches",["./patches/commands/bold","./patches/commands/indent","./patches/commands/insert-html","./patches/commands/insert-list","./patches/commands/outdent","./patches/commands/create-link","./patches/events"],function(e,n,t,r,o,i,a){return{commands:{bold:e,indent:n,insertHTML:t,insertList:r,outdent:o,createLink:i},events:a}}),define("plugins/core/set-root-p-element",[],function(){return function(){return function(e){""===e.getHTML().trim()&&e.setContent("<p><br></p>")}}}),define("api/command-patch",[],function(){return function(e){function n(e){this.commandName=e}return n.prototype.execute=function(n){e.transactionManager.run(function(){document.execCommand(this.commandName,!1,n||null)}.bind(this))},n.prototype.queryState=function(){return document.queryCommandState(this.commandName)},n.prototype.queryEnabled=function(){return document.queryCommandEnabled(this.commandName)},n}}),define("api/command",[],function(){return function(e){function n(n){this.commandName=n,this.patch=e.commandPatches[this.commandName]}return n.prototype.execute=function(n){this.patch?this.patch.execute(n):e.transactionManager.run(function(){document.execCommand(this.commandName,!1,n||null)}.bind(this))},n.prototype.queryState=function(){return this.patch?this.patch.queryState():document.queryCommandState(this.commandName)},n.prototype.queryEnabled=function(){return this.patch?this.patch.queryEnabled():document.queryCommandEnabled(this.commandName)},n}}),define("api/node",[],function(){function e(e){this.node=e}return e.prototype.getAncestor=function(e){var n=function(e){return e&&e.attributes&&e.attributes.getNamedItem("contenteditable")};if(!n(this.node))for(var t=this.node.parentNode;t&&!n(t);){if(e(t))return t;t=t.parentNode}},e.prototype.nextAll=function(){for(var e=[],n=this.node.nextSibling;n;)e.push(n),n=n.nextSibling;return e},e}),define("api/selection",[],function(){return function(e){function n(){this.selection=window.getSelection(),this.selection.rangeCount&&(this.range=this.selection.getRangeAt(0))}return n.prototype.getContaining=function(n){var t=new e.api.Node(this.range.commonAncestorContainer),r=t.node&&t.node.attributes&&t.node.attributes.getNamedItem("contenteditable");return!r&&n(t.node)?t.node:t.getAncestor(n)},n.prototype.placeMarkers=function(){var e=document.createElement("em");e.classList.add("scribe-marker");var n=document.createElement("em");n.classList.add("scribe-marker");var t=this.range.cloneRange();if(t.collapse(!1),t.insertNode(n),n.nextSibling&&n.nextSibling.nodeType===Node.TEXT_NODE&&""===n.nextSibling.data&&n.parentNode.removeChild(n.nextSibling),n.previousSibling&&n.previousSibling.nodeType===Node.TEXT_NODE&&""===n.previousSibling.data&&n.parentNode.removeChild(n.previousSibling),!this.selection.isCollapsed){var r=this.range.cloneRange();r.collapse(!0),r.insertNode(e),e.nextSibling&&e.nextSibling.nodeType===Node.TEXT_NODE&&""===e.nextSibling.data&&e.parentNode.removeChild(e.nextSibling),e.previousSibling&&e.previousSibling.nodeType===Node.TEXT_NODE&&""===e.previousSibling.data&&e.parentNode.removeChild(e.previousSibling)}this.selection.removeAllRanges(),this.selection.addRange(this.range)},n.prototype.getMarkers=function(){return e.el.querySelectorAll("em.scribe-marker")},n.prototype.removeMarkers=function(){var e=this.getMarkers();Array.prototype.forEach.call(e,function(e){e.parentNode.removeChild(e)})},n.prototype.selectMarkers=function(e){var n=this.getMarkers();if(n.length){var t=document.createRange();t.setStartBefore(n[0]),t.setEndAfter(n.length>=2?n[1]:n[0]),e||this.removeMarkers(),this.selection.removeAllRanges(),this.selection.addRange(t)}},n.prototype.isCaretOnNewLine=function(){var e=this.getContaining(function(e){return"P"===e.nodeName});if(e){var n=e.innerHTML.trim();return"P"===e.nodeName&&("<br>"===n||""===n)}return!1},n}}),define("api/simple-command",[],function(){return function(e,n){function t(e,t){n.api.Command.call(this,e),this.nodeName=t}return t.prototype=Object.create(e.Command.prototype),t.prototype.constructor=t,t.prototype.queryState=function(){var e=new n.api.Selection;return n.api.Command.prototype.queryState.call(this)&&!!e.getContaining(function(e){return e.nodeName===this.nodeName
}.bind(this))},t}}),define("api",["./api/command-patch","./api/command","./api/node","./api/selection","./api/simple-command"],function(e,n,t,r,o){return function(i){this.CommandPatch=e(i),this.Command=n(i),this.Node=t,this.Selection=r(i),this.SimpleCommand=o(this,i)}}),define("lodash-amd/modern/objects/assign",["../internals/baseCreateCallback","./keys","../internals/objectTypes"],function(e,n,t){var r=function(r,o,i){var a,s=r,c=s;if(!s)return c;var u=arguments,l=0,d="number"==typeof i?2:u.length;if(d>3&&"function"==typeof u[d-2])var f=e(u[--d-1],u[d--],2);else d>2&&"function"==typeof u[d-1]&&(f=u[--d]);for(;++l<d;)if(s=u[l],s&&t[typeof s])for(var m=-1,p=t[typeof s]&&n(s),h=p?p.length:0;++m<h;)a=p[m],c[a]=f?f(c[a],s[a]):s[a];return c};return r}),define("transaction-manager",["lodash-amd/modern/objects/assign"],function(e){return function(n){function t(){this.history=[]}return e(t.prototype,{start:function(){this.history.push(1)},end:function(){this.history.pop(),0===this.history.length&&(n.pushHistory(),n.trigger("content-changed"))},run:function(e){this.start();try{e&&e()}finally{this.end()}}}),t}}),define("undo-manager",[],function(){return function(e){function n(){this.position=-1,this.stack=[],this.debug=e.isDebugModeEnabled()}return n.prototype.maxStackSize=100,n.prototype.push=function(e){for(this.debug&&console.log("UndoManager.push: %s",e),this.stack.length=++this.position,this.stack.push(e);this.stack.length>this.maxStackSize;)this.stack.shift(),--this.position},n.prototype.undo=function(){return this.position>0?this.stack[--this.position]:void 0},n.prototype.redo=function(){return this.position<this.stack.length-1?this.stack[++this.position]:void 0},n}}),define("lodash-amd/modern/arrays/pull",[],function(){function e(e){for(var n=arguments,r=0,o=n.length,i=e?e.length:0;++r<o;)for(var a=-1,s=n[r];++a<i;)e[a]===s&&(t.call(e,a--,1),i--);return e}var n=[],t=n.splice;return e}),define("event-emitter",["lodash-amd/modern/arrays/pull"],function(e){function n(){this._listeners={}}return n.prototype.on=function(e,n){var t=this._listeners[e]||[];t.push(n),this._listeners[e]=t},n.prototype.off=function(n,t){var r=this._listeners[n]||[];t?e(r,t):delete this._listeners[n]},n.prototype.trigger=function(e,n){var t=this._listeners[e]||[];t.forEach(function(e){e.apply(null,n)})},n}),define("scribe",["lodash-amd/modern/objects/defaults","lodash-amd/modern/arrays/flatten","./plugins/core/commands","./plugins/core/events","./plugins/core/formatters/html/replace-nbsp-chars","./plugins/core/formatters/html/enforce-p-elements","./plugins/core/formatters/html/ensure-selectable-containers","./plugins/core/formatters/plain-text/escape-html-characters","./plugins/core/inline-elements-mode","./plugins/core/patches","./plugins/core/set-root-p-element","./api","./transaction-manager","./undo-manager","./event-emitter"],function(e,n,t,r,o,i,a,s,c,u,l,d,f,m,p){function h(n,h){p.call(this),this.el=n,this.commands={},this.options=e(h||{},{allowBlockElements:!0,debug:!1}),this.commandPatches={},this._plainTextFormatterFactory=new g,this._htmlFormatterFactory=new y,this.api=new d(this);var v=f(this);this.transactionManager=new v;var b=m(this);this.undoManager=new b,this.el.setAttribute("contenteditable",!0),this.el.addEventListener("input",function(){this.transactionManager.run()}.bind(this),!1),this.allowsBlockElements()?(this.use(l()),this.use(i()),this.use(a())):this.use(c()),this.use(s()),this.use(o()),this.use(u.commands.bold()),this.use(u.commands.indent()),this.use(u.commands.insertHTML()),this.use(u.commands.insertList()),this.use(u.commands.outdent()),this.use(u.commands.createLink()),this.use(u.events()),this.use(t.indent()),this.use(t.insertList()),this.use(t.outdent()),this.use(t.redo()),this.use(t.subscript()),this.use(t.superscript()),this.use(t.undo()),this.use(r())}function g(){this.formatters=[]}function y(){this.formatters={sanitize:[],normalize:[],"export":[]}}return h.prototype=Object.create(p.prototype),h.prototype.use=function(e){return e(this),this},h.prototype.setHTML=function(e,n){n&&(this._skipFormatters=!0),this.el.innerHTML=e},h.prototype.getHTML=function(){return this.el.innerHTML},h.prototype.getContent=function(){return this._htmlFormatterFactory.formatForExport(this.getHTML().replace(/<br>$/,""))},h.prototype.getTextContent=function(){return this.el.textContent},h.prototype.pushHistory=function(){var e=this.undoManager.stack[this.undoManager.position],n=e&&e.replace(/<em class="scribe-marker">/g,"").replace(/<\/em>/g,"");if(!e||e&&this.getContent()!==n){var t=new this.api.Selection;t.placeMarkers();var r=this.getHTML();return t.removeMarkers(),this.undoManager.push(r),!0}return!1},h.prototype.getCommand=function(e){return this.commands[e]||this.commandPatches[e]||new this.api.Command(e)},h.prototype.restoreFromHistory=function(e){this.setHTML(e,!0);var n=new this.api.Selection;n.selectMarkers(),this.trigger("content-changed")},h.prototype.allowsBlockElements=function(){return this.options.allowBlockElements},h.prototype.setContent=function(e){this.allowsBlockElements()||(e+="<br>"),this.setHTML(e),this.trigger("content-changed")},h.prototype.insertPlainText=function(e){this.insertHTML("<p>"+this._plainTextFormatterFactory.format(e)+"</p>")},h.prototype.insertHTML=function(e){this.getCommand("insertHTML").execute(this._htmlFormatterFactory.format(e))},h.prototype.isDebugModeEnabled=function(){return this.options.debug},h.prototype.registerHTMLFormatter=function(e,n){this._htmlFormatterFactory.formatters[e].push(n)},h.prototype.registerPlainTextFormatter=function(e){this._plainTextFormatterFactory.formatters.push(e)},g.prototype.format=function(e){var n=this.formatters.reduce(function(e,n){return n(e)},e);return n},y.prototype=Object.create(g.prototype),y.prototype.constructor=y,y.prototype.format=function(e){var t=n([this.formatters.sanitize,this.formatters.normalize]),r=t.reduce(function(e,n){return n(e)},e);return r},y.prototype.formatForExport=function(e){return this.formatters.export.reduce(function(e,n){return n(e)},e)},h});//# sourceMappingURL=scribe.min.js.map