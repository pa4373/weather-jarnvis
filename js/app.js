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
  
  }, showQueryBox = function () {
  
  }, AskForWeather = function () {
  
  }, showNotAvailable = function () {
  
  };

  // Main Program goes here.
  $(document).ready(function () {
  
  });
}());
