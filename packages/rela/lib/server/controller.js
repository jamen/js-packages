'use strict';

const decode = require('../decode');

module.exports = function(client, bufdata){
  let result = decode(bufdata).rawResult;
  try {
    result = JSON.parse(result);
  } catch(e) {
    client.throw('invalid json', client, e);
    return;
  }

  for (let key in result) {
    if (typeof client.domain[key] !== 'undefined') {
      client.domain[key].emit(result[key], result);
    }
  }
};
