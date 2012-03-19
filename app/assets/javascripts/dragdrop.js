// constants
//*****************************************************************************

var delimiter = '<>';

// functions
//*****************************************************************************

function cancel(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

function add_over(e) {
  this.classList.add('over');
}

function remove_over(e) {
  this.classList.remove('over');
}

function get_draggable() {
  var dragItems = $('[draggable=true]');

  dragItems.each(function() {
    addEvent($(this), 'dragstart', function (event) {
      // store the card's data for pickup on drop
      var id = $(this).data('id');
      var html = $(this).clone().wrap('<div>').parent().html();
      event.dataTransfer.setData('Text', id+delimiter+html);
    });

    // delete old item and its reorder-target if successfully reordered
    // save card order after old card is removed
    addEvent($(this), 'dragend', function (event) {
      var id = $(this).data('id');
      if ($('li[data-id='+id+']').length > 1) {
        // only remove next if not in memorized pile
        if ($(this).parent().attr('id') !== 'bin') {
          $(this).next().remove();
        }
        $(this).remove();

        // save card order
        $('.cards li[draggable=true]').each(function(e) {
          var deck_id = $('.cards').data('deck_id');
          var loop_id = $(this).data('id');
          var sort_number = e + 1;

          $.ajax({
            type: 'POST',
            url: '/decks/'+deck_id+'/cards/'+loop_id,
            data: {_method: 'PUT', card: {sort_number: sort_number}}
          });
        });
      }
    });
  });
}

function get_reorder() {
  var reorder = $('.reorder-target');

  addEvent(reorder, 'dragover', cancel);
  addEvent(reorder, 'dragenter', add_over);
  addEvent(reorder, 'drop', remove_over);
  addEvent(reorder, 'dragleave', remove_over);

  addEvent(reorder, 'drop', function (e) {
    // stops the browser from redirecting off to the text.
    if (e.preventDefault) e.preventDefault();

    var full_data = e.dataTransfer.getData('Text');
    var id = full_data.split(delimiter)[0];
    var html = full_data.split(delimiter)[1];
    var deck_id = $('.cards').data('deck_id');

    // prevent duplicates on reorder
    if ($('li[data-id='+id+']').length <= 1) {
      $(this).after(html + '<li class="reorder-target"></li>');

      // re-get draggable items after rendering new card
      get_draggable();

      // re-get reorder-targets after rendering new one
      get_reorder();

      // save card bin location
      $.ajax({
        type: 'POST',
        url: '/decks/'+deck_id+'/cards/'+id,
        data: {_method: 'PUT', card: {bin: 'main'}}
      });
    }

    return false;
  });
}

$(function() {

  get_draggable();

  get_reorder();

  // settings for the memorize pile drag target
  //***************************************************************************

  var memorize_drop = document.querySelector('#bin');

  // Tells the browser that we *can* drop on this target
  addEvent(memorize_drop, 'dragover', cancel);
  addEvent(memorize_drop, 'dragenter', add_over);
  addEvent(memorize_drop, 'drop', remove_over);
  addEvent(memorize_drop, 'dragleave', remove_over);

  addEvent(memorize_drop, 'drop', function (e) {
    // stops the browser from redirecting off to the text.
    if (e.preventDefault) e.preventDefault(); 

    var full_data = e.dataTransfer.getData('Text');
    var id = full_data.split(delimiter)[0];
    var html = full_data.split(delimiter)[1];
    var deck_id = $('.cards').data('deck_id');

    // disallow duplicate drops, and make sure the dragged element was a card
    if (!$(memorize_drop).children('li[data-id='+id+']').length &&
        !isNaN(id)) {
      this.innerHTML += html;
      get_draggable();

      // save card bin location
      $.ajax({
        type: 'POST',
        url: "/decks/"+deck_id+"/cards/"+id,
        data: {_method: 'PUT', card: {bin: 'bin'}}
      });
    }

    return false;
  });

});
