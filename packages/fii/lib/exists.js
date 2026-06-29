var readDir = require('fs').readdir;
var semver = require('semver');
var path = require('path');
var latestVersion = require('latest-version');

module.exports = function exists(id, dir, callback) {
  var parts = id.split('@');
  var name = parts[0];
  var tag = parts[1] || 'latest';

  var read = function(err, versions) {
    if (err && err.code === 'ENOENT') return callback(null, false);
    else if (err) return callback(err);
    versions = versions.sort().reverse();

    var version = false;
    for (var i = 0, max = versions.length; i < max; i++) {
      if (semver.satisfies(versions[i], tag)) {
        version = versions[i];
        break;
      }
    }

    callback(null, version, name);
  };

  if (tag === 'latest') {
    latestVersion(name).then(function(version) {
      tag = version;
      readDir(path.join(dir, name), read);
    });
  } else {
    readDir(path.join(dir, name), read);
  }
};
