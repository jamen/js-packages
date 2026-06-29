# css-truncate-values [![NPM version](https://badge.fury.io/js/css-truncate-values.svg)](https://npmjs.org/package/css-truncate-values) [![Build Status](https://travis-ci.org/jamen/css-truncate-values.svg?branch=master)](https://travis-ci.org/jamen/css-truncate-values)

> Truncate CSS numbers while retaining the original value.

```js
truncate('0.10em');
// => '.1em'

truncate('010.050ms');
// => '10.05ms'

truncate(['11.0s', '-06em', '-0.10rem']);
// => ['11s', '-6em', '-.10rem']
```

It will return the smallest possible version of any number while retaining the original value...  The way it should be.  :smile:

## Installation

```sh
$ npm install --save css-truncate-values
```

## API

### `truncate(values)`
Remove the inconsistencies from CSS numbers while keeping the same value.
 - `values` (`String`|`Array`) A value or array of values that you want to truncate.

```js
truncate('00.80s');
// => '.8s'

truncate(['04px', '0.010px']);
// => ['4px', '.01px']
```

## License

MIT © [Jamen Marz](https://github.com/jamen)
