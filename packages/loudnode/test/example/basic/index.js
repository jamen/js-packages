var http = require("http"),
    server = http.createServer(handler),
    loud = require("../../../")({
      server: server,
      configPath: __dirname
      /* Future params here */
    });

function handler(req, res) {
  res.end("Just testing. :>")
};

server.listen(1881, function(){
  console.log("Test server online ( http://localhost:1881/ )");
});
