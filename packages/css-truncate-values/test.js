var normalize = require('./');
var test = require('tape');

test('leading zeroes', function(t) {
  t.is(normalize('00001px'), '1px', 'normalize("1000px") === "1px"');
  t.is(normalize('0.0001em'), '.0001em', 'normalize("0.0001em") === ".0001em"');
  t.is(normalize('-003%'), '-3%', 'normalize("-003%") === "-3%"');
  t.is(normalize('-0.01kHz'), '-.01kHz', 'normalize("-0.01kHz") === "-.01kHz"');
  t.is(normalize('-0.0'), '0', 'normalize("-0.0") === "0"');
  t.end();
});

test('trailing zeroes', function(t) {
  t.is(normalize('1.0em'), '1em', 'normalize("1.0em") === "1em"');
  t.is(normalize('-1.00100em'), '-1.001em', 'normalize("-1.00100em") === "-1.001em"');
  t.is(normalize('.050s'), '.05s', 'normalize(".050s") === ".05s"');
  t.is(normalize('1.000s'), '1s', 'normalize("1.000s") === "1s"');
  t.end();
});

test()
