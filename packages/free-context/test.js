var test = require('tape')
var free = require('./')

test('free context', function (t) {
  t.plan(3)

  var push = free(Array.prototype.push)
  var unshiftMany = free(Array.prototype.unshift, true)
  var splice = free([].splice)

  var foo = []
  push(foo, 'hello', 'world')
  t.same(foo, ['hello', 'world'], 'free `.push` method')

  unshiftMany(foo, ['foo', 'bar'])
  t.same(foo, ['foo', 'bar', 'hello', 'world'], 'free `.push` method with apply')

  splice(foo, 2, 1)
  t.same(foo, ['foo', 'bar', 'world'], 'free `.splice` as instance method')
})
