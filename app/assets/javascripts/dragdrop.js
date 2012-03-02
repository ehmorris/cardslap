
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
      var id = $(this).attr('class');
      var html = '<li draggable="true" class="'+id+'">'+$(this).html()+'</li>';
      event.dataTransfer.setData('Text', id+delimiter+html);
    });

    // delete old item and its reorder-target if successfully reordered
    addEvent($(this), 'dragend', function (event) {
      var id = $(this).attr('class');
      if ($('.'+id).length > 1) {
        $(this).next().remove();
        $(this).remove();
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

    // prevent duplicates on reorder
    if ($('.cards').children('.'+id).length <= 1) {
      $(this).after(html + '<li class="reorder-target"></li>');
    }

    // re-get draggable items after rendering new card
    get_draggable();

    // re-get reorder-targets after rendering new one
    get_reorder();

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

    // disallow duplicate drops
    if (!$(memorize_drop).children('.'+id).length) {
      this.innerHTML += html;
    }

    get_draggable();

    return false;
  });

});
