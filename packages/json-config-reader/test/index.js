var jc = require('..'),
    fs = require('fs');

// Read file
var data1 = jc.read('index.json');

// Rewrite
fs.writeFileSync(
  __dirname + '/index.json',
  JSON.stringify({'foo': 'baz'})
);

// Try reading again (should read from cache)
var data2 = jc.read('index.json');

// Purge cache, then try to read again
jc.purge('index.json');
var data3 = jc.read('index.json');

// See results
console.log('data1', data1);
console.log('data2', data2);
console.log('data3', data3);

// Fix
fs.writeFileSync(
  __dirname + '/index.json',
  JSON.stringify({'foo': 'bar'})
);
