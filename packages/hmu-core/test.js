var test = require('tape');
var hmu = require('.');

test('hmu-core', function(t) {
  t.plan(3);

  var foo = function foo(input, options) {
    return new Promise(function(resolve) {
      t.same(input, ['bar', 'baz'], 'input');
      t.is(options.qux, true, 'options');
      resolve('Baz');
    });
  };

  var bar = function bar() {
    return new Promise(function(resolve) {
      resolve(['Foo', 'Qux']);
    });
  };

  hmu([{
    plugin: foo,
    input: ['bar', 'baz'],
    options: {qux: true}
  }, {
    plugin: bar,
    input: ['qux', 'foo'],
    options: {rab: true}
  }]).then(function(results) {
    t.same(results, ['Baz', 'Foo', 'Qux'], 'output');
  });
});
