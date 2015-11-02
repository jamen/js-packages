'use strict';

module.exports = function(bin){
  let data = {};
  data.fin = !!(bin[0] >>> 7);
  data.reserves = ((bin[0] >>> 4) - (data.fin ? 8 : 0));
  data.opts = bin[0] - (data.fin ? 128 : 0) - data.reserves;
  data.masked = !!(bin[1] >>> 7);

  console.log(data);

  return data;
};
