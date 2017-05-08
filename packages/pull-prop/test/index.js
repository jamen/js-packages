const test = require('tape')
const pull = require('pull-stream')
const prop = require('../')
const { values, map, drain }  = pull

test('select and restore', t => {
  t.plan(4)

  pull(
    values([
      { foo: { bar: { qux: 1 } } },
      { foo: { bar: { qux: 2 } } },
      { foo: { bar: { qux: 3 } } },
    ]),
    prop('foo.bar.qux', () => pull(
      map(qux => qux * 3)
    )),
    drain(res => {
      t.is(typeof res, 'object', 'got object')
    }, err => {
      t.false(err, 'ended')
    })
  )
})

