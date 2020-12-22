const net = require("net");
const fs = require("fs");
const path = require("path");

const destPort = 3000;
const destHost = "223.71.203.2";

let allBuffer = null;

// 创建一个客户端，模拟浏览器
// client 是一个Socket类实例子，继承自 stream.Duplex，是一个可读可写流
// 所以既能监听data和end事件，读取服务端发送过来的数据，还有write写入方法

const client = net.createConnection(destPort, destHost, function () {
  console.log("connected to the server");
  // tcp链接完成之后，发送一个请求, 末尾的两个\r\n表示结束
  client.write(
    "GET / HTTP/1.1\r\nHost: www.ying-shi-tong.com\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\n\r\n"
  );
});

client.on("data", function (data) {
  console.log("client receive data ========================================");
  console.log("");
  console.log(data.toString());
  if (!allBuffer) {
    allBuffer = data;
  } else {
    allBuffer = Buffer.concat([allBuffer, data]);
  }
});

client.on("error", (err) => {
  console.log(err);
});

client.on("end", () => {
  // tcp链接结束
  console.log("connection end");
  // 解析页面的操作，这里先使用了写入本地文件的操作
  // 实际上，我们先要有http-parser把传回来的二进制数据转化为字符串
  // 然后还有htmlparser去解析字符串模版
  const htmlContent = allBuffer.toString();
  const ws = fs.createWriteStream(
    path.resolve(__dirname, "ying-shi-tong.html")
  );
  ws.write(htmlContent);
});
