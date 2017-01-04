module.exports = function (v) {
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
        // d;

        i<(~~(l/3)+1)*4;

        i++
    ){

    if(i<l)
      n=v[i].charCodeAt().toString(2)
      if(n.length<8)
        c=c+('00000000'.substr(n.length)+n)
        // for(d=8-n.length;d>0;--d)n=n+'0',c=c+n
      else
        c=c+n

      // c=c+(n.lenth<8?('00000000'.substr(n.length)+n):n)

    s=c.substr(u,6)
    r=r+m[parseInt(s,2)]
    u=u+6
  }

  // t=s.length
  // return r+(t<7?'==':t<8?'=':'')

  return r
}
