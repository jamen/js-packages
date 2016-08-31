# css-collapse-values [![NPM version](https://badge.fury.io/js/css-collapse-values.svg)](https://npmjs.org/package/css-collapse-values) [![Build Status](https://travis-ci.org/jamen/css-collapse-values.svg?branch=master)](https://travis-ci.org/jamen/css-collapse-values)

> Collapse CSS values into their shortest form.

Given property values that behave similar to `margin`:

```css
.foo { margin: 10px 5px 10px 5px; }
/* collapsed: */
.foo { margin: 10px 5px; }
```

Collapse them into their shortest form using this module:

```js
const collapse = require('collapse');

collapse(['1px', '2px', '1px', '2px']);
// => ['1px', '2px']

collapse(['2em', '4em', '6em', '4em']);
// => ['2em', '4em', '6em']

collapse(['10%', '30%', '10%']);
// => ['10%', '30%']
```

## Installation

```sh
$ npm install --save css-collapse-values
```

## API

### `collapse(values)`

Collapse the values, always returning an array.

 - `values` (`Array`): An array of 4 or less CSS number values. (i.e. `['1em', '2em', '1em']`)

```js
t.same(
  collapse(['10px', '10px', '10px', '10x']),
  ['10px']
);
```

## License

MIT © [Jamen Marz](https://github.com/jamen)
