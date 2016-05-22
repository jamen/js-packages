var Circuit = require('promise-circuit');

exports = module.exports = function hmu(runs) {
  runs = runs || [];
  var results = [];
  var proc = new Circuit();
  for (var i = 0, max = runs.length; i < max; i++) {
    var run = runs[i];
    proc.add(run.plugin, [
      results,
      run.input,
      run.options
    ]);
  }

  return proc.run().then(function() {
    return results;
  });
};
