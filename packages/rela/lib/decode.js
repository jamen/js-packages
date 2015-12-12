'use strict';

/* lib/decode.js
 * Decode WebSocket message frames.
 * * */

module.exports = function(raw){
  if (!(raw instanceof Buffer))
    raw = new Buffer(raw);

  let message = [],
      data = {};

  // TODO: decode

  return Object.assign(new Buffer(message), data);
};
