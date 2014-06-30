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

  //------------- Copy details from registration

  $('#createAccountBtn').on('click', function(){
    $firstName  = $('#first-name').val(),
    $middleName = $('#middle-name').val(),
    $lastName   = $('#last-name').val(),
    $fullName   = $firstName + ' ' + $middleName + ' ' + $lastName,
    $dobDay     = $('#dob-day').val(),
    $dobMonth   = $('#dob-month').val(),
    $dobYear    = $('#dob-year').val(),
    $dobFull    = $dobDay + '/' + $dobMonth + '/' + $dobYear,
    $address1   = $('#address1').val(),
    $address2   = $('#address2').val(),
    $address3   = $('#address3').val(),
    $address3b  = $('#address3b').val(),
    $address4   = $('#address4').val(),
    $emailInput = $('#email-input').val(),
    $phoneInput = $('#phone-input').val();

    $.jStorage.set('fullName', $fullName);
    $.jStorage.set('dobFull', $dobFull);
    $.jStorage.set('address1', $address1);
    $.jStorage.set('address2', $address2);
    $.jStorage.set('address3', $address3);
    $.jStorage.set('address3b', $address3b);
    $.jStorage.set('address4', $address4);
    $.jStorage.set('emailInput', $emailInput);
    $.jStorage.set('phoneInput', $phoneInput);

  });

  if($('#fullNamePre').length > 0) {
    var fullNamePre   = $.jStorage.get('fullName'),
        dobFullPre    = $.jStorage.get('dobFull'),
        address1Pre   = $.jStorage.get('address1'),
        address2Pre   = $.jStorage.get('address2'),
        address3Pre   = $.jStorage.get('address3'),
        address3bPre  = $.jStorage.get('address3b'),
        address4Pre   = $.jStorage.get('address4'),
        emailInputPre = $.jStorage.get('emailInput'),
        phoneInputPre = $.jStorage.get('phoneInput');

    $('#fullNamePre').text(fullNamePre);
    $('#dobFullPre').text(dobFullPre);
    $('#address1Pre').text(address1Pre);
    $('#address2Pre').text(address2Pre);
    $('#address3Pre').text(address3Pre);
    $('#address3bPre').text(address3bPre);
    $('#address4Pre').text(address4Pre);
    $('#emailInputPre').text(emailInputPre);
  }

  $('#applyPreviewBtn').on('click', function() {
    var $schoolName = $('#school-name').val(),
        $schoolFrom = $('#school-from').val(),
        $schoolTo   = $('#school-to').val(),
        $question1  = $('#question1').val(),
        $question2  = $('#question2').val(),
        $question3  = $('#question3').val(),
        $question4  = $('#question4').val();

    $.jStorage.set('schoolName', $schoolName);
    $.jStorage.set('schoolFrom', $schoolFrom);
    $.jStorage.set('schoolTo', $schoolTo);
    $.jStorage.set('question1', $question1);
    $.jStorage.set('question2', $question2);
    $.jStorage.set('question3', $question3);
    $.jStorage.set('question4', $question4);
  });

  if($('#schoolNamePre').length > 0) {
    var schoolNamePre = $.jStorage.get('schoolName'),
        schoolFromPre = $.jStorage.get('schoolFrom'),
        schoolToPre   = $.jStorage.get('schoolTo'),
        question1Pre  = $.jStorage.get('question1'),
        question2Pre  = $.jStorage.get('question2'),
        question3Pre  = $.jStorage.get('question3'),
        question4Pre  = $.jStorage.get('question4');

    $('#schoolNamePre').text(schoolNamePre);
    $('#schoolFromPre').text(schoolFromPre);
    $('#schoolToPre').text(schoolToPre);
    $('#question1Pre').text(question1Pre);
    $('#question2Pre').text(question2Pre);
    $('#question3Pre').text(question3Pre);
    $('#question4Pre').text(question4Pre);

  }

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
                            '<input class="form-control qual-input-edit" type="text" value="' + $qualSubject + '" readonly>' +
                          '</td>' +
                          '<td class="td-qualcell">' +
                            '<input class="form-control qual-input-edit" type="text" value="' + $qualGrade + $isPredValue + '" readonly>' +
                          '</td>' +
                          '<td class="td-qualcell">' +
                            '<input class="form-control qual-input-edit" type="text" value="' + $qualYear + '" readonly>' +
                          '</td>' +
                          '<td class="td-qualEdit ta-center"><span class="fake-link cell-span">Edit</span></td>' +
                          '<td class="qualRemove ta-center"><i class="cell-span"><i class="ir icon-remove">Remove</i></i></td>' +
                        '</tr>',
        $emptyTable  = '<div class="qualification-table"' + 'id="' + $qualID + '">' +
                        '<div class="hgroup-small">' +
                          '<h3 class="heading-small heading-qualType">' + $qualTorO + '</h3>' +
                        '</div>' +
                        '<table class="grid-3-4">' +
                          '<colgroup>' +
                            '<col class="t40">' +
                            '<col class="t25">' +
                            '<col class="t15">' +
                            '<col class="t10">' +
                            '<col class="t10">' +
                            '<col>' +
                          '</colgroup>' +
                          '<thead>' +
                            '<tr>' +
                              '<th class="th-qualSubject"><span class="heading-span">Subject</span></th>' +
                              '<th class="th-qualGrade"><span class="heading-span">Grade</span></th>' +
                              '<th class="th-qualYear"><span class="heading-span">Year</span></th>' +
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
        $editBoxes = $this.siblings().find('.qual-input-edit');

    $this.html('<span class="fake-link cell-span">Save</span>').addClass('qualSave');

    $editBoxes.removeAttr('readonly');

    e.preventDefault();
  });

  $('.qualifications-wrapper').on('click', '.qualSave', function(e) {
    var $this       = $(this),
        $editBoxes  = $this.siblings().find('.qual-input-edit');

    $this.html('<span class="fake-link cell-span">Edit</span>').removeClass('qualSave');

    $editBoxes.prop('readonly', 'readonly');

    e.preventDefault();
  });

