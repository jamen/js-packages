'use strict';

const Rela = require('./lib'),
      info = require('./package');

/* index.js
 * Server initialization and package information.
 * * */

// Library initializer
let rela = function(opts){
  return new Rela(opts);
};

// Raw server accessor.
rela.Rela = Rela;

// Meta
rela.version = info.version;
rela.author = info.author;
rela.license = info.license;

module.exports = rela;
