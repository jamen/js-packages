'use strict';

const net = require('net'),
      tls = require('tls'),
      controller = require('./controller'),
      handshake = require('./handshake');

let Server = function(secure){
  this._bound = {};
  this._currentKey = 'method';
  this._clients = [];

  let handler = (socket) => {
    let client = {
      'socket': socket,
      'id': this._clients.length,
      'shook': false,
      'shaking': false
    };
    this._clients.push(client);

    client.socket.on('data', function(data){
      if (client.shaking) socket.end('Ayy lmao');
      else {
        if (!client.shook) handshake(client, data);
        else controller(client, data);
      }

    });

    client.socket.on('end', () => {
      this._clients.slice(client.id, 1);
      socket.destroy();
    });

  };

  this._server = secure ? new tls.Server() : new net.Server();
  this._server.on('connection', handler);
};

Server.prototype.use = function(key){
  this._currentKey = key;
  return this;
};

Server.prototype.on = function(data, callback){
  if (typeof this._bound[this._currentKey] !== 'undefined')
    this._bound[this._currentKey].push({'data': data, 'callback': callback});
  else
    this._bound[this._currentKey] = [{'data': data, 'callback': callback}];

  return this;
};

module.exports = Server;
