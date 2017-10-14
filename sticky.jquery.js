/*
 * sticky.jquery.js 1.0
 * A custom jQuery extension fix for HTML5 sticky elements containing content
 * expanding the viewport height.
 *
 * Some sticky elements may contain content that doesn't fit within the viewport
 * height. This script alters the behavior of sticky elements by making them
 * sticky at the bottom, instead of the top, when needed. An element will be
 * sticky once the user reached the bottom of the element, but only when it
 * expands the viewport height. Otherwise it will use the default
 * "position: sticky;" behavior.
 *
 * Copyright 2017, Kim Koomen https://github.com/kkoomen
 * Released under the MIT license
 */

(function($) {

  $.fn.sticky = function(options) {
    /*
     * Add settings which can be overwritten by the user.
     */
    var settings = $.extend({
      /*
       * This should be the position if you wouldn't use "position: sticky;". If
       * the element was positioned absolute then you would specify absolute.
       * Otherwise relative.
       */
      defaultPosition: 'relative',
    }, options);

    var $element = this;
    var position = $element.css('position');

    /*
     * If the element is sticky, set the default position. By doing this, we can
     * get the top offset, which gives us the threshold when to toggle
     * "position: sticky;".
     */
    if (position == 'sticky') {
      $element.css('position', settings.defaultPosition);
    }

    /*
     * Get the top-property of the sticky element. This will also be used to
     * calculate the offset from the bottom. If the top equals 20px then we want
     * that as well when placed at the bottom of the screen.
     */
    var top = parseInt($element.css('top'));

    /*
     * Check wether the element does fit within the screen, including margins
     * and paddings.
     */
    var doesFit = $element.outerHeight(true) < $(window).innerHeight();

    /*
     * Above we checked if the element position is sticky. If it is, then set
     * the default position. Because it has it's "normal" position, we grab its
     * top-offset relative to the document.
     */
    var initialPosition = $element.offset().top + ($(window).innerHeight() - $element.outerHeight(true));

    /*
     * Keep track of the element is made sticky from our side.
     */
    var sticky = false;

    /*
     * Keep track of the last scroll position. This is used to determine of the
     * user is scrolling up or down.
     */
    var lastScrollPosition = 0;

    /*
     * Check initially (after we have all our values, assigned above) if the
     * element does fit within the viewport. If it does, then disable the checks
     * from our side. Otherwise we enable the checks for making it sticky.
     */
    if (doesFit) {
      setSticky('disable')
    } else {
      setSticky()
    }

    // ---------------
    // LOCAL FUNCTIONS
    // ---------------

    /*
     * Position the sticky element at the top or bottom.
     */
    function setSticky(state) {
      var bottom = ($(window).innerHeight() - $element.outerHeight(true) - top);
      $element.css({
        position: 'sticky',
        top: (state == 'disable') ? top : bottom,
      });
    }

    /*
     * Callback function triggered when the user scrolls.
     */
    function onScroll() {
      /*
       * If the element does fit within the viewport, we don't have to do
       * anything so just return false.
       */
      if (doesFit) return false;

      var scrollTop = $(window).scrollTop();
      if (scrollTop > lastScrollPosition) {
        // Scrolling down
        if ((scrollTop + $(window).innerHeight()) >= initialPosition && !sticky) {
          sticky = true;
          setSticky();
        }
      } else {
        // Scrolling up
        if (scrollTop <= initialPosition) {
          sticky = false;
          setSticky('disable');
        }
      }

      lastScrollPosition = scrollTop;
    }

    /*
     * Callback function triggered when the user does resize the screen.
     */
    function onResize() {
      /*
       * While the user is resizing the screen, we update if the element does
       * fit within the viewport. We disable our checks if it does fit and
       * enable our checks if it doesn't.
       */
      doesFit = $element.outerHeight(true) < $(window).innerHeight();
      if (doesFit) {
        setSticky('disable');
      } else {
        setSticky();
      }
    }

    $(window).on('scroll', onScroll);
    $(window).on('resize', onResize);

    return this;
  };

})(jQuery);
