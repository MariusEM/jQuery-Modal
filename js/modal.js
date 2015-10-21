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

    // create Modal Element
    var $modal = $('<div></div>').addClass("modal")
    .addClass("modal-" + options.animation) // apply the animation type
    .appendTo($wrapper);

    // append content to Modal
    $modal.html($(element));

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

      // setting class to active, starting animations shows the Modal
      $backdrop.addClass("active");
      $wrapper.addClass("active");
      $modal.addClass("active");

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

      // removing class active, starting animations, hides the Modal
      $backdrop.removeClass("active");
      $wrapper.removeClass("active");
      $modal.removeClass("active");
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
      content: content,
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
        if (typeof args[0] === "object") {
          $(this).data("modal", new Modal(this, args[0]));
        } else {
          console.error(args[0] + " is not a function");
        }
      }
    });
  };
})(jQuery);