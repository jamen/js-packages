# Hit Me Up Core
> The core plugin runner for Hit Me Up.

The core allows you to run plugins and get their output.  You can transform this output and handle it how you want.

If you are looking for the tool, see [jamen/hmu](https://github.com/jamen/hmu)

## Installation
```shell
$ npm install --save hmu-core
```

## Usage
```javascript
var hmu = require('hmu-core');
hmu([ ...runs ]);
```

### `hmu(runs, transform)`
 - `runs` (`Array`): Array of runs
 - `transform` (`Function`): Alter each element output.

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

### A `plugin`
A plugin is a function that returns a `Promise` object or value, it runs with `input` and `options`.

Here is an example of an asynchronous plugin using a `Promise`:
```javascript
function plugin(input, options) {
  return new Promise(function(resolve, reject) {
    fs.readFile('foo.txt', function(err, data) {
      if (err) return reject(err);
      resolve(data.toString());
    });
  });
};
```
This plugin reads the file `foo.txt` and returns the contents.

Here is an example of a synchronous plugin using `return`:
```javascript
function plugin(input, options) {
  return Math.pow(input[0], options.exponent || 2);
}
```
This takes the first input, and class `Math.pow` on it, with the exponent being provided via `options.exponent` and defaults to `2`.

### Transforms
A transform alters each run's output.
```javascript
hmu([{
  plugin: fetchFullName,
  input: ['jamenmarz']
}], function(output) {
  return output.toUpperCase();
}).then(function(output) {
  // => ['JAMEN MARZONIE']
});
```

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

## License
[MIT](LICENSE) &copy; Jamen Marzonie

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
  [github]: https://github.com/jamen
