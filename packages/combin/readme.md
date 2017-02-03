
# word

> Generate every combination of characters under a set of rules.

```js
var word = require('word')

var words = word(5, function (word) {
  // filter the word
})
```

## Installation

```sh
$ npm install --save baggo/word
```

## Usage

### `word(len, [set], rule)`

Generate all words at the given `len` that match under the rule.  Provide a `set` to generate non-alpha words.

```js
word(10, function (word) {
  // validate `word`
  // return true/false

  // contains an `a`:
  return word.indexOf('a') !== 1
})

// Specify custom set of chars:
word(10, 'aeiouy', function (word) {
  // ...
})
```

## License

MIT © [Baggo Bois](https://github.com/baggo)

---

[![version](https://img.shields.io/npm/v/word.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/word/baggo.svg?style=flat-square)](https://travis-ci.org/word/baggo) [![downloads/month](https://img.shields.io/npm/dm/word.svg?style=flat-square)][package] [![downloads](https://img.shields.io/npm/dt/word.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/word.svg?style=flat-square)][package] [![support me](https://img.shields.io/badge/support%20me-paypal-green.svg?style=flat-square)](https://www.paypal.me/None/5usd) [![follow](https://img.shields.io/github/followers/baggo.svg?style=social&label=Follow)](https://github.com/baggo)
[package]: https://npmjs.com/package/word
