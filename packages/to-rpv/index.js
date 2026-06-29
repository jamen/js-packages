'use strict';

const rpv = require('rpv'),
      fs = require('fs'),
      lib = require('./lib');

const convert = module.exports = function(buffer){
  if (!(buffer instanceof Buffer)) buffer = new Buffer(buffer);


};

convert.fromFile = function(path, callback){
  fs.readFile(path, function(err, data){
    if (err) callback(err, null);
    else {
      try { callback(convert(null, data)); }
      catch (e) { callback(e, null); }
    }
  });
};

convert.value = lib.value;
convert.property = lib.property;
convert.rule = lib.rule;
