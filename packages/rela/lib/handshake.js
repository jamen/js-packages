'use strict';

const crypto = require('crypto');

/* lib/handshake.js
 * WebSocket handshake.
 * * */

module.exports = exports = function(data){
  let headers = exports._headers(data);
  let sha1 = crypto.createHash('sha1');
  sha1.update(headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');

  let resp = exports._headers({
    Upgrade: 'websocket',
    Connection: 'Upgrade',
    'Sec-WebSocket-Accept': sha1.digest('base64'),
  });

  this.send(resp);

  this.emit('handshake-done');
};

exports._headers = function(raw){
  // Parsing
  if (typeof raw === 'string' || raw instanceof Buffer) {
    if (raw instanceof Buffer) raw = raw.toString('utf-8');
    let chunks = raw.split(/\r?\n/),
        headers = { 0:chunks[0] }, chunk = null,
        toObj = /^(.+?):\s?/;

    for (let i = 1; i < chunks.length - 1; i++) {
      chunk = chunks[i].split(toObj);
      if (chunk[1] && chunk[2]) headers[chunk[1].toLowerCase()] = chunk[2];
    }

    return headers;
  }

  // Building
  else if (typeof raw === 'object' || !(raw instanceof Buffer)) {
    let val = null,
        result = '';

    if (typeof raw[0] !== 'undefined') {
      result += raw[0] + '\r\n';
    } else {
      result += 'HTTP/1.1 101 Switching Protocols\r\n';
    }

    for (let key in raw) {
      if (typeof key !== 'string') continue;
      val = raw[key];
      result += key + ': ' + val + '\r\n';
    }

    return result + '\r\n';
  }
};
