/*jslint indent: 2 */
/*global $, responsiveVoice, document */
'use strict';

/* source:
yahoo weather API: https://developer.yahoo.com/weather/
responsive voice: http://responsivevoice.org/
 */

(function () {
  var setDialogue = function (text, fadeOutSpeed, revert, revertSpeed) {
    revert = revert || false;
    fadeOutSpeed = fadeOutSpeed || 'slow';
    revertSpeed = revertSpeed || 'slow';

    var dialogue = $('#dialogue'),
      current = dialogue.text();
    // Flow: fade out -> change text -> fade in
    dialogue.fadeOut(fadeOutSpeed, function () {
      dialogue.text(text).fadeIn('slow', function () {
        if (revert) {
          setDialogue(current, revertSpeed);
        }
      });
    });
  }, setSubtitle = function (text) {
    // Flow: fade out -> change text -> fade in  
    $('#subtitle').fadeOut('slow', function () {
      $(this).text(text).fadeIn();
    });
  }, showGreeting = function () {
    var dialogue = 'Welcome home, sir.';
    responsiveVoice.speak(dialogue + ' what can i do for you?');
    $('.text-vertical-center').fadeOut('slow', function () {
      $('#activate-btn').hide();
      $('#subtitle').hide();
      $(this).fadeIn('slow', function () {
        $('#menu').slideDown('slow');
      });
    });
    setDialogue(dialogue);
  }, showQueryBox = function () {
    $('#btn1').hide();
    $('#btn2').hide();
    var query = 'Which city you would like to know?';
    responsiveVoice.speak(query);
    $('#dialogue').fadeOut('slow', function () {
      $('#input-query').attr('placeholder', query);
      $('#input-div').fadeIn();
    });
    $('#subtitle').text('Hit [RET] when you are ready').fadeIn('slow');
  }, AskForWeather = function () {
    var city = $('#input-query').val();
    setSubtitle('Searching for city matching ' + city + '...');

    $.ajax('https://query.yahooapis.com/v1/public/yql', {
      method: 'GET',
      data: {
        q: 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + '")',
        format: 'json'
      },
      success: function (data) {
        var weatherInfo = data.query.results.channel,
          cityMatch = 'It seems ' + weatherInfo.item.condition.text.toLowerCase() + ' in '
            + weatherInfo.location.city + ', ' + weatherInfo.location.country,
          noCity = 'Sorry, I found no city matching ' + city;

        if (data.query.count === 0) {
          responsiveVoice.speak(noCity);
          setSubtitle(noCity);
          return false;
        }
        responsiveVoice.speak(cityMatch);
        setSubtitle(cityMatch);
      }
    });
    return false;
  }, showNotAvailable = function () {
    var sorry = 'Sorry, it\'s beyond my capability.';
    responsiveVoice.speak(sorry);
    setDialogue(sorry, 'slow', true, 1500);
  };

  // Main Program goes here.
  $(document).ready(function () {
    $('#menu').hide();
    $('#input-div').hide();
    $('#activate-btn').on('click', showGreeting);
    $('#btn1').on('click', showQueryBox);
    $('#btn2').on('click', showNotAvailable);
    $('#input-div').on('submit', AskForWeather);
  });
}());
