
# combin

> Create an array of string combinations

Create string [combinations](https://en.wikipedia.org/wiki/Combination).  Optionally given a set of characters and rule.  It is useful for creating fake data or finding package names

```js
var combin = require('combin')

// All 3 letter combinations with vowel in center:
combin(3, function (item) {
  return 'aeiou'.indexOf(item[1]) !== -1
})
```

## Installation

```sh
$ npm install --save combin
```

## Usage

### `combin(length, [set, rule])`

Create a an array of string [combinations](https://en.wikipedia.org/wiki/Combination), from the characters in `set`, and filtered by a `rule` function

 - `length` (`Number`): The length of each item. e.g., `2` would produce `['aa', 'ab', ...]`
 - `set` (`String`): A set of characters that make up the combinations
 - `rule` (`Function`): A function that filters the combinations

```js
combin(3)
// [ 'aaa', 'aab', 'aac', ..., 'zzx', 'zzy', 'zzz' ]

combin(2, '01')
// [ '00', '01', '10', '11' ]

combin(2, 'abc', x => x[0] !== 'a')
// [ 'ba', 'bb', 'bc', 'ca', 'cb', 'cc' ]
```

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/combin.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/combin/jamen.svg?style=flat-square)](https://travis-ci.org/combin/jamen) [![downloads/month](https://img.shields.io/npm/dm/combin.svg?style=flat-square)][package] [![downloads](https://img.shields.io/npm/dt/combin.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/combin.svg?style=flat-square)][package] [![support me](https://img.shields.io/badge/support%20me-paypal-green.svg?style=flat-square)](https://www.paypal.me/jamenmarz/5usd) [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)
[package]: https://npmjs.com/package/combin
