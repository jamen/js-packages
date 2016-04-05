'use strict';

module.exports = function sate(input, operation) {
  const stack = [];
  for (let i = 0, len = input.length; i < len; i++) {
    for (const output of operation(input[i], i, stack)) {
      stack.push(output);
    }
  }
  return stack;
};
