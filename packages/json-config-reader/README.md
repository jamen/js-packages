# Archived: Project Abandoned
This project has been abandoned in favor of [`refig`](https://github.com/jamen/refig) and [`rc`](https://npmjs.com/rc)

# json-config-reader

**This package has been replaced by [refig](https://github.com/iora/refig), although it still can be used, refig is recommended.**

This module was made for [iora](https://github.com/iora/iora), but can be used separately to read any JSON configurations.

json-config-reader reads configurations, parses them, and caches them in case they need to be referenced again.

## Usage
The json-config-reader package consists of a simple API, containing two methods.

To use it, you simply use the `require` function after installing it via npm `npm install json-config-reader`.

```javascript
var jc = require('json-config-reader');
```

### `.read`
The `.read` method attempts to read a file, then attempts to parse it as JSON.  If successful, it caches the data.

```javascript
  var data = jc.read('some.json');
  // `data` is now a usable object.
```

The object is cached so the files doesn't have to be read over and over again...

```javascript
// The first read fetches the contents from the file and parses it.
var data1 = jc.read('config.json');

// The second read refers to the `global.__jsonCache` object.
var data2 = jc.read('config.json');
```

### `.purge`
The `.purge` method sets and entry in `global.__jsonCache` to `undefined`, so the `.read` function will re-read the JSON file.

```javascript
// my.json = {'example': 'test'}

// Read the json file and store it.
var data1 = jc.read('my.json');

// Rewrite the JSON file to something different!
fs.writeFileSync(
  'my.json',
  JSON.stringfy({'foo': 'bar'})
);

// Try to read the new json file
var data2 = jc.read('my.json');
// But if refers to the cache!
// At this point, data1 and data2 are the same, since data2 is from the cache.

// Purge cache.
jc.purge('my.json');

// Read again!
var data3 = jc.read('my.json');

// The results would be:
// data1 = {'example': 'test'}
// data2 = {'example': 'test'}
// data3 = {'foo': 'bar'}
```

### `.__objectCache` and `global.__objectCache`
**Note:** You shouldn't ever have to use these objects yourself.  `.read` provides automated functionality to read from the cache object.  These objects are where the cache is stored, you should access them with `.read`.

These objects hold the cache values, they both reference the same value in the memory, so if you change one, it'll change the other.

```javascript
var test1 = jc.read('test.json');

// Remember, you shouldn't ever have to do this...
var test2 = global.__jsonCache['/absolute/path/to/test.json'];

// test1 and test2 are the same.
```
