define(function () {

  'use strict';

  return function (commands) {
    return function (scribe) {
      var body = document.getElementsByTagName('body')[0],
        toolbarHtml = '<div class="toolbar">' +
          '<ul>' +  // TODO: generate list of ocmmands based on added list or maybe get them from scribe?
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
          '<div class="arrow-down"></div>',
        gwHtml = document.createElement('div');

      gwHtml.innerHTML = toolbarHtml;
      gwHtml.firstChild.id = 'scribe-toolbar-' + new Date().getUTCMilliseconds();
      gwHtml.classList.add('ghost-writer');
      gwHtml.classList.add('hidden');

      scribe.ghost = {};
      scribe.ghost.toolbar = gwHtml.firstChild;
      scribe.ghost.el = body.appendChild(gwHtml);

      function calculateBounds(e) {
        var gwToolbar = scribe.ghost.el,
          top = 0,
          left = 0;

        // Handle bounds - x
        if (e.pageX - (gwToolbar.offsetWidth / 2) < 0) {
          left = 0;
        }
        else if (e.pageX + (gwToolbar.offsetWidth / 2) > document.body.offsetWidth - 25) {
          left = document.body.offsetWidth - gwToolbar.offsetWidth;
        }
        else {
          left = e.pageX - (gwToolbar.offsetWidth / 2);
        }

        // Handle bounds - y
        if (e.pageY - 50 < 0) {
          top = 0;
        }
        else {
          top = e.pageY - gwToolbar.offsetHeight - 20; // give it some room for the arrow
        }

        return {
          top: top,
          left: left
        };
      }

      function handleToolbarPosition(e) {
        var gwToolbar = scribe.ghost.el,
            target = e.target || e.srcElement;

        if (!target.isContentEditable)
          return;

        if (window.getSelection().isCollapsed) {
          gwToolbar.classList.add('hidden');
        } else {
          var limit = calculateBounds(e);

          gwToolbar.style.top = limit.top + 'px';
          gwToolbar.style.left = limit.left + 'px';
          gwToolbar.classList.remove('hidden');
        }
      }

      function goAway(e) {
        var ghosts = document.querySelectorAll('.ghost-writer');
        Array.prototype.forEach.call(ghosts, function (ghost) {
          if (!ghost.classList.contains('hidden')) {
            ghost.classList.add('hidden');
          }
        });
      }

      /**
       * GhostWriter Events
       * Events mousdown, mouseup, keyup
       */
      scribe.el.addEventListener('mousedown', goAway);
      scribe.el.addEventListener('dblclick', handleToolbarPosition);
      scribe.el.addEventListener('mouseup', function (e) { setTimeout(function () { handleToolbarPosition(e); }, 100); });
      scribe.el.addEventListener('keyup', handleToolbarPosition);

    };
  };

});
