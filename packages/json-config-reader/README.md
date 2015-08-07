# json-config-reader
This module was made for [iora](https://github.com/iora/iora), but can be used separately to read any JSON configurations.

json-config-reader reads configurations, parses them, and caches them in case they need to be referenced again.

## Usage

`Reader` consists of a simple API.

#### `Reader.read(file, [call])`
With `.read`, you can read asynchronously or synchronously depending on if you provide a callback.
```javascript
var jc = require("json-config-reader");

// Read synchronously
var data = jc.read("some.json");
console.log(data);

// Read asynchronously
jc.read("some.json", function(data){
  console.log("data");
});
```

Note that both refer to the same cache bank.

#### `Reader.purgeCache([file])`
`.purgeCache` sets cache values to undefined in the `Reader.__cache` bank.  This is helpful if you update a JSON file mid-script and need to read it again to get the new value.

```javascript
// Lets say some.json is { "test": 1 }

var data1 = jc.read("some.json");
fs.writeFileSync("some.json", JSON.stringify({"new": "values!"}));
var data2 = jc.read("some.json");

// data1 and data2 are the same.  The second `.read` fetched from the cache.

jc.purgeCache("some.json");
var data3 = jc.read("some.json");

// Now we have:
// data1 and data2 = { "test": 1 }
// data3 = { "new": "values!" }

```

#### `Reader.__cache`

`.__cache` is used internally.  It's an object that routes file paths to the parsed data (if successfully parsed).

```javascript
var data1 = jc.read("/home/jamen/some.json");
var data2 = jc.__cache["/home/jamen/some.json"];

// Both data1 and data2 are the same.
```

*Note!* You should never have to refer to the `Reader.__cache` object yourself.  `Reader.read` implements cache lookups, and falls back by reading and parsing the file (then adding that data to the bank).
