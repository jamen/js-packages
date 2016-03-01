import test from 'ava';
import routine from '../lib';

function dummy(a) {
  return Promise.resolve(a);
}

test(t => {
  t.plan(1);

  const foo = routine(dummy, [1], [2], [3]);

  return foo.then(res => {
    t.same(res, [1, 2, 3]);
  }, t.fail);
});
