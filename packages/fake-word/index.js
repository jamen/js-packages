var combin = require('combin')

module.exports = word

var WEIRD = ['ij', 'ji', 'ae', 'ei', 'oi', 'ua', 'xi', 'ix', 'xu', 'ux', 'iy',
             'iv', 'ik', 'ih', 'uf', 'zi', 'iu', 'ig', 'ue', 'uy', 'iw', 'ib',
             'uq', 'iq']
var ALPHA = 'abcdefghijklmnopqrstuvwxyz'
var DOUBLE = /([bdeflmnopst])\1/
var ODDBALL = /[xyzwqv]/
var BAD_ENDING = /[fjkquvwxyz]/
function randBool () { return Math.random() > 0.5 }
function randChar () { return ALPHA[Math.floor(Math.random() * 26)] }
function vowel (char) { return 'aeiou'.indexOf(char) !== -1 }

function word (max, amount) {
  if (amount) {
    for (var words = []; amount--;)
      words.push(word(max))
    return words
  }

  var item = ''
  while (item.length < max) {
    var len = item.length
    var char = randChar()
    var prev1 = item[len - 1]
    var prev2 = item[len - 2]
    var isV = vowel(char)
    var isVPrev1 = vowel(prev1)
    var isVPrev2 = vowel(prev2)
    var pair = prev1 + char
    var dbl = DOUBLE.test(pair)

    // Triple consonants
    if (prev1 && prev2 && !isV && !isVPrev1 && !isVPrev2) continue

    // Tripple vowels
    if (prev1 && prev2 && isV && isVPrev1 && isVPrev2) continue

    // Weird consonant pairs like "xk" or "rv":
    if (!dbl && (prev1 === char || (!isV && !isVPrev1))) continue

    // Other weird vowel-vowel/vowel-consonant pairs
    if (WEIRD.indexOf(pair) !== -1) continue

    // Making sure there is vowel before/after double consonant
    // Things like "ppa", or "bba"
    if (dbl && !isV && (!len || len - 1 === max)) continue

    // We don't want a large amount of oddball characters
    if (ODDBALL.test(item) && ODDBALL.test(char)) continue

    // No bad endings
    if (len + 1 === max && BAD_ENDING.test(char)) continue

    // No character three times in a row
    if (char === prev1 === prev2) continue

    item += char
  }

  return item
}
