'use strict';

/* lib/index.js
 * Server object.
 * * */

// Export server
module.exports = Rela;

// The server object, Rela.
function Rela(opts){
  // Shorthand, no "new" required.
  if (!(this instanceof Rela))
    return new Rela(...arguments);

  if (typeof opts !== 'object')
    opts = {};
}

// Add EventEmitter functionality to all Rela instances.
Rela.prototype = require('events').EventEmitter;
