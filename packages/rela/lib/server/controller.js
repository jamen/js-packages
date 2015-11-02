'use strict';

module.exports = function(client, data){
  let socket = client.socket;
  socket.write('Congratz');
};
