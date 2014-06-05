$(function() {
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

  $('.trainee-result-input').on('keyup', function(){
    var $this   = $(this).val(),
        $input1 = $('.trainee-result-input-1').val(),
        $input2 = $('.trainee-result-input-2').val(),
        $input3 = $('.trainee-result-input-3').val();

    if($this.toLowerCase().indexOf('cust') > -1){
      $('.update-results-btn').attr('href', 'search-results-customer.html');
    } else if($this.toLowerCase().indexOf('admin') > -1){
      $('.update-results-btn').attr('href', 'search-results-admin.html');
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

// ------------ Apply for vacancy mockup ------------ //

  $('#saveQualification').on('click', function(e){
    var $qualType    = $('#qual-type').val(),
        $qualID      = $('#qual-type').find(":selected").attr('class'),
        $qualSubject = $('#subject-name').val()
        $qualGrade   = $('#subject-grade').val()
        $isPredicted = $('#qual-predicted').is(':checked'),
        $isPredValue = ($isPredicted ? " (Predicted)" : ""),
        $rowHTML     = '<tr class="tr-qualRow">' +
                          '<td class="td-qualcell">' + $qualSubject + '</td>' +
                          '<td class="td-qualcell">' + $qualGrade + $isPredValue + '</td>' +
                          '<td class="fake-link td-qualEdit">Edit</td>' +
                        '</tr>',
        $emptyTable  = '<div class="qualification-table"' + 'id="' + $qualID + '">' +
                        '<h3 class="heading-small heading-qualType">' + $qualType + '</h3>' +
                        '<table class="grid-3-4">' +
                          '<colgroup>' +
                            '<col class="t55">' +
                            '<col class="t35">' +
                            '<col class="t10">' +
                            '<col>' +
                          '</colgroup>' +
                          '<thead>' +
                            '<tr>' +
                              '<th class="th-qualSubject">Subject</th>' +
                              '<th class="th-qualGrade">Grade</th>' +
                              '<th></th>' +
                            '</tr>' +
                          '</thead>' +
                          '<tbody class="tbody-qual">' +
                            $rowHTML +
                          '</tbody>' +
                        '</table>' +
                      '</div>';

    if($('.tr-qualRow').length == 0) {
      $('.qualification-table').show().attr('id', $qualID);
      $('.heading-qualType').html($qualType);
      $('.tbody-qual').html($rowHTML);
    } else {
      $('#' + $qualID).find('.tbody-qual').append($rowHTML);
      diffQual();
    }

    function diffQual() {
      if($('#' + $qualID).length == 0) {
        $('.qualifications-wrapper').append($emptyTable);
      }
    }

    $('#subject-name').val('');
    $('#subject-grade').val('');
    $('#qual-predicted').prop('checked', false);

    e.preventDefault();

  });

  $('.qualifications-wrapper').on('click', '.td-qualEdit', function(e) {
    var $this  = $(this),
        $cells = $this.siblings().attr('class');

    $this.text('Save').addClass('qualSave');

    e.preventDefault();
  });

  $('.qualifications-wrapper').on('click', '.qualSave', function(e) {
    var $this = $(this);

    $this.text('Edit').removeClass('qualSave');

    e.preventDefault();
  });

// --------------- Remove for live code -------------- //
});