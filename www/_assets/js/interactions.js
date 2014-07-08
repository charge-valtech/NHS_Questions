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

  // Create linked input fields (For using email address as username)
  $('.linked-input-master').keyup(function() {
    var masterVal = $(this).val();
    $('.linked-input-slave').val(masterVal);
    $('.linked-input-slave').removeClass('hidden').text(masterVal);
    if($(this).val() == '') {
      $('.linked-input-slave').addClass('hidden');
    }
  });

  // Add/remove selected class
  $('.block-label').on('click', 'input[type=radio], input[type=checkbox]', function() {

      $('input:not(:checked)').parent().removeClass('selected');
      $('input:checked').parent().addClass('selected');

      $(this).closest('.form-group').next('.toggle-content').toggle();

      var target = $('input:checked').parent().attr('data-target');
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

  $('.inpage-focus').on('click', function() {
    var $this      = $(this),
        $target    = $this.attr('href'),
        $targetFor = $($target).attr('for');

    $('#' + $targetFor).focus();
  });

// -- Password strength indicator

  $("#password-input").keyup(function() {
    initializeStrengthMeter();
  });

  function initializeStrengthMeter() {
    $("#pass_meter").pwStrengthManager({
      password: $("#password-input").val(),
      minChars : "8",
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

  //--------Max character length on textareas

  $('textarea').on('keyup', function() {
    var $this         = $(this),
        $maxLength    = $this.attr('data-val-length-max'),
        $lengthOfText = $this.val().length,
        $charCountEl  = $this.next('.maxchar-count');

    if($maxLength) {
      $($charCountEl).text($maxLength - $lengthOfText);
    }

    if($lengthOfText > $maxLength) {
      $charCountEl.addClass('has-error');
    } else {
      $charCountEl.removeClass('has-error');
    }

  });

});