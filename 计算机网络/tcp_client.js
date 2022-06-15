const net = require("net");
const socket = net.Socket();
socket.connect(9003, "localhost");

socket.on("connect", () => {
  console.log("connect success");
  socket.write("hello");
});

socket.on("data", (data) => {
  console.log("客户端接受到的数据:", data.toString());
  socket.destroy();
});
