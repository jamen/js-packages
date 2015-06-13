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
    };

    // Loosen up object constructing.
    if (!(this instanceof Loud)) return new Loud(convParams);

    // Once we're sure it's a object, set the params to the object for scoping and reusability.
    this.params = convParams;
    var _loud = this;

    // Recreate user's custom request, plus new functions for forum middleware.
    this._request = this.params.server._events.request;
    this.params.server._events.request = function(req, res){
      res.write("LoudNode insert test. ");
      _loud._request.apply(this, arguments);
    }
  };

  return Loud;
}());
