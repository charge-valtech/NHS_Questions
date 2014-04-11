$(function() {
  $('.menu-trigger').on('click', function() {
    $(this).next('.menu').toggleClass('menu-open');
    $(this).toggleClass('triggered')
    return false;
  });
  $(".block-label").each(function(){

      // Add focus
      $(".block-label input").focus(function() {
        $("label[for='" + this.id + "']").addClass("add-focus");
        }).blur(function() {
        $("label").removeClass("add-focus");
      });
      // Add selected class
      $('input:checked').parent().addClass('selected');

    });

    // Add/remove selected class
    $('.block-label').find('input[type=radio], input[type=checkbox]').click(function() {

      $('input:not(:checked)').parent().removeClass('selected');
      $('input:checked').parent().addClass('selected');

      // Hide open data-toggle content
      $('.toggle-content').hide();

      // Show data-toggle content
      var target = $(this).parent().attr('data-target');
      $('#'+target).show();

    });

    $('.amend-answers').on('click', function() {
      $(this).closest('.form-group').toggleClass('expanded');
      return false;
    });

    $('.update-answers').on('click', function() {
      $(this).closest('.form-group').toggleClass('expanded');
    });
});