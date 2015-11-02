'use strict';

module.exports = function(){
  // Unchanging
  const decode = require('../lib').decode,
        clientMessage = '';

  let decodedMessage = '';

  console.time('decode');
  decodedMessage = decode(clientMessage);
  console.timeEnd('decode');


  console.log('clientMessage: ' + clientMessage);
  console.log('decodedMessage: ' + decodedMessage);
};
