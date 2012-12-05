$(function() {
  $("#card-size").slider({
    range: "min",
    value: 200,
    min: 200,
    max: 1000,
    slide: function( event, ui ) {
      $('ul.cards li:not(.reorder-target)').each(function() {
        $(this).width(ui.value);
        $(this).height(ui.value);
        if ($(this).children('.front').hasClass('image')) {
          $(this).children('.image').children('img').width(ui.value);
        }
      });
    }
  });

  $('.cards, #bin').on('click tapone', 'li', function() {
    $(this).toggleClass('flip');
  });

  $('.cards, #bin').on('longclick', 'li', function() {
    $(this).toggleClass('flip').siblings().toggleClass('flip');
  });
});
