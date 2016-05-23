var Promise = require('any-promise');

var pass = function pass(out) {
  return out;
};

exports = module.exports = function hmu(runs, transform) {
  runs = runs || [];
  if (!runs || runs.constructor !== Array) {
    return Promise.reject(new Error('Must provide array for runs.'));
  }

  transform = transform || pass;
  var output = [];
  var proc = Promise.resolve();

  var next = function(value) {
    if (typeof value !== 'undefined') {
      value = transform(value);
      if (value && value.constructor === Array) {
        output.push.apply(output, value);
      } else {
        output.push(value);
      }
    }
    return this.plugin(this.input, this.options);
  };

  for (var i = 0, max = runs.length; i < max; i++) {
    var run = runs[i];
    proc = proc.then(next.bind(run));
  }

  return proc.then(function(last) {
    last = transform(last);
    if (last && last.constructor === Array) {
      output.push.apply(output, last);
    } else {
      output.push(last);
    }
    return output;
  });
};
