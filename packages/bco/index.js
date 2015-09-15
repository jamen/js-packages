(function(product, g){

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = product;
  }
  g.console = product;

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
        if (arguments.length) {
          _console[name].apply(this, arguments);
        } else {
          _console[name].apply(this, console._added);
          console._added = [];
        }
        return this;
      };
    }
  });

  console._added = [];
  console.add = function(input){
    Array.prototype.forEach.call(arguments, function(i){
      console._added.push(i);
    });
    return this;
  };

  // Allow access to original methods:
  console.console = _console;

  // Node-specific
  if (typeof window === 'undefined' && typeof process !== 'undefined') {
    console.encode = function(input){
      var collection = [];
      Array.prototype.forEach.call(input, function(item){
        collection.push(item.charCodeAt(0));
      });
      return collection;
    };

    console.write = function(){
      if (arguments.length) {
        Array.prototype.forEach.call(arguments, function(item){
          process.stdout.write(item);
        });
      } else {
        Array.prototype.forEach.call(console._added, function(item){
          process.stdout.write(item);
        });
        console._added = [];
      }
      return this;
    };

    console.set = function(input){
      input = this.encode(input);
      this.write(new Buffer([0x1b].concat(input)));
      return this;
    };

    console.add.set = function(input){
      input = console.encode(input);
      console.add(new Buffer([0x1b].concat(input)));
      return console;
    };

  }
}

return console;

}(), this);
