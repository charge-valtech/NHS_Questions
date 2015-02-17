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
    $lastName   = $('#last-name').val(),
    $fullName   = $firstName + ' ' + $lastName,
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

  $('#enquiryButton').on('click', function(){
    var $emailInput = $('#email-input').val();

    $.jStorage.set('emailInput', $emailInput);

  });

  $('#enquiryEmail').text($.jStorage.get('emailInput'));

  // if($('#fullNamePre').length > 0) {
  //   var fullNamePre   = $.jStorage.get('fullName'),
  //       dobFullPre    = $.jStorage.get('dobFull'),
  //       address1Pre   = $.jStorage.get('address1'),
  //       address2Pre   = $.jStorage.get('address2'),
  //       address3Pre   = $.jStorage.get('address3'),
  //       address3bPre  = $.jStorage.get('address3b'),
  //       address4Pre   = $.jStorage.get('address4'),
  //       emailInputPre = $.jStorage.get('emailInput'),
  //       phoneInputPre = $.jStorage.get('phoneInput');

  //   $('#fullNamePre').text(fullNamePre);
  //   $('#dobFullPre').text(dobFullPre);
  //   $('#address1Pre').text(address1Pre);
  //   $('#address2Pre').text(address2Pre);
  //   $('#address3Pre').text(address3Pre);
  //   $('#address3bPre').text(address3bPre);
  //   $('#address4Pre').text(address4Pre);
  //   $('#emailInputPre').text(emailInputPre);
  //   $('#phoneInputPre').text(phoneInputPre);

  // }

  if($('#accountCreated').length > 0) {
    var emailInputPre = $.jStorage.get('emailInput');

    $('.email-address').text(emailInputPre);
  }

  $('#applyPreviewBtn').on('click', function() {
    var $schoolName    = $('#school-name').val(),
        $schoolFrom    = $('#school-from').val(),
        $schoolTo      = $('#school-to').val(),
        $question1     = $('#question1').val(),
        $question2     = $('#question2').val(),
        $question3     = $('#question3').val(),
        $question4     = $('#question4').val(),
        $addQuestion1  = $('#add-question1').val(),
        $addQuestion2  = $('#add-question2').val();

    $.jStorage.set('schoolName', $schoolName);
    $.jStorage.set('schoolFrom', $schoolFrom);
    $.jStorage.set('schoolTo', $schoolTo);
    $.jStorage.set('question1', $question1);
    $.jStorage.set('question2', $question2);
    $.jStorage.set('question3', $question3);
    $.jStorage.set('question4', $question4);
    $.jStorage.set('add-question1', $addQuestion1);
    $.jStorage.set('add-question2', $addQuestion2);
  });

  if($('#schoolNamePre').length > 0) {
    var schoolNamePre    = $.jStorage.get('schoolName'),
        schoolFromPre    = $.jStorage.get('schoolFrom'),
        schoolToPre      = $.jStorage.get('schoolTo'),
        question1Pre     = $.jStorage.get('question1'),
        question2Pre     = $.jStorage.get('question2'),
        question3Pre     = $.jStorage.get('question3'),
        question4Pre     = $.jStorage.get('question4'),
        addQuestion1Pre  = $.jStorage.get('add-question1'),
        addQuestion2Pre  = $.jStorage.get('add-question2');

    $('#schoolNamePre').text(schoolNamePre);
    $('#schoolFromPre').text(schoolFromPre);
    $('#schoolToPre').text(schoolToPre);
    $('#question1Pre').text(question1Pre);
    $('#question2Pre').text(question2Pre);
    $('#question3Pre').text(question3Pre);
    $('#question4Pre').text(question4Pre);
    $('#add-question1Pre').text(addQuestion1Pre);
    $('#add-question2Pre').text(addQuestion2Pre);

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
                          '<td class="qualRemove ta-center"><i class="cell-span"><i class="copy-16 fa fa-times-circle icon-black"></i><i class="visuallyhidden">Remove</i></i></td>' +
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
        $isChecked       = ($isCurrent ? 'checked' : ''),
        $isDisabled      = ($isCurrent ? 'disabled' : ''),
        $isCurrValue     = ($isCurrent ? '<span class="cell-span editable-work work-to-span work-month work-to-month"></span>' +
                                          '<span class="cell-span editable-work work-to-span work-year"></span>' :
                                          '<span class="cell-span editable-work work-to-span work-month work-to-month">' + $workTo + '</span>' +
                                          '<span class="cell-span editable-work work-to-span work-year">' + $workTYear + '</span>'),
        $historyItemHTML = '<div class="grid-wrapper work-history-item">' +
                              '<div class="work-controls">' +
                                '<div class="work-edit ta-center"><span class="cell-span fake-link">Edit</span></div>' +
                                '<div class="work-delete ta-center"><span class="cell-span"><i class="copy-16 fa fa-times-circle icon-black"></i><i class="visuallyhidden">Remove</i></span></div>' +
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
                                            '<select class="work-month-select" id="workFromSelect">' +
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
                                            '<input type="text" class="form-control toggle-content work-year-input" value="' +
                                            $workFYear + '">' +
                                          '</div>' +
                                        '</div>' +
                                        '<span class="cell-span editable-work work-month work-from-month">' + $workFrom + '</span>' +
                                        '<span class="cell-span editable-work work-year">' + $workFYear + '</span>' +
                                      '</td>' +
                                      '<td>' +
                                        '<div class="toggle-content">' +
                                          '<div class="form-group form-group-compound ' + $isDisabled + '">' +
                                            '<select class="editable-current work-month-select" id="workToSelect"' + $isDisabled + '>' +
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
                                          '<div class="form-group form-group-compound ' + $isDisabled + '">' +
                                            '<input type="text" class="editable-current form-control toggle-content work-year-input" value="' +
                                            $workTYear + '"' + $isDisabled +'>' +
                                          '</div>' +
                                          '<div class="form-group form-group-compound">' +
                                            '<label><input ' + $isChecked + ' type="checkbox" id="edit-current"> Current</label>' +
                                          '</div>' +
                                        '</div>' +
                                         $isCurrValue +
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
    var $workFromMonth = $(this).closest('.work-history-item').find('.work-from-month').text(),
        $workToMonth   = $(this).closest('.work-history-item').find('.work-to-month').text();


    $(this).closest('.work-history-item').find('#workFromSelect').val($workFromMonth);
    $(this).closest('.work-history-item').find('#workToSelect').val($workToMonth);

  });

  $('#work-current').click(function() {
    $('#work-to').prop('disabled', $(this).prop('checked'));
    $('#work-to-year').prop('disabled', $(this).prop('checked'));
    $('#work-to').parent().toggleClass('disabled', $(this).prop('checked'));
    $('#work-to-year').parent().toggleClass('disabled', $(this).prop('checked'));

    $('#work-to-year').val('');
  });

  $('.work-history-wrapper').on('click', '#edit-current', function() {
    $(this).closest('td').find('.editable-current').prop('disabled', $(this).prop('checked'));
    $(this).closest('td').find('.editable-current').parent().toggleClass('disabled', $(this).prop('checked'));

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
    var $currentCheck     = $(this).closest('.work-history-item').find('#edit-current'),
        $isChecked        = $currentCheck.is(':checked'),
        $workToSpans      = $(this).closest('.work-history-item').find('.work-to-span'),
        $editableCurrents = $(this).closest('.work-history-item').find('.editable-currents');

    $(this).closest('.work-history-item').removeClass('edit-mode');
    $(this).html('<span class="cell-span fake-link">Edit</span>').removeClass('work-save');

    $(this).closest('.work-history').find('.editing-worksection').removeClass('editing-worksection');
    $(this).closest('.work-history').find('.icon-tick').removeClass('icon-tick').addClass('icon-edit');

    if($isChecked) {
      $workToSpans.text('');
      $editableCurrents.val('');
    }

    e.preventDefault();
  });

  $('.work-history-wrapper').on('keyup', '.editable-work-input', function() {
    var $thisVal = $(this).val();

    $(this).next('.editable-work').text($thisVal);
  });

  $('.work-history-wrapper').on('keyup', '.work-year-input', function() {
    var $thisVal = $(this).val();

    $(this).closest('td').find('.work-year').text($thisVal);
  });

  $('.work-history-wrapper').on('change', '.work-month-select', function() {
    var $thisVal = $(this).val();

    $(this).closest('td').find('.work-month').text($thisVal);
  });

  //-- Errors on pattern library page

  $('#errorButton').on('click', function() {
    $('.validation-summary-errors').toggle();
    $('.has-an-error').toggleClass('input-validation-error')
  });

  //-- Application save
  // $('#saveApplication').on('click', function() {
  //   $(this).hide();
  //   $('#applicationSaved').show();
  //   return false;
  // });

  //-- Banner sign in

  $('#btnSignIn').on('click', function() {
    $.cookie('signedIn', true, {path: '/'});
  });

  $('#btnSignOut, #btnDeleteAccount').on('click', function() {
    $.removeCookie('signedIn', { path: '/' });
  });

  if($.cookie('signedIn')) {
    $('#bannerSignedOut').hide();
    $('#bannerSignedIn').show();
    $('.details-apply').show();
    $('.details-signIn').hide();
  } else {
    $('#bannerSignedOut').show();
    $('#bannerSignedIn').hide();
    $('.details-apply').hide();
    $('.details-signIn').show();
  }

  $("#Password").keyup(function () {
        initializeStrengthMeter();
    });

    function initializeStrengthMeter() {
        $("#pass_meter").pwStrengthManager({
            password: $("#Password").val(),
            minChars: 8
        });
    }

    $('.pw-masktoggle').on("click", function () {
        changePassType();
        toggleShowHide();

        return false;
    });

    function changePassType() {
        var password = document.getElementById('Password');
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

    if($('.global-header__title').text() == 'Traineeships') {
      // $('#applicationsLink').remove();
      $('#settingsLink').attr('href', '/trainee/settings.html');
      $('title').text('Traineeships');
      $('.global-header__title a').attr('href', '/trainee/search-index.html');
    }

    $('#viewTrainingProvider').on('click', function() {
      $('#trainingProviderPanel').show();
      $('#employerPanel').hide();

      return false;
    });

    $('#viewEmployer').on('click', function() {
      $('#employerPanel').show();
      $('#trainingProviderPanel').hide();

      return false;
    });

  // $('#forgotPasswordBtn').on('click', function(){
  //   var $this = $(this),
  //       $thisVal = $this.val();

  //   $.jStorage.set('forgottenEmail', $thisVal);
  // });

  // if($('#forgottenEmail').length) {
  //   var $forgottenEmail = $.jStorage.get('forgottenEmail');

  //   $('#forgottenEmail').val($forgottenEmail);
  // }

  $('.saveADraft').on('click', function() {
    $('#savedInfo').show();
  });

  $('#removeDraft').on('click', function() {
    $(this).closest('section').remove();
    // $('#deleteSuccess').show();
  });

  function gup( name )
    {
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( window.location.href );
      if( results == null )
        return null;
      else
        return results[1];
    }

  if($('.heading-xlarge').text() == 'My applications') {
    var tshipPar = gup('Traineeships'),
        appSupport = gup('Apprenticeships');

    if(tshipPar == "true") {
      $('#tshipPrompt').show();
      $('#tshipLink').show();
    } else if(tshipPar == "seen") {
      $('#tshipLink').show();
    } else if(tshipPar == "submitted") {
      $('#dashTraineeships').show();
      $('#tshipLink').show();
      $('#tshipJump').removeClass('toggle-content');
    } else if(appSupport == "true") {
      $('#supportPrompt').show();
    }
  }

  $('.notInterested').on('click', function() {
    $(this).closest('.panel-info').hide();
  });

  //----- Verify trigger

  $('#verifyNumBtn, #verifyLink').on('click', function() {
    var $telephoneNumber    = $('#phoneNumber').val();

    $.jStorage.set('mobile-number', $telephoneNumber);

    if($('#textMessage').is(':checked') && !$.cookie('numberIsVerified')) {

      window.location = 'verify-number.html';

    }
  });

  if($('#enterNumber').length > 0) {
    var mobileNumber    = $.jStorage.get('mobile-number');
    $('#enterNumber').text(mobileNumber);
  }

  $('#numberVerified').on('click', function() {
    $.cookie('numberIsVerified', true, {path: '/'});
  });

  if($.cookie('numberIsVerified')) {
    $('#textMessage').prop('checked', true).closest('label').addClass('selected');
    $('#verifyContainer').html('<span><i class="fa fa-check-circle-o"></i>Verified</>');
    $('#successVerified').show();
  }

  //------ Refine keywords input

  $('#Keywords').on('keydown', function() {
    $('#refineSelect').show();

    // if($(this).val().length == 0) {
    //   $('#refineSelect').hide();
    // }
  });

  $('#refineSearch').on('click', function() {
    $('#keywordHint').toggle();
    $('#refineControls').toggle();

    $(this).toggleClass('open');
  });

  //------- Inline details toggle

  $('.summary-style').on('click', function() {
    $this = $(this);

    $this.toggleClass('open');

    $this.next('.detail-content').toggle();
  })

  //------- Select to inject content to text input

  $('.select-inject').on('change', function() {
    var $this = $(this),
        $selectedOption = $this.find('option:selected'),
        $thisOptionText = $selectedOption.text();

    $this.next('.select-injected').val($thisOptionText);

    if($selectedOption.val() == "noSelect") {
      $this.next('.select-injected').val("");
    }
  });

  //-------- Maps on results

  if($('.search-results__item').length > 0) {
    var theMaps = [],
        directionsDisplay = [],
        directionsService = [],
        vacancyLength = $('.vacancy-link').length,
        originLat = $('#Latitude').val(),
        originLon = $('#Longitude').val(),
        originLocation = new google.maps.LatLng(originLat,originLon);

    for (var i = 0; i < vacancyLength; i++){
      directionsDisplay[i] = new google.maps.DirectionsRenderer({suppressMarkers: true});
      directionsService[i] = new google.maps.DirectionsService();
    };

    $('.vacancy-link').each(function () {

      var vacancyMap = $(this).closest('.search-results__item').find('.map')[0],
          vacancyLat = $(this).attr('data-vac-lat'),
          vacancyLon = $(this).attr('data-vac-long'),
          latlng = new google.maps.LatLng(vacancyLat,vacancyLon);

      var myOptions = {
          zoom: 10,
          center: latlng,
          mapTypeControl: false,
          overviewMapControl: false,
          panControl: false,
          scaleControl: false,
          scrollwheel: false,
          streetViewControl: false,
          zoomControl: true,
          zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL
          }
      };
      var map = new google.maps.Map(vacancyMap, myOptions);

      theMaps.push(map);

      var markerIcon = new google.maps.MarkerImage(
                    '../_assets/img/icon-location.png',
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(20, 32));

      var marker = new google.maps.Marker({
          icon: markerIcon,
          position: latlng,
          map: map
      });

    });

    function calcRoute(transportMode, latLong, journeyTime, mapNumber) {

      directionsDisplay[mapNumber].setMap(theMaps[mapNumber]);

      var request = {
          origin: originLocation,
          destination: latLong,
          travelMode: google.maps.TravelMode[transportMode]
      };
      directionsService[mapNumber].route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {

          $(journeyTime).text(response.routes[0].legs[0].duration.text);

          directionsDisplay[mapNumber].setDirections(response);
        }
      });
    }

    $('.select-mode').on('change', function() {
      var $this = $(this),
          $thisVal = $this.val(),
          $thisVacLink = $this.closest('.search-results__item').find('.vacancy-link'),
          $thisLat = $thisVacLink.attr('data-vac-lat'),
          $thisLong = $thisVacLink.attr('data-vac-long'),
          $thisLatLong = new google.maps.LatLng($thisLat, $thisLong),
          $durationElement = $this.next('.journey-time'),
          $mapNumber = $this.closest('.search-results__item').index();

      calcRoute($thisVal, $thisLatLong, $durationElement, $mapNumber);
    });

    $('.search-results__item .summary-style').on('click', function(originLocation) {
      var $this = $(this),
          $thisVal = $this.next('.detail-content').find('.select-mode option:selected').val(),
          $thisVacLink = $this.closest('.search-results__item').find('.vacancy-link'),
          $thisMap = $this.closest('.search-results__item').find('.map'),
          $thisLat = $thisVacLink.attr('data-vac-lat'),
          $thisLong = $thisVacLink.attr('data-vac-long'),
          $thisLatLong = new google.maps.LatLng($thisLat, $thisLong),
          $durationElement = $this.next('.detail-content').find('.journey-time'),
          $mapNumber = $this.closest('.search-results__item').index();

      calcRoute($thisVal, $thisLatLong, $durationElement, $mapNumber);

    });
  }

  if($('#getLocation').length > 0) {
    var geocoder;

    function initialize() {
      geocoder = new google.maps.Geocoder();
    }

    function geoFindMe() {
      var output  = document.getElementById("Location"),
          latVal,
          longVal;


      if (!navigator.geolocation){
        output.value = "Geolocation is not supported by your browser";
        return;
      }

      function success(position) {
        var latVal  = position.coords.latitude,
            longVal = position.coords.longitude,
            latlng = new google.maps.LatLng(latVal, longVal);


        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              var myPostcode;

              for (var i = 0; i < results[1].address_components.length; i++) {
                  for (var j = 0; j < results[1].address_components[i].types.length; j++) {
                      if (results[1].address_components[i].types[j] == "postal_code") {
                          myPostcode = results[1].address_components[i].long_name;
                          break;
                      }
                  }
              }

              output.value = myPostcode;

              $.jStorage.set('currentLat', latVal);
              $.jStorage.set('currentLong', longVal);
              $.jStorage.set('currentPostCode', myPostcode);

            } else {
              alert('No results found');
            }
          } else {
            alert('Geocoder failed due to: ' + status);
          }
        });



        $.cookie('gotLocation', true, {path: '/'});
      };

      function error() {
        output.value = "Unable to retrieve your location";
      };

      output.value = "Locating…";

      navigator.geolocation.getCurrentPosition(success, error);
    }

    $('#getLocation').on('click', function() {

      geoFindMe();

    });

    google.maps.event.addDomListener(window, 'load', initialize);
  }

  if($('.search-results__item').length > 0 && $.cookie('gotLocation')) {
    var locationLat = $.jStorage.get('currentLat'),
        locationLong = $.jStorage.get('currentLong'),
        locPostCode = $.jStorage.get('currentPostCode');

    $('#Latitude').val(locationLat);
    $('#Longitude').val(locationLong);
    $('#Location').val(locPostCode);

  }

// --------------- Remove for live code -------------- //
});