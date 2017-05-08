const test = require('tape')
const pull = require('pull-stream')
const prop = require('../')
const { values, map, drain }  = pull

test('select and restore', t => {
  t.plan(4)

  var { select, replace } = prop('foo.bar.qux')

  pull(
    values([
      { foo: { bar: { qux: 1 } } },
      { foo: { bar: { qux: 2 } } },
      { foo: { bar: { qux: 3 } } },
    ]),
    select,
    map(qux => qux * 3),
    replace,
    drain(res => {
      t.is(typeof res, 'object', 'got object')
      console.log(res)
    }, err => {
      t.false(err, 'ended')
    })
  )

})

