const net = require("net");

let server = net.createServer((socket) => {
  //监听客户端发送过来的数据
  socket.on("data", (data) => {
    console.log("服务端接收到客户端的数据", data.toString());
    socket.write(`server ${data}`);
  });
  socket.on("end", () => {
    console.log("end");
  });
});

server.listen(9003, function () {
  console.log("running");
});
