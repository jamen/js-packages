(function(fs, path){
  'use strict';

  // Resources
  global.__objectCache = {};

  // Module
  module.exports = exports = {
    __objectCache: global.__objectCache,

    read: function(fileName){
      fileName = path.resolve(fileName);
      var fileDataRaw = null, fileData = null;

      // Try searching cache:
      if (typeof this.__objectCache[fileName] !== 'undefined') {
        return JSON.parse(JSON.stringify(this.__objectCache[fileName]));
      }

      // Try reading file:
      try {
        fileDataRaw = fs.readFileSync(fileName);
      } catch (e) {
        throw {'type':'read', 'original':e};
      }

      // Try parsing file data:
      try {
        fileData = JSON.parse(fileDataRaw);
        this.__objectCache[fileName] = fileData;
      } catch (e) {
        throw {'type':'parse', 'original':e};
      }

      return fileData;
    },

    purge: function(fileName){
      fileName = path.resolve(fileName);

      if (typeof fileName !== 'undefined') {
        // Purge specific cache:
        this.__objectCache[fileName] = undefined;
      } else {
        // Purge all cache:
        for (var id in this.__objectCache) {
          this.__objectCache[id] = undefined;
        }
      }

      return true;
    }
  };
})(require('fs'),
   require('path'));
