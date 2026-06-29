bco
===
Better `console` object.

#### Chainable
All native methods are now chainable, as well as some additional methods too.

```javascript
console.log('Hello World!').log('Hello again!');
```

#### Still native!
This library still uses the native methods, it "clones" them with `console.Console` and then simply rebuilds the methods while still invoking the same native binding with additional features thrown in.

#### `.add`
Pushes a new item to a hidden array which can be logged later on.

```javascript
[1, 2, 3].forEach(function(item){
  console.add(item);
});
console.log();
// => 1 2 3
```

#### `.write`
Invokes the `process.stdout.write` method, but is a bit more flexible with input.

```javascript
console.write('Hello', ' World!');
// => Hello World!
```

`.write` also works on `.add` builds:

``` javascript
['Hello', ' World', '!'].forEach(function(item){
  console.add(item);
});
console.write();
// => Hello World!
```

#### `.set`
Writes an ANSI character...  Basically a more simple way of doing `console.write(console.encode(input))`:

```javascript
console.set('[43m').log('Hello!').set('[0m');
```

#### `.encode`
Encodes a string input to a `Buffer` prefixed with a escape character for ANSI codes.

```javascript
var example = console.encode('[43m');
console.log(example);
// => <Buffer 1b 5b 34 33 6d>
```

### Usage

All you have to do is require `"bco"` to enable the features:

```javascript
require('bco');

console.log('Hello').log('World!');
```
