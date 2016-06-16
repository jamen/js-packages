var Diagnosis = require('./diagnosis');
var each = require('each-async');

module.exports = function(checks, opts, callback) {
  if (arguments.length === 2) {
    callback = opts;
    opts = {};
  }

  var diagnosis = new Diagnosis(opts);
  if (Array.isArray(checks)) {
    each(checks, function(check, index, done) {
      check(diagnosis, done);
    }, function(err) {
      callback(err, diagnosis);
    });
  } else {
    callback(new TypeError('invalid "checks", must be array'), diagnosis);
  }
};
