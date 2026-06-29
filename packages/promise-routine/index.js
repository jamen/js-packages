module.exports = routine

/**
 * Run a promise-returning function multiple times,
 * in a routine.
 *
 * ```js
 * routine(promiseFunc, [...args])
 * ```
 *
 * Optionally supply context:
 * ```js
 * routine(foo.promiseFunc, [...args], foo)
 * ```
 */

function routine (fn, sets, context) {
  const master = []

  if (typeof context === 'undefined') {
    context = fn
  }

  for (const args of sets) {
    master.push(fn.apply(context, Array.isArray(args) ? args : [args]))
  }

  return Promise.all(master)
}
