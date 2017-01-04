var n='',m='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',a=n.charCodeAt.call.bind(n.charCodeAt);
module.exports=function btoa(s){for(var i=0,q=s.length,r=n,x,y,z;i<q;x=s[i++],x=x&&a(x),y=s[i++],y=y&&a(y),z=s[i++],z=z&&a(z),r+=(x?m[x>>2]:n)+(x?m[((x&3)<<4)+(y>>4)]:n)+(y?m[((y&15)<<2)+(z>>6)]:'=')+(z?m[z&63]:'='));return r}
