import test from 'ava'
import routine from '../lib'

const bar = {
  dummy: function dummy (a) {
    return Promise.resolve(a)
  },

  foo: function foo (a) {
    return this.dummy(a)
  }
}

test('object methods', t => {
  t.plan(1)

  const foo = routine(bar.foo, [1, 2, 3], bar)

  return foo.then(res => {
    t.same(res, [1, 2, 3])
  })
})
