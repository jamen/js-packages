var strip = require('css-strip-unit');

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

function collapse(v) {
  if (!v || !v.length) return [];

  var r = [];
  for (var i = v.length; i--;) {
    if (strip(v[i]) === '0') r[i] = '0';
    else r[i] = v[i];
  }

  var a = r[0], b = r[1], c = r[2], d = r[3];
  switch (v.length) {
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
  }

  return v;
};
