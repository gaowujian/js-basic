const fs = require("fs");
const path = require("path");
const BUFFER_SIZE = 3;
let buffer = Buffer.alloc(BUFFER_SIZE);
let readOffset = 0;
let writeOffset = 0;

fs.open(path.resolve(__dirname, "original.txt"), "r", (err, rfd) => {
  fs.open(path.resolve(__dirname, "copy.txt"), "w", (err, wfd) => {
    function next() {
      fs.read(
        rfd,
        buffer,
        0,
        BUFFER_SIZE,
        readOffset,
        function (err, bytesRead) {
          if (bytesRead > 0) {
            fs.write(
              wfd,
              buffer,
              0,
              BUFFER_SIZE,
              writeOffset,
              function (err, written) {
                readOffset += bytesRead;
                writeOffset += written;
                next();
              }
            );
          } else {
            fs.close(rfd, () => {});
            fs.close(wfd, () => {});
          }
        }
      );
    }
    next();
  });
});

// let BUFFER_SIZE = 3;
// let buffer = Buffer.alloc(BUFFER_SIZE);
// let readOffset = 0;
// let writeOffset = 0;
// fs.open(path.resolve(__dirname, "original.txt"), "r", function (err, fd) {
//   // file descriptor
//   fs.open(path.resolve(__dirname, "copy.md"), "w", function (err, wfd) {
//     function next() {
//       fs.read(
//         fd,
//         buffer,
//         0,
//         BUFFER_SIZE,
//         readOffset,
//         function (err, bytesRead) {
//           if (bytesRead > 0) {
//             // 读取到内容
//             fs.write(
//               wfd,
//               buffer,
//               0,
//               bytesRead,
//               writeOffset,
//               function (err, written) {
//                 readOffset += bytesRead;
//                 writeOffset += written;
//                 next();
//               }
//             );
//           } else {
//             // 关闭操作
//             fs.close(fd, () => {});
//             fs.close(wfd, () => {});
//           }
//         }
//       );
//     }
//     next();
//   });
// });
