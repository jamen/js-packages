var collapse = require('./');
var test = require('tape');

test('collapse into single', function(t) {
  // Single value collapse
  t.same(collapse(['3px', '3px']), ['3px'], 'collapse(["3px", "3px"]) === ["3px"]');
  t.same(collapse(['6px', '6px', '6px']), ['6px'], 'collapse(["6px", "6px", "6px"]) === ["6px"]');
  t.same(collapse(['8px', '8px', '8px', '8px']), ['8px'], 'collapse(["8px", "8px", "8px", "8px"]) === ["8px"]');
  t.end();
});

test('collapse into double', function(t) {
  // Double value collapse
  t.same(collapse(['1px', '2px', '1px']), ['1px', '2px'], 'collapse(["1px", "2px", "1px"]) === ["1px", "2px"]');
  t.same(collapse(['5px', '8px', '5px', '8px']), ['5px', '8px'], 'collapse(["5px", "8px", "5px", "8px"]) === ["5px", "8px"]');
  t.end();
});

test('collapse into triple', function(t) {
  // Triple value collapse
  t.same(collapse(['1px', '2px', '3px', '2px']), ['1px', '2px', '3px'], 'collapse(["1px", "2px", "3px", "2px"]) === ["1px", "2px", "3px"]')
  t.end();
});

test('no collapsing', function(t) {
  t.same(collapse([]), [], 'collapse([]) === []');
  t.same(collapse(null), [], 'collapse(null) === []');
  t.same(collapse(true), [], 'collapse(true) === []');
  t.same(collapse(['1px']), ['1px'], 'collapse(["1px"]) === ["1px"]');
  t.same(collapse(['1px', '2px']), ['1px', '2px'], 'collapse(["1px", "2px"]) === ["1px", "2px"]');
  t.same(collapse(['1px', '2px', '3px']), ['1px', '2px', '3px'], 'collapse(["1px", "2px", "3px"]) === ["1px", "2px", "3px"]');
  t.same(collapse(['1px', '2px', '3px', '4px']), ['1px', '2px', '3px', '4px'], 'collapse(["1px", "2px", "3px", "4px"]) === ["1px", "2px", "3px", "4px"]');
  t.end();
});
