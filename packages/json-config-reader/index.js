(function(fs, path){
  "use strict";
  var Reader = {};

  Reader.__cache = {};

  Reader.read = function(file, call){
    file = path.normalize(file);

    if (typeof Reader.__cache[filename] !== "undefined") return Reader.__cache[filename];
    if (typeof call !== "undefined") {
      var config = {},
          error = null;

      fs.readFile(file, function(err, data){
        if (!err) {
          try {
            config = JSON.parse(data);
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
        return JSON.parse(fs.readFileSync(file));
      } catch (err) {
        return err;
      }
    }
  };

  module.exports = exports = Reader;
})(require("fs"),
   require("path"));
