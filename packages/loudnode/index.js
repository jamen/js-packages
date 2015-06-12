module.exports = exports =
(function(){
  "use strict";
  var lib = require("./lib"),

  Loud = function(params){
    // Convert seperate params to an object.
    var convParams = params
    if (arguments.length > 1) convParams = {
      server: arguments[0],
      level: {
        number:arguments[1],
        name:arguments[2]
      }
    }

    if (!(this instanceof Loud)) return new Loud(convParams);

    this.params = convParams;

    // For scoping:
    var _loud = this;

    // Recreate user's custom request, plus new functions for forum middleware.
    this._events = {
      cache:{
        request: this.params.server._events.request
      }
    };

    this.params.server._events.request = function(req, res){
     res.write("ayy")
      _loud._events.cache.request.apply(this, arguments)
    }
  };

  return Loud;
}());
