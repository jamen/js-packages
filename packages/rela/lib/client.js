'use strict';

/* lib/client.js
 * The Client object.
 * * */

module.exports = Client;

function Client(socket){
  if (typeof socket !== 'object')
    throw new Error('Clients can only bind to Sockets');
}

Client.prototype = require('events').EventEmitter;
