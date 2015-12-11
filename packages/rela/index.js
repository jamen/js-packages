'use strict';

const Rela = require('./lib'),
      info = require('./package.json');

/* index.js
 * Library initialization and package information.
 * * */

// Initialize new library.
module.exports = exports = new Rela();

// Raw object accessor.
exports.Rela = Rela;

// Meta
exports.name = info.name;
exports.version = info.version;
exports.author = info.author;
exports.license = info.license;
