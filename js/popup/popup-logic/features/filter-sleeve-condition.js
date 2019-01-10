/**
 * Filter Sleeve Condition feature
 */

import { applySave, optionsToggle } from '../utils';

/**
 * These arrays corespond to the `.status` string [conditions] and
 * the `.status` element's classes [colors] that change when the condition
 * select element is changed.
 */
const conditions = ['Poor','Fair','Good','Good Plus','Very Good','Very Good Plus','Near Mint','Mint'];
const colors = ['poor','fair','good','good-plus','very-good','very-good-plus','near-mint','mint'];

/**
 * Removes the condition classes from the select element
 * @param {Array} classes An array of class lists for each condition
 * @param {object} status The status element to remove classes from
 * @returns {undefined}
 */
export function clearClasses(classes, status) {
  for (let i = 0; i < classes.length; i++) {
    status.classList.remove(classes[i]);
  }
}

/**
 * Sets up the event listeners for the Filter By Condition UI
 */
export function init() {

  let sleeveCondition = JSON.parse(localStorage.getItem('sleeveCondition')) || { value: 7, generic: false };

  if ( typeof sleeveCondition !== 'object' ) {
    localStorage.removeItem('sleeveCondition');
  }

  document.querySelector('.toggle-group.sleeve-condition').addEventListener('click', function () {
    optionsToggle('.hide-sleeve-condition', this, '.sleeve-condition', 125);
  });

  // Save the Filter by Condition Select value to localStorage
  document.getElementById('sleeveConditionValue').addEventListener('change', function () {

    let toggle = document.getElementById('toggleFilterSleeveCondition'),
        status = document.querySelector('.toggle-group.sleeve-condition .label .status');

    sleeveCondition.value = this.value;
    localStorage.setItem('sleeveCondition', JSON.stringify(sleeveCondition));

    if ( !toggle.checked ) {
      toggle.checked = true;
    }

    clearClasses(colors, status);

    status.textContent = conditions[this.value];
    status.classList.add(colors[this.value]);

    applySave('refresh', event);
  });

  // Checkbox listener
  document.getElementById('generic').addEventListener('change', function (event) {
    sleeveCondition.generic = this.checked;
    localStorage.setItem('sleeveCondition', JSON.stringify(sleeveCondition));
    applySave('refresh', event);
  });
}

/**
 * Sets the text value/color of the Filter Sleeve Condition
 * setting in the popup menu when it is first rendered
 * @param {boolean} enabled Enabled or disabled state
 * @return {undefined}
 */
export function setupFilterSleeveCondition(enabled) {

  let checkbox = document.getElementById('generic'),
      select = document.getElementById('sleeveConditionValue'),
      setting = JSON.parse(localStorage.getItem('sleeveCondition')) || null,
      status = document.querySelector('.toggle-group.sleeve-condition .label .status');

  if ( enabled && setting && setting.value ) {

    status.textContent = conditions[setting.value];
    status.classList.add(colors[setting.value]);
    select.value = setting.value;

    if ( setting.generic ) {
      checkbox.checked = true;
    }
  } else {

    document.getElementById('toggleFilterSleeveCondition').checked = false;
    status.textContent = 'Disabled';
    status.classList.add('disabled');
  }
}

/**
 * Validates that the user has a condition selected from
 * the select element before letting the user
 * enable the feature
 * @returns {undefined}
 */
export function toggleSleeveConditions(event) {

  let setting = JSON.parse(localStorage.getItem('sleeveCondition')) || { value: 7, generic: false },
      status = document.querySelector('.toggle-group.sleeve-condition .label .status');

  if ( !event.target.checked ) {

    status.className = 'status hide disabled';
    status.textContent = 'Disabled';

  } else {

    status.textContent = conditions[setting.value];
    status.classList.add(colors[setting.value]);
    localStorage.setItem('sleeveCondition', JSON.stringify(setting));
  }

  applySave('refresh', event);
}