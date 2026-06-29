# event-intercept

> Intercept event data before it reaches the listeners.

```js
var intercept = require('event-intercept')
var foo = new EventEmitter()

// Map all data on 'hello' event to uppercase
intercept(foo, 'hello', (args, done) => {
  done(null, args.map(data => data.toUpperCase()))
})

foo.on('hello', console.log)

foo.emit('hello', 'world', 'foo', 'bar')
// WORLD FOO BAR
```

Useful for injecting where you want to view/change data before it reaches listeners.  Like parsing, logging, debugging, etc.

## Installation

```sh
$ npm install --save event-intercept
```

## Usage

### `intercept(emitter, event, handler)`

Intercepts an event and it's data.  These are executed in the order they are added.

### Parameters

 - `emitter` ([`EventEmitter`](https://nodejs.org/api/events.html)): The emitter you want to add intercepting on.
 - `event` (`String`): Name of the event you want to intercept.
 - `handler` (`Function`): A mapping function with the signature `(args, done)`.

### Handler

The handler has the parameters `(args, done)`, and you call `done` with parameters `(end, args)`.  Where `end` can be `true` (abort safely) or an `Error`.

### Example

```js
intercept(emitter, 'message', function (args, done) {
  // Reverse
  args = args.map(x => x.split('').reverse().join(''))
  // Callback
  done(null, args)
})
```

## License

MIT © [Jamen Marz](https://git.io/)

---

[![version](https://img.shields.io/npm/v/event-intercept.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/event-intercept.svg?style=flat-square)](https://travis-ci.org/jamen/event-intercept) [![downloads](https://img.shields.io/npm/dt/event-intercept.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/event-intercept
