'use strict';

const Value = require('rpv').Value;

let parse = module.exports = function(input){
  if (!(input instanceof Buffer)) input = new Buffer(input);

  let val = [], unit = [], i = 0, state = true;


  // If the state is true it's collecting the number
  // if it's false, it's collecting the unit.
  input.forEach(function(byte){
    if (byte >= 48 && byte <= 57 && state) {
      val.push(byte);
    } else {
      if (state) state = false;
      unit.push(byte);
    }
  });
  val = new Buffer(val);
  unit = new Buffer(unit).toString();

  // TODO: parse CSS functions

  if (val.length && unit) return new Value(parseInt(val), unit);
  else if (unit) return new Value(unit);
};

console.log(parse('none'));
