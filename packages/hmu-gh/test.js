var test = require('tape');
var nock = require('nock');
var hmu = require('hmu-core');
var gh = require('.');

test('single name', function(t) {
  t.plan(1);

  nock('https://api.github.com/users')
  .get('/foobar')
  .reply(200, {
    login: 'foobar'
  });

  hmu([{
    plugin: gh,
    input: ['foobar']
  }]).then(function(results) {
    t.same(results, [
      ['github', 'foobar', 'taken']
    ], 'name is taken');
  });
});

test('multiple name', function(t) {
  t.plan(1);

  nock('https://api.github.com/users')
  .get('/bazqux')
  .reply(404, {
    message: 'Not Found'
  });

  nock('https://api.github.com/users')
  .get('/foobar')
  .reply(200, {
    login: 'foobar'
  });

  hmu([{
    plugin: gh,
    input: ['bazqux', 'foobar']
  }]).then(function(results) {
    t.same(results, [
      ['github', 'bazqux', 'free'],
      ['github', 'foobar', 'taken']
    ], 'name is taken');
  });
});
