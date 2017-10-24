/*
 * sticky.jquery.js 2.1.4
 * A custom jQuery extension fix for HTML5 sticky elements containing content
 * expanding the viewport height.
 *
 * Some sticky elements may contain content that doesn't fit within the viewport
 * height. This script implements a sticky sidebar the way it should by setting
 * a maximum height, overflow and scrolls the sidebar along with the content.
 *
 * Copyright 2017, Kim Koomen https://github.com/kkoomen
 * Released under the MIT license
 */

(function($) {

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
      return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout( callback, 1000 / 60 );
      };
    })();
  }

  $.fn.sticky = function(options) {
    if (this.length < 1) {
      return false;
    }

    var settings = $.extend({
      /*
       * Allow to set the overflow of the element. Some people might want a
       * scrollbar, some don't.
       */
      overflow: 'hidden',

      /*
       * Allow the user to specify an offset bottom. If this isn't specified
       * then it will inherit the top-property specified on the element.
       */
      offsetBottom: null,
    }, options);

    $(this).each(function(index, element) {
      var $body = $('body');
      var previousScrollPosition = $(window).scrollTop();
      var top = parseInt($(element).css('top'));
      var bottom = (typeof settings.offsetBottom === 'number') ? settings.offsetBottom : top;

      /* Toggle a static position to determine the actual position of the
       * element. This has to due with the problem of refreshing the page where
       * the offset top might be at your last position, which we don't want.
       * Then the threshold will be way different.
       */
      $(element).css('position', 'static');
      var threshold = $(element).offset().top;
      $(element).css('position', '');

      function onResize() {
        if ($(element).css('position') == 'sticky') {
          $(element).css({
            maxHeight: $(window).outerHeight() - top - bottom,
            overflow: settings.overflow,
          });

        } else {
          $(element).css({
            maxHeight: '',
            overflow: '',
          });
        }
      }

      function onScroll() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > previousScrollPosition && $(element).scrollTop() !== $(element).get(0).scrollHeight && scrollTop > threshold) {
          // scrolling down
          var diff = scrollTop - previousScrollPosition;
          ($(element).css('position') == 'sticky') && $(element).scrollTop($(element).scrollTop() + diff);

        } else if ($(element).scrollTop() !== 0 && (scrollTop + $(window).innerHeight()) == ($(element).offset().top + $(element).outerHeight(true) + top)) {
          var diff = previousScrollPosition - scrollTop;
          ($(element).css('position') == 'sticky') && $(element).scrollTop($(element).scrollTop() - diff);
        }

        previousScrollPosition = scrollTop;
        window.requestAnimationFrame(onScroll);
      }

      window.requestAnimationFrame(onScroll);
      $(window).on('resize', onResize);
    });


    // Use the 0-timeout trick to trigger a resize after the content has been
    // loaded.
    setTimeout(function() {
      $(window).trigger('resize');
    }, 0);

    return this;
  };

})(jQuery);
