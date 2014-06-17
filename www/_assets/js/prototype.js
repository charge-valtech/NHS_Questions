$(function() {
// ------------ Trainee search mockup ------------ //

  $('.search-proto-input').on('keyup', function(){
    var $this   = $(this).val(),
        $input1 = $('.search-proto-input-1').val(),
        $input2 = $('.search-proto-input-2').val(),
        $index  = $.jStorage.index();

    if($this.toLowerCase().indexOf('cust') > -1){
      $('.trainee-searchbtn').attr('href', 'search-results-customer.html');
    } else if($this.toLowerCase().indexOf('admin') > -1){
      $('.trainee-searchbtn').attr('href', 'search-results-admin.html');
    }

    $.jStorage.set('input1Key', $input1);
    $.jStorage.set('input2Key', $input2);

  });

  $('.search-proto-result-input').on('keyup', function(){
    var $this   = $(this).val(),
        $input1 = $('.search-proto-result-input-1').val(),
        $input2 = $('.search-proto-result-input-2').val();

    if($this.toLowerCase().indexOf('cust') > -1){
      $('.update-results-btn').attr('href', 'search-results-customer.html');
    } else if($this.toLowerCase().indexOf('admin') > -1){
      $('.update-results-btn').attr('href', 'search-results-admin.html');
    }

    $.jStorage.set('input1Key', $input1);
    $.jStorage.set('input2Key', $input2);
  });

  function changeSearchInputs() {
    var resultInput1 = $.jStorage.get('input1Key'),
        resultInput2 = $.jStorage.get('input2Key')

    $('.search-proto-result-input-1').val(resultInput1);
    $('.search-proto-result-input-2').val(resultInput2);
  }

  changeSearchInputs();

//------------- Address input
  $('.address-find-btn').on('click', function(e) {
    $('.address-find-select').show();
    e.preventDefault();
  });

  $('#address-select').on('change', function() {
    var $this     = $(this),
        $thisVal  = $this.val(),
        $postCode = $('#post-code').val();

    if($this.val() != 'void') {

      $('#address1').val($thisVal);
      $('#address3').val('Windsor');
      $('#address4').val($postCode);

      $('.address-manual-input').show();
    }
  });

  $('.address-manual-btn').on('click', function(e) {
    $('.address-manual-input').show();
    e.preventDefault();
  });

// ------------ Apply for vacancy mockup ------------ //

  $('#saveQualification').on('click', function(e){
    var $qualType    = $('#qual-type').val(),
        $qualID      = $('#qual-type').find(":selected").attr('class'),
        $qualWhere   = $('#qual-where').val(),
        $qualSubject = $('#subject-name').val(),
        $qualGrade   = $('#subject-grade').val(),
        $qualYear    = $('#subject-year').val(),
        $isPredicted = $('#qual-predicted').is(':checked'),
        $isPredValue = ($isPredicted ? " (Predicted)" : ""),
        $otherQual   = $('#other-qual').val(),
        $isOther     = $('#otherQualOption').is(':selected'),
        $qualTorO    = ($isOther ? $otherQual : $qualType),
        $rowHTML     = '<tr class="tr-qualRow">' +
                          '<td class="td-qualcell">' +
                            '<input class="form-control qual-input-edit" type="text" value="' + $qualSubject + '">' +
                            '<span class="qualSpan">' + $qualSubject + '</span>' +
                          '</td>' +
                          '<td class="td-qualcell">' +
                            '<input class="form-control qual-input-edit" type="text" value="' + $qualGrade + '">' +
                            '<span class="qualSpan">' + $qualGrade + $isPredValue + '</span>' +
                          '</td>' +
                          '<td class="td-qualcell">' +
                            '<input class="form-control qual-input-edit" type="text" value="' + $qualYear + '">' +
                            '<span class="qualSpan">' + $qualYear + '</span>' +
                          '</td>' +
                          '<td class="fake-link td-qualEdit">Edit</td>' +
                          '<td><i class="ir icon-remove qualRemove">Remove</i></td>' +
                        '</tr>',
        $emptyTable  = '<div class="qualification-table"' + 'id="' + $qualID + '">' +
                        '<div class="hgroup-small">' +
                          '<h3 class="heading-small heading-qualType">' + $qualTorO + '</h3>' +
                          '<span class="subtitle subtitle-qualWhere">'+ $qualWhere +'</span>' +
                        '</div>' +
                        '<table class="grid-3-4">' +
                          '<colgroup>' +
                            '<col class="t40">' +
                            '<col class="t25">' +
                            '<col class="t20">' +
                            '<col class="t10">' +
                            '<col class="t5">' +
                            '<col>' +
                          '</colgroup>' +
                          '<thead>' +
                            '<tr>' +
                              '<th class="th-qualSubject">Subject</th>' +
                              '<th class="th-qualGrade">Grade</th>' +
                              '<th class="th-qualYear">Year</th>' +
                              '<th></th>' +
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
      $('.heading-qualType').html($qualTorO);
      $('.subtitle-qualWhere').html($qualWhere);
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

    function ifOther() {
      if($('#qual-type').val() == "Other") {
        $qualType = $('#other-qual').val();
      }
    }

    $('#subject-name').val('');
    $('#subject-grade').val('');
    // $('#subject-year').val('');
    $('#qual-predicted').prop('checked', false);

    e.preventDefault();

  });

  $('#qual-type').change(function() {
    if($(this).val() == "Other") {
      $('.other-qual-input').show();
    } else {
      $('.other-qual-input').hide();
    }
  });

  $('.qualifications-wrapper').on('click', '.qualRemove', function() {
    var $this = $(this);

    $this.closest('.tr-qualRow').remove();

  });

  $('.qualifications-wrapper').on('click', '.td-qualEdit', function(e) {
    var $this      = $(this),
        $qualSpans = $this.siblings().find('span'),
        $editBoxes = $this.siblings().find('.qual-input-edit');

    $this.text('Save').addClass('qualSave');

    $qualSpans.hide();
    $editBoxes.show();

    e.preventDefault();
  });

  $('.qualifications-wrapper').on('click', '.qualSave', function(e) {
    var $this       = $(this),
        $qualSpans  = $this.siblings().find('span'),
        $editBoxes  = $this.siblings().find('.qual-input-edit');

    $this.text('Edit').removeClass('qualSave');

    $qualSpans.show();
    $editBoxes.hide();

    e.preventDefault();
  });

  $('.qualifications-wrapper').on('keyup', '.qual-input-edit', function() {
    var $thisVal = $(this).val();

    $(this).next('.qualSpan').text($thisVal);
  });

// ------------ Work experience entry ------------ //

  $('#addWorkBtn').on('click', function(e) {
    var $workEmployer = $('#work-employer').val(),
        $workTitle    = $('#work-title').val(),
        $workRole     = $('#work-role').val(),
        $workFrom     = $('#work-from').val(),
        $workTo       = $('#work-to').val(),
        $isCurrent    = $('#work-current').is(':checked'),
        $isCurrValue  = ($isCurrent ? "Current" : ""),
        $historyHTML  = '<div class="work-history text">' +
                          '<div class="hgroup-small">' +
                            '<h3 class="work-editsection heading-small heading-with-border"><i class="ir icon-edit">Edit</i>' + 
                              '<span class="editable-work">' + $workEmployer + '</span>' +
                              ' - ' + 
                              '<span class="editable-work">' + $workTitle + '</span>' +
                            '</h3>' +
                            '<h4 class="subtitle work-editsection"><span class="editable-work"><i class="ir icon-edit">Edit</i>'+ 
                              '<span class="editable-work">' + $workFrom + '</span>' +
                              ' - ' + 
                              '<span class="editable-work">' + $workTo + $isCurrValue + '</span>' +
                            '</h4>' +
                          '</div>' +
                          '<p class="copy-16 work-editsection"><i class="ir icon-edit">Edit</i>'+ 
                            '<span class="editable-work">' + $workRole + '</span>' +
                          '</p>' +
                          '<p class="copy-16"><a href="#" class="work-edit">Edit</a> or <a href="#" class="work-delete">Delete</a></p>' +
                        '</div>';

    $('.work-history-wrapper').append($historyHTML);

    $('#work-employer').val('');
    $('#work-title').val('');
    $('#work-role').val('');
    $('#work-from').val('');
    $('#work-to').val('');
    $('#work-current').prop('checked', false);
    $('#work-to').parent().removeClass('disabled');
    $('#work-to').prop('disabled', false);

    e.preventDefault();

  });

  $('#work-current').click(function() {
    $('#work-to').prop('disabled', $(this).prop('checked'));
    $('#work-to').parent().toggleClass('disabled', $(this).prop('checked'));
  });

  $('.work-history-wrapper').on('click', '.work-delete', function(e) {
    $(this).closest('.work-history').remove();
    e.preventDefault();
  });

  $('.work-history-wrapper').on('click', '.work-edit', function(e) {
    $(this).closest('.work-history').addClass('edit-mode');
    $(this).text('Save').addClass('work-save');

    e.preventDefault();
  });

  $('.work-history-wrapper').on('click', '.icon-edit', function() {
    $(this).closest('.work-editsection').addClass('editing-worksection');

    $(this).removeClass('icon-edit').addClass('icon-tick').text('Done');

  });

  $('.work-history-wrapper').on('click', '.icon-tick', function() {
    $(this).closest('.work-editsection').removeClass('editing-worksection');
    
    $(this).removeClass('icon-tick').addClass('icon-edit').text('Edit');

  });

  $('.work-history-wrapper').on('click', '.work-save', function(e) {
    $(this).closest('.work-history').removeClass('edit-mode');
    $(this).text('Edit').removeClass('work-save');

    e.preventDefault();
  });

  //-- Errors on pattern library page

  $('#errorButton').on('click', function() {
    $('.validation-summary-errors').toggle();
    $('.has-an-error').toggleClass('input-validation-error')
  });

// --------------- Remove for live code -------------- //
});