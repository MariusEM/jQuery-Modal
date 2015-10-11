(function ($, window) {
  "use strict";

  var Modal = function (template, options) {
    // predefine Modal defaults
    var defaults = {
      position: "fixed",
      width: "50%",
      height: "50%",
      animation: "fade"
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
    .appendTo("body")
    // close only on click outside of modal
    .on("click", function (event) {
      if ($(this).has(event.target).length === 0) {
        modalClose();
      }
    });

    // create Container Element
    var $modal = $('<div></div>').addClass("modal")
    .css({
      "width": options.width,
      "height": options.height
    })
    .addClass("modal-" + options.animation)
    .appendTo($wrapper);

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
      $modal.on("transitionend", function () {
      });

      $backdrop.addClass("show");
      $wrapper.addClass("show");
      $modal.addClass("show");
    }

    // Modal close Method
    function modalClose() {
      $modal.on("transitionend", function () {
      });

      $backdrop.removeClass("show");
      $wrapper.removeClass("show");
      $modal.removeClass("show");
    }

    return {
      $content: $content,
      close: modalClose,
      open: modalOpen
    };
  };

  window.Modal = Modal;
})(jQuery, window);