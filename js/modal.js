(function ($) {
  "use strict";

  // using the jQuery namespace, extending it
  $.Modal = Modal;

  function Modal(element, options) {
    var defer;
    var $element = $(element);

    // set Modal options
    options = $.extend({
      animation: "fade",
      modalClose: true,
      closeOnKey: true
    }, options);

    // create Wrapper Element
    var $wrapper = $('<div></div>').addClass("jq-modal-wrapper")
    .appendTo("body");

    // create Backdrop Element
    var $backdrop = $('<div></div>').addClass("jq-modal-backdrop")
    .appendTo($wrapper);

    // set to Modal Element
    var $modal = $element.addClass().addClass("jq-modal-container")
    .appendTo($wrapper);

    // if animation is set
    if (options.animation) {
      $modal.addClass("jq-modal-animate jq-modal-animate-" + options.animation); // apply the animation type
      $backdrop.addClass("jq-modal-animate");
    }

    /////////////////////////////////////////////

    // Modal open Method
    function modalOpen() {
      defer = $.Deferred(); // create Promise

      // close on click modal overlay
      if (options.modalClose) {
        $backdrop.on("click.modal", function (event) {
          modalClose(false, "closed");
        });
      }

      // close on click ESC
      if (options.closeOnKey) {
        $(window).on("keyup.modal", function (event) {
          if (event.which === 27) {
            modalClose(false, "closed");
          }
        });
      }

      // setting class to on, starting animations shows the Modal
      $backdrop.addClass("on");
      $wrapper.addClass("on");
      $modal.addClass("on");

      // return promise
      return defer.promise();
    }

    // Modal close Method
    function modalClose(status, data) {
      // unbind close events
      $wrapper.off();
      $(window).off("keyup.modal");

      // removing class on, starting animations, hides the Modal
      $backdrop.removeClass("on");
      $wrapper.removeClass("on");
      $modal.removeClass("on");

      // resolve or reject promise
      if (status) { // true
        defer.resolve(data);
      } else { // false
        defer.reject(data);
      }
    }

    // destroys Modal if not used anymore
    function _destroy() {
      $backdrop.remove();
      $wrapper.remove();
      $.removeData(element, "modal");
    }

    function content(html) {
      $modal.html($(html));
    }

    // returns the content and open/close Methods
    return {
      close: modalClose,
      open: modalOpen,
      $content: $element,
      destroy: _destroy
    };
  }
})(jQuery);
