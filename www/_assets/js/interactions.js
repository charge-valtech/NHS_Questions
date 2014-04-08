$(function() {
  $('.menu-trigger').on('click', function() {
    $(this).next('.menu').toggleClass('menu-open');
    $(this).toggleClass('triggered')
    return false;
  });
});