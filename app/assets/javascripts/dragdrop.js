function cancel(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

$(function() {

  var dragItems = document.querySelectorAll('[draggable=true]');

  var delimiter = '<>';

  for (var i = 0; i < dragItems.length; i++) {
    addEvent(dragItems[i], 'dragstart', function (event) {
      // store the card's data for pickup on drop
      var id = $(this).attr('id');
      var front = $(this).children('.front').children('.text').text();
      var back = $(this).children('.back').text();
      event.dataTransfer.setData('Text', id + delimiter + front + delimiter + back);
    });
  }

  var drop = document.querySelector('#bin');

  // Tells the browser that we *can* drop on this target
  addEvent(drop, 'dragover', cancel);
  addEvent(drop, 'dragenter', cancel);

  addEvent(drop, 'drop', function (e) {
    if (e.preventDefault) e.preventDefault(); // stops the browser from redirecting off to the text.

    var full_data = e.dataTransfer.getData('Text');
    var id = full_data.split(delimiter)[0];
    var front = full_data.split(delimiter)[1];
    var back = full_data.split(delimiter)[2];

    // disallow duplicate drops
    if (!$(drop).children('#'+id).length) {
      this.innerHTML += '<li id="'+id+'"><span class="front">'+front+'</span><span class="back">'+back+'</span></li>';
      // remove the original copy
      $('.cards').children('li#'+id).remove();
    }

    return false;
  });

});
