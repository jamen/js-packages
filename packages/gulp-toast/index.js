'use strict';

const refig = require('refig'),
      fs = require('fs'),
      through = require('through2'),
      path = require('path');

module.exports = exports = function(opts){
  if (typeof opts !== 'object') opts = {};

  return through({ objectMode: true }, function(file, encoding, callback){
    // Defaults:
    let meta = Object.assign({}, opts, {
      main: file.path,
      entry: path.dirname(file.path),
      map: exports._map
    });

    refig
    .read(meta.main)
    .then(config => {
      let file = null, master = [], options = {};
      for (let name in config) {
        // Attempt to map.
        options = config[name];
        name = path.resolve(meta.entry, exports._map[name] || name);

                console.log(name, options);

        if (Array.isArray(options)) options = options.join('\n');

        if (typeof options === 'string' || options instanceof Buffer) {
          // Plain text
          master.push(new Promise((resolve, reject) =>
            fs.writeFile(name, options, e =>
              e ? reject(e) : resolve(null)
            )
          ));
        }

        else if (typeof config === 'object') {
          // JSON config
          master.push(refig.write(name, options));
        }
      }

      return Promise.all(master);
    })
    .then(_ => callback());

  });
};

exports._map = {
  'jshint': '.jshintrc',
  'babel': '.babelrc',
  'bower': '.bowerrc',
  'ignore': '.npmignore'
};
