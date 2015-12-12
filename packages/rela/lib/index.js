'use strict';

const Server = require('net').Server,
      handler = require('./handler');

/* lib/index.js
 * Server object.
 * * */

// Export server.
module.exports = Rela;

// The server object, Rela.
function Rela(opts){
  // Shorthand, no "new" required.
  if (!(this instanceof Rela))
    return new Rela(...arguments);

  if (typeof opts !== 'object')
    opts = {};

  this.clients = opts.dummies || [];
  this.server = opts.server || new Server(handler.bind(this));
}

// Add EventEmitter functionality to all Rela instances.
Rela.prototype = require('events').EventEmitter;

// Shorthand listen.
Rela.prototype.listen = function(){
  this.server.listen(...arguments);
};
