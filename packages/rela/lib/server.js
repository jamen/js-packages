'use strict';

const SocketServer = require('net').Server,
      EventEmitter = require('events'),
      Client = require('./client'),
      handshake = require('./handshake'),
      message = require('./message');

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

  this.server = opts.server || new SocketServer(socket => {
    let client = new Client(socket);
    this.clients.push(client);
    this.emit('connection', client);

    client._socket.once('data', handshake.bind(client));
    client.on('handshake-done', () => {
      client._socket.on('data', message.bind(client));
    });
  });
}

// Add EventEmitter functionality to all Rela instances.
Server.prototype = new EventEmitter();

// Load middleware
Server.prototype.use = function(middleware){
  middleware(this, Server, Client);
};

// Shorthand listen.
Server.prototype.listen = function(){
  this.server.listen(...arguments);
};
