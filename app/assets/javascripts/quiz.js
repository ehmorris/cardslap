$(function() {
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

      var html = $(this).parents('li').clone().wrap('<div>').parent().html();
      $('#bin').html($('#bin').html() + html);
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
