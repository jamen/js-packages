var strip = require('css-strip-unit');

module.exports = normalize;

/** @module css-normalize-value
  *
  * Normalize CSS numbers while retaining the original value.
  *
  */

var NUMBER = '1234567890.';

function normalize(value) {
  // Run this function for each item if value is array.
  if (value instanceof Array) {
    var output = [];
    for (var i = value.length; i--;) output[i] = normalize(value[i]);
    return output;
  }

  // Separate value.
  var number = strip(value);
  var unit = value.slice(number.length);

  // Normalize the number.
  var i = -1;
  var output = ''
  var trail = '';
  var capturing = 1;
  var max = number.length;
  while (++i < max) {
    if (capturing === 1 && number[i] === '0') continue;
    if (number[i] === '-' && output[0] !== '-') {
      output += '-';
      continue;
    }
    if (number[i] === '.') {
      if (capturing === 2) return null;
      capturing = 2;
    }
    if (capturing === 2) {
      if (number[i] === '0') {
        trail += '0';
        continue;
      }
      output += trail;
      trail = '';
    }
    if (NUMBER.indexOf(number[i]) !== -1) {
      if (capturing === 1) capturing = 0;
      output += number[i];
    }
  }

  if (output[output.length - 1] === '.') output = output.slice(0, -1);
  if (output[0] === '-' && output.length === 1) output = '0'

  // Return normalized value.
  return output ? output + unit : null;
};
