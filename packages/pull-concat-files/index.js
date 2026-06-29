
module.exports = concat

function concat (path, sep) {
  var sent = false
  var buffers = []

  return function (read) {
    return function next (end, cb) {
      read(end, function (end, file) {
        if (!sent && end === true) { 
          sent = true
          return cb(null, {
            path,
            data: Buffer.concat(buffers)
          })
        } else if (end) {
          return cb(end)
        } 
       
        buffers.push(file.data)
        next(null, cb)
      })
    } 
  }
}

