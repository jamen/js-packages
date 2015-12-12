'use strict';

const lib = require('./lib'),
      info = require('./package'),
      Server = lib.Server;

/* index.js
 * Server initialization and package information.
 * * */

// Library initializer
let rela = function(opts){
  return new Server(opts);
};

// Library access
Object.assign(rela, lib);

// Meta
rela.version = info.version;
rela.author = info.author;
rela.license = info.license;

// Export
module.exports = rela;
