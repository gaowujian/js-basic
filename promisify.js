/**
 * 用于将一个err first的commonjs风格的异步方法转化为promise风格
 *
 * @param {*} fn
 */
function promisify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  };
}

const fs = require("fs");

const read = promisify(fs.readFile);
read("./1.txt")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
