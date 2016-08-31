var collapse = require('./');
var test = require('tape');

test('collapse into single', function(t) {
  t.same(collapse(['3px', '3px']), ['3px'], 'collapse(["3px", "3px"]) === ["3px"]');
  t.same(collapse(['6px', '6px', '6px']), ['6px'], 'collapse(["6px", "6px", "6px"]) === ["6px"]');
  t.same(collapse(['8px', '8px', '8px', '8px']), ['8px'], 'collapse(["8px", "8px", "8px", "8px"]) === ["8px"]');
  t.end();
});

test('collapse into double', function(t) {
  t.same(collapse(['1px', '2px', '1px']), ['1px', '2px'], 'collapse(["1px", "2px", "1px"]) === ["1px", "2px"]');
  t.same(collapse(['5px', '8px', '5px', '8px']), ['5px', '8px'], 'collapse(["5px", "8px", "5px", "8px"]) === ["5px", "8px"]');
  t.end();
});

test('collapse into triple', function(t) {
  t.same(collapse(['1px', '2px', '3px', '2px']), ['1px', '2px', '3px'], 'collapse(["1px", "2px", "3px", "2px"]) === ["1px", "2px", "3px"]')
  t.end();
});

test('collapse zeros', function(t) {
  t.same(collapse(['0px', '0em']), ['0'], 'collapse(["0px", "0em"]) === ["0"]');
  t.same(collapse(['0%', '1rem', '0px']), ['0', '1rem'], 'collapse(["0%", "1rem", "0px"]) === ["0", "1rem"]');
  t.same(collapse(['0.12em', '0', '12.10px', '0vw']), ['.12em', '0', '12.1px'], 'collapse(["0.12em", "0", "12.10px", "0vw"]) === ["12.em", "0", "12.1px"]');
  t.same(collapse(['0em', '0px', '0', '0kHz']), ['0'], 'collapse(["0em", "0px", "0", "0kHz"]) === ["0"]');
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
