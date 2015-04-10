$(function() {

  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  if (isMobile.any()) {
    FastClick.attach(document.body);

    $('input[autofocus]').removeAttr('autofocus');
  }

  function isAndroid() {
    var nua = navigator.userAgent,
        isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
    if (isAndroid) {
      $('html').addClass('android-browser');
    }
  }

  isAndroid();


  function slidePageIn() {
    var viewportHeight = $(window).innerHeight();

    $('.nhs-animatehtml').css('overflow-y', 'hidden');

    $('.nhs-animate-inout').show();

    $('.nhs-animate-inout').animate({'margin-top': '0'}, 1000);

    setTimeout(function() {
      $('.nhs-animatehtml').css('overflow-y', 'scroll');
    }, 1000);
  }

  if($('html').is('.not-ie8')){slidePageIn();}

  $('.not-ie8 .nhs-nav-btn').on('click', function(e) {
    var $this = $(this),
        $thisHref;

    e.preventDefault();

    if($this.is('a')) {
      $thisHref = $(this).attr('href');

      setTimeout(function(){
        window.location = $thisHref;
      }, 1000);
    } else {
      setTimeout(function(){
        $this.closest('form').submit();
      }, 1000);
    }

    $('.nhs-body-container').animate({'margin-top': '1000px'}, 1000);

  });

  $('.nhs-radiobtn__input:checked').addClass('ie8-checked');


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
          if (zxcvbn) {
            var zxLoaded = true;
          }

          var errors = this.customValidators();

          if ("" == this.settings.password && zxLoaded) {
            this.info = "Cannot be empty";
            this.className = "strength-weak";
          } else if (errors == 0 && zxLoaded) {
            var strength = zxcvbn(this.settings.password, this.settings.blackList),
                upperCase = new RegExp('[A-Z]'),
                lowerCase = new RegExp('[a-z]'),
                numbers = new RegExp('[0-9]');

            if (strength.score >= 3 && this.settings.password.match(upperCase) && this.settings.password.match(lowerCase) && this.settings.password.match(numbers)) {
              this.info = "Very strong";
              this.className = "strength-strong";
            } else if (this.settings.password.match(upperCase) && this.settings.password.match(lowerCase) && this.settings.password.match(numbers)) {
              this.info = "Strong";
              this.className = "strength-strong";
            } else {
              this.info = "Too weak";
              this.className = "strength-weak";
            }

          }

          $(this.element).html(this.info).removeClass().addClass(this.className);
        },
				minChars: function() {
          if (this.settings.password.length < this.settings.minChars) {
            this.info = "At least " + this.settings.minChars + " characters";
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
;$(function() {
  //-------- Maps on results

  if($('.search-results__item').length > 0) {
    var miles = 5,
        radiusCircle,
        theMaps = [],
        directionsDisplay = [],
        directionsService = [],
        vacancyLength = $('.vacancy-link').length,
        originLat = ($.cookie('gotLocation') ? $.jStorage.get('currentLat') : Number($('#Latitude').val())),
        originLon = ($.cookie('gotLocation') ? $.jStorage.get('currentLong') : Number($('#Longitude').val())),
        originLocation = new google.maps.LatLng(originLat,originLon);

    for (var i = 0; i < vacancyLength; i++){
      directionsDisplay[i] = new google.maps.DirectionsRenderer({suppressMarkers: true});
      directionsService[i] = new google.maps.DirectionsService();
    };

    //--- Radius map

    var radiusMapOptions = {
      center: { lat: originLat, lng: originLon},
      zoom: 10,
      panControl: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      scrollwheel: false
    };

    var radiusMap = new google.maps.Map(document.getElementById('map-canvas'), radiusMapOptions);

    var distanceCircle = {
      strokeColor: '#005ea5',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#005ea5',
      fillOpacity: 0.25,
      map: radiusMap,
      center: radiusMapOptions.center,
      radius: miles * 1609.344
    }

    radiusCircle = new google.maps.Circle(distanceCircle);

    //--- Maps on each result
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

      navigator.geolocation.getCurrentPosition(success, error,
                                             {maximumAge:600000});
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
});;$(function() {

  //-- Faking details behaviour

  $('.no-details').on('click keypress', 'summary', function(e) {
    var $this = $(this);
    if (e.which === 13 || e.type === 'click') {
      $this.parent().toggleClass('open');
    }
  });

});;$(function () {
  if($('.fixedsticky').length > 0) {

    var sortControl = $('.float-right-wrap');
    var secondToLast = $('.search-results__item:nth-last-child(2)');
    var origPosition = '23px';
    var posNumber = 23;

    stickySidebar();

    $(window).scroll(stickySidebar);

    $(window).resize(stickySidebar);

    function stickySidebar() {
      var sortOffset = sortControl.offset(),
          secondOffset = secondToLast.offset(),
          sortTopPos = sortOffset.top - $(window).scrollTop(),
          secLastTopPos = secondOffset.top - $(window).scrollTop();

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
    }
  }


});

