// stuff
define(['jquery',
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
   'scribe-plugin-ghost-toolbar',
   'beautify-html',
   'highlightjs'],

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
  scribePluginGhostToolbar,
  html_beautify,
  highlightjs) {

  'use strict';

  // Load HTML beautify for demo to make html pretty
  var htmlBeautify = html_beautify.html_beautify;

  /**
   * Load Scribe(s)
   */
  $('.ghost-writer-editable').each(function (i, el) {
    // add scribe class so we know scribe is on that element
    $(el).addClass('scribe');

    var scribe = new Scribe(el, { allowBlockElements: true });

    // Demo only
    function updateHTML() {
      var htmlOut = $('.scribe-html code');
      htmlOut.empty();
      htmlOut.text(htmlBeautify(scribe.getHTML()));
      var hljs = window.hljs;
      hljs.configure({ tabReplace: '  ' });
      hljs.highlightBlock(htmlOut[0]);
    }

    scribe.on('content-changed', updateHTML);

    /**
     * Scribe Plugins
     */
    scribe.use(scribePluginBlockquoteCommand());
    scribe.use(scribePluginHeadingCommand(2));
    scribe.use(scribePluginIntelligentUnlinkCommand());
    scribe.use(scribePluginLinkPromptCommand());
    scribe.use(scribePluginGhostToolbar());
    scribe.use(scribePluginToolbar(scribe.ghost.toolbar));
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
});
