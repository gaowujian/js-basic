const WriteStream = require("./WriteStream");
const path = require("path");
const fs = require("fs");
const ws = new WriteStream(path.resolve(__dirname, "2.txt"), {
  flags: "w",
  encoding: "utf-8",
  mode: 0o666,
  autoClose: "true",
  start: 0,
  highWaterMark: 3,
});

// const ws = fs.createWriteStream(path.resolve(__dirname, "2.txt"), {
//   flags: "w",
//   encoding: "utf-8",
//   mode: 0o666,
//   autoClose: "true",
//   start: 0,
//   highWaterMark: 3,
// });

//false表示不能再写了已经满了

let i = 0;
write();
function write() {
  let writing = true;

  for (; i < 10; ) {
    console.log("i:", i);
    const content = i.toString();
    i++;
    writing = ws.write(content);
    if (!writing) break;
  }
}
