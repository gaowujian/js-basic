const ReadStream = require("./ReadStream");
const path = require("path");
const rs = new ReadStream(path.resolve(__dirname, "1.txt"), {});

//new ReadStream的时候会在内部去异步open一个文件，但是我们的on data是同步的，
//只是发布订阅的模型，一旦不是newListener就会去执行
// (type) => {
//     if (type === "data") {
//       this._read();
//     }
//   }
//这样的一个回调函数

//注册open
rs.on("open", function (fd) {
  console.log("外部订阅的open");
  console.log("fd", fd);
});

let result = [];
rs.on("data", function (chunk) {
  result.push(chunk);
  rs.pause();
  setTimeout(() => {
    rs.resume();
  }, 2000);
});

rs.on("end", function () {
  console.log(Buffer.concat(result).toString());
});
