$(function() {
  FastClick.attach(document.body);

  function isAndroid() {
    var nua = navigator.userAgent,
        isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
    if (isAndroid) {
      $('html').addClass('android-browser');
    }
  }

  isAndroid();

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

  // Create linked input fields (For using email address as username)
  $('.linked-input-master').on('keyup blur', function() {
    var masterVal = $(this).val();
    $('.linked-input-slave').val(masterVal);
    $('.linked-input-slave').removeClass('hidden').text(masterVal);
    if($(this).val() == '') {
      $('.linked-input-slave').addClass('hidden');
    }
  });

  $(".block-label").each(function(){
    var $target = $(this).attr('data-target');

    // Add focus
    $(".block-label input").focus(function() {
      $("label[for='" + this.id + "']").addClass("add-focus");
      }).blur(function() {
      $("label").removeClass("add-focus");
    });
    // Add selected class
    $('input:checked').parent().addClass('selected');

    if($(this).hasClass('selected')) {
      $('#' + $target).show();
    }
  });

  // Add/remove selected class
  $('.block-label').on('click', 'input[type=radio], input[type=checkbox]', function() {
    var $this   = $(this),
        $target = $this.parent().attr('data-target');

    $('input:not(:checked)').parent().removeClass('selected');
    $('input:checked').parent().addClass('selected');

    if($target == undefined) {
      $this.closest('.form-group').next('.toggle-content').hide();
    } else {
      $('#' + $target).show();
    }

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


  //--------Max character length on textareas

  $('textarea').on('keyup', function() {
    characterCount(this);
  });

  $('textarea:not(:empty)').each(function() {
    characterCount(this);
  });

  function characterCount(that) {
    var $this         = $(that),
        $maxLength    = $this.attr('data-val-length-max'),
        $lengthOfText = $this.val().length,
        $charCountEl  = $this.closest('.form-group').find('.maxchar-count');

    if($maxLength) {
      $($charCountEl).text($maxLength - $lengthOfText);
    }

    if($lengthOfText > $maxLength) {
      $charCountEl.addClass('has-error');
    } else {
      $charCountEl.removeClass('has-error');
    }
  }

  //--------Expanding tables

  $('.tbody-3rows').each(function() {
    var $this       = $(this),
        $rowLength  = $this.find('tr').length,
        $expandRows = $this.next('.tbody-expandrows'),
        $after3Rows = $this.find('tr:nth-of-type(3)').nextAll();

    if($rowLength > 3) {
      $expandRows.show();
      $after3Rows.hide();
    }
  });

  $('.btnExpandRows').on('click', function() {
    var $this        = $(this),
        $tbodyExpand = $this.closest('.tbody-expandrows');
        $tbodyRows   = $tbodyExpand.prev('.tbody-3rows').find('tr:nth-of-type(3)').nextAll();

    $tbodyRows.toggle();

    $this.closest('table').toggleClass('opened');

    if($this.html() == '<i class="fa fa-angle-down"></i>More') {
      $this.html('<i class="fa fa-angle-up"></i>Less');
    } else {
      $this.html('<i class="fa fa-angle-down"></i>More');
    }

  });

});