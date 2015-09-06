module.exports = exports = function(app, express, config){
  if (typeof config.static !== 'undefined') {
    config = config.static;
    app.use(
      config.url || '/static',
      express.static(config.folder, config.options)
    );
  }
};
