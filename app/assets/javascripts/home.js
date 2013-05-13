$(function() {

  if ($('body.home')) {
    $(window).scroll(function() {
      var total_height = $(document).height();
      var viewport_height = $(window).height();
      var viewport_position = $(window).scrollTop();
      var saturation = Math.abs(
                         Math.round(
                           (viewport_position /
                           (total_height - viewport_height))
                           * 100));

      if (saturation > 73) {
        saturation = 73;
      }

      saturation = 73 - saturation;

      $('h1.logo').css('color', 'hsl(229, '+saturation+'%, 72%)');
    });
  }

});
