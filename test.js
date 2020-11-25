// module.exports = { name: "tony" };

const Promise = require("./myPromise");

const promise2 = new Promise((resolve, reject) => {
  // setTimeout(() => {
  // throw Error("shibai");
  // }, 1000);
  reject("失败");
}).then();

const promise3 = promise2.then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log("err", err);
  }
);
// promise2.then(
//   (data) => {
//     console.log("data", data);
//   },
//   (err) => {
//     console.log(this);
//     console.log(this.state);
//     console.log(this.reason);
//     console.log("err", err);
//   }
// );
