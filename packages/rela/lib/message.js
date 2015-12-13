'use strict';

const decode = require('./decode');

/* lib/message.js
 * Handle websocket messages appropriately
 * * */

module.exports = function(data){
  let message = decode(data),
      type = exports._opts[message.opt] || 'unknown';

  this.emit(type, message + '', type);
};

exports._opts = [
  'stream',
  'text',
  'binary',
  '_reserved',
  '_reserved',
  '_reserved',
  '_reserved',
  'close',
  'ping',
  'pong',
  '_reserved',
  '_reserved',
  '_reserved',
  '_reserved',
  '_reserved'
];
