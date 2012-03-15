$('.cards li').live('click', function() {
  $(this).toggleClass('flip');
});

$('#bin li').live('click', function() {
  $(this).toggleClass('flip');
});

// flip each card on click and hold for any card
$('.cards li').live('longclick', function() {
  $('.cards li').each(function() {
    $(this).toggleClass('flip');
  });
});

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
});
