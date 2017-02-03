
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
