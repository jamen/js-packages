(function(factory, g){

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory;
  }
  g.console = factory;

})(function(){

if (console) {
  // Clone methods
  var _console = {};
  for (var name in console) {
    _console[name] = console[name];
  }

  // Make original methods chainable:
  [
    'assert', 'count', 'debug',
    'dir', 'dirxml', 'error',
    'error', '_exception', 'group',
    'groupCollapsed', 'groupEnd', 'info',
    'log', 'profile', 'profileEnd',
    'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ].forEach(function(name){
    if (typeof console[name] !== 'undefined') {
      console[name] = function(){
        _console[name].apply(this, arguments);
        return this;
      };
    }
  });

  // Allow access to original methods:
  console.console = _console;

  // Node-specific
  if (typeof window === 'undefined') {
    
  }
}

return console;

}(), this);
