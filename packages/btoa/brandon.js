module.exports = encode

var SIX   = '000000'
var EIGHT = '00000000'
var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
function encodeByte(byte) {
  var encoded = ''
  var pattern = ''
  var i = byte.length
  while (i--) {
    var char = byte[i]
    var code = char ? char.charCodeAt() : null
    var octet = char ? code.toString(2) : SIX
    octet = EIGHT.substr(octet.length) + octet
    pattern = octet + pattern
  }
  i = 4
  while (i--) {
    var slice = pattern.slice(6 * i, 6 * (i + 1))
    var char = '='
    if (slice !== SIX) {
      var index = parseInt(slice, 2)
      char = CHARS[index]
    }
    encoded = char + encoded
  }
  return encoded
}
function encode(value) {
  var encoded = ''
  var i = Math.ceil(value.length / 3) * 3
  while (i) {
    var j = 3
    i-=j
    var s = []
    while (j--)
      s[j] = value[i+j]
    encoded=encodeByte(s)+encoded
  }
  return encoded
}
