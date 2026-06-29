/* Library wrapper. */
module.exports = exports = {
  /* Custom */
  config: require("./config"),

  /* Dependencies */
  fs: require("fs"),
  mst: require("mustache"),
  io: require("socket.io")
}
