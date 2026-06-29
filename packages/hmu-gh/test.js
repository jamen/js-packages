var test = require('tape');
var nock = require('nock');
var hmu = require('hmu-core');
var gh = require('.');

test('single name', function(t) {
  t.plan(1);

  nock('https://api.github.com/users').get('/foobar')
  .reply(200, {login: 'foobar'});

  nock('https://api.github.com/users').get('/bazqux')
  .reply(404, {message: 'Not Found'});

  hmu([{
    plugin: gh,
    input: ['foobar', 'bazqux']
  }]).then(function(results) {
    t.same(results, [
      ['github', 'foobar', 'taken'],
      ['github', 'bazqux', 'free']
    ], 'correct output');
  });
});
