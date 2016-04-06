'use strict';

function routine(fn, sets, context) {
  const Promise = routine.Promise;
  const master = [];

  if (typeof fn !== 'function') {
    return Promise.reject(new Error('The first argument must be a function.'));
  }

  if (typeof context === 'undefined') {
    context = fn;
  }

  for (const args of sets) {
    master.push(fn.apply(context, Array.isArray(args) ? args : [args]));
  }

  return Promise.all.call(Promise, master);
}

routine.Promise = Promise;

module.exports = routine;
