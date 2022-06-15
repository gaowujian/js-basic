const ReadStream = require("./ReadStream");
const WriteStream = require("./WriteStream");
const path = require("path");
const rs = new ReadStream(path.resolve(__dirname, "1.txt"), {
  highWaterMark: 3,
});
const ws = new WriteStream(path.resolve(__dirname, "2.txt"), {
  flags: "w",
  encoding: "utf-8",
  mode: 0o666,
  autoClose: "true",
  start: 0,
  highWaterMark: 6,
});

rs.on("data", function (chunk) {
  console.log("chunk:", chunk);
  const flag = ws.write(Buffer.from(chunk), "utf8", () => {});
  if (!flag) {
    rs.pause();
  }
});

ws.on("drain", (...args) => {
  // rs.resume();
});

rs.on("end", function () {
  console.log("end");
  //   console.log(Buffer.concat(result).toString());
});
