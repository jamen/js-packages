module.exports = function (v) {
  var l=v.length,i=(~~(l/3)+1)*4,e=l,n,c='',s,u=0,r='',m='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',t
    while(--i){
      if(e-->0)n=v[l-e-1].charCodeAt().toString(2),c=c+('00000000'.substr(n.length)+n);s=c.substr(u,6);r=r+m[parseInt(s,2)];u=u+6
    }
    t=s.length
    return r+(t<7?'==':t<8?'=':'')
  }
}
