
var test = require('tape')
var { pull, through, drain } = require('pull-stream')
var { read } = require('pull-files')
var concat = require('../')

test('concat files', t => {
  t.plan(2)

  pull(
    read([ 'foo.css', 'bar.css' ], { cwd: __dirname }),
    through(console.log),
    concat('qux.css'),
    drain(file => {
      t.is(file.path, 'qux.css', 'got css bundle')
      console.log(file)
      console.log(file.data.toString())
    }, t.false)
  )
})
