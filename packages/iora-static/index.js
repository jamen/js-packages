/*
 * iora-static: Implement a static aspect to a portion of your server.
 */

module.exports = function(app, config, iora, express){
  var path = require('path');
  if (config.static && config.base.static) {
    var base = config.base.static;
    if (!path.isAbsolute(base)) {
      base = path.join(iora.dir, base);
    }
    app.use(
      config.static.url || '/static',
      express.static(base, config.static.options)
    );
  }
};
