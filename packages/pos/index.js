const p=32767,m=1073741823
exports.toLoc=function(x,y){return x>p||y>p?-1:x+(y<<15)}
exports.toPos=function(l){return l>m?[-1,-1]:[l&p,l>>15]}
