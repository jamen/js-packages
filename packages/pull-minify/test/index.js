
const test = require('tape')
const { pull, through, drain } = require('pull-stream')
const { read } = require('pull-files')
const { extname } = require('path')
const minify = require('../')

test('minifies js and css files', t => {
  t.plan(3)

  pull(
    read([ 'foo.js', 'foo.css' ], { cwd: __dirname }),
    through(file => {
      file.before = file.data.length
    }),
    minify({
      js: {
        mangle: true,
        toplevel: true
      },
      css: true 
    }),
    drain(file => {
      file.after = file.data.length
      t.true(file.after < file.before, 'got minified ' + extname(file.path))
    }, t.false)
  )
})
