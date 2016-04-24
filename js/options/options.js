/**
 *
 * Discogs Enhancer
 *
 * @author: Matthew Salcido (c) 2016
 * @url: http://www.msalcido.com
 * @github: https://github.com/salcido
 *
 */

$(document).ready(function() {

  let
      visible = false,
      modal = '<div id="optionsModal" class="options-modal" style="display: none;">' +
                '<div class="options-modal-content">' +
                  '<span class="options-close">x</span>' +
                  '<h3>Super Secret Options Menu</h3>' +
                  '<ul class="options">' +
                    '<li>' +
                      '<input id="analytics" name="analytics" type="checkbox" value="analytics" />' +
                      '<label for="analytics">Analytics</label>' +
                    '</li>' +
                    '<li>' +
                      '<input id="colorize" name="colorize" type="checkbox" value="colorize" />' +
                      '<label for="colorize">Colorize Prices</label>' +
                    '</li>' +
                    '<li>' +
                      '<input id="debug" name="debug" type="checkbox" value="debug" />' +
                      '<label for="debug">Debug Messages</label>' +
                    '</li>' +
                    '<li>' +
                      '<input id="unittests" name="unittests" type="checkbox" value="unittests" />' +
                      '<label for="unittests">Unit Tests</label>' +
                    '</li>' +
                    '<li>' +
                      '<label for="threshold" id="thresholdLabel">Threshold:</label>' +
                      '<input id="threshold" name="threshold" type="number" value="" max="10" min="0"/>' +
                    '</li>' +
                  '</ul>' +
                  '<a href="#" class="options-save button button_green" id="saveOptions">Save options &amp; refresh</a>' +
                '</div>' +
              '</div>';

  // Keyboard Shortcut
  document.addEventListener('keyup', function(e) {

    // Alt + Ctrl + 7
    if (e.altKey && e.ctrlKey && e.which === 55) {

      if (!visible) {

        visible = true;

        $('.options-modal').show();

        resourceLibrary.options.getOptions();

        // Close it
        $('body').on('click', '.options-close', function() {

          $('.options-modal').hide();

          visible = false;
        });

        // Save it
        $('body').on('click', '.options-save', function() {

          resourceLibrary.options.saveOptions();
        });
      }

      return false;
    }
  });

  $('body').append(modal);

  resourceLibrary.options.getOptions();
});
