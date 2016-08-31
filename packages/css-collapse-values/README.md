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

Uses [`css-truncate-values`](https://github.com/jamen/css-truncate-values) to get the shortest possible results.

## Installation

```sh
$ npm install --save css-collapse-values
```

## API

### `collapse(values)`

Collapse the values, always returning an array.

 - `values` (`Array`): An array of 4 or less CSS number values. (i.e. `['1em', '2em', '1em']`)

```js
collapse(['10px', '10px', '10px', '10px'])
// => ['10px']

collapse(['-0.10em', '05px', '-0.100em', '5.0px']);
// => ['-.1em', '5px']
```

## Also See

> [postcss-collapse](https://github.com/seanc/postcss-collapse) &em; A postcss version of this.
> [css-truncate-values](https://github.com/jamen/css-truncate-values) &em; Truncate CSS numbers while retaining the original value.
> [css-strip-unit](https://github.com/jamen/css-strip-unit) &em; Strip the unit off a CSS number.

## License

MIT © [Jamen Marz](https://github.com/jamen)
