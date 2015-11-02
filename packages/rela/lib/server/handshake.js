'use strict';

module.exports = function(client, data){
  client.shaking = true;
  let socket = client.socket;
  socket.write('Nice');
};
