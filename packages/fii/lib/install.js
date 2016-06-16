var EventEmitter = require('events');
var each = require('async-each');
var npmDl = require('npm-dl-package');
var path = require('path');
var write = require('safe-write-stream');
var gunzip = require('zlib').createGunzip;
var tar = require('tar-stream').extract;
var exists = require('./exists');
var symlink = require('fs').symlink;
var mkdirp = require('mkdirp');

module.exports = function install(packages, linkDir, dlDir) {
  var hooks = new EventEmitter();

  each(packages, function(pkg, next) {
    hooks.emit('start', pkg);

    var finish = function(err) {
      if (err && err.code !== 'EEXIST') return hooks.emit('error', err);
      hooks.emit('finish');
    };

    exists(pkg, dlDir, function(err, version, name) {
      if (err) hooks.emit('error', pkg);
      if (version) {
        var target = path.join(dlDir, name, version);
        var dest = path.join(linkDir, name);
        symlink(target, dest, 'dir', finish);
      } else {
        npmDl(pkg, function(err, file, info) {
          if (err) hooks.emit('error', err);
          var extract = tar();
          var target = path.join(dlDir, info.name, info.version);
          var dest = path.join(linkDir, info.name);

          extract.on('entry', function(header, stream, callback) {
            var plainPath = header.name.slice(8);
            var filePath = path.join(target, plainPath);
            var w = write(filePath);
            w.on('finish', callback);
            stream.pipe(w);
          });

          extract.on('finish', function() {
            symlink(target, dest, 'dir', function(err) {
              if (err !== 'EEXISTS') return hooks.emit('error', err);
              if (info.dependencies) {
                var elmapo = function(item) {
                  return item + '@' + info.dependencies[item];
                };
                // Do deps in parallel
                var deps = Object.keys(info.dependencies).map(elmapo);

                target = path.join(target, 'node_modules');
                mkdirp(target, function() {
                  var d = install(deps, target, dlDir);
                  d.on('finish', finish);
                });
              }
            });
          });

          file.pipe(gunzip()).pipe(extract);
        });
      }
    });
  }, function(err) {
    if (err) hooks.emit('error', err);
  });

  return hooks;
};
