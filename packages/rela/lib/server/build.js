'use strict';

const controller = require('./controller'),
      handshake = require('./handshake');

module.exports = function(client){
  this.emit('connection', client);

  client.socket.on('data', function(data){
    if (client.shaking) client.socket.end('Ayy lmao');
    else {
      if (!client.shook) handshake(client, data);
      else controller(client, data);
    }
  });

  client.socket.on('close', () => {
    client.emit('disconnect');
    this.emit('disconnection');
    this.clients.slice(client.id, 1);
    client.socket.destroy();
  });
};
