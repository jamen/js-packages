var alpha = 'abcdefghijklmnopqrstuvwxyz'
var through = function () { return true }

function combin (max, set, rule) {
  if (typeof set === 'function') rule = set, set = alpha
  if (!set) set = alpha
  if (!rule) rule = through

  for (
    var i = 0, len = set.length, last = max - 1,
        A = len > 65535 ? Uint32Array : len > 255 ? Uint16Array : Uint8Array,
        indexes = new A(max).fill(0), result = [], item = '';
    indexes[0] < len;
    indexes[last]++, item = ''
  ) {
    for (var c = max; c--; item = set[indexes[c]] + item) {
      if (c && indexes[c] === len) {
        indexes[c] = 0
        indexes[c - 1]++
      }
    }
    if (item.length === max && (rule ? rule(item) : true)) {
      result.push(item)
    }
  }

  return result
}

module.exports = combin
