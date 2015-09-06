module.exports = exports = function(app, express, config){
  if (typeof config.static !== 'undefined') {
    app.use(
      config.static.url || '/static',
      express.static(config.static.folder, config.static.options)
    );
  }
};
