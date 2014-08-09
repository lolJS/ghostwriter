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
        '<blockquote><p>“Easy reading is damned hard writing.” — Nathaniel Hawthorne</p></blockquote><p>GhostWriter is a small JS application that lets you edit content directly in your browser. The main focus is <i>quick</i>, <b>easy</b>, and <b>hassle free</b> composing without writing HTML. GhostWriter is a wrapper on top of <a href="http://theguardian.com">The Guardian’s</a> <a href="http://github.com/guardian/scribe">Scribe</a> content editable framework. Scribe is a plugin based framework which standardized content editable elements across browsers.<br></p><p>Editing is a snap.</p><ol><li>Dopuble click or highlight on any editable element.</li><li>Start writing.<br></li></ol><p>In sit amet varius ipsum. Sed sit amet neque vitae eros elementum gravida non a arcu. Proin vel ligula magna. Aenean vestibulum dui nec suscipit molestie. Vestibulum a ante rutrum, volutpat mi vestibulum, scelerisque quam. Sed facilisis sed lectus eget consequat. Duis dignissim libero in suscipit pretium. Pellentesque laoreet sapien mauris, nec suscipit nunc bibendum in. Proin sem dui, mattis eget rhoncus quis, consequat sed arcu. Morbi interdum pharetra lorem id dictum.</p><p><i>GhostWriter was used in the making of this post.</i><br></p>');  
    }
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
