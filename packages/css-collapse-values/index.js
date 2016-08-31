var strip = require('css-strip-unit');
var normalize = require('css-normalize-value');

module.exports = collapse;

/** @module css-collapse-values
  *
  * Collapse CSS values into their shortest possible form.
  *
  * ```js
  * collapse(['1px', '2px', '1px', '2px']);
  * // => ['1px', '2px']
  * ```
  */

function collapse(values) {
  if (!values || !values.length) return [];
  var length = values.length;

  // Normalize values
  var replica = [];
  for (var i = length; i--;) {
    var sample = strip(values[i]);
    if (!+sample) replica[i] = '0';
    else replica[i] = normalize(values[i]);
  }

  // Collapse values
  var a = replica[0], b = replica[1], c = replica[2], d = replica[3];
  switch (length) {
    case 2: if (a === b) return [a];
    case 3: {
      if (a === b && b === c) return [a];
      if (a === c) return [a, b];
    }
    case 4: {
      if (a === b && b === c && c === d) return [a];
      if (a === c && b === d) return [a, b];
      if (b === d) return [a, b, c];
    }
    default: return values;
  }
};
