const test = require('tape')
const pull = require('pull-stream')
const spawn = require('../')
const { values, drain } = pull

test('spawns process', t => {
  t.plan(2)
  
  var cat = spawn('cat')
  
  pull(
    values(['foo', 'bar']),
    cat
  )

  pull(
    cat,
    drain(data => {
      t.is(data.toString(), 'foobar', 'got stdio')
    }, err => {
      t.false(err, 'ended')
    })
  )
})


