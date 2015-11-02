'use strict';

module.exports = function(){
  const Server = require('../lib/server');
  let test = new Server();
  test.on('kek', function(a){
    console.log('a');
  });
  console.log(test);
};
