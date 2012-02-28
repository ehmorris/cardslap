var msie = /*@cc_on!@*/0;

var links = document.querySelectorAll('li'), el = null;
for (var i = 0; i < links.length; i++) {
  el = links[i];

  addEvent(el, 'dragstart', function (e) {
    e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
    e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
  });
}

var bin = document.querySelector('#bin');

addEvent(bin, 'dragover', function (e) {
  if (e.preventDefault) e.preventDefault(); // allows us to drop
  this.className = 'over';
  e.dataTransfer.dropEffect = 'copy';
  return false;
});

// to get IE to work
addEvent(bin, 'dragenter', function (e) {
  this.className = 'over';
  return false;
});

addEvent(bin, 'dragleave', function () {
  this.className = '';
});

addEvent(bin, 'drop', function (e) {
  if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???

  var el = document.getElementById(e.dataTransfer.getData('Text'));

  el.parentNode.removeChild(el);

  setTimeout(function () {
    var t = setInterval(function () {
      if (y.style.opacity <= 0) {
        if (msie) { // don't bother with the animation
          y.style.display = 'none';
        }
        clearInterval(t); 
      } else {
        y.style.opacity -= 0.1;
      }
    }, 50);
  }, 250);

  return false;
});

