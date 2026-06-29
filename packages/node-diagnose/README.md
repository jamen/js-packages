# diagnose
> Async and simple diagnostics system.

Write function that report diagnostics, then run them concurrently.
```javascript
// Prepare checks
var checks = [
  function(check, async) {
    var done = async();
    fs.stat('somefile.json', function(err, stat) {
      if (err) check.fail('This check failed!');
      else check.pass('Everything in this check passed.');
      done();
    });
  },

  function(check) {
    check.warn('Boo!');
  }
];

// Run checks
diagnose(checks, function(err, diagnosis) {
  if (err) throw err;
  console.log(diagnosis.results);
});
```
Get an output of reports:
```javascript
[ { type: 'warn', message: 'Boo!' },
  { type: 'fail', message: 'This check failed!' } ]
```

## Installation
```shell
$ npm install --save-dev diagnose
```

## API
### `diagnose(check, callback)`
Run diagnostic check functions and get the results.
 - `check` (`Function`|`Array`): Function(s) to write diagnostic reports.
 - `callback` (`Function`): Node-style callback with the final diagnosis.

### `check(diagnosis, async)` (put in `diagnose`)
A diagnostic check function that reports to a `Diagnosis` object.
 - `diagnosis` (`Diagnosis`): Object used to write diagnostic reports.
 - `async` (`Function`): Call to enable async, returns the function to finish the check.

### `new Diagnosis(opts)`
A diagnosis object you can write reports to.
 - `opts` (`Object`): Options for the diagnosis.
 - `opts.results` (`Array`): Alternative array reports are written to.

### `Diagnosis#report(data)`
Write a report the object.
 - `data` (`Object`): Information for your report.

### `Diagnosis#pass(message)`
### `Diagnosis#fail(message)`
### `Diagnosis#warn(message)`
Shortcut methods for writing `pass`/`fail`/`warn` reports.
 - `message` (`String`): Message for the report. 

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

[avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
[github]: https://github.com/jamen
