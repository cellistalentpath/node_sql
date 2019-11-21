var http = require("http");
var port = 6969;
var hostname = "http://localhost";

var server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  if (request.method === "GET" && request.url === "/") {
    response.write("good job");
  }
  response.end();
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
