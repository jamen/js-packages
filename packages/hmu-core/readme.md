# hmu-core

> Run HMU requests and get raw output

```js
hmu([
  // A request:
  { target: require('hmu-npm'),
    input: [ 'foo', 'bar', 'baz' ],
    options: { filter: 'free' } }
], function (err, res) {
  // Handle results however
  // Display in whatever environment
  // e.g. terminal, chat, web
})
```

This module is for running [HMU requests](#request) (otherwise called plugins) and getting raw output.

If you are looking for a CLI version, see [`hmu`](https://www.npmjs.com/package/hmu).

This module is for using the same easy function for different displays like chat, web, email, etc.

## Installation

```sh
$ npm install --save hmu-core
```

## Usage

### `hmu(requests, [callback])`

Runs the given [`requests`](#request) and gives the mapped results in `callback`.

#### Parameters

 - `requests` (`Array`): An array of ["request objects"](#request) in the form `{ target, input, options }`
 - `callback` (`Function`): Collected results.  Called with params `(err, res)`.  `res` being a map of `requests`.

#### Examples

```js
hmu([
  { target: require('hmu-npm'),
    input: [ 'foo', 'bar', 'baz' ] },
  { target: require('hmu-gh'),
    input: [ 'foojs', 'barjs', 'bazjs' ],
    options: { filter: 'free' } }
], function (err, res) {
  t.same(res, [
    [ 'foo taken', 'bar taken', 'baz taken' ],
    [ 'barjs free', 'bazjs free' ]
  ])
})
```

### `request`

A `request` is a plain object in the form:

```js
{
  target: Function,
  input: Array, // optional (undefined, null)
  options: Array // optional
}
```

A `target` is otherwise called a "plugin".  A plugin is more on the front-end side as it gets resolved into a target (which then gets ran).  This is so you can do dynamic plugins, e.g. a function loaded as a target from chat messages.

### `plugin`

A plugin gets called with `target(input, options, callback)`.  `input` and `options` are from `request` if ran with `hmu-core`, but this form makes them reusable as any normal function.

The `callback` is called in `(err, output)`.  You can think of `output` as a map or reduce of `input`, and your `options` can trigger varying output alongside that.

#### Examples

```js
// Simple HTTP fetch plugin using `pull-stream` and `pull-fetch`
function plugin (input, opts, cb) {
  pull(
    values(input),
    asyncMap((item, done) => {
      // pull-fetch on url
      pull(fetch.result(item, opts), collect(done))
    }),
    collect(cb)
  )
}
```

Call `cb` with `(null, null)` to gracefully handle missing outputs

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/hmu-core.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/hmu-core.svg?style=flat-square)](https://travis-ci.org/jamen/hmu-core) [![downloads](https://img.shields.io/npm/dt/hmu-core.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/hmu-core
