'use strict';

const SocketServer = require('net').Server,
      EventEmitter = require('events'),
      handler = require('./handler');

/* lib/server.js
 * Server object.
 * * */

// Export server.
module.exports = Server;

// The server object, Rela.
function Server(opts){
  // Shorthand, no "new" required.
  if (!(this instanceof Server))
    return new Server(...arguments);

  if (typeof opts !== 'object')
    opts = {};

  this.clients = opts.dummies || [];
  this.server = opts.server || new SocketServer(handler.bind(this));
}

// Add EventEmitter functionality to all Rela instances.
Server.prototype = new EventEmitter();

// Shorthand listen.
Server.prototype.listen = function(){
  this.server.listen(...arguments);
};
