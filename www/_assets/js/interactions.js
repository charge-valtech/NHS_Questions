$(function() {
  FastClick.attach(document.body);

  $('.menu-trigger').on('click', function() {
    $(this).next('.menu').toggleClass('menu-open');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.mob-collpanel-trigger').on('click', function() {
    $(this).next('.mob-collpanel').toggleClass('panel-open');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.collpanel-trigger').on('click', function() {
    $(this).next('.collpanel').toggleClass('panel-open');
    $(this).toggleClass('triggered');
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

  $('.form-control').keyup(function(){
    if($(this).val().length==$(this).attr("maxlength")){
      $(this).parent().next('.form-group').find('.form-control').focus();
    }
  });

  // Create linked input fields (For using email address as username)
  $('.linked-input-master').keyup(function() {
    var masterVal = $(this).val();
    $('.linked-input-slave').val(masterVal);
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

  $('.summary-trigger').on('click', function() {
    $('.summary-box').toggle();
  });

  $('.summary-close').on('click', function() {
    $('.summary-box').toggle();
  });

  $("#password-input").keyup(function() {
    initializeStrengthMeter();
  });

  function initializeStrengthMeter() {
    var username = $('#username-input').val();
    $("#pass_meter").pwStrengthManager({
      password: $("#password-input").val(),
      minChars : "8",
      blackList : [username],
      advancedStrength: true
    });
  }

  $('.pw-masktoggle').on("click", function() {
    changePassType();
    toggleShowHide();
  });

  function changePassType() {
    var password = document.getElementById('password-input');
    if (password.type == 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  }

  function toggleShowHide() {
    var showOrHide = $('.pw-masktoggle').text();
    if (showOrHide == 'Show') {
      $('.pw-masktoggle').text('Hide');
    } else {
      $('.pw-masktoggle').text('Show');
    }
  }

  // ------------ Trainee search mockup ------------ //

  $('.trainee-input').on('keyup', function(){
    var $this   = $(this).val(),
        $input1 = $('.trainee-input-1').val(),
        $input2 = $('.trainee-input-2').val(),
        $input3 = $('.trainee-input-3').val(),
        $index  = $.jStorage.index();

    if($this.toLowerCase().indexOf('cust') > -1){
      $('.trainee-searchbtn').attr('href', 'search-results-customer.html');
    } else if($this.toLowerCase().indexOf('admin') > -1){
      $('.trainee-searchbtn').attr('href', 'search-results-admin.html');
    }

    $.jStorage.set('input1Key', $input1);
    $.jStorage.set('input2Key', $input2);
    $.jStorage.set('input3Key', $input3);

  });

  function changeSearchInputs() {
    var resultInput1 = $.jStorage.get('input1Key'),
        resultInput2 = $.jStorage.get('input2Key'),
        resultInput3 = $.jStorage.get('input3Key');

    $('.trainee-result-input-1').val(resultInput1);
    $('.trainee-result-input-2').val(resultInput2);
    $('.trainee-result-input-3').val(resultInput3);
  }

  changeSearchInputs();

});