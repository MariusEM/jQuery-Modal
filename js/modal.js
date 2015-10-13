(function ($, window) {
  "use strict";

  var Modal = function (options) {

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

    // Modal open Method
    function modalOpen(template, opts) {
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

      // setting additional options
      opts = $.extend({
        // template: template || null,
        async: false,
        promise: null
      }, opts);

      // append content to Modal
      $modal.html(template || null);

      if (opts.async) {
        // append content to Modal after async is finished
        opts.promise.then(function (tplt) {
          $modal.html(tplt);
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
    }

    // returns the content and open/close Methods
    return {
      $modal: $modal,
      close: modalClose,
      open: modalOpen
    };
  };

  window.Modal = Modal;
})(jQuery, window);