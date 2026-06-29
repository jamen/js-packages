var Diagnosis = require('./diagnosis');
var each = require('async-each');

var diagnose = module.exports = function diagnose(checks, opts, callback) {
  if (arguments.length === 2) {
    callback = opts;
    opts = {};
  }

  var diagnosis = new Diagnosis(opts);
  if (Array.isArray(checks)) {
    each(checks, function(check, done) {
      var was = {sync: true};
      check(diagnosis, function() {
        was.sync = false;
        return done;
      });
      if (was.sync) {
        done();
      }
    }, function(err) {
      delete diagnosis.done;
      callback(err, diagnosis);
    });
  } else if (typeof checks === 'function') {
    checks(diagnosis, callback);
  } else {
    callback(new TypeError('invalid "checks", must be array'), diagnosis);
  }
};

diagnose.Diagnosis = Diagnosis;
