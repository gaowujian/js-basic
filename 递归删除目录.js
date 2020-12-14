const fs = require("fs");
const path = require("path");

// 不可以直接删除一个内部包含文件的目录
// fs.rmdir("a", (err) => {
//     console.log(err);
//   });

function rmdir(name, callback) {
  const filePath = path.resolve(__dirname, name);
  fs.stat(filePath, (err, stat) => {
    if (err) {
      console.log("查看文件状态错误 err:", err);
    }
    //   如果是文件直接删除
    if (stat.isFile()) {
      fs.unlink(filePath, callback);
    } else {
      // 如果是目录，先获取所有
      fs.readdir(filePath, { encoding: "utf-8" }, (err, files) => {
        if (err) {
          console.log("readdir读取目录 err:", err);
        }
        files = files.map((file) => path.join(name, file));

        // 遍历每一项，递归调用rmDir
        // for (let i = 0; i < files.length; i++) {
        //   const file = files[i];
        //   rmdir(file, callback);
        // }
        // 和promise一样，使用计数器进行累加方法，在文件全部删除之后，才去删除本身目录
        let index = 0;
        function next() {
          if (index === files.length) {
            return fs.rmdir(filePath, callback);
          }
          let current = files[index++];
          rmdir(current, next);
        }
        next();
      });
    }
  });
}
rmdir("a", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("删除成功");
});
