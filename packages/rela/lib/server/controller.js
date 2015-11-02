'use strict';

module.exports = function(client, data){
  client.write({'foo': 'bar'});
};
