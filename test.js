// // module.exports = { name: "tony" };

const Promise = require("./myPromise");

new Promise((resolve, reject) => {
  resolve(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("成功");
      }, 1000);
    })
  );
}).then((data) => {
  console.log(data);
});

// const p1 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject("成功1111");
//     }, 4000);
//   });
// };
// const p2 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(
//         new Promise((resolve, reject) => {
//           setTimeout(() => {
//             resolve("成功aaaaaa2");
//           }, 1000);
//         })
//       );
//       resolve("成功nbbbb32");
//     }, 1000);
//   });
// };

// const p3 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject("失败");
//     }, 100);
//   });
// };

// // Promise.any([p1(), p2(), p3()]).then(
// //   (results) => {
// //     console.log(results);
// //     // results.forEach((result) => console.log(result.status));
// //   },
// //   (err) => {
// //     console.log(err);
// //   }
// // );

// p1()
//   .then()
//   .catch((e) => {
//     console.log(e);
//     return 10;
//   })
//   .finally((data) => {
//     console.log("finally", data);
//   })
//   .then(
//     (data) => console.log("then2", data),
//     (err) => {
//       console.log("then2", err);
//     }
//   );
