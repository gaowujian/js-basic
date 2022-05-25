const ReadStream = require("./ReadStream");
const path = require("path");
const rs = new ReadStream(path.resolve(__dirname, "1.txt"), {});
const fs = require("fs");
// const rs = fs.createReadStream(path.resolve(__dirname, "1.txt"));
//new ReadStream的时候会在内部去异步open一个文件，但是我们的on data是同步的，
//只是发布订阅的模型，一旦不是newListener就会去执行
// (type) => {
//     if (type === "data") {
//       this._read();
//     }
//   }
//这样的一个回调函数

//open,在open事件触发的时候可以获取到fd
rs.on("open", function (fd) {
  console.log("外部订阅的open, fd:", fd);
});

let result = [];

//触发内部的_read开始真正读取
//on事件就可以触发函数的执行，是通过了addListener
rs.on("data", function (chunk) {
  result.push(chunk);
  rs.pause();
});

rs.on("end", function () {
  console.log(Buffer.concat(result).toString());
});

rs.on("close", function () {
  console.log("close");
});
