const Promise = require("./myPromise2");

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功1");
  }, 3000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(
      new Promise((resolve, reject) => {
        reject("失败111");
      })
    );
  }, 2000);
});
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("失败");
//   }, 1000);
// });
p2.finally(() => {
  console.log("aaa");
})
  .then((data) => console.log("data111:", data))
  .catch((err) => console.log(err));
