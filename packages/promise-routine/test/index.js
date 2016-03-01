import test from 'ava';
import routine from '../lib';

function dummy(a) {
  return Promise.resolve(a);
}

test('sets', t => {
  t.plan(1);

  const foo = routine(dummy, [1], [2], [3]);

  return foo.then(res => {
    t.same(res, [1, 2, 3]);
  }, t.fail);
});

test('non-sets', t => {
  t.plan(1);

  const foo = routine(dummy, 1, 2, 3);

  return foo.then(res => {
    t.same(res, [1, 2, 3]);
  }, t.fail);
});

test('sets + non-sets', t => {
  t.plan(1);

  const foo = routine(dummy, [1], 2, [3], 4);

  return foo.then(res => {
    t.same(res, [1, 2, 3, 4]);
  }, t.fail);
});
