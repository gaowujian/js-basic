const fs = require("fs");
const path = require("path");

// 不可以直接删除一个内部包含文件的目录
// fs.rmdir("a", (err) => {
//     console.log(err);
//   });

// function rmdir(name, callback) {
//   const filePath = path.resolve(__dirname, name);
//   fs.stat(filePath, (err, stat) => {
//     if (err) {
//       console.log("查看文件状态错误 err:", err);
//     }
//     //   如果是文件直接删除
//     if (stat.isFile()) {
//       fs.unlink(filePath, () => {
//         console.log("删除文件", filePath);
//         console.dir(callback);
//         callback();
//       });
//     } else {
//       // 如果是目录，先获取目录下所有的文件和目录
//       fs.readdir(filePath, { encoding: "utf-8" }, (err, files) => {
//         if (err) {
//           console.log("readdir读取目录 err:", err);
//         }
//         files = files.map((file) => path.join(name, file));

//         // 每当对一个目录进行操作的时候，都有一个新的index标示已经操作过的数量
//         let index = 0;
//         function next() {
//           // 和promise一样，使用计数器进行累加方法，在文件全部删除之后，才去删除本身目录
//           // 没有这两行,只会删除文件，而不会删除文件夹
//           if (index === files.length) {
//             return fs.rmdir(filePath, () => {
//               console.log("删除目录", filePath);
//               callback();
//             });
//           }
//           let current = files[index++];
//           rmdir(current, next);
//         }
//         next();
//       });
//     }
//   });
// }
// // 只有第一次rmdir传入的callback是打印目录删除成功，之后的都是next
// rmdir("a", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("目录删除成功");
// });

function rmdir(dir, callback) {
  const filePath = path.resolve(__dirname, dir);
  fs.stat(filePath, (err, stat) => {
    if (err) {
      console.log("查看文件状态错误 err:", err);
    }
    // 如果是一个文件，我们直接删除
    if (stat.isFile()) {
      return fs.unlink(filePath);
    } else {
      //广度优先遍历，维护一个目录名的栈
      const stack = [dir];
      //指针，会移动，按照广度优先遍历的顺序，把所有的目录压入栈中
      let index = 0;
      function reverseStack() {
        let ldx = stack.length - 1;
        function next() {
          if (ldx < 0) return callback();
          let cur = stack[ldx--];
          fs.stat(path.resolve(__dirname, cur), (err, stats) => {
            if (stats.isFile()) {
              fs.unlink("删除文件", cur);
              next();
            } else {
              fs.rmdir(cur, () => {
                console.log("删除目录", cur);
                next();
              });
            }
          });
        }
        next();
      }
      fs.readdir(path.resolve(__dirname, stack[index]), (err, files) => {
        if (err) {
          console.log("readdir:", err);
        }
        function next() {
          dir = stack[index++];
          //栈空的时候返回终止递归
          if (!dir) return reverseStack();
          fs.readdir(dir, (err, dirs) => {
            dirs = dirs.map((d) => path.join(dir, d));
            stack.push(...dirs);
            next();
          });
          // for (let i = 0; i < files.length; i++) {
          //     const file = files[i];
          //     if(fs)
          // }
        }
        next();
      });
    }
  });
}

rmdir("a", () => {
  console.log("目录递归删除完成");
});
