module.exports = free

function free (fn, apply) {
  if (apply) return fn.apply.bind(fn)
  return fn.call.bind(fn)
}
