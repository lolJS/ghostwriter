define([],function(){return function(){return function(t){function n(n){var e,a,o=t.ghost.el;return a=n.pageX-o.offsetWidth/2<0?0:n.pageX+o.offsetWidth/2>document.body.offsetWidth-25?document.body.offsetWidth-(o.offsetWidth+12):n.pageX-o.offsetWidth/2,e=n.pageY-50<0?0:n.pageY-70,{top:e,left:a+3}}function e(e){var a=t.ghost.el,o=e.target||e.srcElement;if(o.isContentEditable)if(window.getSelection().isCollapsed)a.classList.add("hidden");else{var s=n(e);a.style.top=s.top+"px",a.style.left=s.left+"px",a.classList.remove("hidden")}}function a(){var t=document.querySelectorAll(".ghost-writer");Array.prototype.forEach.call(t,function(t){t.classList.contains("hidden")||t.classList.add("hidden")})}var o=document.getElementsByTagName("body")[0],s='<div class="toolbar"><ul><li><button data-command-name="bold"><span class="fontawesome-bold"></span></button></li><li><button data-command-name="italic"><span class="fontawesome-italic"></span></button></li><li><button data-command-name="strikeThrough"><span class="fontawesome-strikethrough"></span></button></li><li><button data-command-name="removeFormat"><span class="fontawesome-remove"></span></button></li><li><button data-command-name="linkPrompt"><span class="fontawesome-link"></span></button></li><li><button data-command-name="insertOrderedList"><span class="fontawesome-list-ol"></span></button></li><li><button data-command-name="insertUnorderedList"><span class="fontawesome-list-ul"></span></button></li><li><button data-command-name="indent"><span class="fontawesome-indent-left"></span></button></li><li><button data-command-name="outdent"><span class="fontawesome-indent-right"></span></button></li><li><button data-command-name="blockquote"><span class="fontawesome-quote-left"></span></button></li><li><button data-command-name="h2"><span class="fontawesome-text-height"></span></button></li><li><button data-command-name="undo"><span class="fontawesome-undo"></span></button></li></ul></div><div class="arrow-down"></div>',i=document.createElement("div");i.innerHTML=s,i.firstChild.id="scribe-toolbar-"+(new Date).getUTCMilliseconds(),i.classList.add("ghost-writer"),i.classList.add("hidden"),t.ghost={},t.ghost.toolbar=i.firstChild,t.ghost.el=o.appendChild(i),t.el.addEventListener("mousedown",a),t.el.addEventListener("dblclick",e),t.el.addEventListener("mouseup",function(t){setTimeout(function(){e(t)},100)}),t.el.addEventListener("keyup",e)}}});