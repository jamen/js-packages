var test = require('tape-benchmark')(require('tape'))
var combin = require('./')

test('benchmarks', function (t) {
  t.plan(3)

  t.benchmark('3-combination, alpha set', function () {
    combin(3)
  })

  t.benchmark('3-combination, 3-char set', function () {
    combin(3, '123')
  })

  t.benchmark('3-combination, 3-char set, fn', function () {
    combin(3, '012', x => x[0] !== '0')
  })
})
