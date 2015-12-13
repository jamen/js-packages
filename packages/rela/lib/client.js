'use strict';

/* lib/client.js
 * The Client object.
 * * */

module.exports = Client;

function Client(socket){
  if (typeof socket !== 'object')
    throw new Error('Clients can only bind to Sockets');

  this._socket = socket;
  this.state = 'start';
}

Client.prototype.send = function(data){
  if (typeof data === 'object') data = JSON.stringify(data);
  this._socket.write(data);
};

Client.prototype = require('events').EventEmitter;
