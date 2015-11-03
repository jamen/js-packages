'use strict';

const net = require('net'),
      tls = require('tls'),
      build = require('./build'),
      Client = require('../client'),
      EventEmitter = require('events');

let Server = function(secure, options){
  this.clients = [];
  this.domain = {'method': new EventEmitter()};
  this._events = new EventEmitter();

  let handler = (socket) => {
    let client = new Client(socket, this.domain);
    client.id = this.clients.length;
    this.clients.push(client);
    build.call(this, client);
  };

  this._server = secure ? new tls.Server(options) : new net.Server(options);
  this._server.on('connection', handler);
};

Server.prototype.on = function(){
  this._events.on.apply(this._events, arguments);
  return this;
};

Server.prototype.emit = function(){
  this._events.emit.apply(this._events, arguments);
  return this;
};

Server.prototype.listen = function(){
  this._server.listen.apply(this._server, arguments);
  return this;
};

module.exports = Server;
