'use strict';

const controller = require('./controller'),
      handshake = require('./handshake');

module.exports = function(client){
  this._connectionListener(client);

  client.socket.on('data', function(data){
    if (client.shaking) client.socket.end('Ayy lmao');
    else {
      if (!client.shook) handshake(client, data);
      else controller(client, data);
    }
  });

  client.socket.on('end', () => {
    this.clients.slice(client.id, 1);
    client.socket.destroy();
  });
};
