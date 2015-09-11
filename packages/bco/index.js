if (typeof console !== 'undefined' && console) {
  // Clone methods:
  var _console = new console.Console(process.stdout, process.stderr);

  var logdata = [];
  console.add = function(){
    logdata.push.apply(logdata, arguments);
    return this;
  };

  console.log = function(){
    if (arguments.length) {
      _console.log.apply(this, arguments);
    } else {
      _console.log.apply(this, logdata);
      logdata = [];
    }
    return this;
  };

  console.write = function(){
    Array.prototype.forEach.call(arguments.length ? arguments : logdata, function(item){
      process.stdout.write(item);
    });
    if (!arguments.length) logdata = [];
    return this;
  };

  console.encode = function(input){
    var build = [];
    Array.prototype.forEach.call(input, function(char){
      build.push(char.charCodeAt(0));
    });
    return new Buffer([0x1b].concat(build));
  }

  console.set = function(input){
    if (arguments.length) {
      console.write(console.encode(input));
    } else {
      Array.prototype.forEach.call(arguments, function(input){
        console.write(console.encode(input));
      });
    }
    return this;
  };

  // Implement chaining into original object's methods:
  console.info = function(){
    _console.info.apply(this, arguments);
    return this;
  };

  console.warn = function(){
    _console.warn.apply(this, arguments);
    return this;
  };

  console.exception =
  console.error = function(){
    _console.error.apply(this, arguments);
    return this;
  };

  console.dir = function(){
    _console.dir.apply(this, arguments);
    return this;
  };

  console.start =
  console.time = function(){
    _console.time.apply(this, arguments);
    return this;
  };

  console.end =
  console.stop =
  console.timeEnd = function(){
    _console.timeEnd.apply(this, arguments);
    return this;
  };

  console.trace = function(){
    _console.trace.apply(this, arguments);
    return this;
  };

  console.assert = function(){
    _console.assert.apply(this, arguments);
    return this;
  };
}
