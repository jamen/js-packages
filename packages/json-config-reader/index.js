(function(fs, path){
  "use strict";
  var Reader = {};

  global.__jsoncache = global.__jsoncache || {};

  Reader.read = function(file, call){
    var file = path.resolve(file),
        config = {},
        error = null;

    if (typeof call !== "undefined") {
      if (typeof global.__jsoncache[file] !== "undefined") {
        call(error, global.__jsoncache[file]);
        return config;
      };
      fs.readFile(file, function(err, data){
        if (!err) {
          try {
            config = JSON.parse(data);
            global.__jsoncache[file] = config;
          } catch (err) {
            error = {"type":"parse", "message":"Failed to parse file as JSON!", "raw":err};
          }

        } else {
          error = {"type":"read", "message":"Failed to read file!", "raw":err};
        }
        call(error, config);

      });

    } else {
      if (typeof global.__jsoncache[file] !== "undefined") return global.__jsoncache[file];
      try {
        config = JSON.parse(fs.readFileSync(file));
        global.__jsoncache[file] = config;
        return config;
      } catch (err) {
        if (err instanceof SyntaxError) {
          error = {"type":"parse", "message":"Failed to parse file as JSON!"};
        } else {
          error = {"type":"parse", "message":"Failed to read file!"};
        }
        error.__readerFail = true;
        error.raw = err;
        return error;
      }
    }
  };

  Reader.purgeCache = function(file){
    /* Since I've heard delete is really slow, I'm not sure what to do here for now, I'll just set it to undefined: */
    if (typeof file !== "undefined") {
      global.__jsoncache[path.resolve(file)] = undefined;
    } else {
      for (var i in global.__jsoncache) {
        global.__jsoncache[i] = undefined;
      }
    }
  };

  module.exports = exports = Reader;
})(require("fs"),
   require("path"));
