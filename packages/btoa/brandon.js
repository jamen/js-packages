module.exports = btoa

var u=Math.ceil,c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',e='00000000'
function btoa(v){for(var i=0,r='',p='',s=u(v.length/3),m=s*4,x,y,z,b;i<m;i++)i<s*3&&(x=v[i],y=x?x.charCodeAt():0,b=y?y.toString(2):e,p+=y?e.substr(b.length)+b:b),z=p.substr(i*6,6),z&&(r+=z!=='000000'?c[parseInt(z,2)]:'=');return r}

// var ceil = Math.ceil
// var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
//
// function btoa(value) {
//   var result = ''
//   var pattern = ''
//   var segments = Math.ceil(value.length / 3) * 3
//   for (var i = 0, max = segments * 4 / 3; i < max; i++) {
//     if (i < segments) {
//       var char = value[i]
//       var code = char ? char.charCodeAt() : null
//       var binary = code ? code.toString(2) : '00000000'
//       var octet  = code ? '00000000'.substr(binary.length) + binary : binary
//       pattern += octet
//     }
//     var segment = pattern.substr(i * 6, 6)
//     if (segment) {
//       var char = '='
//       if (segment !== '000000') {
//         var index = parseInt(segment, 2)
//         char = CHARS[index]
//       }
//       result += char
//     }
//   }
//   return result
// }
