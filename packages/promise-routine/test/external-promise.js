import test from 'ava';
import routine from '../lib';
routine.Promise = require('bluebird');

function dummy(a) {
  return Promise.resolve(a);
}

test('object methods', t => {
  t.plan(1);

  const foo = routine(dummy, [1, 2, 3]);

  return foo.delay(100).then(res => {
    t.same(res, [1, 2, 3]);
  });
});
