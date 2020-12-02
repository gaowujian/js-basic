const Promise = require("./myPromise");

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("成功1");
//   }, 3000);
// });

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(
      new Promise((resolve, reject) => {
        reject("fail222");
      })
    );
  }, 2000);
});

// Promise.resolve(
//   new Promise((resolve, reject) => {
//     resolve(
//       new Promise((resolve, reject) => {
//         resolve("成功");
//       })
//     );
//   })
// ).then((data) => console.log(data));

// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("失败");
//   }, 1000);
// });

p2.finally(() => {
  return new Promise((resolve, reject1) => {
    resolve(
      new Promise((resolve, reject) => {
        resolve(10);
      })
    );
  });
  // throw new Error("111");
  console.log("calback");
})
  .then((data) => console.log("data1323232:", data))
  .catch((err) => console.log(err));
