'use strict';

/* lib/handshake.js
 * WebSocket handshake.
 * * */

module.exports = exports = function(){

};

exports._headers = function(raw){
  if (raw instanceof Buffer) raw = raw.toString('utf-8');
  let chunks = raw.split(/\r?\n/),
      headers = {}, chunk = null,
      toObj = /^(.+?):\s?/;

  for (let i = 1; i < chunks.length; i++) {
    chunk = chunks[i].split(toObj);
    headers[chunk[1].toLowerCase()] = chunk[2];
  }

  return Object.assign(chunks[0], headers);
};
