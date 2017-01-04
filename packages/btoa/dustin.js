var btoa = function (v) {
  v=v.split('')
  for(
    var i=0,
        l=v.length,
        n,
        c='',
        s,
        u=0,
        r='',
        m='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        t;

        i<(~~(l/3)+1)*4;

        i++
    ){

    if(i<l)
      n=v[i].charCodeAt().toString(2),
      c=c+('00000000'.substr(n.length)+n)

    s=c.substr(u,6);r=r+m[parseInt(s,2)];u=u+6
  }

  // t=s.length
  // return r+(t<7?'==':t<8?'=':'')

  return r
}

var wikipedia = 'Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.'

console.log(btoa(wikipedia))

module.exports = btoa
