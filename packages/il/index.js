'use strict';
function* iterate(nth, index) {
  let i = typeof index !== 'undefined' ? index : 0;
  while (true) {
    yield i++;
    if (i == nth) break;
  }
};

module.exports = iterate;
