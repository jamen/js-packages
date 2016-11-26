var fargs = require('fast-args')
var waterfall = require('async-waterfall')

module.exports = intercept

function intercept (emitter, event, handler) {
  var _intercept = emitter._intercept
  var emit = emitter.emit.bind(emitter)

  // This replaces `emit`, intercepts the events.
  function intercepter (eventName) {
    var data = fargs(arguments, 1)
    var interceptChain = _intercept[eventName]
    // Pass arguments through intercepts.
    if (interceptChain) {
      var pass = function (done) { done(null, data) }
      waterfall([pass].concat(interceptChain), function (err, data) {
        if (err && err !== true) return emit('error', err)
        if (err) return
        // Emit result
        data.unshift(eventName)
        emit.apply(emitter, data)
      })
    } else {
      data.unshift(eventName)
      emit.apply(emitter, data)
    }
  }

  // Add intercepter if not added already.
  if (typeof _intercept !== 'object' || _intercept === null) {
    _intercept = emitter._intercept = {}
    emitter.emit = intercepter
  }

  // Add listener to chain
  if (!_intercept[event]) _intercept[event] = []
  emitter._intercept[event].push(handler)

  return emitter
}
