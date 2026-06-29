var Config = function(lib, params){

  // Specified directory, or default?
  var base = (params.configPath || (process.env.HOME || process.env.APPDATA)) + "/.loud";

  // Check if directory exists, if not, create dat shit.
  lib.fs.exists(base, function(exists){
    if (exists) return;
    lib.fs.mkdir(base, 0777, function(err){
      if (err) console.log("LoudNode: Failed to make directory at " + base + " (insufficient permissions?)")
    });
  });
};

module.exports = exports = Config;
