'use strict';

const decode = require('../decode');

module.exports = function(client, bufdata){
  let result = decode(bufdata).rawResult;
  try {
    result = JSON.parse(result);
  } catch(e) {
    client.emit('_error', client, e);
    return;
  }

  for (let key in result) {
    if (typeof client._domains[key] !== 'undefined') {
      client._domains[key].emit(result[key], result);
    }
  }
};
