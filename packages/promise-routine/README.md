# promise-routine
> Wrap a routine of Promise functions in Promise.all

Repeat a `Promise`-returning function with different arguments and wrap the results in `Promise.all`.
```javascript
const routine = require('promise-routine');
const glob = require('glob');

routine(glob, ['foo/**.js', 'baz/**.css'])
.then(globs => {
  // ...
});
```

## Installation
```shell
$ npm install --save promise-routine
```

## Usage
```javascript
const routine = require('routine');
const promiseFunction = require('...');

routine(promiseFunction, [...])
.then(results => {

});
```
On object methods (or context-sensitive functions), rebind context `this` with a third argument:
```javascript
routine(lib.foo, [...], lib)
.then(results => {

});
```

## API
#### `routine(fn, sets, [context])`
 - `fn` (Function): Function for the routine to use.
 - `sets` (Array): A list of arguments to apply on `fn`, where a sub-array is a list of arguments.
 - `context` (Anything): A context to bind to `this` on `fn`. (Default: `fn`)

_What is the format of `sets`?_: Sets is a 2 dimensional array, where the second level is a list of arguments:
```javascript
// This:
routine(func, [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
// is equivalent to:
Promise.all([
  func(1, 2, 3),
  func(4, 5, 6),
  func(7, 8, 9)
]);
```
You can also supply non-array sets to supply one argument:
```javascript
// This:
routine(func, [1, 2, 3]);
// is equivalent to:
Promise.all([
  func(1),
  func(2),
  func(3)
]);
```

Returns: `Promise`

#### `routine.Promise`
The `Promise` that is used internally (defaults to global `Promise`), replace this to use a custom `Promise` object.  Just note that it calls `Promise.all` and `Promise.reject` internally.

Example:
```javascript
const routine = require('promise-routine');
routine.Promise = require('bluebird');

routine(...)
.delay(...)
.then(...)
.cancel(...);
```

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3
  [github]: https://github.com/jamen
