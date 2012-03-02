
// constants
//***************************************************************************

var delimiter = '<>';

// functions
//***************************************************************************

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

function render_card(id, front, back) {
  if (front.slice(-3) == 'png' || 
      front.slice(-3) == 'jpg' || 
      front.slice(-3) == 'gif') {
    var front_html = '<span class="front image"><img src="'+front+'" /></span>';
  }
  else {
    var front_html = '<span class="front"><div class="text">'+front+'</div></span>';
  }
  var back_html = '<span class="back">'+back+'</span>';
  return '<li draggable="true" id="'+id+'">'+front_html+back_html+'</li>';
}

function get_draggable() {
  var dragItems = $('[draggable=true]');

  dragItems.each(function() {
    addEvent($(this), 'dragstart', function (event) {
      // store the card's data for pickup on drop
      var id = $(this).attr('id');
      if ($(this).children('.front').children('.text').length) {
        var front = $(this).children('.front').children('.text').text();
      }
      else {
        var front = $(this).children('.front').children('img').attr('src');
      }
      var back = $(this).children('.back').text();
      event.dataTransfer.setData('Text', id+delimiter+front+delimiter+back);
    });

    // delete old item and its reorder-target
    addEvent($(this), 'dragend', function (event) {
      $(this).next().remove();
      $(this).remove();
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
    var front = full_data.split(delimiter)[1];
    var back = full_data.split(delimiter)[2];

    $(this).after(
      render_card(id, front, back) + 
      '<li class="reorder-target"></li>'
    );

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
    var front = full_data.split(delimiter)[1];
    var back = full_data.split(delimiter)[2];

    // disallow duplicate drops
    if (!$(memorize_drop).children('#'+id).length) {
      // remove card reorder-target
      //$('.cards').children('li#card_'+id).next().remove();
      this.innerHTML += render_card(id, front, back);
    }

    return false;
  });

});
