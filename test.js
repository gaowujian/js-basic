const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/octet-stream");
  res.end(JSON.stringify({ name: "string" }));
});

server.listen(3000, () => {
  console.log("server running");
});
