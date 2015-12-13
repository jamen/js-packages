'use strict';

const decode = require('./decode');

/* lib/message.js
 * Handle websocket messages appropriately
 * * */

module.exports = function(data){
  let message = decode(data),
      event = exports._evt[message[0].opt] || 'unknown';

  this.emit('data', message[0], message[1]);
  this.emit(event, message[0], message[1]);
};

exports._evt = [
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
