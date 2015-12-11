'use strict';

/* lib/index.js
 * Server object.
 * * */

// Export server
module.exports = Rela;

// The server object, Rela.
function Rela(){
  // Shorthand, no "new" required.
  if (!(this instanceof Rela))
    return new Rela(...arguments);


}

// Add EventEmitter functionality to all Rela instances.
Rela.prototype = require('events').EventEmitter;
