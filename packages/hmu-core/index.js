var pull = require('pull-stream')
var paramap = require('pull-paramap')
var values = pull.values
var collect = pull.collect

module.exports = hmu
hmu.stream = stream
hmu.map = map

var NOOPTIONS = {}
var NOINPUT = []
function _noop () {}

/**
 * Run HMU requests and get raw output.
 * `requests` being an array of objects.
 *    { target: fn, input: [], options: {} }
 * `callback` being a function with params (err, res)
 * `res` being an array of arrays, in order of the requests.
 * Normally they are just some mapping/reduce of `input`
 */
function hmu (requests, callback) {
  if (!callback) callback = _noop
  pull(stream(requests), collect(callback))
}

/**
 * Lets me use this as a pull-stream:
 * ```js
 * pull(hmu.stream(requests), ...)
 * ```
 */
function stream (requests) {
  return pull(values(requests), paramap(map))
}

/**
 * Paramap function maps requests to results
 * Maps `target(input, options, done)` (items of `request`).
 * Makes plugins highly reusable in this form.
 */
function map (req, callback) {
  req.target(req.input || NOINPUT, req.options || NOOPTIONS, callback)
}
