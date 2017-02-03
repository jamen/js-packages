var alpha = 'abcdefghijklmnopqrstuvwxyz'

function gen (set, test) {
  if (!test) test = set, set = alpha
  var len = set.length
  var res = []

  for (var x = 0, y = 0, z = 0; x < len; z++) {
    if (z === len) z = 0, y++
    if (y === len) y = 0, x++
    var word = alpha[x] + alpha[y] + alpha[z]
    if (test(word)) res.push(word)
  }

  return res
}

// Generate every combo that contains "a"
console.log(gen(word => word.indexOf('a') !== -1).join(' '))
