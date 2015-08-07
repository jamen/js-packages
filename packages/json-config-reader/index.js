(function(fs, path){
  "use strict";
  var Reader = {};

  Reader.__cache = {};

  Reader.read = function(file, call){
    var file = path.normalize(file),
        config = {},
        error = null;

    if (typeof Reader.__cache[filename] !== "undefined") return Reader.__cache[filename];
    if (typeof call !== "undefined") {

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
      try {
        config = JSON.parse(fs.readFileSync(file));
        Reader.__cache[file] = config;
        return config;
      } catch (err) {
        return err;
      }
    }
  };

  module.exports = exports = Reader;
})(require("fs"),
   require("path"));
