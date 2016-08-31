# css-normalize-value [![NPM version](https://badge.fury.io/js/css-normalize-value.svg)](https://npmjs.org/package/css-normalize-value) [![Build Status](https://travis-ci.org/jamen/css-normalize-value.svg?branch=master)](https://travis-ci.org/jamen/css-normalize-value)

> Normalize CSS numbers while retaining the original value.

```js
normalize('0.10em');
// => '.1em'

normalize('010.050ms');
// => '10.05ms'

normalize(['11.0s', '-06em', '-0.10rem']);
// => ['11s', '-6em', '-.10rem']
```

It will return the smallest possible version of any number while retaining the original value...  The way it should be.  :smile:

## Installation

```sh
$ npm install --save css-normalize-value
```

## API

### `normalize(value)`
Remove the inconsistencies from CSS numbers while keeping the same value.
 - `value` (`String`|`Array`) A value or array of values that you want to normalize.

```js
normalize('00.80s');
// => '.8s'

normalize('04px');
// => '4px'
```

## License

MIT © [Jamen Marz](https://github.com/jamen)
