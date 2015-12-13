'use strict';

const crypto = require('crypto');

/* lib/handshake.js
 * WebSocket handshake.
 * * */

module.exports = exports = function(data){
  if (this.state === 'start') {
    let headers = exports._headers(data);
    console.log(headers['sec-websocket-key']);
  } else if (this.state === 'handshake:response') {

  }
};

exports._headers = function(raw){
  if (raw instanceof Buffer) raw = raw.toString('utf-8');
  let chunks = raw.split(/\r?\n/),
      headers = { 0:chunks[0] }, chunk = null,
      toObj = /^(.+?):\s?/;

  for (let i = 1; i < chunks.length - 1; i++) {
    chunk = chunks[i].split(toObj);
    if (chunk[1] && chunk[2]) headers[chunk[1].toLowerCase()] = chunk[2];
  }

  return headers;
};
