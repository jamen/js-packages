'use strict';

const net = require('net'),
      tls = require('tls'),
      build = require('./build');

let Server = function(secure){
  this._bound = {};
  this._currentKey = 'method';
  this._clients = [];

  let handler = (socket) => {
    let client = {
      'socket': socket,
      'id': this._clients.length,
      'shook': false,
      'shaking': false,
      'on': socket.on.bind(socket),
      'write': function(input){
        if (typeof input === 'object' && !(input instanceof Buffer)) this.socket.write(JSON.stringify(input));
        else this.socket.write(input);
      },
      'end': socket.end.bind(socket)
    };

    this._clients.push(client);

    build.call(this, client);

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
