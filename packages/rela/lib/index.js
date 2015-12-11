'use strict';

/* lib/index.js
 * Library object.
 * * */

// Export library
module.exports = Rela;

function Rela(){
  // Shorthand, no "new" required.
  if (!(this instanceof Rela))
    return new Rela(...arguments);

}

// Add EventEmitter functionality to all Rela instances.
Rela.prototype = require('events').EventEmitter;
