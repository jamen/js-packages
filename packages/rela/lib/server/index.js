'use strict';

const net = require('net'),
      tls = require('tls'),
      build = require('./build'),
      Client = require('../client'),
      EventEmitter = require('events');

let Server = function(secure){
  this._connectionListener = ()=>{};
  this.clients = [];
  this.domain = {'method': new EventEmitter()};

  let handler = (socket) => {
    let client = new Client(socket, this.domain);
    client.id = this.clients.length;
    this.clients.push(client);
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
