var path = require('path');
var glob = require('glob');

module.exports = requireGlob

function requireGlob (modulePath, baseDir, callback) {
  // Fix if node_modules type of require
  if (
    modulePath.indexOf('/') > 0 ||
    modulePath.indexOf('./') > 0 ||
    modulePath.indexOf('../') > 0
  ) {
    modulePath = path.resolve(baseDir, 'node_modules', modulePath)
  }

  // Glob file path
  glob(modulePath, function (err, files) {
    if (err) return callback(err)

    // Map path results to modules.
    var output = []
    for (var i = files.length; i--;) output[i] = require(files[i])
    callback(null, output)
  })
}
