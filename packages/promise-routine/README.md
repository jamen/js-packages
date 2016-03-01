# promise-routine
> Wrap a routine of Promise functions in Promise.all

## Installation
```shell
$ npm install promise-routine
```

## Usage
```javascript
import routine from 'promise-routine';

import promiseFunction from '...';

routine(promiseFunction, ['hello', 'world'], ['foo', 'bar', 'baz'])
.then(results => {
  // ...
});
```

## API
#### `routine(fn, ...sets)`
 - `fn` (Function): Function for the routine to use.
 - `...sets` (Arrays): A list of arrays to apply to `fn`;

Returns: `Promise`

#### `routine.Promise`
The `Promise` that is used internally (defaults to global `Promise`), replace this to use a custom `Promise` object.  Just note that it calls `Promise.all` internally.

Example:
```
import Promise as BB from 'bluebird';
routine.Promise = BB;

routine(...)
.delay(...)
.then(...)
.cancel(...)
```

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3
  [github]: https://github.com/jamen