// ------------ Work experience entry ------------ //

  $('#addWorkBtn').on('click', function(e) {
    var $workEmployer    = $('#work-employer').val(),
        $workTitle       = $('#work-title').val(),
        $workRole        = $('#work-role').val(),
        $workFrom        = $('#work-from').val(),
        $workFYear       = $('#work-from-year').val(),
        $workTo          = $('#work-to').val(),
        $workTYear       = $('#work-to-year').val(),
        $isCurrent       = $('#work-current').is(':checked'),
        $isCurrValue     = ($isCurrent ? "" : $workTo + ' ' + $workTYear),
        $historyItemHTML = '<div class="grid-wrapper work-history-item">' +
                              '<div class="work-controls">' +
                                '<div class="work-edit ta-center"><span class="cell-span fake-link">Edit</span></div>' +
                                '<div class="work-delete ta-center"><span class="cell-span"><i class="ir icon-remove">Remove</i></span></div>' +
                              '</div>' +
                              '<div class="grid grid-1-2">' +
                                '<table class="table-no-btm-border table-compound">' +
                                  '<colgroup>' +
                                    '<col class="t100">' +
                                    '<col>' +
                                  '</colgroup>' +
                                  '<thead>' +
                                    '<tr>' +
                                      '<th><span class="heading-span">Work experience</span></th>' +
                                    '</tr>' +
                                  '</thead>' +
                                  '<tbody>' +
                                    '<tr>' +
                                      '<td>' +
                                        '<input type="text" class="form-control toggle-content inline width-all-49 editable-work-input" value="' +
                                        $workEmployer +'">' +
                                        '<span class="cell-span editable-work">' +
                                        $workEmployer + '</span>' +
                                        '<span class="cell-span work-hyphen">-</span>' +
                                        '<input type="text" class="form-control toggle-content inline width-all-49 editable-work-input no-right-margin" value="' +
                                        $workTitle + '">' +
                                        '<span class="cell-span editable-work">' +
                                        $workTitle + '</span>' +
                                        '<div></div>' +
                                        '<textarea rows="3" class="form-control toggle-content editable-work-input">'+
                                        $workRole +'</textarea>' +
                                        '<span class="cell-span editable-work">' +
                                        $workRole +'</span>' +
                                      '</td>' +
                                    '</tr>' +
                                  '</tbody>' +
                                '</table>' +
                              '</div>' +
                              '<div class="grid grid-1-2">' +
                                '<table class="table-no-btm-border table-compound">' +
                                  '<colgroup>' +
                                    '<col class="t30">' +
                                    '<col class="t30">' +
                                    '<col class="t25">' +
                                    '<col class="t15">' +
                                    '<col>' +
                                  '</colgroup>' +
                                  '<thead>' +
                                    '<tr>' +
                                      '<th><span class="heading-span">From</span></th>' +
                                      '<th><span class="heading-span">To</span></th>' +
                                      '<th></th>' +
                                      '<th></th>' +
                                    '</tr>' +
                                  '</thead>' +
                                  '<tbody>' +
                                    '<tr>' +
                                      '<td>' +
                                        '<div class="toggle-content">' +
                                          '<div class="form-group form-group-compound">' +
                                            '<select id="workFromSelect">' +
                                              '<option value="Jan">Jan</option>' +
                                              '<option value="Feb">Feb</option>' +
                                              '<option value="Mar">Mar</option>' +
                                              '<option value="Apr">Apr</option>' +
                                              '<option value="May">May</option>' +
                                              '<option value="June">June</option>' +
                                              '<option value="July">July</option>' +
                                              '<option value="Aug">Aug</option>' +
                                              '<option value="Sept">Sept</option>' +
                                              '<option value="Oct">Oct</option>' +
                                              '<option value="Nov">Nov</option>' +
                                              '<option value="Dec">Dec</option>' +
                                            '</select>' +
                                          '</div>' +
                                          '<div class="form-group form-group-compound">' +
                                            '<input type="text" class="form-control toggle-content editable-work-input" value="' +
                                            $workFYear + '">' +
                                          '</div>' +
                                        '</div>' +
                                        '<span class="cell-span editable-work work-from-value">' + $workFrom + '</span>' +
                                        '<span class="cell-span editable-work">' + $workFYear + '</span>' +
                                      '</td>' +
                                      '<td>' +
                                        '<div class="toggle-content">' +
                                          '<div class="form-group form-group-compound">' +
                                            '<select id="workToSelect">' +
                                              '<option value="Jan">Jan</option>' +
                                              '<option value="Feb">Feb</option>' +
                                              '<option value="Mar">Mar</option>' +
                                              '<option value="Apr">Apr</option>' +
                                              '<option value="May">May</option>' +
                                              '<option value="June">June</option>' +
                                              '<option value="July">July</option>' +
                                              '<option value="Aug">Aug</option>' +
                                              '<option value="Sept">Sept</option>' +
                                              '<option value="Oct">Oct</option>' +
                                              '<option value="Nov">Nov</option>' +
                                              '<option value="Dec">Dec</option>' +
                                            '</select>' +
                                          '</div>' +
                                          '<div class="form-group form-group-compound">' +
                                            '<input type="text" class="form-control toggle-content editable-work-input" value="' +
                                            $workTYear + '">' +
                                          '</div>' +
                                          '<div class="form-group form-group-compound">' +
                                            '<label><input type="checkbox"> Current</label>' +
                                          '</div>' +
                                        '</div>' +
                                        '<span class="cell-span editable-work work-to-value">' + $workTo + '</span>' +
                                        '<span class="cell-span editable-work">' + $workTYear + '</span>' +
                                      '</td>' +
                                      '<td></td>' +
                                      '<td></td>' +
                                    '</tr>' +
                                  '</tbody>' +
                                '</table>' +
                              '</div>' +
                            '</div>';

    $('.work-history-wrapper').append($historyItemHTML);

    $('#work-employer').val('');
    $('#work-title').val('');
    $('#work-role').val('');
    $('#work-from').val('Jan');
    $('#work-from-year').val('');
    $('#work-to').val('Jan');
    $('#work-to-year').val('');
    $('#work-current').prop('checked', false);
    $('#work-to').parent().removeClass('disabled');
    $('#work-to-year').parent().removeClass('disabled');
    $('#work-to').prop('disabled', false);
    $('#work-to-year').prop('disabled', false);

    e.preventDefault();

  });

  $('.work-history-wrapper').on('click', '.work-edit', function() {
    $(this).closest('.work-history-item').find('#workFromSelect');
  });

  $('#work-current').click(function() {
    $('#work-to').prop('disabled', $(this).prop('checked'));
    $('#work-to-year').prop('disabled', $(this).prop('checked'));
    $('#work-to').parent().toggleClass('disabled', $(this).prop('checked'));
    $('#work-to-year').parent().toggleClass('disabled', $(this).prop('checked'));

    $('#work-to-year').val('');
  });

  $('.work-history-wrapper').on('click', '.work-delete', function(e) {
    $(this).closest('.work-history-item').remove();
    e.preventDefault();
  });

  $('.work-history-wrapper').on('click', '.work-edit', function(e) {
    $(this).closest('.work-history-item').addClass('edit-mode');
    $(this).html('<span class="cell-span fake-link">Save</span>').addClass('work-save');

    e.preventDefault();
  });

  $('.work-history-wrapper').on('click', '.work-save', function(e) {
    $(this).closest('.work-history-item').removeClass('edit-mode');
    $(this).html('<span class="cell-span fake-link">Edit</span>').removeClass('work-save');

    $(this).closest('.work-history').find('.editing-worksection').removeClass('editing-worksection');
    $(this).closest('.work-history').find('.icon-tick').removeClass('icon-tick').addClass('icon-edit');

    e.preventDefault();
  });

  $('.work-history-wrapper').on('keyup', '.editable-work-input', function() {
    var $thisVal = $(this).val();

    $(this).next('.editable-work').text($thisVal);
  });

  //-- Errors on pattern library page

  $('#errorButton').on('click', function() {
    $('.validation-summary-errors').toggle();
    $('.has-an-error').toggleClass('input-validation-error')
  });

// --------------- Remove for live code -------------- //
});