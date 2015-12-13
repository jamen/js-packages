'use strict';

/* lib/decode.js
 * Decode WebSocket message frames.
 * * */

module.exports = function(raw){
  if (!(raw instanceof Buffer))
    raw = new Buffer(raw);

  let message = [],
      data = {};

  data.fin = !!(128 & raw[0]);
  data.rsv = [!!(64 & raw[0]), !!(32 & raw[0]), !!(16 & raw[0])];

  return Object.assign(new Buffer(message).toString(), data);
};
