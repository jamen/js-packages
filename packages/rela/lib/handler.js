'use strict';

const Client = require('./client');

/* lib/handler.js
 * Handles net socket connections for rela.
 * * */

module.exports = function(socket){
  let client = new Client(socket);
  this.emit('connection', client);
};
