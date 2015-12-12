'use strict';

const Client = require('./client'),
      decode = require('./decode');

/* lib/handler.js
 * Handles net socket connections for rela.
 * * */

module.exports = function(socket){
  let client = new Client(socket);
  this.clients.push(client);
  this.emit('connection', client);

  client._socket.on('data', (data) => {
    let ws = decode(data);
  });
};
