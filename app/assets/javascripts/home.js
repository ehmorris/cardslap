$(function() {

  if ($('body.home')) {
    $(window).scroll(function() {
      var total_height = $(document).height();
      var viewport_height = $(window).height();
      var viewport_position = $(window).scrollTop();
      var opacity = Math.abs((viewport_position /
                             (total_height - viewport_height)));

      opacity = 1 - opacity;

      $('h1.logo').css('opacity', opacity);
    });
  }

  // size cards
  var window_width = $(window).width();
  var card_width = $('.cards .card').width();
  var correct_cards_in_row = Math.round(window_width / card_width);
  var correct_card_width = window_width / correct_cards_in_row;

  if ($('body.home').length) {
    $('.cards .card').width(correct_card_width);
  }

  // randomly apply flip class
  $(window).scroll(function(e) {
    var rand = Math.floor(Math.random() * 30);
    if ($(window).scrollTop() % 2) {
      if ($('.cards .card').eq(rand).hasClass('flip')) {
        $('.cards .card').eq(rand).removeClass('flip');
      }
      else {
        $('.cards .card').eq(rand).addClass('flip');
      }
    }
  });

});
