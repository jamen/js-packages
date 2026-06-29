var EventEmitter = require('events')
var test = require('tape')
var intercept = require('./')
var fargs = require('fast-args')

test('intercepts', function (t) {
  t.plan(3)

  var foo = new EventEmitter()

  // Map arguments to uppercase
  intercept(foo, 'message', function (args, done) {
    t.same(args, ['hello', 'world', 'foobar'], 'correctly passed arguments to intercept')
    done(null, args.map(function (x) { return x.toUpperCase() }))
  })

  intercept(foo, 'message', function (args, done) {
    t.same(args, ['HELLO', 'WORLD', 'FOOBAR'], 'correctly calls second intercept in chain')
    done(null, args.reverse())
  })

  foo.on('message', function () {
    t.same(fargs(arguments), ['FOOBAR', 'WORLD', 'HELLO'], 'correctly mapped arguments')
  })

  foo.emit('message', 'hello', 'world', 'foobar')
})
