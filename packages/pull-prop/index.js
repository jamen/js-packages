
const { get, set } = require('object-path')
const pull = require('pull-stream')
const { once, asyncMap, drain } = pull
const pushable = require('pull-pushable')

module.exports = prop

function prop (name, transform) {
  var pending = pushable()
  return asyncMap((obj, done) => {
    pull(
      once(get(obj, name)),
      transform(),
      drain(res => {
        set(obj, name, res)
        done(null, obj)
      }, err => {
        if (err) done(err)
      })
    )
  })
}

