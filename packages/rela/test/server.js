'use strict';

module.exports = function(){
  const Server = require('../lib/server');
  let test = new Server();

  test._server.listen(8000)
};
