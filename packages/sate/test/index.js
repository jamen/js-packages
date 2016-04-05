const sate = require('..');
const assert = require('assert');

const foo = [1, 2, 3];
const bar = sate(foo, function* test(item) {
  yield* [item, -item];
});

assert.deepEqual(bar, [1, -1, 2, -2, 3, -3]);
