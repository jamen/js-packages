'use strict';

const decode = require('../decode');

module.exports = function(client, bufdata){
  let data = decode(bufdata);
  console.log(data);
};
