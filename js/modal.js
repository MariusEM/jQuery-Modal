
function Modal(options) {
  var pop = this;

  options = $.extend({
    "closeOnBackdrop": true,
    "closable": true,
    "width": 0,
    "height": 0,
    "left": false,
    "top": false,
    "content": "",
    "closeOn": null
  }, options);

  var backdrop, popup, close, icon;

  var closePop = function() {
    backdrop.fadeOut(400, function() {
      $(this).remove();
    });
    popup.fadeOut(400, function() {
      $(this).remove();
    });
  };

  // public close method
  pop.close = closePop;

  var construct = (function() {
    // create backdrop
    backdrop = $(document.createElement("div")).appendTo("body");
    backdrop.attr("id", "backdrop");

    // create popup container
    popup = $(document.createElement("div")).appendTo("body");
    popup.attr("id", "modal");

    if (options.closable) {
      // create close button
      close = $(document.createElement("div")).appendTo(popup);
      close.attr("id", "modal-close");
      icon = $(document.createElement("i")).appendTo(close);
      icon.addClass("fa fa-times");
    }

    // create content container
    container = $(document.createElement("div")).appendTo(popup);
    container.attr("id", "popup-container");

    // append content to popup
    container.html(options.content);

    // if no size is set get size of content
    if (options.width <= 0) {
      options.width = popup.width();
    } else {
      container.css({
        "width": options.width+"px"
      });
    }
    if (options.height <= 0) {
      options.height = popup.height();
    } else {
      container.css({
        "height": options.height+"px"
      });
    }

    // if no position is set center popup
    if (options.left === false) {
      popup.css({
        "left": "50%",
        "margin-left": -(options.width / 2)+"px"
      });
    } else {
      popup.css({
        "left": options.left+"px"
      });
    }
    if (options.top === false) {
      popup.css({
        "top": "50%",
        "margin-top": -(options.height / 2)+"px"
      });
    } else {
      popup.css({
        "top": options.left+"px"
      });
    }

    if (options.closable) {
      // close popup on click
      close.on("click", closePop);
    }

    if (options.closeOn) {
      $(options.closeOn).on("click", closePop);
    }

    // close on click backdrop
    if (options.closeOnBackdrop === true) {
      backdrop.on("click", closePop);
    }

    // make content available
    pop.content = popup;

    // fade in backdrop and popup
    backdrop.fadeIn(400);
    popup.fadeIn(400);
  })();
}