module.exports = btoa

var u=Math.ceil,c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',e='00000000'
function btoa(v){for(var i=0,r='',p='',s=u(v.length/3),m=s*4,x,y,z,b;i<m;i++)i<s*3&&(x=v[i],y=x?x.charCodeAt():0,b=y?y.toString(2):e,p+=y?e.substr(b.length)+b:b),z=p.substr(i*6,6),z&&(r+=z!=='000000'?c[parseInt(z,2)]:'=');return r}
