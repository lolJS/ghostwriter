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
requirejs(['ghostwriter']);