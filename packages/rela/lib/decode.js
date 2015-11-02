'use strict';

module.exports = function(bin){
  let data = {
    fin: !!(bin[0] >>> 7),
    masked: !!(bin[1] >>> 7),
  };
  data.opts = bin[0] - (data.fin ? 128 : 0) - data.reserves;
  data.reserves = ((bin[0] >>> 4) - (data.fin ? 8 : 0));

  let resume = 1;

  // Length
  data.length = bin[resume] & 127;
  resume = 2;
  if (data.length === 126) {
    data.length = data.length + bin[2] + bin[3];
    resume = 4;
  }
  if (data.length >= 127) {
    data.length = data.length + bin[2] + bin[3] + bin[4] + bin[5] + bin[6] + bin[7] + bin[8];
    resume = 9;
  }

  // Masking key
  data.masks = [0, 0, 0, 0];
  if (data.masked) {
    data.masks = [bin[resume], bin[resume + 1], bin[resume + 2], bin[resume + 3]];
    resume = resume + 4;
  }

  data.result = [];
  let i = 0;
  while (i < data.length) {
    data.result.push(bin[resume] ^ data.masks[i % 4]);
    i++; resume++;
  }
  data.result = new Buffer(data.result).toString();


  return data;
};
