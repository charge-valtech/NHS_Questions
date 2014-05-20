$(function() {
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
});;/*
 *  jQuery Password Strength - v0.0.1
 *
 *  Made by Henry Charge
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "pwStrengthManager",
				defaults = {
  				password: "",
          blackList : [],
          minChars : "",
          maxChars : "",
          advancedStrength : false
		    };

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
        this.info = "";
        this.className = "";
		}

		Plugin.prototype = {
				init: function() {
          var errors = this.customValidators();

          if ("" == this.settings.password) {
            this.info = "Password cannot be empty";
            this.className = "strength-weak";
          } else if (errors == 0) {
            var strength = zxcvbn(this.settings.password, this.settings.blackList);

            switch (strength.score) {
              case 0:
                this.info = "Very weak";
                this.className = "strength-weak";
                break;
              case 1:
                this.info = "Weak";
                this.className = "strength-weak";
                break;
              case 2:
                this.info = "Medium";
                this.className = "strength-medium";
                break;
              case 3:
                this.info = "Strong";
                this.className = "strength-strong";
                break;
              case 4:
                this.info = "Strongest";
                this.className = "strength-strong";
                break;
            }
          }

          $(this.element).html(this.info).removeClass().addClass(this.className);
        },
				minChars: function() {
          if (this.settings.password.length < this.settings.minChars) {
            this.info = "Must be at least " + this.settings.minChars + " characters";
            return false;
          } else {
            return true;
          }
        },
        customValidators: function() {
          var err = 0;

          if (this.settings.minChars != "") {
            if (!this.minChars()) {
              err++;
            }
          }

          return err;
        }
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[pluginName] = function (options) {
      this.each(function() {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      });
      return this;
    };

})( jQuery, window, document );
