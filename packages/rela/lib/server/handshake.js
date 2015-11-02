'use strict';

const crypto = require('crypto');

module.exports = function(client, bufdata){
  client.shaking = true;
  let data = bufdata.toString(),
      header = data.split(/\r\n\r\n/)[0],
      wskey = header.match(/(?:^|\r\n|\r|\n)Sec-WebSocket-Key: (.+)(?:$|\r\n|\r|\n)/i);

  if (wskey) wskey = wskey[1];
  else {
    client.end('No no!');
    return;
  }

  let hash = crypto.createHash('sha1');
  hash.update(wskey + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
  let reskey = hash.digest('base64');
};
