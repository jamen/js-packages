var request = require('https').request;
var routine = require('promise-routine');
var Promise = require('any-promise');

module.exports = function npmPlugin(input) {
  var getStatus = function getStatus(name) {
    return new Promise(function(resolve) {
      request({
        hostname: 'api.github.com',
        path: '/users/' + name,
        headers: {
          'User-Agent': 'https://github.com/jamen/hmu-gh'
        }
      }, function(resp) {
        resolve(['github', name, resp.statusCode === 404 ? 'free' : 'taken']);
      }).end();
    });
  };

  return routine(getStatus, input);
};
