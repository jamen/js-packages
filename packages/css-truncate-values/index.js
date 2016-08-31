var strip = require('css-strip-unit');

module.exports = normalize;

/** @module css-normalize-value
  *
  * Normalize CSS numbers while retaining the original value.
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
  number = parseFloat(number).toString();
  var extra = number.indexOf('0.');
  if (extra === 0) return number.slice(1) + unit;
  if (extra === 1 && number[0] === '-') return '-' + number.slice(2) + unit;
  return number + unit;
};
