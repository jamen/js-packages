function routine(fn, ...sets) {
  if (typeof fn !== 'function') {
    return Promise.reject(new Error('The first argument must be a function.'));
  }

  const Prom = routine.Promise;
  const master = [];

  for (const args of sets) {
    master.push(fn(...args));
  }
  return Prom.all.call(Prom, master);
}

routine.Promise = Promise;

export default routine;
