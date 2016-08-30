module.exports = collapse;

/** @module css-collapse-values
  *
  * Collapse CSS values into their shortest possible form.  Use the option
  * `convert` to collapse differently typed values even further.
  *
  * Example of collapsing values:
  * ```js
  * collapse(['1px', '2px', '1px', '2px']);
  * // => ['1px', '2px']
  * ```
  */

function collapse(v) {
  if (!(v instanceof Array)) return [];
  var a = v[0], b = v[1], c = v[2], d = v[3];
  switch (v.length) {
    case 2: if (a === b) return [a];
    case 3: {
      if (a === b && b === c) return [b];
      if (a === c) return [a, b];
    }
    case 4: {
      if (a === b && b === c && c === d) return [a];
      if (a === c && b === d) return [a, b];
      if (b === d) return [a, b, c];
    }
    default: return v;
  }
};
