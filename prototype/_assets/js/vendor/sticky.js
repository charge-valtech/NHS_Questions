$(function () {
  var menu = document.querySelector('.fixedsticky');
  var menuPosition = menu.getBoundingClientRect();
  var placeholder = document.createElement('div');
  placeholder.style.width = menuPosition.width + 'px';
  placeholder.style.height = menuPosition.height + 'px';
  var isAdded = false;

  window.addEventListener('scroll', function() {
      if (window.pageYOffset >= menuPosition.top && !isAdded) {
          menu.classList.add('sticky');
          menu.parentNode.insertBefore(placeholder, menu);
          isAdded = true;
      } else if (window.pageYOffset < menuPosition.top && isAdded) {
          menu.classList.remove('sticky');
          menu.parentNode.removeChild(placeholder);
          isAdded = false;
      }
  });

  // http://www.sitepoint.com/css-position-sticky-introduction-polyfills/

  var secondToLast = $('.search-results__item:nth-last-child(2)');

  $(window).scroll(function() {
    var second = secondToLast[0];
    var positionTop = second.getBoundingClientRect().top;

    if(positionTop < 0) {
      $('.fixedsticky').css('top', positionTop + 23 + 'px');
    } else {
      $('.fixedsticky').css('top', '23px');
    }
  });

});

