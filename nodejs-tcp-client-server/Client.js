var net = require("net");

// net.Socket,
// 是net.createConnection的别名
var sock = net.connect(
  {
    port: 6080,
    host: "127.0.0.1",
  },
  function () {
    console.log("connected to server!");
  }
);

// 连接成功调用的事件
sock.on("connect", function () {
  console.log("connect success");

  // 在这里我们就可以发送数据了
  sock.write("HelloWorld中国!", "utf8");
  // end
});
// end

// 有错误发生调用的事件
sock.on("error", function (e) {
  console.log("error", e);
});

// socket关闭的事件
sock.on("close", function () {
  console.log("close");
});

// 对方发送了关闭数据包过来的事件
sock.on("end", function () {
  console.log("end event");
});

