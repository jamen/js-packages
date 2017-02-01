var n = '',
    m = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    a = n.charCodeAt.call.bind(n.charCodeAt)

module.exports = function btoa (s) {
  for (
    var i = 0,
        q = s.length,
        r = n,
        w, x, y;

        i < q;

        w = (a(s,i++) << 16) + ((x = a(s, i++)) << 8) + ((y = a(s, i++)) || 0),
        r += (m[w >> 18] || n) + (m[(w & 258048) >> 12] || n) + ( x ? m[(w & 4032) >> 6] : '=') + (y ? m[w & 63] : '=')
    );
  return r
}
