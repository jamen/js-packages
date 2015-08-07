(function(fs, path){
  "use strict";
  var Reader = {};

  Reader.__cache = {};

  Reader.read = function(file, call){
    var file = path.resolve(file),
        config = {},
        error = null;

    if (typeof call !== "undefined") {
      if (typeof Reader.__cache[file] !== "undefined") {
        call(error, Reader.__cache[file]);
        return config;
      };
      fs.readFile(file, function(err, data){
        if (!err) {
          try {
            config = JSON.parse(data);
            Reader.__cache[file] = config;
          } catch (err) {
            error = err;
          }

        } else {
          error = err;
        }
        call(error, config);

      });

    } else {
      if (typeof Reader.__cache[file] !== "undefined") return Reader.__cache[file];
      try {
        config = JSON.parse(fs.readFileSync(file));
        Reader.__cache[file] = config;
        return config;
      } catch (err) {
        return err;
      }
    }
  };

  Reader.purgeCache = function(file){
    /* Since I've heard delete is really slow, I'm not sure what to do here for now, I'll just set it to undefined: */
    if (typeof file !== "undefined") {
      Reader.__cache[path.resolve(file)] = undefined;
    } else {
      for (var i in Reader.__cache) {
        Reader.__cache[i] = undefined;
      }
    }
  };

  module.exports = exports = Reader;
})(require("fs"),
   require("path"));
