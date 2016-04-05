# Sate
> Small utility for generator-based iteration stacking.
Sate allows you to iterate an array (or something linear) and stack (`yield`) items in a new location.
```javascript
const sate = require('sate');

const foo = [1, 2, 3];
const bar = sate(foo, function* (item) {
  yield* [item, -item];
});

console.log(bar);
// => [1, -1, 2, -2, 3, -3]
```

## Installation
```shell
$ npm install --save sate
```

## Usage
```javascript
import sate from 'sate';
// or
const sate = require('sate');
// ...

sate(arr, function* (item, iterator, self) {
  // ...
});
```

### `sate(arr, fn*)`
Perform an iteration, and yield items into an output stack.
 - `arr` (`Array`): Item to iterate.
 - `fn*` (`function*`, generator): Iteration and stacking operation.

Example:
```javascript
const input = ['foo', 'bar:baz:qux', 'oof:rab', 'zab'];
const output = sate(input, function* (item) {
  yield* item.split(':');
});

console.log(output);
// => ['foo', 'bar', 'baz', 'qux', 'oof', 'rab', 'zab']
```

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
  [github]: https://github.com/jamen
