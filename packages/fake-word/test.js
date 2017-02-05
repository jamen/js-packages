var test = require('tape')
var word = require('./')

test('random words', function (t) {
  t.plan(4)
  t.is(typeof word(3), 'string', 'generates string')
  t.true(Array.isArray(word(3, 10)), 'generates array')
  t.is(word(4).length, 4, 'word length')
  t.is(word(3, 5).length, 5, 'array length')
  console.log(word(3, 5))
})
