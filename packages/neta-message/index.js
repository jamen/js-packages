var methods = require('./methods');
var uuid = require('uuid');

exports.resolveType = function resolveType(input) {
  for (var i = 0, max = methods.length; i < max; i++) {
    var method = methods[i];
    if (method[0] === input || method[1] === input) {
      return method;
    }
  }

  return null;
}

var n = {};
exports.encode = function encode(type, body, id) {
  var readtype = exports.resolveType(type);
  if (!readtype || readtype[1] < 0 || readtype[1] > 65535) {
    return null;
  }

  var message = new Buffer(18 + body.length);
  if (id) {
    message.write(id);
  } else {
    uuid.v4(n, message);
  }
  message.writeInt16LE(readtype[1], 16);
  message.write(body, 18);
  return message;
};

exports.decode = function decode(buf) {
  if (!buf || buf.length < 18) {
    return null;
  }

  var id = buf.slice(0, 16);
  var type = buf.readUIntLE(16);
  var readtype = exports.resolveType(type);
  var body = buf.slice(18);

  if (!readtype || readtype[0] < 0 || readtype[0] > 65535) {
    return null;
  }

  return {
    id: id,
    type: readtype[0],
    body: body
  };
};
