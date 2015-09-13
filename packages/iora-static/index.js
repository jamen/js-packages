/*
 * iora-static: Implement a static aspect to a portion of your server.
 */

module.exports = function(app, config, express){
  if (config.static && config.base.static) {
    app.use(
      config.static.url || '/static',
      express.static(config.base.static, config.static.options)
    );
  }
};
