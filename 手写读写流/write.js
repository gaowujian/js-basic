const WriteStream = require("./WriteStream");
const path = require("path");
// const ws = new WriteStream(path.resolve(__dirname, "2.txt"), {});

const fs = require("fs");

const ws = fs.createWriteStream(path.resolve(__dirname, "2.txt"), {
  flags: "w",
  encoding: "utf-8",
  mode: 0o666,
  autoClose: "true",
  start: 0,
  highWaterMark: 3,
});

//false表示不能再写了已经满了
let writing = false;
let i = 0;
write();
function write() {
  writing = true;
  console.log("i:", i);
  for (; i < 10; ) {
    const content = i.toString();
    i++;
    writing = ws.write(content);
    if (!writing) return;
  }
}

ws.on("drain", () => {
  console.log("drain");
  //重复去读写
  write();
});
