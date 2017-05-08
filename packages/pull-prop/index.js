
const { get, set } = require('object-path')
const { map } = require('pull-stream')

module.exports = prop

function prop (name) {
  var pending = []

  // Select the property
  var select = map(obj => {
    pending.push(obj)
    return get(obj, name)
  })

  var replace = map(result => {
    var obj = pending.pop()
    set(obj, name, result)
    return obj
  }) 

  return { select, replace }
}

