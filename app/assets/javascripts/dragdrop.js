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
  if (front.slice(-3) == 'png' || front.slice(-3) == 'jpg' || front.slice(-3) == 'gif') {
    var front_html = '<span class="front image"><img src="'+front+'" /></span>';
  }
  else {
    var front_html = '<span class="front">'+front+'</span>';
  }
  var back_html = '<span class="back">'+back+'</span>';
  return '<li id="'+id+'">'+front_html+back_html+'</li>';
}

$(function() {

  // settings for draggable items (cards)
  //***************************************************************************

  var dragItems = document.querySelectorAll('[draggable=true]');

  var delimiter = '<>';

  for (var i = 0; i < dragItems.length; i++) {
    addEvent(dragItems[i], 'dragstart', function (event) {
      // store the card's data for pickup on drop
      var id = $(this).attr('id');
      if ($(this).children('.front').children('.text').length) {
        var front = $(this).children('.front').children('.text').text();
      }
      else {
        var front = $(this).children('.front').children('img').attr('src');
      }
      var back = $(this).children('.back').text();
      event.dataTransfer.setData('Text', id + delimiter + front + delimiter + back);
    });
  }

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
      this.innerHTML += render_card(id, front, back);
      // remove the original copy and its reorder-target
      $('.cards').children('li#'+id).next().remove();
      $('.cards').children('li#'+id).remove();

    }

    return false;
  });

  // settings for the reorder-target drag targets
  //***************************************************************************

  var reorder = $('.reorder-target');

  reorder.each(function() {

    addEvent(reorder, 'dragover', cancel);
    addEvent(reorder, 'dragenter', add_over);
    addEvent(reorder, 'drop', remove_over);
    addEvent(reorder, 'dragleave', remove_over);

    addEvent(reorder, 'drop', function (e) {
      // stops the browser from redirecting off to the text.
      if (e.preventDefault) e.preventDefault();

      console.log(e.dataTransfer.getData('Text'));

      return false;
    });

  });

});
