const http = require("http");
const server = http.createServer((req, res) => {
  res.end("hello");
});
server.listen(8080, "127.0.0.1");
