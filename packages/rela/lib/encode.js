'use strict';

module.exports = function(bin, opt){
  let data = [], resume = 0;

  if (!(bin instanceof Buffer)) bin = new Buffer(bin);

  if (typeof opt !== 'undefined') opt = module.exports.optCodes[opt] || 1;
  else opt = 1;

  data[resume++] = 0b10000000 | opt;

  if (bin.length <= 125) data[resume++] = bin.length;
  else if (126 <= bin.length <= 65535) {
    data[resume++] = 126;
    data[resume++] = bin.length >> 8;
    data[resume++] = bin.length;
  }
  else if (bin.length > 65535){
    data[resume++] = 127;
    data[resume++] = bin.length >> 56;
    data[resume++] = bin.length >> 48;
    data[resume++] = bin.length >> 40;
    data[resume++] = bin.length >> 32;
    data[resume++] = bin.length >> 24;
    data[resume++] = bin.length >> 16;
    data[resume++] = bin.length >> 8;
    data[resume++] = bin.length;
  }

  data = new Buffer(data);

  return Buffer.concat([data, bin]);
};

module.exports.optCodes = {
  'continued': 0,
  'text': 1,
  'binary': 2,
  'close': 8,
  'ping': 9,
  'pong': 10
};
