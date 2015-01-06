$(function () {

  var sortControl = $('.float-right-wrap');
  var secondToLast = $('.search-results__item:nth-last-child(2)');
  var origPosition = $('.fixedsticky').css('top');
  var posNumber = parseInt(origPosition, 10);

  $(window).scroll(function() {
    var sort = sortControl[0];
    var second = secondToLast[0];

    var sortTopPos = sort.getBoundingClientRect().top;
    var secLastTopPos = second.getBoundingClientRect().top;


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

