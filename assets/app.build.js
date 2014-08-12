({
    appDir: '.',
    baseUrl: 'js/app/',
    dir: '../dist',
    modules: [
        {
            name: 'ghostwriter',
            include: [
              'highlightjs'
            ]
        }
    ],
    optimize: 'uglify2',
    findNestedDependencies: true,
    paths: {
      'require-js-lib': '../../vendor/requirejs/require',
      'app': '../../js/app',
      'jquery': '../../vendor/jquery/dist/jquery',
      'scribe': '../../vendor/scribe/scribe',
      'scribe-plugin-blockquote-command': '../../vendor/scribe-plugin-blockquote-command/scribe-plugin-blockquote-command',
      'scribe-plugin-curly-quotes': '../../vendor/scribe-plugin-curly-quotes/scribe-plugin-curly-quotes',
      'scribe-plugin-formatter-plain-text-convert-new-lines-to-html': '../../vendor/scribe-plugin-formatter-plain-text-convert-new-lines-to-html/scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
      'scribe-plugin-heading-command': '../../vendor/scribe-plugin-heading-command/scribe-plugin-heading-command',
      'scribe-plugin-intelligent-unlink-command': '../../vendor/scribe-plugin-intelligent-unlink-command/scribe-plugin-intelligent-unlink-command',
      //'scribe-plugin-keyboard-shortcuts': '../../vendor/scribe-plugin-keyboard-shortcuts/scribe-plugin-keyboard-shortcuts',
      'scribe-plugin-link-prompt-command': '../../vendor/scribe-plugin-link-prompt-command/scribe-plugin-link-prompt-command',
      'scribe-plugin-sanitizer': '../../vendor/scribe-plugin-sanitizer/scribe-plugin-sanitizer',
      'scribe-plugin-smart-lists': '../../vendor/scribe-plugin-smart-lists/scribe-plugin-smart-lists',
      'scribe-plugin-toolbar': '../../vendor/scribe-plugin-toolbar/scribe-plugin-toolbar',
      'scribe-plugin-ghost-toolbar': '../scribe-plugin-ghost-toolbar/scribe-plugin-ghost-toolbar',
      // not required to acutally use scribe
      'beautify': '../../vendor/js-beautify/js/lib/beautify',
      'beautify-html': '../../vendor/js-beautify/js/lib/beautify-html',
      'beautify-css': '../../vendor/js-beautify/js/lib/beautify-css',
      'highlightjs': '../../vendor/highlightjs/highlight'
    }
})