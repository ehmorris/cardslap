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

  // flip card over on guess and show guess on backside form
  $('.cards-quiz > li form.form-front').submit(function() {
    $(this).parent().addClass('flip');
    var guess = $(this).children('textarea').val();
    $(this).parents('li').find('form.form-back .guess').text(guess);
    return false;
  });

  // memorize or reshuffle card if guess is correct or incorrect
  $('.cards-quiz > li form.form-back input[type="button"]').click(function() {
    var deck_id = $(this).parents('.cards-quiz').data('deck_id');
    var card_id = $(this).parents('li').data('id');

    if ($(this).hasClass('yes')) {
      // put into memorized pile and show next card
      $.ajax({
        type: 'POST',
        url: "/decks/"+deck_id+"/cards/"+card_id,
        data: {_method: 'PUT', card: {bin: 'bin'}}
      });
    }

    // show next if it exists, otherwise show end message
    if ($(this).parents('li').next().length) {
      $(this).parents('li').hide().next().show();
    }
    else {
      $('.cards-quiz').html(
        "<h2>Looks like that's all the cards! Reload the page to go through the cards you missed</h2>"
      );
    }
  });
});
