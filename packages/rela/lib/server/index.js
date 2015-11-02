'use strict';

const net = require('net'),
      tls = require('tls'),
      handler = require('./handler')
      handshake = require('./handshake');

let Server = function(secure){
  this._bound = {};
  this._currentKey = 'method';
  this._server = secure ? new tls.Server() : new net.Server();
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
