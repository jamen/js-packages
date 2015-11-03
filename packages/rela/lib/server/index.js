'use strict';

const net = require('net'),
      tls = require('tls'),
      EventEmitter = require('events'),
      build = require('./build'),
      encode = require('../encode');

let Server = function(secure){
  this._connectionListener = ()=>{};
  this._clients = [];

  let handler = (socket) => {
    let client = {
      'socket': socket,
      'id': this._clients.length,
      'shook': false,
      'shaking': false,
      'write': function(input){
        if (typeof input === 'object' && !(input instanceof Buffer)) {
          if (this.shook) this.socket.write(encode(JSON.stringify(input)));
          else this.socket.write(JSON.stringify(input));
        } else {
          if (this.shook) this.socket.write(encode(input));
          else this.socket.write(input);
        }
      },
      'end': socket.end.bind(socket),
      _domains: {'method': new EventEmitter()},
      _currentKey: 'method',
      use:function(key){
        this._currentKey = key;
        if (typeof this._domains[key] === 'undefined') this._domains[key] = new EventEmitter();
        return this;
      },
      on: function(){
        return this._domains[this._currentKey].on.apply(this._domains[this._currentKey], arguments);
      },
      emit: function(){
        return this._domains[this._currentKey].emit.apply(this._domains[this._currentKey], arguments);
      }
    };

    this._clients.push(client);

    build.call(this, client);

  };

  this._server = secure ? new tls.Server() : new net.Server();
  this._server.on('connection', handler);
};

Server.prototype.connection = function(call){
  this._connectionListener = call || ()=>{};
};

Server.prototype.listen = function(){
  this._server.listen.apply(this._server, arguments);
};

module.exports = Server;
