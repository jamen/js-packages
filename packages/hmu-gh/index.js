var request = require('https').request;
var routine = require('promise-routine');
var Promise = require('any-promise');

module.exports = function npmPlugin(input) {
  var getStatus = function getStatus(name) {
    return new Promise(function(resolve) {
      request('https://api.github.com/users/' + name, function(resp) {
        var collection = [];
        resp.on('data', function(chunk) {
          collection.push(chunk);
        });

        resp.on('end', function() {
          var data = JSON.parse(Buffer.concat(collection)) || {};
          var msg = data.message;
          resolve(['github', name, msg ? 'free' : 'taken']);
        });
      }).end();
    });
  };

  return routine(getStatus, input);
};
