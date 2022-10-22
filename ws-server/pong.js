const http = require("http");

const options = {
  port: process.env.TEST_PORT,
  path: "/",
  method: "GET",
};

console.log("WebSocket Server Configuration: ", options);

http
  .createServer(function (req, res) {
    console.log("Received request...");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("WebSocket server container is alive and reachable!");
    res.end();
  })
  .listen(options.port);
