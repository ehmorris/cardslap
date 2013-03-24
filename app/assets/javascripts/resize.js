function make_reorderable() {
  $('.cards li[draggable]').each(function() {
    // apply the resizable function to each item seperately so
    // that we can specify each item's "alsoResize"
    $(this).resizable({
      'alsoResize': $(this).next('.reorder-target'),
      grid: [25, 25]
    });
  });
}

$(function() {
  make_reorderable();
  $('.cards li[draggable]').on('resizestop', function(event, ui) {
    var cardwidth = $(this).outerWidth();
    var cardheight = $(this).outerHeight();
    var deck_id = $('.cards').data('deck_id');
    var id = $(this).data('id');

    // save card size info
    $.ajax({
      type: 'POST',
      url: "/decks/"+deck_id+"/cards/"+id,
      data: {_method: 'PUT', card: {width: cardwidth, height: cardheight}}
    });
  });
});
