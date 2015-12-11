'use strict';

const Rela = require('./lib'),
      info = require('./package.json');

/* index.js
 * Server initialization and package information.
 * * */

// Library initializer
module.exports = exports = function(opts){
  return new Rela(opts);
};

// Raw server accessor.
exports.Rela = Rela;

// Meta
exports.name = info.name;
exports.version = info.version;
exports.author = info.author;
exports.license = info.license;
