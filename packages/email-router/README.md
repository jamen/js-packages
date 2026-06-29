# email-router [![NPM version](https://badge.fury.io/js/email-router.svg)](https://npmjs.org/package/email-router) [![Build Status](https://travis-ci.org/mailboy/email-router.svg?branch=master)](https://travis-ci.org/mailboy/email-router)

> A router for email addresses.

A lightweight router made for email addresses.

```javascript
var email = router();

email.on('foo@example.com', function() {
  console.log('Hello world');
});

email('f.o.o@example.com');
// "Hello world"
```

Default email resolving includes:
 - Ignoring `.` (i.e. `f.o.o@example.com` to `foo@example.com`)
 - Ignoring `+tag` (i.e. `foo+tag@example.com` to `foo@example.com`)

## Installation

```sh
$ npm install --save email-router
```

## API

### `router([options])`
Creates a new email router, returning a [`route`](#api-route) function.
 - `options.default` (`String`): Route to use when none match.
 - `options.resolve` (`Function`): Alternative resolver to [`router.resolve`](#api-router-resolve).

```javascript
var foo = router({
  default: 'foo@example.com',
  resolve: function(address) {/* ... */}
});
```

<a name="api-router-resolve"></a>
### `router.resolve(address)`
The default email resolver.
 - `address` (`String`): The email address to be resolved.

```javascript
router.resolve('f.o.o@example.com');
// "foo@example.com"
```

<a name="api-route"></a>
### `route(address, args)`
Resolve `address` and run the route handler(s) with `args` bound using [`route.on`](#api-route-on).
 - `address` (`String`): Email address being routed to that gets resolved.
 - `args` (`Array`): Arguments to pass to the route handler(s).

```javascript
var route = router(/* ... */);
// ... bind routes with `route.on`

route('f.o.o@example.com', 1, 2, 3);
```

<a name="api-route-on"></a>
### `route.on(address, handler)`
Create a handler to the resolved `address` and executed with [`route`][].
 - `address` (`String`): The resolved address to bind the handler to.
 - `handler` (`Function`): Function to be triggered when routed to.

```javascript
var route = router(/* ... */);

route.on('foo@example.com', bar => console.log('Hello %s', bar));

route('f.o.o@example.com', 'world');
// "Hello world"
```

## License

MIT © [Jamen Marzonie](https://github.com/jamen)
