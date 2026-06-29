var test = require('tape')
var hmu = require('./')

test('runs multiple generic requests', function (t) {
  // generic plugins
  function foo (i,o,c) { c(null, i.map(function(x){return x + '-ness'})) }
  function bar (i,o,c) { c(null, i.map(function(x){return x + 'ify'})) }
  function qux (i,o,c) { c(null, i.map(function(x){return 'pull-' + x})) }


  hmu([
    { target: foo,
      input: [ 'hello', 'world' ] },
    { target: bar,
      input: [ 'foo', 'bar', 'baz' ] },
    { target: qux,
      input: [ 'qux', 'idk', 'what' ] },
    { target: bar,
      input: [ 'run', 'bar', 'again' ] },
  ], function (err, res) {
    if (err) return t.end(err)
    t.same(res, [
      [ 'hello-ness', 'world-ness' ],
      [ 'fooify', 'barify', 'bazify' ],
      [ 'pull-qux', 'pull-idk', 'pull-what' ],
      [ 'runify', 'barify', 'againify' ]
    ], 'expected results')
    console.log(res)
    t.end()
  })
})

test('a request with options', function (t) {
  function foo (input, opts, cb) {
    cb(null, input.map(function (x) { return (opts.bar ? 'bar-' : 'foo-') + x }))
  }

  hmu([
    { target: foo,
      input: [ 'hello', 'world' ] },
    { target: foo,
      input: ['foo', 'bar', 'qux'],
      options: { bar: true } },
  ], function (err, res) {
    if (err) return t.end(err)
    t.same(res, [
      [ 'foo-hello', 'foo-world' ],
      [ 'bar-foo', 'bar-bar', 'bar-qux' ]
    ], 'expected results')
    console.log(res)
    t.end()
  })
})
