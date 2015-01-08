$(function () {

  var sortControl = $('.float-right-wrap');
  var secondToLast = $('.search-results__item:nth-last-child(2)');
  var origPosition = '23px';
  var posNumber = 23;

  $(window).scroll(function() {
    var sortOffset = sortControl.offset(),
        secondOffset = secondToLast.offset(),
        sortTopPos = sortOffset.top - $(window).scrollTop(),
        secLastTopPos = secondOffset.top - $(window).scrollTop();

    if(sortTopPos < posNumber) {
      $('.fixedsticky').addClass('sticky');
    } else {
      $('.fixedsticky').removeClass('sticky');
    }

    if(secLastTopPos < 0) {
      $('.fixedsticky').css('top', secLastTopPos + posNumber + 'px');
    } else {
      $('.fixedsticky').css('top', origPosition);
    }
  });

});

