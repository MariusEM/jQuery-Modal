// checking for "transitionend" event support
(function (window) {
  var transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  },
  elem = document.createElement('div');

  for(var t in transitions){
    if(typeof elem.style[t] !== 'undefined'){
      window.transitionEnd = transitions[t];
      break;
    }
  }
})(window);

(function ($, window) {
  "use strict";

  var Modal = function (template, options) {
    // predefine Modal defaults
    var defaults = {
      position: "fixed",
      width: "50%",
      height: "50%",
      animation: "fade",
      modalClose: true,
      closeOnKey: true,
      onClose: function (){return true;}
    };

    // apply custom options
    options = $.extend(defaults, options);

    // create Backdrop Element
    var $backdrop = $('<div></div>').addClass("modal-backdrop")
    .appendTo("body");

    // create Wrapper Element
    var $wrapper = $('<div></div>').addClass("modal-wrapper")
    .css({
      "position": options.position
    })
    .appendTo("body");

    // create Modal Element
    var $modal = $('<div></div>').addClass("modal")
    .css({
      "width": options.width,
      "height": options.height
    })
    .addClass("modal-" + options.animation)
    .appendTo($wrapper);

    // set Modal Content
    var $content;
    // check if template is already an jQuery Object
    if (template instanceof $) {
      $content = template;
    } else {
      $content = $(template);
    }
    $content.appendTo($modal);

    // Modal open Method
    function modalOpen() {
      var defer = $.Deferred();

      // close on click modal overlay
      if (options.modalClose) {
        $wrapper.on("click.modal", function (event) {
          if ($(this).has(event.target).length === 0) {
            modalClose();
          }
        });
      }

      // close on click ESC
      if (options.closeOnKey) {
        $(window).on("keyup.modal", function (event) {
          if (event.which === 27) {
            modalClose();
          }
        });
      }

      // listen for transition end
      $modal.one(window.transitionEnd, function () {
        defer.resolve();
      });

      // setting class to show, starting animations
      $backdrop.addClass("show");
      $wrapper.addClass("show");
      $modal.addClass("show");

      // IE <= 9 fallback
      if (! window.transitionEnd) {
        $modal.trigger(window.transitionEnd);
      }

      // return promise
      return defer;
    }

    // Modal close Method
    function modalClose() {
      var defer = $.Deferred();

      // fire onClose callback
      options.onClose();

      // unbind close events
      $wrapper.off();
      $(window).off("keyup.modal");

      // listen for transition end
      $modal.one(window.transitionEnd, function () {
        defer.resolve();
      });

      // removing class show, starting animations
      $backdrop.removeClass("show");
      $wrapper.removeClass("show");
      $modal.removeClass("show");

      // IE <= 9 fallback
      if (! window.transitionEnd) {
        $modal.trigger(window.transitionEnd);
      }

      // return promise
      return defer;
    }

    // destroy modal
    function _destroy() {
      $backdrop.remove();
      $wrapper.remove();
    }

    return {
      $content: $content,
      close: modalClose,
      open: modalOpen
    };
  };

  window.Modal = Modal;
})(jQuery, window);