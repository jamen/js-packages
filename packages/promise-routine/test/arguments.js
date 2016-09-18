import test from 'ava'
import routine from '../lib'

function dummy (a) {
  return Promise.resolve(a)
}

test('lists', t => {
  t.plan(1)

  const foo = routine(dummy, [[1], [2], [3]])

  return foo.then(res => {
    t.same(res, [1, 2, 3])
  }, t.fail)
})

test('non-lists', t => {
  t.plan(1)

  const foo = routine(dummy, [1, 2, 3])

  return foo.then(res => {
    t.same(res, [1, 2, 3])
  }, t.fail)
})

test('lists and non-lists', t => {
  t.plan(1)

  const foo = routine(dummy, [[1], 2, [3], 4])

  return foo.then(res => {
    t.same(res, [1, 2, 3, 4])
  }, t.fail)
})
