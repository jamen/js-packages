var test = require('tape')
var btoa = require('./')

function doTests (t, btoa) {
  t.plan(4)

  var full = `Man is distinguished, not only by his reason, but by this singular passion from
other animals, which is a lust of the mind, that by a perseverance of delight
in the continued and indefatigable generation of knowledge, exceeds the short
vehemence of any carnal pleasure.`

  t.is(btoa(full), 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=', 'full text')
  t.is(btoa('any carnal pleasure.'), 'YW55IGNhcm5hbCBwbGVhc3VyZS4=', 'padding 1')
  t.is(btoa('any carnal pleasure'), 'YW55IGNhcm5hbCBwbGVhc3VyZQ==', 'padding 2')
  t.is(btoa('any carnal pleasur'), 'YW55IGNhcm5hbCBwbGVhc3Vy', 'no padding')
}

test('jamen btoa', function (t) { doTests(t, btoa.jamen) })
test('dustin btoa', function (t) { doTests(t, btoa.dustin) })
test('brandon btoa', function (t) { doTests(t, btoa.brandon) })
