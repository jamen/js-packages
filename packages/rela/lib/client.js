'use strict';

const encode = require('./encode'),
      EventEmitter = require('events');

let Client = function(socket, domain){
  this.socket = socket || {};
  this.domain = domain || this.domain;
  this.shook = false;
  this.shaking = false;
  this._currentKey = 'method';

};

Client.prototype.write = function(input){
  if (typeof input === 'object' && !(input instanceof Buffer)) {
    if (this.shook) this.socket.write(encode(JSON.stringify(input)));
    else this.socket.write(JSON.stringify(input));
  } else {
    if (this.shook) this.socket.write(encode(input));
    else this.socket.write(input);
  }
};

Client.prototype.end = function(){
  return this.socket.end.apply(this.socket, arguments);
};

Client.prototype.use = function(key){
  this._currentKey = key;
  if (typeof this.domain[key] === 'undefined') this.domain[key] = new EventEmitter();
  return this;
};

Client.prototype.on = function(){
  return this.domain[this._currentKey].on.apply(this.domain[this._currentKey], arguments);
};

Client.prototype.emit = function(){
  return this.domain[this._currentKey].emit.apply(this.domain[this._currentKey], arguments);
};

Client.prototype.domain = {};

module.exports = Client;
