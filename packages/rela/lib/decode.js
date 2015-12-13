'use strict';

/* lib/decode.js
 * Decode WebSocket message frames.
 * * */

module.exports = function(raw){
  if (!(raw instanceof Buffer))
    raw = new Buffer(raw);

  let message = [],
      data = {},
      r = 0;

  data.fin = (128 & raw[r]);
  data.rsv = [(64 & raw[r]), (32 & raw[r]), (16 & raw[r])];
  data.opt = raw[r] ^ (data.fin + data.rsv[r++] + data.rsv[r++] + data.rsv[r]);
  data.masked = raw[1] >> 7;
  data.len = raw[1] - (data.masked ? 128 : 0);
  if (data.len === 126)
    data.len += raw[r++] + raw[r++];

  if (data.len === 127)
    data.len += raw[r++] + raw[r++] + raw[r++] + raw[r++] + raw[r++] + raw[r++];

  data.keys = [0, 0, 0, 0];
  if (data.masked)
    data.keys = [raw[r++], raw[r++], raw[r++], raw[r++]];

  for (let i = 0; i < data.len; i++) {
    message += String.fromCharCode(raw[r + i] ^ data.keys[i % 4]);
  }

  return Object.assign(new Buffer(message).toString(), data);
};
