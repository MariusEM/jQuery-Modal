(function ($) {
  "use strict";

  var Modal = function (element, options) {
    var defer;

    // set Modal options
    options = $.extend({
      animation: "fade",
      modalClose: true,
      closeOnKey: true
    }, options);

    // create Wrapper Element
    var $wrapper = $('<div></div>').addClass("modal-wrapper")
    .appendTo("body");

    // create Backdrop Element
    var $backdrop = $('<div></div>').addClass("modal-backdrop")
    .appendTo($wrapper);

    // set to Modal Element
    var $modal = $(element).addClass().addClass("modal-container")
    .addClass("modal-" + options.animation) // apply the animation type
    .appendTo($wrapper);

    // Modal open Method
    function modalOpen() {
      defer = $.Deferred(); // create Promise

      // close on click modal overlay
      if (options.modalClose) {
        $backdrop.on("click.modal", function (event) {
          modalClose(false);
        });
      }

      // close on click ESC
      if (options.closeOnKey) {
        $(window).on("keyup.modal", function (event) {
          if (event.which === 27) {
            modalClose(false);
          }
        });
      }

      // setting class to modal-visible, starting animations shows the Modal
      $backdrop.addClass("modal-visible");
      $wrapper.addClass("modal-visible");
      $modal.addClass("modal-visible");

      // return promise
      return defer;
    }

    // Modal close Method
    function modalClose(status, data) {

      // resolve or reject promise
      if (status) { // true
        defer.resolve(data);
      } else { // false
        defer.reject(data);
      }

      // unbind close events
      $wrapper.off();
      $(window).off("keyup.modal");

      // removing class modal-visible, starting animations, hides the Modal
      $backdrop.removeClass("modal-visible");
      $wrapper.removeClass("modal-visible");
      $modal.removeClass("modal-visible");
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
      destroy: _destroy
    };
  };

  $.fn.modal = function () {
    var args = arguments;
    return this.each(function () {
      if ($(this).data("modal")) {
        if (typeof args[0] === "string") {
          try  {
            $(this).data("modal")[args[0]](args[1]);
          }
          catch(err) {
            console.error("modal has no method " + args[0]);
          }
        } else {
          console.error("modal plugin already initialized");
        }
      } else {
        if (typeof args[0] === "object" || typeof args[0] === "undefined") {
          $(this).data("modal", new Modal(this, args[0]));
        } else {
          console.error(args[0] + " is not a function");
        }
      }
    });
  };
})(jQuery || window.jQuery);
