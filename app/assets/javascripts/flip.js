$(function() {
  $('.cards, #bin').on('click tapone', 'li', function() {
    $(this).toggleClass('flip');
  });

  /*
  $('.cards, #bin').on('longclick', 'li', function() {
    $(this).toggleClass('flip').siblings().toggleClass('flip');
  });
  */
});
