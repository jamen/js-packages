var Promise = require('any-promise');

exports = module.exports = function hmu(runs) {
  runs = runs || [];
  var output = [];
  var proc = Promise.resolve();

  var next = function(value) {
    if (typeof value !== 'undefined') {
      if (value && value.constructor === Array) {
        output.push.apply(output, value);
      } else {
        output.push(value);
      }
    }
    return this.plugin(this.input, this.options, output);
  };

  for (var i = 0, max = runs.length; i < max; i++) {
    var run = runs[i];
    proc = proc.then(next.bind(run));
  }

  return proc.then(function(last) {
    if (last && last.constructor === Array) {
      output.push.apply(output, last);
    } else {
      output.push(last);
    }
    return output;
  });
};
