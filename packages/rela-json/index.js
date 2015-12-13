'use strict';

/* rela-json
 * JSON-event middleware for rela.
 * * */

module.exports = function(server, Server){
  let key = 'method';
  Server.prototype.select = function(other){
    key = other;
  };

  server.on('connection', function(client){
    client.on('text', function(message){
      let parsed = null;
      try {
        parsed = JSON.parse(message);
      } catch (e) {
        server.emit('invalid json', message, client);
        return;
      }

      if (typeof parsed[key] === 'undefined') client.emit(parsed[key], parsed);
      else client.emit('_nokey', parsed);
    });
  });
};
