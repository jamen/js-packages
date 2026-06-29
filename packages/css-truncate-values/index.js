var strip = require('css-strip-units');

module.exports = normalize;

/** @module css-truncate-values
  *
  * Truncate CSS numbers while retaining the original value.
  *
  */

function normalize(value) {
  // Run this function for each item if value is array.
  if (value instanceof Array) {
    var output = [];
    for (var i = value.length; i--;) output[i] = normalize(value[i]);
    return output;
  }

  var number = strip(value);
  var unit = value.slice(number.length);

  // Truncate CSS number.
  number = parseFloat(number).toString();
  var extra = number.indexOf('0.');
  if (extra === 0) return number.slice(1) + unit;
  if (extra === 1 && number[0] === '-') return '-' + number.slice(2) + unit;

  // Return truncated number with unit.
  return number + unit;
};
