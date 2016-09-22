# slice-file-cli [![NPM version](https://badge.fury.io/js/slice-file-cli.svg)](https://npmjs.org/package/slice-file-cli) [![Build Status](https://travis-ci.org/jamen/slice-file-cli.svg?branch=master)](https://travis-ci.org/jamen/slice-file-cli)

> Generate a module that manually slices between a given range.

```sh
$ slice-file 0 5 > slice.js
```
```js
const slice = require('./slice')

slice([1, 2, 3, 4], 1)
// => [2, 3, 4]
```

This generates a file that manually picks apart an array between a given range.

Reconsider if you want to use this, as I'm not sure it is a good practice...  I just made this because I was bored.

## Installation

```sh
$ npm install --save slice-file-cli
```

## Usage

### `slice-file start end`
Generate a module that slices manually through the given range.
 - `start`: The starting index of the range where to slice manually.
 - `end`: The ending index of the range.

Outputs the module via STDOUT.

```sh
$ slice-file 1 10 > slice.js
```

### `slice(input, [start])`
The exported module's function.
 - `input` (`Array`): An array you want to slice.
 - `start` (`Number`): The starting index.

```js
slice([1, 2, 3, 4, 5, 6], 2)
// => [3, 4, 5, 6]
```


## License

MIT © [Jamen Marz](https://github.com/jamen)
