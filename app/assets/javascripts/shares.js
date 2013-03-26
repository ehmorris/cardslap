$(function() {
  $('a.share').click(function() {
    $(this).next('.shares-container').toggleClass('active');
    return false;
  });
});
