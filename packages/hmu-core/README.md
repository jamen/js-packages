# hmu-core
> The core for hmu.

## Installation
```shell
$ npm install hmu-core
```

## Usage
```javascript
import hmu from 'hmu-core';

hmu([ ...runs ]);
```

### `hmu(runs)`
 - `runs` (`Array`): Array of runs

Returns a promise containing an array of the results of the runs.

### A `run`
A `run` is an object with a `plugin`, some `input`, and `options`.  For example:

```javascript
{
  plugin: foo,
  input: ['bar', 'baz', 'qux'],
  options: {
    // ...
  }
}
```
The `plugin` processes the `input` and gives an output, and `options` allow you to change behavior inside of the plugin.

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

## License
[MIT](LICENSE) &copy; Jamen Marzonie

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
  [github]: https://github.com/jamen
