'use strict';

const refig = require('refig'),
      through = require('through2'),
      path = require('path');

module.exports = exports = function(opts){
  if (typeof opts !== 'object') opts = {};

  return through({ objectMode: true }, function(file, encoding, callback){
    // Defaults:
    let meta = Object.assign({}, opts, {
      main: file.path,
      entry: path.dirname(file.path)
    });

    refig
      .read(meta.main)
      .then(x => refig.write(x))
      .then(_ => callback());
  });
};
