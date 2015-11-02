'use strict';

module.exports = function(){
  // Unchanging
  const decode = require('../lib').decode,
        clientMessage = new Buffer([129,140,163,113,103,158,235,20,11,242,204,81,16,241,209,29,3,191]);

  let decodedMessage = '';

  console.time('decode');
  decodedMessage = decode(clientMessage);
  console.timeEnd('decode');


  console.log('clientMessage: ' + clientMessage);
  console.log('decodedMessage: ' + decodedMessage);
};
