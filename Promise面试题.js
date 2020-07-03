// 了解值穿透
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

// 了解finally的用法

// finally方法相当于先执行了.then的操作，然后把上一次promise的对象值默认返回
// finally里的代码肯定会执行的, 指的是图中的callback一定会执行
// finally中默认调用的的Promise.resolved的方法

// Promise.prototype.finally = function (callback) {
//     return this.then(
//       (value) => {
//         return Promise.resolve(callback()).then(() => {
//           return value;
//         });
//       },
//       (err) => {
//         return Promise.resolve(callback()).then(() => {
//           throw err;
//         });
//       }
//     );
//   };

Promise.resolve("1")
  .then((res) => {
    console.log(res);
  })
  .finally(() => {
    console.log("finally");
  });
Promise.resolve("2")
  .then(() => {
    throw new Error("error message");
  })
  .finally(() => {
    console.log("finally2");
    return "我是finally2返回的值";
  })
  .then((res) => {
    console.log("finally2后面的then函数", res);
  });

//   了解all的用法

// Promise.all = function (promises) {
//     promises = Array.from(promises); //将可迭代对象转换为数组
//     return new Promise((resolve, reject) => {
//       let index = 0;
//       let result = [];
//       if (promises.length === 0) {
//         resolve(result);
//       } else {
//         function processValue(i, data) {
//           result[i] = data;
//           if (++index === promises.length) {
//             resolve(result);
//           }
//         }
//         for (let i = 0; i < promises.length; i++) {
//           //promises[i] 可能是普通值
//           Promise.resolve(promises[i]).then(
//             (data) => {
//               processValue(i, data);
//             },
//             (err) => {
//               reject(err);
//               return;
//             }
//           );
//         }
//       }
//     });
//   };

function runAsync(x) {
  const p = new Promise((r) =>
    setTimeout(() => {
      r(x);
      console.log(x);
    }, 1000)
  );
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}

// 在一秒之内，因为是pending状态，所有的promise都已经放进了callback queue里，一秒钟后，resolve callback queue清空
// 两秒后reject callback queue清空

Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//   正常情况下，async中的await命令是一个Promise对象，返回该对象的结果。

//   但如果不是Promise对象的话，就会直接返回对应的值，相当于Promise.resolve() 参考promise.resolve如何应对不通知

async function fn() {
  // return await 1234
  // 等同于
  return 123;
}
fn().then((res) => console.log(res));

// async await和 promise.then的 伪代码转换

async function async1() {
  console.log("async1 start");
  // 原来代码
  // await async2();
  // console.log("async1 end");

  // 转换后代码
  new Promise((resolve) => {
    console.log("async2");
    resolve();
  }).then((res) => console.log("async1 end"));
}
async function async2() {
  console.log("async2");
}
async1().then((data) => {
  console.log(data);
});
console.log("start");

// 一个更为复杂的async await转promise then的代码

// 1 遵循的技巧： 把async await 关键字去掉， await 后是一个promise 用 return 来替换 await 如果是一个其他值用 Promise.resolve()来替换

// async 版本
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
    resolve();
  });
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => console.log(res));
console.log("srcipt end");

// promise then 版本
function async1() {
  console.log("async1 start");

  return new Promise((resolve) => {
    console.log("promise1");
    resolve();
  }).then(() => {
    console.log("async1 success");
    return Promise.resolve("async1 end");
  });
}
console.log("srcipt start");
async1().then((res) => console.log(res));
console.log("srcipt end");
