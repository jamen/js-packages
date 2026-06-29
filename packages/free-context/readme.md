# free-context

> Free context from a function.

```js
var free = require('free-context')

// Free context from `.push` method
var push = free(Array.prototype.push)

// First parameter is context, like `.call` or `.apply`
var foo = []
push(foo, 'hello', 'world')
```

## Installation

```sh
$ npm install --save free-context
```

## Usage

### `free(fn, [apply])`

Returns a function you can bind a context to with the first argument.

#### Parameters

 - `fn` (`Function`):  Target function for freeing context.  Returns a new contextless version of this.
 - `apply` (`Boolean`): Use array instead of argument list for following parameters.

#### Examples

```js
var push = free(Array.prototype.push)

var foo = []
push(foo, 'Hello', 'world', 'foo', 'bar')
```

Using `apply`:

```js
// Enable `apply`:
var push = free(Array.prototype.push, true)

var foo = []
var items = ['Hello', 'world', 'foo', 'bar']

// Supply array with `apply` instead of arguments
push(foo, items)
```

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/free-context.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/free-context.svg?style=flat-square)](https://travis-ci.org/jamen/free-context) [![downloads](https://img.shields.io/npm/dt/free-context.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/free-context
