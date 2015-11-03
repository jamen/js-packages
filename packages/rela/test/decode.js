'use strict';

module.exports = function(){
  const decode = require('../lib/decode'),
        wsencoded = new Buffer([129,140,163,113,103,158,235,20,11,242,204,81,16,241,209,29,3,191]);

  let wsdecoded = '';

  console.time('decode');
  wsdecoded = decode(wsencoded);
  console.timeEnd('decode');

  console.log('From: ' + wsencoded.toString());
  console.log('To: ' + wsdecoded.result);
};
