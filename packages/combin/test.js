var test = require('tape')
var combin = require('./')

test('combin', function (t) {
  t.plan(5)
  t.same(combin(2, '01'), ['00', '01', '10', '11'], '2-combination custom set')
  t.same(combin(3, 'ab'), ['aaa', 'aab', 'aba', 'abb', 'baa', 'bab', 'bba', 'bbb'], '3-combination custom set')
  t.same(combin(3).slice(-4, -1), ['zzw', 'zzx', 'zzy'], '3-combination alpha set')
  t.same(combin(3, x => x[0] === 'a' && x[1] === 'b').slice(-4, -1), ['abw', 'abx', 'aby'], '3-combination alpha set function')
  t.same(combin(3, '0123', x => x[0] !== '0').slice(0, 3), ['100', '101', '102'], '3-combination custom set function')
})
